/*Varibales*/
const inputSearch = document.getElementById("inputSearch");
const btnSearch = document.getElementById("btnSearch");
const right_btn = document.getElementById("right_btn");
const right_icon = document.getElementById("right_icon");
const results_title = document.getElementById("results_title");
const url_search = "https://api.giphy.com/v1/gifs/search?api_key=" + api_key;
const url_suggestions = "https://api.giphy.com/v1/tags/related/";
let autoComp = document.getElementById("autocomplete_content");
let offset = 0;
let value = "";

// Eventlisteners

//Buscar gifos con click event
btnSearch.addEventListener("click", searchGifos);

//Obtener datos de la API de giphy
function searchGifos() {
  console.log("searchGifos");
  value = inputSearch.value.trim();
  //results.classList.remove("hide");
  //results_title.textContent = value;

  //const search = url_search + "&limit=12&q=" + value + "/";
  //getSectionsData(search, results_grid, fav_img, fav_add, fav);
  closeAutocompleteSection();
}

//Autocompletar sugerencias y buscar gifos con enter event

inputSearch.addEventListener("keyup", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    searchGifos();
    console.log("buscando con enter");
  }

  value = inputSearch.value;
  if (value.length >= 1) {
    showAutocompleteSection();
    fetch(`${url_suggestions}${value}?api_key=${api_key}`)
      .then((response) => response.json())
      .then((data) => {
        suggestedTerms(data);
      })
      .catch((err) => {
        console.error(err);
      });
  } else {
    closeAutocompleteSection();
  }
});

//Mostrar seccion de autocompletar
function showAutocompleteSection() {
  autoComp.style.display = "block";
  right_icon.classList.remove("fa-search");
  right_icon.classList.add("fa-times");
  btnSearch.classList.remove("hide");
}

//Renderizar resultados
function suggestedTerms(terms) {
  let suggested = terms.data;
  autoComp.innerHTML = `
    <li class="suggested"> <i class="fa fa-search"></i> <p class="suggested__text">${suggested[0].name}</p></li>
    <li class="suggested"> <i class="fa fa-search"></i> <p class="suggested__text">${suggested[1].name}</p></li>
    <li class="suggested"> <i class="fa fa-search"></i> <p class="suggested__text">${suggested[2].name}</p></li>
    `;
}

//Ocultar autocompletar
function closeAutocompleteSection() {
  autoComp.style.display = "none";
  right_icon.classList.remove("fa-times");
  right_icon.classList.add("fa-search");
}

//Buscar con sugerencias
autoComp.addEventListener("click", (li) => {
  inputSearch.value = li.target.textContent;
  searchGifos();
});

// //Cancelar busqueda
// right_btn.addEventListener("click", () => {
//   inputSearch.value = "";
//   inputSearch.placeholder = "Busca GIFOS y más";
//   closeAutocompleteSection();
// });

//Ver mas resultados
// more_btn.addEventListener("click", (e) => {
//   e.preventDefault();
//   seeMoreResults();
// });

//Renderizar 12 resultados mas
function seeMoreResults() {
  offset = offset + 12;
  value = inputSearch.value.trim();
  let search_more = url_search + "&limit=12&q=" + value + "&offset=" + offset;
  getSectionsData(search_more, results_grid, fav_img, fav_add, fav);
}
