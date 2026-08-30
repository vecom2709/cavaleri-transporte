#!/usr/bin/env python3
"""Misst den Kontrast heller Schrift gegen den Hintergrund darunter.

Vorher einen Server starten:  python3 -m http.server 8099
Dann:                         python3 contrasto.py

Verdeckt dafür die Schrift, macht ein Bild und liest die Helligkeit
genau an den Stellen, wo die Schrift steht."""
import asyncio, io, sys
from PIL import Image
from playwright.async_api import async_playwright

BASE = "http://127.0.0.1:8099"

def lum(px):
    def k(c):
        c/=255
        return c/12.92 if c<=0.03928 else ((c+0.055)/1.055)**2.4
    r,g,b = px[:3]
    return .2126*k(r)+.7152*k(g)+.0722*k(b)

def rapporto(l):
    return round((1.05)/(l+0.05), 2)      # weiße Schrift gegen diese Fläche

async def misura(pg, selettori, nome):
    # Schrift unsichtbar machen, damit nur der Untergrund gemessen wird
    await pg.evaluate("""(sel)=>{sel.forEach(s=>document.querySelectorAll(s)
        .forEach(e=>e.style.visibility='hidden'));}""", selettori)
    await pg.wait_for_timeout(300)
    scatto = Image.open(io.BytesIO(await pg.screenshot())).convert("RGB")
    await pg.evaluate("""(sel)=>{sel.forEach(s=>document.querySelectorAll(s)
        .forEach(e=>e.style.visibility=''));}""", selettori)
    fuori = []
    for s in selettori:
        caselle = await pg.evaluate("""(s)=>[...document.querySelectorAll(s)].map(e=>{
            const r=e.getBoundingClientRect();
            return {x:Math.round(r.left),y:Math.round(r.top),w:Math.round(r.width),h:Math.round(r.height)};})""", s)
        for b in caselle:
            if b["w"]<10 or b["h"]<10 or b["y"]<0 or b["y"]+b["h"]>scatto.height: continue
            peggiore, dove = 0, None
            for yy in range(b["y"], b["y"]+b["h"], 4):
                for xx in range(b["x"], b["x"]+b["w"], 4):
                    l = lum(scatto.getpixel((xx,yy)))
                    if l > peggiore: peggiore, dove = l, (xx,yy)
            fuori.append((s, rapporto(peggiore), dove))
    print(f"— {nome}")
    for s, r, d in fuori:
        stato = "ok" if r>=4.5 else ("knapp" if r>=3 else "ZU WENIG")
        print(f"   {s:26} schlechtester Kontrast {r}:1  {stato}")

async def main():
    async with async_playwright() as p:
        br=await p.chromium.launch(); c=await br.new_context(viewport={"width":1440,"height":900}, device_scale_factor=1)
        pg=await c.new_page()
        await pg.goto(BASE+"/", wait_until="networkidle"); await pg.wait_for_timeout(1200)
        await misura(pg, [".hero h1", ".hero .guida", ".hero .occhiello"], "Kopfbereich")
        await pg.evaluate("document.querySelectorAll('.fascia')[0].scrollIntoView({block:'center'})")
        await pg.wait_for_timeout(1400)
        await misura(pg, [".fascia .frase"], "Bildband 1")
        await pg.evaluate("document.querySelector('.dichiarazione').scrollIntoView({block:'center'})")
        await pg.wait_for_timeout(1400)
        await misura(pg, [".frase-lunga"], "Aussage")
        await br.close()

asyncio.run(main())
