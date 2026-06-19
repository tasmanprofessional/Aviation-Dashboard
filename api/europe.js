export default async function handler(req, res) {
  try {

    const response = await fetch(
      "https://api.adsb.lol/v2/lat/51.47/lon/-0.45/dist/250"
    );

    const data = await response.json();

    res.status(200).json(data);

  } catch (err) {

    res.status(500).json({
      error: err.message
    });

  }
}
