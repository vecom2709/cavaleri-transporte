/* Cavaleri Srl — "La rotta": Szenen, Karte und Fortschritt.

   Die Karte zeichnet sich mit dem Scrollen, ein Punkt wandert die Strecke ab,
   die Stationen setzen ihre Marken. Die Punkte werden über getPointAtLength
   auf den Pfad gesetzt — keine von Hand gepflegten Koordinaten.

   Warum kein CSS scroll-driven animation: `animation-timeline` liegt in Firefox
   noch hinter einem Schalter, und der Fortschritt müsste über timeline-scope
   quer durch den Baum gereicht werden. Eine einzige Custom Property, einmal je
   Bild gesetzt, ist hier robuster und kostet nicht mehr. */
(() => {
  const ridotto = matchMedia("(prefers-reduced-motion: reduce)").matches;

  function avvia() {
    const mondo = document.querySelector(".mondo:not([data-avviato])");
    if (!mondo) return;
    mondo.dataset.avviato = "1";

    const scene = [...mondo.querySelectorAll(".scena")];
    const stazioni = [...mondo.querySelectorAll(".stazione")];
    const stazioniBox = mondo.querySelector(".stazioni");
    const via = mondo.querySelector(".tracciato");
    const scia = mondo.querySelector(".scia");
    const gruppo = mondo.querySelector(".punti");
    const viaggiatore = mondo.querySelector(".viaggiatore");
    const etichetta = mondo.querySelector(".mappa-viva .etichetta");
    if (!scene.length) return;

    /* ---- Punkte auf den Pfad setzen ------------------------------------ */
    let lunghezza = 0, ancore = [];
    const disponi = () => {
      if (!via || !gruppo) return;
      lunghezza = via.getTotalLength();
      via.style.setProperty("--len", lunghezza);
      gruppo.textContent = "";
      ancore = stazioni.map((_, n) => {
        const q = stazioni.length > 1 ? n / (stazioni.length - 1) : 0;
        const p = via.getPointAtLength(lunghezza * q);
        const c = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        c.setAttribute("cx", p.x);
        c.setAttribute("cy", p.y);
        c.setAttribute("r", 4);
        c.setAttribute("class", "punto");
        gruppo.appendChild(c);
        return { q, el: c };
      });
    };
    disponi();

    /* ---- Fortschritt: eine Zahl, einmal je Bild ------------------------ */
    let inCoda = false;
    const calcola = () => {
      inCoda = false;
      const r = stazioniBox.getBoundingClientRect();
      const percorso = r.height - innerHeight;
      const p = percorso > 0 ? Math.min(1, Math.max(0, -r.top / percorso)) : 0;
      mondo.style.setProperty("--avanzamento", p.toFixed(4));
      if (via && lunghezza) {
        via.style.strokeDashoffset = (lunghezza * (1 - p)).toFixed(1);
        if (viaggiatore) {
          const pt = via.getPointAtLength(lunghezza * p);
          viaggiatore.setAttribute("cx", pt.x);
          viaggiatore.setAttribute("cy", pt.y);
        }
      }
      ancore.forEach(a => a.el.classList.toggle("raggiunto", p >= a.q - 0.02));
    };
    const chiedi = () => { if (!inCoda) { inCoda = true; requestAnimationFrame(calcola); } };

    /* ---- Welche Station steht gerade in der Mitte? --------------------- */
    const attiva = (n) => {
      scene.forEach((s, i) => s.classList.toggle("viva", i === n));
      stazioni.forEach((s, i) => s.classList.toggle("viva", i === n));
      ancore.forEach((a, i) => a.el.classList.toggle("qui", i === n));
      if (etichetta) {
        const k = stazioni[n].querySelector(".occhiello");
        etichetta.textContent = k ? k.textContent : "";
      }
    };

    const osservatore = new IntersectionObserver((voci) => {
      voci.forEach(v => { if (v.isIntersecting) attiva(+v.target.dataset.stazione); });
    }, { rootMargin: "-45% 0px -45% 0px", threshold: 0 });
    stazioni.forEach(s => osservatore.observe(s));

    addEventListener("scroll", chiedi, { passive: true });
    addEventListener("resize", () => { disponi(); chiedi(); });
    addEventListener("lingua-cambiata", () => attiva(
      stazioni.findIndex(s => s.classList.contains("viva")) < 0 ? 0
        : stazioni.findIndex(s => s.classList.contains("viva"))));

    attiva(0);
    if (ridotto) {
      // Ohne Bewegung: alles gezeichnet, nichts wandert.
      if (via) via.style.strokeDashoffset = "0";
      ancore.forEach(a => a.el.classList.add("raggiunto"));
      if (viaggiatore) viaggiatore.remove();
    } else {
      calcola();
    }
  }

  avvia();
  addEventListener("vista-cambiata", avvia);   // nur in der Vorschau relevant
})();
