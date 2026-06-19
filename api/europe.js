export default async function handler(req, res) {
  try {

    // Major European coverage centres
    const GRID = [
      [51.47, -0.45],   // London
      [49.01,  2.55],   // Paris
      [50.03,  8.57],   // Frankfurt
      [52.31,  4.76],   // Amsterdam
      [40.49, -3.56],   // Madrid
      [41.80, 12.24],   // Rome
      [52.16, 20.97],   // Warsaw
      [37.94, 23.95],   // Athens
      [59.65, 17.92],   // Stockholm
      [41.27, 28.75],   // Istanbul
      [55.97, -3.37],   // Edinburgh
      [53.42, -6.27],   // Dublin
      [47.45,  8.56],   // Zurich
      [48.11, 16.57],   // Vienna
      [50.10, 14.26],   // Prague
      [47.43, 19.26]    // Budapest
    ];

    const requests = GRID.map(([lat, lon]) =>
      fetch(
        `https://api.adsb.lol/v2/lat/${lat}/lon/${lon}/dist/250`,
        {
          headers: {
            "User-Agent": "Europe-Aviation-Dashboard"
          }
        }
      )
      .then(r => {
        if (!r.ok) {
          throw new Error(`ADSB API ${r.status}`);
        }
        return r.json();
      })
      .catch(() => ({ ac: [] }))
    );

    const results = await Promise.all(requests);

    // Deduplicate aircraft
    const aircraftMap = new Map();

    results.forEach(feed => {
      (feed.ac || []).forEach(ac => {
        if (ac.hex) {
          aircraftMap.set(ac.hex, ac);
        }
      });
    });

    const aircraft = [...aircraftMap.values()];

    // Airborne only
    const airborne = aircraft.filter(ac => {
      if (ac.alt_baro === "ground") return false;

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
