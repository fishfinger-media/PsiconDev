import './styles/style.css'

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from 'split-type';
import Lenis from '@studio-freight/lenis'
import Swiper from 'swiper';

console.log("notlive")

const lenis = new Lenis()


function raf(time) {
  lenis.raf(time)
  requestAnimationFrame(raf)
  autoResize = true
}

requestAnimationFrame(raf)

// TOGGLES

// ANIMATION
const animationCheckbox = document.getElementById("animationToggle");

function toggleAnimation() {
  const animationDuration = animationCheckbox.checked ? 0.8 : 0;
  localStorage.setItem("animationDuration", animationDuration);
  location.reload();
}

animationCheckbox.addEventListener("change", toggleAnimation);
const storedAnimationDuration = localStorage.getItem("animationDuration");
if (storedAnimationDuration === null) {
    animationCheckbox.checked = true;
    toggleAnimation(); 
  } else {
    animationCheckbox.checked = parseFloat(storedAnimationDuration) === 0.8;
}

const animationDuration = parseFloat(localStorage.getItem("animationDuration"));

// INCREASE FONT

const textToggleCheckbox = document.getElementById("textToggle");

function increaseFontSize() {
  document.body.style.fontSize = "1.5rem";
}

function resetFontSize() {
  document.body.style.fontSize = "";
}

textToggleCheckbox.addEventListener("change", function() {
  if (textToggleCheckbox.checked) {
    increaseFontSize();
    localStorage.setItem("fontSizePreference", "20rem");
  } else {
    resetFontSize();
    localStorage.removeItem("fontSizePreference");
  }
});

const storedFontSize = localStorage.getItem("fontSizePreference");

if (storedFontSize === "1.5rem") {
  textToggleCheckbox.checked = true;
  increaseFontSize();
}



gsap.registerPlugin(ScrollTrigger);
// GSAP
let homeText = new SplitType("[home-heading]")

gsap.timeline()
  .from(".section_home-hero", {opacity:0, yPercent: 10, duration:animationDuration })
  .from(homeText.chars, {opacity:0, yPercent: 40, stagger: {amount: 0.6}, ease:"back", duration: animationDuration}, animationDuration/2)
  .from("[home-fade]", {opacity:0, yPercent: 25, ease:"back", duration:animationDuration},animationDuration/2)
  .from("[home-image]", {opacity:0, yPercent: 5, ease:"back", duration:animationDuration*2},animationDuration/2)

document.querySelectorAll("[data-section]").forEach((section) => {
  gsap.from(section, {opacity: 0, y: 128, ease: "power4.out", duration: animationDuration, delay:0.2,
  scrollTrigger: {
    trigger: section,
    start: "top 80%",
    end: "bottom 80%",
    toggleActions: "play none none none"
  }
  });
});

document.querySelectorAll("[data-card]").forEach((card, index) => {
  gsap.from(card, {
    opacity: 0,
    y: 50,
    ease: "power4.out",
    duration: animationDuration,
    delay: 0.2 + 0.05 * index, // Add 0.5ms delay for each iteration
    scrollTrigger: {
      trigger: card,
      start: "top 85%",
      end: "bottom 85%",
      toggleActions: "play none none none",
    },
  });
});


// FAQ
  
  const faq = document.querySelectorAll(".faq")

  faq.forEach((faq) => {
    const faqAnswer = faq.querySelector(".faq_answer");

    faq.addEventListener("click", function() {
      faqAnswer.classList.toggle("active")
      faq.classList.toggle("active")

    })
  })


// HOVER CARD

const hoverCard = document.querySelectorAll(".card_hover-wrapper");

hoverCard.forEach((hoverCard) => {
  const hoverTop = hoverCard.querySelector(".card_hover-top");
  const hoverBottom = hoverCard.querySelector(".card_hover-bottom");
  const gradientBalls = hoverCard.querySelectorAll(".gradient-ball");

  hoverCard.addEventListener("mouseenter", function () {
    hoverTop.style.transform = "scale(0.8)";
    hoverTop.style.opacity = "0";
    hoverBottom.style.transform = "scale(1)";
    hoverBottom.style.opacity = "1";

    gradientBalls.forEach((ball) => {
      ball.style.opacity = "1";
      ball.style.transform = "scale(1)";
    }); 
      
  });

  hoverCard.addEventListener("mouseleave", function () {
    hoverTop.style.transform = "scale(1)";
    hoverTop.style.opacity = "1";
    hoverBottom.style.transform = "scale(0.8)";
    hoverBottom.style.opacity = "0";

    gradientBalls.forEach((ball) => {
      ball.style.opacity = "0";
      ball.style.transform = "scale(0.5)";

    });
  });
});

// ABOUT POPUP

const aboutPopup = document.querySelectorAll('#bioCard');

aboutPopup.forEach((aboutPopup) => {
  const wrapper = aboutPopup.querySelector(".card_popup-wrapper");
  const content = aboutPopup.querySelector(".card_popup-container");
  const button = aboutPopup.querySelector("#openPopup");
  const close = aboutPopup.querySelector(".icon_close");

  button.addEventListener("click", function () {
    
    lenis.isStopped = true;
    document.body.style.overflow = 'hidden';
    wrapper.style.display = "flex";
    wrapper.style.opacity = "1";
    // Use a setTimeout to force the browser to apply the initial styles first
    setTimeout(() => {
      content.style.transform = "translateY(0)";
      content.style.opacity = "1";
    }, 0);
  });

  close.addEventListener("click", function () {
    lenis.isStopped = false;
    document.body.style.overflow = 'auto';

    content.style.transform = "translateY(100vh)"; // Move content down 100vh
    content.style.opacity = "0";

    setTimeout(() => {
      wrapper.style.opacity = "0";

      // After the content animation is complete, hide the wrapper
      setTimeout(() => {
        wrapper.style.display = "none";
      }, 800); // Replace with the actual duration of your CSS transition
    }, 800);

    
  });

});






// HOMEPAGE



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


function wellbeingSelected() {
  // Check the value of the 'help' variable
  if (help === 'wellbeing') {
    // Run the 'updateURL()' function if 'help' is 'wellbeing'
    updateURL();
  }else  {
    fadeOutAndSlideNext()
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
document.getElementById('service-btn-adults').addEventListener('click', function () { person = 'adults'; preloadURL(); wellbeingSelected() });
document.getElementById('service-btn-children').addEventListener('click', function() { person = 'children'; preloadURL(); wellbeingSelected() });
document.getElementById('service-btn-yes').addEventListener('click', function() { nhs = 'yes'; updateURL(); });
document.getElementById('service-btn-no').addEventListener('click', function() { nhs = 'no'; updateURL(); });
