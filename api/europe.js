export default async function handler(req, res) {
try {

```
const response = await fetch(
  "https://api.adsb.lol/v2/lat/51.47/lon/-0.45/dist/250"
);

const text = await response.text();

const data = JSON.parse(text);

const aircraft = (data.ac || [])
  .filter(ac => {
    if (ac.alt_baro === "ground") return false;

    const alt = Number(ac.alt_baro);

    return !isNaN(alt) && alt > 0;
  })
  .slice(0, 1000);

res.status(200).json({
  success: true,
  aircraft,
  total: aircraft.length
});
```

} catch (err) {

```
res.status(500).json({
  success: false,
  error: String(err)
});
```

}
}
