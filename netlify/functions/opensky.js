exports.handler = async function () {

  try {

    const username = process.env.OPENSKY_USERNAME;
    const password = process.env.OPENSKY_PASSWORD;

    const auth = Buffer.from(
      `${username}:${password}`
    ).toString("base64");


    const response = await fetch(
      "https://opensky-network.org/api/states/all",
      {
        method: "GET",
        headers: {
          "Authorization": `Basic ${auth}`,
          "User-Agent": "Mozilla/5.0"
        }
      }
    );


    const text = await response.text();


    if (!response.ok) {

      return {
        statusCode: response.status,
        body: JSON.stringify({
          error: "OpenSky rejected request",
          response: text
        })
      };

    }


    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json"
      },
      body: text
    };


  } catch (error) {

    return {
      statusCode: 500,
      body: JSON.stringify({
        error: error.message,
        stack: error.stack
      })
    };

  }

};
