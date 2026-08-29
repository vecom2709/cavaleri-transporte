#!/usr/bin/env python3
"""Cavaleri Srl — Bildpipeline.

Erzeugt aus jedem Ausgangsfoto AVIF, WebP und JPEG in mehreren Breiten und
schreibt eine Beschreibung nach assets/foto/immagini.json, aus der build.py
die <picture>-Blöcke baut. Nur was fehlt oder älter ist, wird neu gerechnet.

Aufruf:  python3 immagini.py
"""
import json, pathlib
from PIL import Image

W = pathlib.Path(__file__).parent
ORIG = W / "assets/foto/originali"
FUORI = W / "assets/foto"

# Breiten je Verwendung. Mehr braucht niemand: darüber sieht man keinen Unterschied.
LARGHEZZE = {"hero": [1000, 1600, 2200], "galleria": [640, 1000, 1500], "og": [1200]}

QUALITA = {"avif": 52, "webp": 74, "jpg": 80}


def varianti(nome, uso):
    src = ORIG / f"{nome}.jpg"
    im = Image.open(src).convert("RGB")
    voce = {"w": im.width, "h": im.height, "fonti": {}}
    for formato in ("avif", "webp", "jpg"):
        insieme = []
        for larghezza in LARGHEZZE[uso]:
            if larghezza > im.width:
                larghezza = im.width
            out = FUORI / f"{nome}-{larghezza}.{formato}"
            if not out.exists() or out.stat().st_mtime < src.stat().st_mtime:
                copia = im.resize((larghezza, round(im.height * larghezza / im.width)), Image.LANCZOS)
                if formato == "avif":
                    copia.save(out, "AVIF", quality=QUALITA["avif"], speed=4)
                elif formato == "webp":
                    copia.save(out, "WEBP", quality=QUALITA["webp"], method=5)
                else:
                    copia.save(out, "JPEG", quality=QUALITA["jpg"], optimize=True, progressive=True)
            insieme.append((f"{nome}-{larghezza}.{formato}", larghezza))
            if larghezza == im.width:
                break
        voce["fonti"][formato] = insieme
    return voce


def main():
    ORIG.mkdir(parents=True, exist_ok=True)
    # Ausgangsdateien einmalig in originali/ verschieben
    for f in list(FUORI.glob("*.jpg")):
        if f.parent == ORIG or "-" in f.stem and f.stem.rsplit("-", 1)[-1].isdigit():
            continue
        if not (ORIG / f.name).exists():
            f.rename(ORIG / f.name)

    elenco = {}
    for f in sorted(ORIG.glob("*.jpg")):
        nome = f.stem
        uso = "hero" if nome == "hero" else ("og" if nome.startswith("og-") else "galleria")
        elenco[nome] = varianti(nome, uso)
        print(f"{nome}: {len(elenco[nome]['fonti']['avif'])} Breiten")

    (FUORI / "immagini.json").write_text(json.dumps(elenco, indent=1), encoding="utf-8")
    peso = sum(p.stat().st_size for p in FUORI.glob("*.*") if p.suffix in (".avif", ".webp", ".jpg"))
    print("Bildordner:", round(peso / 1024 / 1024, 1), "MB")


if __name__ == "__main__":
    main()
