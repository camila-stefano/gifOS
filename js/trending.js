const api_key = "KefMt9MyQV9jHwaFI9pAP7ZNncEbv5bJ";

async function getTrending() {
  let url = `https://api.giphy.com/v1/gifs/trending?api_key=${api_key}`;
  let resp = await fetch(url);
  let json = await resp.json();
  return json.data;
}
