import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function initCinematicHero() {
  const element = document.querySelector<HTMLElement>("[data-cinematic-hero]");
  if (!element) return;
  const hero: HTMLElement = element;
  gsap.registerPlugin(ScrollTrigger);
  const toggle = hero.querySelector<HTMLButtonElement>(
    ".cinema-motion-toggle",
  )!;
  const hit = hero.querySelector<HTMLElement>(".cinema-art-hit")!;
  const art = hero.querySelector<HTMLElement>(".cinema-art")!;
  const copies = [...hero.querySelectorAll<HTMLElement>("[data-copy]")];
  let manualReduced = false;
  let introduced = false;
  let media: gsap.MatchMedia;
  function scene(number: number) {
    hero.dataset.scene = String(number);
    copies.forEach((copy, index) =>
      copy.setAttribute("aria-hidden", String(index !== number - 1)),
    );
  }
  function configure() {
    media?.revert();
    hero.dataset.motion = "reduced";
    scene(1);
    media = gsap.matchMedia();
    media.add(
      {
        desktop: "(min-width: 760px)",
        mobile: "(max-width: 759px)",
        reduce: "(prefers-reduced-motion: reduce)",
        pointer: "(hover: hover) and (pointer: fine)",
      },
      (context) => {
        const { mobile, reduce, pointer } = context.conditions!;
        toggle.hidden = !!reduce;
        toggle.setAttribute("aria-pressed", String(manualReduced));
        toggle.textContent = manualReduced
          ? "Activer les animations"
          : "Réduire les animations";
        hero.dataset.motion = reduce || manualReduced ? "reduced" : "full";
        hero.dataset.ready = "true";
        scene(1);
        if (reduce || manualReduced) return;
        const select = gsap.utils.selector(hero);
        if (!mobile && !introduced && scrollY < hero.offsetTop + 80) {
          gsap
            .timeline({ defaults: { ease: "power3.out" } })
            .from(
              select(".cinema-line > span"),
              { yPercent: 106, duration: 0.65, stagger: 0.08 },
              0,
            )
            .from(art, { y: 35, duration: 1 }, 0)
            .from(
              select(".cinema-light"),
              { scaleX: 0.1, transformOrigin: "right", duration: 1.15 },
              0,
            );
        }
        introduced = true;
        // Le titre principal et le CTA ne sont jamais atténués ni déplacés au scroll.
        const story = gsap.timeline({
          defaults: { ease: "power1.inOut" },
          scrollTrigger: {
            id: "aimy-hero",
            trigger: hero,
            start: "top top",
            end: "bottom bottom",
            scrub: mobile ? 0.16 : 0.35,
            invalidateOnRefresh: true,
            onUpdate: (self) =>
              scene(self.progress < 0.33 ? 1 : self.progress < 0.73 ? 2 : 3),
          },
        });
        story
          .to(
            select(".shot-main"),
            {
              rotationX: 0,
              rotationY: 0,
              rotationZ: 0,
              x: -20,
              y: -25,
              scale: 0.94,
              duration: 0.24,
            },
            0.12,
          )
          .to(
            select(".shot-nutri"),
            { x: 70, y: -25, autoAlpha: 0.25, duration: 0.22 },
            0.15,
          )
          .to(
            select(".shot-games"),
            { x: 70, y: 40, autoAlpha: 0.18, duration: 0.22 },
            0.15,
          )
          .fromTo(
            select(".shot-phone"),
            { autoAlpha: 0, y: 85, rotationZ: 8 },
            { autoAlpha: 1, y: 0, rotationZ: 0, duration: 0.2 },
            0.25,
          )
          .to(select(".shot-main img"), { y: -180, duration: 0.2 }, 0.36)
          .set(copies[1], { visibility: "visible" }, 0.28)
          .to(copies[0], { yPercent: -110, duration: 0.1 }, 0.28)
          .fromTo(
            copies[1],
            { yPercent: 110 },
            { yPercent: 0, duration: 0.1 },
            0.28,
          )
          .fromTo(
            select(".cinema-contact-note"),
            { autoAlpha: 0, y: 15 },
            { autoAlpha: 1, y: 0, duration: 0.12 },
            0.38,
          )
          .to(
            select(".shot-phone, .cinema-contact-note"),
            { autoAlpha: 0, y: 30, duration: 0.12 },
            0.62,
          )
          .to(select(".shot-main img"), { y: 0, duration: 0.18 }, 0.67)
          .to(
            select(".shot-main"),
            { x: -70, y: 45, rotationZ: 0, scale: 0.62, duration: 0.25 },
            0.67,
          )
          .to(
            select(".shot-nutri"),
            {
              x: 38,
              y: 100,
              rotationZ: 0,
              scale: 0.66,
              autoAlpha: 1,
              duration: 0.25,
            },
            0.67,
          )
          .to(
            select(".shot-games"),
            {
              x: 34,
              y: 38,
              rotationZ: 0,
              scale: 0.66,
              autoAlpha: 1,
              duration: 0.25,
            },
            0.67,
          )
          .set(copies[2], { visibility: "visible" }, 0.68)
          .to(copies[1], { yPercent: -110, duration: 0.1 }, 0.68)
          .fromTo(
            copies[2],
            { yPercent: 110 },
            { yPercent: 0, duration: 0.1 },
            0.68,
          )
          .to(
            select(".cinema-light"),
            { rotation: 0, y: 100, duration: 0.3 },
            0.65,
          )
          .to(
            select(".cinema-watermark"),
            { xPercent: 8, duration: 1, ease: "none" },
            0,
          );
        if (pointer && !mobile) {
          const tiltX = gsap.quickTo(art, "rotationX", {
            duration: 0.5,
            ease: "power3.out",
          });
          const tiltY = gsap.quickTo(art, "rotationY", {
            duration: 0.5,
            ease: "power3.out",
          });
          const move = (event: PointerEvent) => {
            const box = hit.getBoundingClientRect();
            tiltX(((event.clientY - box.top) / box.height - 0.5) * -4);
            tiltY(((event.clientX - box.left) / box.width - 0.5) * 5);
          };
          const leave = () => {
            tiltX(0);
            tiltY(0);
          };
          hit.addEventListener("pointermove", move);
          hit.addEventListener("pointerleave", leave);
          return () => {
            hit.removeEventListener("pointermove", move);
            hit.removeEventListener("pointerleave", leave);
          };
        }
      },
    );
    ScrollTrigger.refresh();
  }
  configure();
  toggle.addEventListener("click", () => {
    const distance = hero.getBoundingClientRect().top;
    manualReduced = !manualReduced;
    configure();
    if (distance < 0)
      window.scrollTo({ top: hero.offsetTop, behavior: "instant" });
  });
  document.addEventListener("astro:before-swap", () => media.revert(), {
    once: true,
  });
}
