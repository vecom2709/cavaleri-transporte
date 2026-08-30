/* Cavaleri Srl — Bildbetrachter für die Gallery.
   Ohne fremde Bibliothek: ein <dialog>, das das große Bild zeigt.
   Tastatur: Pfeile blättern, Escape schließt. Beim Schließen kehrt der
   Fokus auf die Kachel zurück, von der aus geöffnet wurde. */
(() => {
  const griglia = document.querySelector(".griglia-foto");
  if (!griglia || !window.HTMLDialogElement) return;

  const figure = [...griglia.querySelectorAll("figure")];
  if (!figure.length) return;

  const dialogo = document.createElement("dialog");
  dialogo.className = "lente";
  dialogo.innerHTML =
    '<button class="lente-chiudi" type="button" aria-label="×"><span aria-hidden="true">×</span></button>' +
    '<button class="lente-prec" type="button" aria-label="‹"><span aria-hidden="true">‹</span></button>' +
    '<figure><img alt="" aria-hidden="true"><figcaption></figcaption></figure>' +
    '<button class="lente-succ" type="button" aria-label="›"><span aria-hidden="true">›</span></button>' +
    '<p class="lente-conta"></p>';
  document.body.appendChild(dialogo);

  const img = dialogo.querySelector("img");
  const didascalia = dialogo.querySelector("figcaption");
  const conta = dialogo.querySelector(".lente-conta");
  let indice = 0, tornaA = null;

  function etichette() {
    const d = (window.TESTI && window.TESTI[document.documentElement.lang]) || {};
    dialogo.querySelector(".lente-chiudi").setAttribute("aria-label", d["lente.chiudi"] || "Chiudi");
    dialogo.querySelector(".lente-prec").setAttribute("aria-label", d["lente.prec"] || "Precedente");
    dialogo.querySelector(".lente-succ").setAttribute("aria-label", d["lente.succ"] || "Successiva");
  }

  function mostra(n) {
    indice = (n + figure.length) % figure.length;
    const f = figure[indice];
    const orig = f.querySelector("img");
    img.src = orig.currentSrc || orig.src;
    img.alt = orig.alt || "";
    const cap = f.querySelector("figcaption");
    didascalia.textContent = cap ? cap.textContent : "";
    conta.textContent = `${indice + 1} / ${figure.length}`;
  }

  figure.forEach((f, n) => {
    f.tabIndex = 0;
    f.setAttribute("role", "button");
    const apri = () => { tornaA = f; etichette(); mostra(n); dialogo.showModal(); };
    f.addEventListener("click", apri);
    f.addEventListener("keydown", e => {
      if (e.key === "Enter" || e.key === " ") { e.preventDefault(); apri(); }
    });
  });

  dialogo.querySelector(".lente-chiudi").addEventListener("click", () => dialogo.close());
  dialogo.querySelector(".lente-prec").addEventListener("click", () => mostra(indice - 1));
  dialogo.querySelector(".lente-succ").addEventListener("click", () => mostra(indice + 1));
  dialogo.addEventListener("click", e => { if (e.target === dialogo) dialogo.close(); });
  dialogo.addEventListener("close", () => { if (tornaA) tornaA.focus(); });
  dialogo.addEventListener("keydown", e => {
    if (e.key === "ArrowRight") { e.preventDefault(); mostra(indice + 1); }
    if (e.key === "ArrowLeft") { e.preventDefault(); mostra(indice - 1); }
  });
  addEventListener("lingua-cambiata", etichette);
})();
