#!/usr/bin/env python3
"""Cavaleri Srl — erzeugt die Karte der Route aus echten Küstendaten.

Quelle: Natural Earth 1:50m (gemeinfrei). Projektion: Mercator.
Die Stationen stehen an ihren tatsächlichen Koordinaten, nicht nach Augenmaß.

Aufruf:  python3 mappa.py       (schreibt assets/grafica/mappa-rotta.svg)
"""
import json, math, pathlib, sys

W = pathlib.Path(__file__).parent
FONTE = pathlib.Path("/home/claude/ne50.json")   # einmalig geladen

# Ausschnitt: westliches Mittelmeer bis Alpenrand
LON0, LON1 = 7.0, 19.2
LAT0, LAT1 = 35.4, 47.9
LARGO, ALTO = 1000, 1000   # Höhe wird unten aus der Projektion berechnet

PAESI = {"Italy", "France", "Switzerland", "Austria", "Slovenia", "Croatia",
         "Tunisia", "Malta", "Spain", "Germany", "Bosnia and Herz.", "Algeria",
         "Montenegro", "Albania", "Hungary", "Serbia", "Czechia", "Slovakia"}

# Stationen: echte Koordinaten
# Name, Breite, Länge, Art, Textschlüssel, Ausrichtung der Beschriftung
STAZIONI = [
    ("Caltanissetta", 37.490, 14.062, "hub", "rotta.n1", "start"),
    ("Sicilia",       38.115, 13.361, "",    "rotta.n2", "end"),
    ("Centro-Nord",   44.494, 11.343, "",    "rotta.n3", "start"),
    ("Europa",        47.270,  9.600, "",    "rotta.n4", "start"),
]

# Häfen, über die die Fahrzeuge nach Sizilien und zurück fahren.
# Quelle: Angaben des Unternehmens auf cavaleri.it.
# Palermo fehlt bewusst: dort steht schon die Station "Sicilia".
# Letzter Wert verschiebt die Beschriftung, wo sie sonst anstoßen würde.
PORTI = [("Genova", 44.405, 8.926, 0), ("Ravenna", 44.417, 12.198, 26),
         ("Livorno", 43.548, 10.310, 0), ("Civitavecchia", 42.094, 11.796, 0),
         ("Napoli", 40.840, 14.252, 0)]

# Verlauf der Strecke über echte Zwischenpunkte
PERCORSO = [(37.490, 14.062), (37.85, 13.60), (38.115, 13.361),
            (39.60, 12.60), (41.50, 11.60), (43.548, 10.310),
            (44.494, 11.343), (45.464, 9.190), (46.20, 9.05), (47.270, 9.600)]


def merc(lon, lat):
    x = (lon - LON0) / (LON1 - LON0)
    def y_(la):
        return math.log(math.tan(math.pi / 4 + math.radians(la) / 2))
    y = (y_(LAT1) - y_(lat)) / (y_(LAT1) - y_(LAT0))
    return x, y


_, ymax = merc(LON0, LAT0)
ALTEZZA = round(LARGO * (ymax) / 1.0 * ((merc(LON1, LAT0)[0] - merc(LON0, LAT0)[0])) )
# Seitenverhältnis aus der Projektion selbst
xr = 1.0
yr = 1.0
ALTEZZA = round(LARGO * ( (math.log(math.tan(math.pi/4+math.radians(LAT1)/2))
                         - math.log(math.tan(math.pi/4+math.radians(LAT0)/2)))
                        / math.radians(LON1 - LON0) ))


def punto(lon, lat):
    x, y = merc(lon, lat)
    return x * LARGO, y * ALTEZZA


def dentro(lon, lat):
    return LON0 - 2 < lon < LON1 + 2 and LAT0 - 2 < lat < LAT1 + 2


def anelli(geom):
    t = geom["type"]
    if t == "Polygon":
        return [geom["coordinates"][0]]
    if t == "MultiPolygon":
        return [p[0] for p in geom["coordinates"]]
    return []


def semplifica(pt, tol=1.2):
    """Punkte ausdünnen, die dichter beieinander liegen als tol (in SVG-Einheiten)."""
    out = [pt[0]]
    for p in pt[1:]:
        if (p[0] - out[-1][0]) ** 2 + (p[1] - out[-1][1]) ** 2 > tol * tol:
            out.append(p)
    if len(out) < 3:
        return []
    return out


def morbido(pt, chiudi=False):
    """Weiche Kurve durch die Punkte (Catmull-Rom als Bézier)."""
    if len(pt) < 3:
        return ""
    d = f"M{pt[0][0]:.1f} {pt[0][1]:.1f}"
    for i in range(len(pt) - 1):
        p0 = pt[i - 1] if i > 0 else pt[i]
        p1, p2 = pt[i], pt[i + 1]
        p3 = pt[i + 2] if i + 2 < len(pt) else p2
        c1 = (p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6)
        c2 = (p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6)
        d += f" C{c1[0]:.1f} {c1[1]:.1f} {c2[0]:.1f} {c2[1]:.1f} {p2[0]:.1f} {p2[1]:.1f}"
    return d + ("Z" if chiudi else "")


def main():
    dati = json.loads(FONTE.read_text())
    coste = []
    for f in dati["features"]:
        if f["properties"].get("NAME") not in PAESI:
            continue
        for anello in anelli(f["geometry"]):
            if not any(dentro(lo, la) for lo, la in anello):
                continue
            pt = [punto(lo, la) for lo, la in anello]
            pt = semplifica(pt)
            if pt:
                coste.append(morbido(pt, chiudi=True))

    strada = morbido([punto(lo, la) for la, lo in PERCORSO])

    nodi = []
    for nome, la, lo, tipo, chiave, verso in STAZIONI:
        x, y = punto(lo, la)
        nodi.append((nome, round(x, 1), round(y, 1), tipo, chiave, verso))

    svg = [f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {LARGO} {ALTEZZA}" '
           f'class="carta-rotta" role="img" aria-labelledby="cr-tit">',
           '<title id="cr-tit" data-t="rotta.mappa"></title>',
           '<g class="coste">']
    for c in coste:
        svg.append(f'<path d="{c}"/>')
    svg.append('</g>')
    svg.append(f'<path class="scia-rotta" d="{strada}"/>')
    svg.append(f'<path class="tratto-rotta" d="{strada}"/>')
    svg.append('<g class="porti-rotta">')
    for nome, la, lo, dy in PORTI:
        x, y = punto(lo, la)
        verso = "end" if lo < 11.5 else "start"
        dx = -11 if verso == "end" else 11
        svg.append(f'<g class="porto"><circle cx="{x:.1f}" cy="{y:.1f}" r="4.5"/>'
                   f'<text x="{x + dx:.1f}" y="{y + 5 + dy:.1f}" text-anchor="{verso}">{nome}</text></g>')
    svg.append('</g>')

    svg.append('<g class="nodi-rotta">')
    for nome, x, y, tipo, chiave, verso in nodi:
        cl = "nodo-rotta hub" if tipo == "hub" else "nodo-rotta"
        dx = 18 if verso == "start" else -18
        svg.append(f'<g class="{cl}">')
        if tipo == "hub":
            svg.append(f'<circle class="alone" cx="{x}" cy="{y}" r="16"/>')
        svg.append(f'<circle cx="{x}" cy="{y}" r="{9 if tipo else 6.5}"/>')
        svg.append(f'<text x="{x + dx}" y="{y + 6}" text-anchor="{verso}" data-t="{chiave}"></text>')
        svg.append('</g>')
    svg.append('</g></svg>')

    # Kleine Fassung für die mitlaufende Karte auf /rotta/: derselbe Verlauf,
    # damit beide Karten dieselbe Wirklichkeit zeigen — nur ohne Küsten.
    xs = [punto(lo, la)[0] for la, lo in PERCORSO]
    ys = [punto(lo, la)[1] for la, lo in PERCORSO]
    m = 40
    vx, vy = min(xs) - m, min(ys) - m
    vw, vh = max(xs) - min(xs) + 2 * m, max(ys) - min(ys) + 2 * m
    mini = [f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="{vx:.0f} {vy:.0f} {vw:.0f} {vh:.0f}" '
            'role="img" aria-labelledby="mv-tit">',
            '<title id="mv-tit" data-t="ro.mappa"></title>',
            f'<path class="scia" d="{strada}"/>',
            f'<path class="tracciato" d="{strada}"/>',
            '<g class="punti"></g>',
            '<circle class="viaggiatore" r="16"/></svg>']
    (W / "assets/grafica/mappa-mini.svg").write_text("\n".join(mini), encoding="utf-8")
    print("geschrieben: mappa-mini.svg | viewBox", round(vw), round(vh))

    out = W / "assets/grafica/mappa-rotta.svg"
    out.write_text("\n".join(svg), encoding="utf-8")
    print("geschrieben:", out, "| viewBox", LARGO, ALTEZZA, "| Küstenlinien:", len(coste))
    for n in nodi:
        print("  ", n)


if __name__ == "__main__":
    main()
