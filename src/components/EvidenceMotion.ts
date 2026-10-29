import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);
gsap
  .matchMedia()
  .add("(min-width:760px) and (prefers-reduced-motion:no-preference)", () => {
    gsap.from("[data-evidence-motion]", {
      y: 36,
      force3D: false,
      scrollTrigger: {
        trigger: "[data-evidence-motion]",
        scrub: true,
        start: "top bottom",
        end: "top center",
      },
    });
  });
