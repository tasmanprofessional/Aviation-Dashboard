exports.handler = async function () {

  try {

    const response = await fetch(
      "https://opensky-network.org/api/states/all",
      {
        headers: {
          "User-Agent": "Aviation-Dashboard"
        }
      }
    );

    const text = await response.text();

    return {
      statusCode: response.status,
      headers: {
        "Content-Type": "application/json"
      },
      body: text
    };

  } catch (err) {

    return {
      statusCode: 500,
      body: JSON.stringify({
        name: err.name,
        message: err.message,
        cause: err.cause
      })
    };

  }

};
