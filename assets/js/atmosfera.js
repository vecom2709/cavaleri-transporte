/* Cavaleri Srl — Atmosphäre auf den dunklen Flächen.

   Ein weiches Licht folgt dem Zeiger über dunkle Abschnitte. Auf Touch-Geräten
   und bei "reduzierter Bewegung" passiert nichts — dort gibt es keinen Zeiger
   und keinen Grund für Bewegung. Geschrieben wird nur eine Custom Property,
   einmal je Bild. */
(() => {
  if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  if (!matchMedia("(hover:hover) and (pointer:fine)").matches) return;

  const flaechen = [...document.querySelectorAll(".sfondo-blu, .dichiarazione, .hero, .intro")];
  if (!flaechen.length) return;

  let inCoda = false, ultimo = null;

  const disegna = () => {
    inCoda = false;
    if (!ultimo) return;
    const { x, y } = ultimo;
    flaechen.forEach(f => {
      const r = f.getBoundingClientRect();
      if (r.bottom < -100 || r.top > innerHeight + 100) return;
      const dentro = y >= r.top - 260 && y <= r.bottom + 260;
      f.style.setProperty("--luce", dentro ? "1" : "0");
      if (dentro) {
        f.style.setProperty("--lx", ((x - r.left) / r.width * 100).toFixed(1) + "%");
        f.style.setProperty("--ly", ((y - r.top) / r.height * 100).toFixed(1) + "%");
      }
    });
  };

  addEventListener("pointermove", e => {
    ultimo = { x: e.clientX, y: e.clientY };
    if (!inCoda) { inCoda = true; requestAnimationFrame(disegna); }
  }, { passive: true });

  addEventListener("scroll", () => {
    if (ultimo && !inCoda) { inCoda = true; requestAnimationFrame(disegna); }
  }, { passive: true });

  document.documentElement.classList.add("luce-attiva");
})();
