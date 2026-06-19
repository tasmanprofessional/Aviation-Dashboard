export async function onRequest(context) {
  try {
    const credentials = "tasmanprofessional:YOUR_PASSWORD_HERE";
    const encoded = Buffer.from(credentials).toString("base64");
    
    const response = await fetch("https://opensky-network.org/api/states/all", {
      headers: {
        "Authorization": "Basic " + encoded
      }
    });
    
    const text = await response.text();

    return new Response(text, {
      status: response.status,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
      }
    });

  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
      }
    });
  }
}
