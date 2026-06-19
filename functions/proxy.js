export async function onRequest(context) {
  try {
    const response = await fetch("https://opensky-network.org/api/states/all", {
      headers: {
        "Authorization": "Basic " + btoa("tasmanprofessional:YOUR_PASSWORD_HERE"),
        "User-Agent": "Mozilla/5.0",
        "Accept": "application/json"
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
