import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
export function initNutrizenCase() {
  const root = document.querySelector<HTMLElement>("[data-nutrizen]");
  if (!root) return;
  gsap.registerPlugin(ScrollTrigger);
  const mm = gsap.matchMedia();
  mm.add(
    { desktop: "(min-width:760px)", reduce: "(prefers-reduced-motion:reduce)" },
    (ctx) => {
      if (ctx.conditions!.reduce || !ctx.conditions!.desktop) return;
      root.dataset.motion = "full";
      const image = root.querySelector<HTMLImageElement>(
        ".nz-week-window img",
      )!;
      gsap.to(image, {
        y: () =>
          -Math.max(0, image.offsetHeight - image.parentElement!.clientHeight),
        ease: "none",
        force3D: false,
        snap: { y: 1 },
        scrollTrigger: {
          trigger: root.querySelector(".nz-week-story"),
          start: "top 100px",
          end: "bottom 85%",
          scrub: 0.4,
          invalidateOnRefresh: true,
        },
      });
      gsap.from(root.querySelector(".nz-recipe-phone"), {
        y: 45,
        force3D: false,
        ease: "none",
        scrollTrigger: {
          trigger: root.querySelector(".nz-recipe-composition"),
          start: "top 90%",
          end: "top 25%",
          scrub: 0.4,
        },
      });
      return () => {
        delete root.dataset.motion;
      };
    },
  );
  document.addEventListener("astro:before-swap", () => mm.revert(), {
    once: true,
  });
}
