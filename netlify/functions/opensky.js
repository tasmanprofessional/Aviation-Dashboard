exports.handler = async function () {

  const username = process.env.OPENSKY_USERNAME;
  const password = process.env.OPENSKY_PASSWORD;

  try {

    const auth = Buffer
      .from(username + ":" + password)
      .toString("base64");

    const response = await fetch(
      "https://opensky-network.org/api/states/all",
      {
        headers: {
          "Authorization": "Basic " + auth
        }
      }
    );

    if (!response.ok) {

      return {
        statusCode: response.status,
        body: JSON.stringify({
          error: "OpenSky error",
          status: response.status
        })
      };

    }

    const data = await response.json();

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    };


  } catch (err) {

    return {
      statusCode: 500,
      body: JSON.stringify({
        error: "fetch failed",
        message: err.message
      })
    };

  }

};
