export default async function handler(req, res) {
  try {

    const response = await fetch(
      "https://api.adsb.lol/v2/ladd"
    );

    const data = await response.json();

    const sample =
      (data.ac || [])[0];

    res.status(200).json({
      aircraftCount: (data.ac || []).length,
      sample
    });

  } catch (err) {

    res.status(500).json({
      error: err.message
    });

  }
}
