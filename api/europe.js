export default async function handler(req, res) {
  try {
    const response = await fetch(
      "https://api.adsb.lol/v2/ladd",
      {
        headers: {
          "User-Agent": "European-Aviation-Dashboard"
        }
      }
    );

    const data = await response.json();

    const aircraft = (data.ac || []).filter(ac => {

      const lat = Number(ac.lat);
      const lon = Number(ac.lon);

      if (isNaN(lat) || isNaN(lon)) {
        return false;
      }

      // Europe bounding box
      return (
        lat >= 34 &&
        lat <= 72 &&
        lon >= -25 &&
        lon <= 45
      );
    });

    const airborne = aircraft.filter(ac => {
      if (ac.alt_baro === "ground") {
        return false;
      }

      const alt = Number(ac.alt_baro);

      return !isNaN(alt) && alt > 0;
    });

    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Cache-Control", "s-maxage=60");

    res.status(200).json({
      success: true,
      aircraft: airborne,
      total: airborne.length,
      collectedAt: new Date().toISOString()
    });

  } catch (err) {

    console.error(err);

    res.status(500).json({
      success: false,
      error: err.message
    });

  }
}
