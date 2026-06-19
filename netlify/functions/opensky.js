exports.handler = async function () {

  try {

    const response = await fetch("https://api.github.com");

    const data = await response.text();

    return {
      statusCode: 200,
      body: data
    };

  } catch (error) {

    return {
      statusCode: 500,
      body: error.message
    };

  }

};
