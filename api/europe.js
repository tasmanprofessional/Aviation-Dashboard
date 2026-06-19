export default async function handler(req, res) {

  try {

    const response = await fetch(
      "https://api.adsb.lol/v2/lat/51.47/lon/-0.45/dist/250"
    );

    const text = await response.text();

    res.status(200).json({
      status: response.status,
      response: text.substring(0, 5000)
    });

  } catch (err) {

    res.status(500).json({
      error: String(err),
      stack: err.stack
    });

  }

}
