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

// GSAP
let animationDuration = 0.8;
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

console.log('Im Home')

