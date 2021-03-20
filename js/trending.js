/*async function getTrending() {
  let url = `https://api.giphy.com/v1/gifs/trending?api_key=${api_key}`;
  let resp = await fetch(url);
  let json = await resp.json();
  return json.data;
}*/

//Tendring topics

let trend_topics = document.getElementById("trend_topics");
window.onload = trendingTopics();

//Obtener datos de la api de giphy
async function trendingTopics() {
  let topics = await getTrending();

  trend_topics.innerHTML = `
            <p class="trending__topics__links">${topics[0]}</p>, 
            <p class="trending__topics__links">${topics[1]}</p>, 
            <p class="trending__topics__links">${topics[2]}</p>, 
            <p class="trending__topics__links">${topics[3]}</p>, 
            <p class="trending__topics__links">${topics[4]}</p>`;

  let topic_btns = document.getElementsByClassName("trending__topics__links");
  for (let i = 0; i < topic_btns.length; i++) {
    topic_btns[i].addEventListener("click", function (e) {
      inputSearch.value = topics[i];
      searchGifos();
    });
  }
}
