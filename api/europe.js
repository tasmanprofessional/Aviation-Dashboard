export default async function handler(req, res) {
  try {
    const response = await fetch(
      "https://api.adsb.lol/v2/lat/51.47/lon/-0.45/dist/250"
    );

    const text = await response.text();

    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Cache-Control", "s-maxage=30");

    res.status(200).send(text);

  } catch (err) {

    res.status(500).json({
      error: String(err)
    });

  }
}
