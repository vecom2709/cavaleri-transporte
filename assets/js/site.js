/* Cavaleri Srl — Verhalten. Kein Framework, keine externen Aufrufe. */
(() => {
  /* Erst hier, nicht im Kopf der Seite: Die Anfangszustände der Scroll-Effekte
     dürfen nicht gelten, solange dieses Skript noch lädt — sonst stehen auf
     langsamen Verbindungen leere Flächen, wo Bilder sein sollten. */
  document.documentElement.classList.add("js");

  const ridotto = matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- 1. Sprache ------------------------------------------------ */
  const LINGUE = ["it", "de", "en"];
  // Jede Sprache hat ihre eigene Adresse. Steht dort eine, gilt sie —
  // sonst (Vorschau, 404-Seite) zählt die zuletzt gewählte Sprache, danach
  // die Einstellung des Browsers, zuletzt Italienisch.
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
    // Alternativtexte der Bilder — sprachabhängig wie alles andere
    document.querySelectorAll("[data-alt]").forEach(el => {
      const v = d[el.dataset.alt];
      if (v) el.alt = v;
    });
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
    // Alternativtexte der Bilder — sie gehören zur Sprache wie jeder andere Text.
    document.querySelectorAll("[data-alt]").forEach(el => {
      const v = d[el.dataset.alt];
      if (v !== undefined) el.alt = v;
    });
    // Nur der Titel im Kopf der Seite. Ohne "head >" trifft der Ausdruck
    // auch das <title> in den SVG-Karten — dann verliert die Seite ihren Titel.
    const tit = document.querySelector("head > title[data-t]");
    document.title = tit ? tit.textContent : d["meta.title"];
    const md = document.querySelector('meta[name="description"]');
    if (md) md.content = d[md.dataset.meta] || d["meta.desc"];
    document.querySelectorAll(".lingue button").forEach(b => {
      b.setAttribute("aria-current", String(b.dataset.lingua === lingua));
    });
    localStorage.setItem("cavaleri.lingua", lingua);
    dispatchEvent(new Event("lingua-cambiata"));
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

  /* ---------- 2b. Sprachwahl auf kleinen Geräten ins Menü -----------------
     In der Leiste bleiben dort sonst nur Knöpfe von 32 Pixeln übrig. Im Menü
     haben sie volle Größe — und die Leiste bekommt Luft. */
  const lingue = document.querySelector(".lingue");
  if (lingue && navi) {
    const stretto = matchMedia("(max-width:900px)");
    const barra = lingue.parentElement;
    const colloca = () => {
      if (stretto.matches) {
        if (lingue.parentElement !== navi) navi.appendChild(lingue);
      } else if (lingue.parentElement !== barra) {
        barra.insertBefore(lingue, document.querySelector(".menu-tasto"));
      }
    };
    stretto.addEventListener("change", colloca);
    colloca();
  }

  /* ---------- 2c. Pflichtfelder sichtbar machen --------------------------
     Ein Stern am Beschriftungstext und eine Zeile über dem Formular. Bisher
     merkte man es erst, wenn der Rahmen rot wurde. */
  document.querySelectorAll("[required]").forEach(campo => {
    const eti = campo.id && document.querySelector(`label[for="${campo.id}"]`);
    if (!eti || eti.querySelector(".obbl")) return;
    const stella = document.createElement("span");
    stella.className = "obbl";
    stella.textContent = "*";
    eti.appendChild(stella);
  });

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

  /* Überschriften laufen zeilenweise ein, sobald sie ins Bild kommen.
     Beobachtet wird das umgebende Element, nicht die Überschrift selbst:
     ihr clip-path macht sie für den Beobachter unsichtbar, sie würde nie
     als "im Bild" gemeldet. */
  const titoli = new IntersectionObserver(voci => {
    voci.forEach(v => {
      if (!v.isIntersecting) return;
      v.target.querySelectorAll("h2:not(.frase-lunga):not(.testo)")
        .forEach(h => h.classList.add("svelata"));
      titoli.unobserve(v.target);
    });
  }, { threshold: .2, rootMargin: "0px 0px -6% 0px" });
  document.querySelectorAll("h2:not(.frase-lunga):not(.testo)").forEach(h => {
    if (h.parentElement) titoli.observe(h.parentElement);
  });

  /* ---------- 5. Zähler ------------------------------------------------- */
  function conta(el) {
    const meta = parseFloat(el.dataset.cifra);
    // Tausender werden gruppiert — 30000 liest sich sonst wie eine Kennnummer.
    const scrivi = (n) => {
      el.firstChild.textContent = meta >= 10000
        ? n.toLocaleString(document.documentElement.lang || "it")
        : String(n);
    };
    if (ridotto) { scrivi(meta); return; }
    const durata = 1400, avvio = performance.now();
    const passo = (ora) => {
      const t = Math.min(1, (ora - avvio) / durata);
      const e = 1 - Math.pow(1 - t, 3);            // ease-out cubic
      scrivi(Math.round(meta * e));
      if (t < 1) requestAnimationFrame(passo);
    };
    requestAnimationFrame(passo);
  }

  /* ---------- 6. Kartenlinie: Länge messen, damit sie sauber zeichnet --- */
  document.querySelectorAll(".percorso, .tratto-rotta").forEach(p => {
    const l = p.getTotalLength();
    p.style.setProperty("--len", l);
  });

  /* ---------- 7. Film: Bild und Ton am Sichtbereich -----------------------
     Kommt der Abschnitt ins Bild, läuft der Film und der Ton geht an; verlässt
     er das Bild, ist beides wieder aus.

     Browser lassen Ton ohne vorherige Nutzerhandlung nicht zu. Deshalb startet
     der Film immer stumm, und der Ton wird erst versucht — klappt es nicht,
     bleibt er stumm und der Knopf lädt zum Einschalten ein. Wer den Ton von
     Hand ausschaltet, bekommt ihn nicht wieder aufgedrängt. */
  const film = document.querySelector("[data-film]");
  if (film) {
    const tasto = document.querySelector("[data-pausa]");
    let vuole = true;          // Ton erwünscht, solange nicht abgewählt
    let inVista = false;

    const parola = (chiave, ripiego) =>
      (window.TESTI[document.documentElement.lang] || {})[chiave] || ripiego;

    const etichetta = () => {
      if (!tasto) return;
      tasto.textContent = film.muted
        ? parola("vid.suonoOn", "Ton an") : parola("vid.suonoOff", "Ton aus");
      tasto.setAttribute("aria-pressed", String(!film.muted));
    };

    const accendi = async () => {
      if (!vuole) return;
      film.muted = false;
      try {
        await film.play();                 // schlägt fehl, wenn der Browser sperrt
      } catch (e) {
        film.muted = true;
        film.play().catch(() => {});
      }
      etichetta();
    };

    if (tasto) {
      tasto.hidden = false;
      tasto.addEventListener("click", async () => {
        vuole = film.muted;                // Klick kehrt den Wunsch um
        film.muted = !film.muted;
        try {
          await film.play();
        } catch (e) {                      // Ton verweigert: wenigstens Bild
          film.muted = true;
          film.play().catch(() => {});
        }
        etichetta();
      });
    }

    new IntersectionObserver((v) => {
      v.forEach(x => {
        inVista = x.isIntersecting;
        if (inVista && !ridotto) {
          film.preload = "auto";
          film.play().catch(() => {});
          accendi();
        } else {
          film.muted = true;               // außer Sicht ist immer still
          film.pause();
          etichetta();
        }
      });
    }, { threshold: .45 }).observe(film);

    etichetta();
  }

  /* ---------- 8. Kopfbild als Folge -------------------------------------
     Die Folge startet erst, wenn die zweite Aufnahme geladen ist. Vorher
     bleibt die erste stehen — so verzögert nichts den ersten Bildaufbau. */
  const scena = document.querySelector(".hero-scena");
  if (scena && !ridotto) {
    const altre = [...scena.querySelectorAll(".hero-foto img")].slice(1);
    const pronte = altre.map(i => new Promise(r => {
      if (i.complete && i.naturalWidth) return r();
      i.addEventListener("load", r, { once: true });
      i.addEventListener("error", r, { once: true });
    }));
    const parti = () => scena.classList.add("in-corso");
    if (altre.length) {
      // Erst nachladen, wenn die Seite steht — die erste Aufnahme soll den
      // Bildaufbau nicht mit zwei weiteren teilen.
      const carica = () => {
        scena.querySelectorAll("source[data-srcset]").forEach(s => {
          s.type = s.dataset.tipo; s.srcset = s.dataset.srcset;
        });
        altre.forEach(i => { if (i.dataset.src) i.src = i.dataset.src; });
        Promise.all(pronte).then(parti);
        setTimeout(parti, 6000);        // Notbremse bei zäher Verbindung
      };
      if (document.readyState === "complete") setTimeout(carica, 700);
      else addEventListener("load", () => setTimeout(carica, 700), { once: true });
    }
  }


  /* ---------- 10. Fahrzeugwähler ----------------------------------------
     Reiter statt Aufklappen: alle drei Typen sind mit einem Tipp erreichbar. */
  const schede = [...document.querySelectorAll(".scheda")];
  if (schede.length) {
    const mostra = (n) => {
      schede.forEach((s, i) => {
        s.setAttribute("aria-selected", String(i === n));
        const p = document.getElementById(s.getAttribute("aria-controls"));
        if (p) p.hidden = i !== n;
      });
    };
    schede.forEach((s, i) => {
      s.addEventListener("click", () => mostra(i));
      s.addEventListener("keydown", e => {
        const d = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0;
        if (!d) return;
        e.preventDefault();
        const n = (i + d + schede.length) % schede.length;
        mostra(n); schede[n].focus();
      });
    });
  }

  /* ---------- 9. Foto-Fallback ------------------------------------------
     Fehlt ein Bild, bleibt die prozedurale Nachtszene stehen — kein
     kaputtes Bildsymbol, kein Sprung im Layout.                          */
  document.querySelectorAll("img[data-facoltativa]").forEach(img => {
    img.addEventListener("error", () => img.remove());
  });
})();
