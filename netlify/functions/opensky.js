exports.handler = async function () {

  try {

    const response = await fetch(
      "https://opensky-network.org/api/states/all"
    );

    const data = await response.text();

    return {
      statusCode: response.status,
      headers: {
        "Content-Type": "application/json"
      },
      body: data
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
