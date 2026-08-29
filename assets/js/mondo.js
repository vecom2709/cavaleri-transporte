/* Cavaleri Srl — "La rotta": die Bilder wechseln mit den Textstationen.
   Ein Beobachter, kein Scroll-Listener, keine Bibliothek. */
(() => {
  function avvia() {
    const mondo = document.querySelector(".mondo:not([data-avviato])");
    if (!mondo) return;
    mondo.dataset.avviato = "1";

    const scene = [...mondo.querySelectorAll(".scena")];
    const stazioni = [...mondo.querySelectorAll(".stazione")];
    if (!scene.length) return;

    const attiva = (n) => {
      scene.forEach((s, i) => s.classList.toggle("viva", i === n));
      stazioni.forEach((s, i) => s.classList.toggle("viva", i === n));
      mondo.style.setProperty("--tappa", (n + 1) / scene.length);
    };

    // Die Station in der Bildmitte bestimmt das Bild dahinter.
    const osservatore = new IntersectionObserver((voci) => {
      voci.forEach(v => {
        if (v.isIntersecting) attiva(+v.target.dataset.stazione);
      });
    }, { rootMargin: "-45% 0px -45% 0px", threshold: 0 });

    stazioni.forEach(s => osservatore.observe(s));
    attiva(0);
  }

  avvia();
  addEventListener("vista-cambiata", avvia);   // nur in der Vorschau relevant
})();
