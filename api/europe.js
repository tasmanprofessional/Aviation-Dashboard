export default async function handler(req, res) {
  try {

    const response = await fetch(
      "https://api.adsb.lol/v2/lat/51.47/lon/-0.45/dist/250"
    );

    const data = await response.json();

    res.setHeader("Access-Control-Allow-Origin", "*");

    res.status(200).json({
      success: true,
      aircraft: data.ac || [],
      total: (data.ac || []).length,
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
}
