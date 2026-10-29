import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);
const root = document.querySelector<HTMLElement>("#creation-cinema");
if (root) {
  const reduced = matchMedia("(prefers-reduced-motion:reduce)");
  const tabs = [...root.querySelectorAll<HTMLButtonElement>("[data-tab]")];
  const panels = [...root.querySelectorAll<HTMLElement>("[data-panel]")];
  root.classList.add("cc-ready");
  root.querySelector("[data-tabs]")?.setAttribute("role", "tablist");
  function selectTab(index: number, animate = true) {
    tabs.forEach((tab, i) => {
      tab.setAttribute("role", "tab");
      tab.id = "tab-" + tab.dataset.tab;
      tab.setAttribute("aria-controls", "cc-" + tab.dataset.tab);
      tab.setAttribute("aria-selected", String(i === index));
      tab.tabIndex = i === index ? 0 : -1;
    });
    panels.forEach((panel, i) => {
      panel.hidden = i !== index;
      panel.setAttribute("role", "tabpanel");
      panel.setAttribute("aria-labelledby", "tab-" + panel.dataset.panel);
      panel.tabIndex = 0;
    });
    gsap.killTweensOf(panels);
    if (animate && !reduced.matches)
      gsap.fromTo(
        panels[index],
        { clipPath: "inset(0 0 12% 0)", y: 12 },
        {
          clipPath: "inset(0 0 0% 0)",
          y: 0,
          duration: 0.45,
          ease: "power2.out",
          clearProps: "clipPath,transform",
          onComplete: () => ScrollTrigger.refresh(),
        },
      );
    else ScrollTrigger.refresh();
  }
  tabs.forEach((tab, i) => {
    tab.addEventListener("click", () => selectTab(i));
    tab.addEventListener("keydown", (event) => {
      let next = i;
      if (event.key === "ArrowRight") next = (i + 1) % tabs.length;
      else if (event.key === "ArrowLeft")
        next = (i + tabs.length - 1) % tabs.length;
      else if (event.key === "Home") next = 0;
      else if (event.key === "End") next = tabs.length - 1;
      else return;
      event.preventDefault();
      selectTab(next);
      tabs[next].focus();
    });
  });
  selectTab(0, false);
  const detailButtons = [
    ...root.querySelectorAll<HTMLButtonElement>("[data-detail]"),
  ];
  const labels = [
    "01 / Navigation",
    "02 / Hiérarchie",
    "03 / Prise de contact",
  ];
  const descriptions = [
    "Services, réalisations, contact : les entrées de navigation nomment ce que le visiteur vient chercher.",
    "Le titre annonce le métier avant les arguments complémentaires. La lecture commence par ce que l’entreprise propose.",
    "Devis et appel sont regroupés et identifiables. Deux actions pour deux façons de prendre contact.",
  ];
  let activeDetail = 0;
  function showDetail(index: number, immediate = false) {
    activeDetail = index;
    detailButtons.forEach((button, i) =>
      button.setAttribute("aria-pressed", String(i === index)),
    );
    root!.querySelector(".cc-detail-label>span")!.textContent = labels[index];
    root!.querySelector(".cc-detail-label>p")!.textContent =
      descriptions[index];
    const mobile = innerWidth < 760;
    gsap.to(root!.querySelector(".cc-detail-image img"), {
      x: mobile && !reduced.matches ? [-200, 0, 0][index] : 0,
      y: reduced.matches
        ? 0
        : mobile
          ? [0, -65, -230][index]
          : [0, -100, -360][index],
      duration: reduced.matches || immediate ? 0 : 0.65,
      ease: "power3.inOut",
      overwrite: true,
    });
    gsap.to(root!.querySelector(".cc-focus-box"), {
      left: mobile ? ["8%", "6%", "6%"][index] : ["34%", "7%", "7%"][index],
      top: ["2%", "18%", "27%"][index],
      width: mobile
        ? ["64%", "88%", "88%"][index]
        : ["55%", "45%", "42%"][index],
      height: ["12%", "50%", "25%"][index],
      duration: reduced.matches || immediate ? 0 : 0.65,
      overwrite: true,
    });
  }
  detailButtons.forEach((button, i) =>
    button.addEventListener("click", () => showDetail(i)),
  );
  showDetail(0, true);
  const mm = gsap.matchMedia();
  mm.add("(prefers-reduced-motion:no-preference)", () => {
    root.classList.add("cc-motion");
    const hero = gsap.timeline({ defaults: { ease: "power3.out" } });
    hero
      .fromTo(
        ".cc-kinetic",
        { y: 20, clipPath: "inset(0 0 25% 0)" },
        {
          y: 0,
          clipPath: "inset(0 0 0% 0)",
          duration: 0.85,
          clearProps: "transform,clipPath",
        },
      )
      .from(
        ".cc-hero-screen",
        {
          rotationX: innerWidth >= 760 ? 18 : 0,
          rotationY: innerWidth >= 760 ? -7 : 0,
          rotationZ: innerWidth >= 760 ? -3 : 0,
          y: innerWidth >= 760 ? 45 : 0,
          duration: 1.2,
        },
        0,
      )
      .from(".cc-coordinates", { letterSpacing: ".22em", duration: 1 }, 0.15);
    const responsive = root.querySelector<HTMLElement>(".cc-responsive")!;
    const aperture = root.querySelector<HTMLElement>(".cc-aperture")!;
    gsap.set(aperture, { clipPath: "inset(0px 0px 0px 0px round 4px)" });
    const inset = () => Math.max(0, (aperture.offsetWidth - 272) / 2);
    const tl = gsap.timeline({
      defaults: { ease: "none" },
      scrollTrigger: {
        id: "creation-responsive",
        trigger: responsive,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.25,
        invalidateOnRefresh: true,
      },
    });
    tl.to(
      ".cc-aperture",
      {
        clipPath: () => `inset(0px ${inset()}px 0px ${inset()}px round 18px)`,
        duration: 0.5,
      },
      0,
    )
      .to(
        ".cc-frame",
        {
          left: () => inset(),
          right: () => inset(),
          borderRadius: 18,
          duration: 0.5,
        },
        0,
      )
      .to(
        ".cc-mobile-shot",
        { clipPath: "inset(0% 0 0 0)", duration: 0.4 },
        0.35,
      )
      .to(
        ".cc-mobile-shot img",
        {
          y: () =>
            -Math.max(
              0,
              root.querySelector<HTMLImageElement>(".cc-mobile-shot img")!
                .offsetHeight - aperture.offsetHeight,
            ),
          duration: 0.25,
        },
        0.75,
      )
      .to(".cc-progress-track>span", { scaleX: 1, duration: 1 }, 0);
    gsap.from(".cc-method-line path", {
      strokeDashoffset: 1,
      scrollTrigger: {
        trigger: ".cc-method",
        start: "top 80%",
        end: "top 25%",
        scrub: true,
      },
    });
    gsap.from(".cc-signature>span", {
      x: -60,
      y: 60,
      rotation: -35,
      scrollTrigger: {
        trigger: ".cc-finale",
        start: "top 80%",
        end: "bottom bottom",
        scrub: true,
      },
    });
    return () => {
      root.classList.remove("cc-motion");
    };
  });
  const update = () => showDetail(activeDetail);
  reduced.addEventListener("change", update);
  window.addEventListener("resize", update);
  // Image decoding can alter lazy panel geometry; refresh the measured scroll range.
  root.querySelectorAll("img").forEach((img) =>
    img.addEventListener("load", () => ScrollTrigger.refresh(), {
      once: true,
    }),
  );
}
