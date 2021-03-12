if (window.matchMedia("(prefers-color-scheme)").media !== "not all") {
  console.log("🎉 Dark mode is supported");
}

const btnSwitch = document.querySelector("#switch");

btnSwitch.addEventListener("click", handleSwitch);

function handleSwitch() {
  btnSwitch.textContent = btnSwitch.textContent === "Modo Diurno" ? "Modo Nocturno" : "Modo Diurno";
}
