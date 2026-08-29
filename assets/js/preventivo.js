/* Cavaleri Srl — Angebotsformular. Drei Schritte, kein Server, kein Tracking:
   der letzte Knopf öffnet das E-Mail-Programm mit fertiger Anfrage. */
(() => {
  const modulo = document.querySelector(".modulo");
  if (!modulo) return;

  const passi = [...modulo.querySelectorAll(".passo")];
  const barra = modulo.querySelector(".barra i");
  const conta = modulo.querySelector(".conta");
  let corrente = 0;

  const mostra = (i) => {
    corrente = Math.max(0, Math.min(passi.length - 1, i));
    passi.forEach((p, n) => p.hidden = n !== corrente);
    barra.style.width = ((corrente + 1) / passi.length) * 100 + "%";
    conta.textContent = corrente + 1;
    modulo.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  /* Auswahlkacheln verhalten sich wie Radios, sind aber Knöpfe:
     ein Tipp genügt, kein Aufklappen. */
  modulo.querySelectorAll(".scelte").forEach(gruppo => {
    gruppo.addEventListener("click", e => {
      const b = e.target.closest("button");
      if (!b) return;
      gruppo.querySelectorAll("button").forEach(x => x.setAttribute("aria-pressed", "false"));
      b.setAttribute("aria-pressed", "true");
      gruppo.dataset.valore = b.textContent.trim();
    });
  });

  modulo.querySelectorAll("[data-avanti]").forEach(b =>
    b.addEventListener("click", () => { if (valida(corrente)) mostra(corrente + 1); })
  );
  modulo.querySelectorAll("[data-indietro]").forEach(b =>
    b.addEventListener("click", () => mostra(corrente - 1))
  );

  function valida(i) {
    const passo = passi[i];
    let ok = true;
    passo.querySelectorAll("[required]").forEach(campo => {
      const vuoto = !campo.value.trim();
      campo.classList.toggle("errore", vuoto);
      if (vuoto && ok) { campo.focus(); ok = false; }
    });
    return ok;
  }

  const val = (sel) => {
    const el = modulo.querySelector(sel);
    if (!el) return "—";
    return (el.dataset ? el.dataset.valore : null) || el.value?.trim() || "—";
  };

  modulo.querySelector("[data-invia]").addEventListener("click", () => {
    if (!valida(corrente)) return;
    const righe = [
      `1) ${val("#g-merce")}`,
      `2) ${val("#c-ritiro")} → ${val("#c-destinazione")}`,
      `3) ${val("#g-quando")}`,
      `4) ${val("#c-quantita")}`,
      `5) ${val("#c-note")}`,
      "",
      `${val("#c-nome")} — ${val("#c-azienda")}`,
      `${val("#c-email")} · ${val("#c-tel")}`
    ];
    const oggetto = "Richiesta di preventivo — " + val("#c-ritiro") + " → " + val("#c-destinazione");
    location.href = "mailto:info@cavaleri.it?subject=" + encodeURIComponent(oggetto) +
                    "&body=" + encodeURIComponent(righe.join("\n"));
  });

  mostra(0);
})();
