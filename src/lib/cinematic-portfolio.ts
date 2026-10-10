import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
export function initCinematicPortfolio() {
  const root = document.querySelector<HTMLElement>(".showcase");
  if (!root) return;
  gsap.registerPlugin(ScrollTrigger);
  const button = root.querySelector<HTMLButtonElement>(
    "[data-showcase-toggle]",
  )!;
  let manual = false;
  let media: gsap.MatchMedia;
  function configure() {
    media?.revert();
    media = gsap.matchMedia();
    media.add(
      {
        reduce: "(prefers-reduced-motion: reduce)",
        mobile: "(max-width:759px)",
        roomy: "(min-height:760px) and (min-width:360px)",
      },
      (context) => {
        const { reduce, mobile, roomy } = context.conditions!;
        const reduced = reduce || manual;
        root!.dataset.motion = reduced ? "reduced" : roomy ? "full" : "compact";
        button.hidden = !!reduce;
        button.setAttribute("aria-pressed", String(manual));
        button.textContent = manual
          ? "Activer les animations du portfolio"
          : "Réduire les animations du portfolio";
        if (reduced) return;
        root!
          .querySelectorAll<HTMLElement>(".showcase-chapter")
          .forEach((chapter) => {
            const screen =
              chapter.querySelector<HTMLElement>(".showcase-desktop")!;
            const image = chapter.querySelector<HTMLImageElement>(
              ".showcase-viewport img",
            )!;
            const viewport =
              chapter.querySelector<HTMLElement>(".showcase-viewport")!;
            const story = gsap.timeline({
              scrollTrigger: {
                trigger: chapter,
                start: roomy ? "top top" : "top 35%",
                end: roomy ? "bottom bottom" : "bottom 70%",
                scrub: mobile ? 0.2 : 0.45,
                invalidateOnRefresh: true,
              },
            });
            story
              .to(
                screen,
                {
                  rotationX: 0,
                  rotationY: 0,
                  rotationZ: 0,
                  scale: 1,
                  force3D: false,
                  duration: 0.45,
                  ease: "power1.inOut",
                },
                0,
              )
              .to(
                image,
                {
                  y: () =>
                    -Math.min(
                      Math.max(0, image.offsetHeight - viewport.clientHeight),
                      mobile ? 190 : 360,
                    ),
                  duration: 0.65,
                  force3D: false,
                  snap: { y: 1 },
                  ease: "none",
                },
                0.25,
              )
              .to(
                chapter.querySelector(".showcase-word"),
                { xPercent: -8, duration: 1, ease: "none" },
                0,
              )
              .to(
                chapter.querySelector(".showcase-progress i"),
                { scaleX: 1, duration: 1, ease: "none" },
                0,
              );
            const phone = chapter.querySelector(".showcase-mobile");
            if (phone)
              story.fromTo(
                phone,
                { y: 35, rotation: 5 },
                { y: -15, rotation: 0, duration: 0.6, ease: "power1.inOut" },
                0.3,
              );
          });
      },
    );
    ScrollTrigger.refresh();
  }
  configure();
  button.addEventListener("click", () => {
    manual = !manual;
    configure();
    button.focus({ preventScroll: true });
  });
  // Les dimensions sont réservées par le HTML : aucun refresh au chargement différé, qui interromprait les sauts au clavier.

  document.addEventListener(
    "astro:before-swap",
    () => {
      media.revert();
    },
    { once: true },
  );
}
