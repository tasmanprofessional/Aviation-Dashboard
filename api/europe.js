export default async function handler(req, res) {

const response = await fetch(
"https://api.adsb.lol/v2/lat/51.47/lon/-0.45/dist/250"
);

const text = await response.text();

res.status(200).send(text);

}
