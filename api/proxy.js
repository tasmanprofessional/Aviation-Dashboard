export default async function handler(req, res) {
  try {
    const username = "tasmanprofessional";
    const password = "Lemons11";
    const encoded = Buffer.from(username + ":" + password).toString("base64");

    const response = await fetch("https://opensky-network.org/api/states/all", {
      headers: {
        "Authorization": "Basic " + encoded,
        "User-Agent": "Mozilla/5.0",
        "Accept": "application/json"
      }
    });

    const data = await response.json();

    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(data);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
