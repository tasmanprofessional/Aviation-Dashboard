exports.handler = async function () {

  const auth = Buffer
    .from(
      process.env.OPENSKY_USERNAME + ":" +
      process.env.OPENSKY_PASSWORD
    )
    .toString("base64");


  const response = await fetch(
    "https://opensky-network.org/api/states/all",
    {
      headers: {
        Authorization: "Basic " + auth
      }
    }
  );


  const data = await response.json();


  return {
    statusCode: response.status,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  };
};
