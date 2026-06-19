export async function onRequest(context) {
  const response = await fetch("https://opensky-network.org/api/states/all", {
    headers: {
      "Authorization": "Basic " + btoa("tasmanprofessional:Lemons11")
    }
  });
  const data = await response.json();
  return new Response(JSON.stringify(data), {
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*"
    }
  });
}
