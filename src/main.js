import './styles/style.css'

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from 'split-type';
import Lenis from '@studio-freight/lenis'
import Swiper from 'swiper';

// LENIS
const lenis = new Lenis()
function raf(time) {
  lenis.raf(time)
  requestAnimationFrame(raf)
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



// FAQ
  
  const faq = document.querySelectorAll(".faq")

  faq.forEach((faq) => {
    const faqAnswer = faq.querySelector(".faq_answer");

    faq.addEventListener("click", function() {
      faqAnswer.classList.toggle("active")
      faq.classList.toggle("active")

    })
  })




