//Variables

const lights = Array.from(
  document.querySelectorAll(".testimonials_indicators-light")
);
const slider = document.querySelector(".testimonials_sliders");
const navMobile = document.querySelector(".nav_mobile");
const navBtn = document.querySelector(".hamburger");
const body = document.querySelector("body");
const navDesktop = document.querySelector(".nav_links");
const form = document.querySelector(".footer-bottom_form");
const email = document.querySelector(".footer-bottom_form_email");
const threshold = 150,
  allowedTime = 300;

let startX, startY, startTime, elapsedTime, dist;
let count = lights.findIndex((light) => {
  return light.classList.contains("lit");
});

//Functions

const changeLight = () => {
  lights.forEach((light, index) => {
    if (index === count) {
      light.classList.add("lit");
    } else {
      light.classList.remove("lit");
    }
  });
};

const changeSlide = () => {
  let width =
    window.innerWidth < 800 ? window.innerWidth : window.innerWidth / 3;
  if (window.innerWidth >= 800 && count > 2) {
    return;
  }
  slider.style.left = -width * count + "px";
};

const slide = (e) => {
  if (e.keyCode === 37) {
    if (count > 0) {
      count -= 1;
      changeLight();
      changeSlide();
    }
  }
  if (e.keyCode === 39) {
    if (window.innerWidth >= 800 && count > 1) {
      return;
    }
    if (count < lights.length - 1) {
      count += 1;
      changeLight();
      changeSlide();
    }
  }
};

const handleSwipe = (dist) => {
  if (dist > 0 && count > 0) {
    count -= 1;
    changeLight();
    changeSlide();
  } else if (dist < 0 && count < lights.length - 1) {
    count += 1;
    changeLight();
    changeSlide();
  }
};

const handleTouchStart = (e) => {
  let touchobj = e.changedTouches[0];
  startX = touchobj.pageX;
  startY = touchobj.pageY;
  startTime = new Date().getTime();
};

const handleTouchEnd = (e) => {
  let touchobj = e.changedTouches[0];
  dist = touchobj.pageX - startX;
  elapsedTime = new Date().getTime() - startTime;

  if (elapsedTime <= allowedTime && Math.abs(dist) >= threshold) {
    handleSwipe(dist);
  }
};

const handleNav = () => {
  navMobile.classList.toggle("hide");
  navBtn.classList.toggle("open");

  if (navBtn.classList.contains("open")) {
    navBtn.src = "./images/icon-close.svg";
    navBtn.style.height = "25px";
  } else {
    navBtn.src = "./images/icon-hamburger.svg";
    navBtn.style.height = "20px";
  }
};

//Events

document.addEventListener("keydown", slide);
slider.addEventListener("touchstart", handleTouchStart);
slider.addEventListener("touchend", handleTouchEnd);
navBtn.addEventListener("click", handleNav);
form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (email.value === '') {
    form.classList.add("error");
    return
  }
  form.classList.remove("error");
  email.value = "";
});
document.addEventListener(
  "invalid",
  (function () {
    return function (e) {
      e.preventDefault();
      form.classList.add("error");
      email.focus();
    };
  })(),
  true
);
