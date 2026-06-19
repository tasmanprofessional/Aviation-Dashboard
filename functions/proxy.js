export async function onRequest(context) {
  try {
    const username = "tasmanprofessional";
    const password = "YOUR_PASSWORD_HERE";
    const credentials = username + ":" + password;
    
    // Encode manually without btoa
    const encoder = new TextEncoder();
    const data = encoder.encode(credentials);
    const base64 = btoa(String.fromCharCode(...data));

    const response = await fetch("https://opensky-network.org/api/states/all", {
      headers: {
        "Authorization": "Basic " + base64,
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
