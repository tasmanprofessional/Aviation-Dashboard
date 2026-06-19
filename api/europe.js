export default async function handler(req, res) {
try {

```
const CENTRES = [
  [51.47, -0.45],   // London Heathrow
  [49.01,  2.55],   // Paris CDG
  [52.31,  4.76],   // Amsterdam Schiphol
  [50.03,  8.57],   // Frankfurt
  [40.49, -3.56],   // Madrid
  [41.80, 12.24],   // Rome
  [52.16, 20.97],   // Warsaw
  [41.27, 28.75],   // Istanbul
  [59.65, 17.92]    // Stockholm
];

const results = await Promise.all(

  CENTRES.map(([lat, lon]) =>

    fetch(
      `https://api.adsb.lol/v2/lat/${lat}/lon/${lon}/dist/250`,
      {
        headers: {
          "User-Agent": "European-Aviation-Dashboard"
        }
      }
    )
    .then(r => r.json())
    .catch(() => ({ ac: [] }))

  )

);

const aircraftMap = new Map();

results.forEach(feed => {

  (feed.ac || []).forEach(ac => {

    if (ac.hex) {
      aircraftMap.set(ac.hex, ac);
    }

  });

});

const aircraft = [...aircraftMap.values()];

const airborne = aircraft.filter(ac => {

  if (ac.alt_baro === "ground") {
    return false;
  }

  const alt = Number(ac.alt_baro);

  return !isNaN(alt) && alt > 0;

});

res.setHeader(
  "Access-Control-Allow-Origin",
  "*"
);

res.setHeader(
  "Cache-Control",
  "s-maxage=60"
);

res.status(200).json({
  success: true,
  aircraft: airborne,
  total: airborne.length,
  collectedAt: new Date().toISOString()
});
```

} catch (err) {

```
console.error(err);

res.status(500).json({
  success: false,
  error: err.message
});
```

}
}
