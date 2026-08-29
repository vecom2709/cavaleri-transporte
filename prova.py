#!/usr/bin/env python3
"""Cavaleri Srl — Prüfung der Darstellung.

Vorher einen Server starten:  python3 -m http.server 8099
Dann:                         python3 prova.py  [/pfad/ ...]

Ruft jede Seite in mehreren Breiten auf, macht Bildschirmfotos und meldet
Überläufe, zu kleine Tippflächen und zu kleine Schrift.
"""
import asyncio, pathlib, sys
from playwright.async_api import async_playwright

BASE = "http://127.0.0.1:8099"
PAGINE = ["/", "/azienda/", "/trasporti/", "/edilizia/", "/rotta/", "/gallery/",
          "/contatti/", "/preventivo/", "/note-legali/"]
SCHERMI = [("piccolo", 320, 568),        # iPhone SE und ähnliche
           ("telefono", 380, 780),
           ("coricato", 844, 390),        # Telefon im Querformat
           ("tablet", 768, 1024),
           ("desktop", 1440, 900),
           ("largo", 1920, 1080),
           ("grande", 2560, 1440)]

CONTROLLO = """() => {
  const out = { overflow: [], tocchi: [], piccoli: [], larghezza: document.documentElement.scrollWidth };
  const vw = document.documentElement.clientWidth;
  document.querySelectorAll('body *').forEach(el => {
    const r = el.getBoundingClientRect();
    if (r.width === 0 || r.height === 0) return;
    const st = getComputedStyle(el);
    if (st.position === 'fixed') return;
    if (r.right > vw + 2 || r.left < -2) {
      const s = el.tagName.toLowerCase() + (el.className && typeof el.className === 'string'
        ? '.' + el.className.trim().split(/\\s+/).slice(0,2).join('.') : '');
      if (!out.overflow.includes(s)) out.overflow.push(s);
    }
    if (el.matches('a, button, input, textarea, select')) {
      if ((r.height < 34 || r.width < 34) && st.display !== 'inline')
        out.tocchi.push(el.tagName.toLowerCase() + ' ' + Math.round(r.width) + 'x' + Math.round(r.height)
          + ' "' + (el.textContent||'').trim().slice(0,22) + '"');
    }
    if (el.children.length === 0 && (el.textContent||'').trim().length > 8) {
      const px = parseFloat(st.fontSize);
      if (px < 12) out.piccoli.push(px.toFixed(1) + 'px ' + (el.textContent||'').trim().slice(0,26));
    }
  });
  out.tocchi = [...new Set(out.tocchi)].slice(0, 8);
  out.piccoli = [...new Set(out.piccoli)].slice(0, 6);
  return out;
}"""


async def main():
    fuori = pathlib.Path("/home/claude/prova"); fuori.mkdir(exist_ok=True)
    solo = sys.argv[1:] or PAGINE
    async with async_playwright() as p:
        b = await p.chromium.launch()
        for nome, w, h in SCHERMI:
            ctx = await b.new_context(viewport={"width": w, "height": h},
                                      device_scale_factor=1, is_mobile=(w < 500 or (w == 844 and h == 390)))
            pg = await ctx.new_page()
            for via in solo:
                await pg.goto(BASE + via, wait_until="networkidle")
                await pg.wait_for_timeout(500)
                r = await pg.evaluate(CONTROLLO)
                etichetta = (via.strip("/") or "home")
                if r["overflow"] or r["tocchi"] or r["piccoli"] or r["larghezza"] > w + 2:
                    print(f"\n[{nome} {w}px] {via}")
                    if r["larghezza"] > w + 2:
                        print(f"  Seitenbreite {r['larghezza']}px > {w}px")
                    for k, t in (("overflow", "ragt heraus"), ("tocchi", "zu klein zum Tippen"),
                                 ("piccoli", "Schrift unter 12px")):
                        if r[k]:
                            print(f"  {t}: {r[k]}")
                await pg.screenshot(path=str(fuori / f"{etichetta}-{nome}.png"), full_page=False)
            await ctx.close()
        await b.close()
    print("\nBildschirmfotos in /home/claude/prova")


asyncio.run(main())
