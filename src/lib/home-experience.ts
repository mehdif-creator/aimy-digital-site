import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
export function initHomeExperience() {
  const root = document.querySelector<HTMLElement>("[data-home-experience]");
  if (!root) return;
  gsap.registerPlugin(ScrollTrigger);
  const serviceSection = root.querySelector<HTMLElement>(".home-services")!;
  const services = [
    ...root.querySelectorAll<HTMLDetailsElement>(".home-service"),
  ];
  const activate = (element: HTMLDetailsElement) => {
    serviceSection.dataset.service = element.dataset.serviceIndex;
  };
  services.forEach((service) => {
    service.addEventListener("pointerenter", () => activate(service));
    service.addEventListener("focusin", () => activate(service));
    service.addEventListener("toggle", () => {
      if (service.open) activate(service);
    });
  });
  const button = root.querySelector<HTMLButtonElement>(".home-motion-toggle")!;
  const steps = [...root.querySelectorAll<HTMLElement>("[data-process-step]")];
  let manual = false;
  let media: gsap.MatchMedia;
  function configure() {
    media?.revert();
    media = gsap.matchMedia();
    media.add(
      {
        reduce: "(prefers-reduced-motion: reduce)",
        mobile: "(max-width:759px)",
        desktop: "(min-width:760px)",
      },
      (context) => {
        const { reduce, mobile } = context.conditions!;
        const reduced = reduce || manual;
        root!.dataset.motion = reduced ? "reduced" : "full";
        button.hidden = !!reduce;
        button.setAttribute("aria-pressed", String(manual));
        button.textContent = manual
          ? "Activer les animations de cette page"
          : "Réduire les animations de cette page";
        steps.forEach((step) => delete step.dataset.active);
        if (reduced) return;
        gsap.to(root!.querySelector(".home-process-rail i"), {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: root!.querySelector(".home-process-track"),
            start: "top 65%",
            end: "bottom 65%",
            scrub: 0.25,
          },
        });
        steps.forEach((step) =>
          ScrollTrigger.create({
            trigger: step,
            start: "top 65%",
            end: "bottom 65%",
            onToggle: (self) => {
              step.dataset.active = String(self.isActive);
            },
          }),
        );
        gsap.fromTo(
          root!.querySelector(".home-service-light"),
          { x: -35 },
          {
            x: 65,
            ease: "none",
            scrollTrigger: {
              trigger: serviceSection,
              start: "top bottom",
              end: "bottom top",
              scrub: 0.5,
            },
          },
        );
        gsap.fromTo(
          root!.querySelector(".home-closing-halo"),
          { y: mobile ? 25 : 65, rotation: -12 },
          {
            y: 0,
            rotation: 12,
            ease: "none",
            scrollTrigger: {
              trigger: root!.querySelector(".home-closing"),
              start: "top bottom",
              end: "bottom bottom",
              scrub: 0.5,
            },
          },
        );
      },
    );
    ScrollTrigger.refresh();
  }
  configure();
  button.addEventListener("click", () => {
    manual = !manual;
    configure();
  });
  let frame = 0;
  root.querySelectorAll("details").forEach((detail) =>
    detail.addEventListener("toggle", () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => ScrollTrigger.refresh());
    }),
  );
  document.addEventListener(
    "astro:before-swap",
    () => {
      cancelAnimationFrame(frame);
      media.revert();
    },
    { once: true },
  );
}
