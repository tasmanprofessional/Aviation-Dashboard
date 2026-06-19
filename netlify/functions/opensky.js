exports.handler = async function () {

  try {

    const response = await fetch("https://api.github.com");

    const text = await response.text();

    return {
      statusCode: 200,
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
