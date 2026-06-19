export default async function handler(req, res) {
  try {
    const response = await fetch("https://api.adsb.lol/v2/ladd");
    const data = await response.json();
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
