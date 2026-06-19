exports.handler = async function () {

  const username = process.env.OPENSKY_USERNAME;
  const password = process.env.OPENSKY_PASSWORD;

  const auth = Buffer
    .from(`${username}:${password}`)
    .toString("base64");

  try {

    const response = await fetch(
      "https://opensky-network.org/api/states/all",
      {
        headers: {
          Authorization: `Basic ${auth}`
        }
      }
    );

    const text = await response.text();

    return {
      statusCode: response.status,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json"
      },
      body: text
    };

  } catch (error) {

    return {
      statusCode: 500,
      body: JSON.stringify({
        error: error.message
      })
    };

  }

};
