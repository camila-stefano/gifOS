const api_key = "KefMt9MyQV9jHwaFI9pAP7ZNncEbv5bJ";
const base_url = "https://api.giphy.com/v1";
const url_search = `${base_url}/gifs/search?api_key=${api_key}`;
const url_suggestions = `${base_url}/tags/related/`;

const getTrending = () => {
  return fetch(`${base_url}/trending/searches?api_key=${api_key}`)
    .then((resp) => resp.json())
    .then((response) => response.data)
    .catch((error) => error);
};

const getTrendingGifs = () => {
  return fetch(`${base_url}/gifs/trending?api_key=${api_key}&limit=12`)
    .then((resp) => resp.json())
    .then((response) => response.data)
    .catch((error) => error);
};
