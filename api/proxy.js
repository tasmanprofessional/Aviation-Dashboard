export default async function handler(req, res) {
  try {
    const response = await fetch("https://opensky-network.org");
    res.status(200).json({ status: response.status, ok: response.ok });
  } catch (err) {
    res.status(500).json({ error: err.message, cause: err.cause?.message });
  }
}
