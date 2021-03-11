console.log("Menu.js Cargado");

const hamburger = document.getElementById("hamburger");
const icon = document.getElementById("menu_icon");
const menu = document.getElementById("menu");
const createButton = document.querySelector(".create__gif");

hamburger.addEventListener("click", handleMenu);
createButton.addEventListener("click", handleCreateGif);

function handleMenu() {
  menu.classList.toggle("is-active");
  const isActive = menu.classList.contains("is-active");

  if (isActive) {
    icon.src = "./images/close.svg";
  } else {
    icon.src = "./images/burger.svg";
  }
}

function handleCreateGif() {
  console.log("handleCreateGif funciona.");
}
