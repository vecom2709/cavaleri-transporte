/* Cavaleri Srl — Scrollytelling: Wortenthüllung und Fuhrparkraster.
   Ein gemeinsamer rAF-Lauf, nur Lesen von Rechtecken, kein Layout-Schreiben
   im Bild. Bei "reduzierter Bewegung" steht sofort alles fertig da. */
(() => {
  const ridotto = matchMedia("(prefers-reduced-motion: reduce)").matches;
  let pezzi = [];
  let inCoda = false;

  /* ---------- 1. Aussagen: Wort für Wort ------------------------------- */
  function dividi(el) {
    const testo = el.textContent.trim();
    if (!testo) return;
    el.textContent = "";
    testo.split(/\s+/).forEach((w, i) => {
      const s = document.createElement("span");
      s.className = "parola";
      s.textContent = w;
      el.appendChild(s);
      el.appendChild(document.createTextNode(" "));
    });
  }

  function preparaParole() {
    document.querySelectorAll("[data-parole]").forEach(el => {
      if (!el.querySelector(".parola")) dividi(el);
    });
  }

  /* ---------- 2. Fuhrparkraster ---------------------------------------- */
  const SAGOMA = '<svg viewBox="0 0 64 24" class="sagoma"><path d="M2 18V9h9l3-4h8v13H2Z"/>' +
                 '<path d="M24 18V4h34v14H24Z"/><circle cx="9" cy="19" r="3"/>' +
                 '<circle cx="34" cy="19" r="3"/><circle cx="44" cy="19" r="3"/></svg>';

  function preparaRaster() {
    document.querySelectorAll(".raster:empty").forEach(r => {
      const n = +r.dataset.mezzi || 80;
      r.innerHTML = Array.from({ length: n }, () => `<i>${SAGOMA}</i>`).join("");
    });
  }

  /* ---------- 3. Ein Lauf für alles ------------------------------------ */
  function raccogli() {
    pezzi = [];
    document.querySelectorAll("[data-parole]").forEach(el => {
      pezzi.push({ tipo: "parole", el, parti: [...el.querySelectorAll(".parola")] });
    });
    document.querySelectorAll(".raster").forEach(el => {
      pezzi.push({
        tipo: "raster", el,
        parti: [...el.querySelectorAll("i")],
        conta: el.parentElement.querySelector(".conta-flotta b")
      });
    });
  }

  function disegna() {
    inCoda = false;
    const h = innerHeight;
    pezzi.forEach(p => {
      const r = p.el.getBoundingClientRect();
      if (r.bottom < -200 || r.top > h + 200) return;
      // 0 beim Eintreten von unten, 1 wenn das Element die Mitte passiert hat
      const q = Math.min(1, Math.max(0, (h * 0.88 - r.top) / (h * 0.55 + r.height * 0.4)));
      const quante = Math.round(q * p.parti.length);
      p.parti.forEach((s, i) => s.classList.toggle("vista", i < quante));
      if (p.conta) p.conta.textContent = quante;
    });
  }

  const chiedi = () => { if (!inCoda) { inCoda = true; requestAnimationFrame(disegna); } };

  function avvia() {
    preparaParole();
    preparaRaster();
    raccogli();
    if (ridotto) {
      pezzi.forEach(p => {
        p.parti.forEach(s => s.classList.add("vista"));
        if (p.conta) p.conta.textContent = p.parti.length;
      });
      return;
    }
    disegna();
  }

  addEventListener("scroll", chiedi, { passive: true });
  addEventListener("resize", chiedi);
  addEventListener("lingua-cambiata", () => {
    document.querySelectorAll("[data-parole]").forEach(el => dividi(el));
    raccogli(); chiedi();
  });
  addEventListener("vista-cambiata", avvia);
  avvia();
})();
