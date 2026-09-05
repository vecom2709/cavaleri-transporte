#!/usr/bin/env python3
"""Cavaleri Srl — Kontrast im Seitenkopf mit Bild.

Server starten, dann: python3 kopf.py
"""
import asyncio, io, sys
from PIL import Image
from playwright.async_api import async_playwright
def lum(px):
    def k(c):
        c/=255
        return c/12.92 if c<=0.03928 else ((c+0.055)/1.055)**2.4
    return .2126*k(px[0])+.7152*k(px[1])+.0722*k(px[2])
def hexl(h):
    h=h.lstrip('#'); return lum(tuple(int(h[i:i+2],16) for i in (0,2,4)))
async def prova(pg, sel, col, nome):
    box=await pg.evaluate("""(s)=>{const e=document.querySelector(s); if(!e)return null;
        const r=e.getBoundingClientRect(); return {x:Math.round(r.left),y:Math.round(r.top),w:Math.round(r.width),h:Math.round(r.height)};}""", sel)
    if not box:
        print(f"   {nome:14} nicht gefunden"); return
    await pg.evaluate("(s)=>document.querySelectorAll(s).forEach(e=>e.style.visibility='hidden')", sel)
    await pg.wait_for_timeout(300)
    im=Image.open(io.BytesIO(await pg.screenshot())).convert('RGB')
    await pg.evaluate("(s)=>document.querySelectorAll(s).forEach(e=>e.style.visibility='')", sel)
    L=hexl(col); peg=0
    for yy in range(max(0,box['y']),min(im.height,box['y']+box['h']),3):
        for xx in range(max(0,box['x']),min(im.width,box['x']+box['w']),3):
            peg=max(peg,lum(im.getpixel((xx,yy))))
    r=(max(L,peg)+.05)/(min(L,peg)+.05)
    print(f"   {nome:14} {round(r,2)}:1  {'ok' if r>=4.5 else ('gross-ok' if r>=3 else 'ZU WENIG')}")
async def m():
    async with async_playwright() as p:
        br=await p.chromium.launch()
        for nome,w,h,mob,cv in [("Desktop",1440,900,False,"#ffffff"),("Telefon",380,780,True,"#ffffff")]:
            c=await br.new_context(viewport={"width":w,"height":h}, is_mobile=mob)
            pg=await c.new_page()
            await pg.add_init_script("try{sessionStorage.setItem('cavaleri.entrata','1')}catch(e){}")
            await pg.goto("http://127.0.0.1:8099/de/lavora/", wait_until="networkidle")
            await pg.wait_for_timeout(2500)
            print(f"— {nome}")
            await prova(pg, ".intro h1", "#ffffff", "Überschrift")
            await prova(pg, ".intro .guida", "#dbe4f4", "Fließtext")
            await prova(pg, ".intro .occhiello", cv, "Vorzeile")
            await pg.screenshot(path=f"/home/claude/prova/kopf4-{nome}.png", clip={"x":0,"y":0,"width":w,"height":min(600,h)})
            await c.close()
        await br.close()
asyncio.run(m())
