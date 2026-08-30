/* Cavaleri Srl — Eingangsanimation.

   Wann sie erscheint:
   - beim Aktualisieren der Seite: immer wieder, so oft man neu lädt
   - beim ersten Aufruf einer Sitzung: einmal
   - beim Weiterklicken innerhalb der Seite: nicht mehr

   Unterschieden wird das über die Navigation Timing API: der Browser sagt
   selbst, ob die Seite neu geladen ("reload"), angeklickt ("navigate") oder
   über die Zurück-Taste geholt wurde. Bei "reduzierter Bewegung" erscheint sie
   gar nicht. Die Seite darunter ist die ganze Zeit vollständig geladen — der
   Vorhang liegt nur davor und verschwindet von selbst.

   Das Markup wird hier erzeugt und nicht in jede Seite geschrieben: so steht
   es nur an einer Stelle und kostet in den 30 Seiten kein Byte. */
(() => {
  const RIDOTTO = matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (RIDOTTO) return;
  const voce = performance.getEntriesByType("navigation")[0];
  const tipo = voce ? voce.type : "navigate";
  const ricarica = tipo === "reload";

  if (!ricarica) {
    // Kein Neuladen: nur beim ersten Aufruf der Sitzung zeigen.
    try { if (sessionStorage.getItem("cavaleri.entrata") === "1") return; } catch (e) {}
  }

  const base = document.documentElement.dataset.base || "";
  const sipario = document.createElement("div");
  sipario.className = "entrata";
  sipario.setAttribute("aria-hidden", "true");
  sipario.innerHTML =
    '<div class="scena-entrata">' +
      '<svg class="rombo-entrata" viewBox="0 0 100 100" aria-hidden="true">' +
        '<path d="M50 6 L94 50 L50 94 L6 50 Z"/>' +
        '<path class="lettera" d="M62 32a22 22 0 1 0 0 36"/>' +
      '</svg>' +
      '<span class="marchio-entrata"></span>' +
    '</div>';
  document.body.appendChild(sipario);

  try { sessionStorage.setItem("cavaleri.entrata", "1"); } catch (e) {}

  // Wenn der Vorhang gefallen ist, aus dem Dokument nehmen.
  sipario.addEventListener("animationend", (e) => {
    if (e.animationName === "sipario") sipario.remove();
  });
  // Sicherheitsnetz: falls eine Animation ausfällt, nach 5 s aufräumen.
  setTimeout(() => sipario.remove(), 5000);

  // Wer klickt oder tippt, will nicht warten.
  const salta = () => { sipario.style.animation = "sipario 350ms var(--ease) forwards"; };
  sipario.addEventListener("pointerdown", salta);
  addEventListener("keydown", (e) => { if (e.key === "Escape") salta(); }, { once: true });
})();
