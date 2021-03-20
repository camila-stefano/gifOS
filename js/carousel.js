const carousel = document.querySelector(".trending__carousel");
const carouselContent = document.querySelector(".trending__carousel__content");
const slides = document.querySelectorAll(".slide");
const visibileSlides = window.innerWidth >= 500 ? 3 : 1;
const lengthOfSlide = carousel.offsetWidth / visibileSlides;
let moving = true;

document.addEventListener("DOMContentLoaded", renderTrendingGifs);

async function renderTrendingGifs() {
  const trendings = await getTrendingGifs();

  trendings.forEach((trend) => {
    const element = `
    <div class="slide">
    <img class="slide__image" src="${trend.images.original.url}" />
    </div>`;
    carouselContent.insertAdjacentHTML("beforeend", element);
  });

  getScreenSize();

  moveSlidesRight();
}

function getScreenSize() {
  let slides = [...document.querySelectorAll(".slide")];

  let initialWidth = -lengthOfSlide;
  slides.forEach((el) => {
    el.style.width = lengthOfSlide + "px";
    el.style.left = initialWidth + "px";
    initialWidth += lengthOfSlide;
  });
}

function addClone() {
  let lastSlide = carouselContent.lastElementChild.cloneNode(true);
  lastSlide.style.left = -lengthOfSlide + "px";
  carouselContent.insertBefore(lastSlide, carouselContent.firstChild);
}

function removeClone() {
  let firstSlide = carouselContent.firstElementChild;
  firstSlide.parentNode.removeChild(firstSlide);
}

function moveSlidesRight() {
  let slides = [...document.querySelectorAll(".slide")];
  let width = 0;

  slides.forEach(function (el, i) {
    el.style.left = width + "px";
    width += lengthOfSlide;
  });
  addClone();
}

function moveSlidesLeft() {
  let slides = [...document.querySelectorAll(".slide")];
  slides = slides.reverse();
  let maxWidth = (slides.length - 1) * lengthOfSlide;

  slides.forEach(function (el, i) {
    maxWidth -= lengthOfSlide;
    el.style.left = maxWidth + "px";
  });
}

let rightNav = document.querySelector(".nav-right");
rightNav.addEventListener("click", moveRight);

function moveRight() {
  if (moving) {
    moving = false;
    let lastSlide = carouselContent.lastElementChild;
    lastSlide.parentNode.removeChild(lastSlide);
    carouselContent.insertBefore(lastSlide, carouselContent.firstChild);
    removeClone();
    let firstSlide = carouselContent.firstElementChild;
    firstSlide.addEventListener("transitionend", activateAgain);
    moveSlidesRight();
  }
}

function activateAgain() {
  let firstSlide = carouselContent.firstElementChild;
  moving = true;
  firstSlide.removeEventListener("transitionend", activateAgain);
}

const leftNav = document.querySelector(".nav-left");
leftNav.addEventListener("click", moveLeft);

function moveLeft() {
  if (moving) {
    moving = false;
    removeClone();
    let firstSlide = carouselContent.firstElementChild;
    firstSlide.addEventListener("transitionend", replaceToEnd);
    moveSlidesLeft();
  }
}

function replaceToEnd() {
  let firstSlide = carouselContent.firstElementChild;
  firstSlide.parentNode.removeChild(firstSlide);
  carouselContent.appendChild(firstSlide);
  firstSlide.style.left = (slides.length - 1) * lengthOfSlide + "px";
  addClone();
  moving = true;
  firstSlide.removeEventListener("transitionend", replaceToEnd);
}

carouselContent.addEventListener("mousedown", seeMovement);

let initialX;
let initialPos;
function seeMovement(e) {
  initialX = e.clientX;
  getInitialPos();
  carouselContent.addEventListener("mousemove", slightMove);
  document.addEventListener("mouseup", moveBasedOnMouse);
}

function slightMove(e) {
  if (moving) {
    let movingX = e.clientX;
    let difference = initialX - movingX;
    if (Math.abs(difference) < lengthOfSlide / 4) {
      slightMoveSlides(difference);
    }
  }
}

function getInitialPos() {
  let slides = [...document.querySelectorAll(".slide")];
  initialPos = [];
  slides.forEach((el) => {
    let left = Math.floor(parseInt(el.style.left.slice(0, -2)));
    initialPos.push(left);
  });
}

function slightMoveSlides(newX) {
  let slides = [...document.querySelectorAll(".slide")];
  slides.forEach(function (el, i) {
    let oldLeft = initialPos[i];
    el.style.left = oldLeft + newX + "px";
  });
}

function moveBasedOnMouse(e) {
  let finalX = e.clientX;
  if (initialX - finalX > 0) {
    moveRight();
  } else if (initialX - finalX < 0) {
    moveLeft();
  }
  document.removeEventListener("mouseup", moveBasedOnMouse);
  carouselContent.removeEventListener("mousemove", slightMove);
}
