#!/usr/bin/env python3
"""Cavaleri Srl — Messung des Ladeverhaltens.

Misst je Seite die Kennzahlen, die für den Besucher spürbar sind, und bricht ab,
wenn das Budget gerissen wird. Gedrosselt auf schnelles Mobilfunknetz, weil die
Seite vor allem unterwegs aufgerufen wird.

Vorher einen Server starten:  python3 -m http.server 8099
Dann:                         python3 misura.py  [/pfad/ ...]
"""
import asyncio, sys
from playwright.async_api import async_playwright

BASE = "http://127.0.0.1:8099"
PAGINE = ["/", "/azienda/", "/trasporti/", "/rotta/", "/gallery/", "/preventivo/"]

# Budget. Reißt eine Seite es, endet das Skript mit Fehler.
BUDGET = {
    "lcp": 2500,        # Millisekunden bis zum größten sichtbaren Element
    "cls": 0.05,        # Verrutschen des Layouts
    "peso": 2200,       # Kilobyte, die bis zum fertigen Bild geladen werden
    "richieste": 40,
}

# Schnelles Mobilfunknetz, wie es unterwegs realistisch ist.
RETE = {"offline": False, "downloadThroughput": 4_000_000 // 8,
        "uploadThroughput": 1_000_000 // 8, "latency": 120}

MISURA = """() => new Promise(risolvi => {
  let lcp = 0, cls = 0;
  new PerformanceObserver(l => { for (const e of l.getEntries()) lcp = e.startTime; })
    .observe({ type: 'largest-contentful-paint', buffered: true });
  new PerformanceObserver(l => { for (const e of l.getEntries())
      if (!e.hadRecentInput) cls += e.value; })
    .observe({ type: 'layout-shift', buffered: true });
  setTimeout(() => {
    const n = performance.getEntriesByType('navigation')[0] || {};
    risolvi({ lcp: Math.round(lcp), cls: +cls.toFixed(4),
              dcl: Math.round(n.domContentLoadedEventEnd || 0) });
  }, 2500);
})"""


async def main():
    solo = sys.argv[1:] or PAGINE
    guasti = []
    async with async_playwright() as p:
        b = await p.chromium.launch()
        for via in solo:
            ctx = await b.new_context(viewport={"width": 390, "height": 844},
                                      is_mobile=True, device_scale_factor=2)
            pg = await ctx.new_page()
            cdp = await ctx.new_cdp_session(pg)
            await cdp.send("Network.enable")
            await cdp.send("Network.emulateNetworkConditions", RETE)
            peso = {"byte": 0, "n": 0}

            async def conta(r):
                peso["n"] += 1
                try:
                    corpo = await r.body()
                    peso["byte"] += len(corpo)
                except Exception:
                    pass

            pg.on("response", lambda r: asyncio.create_task(conta(r)))
            await pg.goto(BASE + via, wait_until="load")
            m = await pg.evaluate(MISURA)
            kb = round(peso["byte"] / 1024)
            riga = (f"{via:14} LCP {m['lcp']:5} ms | CLS {m['cls']:<7} | "
                    f"{kb:5} KB | {peso['n']:3} Anfragen")
            fuori = []
            if m["lcp"] > BUDGET["lcp"]: fuori.append(f"LCP {m['lcp']} > {BUDGET['lcp']}")
            if m["cls"] > BUDGET["cls"]: fuori.append(f"CLS {m['cls']} > {BUDGET['cls']}")
            if kb > BUDGET["peso"]: fuori.append(f"{kb} KB > {BUDGET['peso']}")
            if peso["n"] > BUDGET["richieste"]: fuori.append(f"{peso['n']} Anfragen > {BUDGET['richieste']}")
            print(riga + ("   ÜBER BUDGET: " + ", ".join(fuori) if fuori else ""))
            if fuori:
                guasti.append(f"{via}: {', '.join(fuori)}")
            await ctx.close()
        await b.close()

    if guasti:
        raise SystemExit("\nBudget gerissen:\n  " + "\n  ".join(guasti))
    print("\nAlle Seiten im Budget.")


asyncio.run(main())
