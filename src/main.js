import './styles/style.css'

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from 'split-type';
import Lenis from '@studio-freight/lenis'
import Swiper from 'swiper';

console.log("notlive")
gsap.registerPlugin(ScrollTrigger);



// GSAP

// Function to run GSAP animations
function runAnimations() {
  
  
// GSAP
let homeText = new SplitType("[home-heading]")

gsap.timeline()
  .from(".section_home-hero", {opacity:0, yPercent: 10, duration:0.8 })
  .from(homeText.chars, {opacity:0, yPercent: 20, stagger: {amount: 0.6}, ease:"back", duration: 0.8}, 0.4)
  .from("[home-fade]", {opacity:0, yPercent: 20, ease:"back", duration:0.8},0.4)
  .from("[home-image]", {opacity:0, yPercent: 5, ease:"back", duration:0.8*2},0.4)

document.querySelectorAll("[data-section]").forEach((section) => {
  gsap.from(section, {opacity: 0, y: 10, ease: "power4.out", duration: 0.8, delay:0.2,
  scrollTrigger: {
    trigger: section,
    start: "top 85%",
    end: "bottom 85%",
    toggleActions: "play none none none"
  }
  });
});

document.querySelectorAll("[data-card]").forEach((card, index) => {
  gsap.from(card, {
    opacity: 0,
    y: 50,
    ease: "power4.out",
    duration: 0.8,
    delay: 0.2 + 0.03 * index, // Add 0.5ms delay for each iteration
    scrollTrigger: {
      trigger: card,
      start: "top 85%",
      end: "bottom 85%",
      toggleActions: "play none none none",
    },
  });
});



}

// Function to save the checkbox state to localStorage
function saveCheckboxState() {
  const checkbox = document.getElementById("animationToggle");
  localStorage.setItem("animationEnabled", checkbox.checked);
}

// Function to load the checkbox state from localStorage
function loadCheckboxState() {
  const checkbox = document.getElementById("animationToggle");
  const animationEnabled = localStorage.getItem("animationEnabled");

  if (animationEnabled !== null) {
    checkbox.checked = JSON.parse(animationEnabled);
  }

  // Check the initial state and run animations if it's checked
  if (checkbox.checked) {
    runAnimations();
  }
}

// Run this function when the page loads to load the checkbox state
window.addEventListener("load", loadCheckboxState);

// Run this function when the checkbox changes state
document.getElementById("animationToggle").addEventListener("change", function() {
  saveCheckboxState();
  if (this.checked) {
    runAnimations();
  } else {
    // Refresh the page if unchecked
    location.reload();
  }
});


// INCREASE FONT

const textToggleCheckbox = document.getElementById("textToggle");

function increaseFontSize() {
  const allElements = document.querySelectorAll('*');
  allElements.forEach(function(element) {
    const computedStyle = window.getComputedStyle(element);
    const currentFontSize = parseFloat(computedStyle.fontSize);
    const newFontSize = currentFontSize + 2;
    element.style.fontSize = newFontSize + 'px';
    lenis.resize
  });
  
}

function resetFontSize() {
  const allElements = document.querySelectorAll('*');
  allElements.forEach(function(element) {
    element.style.fontSize = '';
    lenis.resize
  });
  
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

// FAQ
  
const faq = document.querySelectorAll(".faq");

faq.forEach((faq) => {
  const faqAnswer = faq.querySelector(".faq_answer");

  faq.addEventListener("click", function() {
    faqAnswer.classList.toggle("active");
    faq.classList.toggle("active");

    

    // Wait for 0.8 seconds (800 milliseconds) and then set lenis.autoResize to true
    setTimeout(function() {
      lenis.resize()
    }, 800); // 800 milliseconds = 0.8 seconds
  });
});




// HOVER CARD
const hoverCards = document.querySelectorAll(".card_hover-wrapper");

function playMouseAnimation(hoverCard) {
  const hoverTop = hoverCard.querySelector(".card_hover-top");
  const hoverBottom = hoverCard.querySelector(".card_hover-bottom");
  const gradientBalls = hoverCard.querySelectorAll(".gradient-ball");

  const tl = gsap.timeline({ paused: true });

  tl.to(hoverTop, { scale: 0.8, opacity: 0 });
  tl.to(hoverBottom, { scale: 1, opacity: 1 });
  tl.to(gradientBalls, { scale: 1, opacity: 1 });

  hoverCard.addEventListener("mouseenter", () => {
    tl.play();
  });

  hoverCard.addEventListener("mouseleave", () => {
    tl.reverse();
  });
}

function playScrollTriggerAnimation(hoverCard) {
  const hoverTop = hoverCard.querySelector(".card_hover-top");
  const hoverBottom = hoverCard.querySelector(".card_hover-bottom");
  const gradientBalls = hoverCard.querySelectorAll(".gradient-ball");

  const tl = gsap.timeline({ paused: true });

  tl.to(hoverTop, { scale: 0.8, opacity: 0 });
  tl.to(hoverBottom, { scale: 1, opacity: 1 });
  tl.to(gradientBalls, { scale: 1, opacity: 1 });

  ScrollTrigger.create({
    trigger: hoverCard,
    start: "top 70%",
    end: "bottom 30%",
    onEnter: () => {
      tl.play();
    },
    onLeave: () => {
      tl.reverse();
    }
  });
}

function handleWindowSize() {
  const screenWidth = window.innerWidth;

  hoverCards.forEach((hoverCard) => {
    if (screenWidth > 991) {
      // Use mouse-based animation
      playMouseAnimation(hoverCard);
    } else {
      // Use ScrollTrigger-based animation
      playScrollTriggerAnimation(hoverCard);
    }
  });
}

// Initial check for window size
handleWindowSize();

// Listen for window resize events
window.addEventListener("resize", handleWindowSize);




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

// SWIPER NEXT SLIDE
function fadeOutAndSlideNext() {
  const elementToFadeOut = document.querySelector('.swiper_slide.swiper-slide-active');
    elementToFadeOut.classList.remove('swiper-slide-active')
    setTimeout(function(){
      serviceFinder.slideNext()
    },500);
}

function fadeOutAndSlidePrev() {
  const elementToFadeOut = document.querySelector('.swiper_slide.swiper-slide-active');
    elementToFadeOut.classList.remove('swiper-slide-active')
    setTimeout(function(){
      serviceFinder.slidePrev()
    },500);
}






// URL GENERATION
let help = '';
let person = '';


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


document.querySelector('[service-open]').addEventListener('click', function () { help = 'autism'; fadeOutAndSlideNext() });
document.querySelectorAll("[data-back]").forEach(element => element.addEventListener("click", fadeOutAndSlidePrev));
document.getElementById('service-btn-autism').addEventListener('click', function () { help = 'autism'; fadeOutAndSlideNext() });
document.getElementById('service-btn-adhd').addEventListener('click', function () { help = 'adhd'; fadeOutAndSlideNext() });
document.getElementById('service-btn-wellbeing').addEventListener('click', function () { help = 'wellbeing'; preloadURL(); fadeOutAndSlideNext() });
document.getElementById('service-btn-adults').addEventListener('click', function () { person = 'adults'; preloadURL(); updateURL(); });
document.getElementById('service-btn-children').addEventListener('click', function() { person = 'children'; preloadURL(); updateURL(); });
