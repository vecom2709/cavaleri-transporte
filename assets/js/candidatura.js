/* Cavaleri Srl — Bewerbungsformular. Ein Schritt, kein Server:
   der Knopf öffnet das E-Mail-Programm mit fertigem Text, damit der
   Lebenslauf einfach angehängt werden kann. */
(() => {
  const modulo = document.querySelector(".candidatura");
  if (!modulo) return;

  modulo.querySelectorAll(".scelte").forEach(gruppo => {
    gruppo.addEventListener("click", e => {
      const b = e.target.closest("button");
      if (!b) return;
      gruppo.querySelectorAll("button").forEach(x => x.setAttribute("aria-pressed", "false"));
      b.setAttribute("aria-pressed", "true");
      gruppo.dataset.valore = b.textContent.trim();
    });
  });

  const val = (sel) => {
    const el = modulo.querySelector(sel);
    if (!el) return "—";
    return (el.dataset && el.dataset.valore) || (el.value || "").trim() || "—";
  };

  modulo.querySelector("[data-invia-candidatura]").addEventListener("click", () => {
    let ok = true;
    modulo.querySelectorAll("[required]").forEach(campo => {
      const vuoto = !campo.value.trim();
      campo.classList.toggle("errore", vuoto);
      if (vuoto && ok) { campo.focus(); ok = false; }
    });
    if (!ok) return;

    const righe = [
      `Area: ${val("#g-area")}`,
      `Patenti / abilitazioni: ${val("#c-patenti")}`,
      `Esperienza e disponibilità: ${val("#c-esperienza")}`,
      "",
      `${val("#c-nome-c")}`,
      `${val("#c-email-c")} · ${val("#c-tel-c")}`
    ];
    location.href = "mailto:info@cavaleri.it?subject="
      + encodeURIComponent("Candidatura — " + val("#g-area"))
      + "&body=" + encodeURIComponent(righe.join("\n"));
  });
})();
