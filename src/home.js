import './styles/style.css'

console.log('COUNTRY ROAD TAKE ME HOME')
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from 'split-type';

gsap.registerPlugin(ScrollTrigger);
let animationDuration = 0.8;

let homeText = new SplitType("[home-heading]")

gsap.timeline()
  .from(".section_home-hero", {opacity:0, yPercent: 10, duration:animationDuration })
  .from(homeText.chars, {opacity:0, yPercent: 40, stagger: {amount: 0.6}, ease:"back", duration: animationDuration}, animationDuration/2)
  .from("[home-fade]", {opacity:0, yPercent: 25, ease:"back", duration:animationDuration},animationDuration/2)
  .from("[home-image]", {opacity:0, yPercent: 5, ease:"back", duration:animationDuration*2},animationDuration/2)

