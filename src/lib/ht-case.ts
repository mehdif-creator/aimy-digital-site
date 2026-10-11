import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
export function initHtCase() {
  const root = document.querySelector<HTMLElement>("[data-ht-case]");
  if (!root) return;
  gsap.registerPlugin(ScrollTrigger);
  const toggle = root.querySelector<HTMLButtonElement>(".ht-motion")!;
  let manual = false;
  let media: gsap.MatchMedia;
  function configure() {
    media?.revert();
    media = gsap.matchMedia();
    media.add(
      {
        desktop: "(min-width:760px)",
        mobile: "(max-width:759px)",
        reduce: "(prefers-reduced-motion:reduce)",
      },
      (context) => {
        const { mobile, reduce } = context.conditions!;
        const reduced = reduce || manual;
        root!.dataset.motion = reduced ? "reduced" : "full";
        toggle.hidden = !!reduce;
        toggle.setAttribute("aria-pressed", String(manual));
        toggle.textContent = manual
          ? "Activer les animations"
          : "Réduire les animations";
        const notes = [...root!.querySelectorAll<HTMLElement>(".ht-note")];
        notes.forEach((n) => delete n.dataset.active);
        if (reduced) return;
        if (!mobile) {
          gsap.fromTo(
            root!.querySelector(".ht-main-view"),
            { y: 24, force3D: false },
            {
              y: 0,
              ease: "none",
              scrollTrigger: {
                trigger: root!.querySelector(".ht-main-view"),
                start: "top bottom",
                end: "top 25%",
                scrub: 0.4,
              },
            },
          );
        }
        gsap.fromTo(
          root!.querySelector(".ht-next > div:last-child"),
          { y: 18 },
          {
            y: 0,
            force3D: false,
            snap: { y: 1 },
            ease: "none",
            scrollTrigger: {
              trigger: root!.querySelector(".ht-next"),
              start: "top 95%",
              end: "top 65%",
              scrub: 0.3,
            },
          },
        );
        const stage = root!.querySelector(".ht-exhibit-stage");
        const story = gsap.timeline({
          scrollTrigger: {
            trigger: mobile ? stage : root!.querySelector(".ht-exhibit"),
            start: mobile ? "top 85%" : "top 65%",
            end: mobile ? "bottom 25%" : "bottom 80%",
            scrub: 0.35,
          },
        });
        story
          .to(
            root!.querySelector(".ht-desktop"),
            {
              y: -12,
              duration: 0.5,
              ease: "none",
              force3D: false,
              snap: { y: 1 },
            },
            0,
          )
          .fromTo(
            root!.querySelector(".ht-mobile"),
            { y: mobile ? 18 : 55 },
            { y: 0, duration: 1, ease: "none", force3D: false, snap: { y: 1 } },
            0,
          )
          .to(
            root!.querySelector(".ht-exhibit-progress i"),
            { scaleX: 1, duration: 1, ease: "none" },
            0,
          );
        notes.forEach((note) =>
          ScrollTrigger.create({
            trigger: note,
            start: "top 70%",
            end: "bottom 35%",
            onToggle: (self) => {
              note.dataset.active = String(self.isActive);
            },
          }),
        );
      },
    );
  }
  configure();
  toggle.addEventListener("click", () => {
    manual = !manual;
    configure();
  });
  document.addEventListener("astro:before-swap", () => media.revert(), {
    once: true,
  });
}
