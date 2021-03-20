const carousel = document.querySelector(".trending__carousel");
const carouselContent = document.querySelector(".trending__carousel__content");
const slides = document.querySelectorAll(".slide");

const visibileSlides = window.innerWidth >= 500 ? 3 : 1;

const lengthOfSlide = carousel.offsetWidth / visibileSlides;

function getScreenSize() {
  let slides = [...document.querySelectorAll(".slide")];

  let initialWidth = -lengthOfSlide;
  slides.forEach((el) => {
    el.style.width = lengthOfSlide + "px";
    el.style.left = initialWidth + "px";
    initialWidth += lengthOfSlide;
  });
}

getScreenSize();
