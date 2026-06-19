exports.handler = async function () {

  const username = "tasmanprofessional";
  const password = "Lemons11";

  try {

    const auth = Buffer
      .from(`${username}:${password}`)
      .toString("base64");

    const response = await fetch(
      "https://opensky-network.org/api/states/all",
      {
        headers: {
          "Authorization": `Basic ${auth}`
        }
      }
    );

    const data = await response.text();

    return {
      statusCode: response.status,
      headers: {
        "Content-Type": "application/json"
      },
      body: data
    };

  } catch (err) {

    return {
      statusCode: 500,
      body: JSON.stringify({
        error: "OpenSky connection failed",
        message: err.message
      })
    };

  }

};
