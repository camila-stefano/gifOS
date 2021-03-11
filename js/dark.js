//modo nocturno y diurno
const btnSwitch = document.querySelector("#switch");

btnSwitch.addEventListener("click", handleSwitch);

function handleSwitch() {
  document.body.classList.toggle("darkMode");
  btnSwitch.textContent = btnSwitch.textContent === "Modo Nocturno" ? "Modo Diurno" : "Modo Nocturno";
}
