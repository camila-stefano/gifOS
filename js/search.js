// crear funcion para traer listado de gifos del endpoint search

/**
 * Usar promesa o funcion asincrona
 * 1) buscar url endpoint (https://api.giphy.com/v1/gifs/search)
 * 2) hacer fetch (necesito api_key) y parametro de busqueda
 *    2.1) guardar en una variable la respuesta del endpoint
 *    2.2) convertir los datos recibidos en objeto js
 * 3) retornar esos datos
 */

// Si es objeto {}
// Si es array []
// apiConfig.SEARCH_ENDPOINT o apiConfig [´´]

const apiConfig = {
  SEARCH_ENDPOINT: "https://api.giphy.com/v1/gifs/search",
  API_KEY: "KefMt9MyQV9jHwaFI9pAP7ZNncEbv5bJ",
  LIMIT: 12,
};

async function obtenerGifsPorTopico(topico) {
  let url = `${apiConfig.SEARCH_ENDPOINT}?api_key=${apiConfig.API_KEY}&q=${topico}&limit=${apiConfig.LIMIT}`;
  let resp = await fetch(url);
  let listadoGifs = await resp.json();

  return listadoGifs.data;
}
