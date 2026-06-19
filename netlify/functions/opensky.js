exports.handler = async function () {

  try {

    const response = await fetch("https://opensky-network.org");

    const text = await response.text();

    return {
      statusCode: 200,
      body: text
    };

  } catch (err) {

    return {
      statusCode: 500,
      body: JSON.stringify({
        error: err.message,
        stack: err.stack
      })
    };

  }

};
