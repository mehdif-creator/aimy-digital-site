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
  const ray = hero.querySelector<SVGPathElement>(".cinema-ray")!;
  const length = ray.getTotalLength();
  let manualReduced = false;
  let introduced = false;
  let media: gsap.MatchMedia;

  function configure() {
    media?.revert();
    hero.dataset.motion = "reduced";
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
        const reduced = reduce || manualReduced;
        toggle.hidden = !!reduce;
        toggle.setAttribute("aria-pressed", String(manualReduced));
        toggle.textContent = manualReduced
          ? "Activer les animations"
          : "Réduire les animations";
        hero.dataset.motion = reduced ? "reduced" : "full";
        hero.dataset.ready = "true";
        if (reduced) return;

        const select = gsap.utils.selector(hero);
        // Les contenus sont visibles dans le HTML ; seul le JS disponible joue l'entrée.
        if (!introduced && scrollY < hero.offsetTop + 80) {
          const intro = gsap.timeline({ defaults: { ease: "power3.out" } });
          intro
            .from(
              select(".cinema-topline"),
              { autoAlpha: 0, y: -8, duration: 0.5 },
              0,
            )
            .fromTo(
              ray,
              { strokeDasharray: length, strokeDashoffset: length },
              { strokeDashoffset: 0, duration: 1.2, ease: "power2.inOut" },
              0,
            )
            .from(
              select(".cinema-eyebrow"),
              { autoAlpha: 0, y: 12, duration: 0.6 },
              0.08,
            )
            .from(
              select(".cinema-line > span"),
              { yPercent: 112, duration: 0.85, stagger: 0.12 },
              0.14,
            )
            .from(
              select(".cinema-line-light b"),
              { autoAlpha: 0, x: -14, y: 14, duration: 0.6 },
              0.6,
            )
            .from(art, { autoAlpha: 0, y: 40, duration: 1.1 }, 0.12)
            .from(
              select(".cinema-description"),
              { autoAlpha: 0, y: 12, duration: 0.65 },
              0.55,
            )
            .from(
              select(".cinema-actions, .cinema-bottom"),
              { autoAlpha: 0, y: 12, duration: 0.55, stagger: 0.08 },
              0.75,
            );
        }
        introduced = true;

        const story = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            id: "aimy-hero",
            trigger: hero,
            start: "top top",
            end: "bottom bottom",
            scrub: mobile ? 0.25 : 0.65,
            invalidateOnRefresh: true,
          },
        });
        story
          .to(
            select(".cinema-copy"),
            { y: mobile ? -45 : -90, autoAlpha: 0, duration: 0.42 },
            0.08,
          )
          .to(
            hit,
            { y: mobile ? 40 : -45, x: mobile ? -25 : 30, duration: 1 },
            0,
          )
          .to(select(".cinema-plane-back"), { y: -45, x: 16, duration: 1 }, 0)
          .to(
            select(".cinema-plane-middle"),
            { y: -10, x: -12, duration: 1 },
            0,
          )
          .to(select(".cinema-plane-front"), { y: 26, x: 20, duration: 1 }, 0)
          .to(
            select(".cinema-watermark"),
            { xPercent: -7, yPercent: 12, autoAlpha: 0.4, duration: 1 },
            0,
          )
          .fromTo(
            select(".cinema-settle"),
            { autoAlpha: 0, y: 45 },
            { autoAlpha: 1, y: 0, duration: 0.38 },
            0.48,
          )
          .to(
            select(".cinema-horizon"),
            { rotation: -10, y: 80, duration: 1 },
            0,
          )
          .to(select(".cinema-progress i"), { scaleX: 1, duration: 1 }, 0);

        if (pointer && !mobile) {
          const tiltX = gsap.quickTo(art, "rotationX", {
            duration: 0.55,
            ease: "power3.out",
          });
          const tiltY = gsap.quickTo(art, "rotationY", {
            duration: 0.55,
            ease: "power3.out",
          });
          const move = (event: PointerEvent) => {
            const box = hit.getBoundingClientRect();
            tiltX(((event.clientY - box.top) / box.height - 0.5) * -8);
            tiltY(((event.clientX - box.left) / box.width - 0.5) * 10);
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
    // Conserver la position relative au contenu suivant quand la scène se raccourcit.
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
