/* Cavaleri Srl — Tiefe beim Scrollen.
   Ein einziger rAF-Lauf für alle Ebenen. Nur transform, nie Layout.
   Elemente melden sich mit data-parallasse="0.18" (Anteil der Sichthöhe).
   Bei "reduzierter Bewegung" passiert nichts. */
(() => {
  const ridotto = matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (ridotto) return;

  let strati = [];
  let attivi = new Set();
  let inCoda = false;

  const raccogli = () => {
    strati = [...document.querySelectorAll("[data-parallasse]")].map(el => ({
      el,
      forza: parseFloat(el.dataset.parallasse) || 0.15,
      asse: el.dataset.asse || "y",
      alto: 0, cima: 0
    }));
    misura();
    strati.forEach(s => vista.observe(s.el));
  };

  // Maße nur bei Bedarf lesen — nicht in jedem Bild.
  const misura = () => {
    const y = scrollY;
    strati.forEach(s => {
      const r = s.el.getBoundingClientRect();
      s.cima = r.top + y;
      s.alto = r.height;
    });
  };

  const vista = new IntersectionObserver(voci => {
    voci.forEach(v => {
      const s = strati.find(x => x.el === v.target);
      if (!s) return;
      v.isIntersecting ? attivi.add(s) : attivi.delete(s);
      s.el.style.willChange = v.isIntersecting ? "transform" : "";
    });
    disegna();
  }, { rootMargin: "12% 0px 12% 0px" });

  function disegna() {
    inCoda = false;
    const h = innerHeight, y = scrollY;
    attivi.forEach(s => {
      // -1 … +1: wo steht das Element im Sichtfenster
      const centro = (s.cima + s.alto / 2 - y - h / 2) / (h / 2 + s.alto / 2);
      const spostamento = centro * s.forza * h * -0.5;
      s.el.style.transform = s.asse === "scala"
        ? `translate3d(0,${spostamento.toFixed(1)}px,0) scale(${(1 + Math.abs(centro) * 0.04).toFixed(4)})`
        : `translate3d(0,${spostamento.toFixed(1)}px,0)`;
    });
  }

  const chiedi = () => { if (!inCoda) { inCoda = true; requestAnimationFrame(disegna); } };

  addEventListener("scroll", chiedi, { passive: true });
  addEventListener("resize", () => { misura(); chiedi(); });
  addEventListener("vista-cambiata", () => { misura(); chiedi(); });   // Vorschau
  addEventListener("load", () => { misura(); chiedi(); });

  raccogli();

  /* ---- Hero: Inhalt zieht sich beim Wegscrollen zurück ------------------ */
  const heroTesto = document.querySelector(".hero-testo");
  if (heroTesto) {
    const hero = heroTesto.closest(".hero");
    addEventListener("scroll", () => {
      const q = Math.min(1, Math.max(0, scrollY / (hero.offsetHeight * 0.85)));
      heroTesto.style.transform = `translate3d(0,${(q * 90).toFixed(1)}px,0)`;
      heroTesto.style.opacity = String(1 - q * 1.25);
    }, { passive: true });
  }
})();
