/* Cavaleri Srl — Verhalten. Kein Framework, keine externen Aufrufe. */
(() => {
  const ridotto = matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- 1. Sprache ------------------------------------------------ */
  const LINGUE = ["it", "de", "en"];
  // Jede Sprache hat ihre eigene Adresse. Steht dort eine, gilt sie —
  // sonst (Vorschau, 404) entscheidet die Einstellung des Browsers.
  const scegli = () => {
    if (LINGUE.includes(window.LINGUA)) return window.LINGUA;
    const salvata = localStorage.getItem("cavaleri.lingua");
    if (LINGUE.includes(salvata)) return salvata;
    const nav = (navigator.language || "it").slice(0, 2).toLowerCase();
    return LINGUE.includes(nav) ? nav : "it";
  };

  function applica(lingua) {
    const d = window.TESTI[lingua];
    if (!d) return;
    document.documentElement.lang = lingua;
    document.querySelectorAll("[data-t]").forEach(el => {
      const v = d[el.dataset.t];
      if (v === undefined) return;
      if (el.dataset.tag === "lista") {
        el.innerHTML = v.split("|").map(x => `<li>${x}</li>`).join("");
      } else if (el.dataset.tag === "scelte") {
        const scelto = el.dataset.valore;
        el.innerHTML = v.split("|").map(x =>
          `<button type="button" aria-pressed="${x === scelto}">${x}</button>`).join("");
      } else if (/[<>]/.test(v)) {
        el.innerHTML = v;
      } else {
        el.textContent = v;
      }
    });
    document.querySelectorAll("[data-p]").forEach(el => {
      const v = d[el.dataset.p];
      if (v !== undefined) el.placeholder = v;
    });
    const tit = document.querySelector("title[data-t]");
    document.title = tit ? tit.textContent : d["meta.title"];
    const md = document.querySelector('meta[name="description"]');
    if (md) md.content = d[md.dataset.meta] || d["meta.desc"];
    document.querySelectorAll(".lingue button").forEach(b => {
      b.setAttribute("aria-current", String(b.dataset.lingua === lingua));
    });
    localStorage.setItem("cavaleri.lingua", lingua);
  }

  applica(scegli());
  document.querySelectorAll(".lingue button").forEach(b => {
    b.addEventListener("click", () => {
      localStorage.setItem("cavaleri.lingua", b.dataset.lingua);
      if (b.dataset.vai) location.href = b.dataset.vai;   // eigene Adresse je Sprache
      else applica(b.dataset.lingua);                     // Vorschau: an Ort und Stelle
    });
  });

  /* ---------- 2. Kopfzeile und Menü ------------------------------------ */
  const testa = document.querySelector(".testa");
  const navi = document.querySelector(".navi");
  const tasto = document.querySelector(".menu-tasto");

  tasto?.addEventListener("click", () => {
    const aperta = navi.classList.toggle("aperta");
    tasto.setAttribute("aria-expanded", String(aperta));
  });
  navi?.querySelectorAll("a").forEach(a =>
    a.addEventListener("click", () => {
      navi.classList.remove("aperta");
      tasto?.setAttribute("aria-expanded", "false");
    })
  );

  /* ---------- 3. Leitmotiv: Fortschrittslinie + Zeitleiste -------------- */
  const filo = document.querySelector(".filo");
  const storia = document.querySelector(".storia");

  const aggiorna = () => {
    const h = document.documentElement;
    const max = h.scrollHeight - h.clientHeight;
    if (filo) filo.style.width = (max > 0 ? (h.scrollTop / max) * 100 : 0) + "%";
    if (testa) testa.classList.toggle("attaccata", h.scrollTop > 40);
    if (storia) {
      const r = storia.getBoundingClientRect();
      const p = (innerHeight * 0.62 - r.top) / r.height;
      storia.style.setProperty("--avanzamento", Math.min(100, Math.max(0, p * 100)) + "%");
    }
  };
  addEventListener("scroll", () => requestAnimationFrame(aggiorna), { passive: true });
  addEventListener("resize", aggiorna);
  aggiorna();

  /* ---------- 4. Reveal beim Scrollen ---------------------------------- */
  const osservatore = new IntersectionObserver((voci) => {
    voci.forEach(v => {
      if (!v.isIntersecting) return;
      v.target.classList.add("visibile");
      if (v.target.dataset.cifra) conta(v.target);
      osservatore.unobserve(v.target);
    });
  }, { threshold: 0.18, rootMargin: "0px 0px -8% 0px" });

  document.querySelectorAll(".rivela, .mappa, [data-cifra]").forEach(el => osservatore.observe(el));

  /* ---------- 5. Zähler ------------------------------------------------- */
  function conta(el) {
    const meta = parseFloat(el.dataset.cifra);
    if (ridotto) { el.firstChild.textContent = String(meta); return; }
    const durata = 1400, avvio = performance.now();
    const passo = (ora) => {
      const t = Math.min(1, (ora - avvio) / durata);
      const e = 1 - Math.pow(1 - t, 3);            // ease-out cubic
      el.firstChild.textContent = String(Math.round(meta * e));
      if (t < 1) requestAnimationFrame(passo);
    };
    requestAnimationFrame(passo);
  }

  /* ---------- 6. Kartenlinie: Länge messen, damit sie sauber zeichnet --- */
  document.querySelectorAll(".percorso").forEach(p => {
    const l = p.getTotalLength();
    p.style.setProperty("--len", l);
  });

  /* ---------- 7. Film: lädt und läuft nur, wenn er im Bild ist ------------
     Ohne Ton, ohne Ruckeln im Hintergrund, und still bei reduzierter Bewegung. */
  const film = document.querySelector("[data-film]");
  if (film) {
    const tasto = document.querySelector("[data-pausa]");
    const etichetta = () => {
      if (!tasto) return;
      const d = window.TESTI[document.documentElement.lang] || {};
      tasto.textContent = film.paused ? (d["vid.play"] || "Play") : (d["vid.pausa"] || "Pause");
    };
    if (tasto) {
      tasto.hidden = false;
      tasto.addEventListener("click", () => { film.paused ? film.play() : film.pause(); etichetta(); });
    }
    new IntersectionObserver((v) => {
      v.forEach(x => {
        if (x.isIntersecting && !ridotto) { film.preload = "auto"; film.play().catch(() => {}); }
        else film.pause();
        etichetta();
      });
    }, { threshold: .35 }).observe(film);
    etichetta();
  }

  /* ---------- 8. Foto-Fallback ------------------------------------------
     Fehlt ein Bild, bleibt die prozedurale Nachtszene stehen — kein
     kaputtes Bildsymbol, kein Sprung im Layout.                          */
  document.querySelectorAll("img[data-facoltativa]").forEach(img => {
    img.addEventListener("error", () => img.remove());
  });
})();
