export async function onRequest(context) {
  try {
    const response = await fetch("https://opensky-network.org/api/states/all", {
      headers: {
        "Authorization": "Basic " + btoa("tasmanprofessional:Lemons11")
      }
    });
    
    const text = await response.text();
    
    if (!response.ok) {
      return new Response(JSON.stringify({ 
        error: response.status, 
        message: text 
      }), {
        status: 500,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*"
        }
      });
    }

    return new Response(text, {
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
