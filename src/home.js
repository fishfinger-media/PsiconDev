import './styles/style.css'

console.log('COUNTRY ROAD TAKE ME HOME')
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Swiper from 'swiper';


// SERVICE SLIDER 

// SWIPER
const serviceFinder = new Swiper(".swiper", {
  wrapperClass: "swiper_wrapper",
  slideClass: "swiper_slide",
  slidesPerView: 1,
  allowTouchMove: false,
  speed: 0,
});

// SWIPER TRANSITION
function fadeOutAndSlideNext() {
  // Find the element with the specified class
  const elementToFadeOut = document.querySelector('.swiper_slide.swiper-slide-active');

  if (elementToFadeOut) {
      // Set the opacity to 0 over 1000ms (1 second)
      elementToFadeOut.style.transition = 'opacity 500ms';
      elementToFadeOut.style.opacity = 0;

      // Wait for the animation to complete, then call serviceFinder.slideNext()
      setTimeout(function () {
          serviceFinder.slideNext();
      }, 500);
  } else {
      // If the element is not found, just call serviceFinder.slideNext() without animation
      serviceFinder.slideNext();
  }
}

// OPEN SERVICE PICKER
const serviceNextElements = document.querySelectorAll("[service-open]");
serviceNextElements.forEach(function (element) {
  element.addEventListener("click", function () {
      fadeOutAndSlideNext()
  });
});

// BACK BUTTON
const serviceBackElements = document.querySelectorAll("[service-back]");
serviceBackElements.forEach(function (element) {
  element.addEventListener("click", function () {
      serviceFinder.slidePrev();
  });
});

// URL GENERATION
let help = '';
let person = '';
let nhs = '';

function updateURL() {
  const url = `/services/${help}/${person}`;
  window.location.href = url;
}

// Function to preload the URL
function preloadURL() {
  const url = `/services/${help}/${person}`;
  const a = document.createElement('a');
  a.href = url;
  a.style.display = 'none'; 
  document.body.appendChild(a);
}

document.getElementById('service-btn-autism').addEventListener('click', function () { help = 'autism'; fadeOutAndSlideNext() });
document.getElementById('service-btn-adhd').addEventListener('click', function () { help = 'adhd'; fadeOutAndSlideNext() });
document.getElementById('service-btn-wellbeing').addEventListener('click', function () { help = 'wellbeing'; fadeOutAndSlideNext() });
document.getElementById('service-btn-adults').addEventListener('click', function () { person = 'adults'; preloadURL(); fadeOutAndSlideNext() });
document.getElementById('service-btn-children').addEventListener('click', function() { person = 'children'; preloadURL(); fadeOutAndSlideNext() });
document.getElementById('service-btn-yes').addEventListener('click', function() { nhs = 'yes'; updateURL(); });
document.getElementById('service-btn-no').addEventListener('click', function() { nhs = 'no'; updateURL(); });