export default async function handler(req, res) {
try {

```
const response = await fetch(
  "https://api.adsb.lol/v2/lat/51.47/lon/-0.45/dist/250",
  {
    headers: {
      "User-Agent": "European-Aviation-Dashboard"
    }
  }
);

const data = await response.json();

const aircraft = (data.ac || []).filter(ac => {

  if (ac.alt_baro === "ground") {
    return false;
  }

  const altitude = Number(ac.alt_baro);

  return !isNaN(altitude) && altitude > 0;

});

res.setHeader("Access-Control-Allow-Origin", "*");
res.setHeader("Cache-Control", "s-maxage=60");

res.status(200).json({
  success: true,
  aircraft,
  total: aircraft.length,
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
