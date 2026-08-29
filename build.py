#!/usr/bin/env python3
"""Cavaleri Srl — erzeugt die Unterseiten aus einem gemeinsamen Gerüst
und baut zusätzlich eine Einzeldatei-Vorschau (alle Seiten, Hash-Navigation).

Aufruf:  python3 build.py
"""
import base64, json, pathlib, re

W = pathlib.Path(__file__).parent

SITO = "https://www.cavaleri.it"

# Italienisch liegt in der Wurzel, die anderen Sprachen in eigenen Verzeichnissen.
LINGUE = ["it", "de", "en"]
def radice(lingua):
    return "/" if lingua == "it" else f"/{lingua}/"

NAV = [("/azienda/", "nav.azienda"), ("/trasporti/", "nav.trasporti"),
       ("/edilizia/", "nav.edilizia"), ("/rotta/", "nav.rotta2"),
       ("/gallery/", "nav.gallery"), ("/contatti/", "nav.contatti")]

MARCHIO = "/assets/marke/cavaleri-marchio.svg"

IMMAGINI = json.loads((pathlib.Path(__file__).parent / "assets/foto/immagini.json").read_text())


def figura(nome, alt="", sizes="100vw", classe="", eager=False, didascalia=None):
    """<picture> mit AVIF, WebP und JPEG. Breite und Höhe stehen im Markup,
    damit beim Laden nichts springt."""
    v = IMMAGINI[nome]
    def set_(fmt):
        return ", ".join(f"/assets/foto/{f} {w}w" for f, w in v["fonti"][fmt])
    ultimo = v["fonti"]["jpg"][-1][0]
    carico = 'loading="eager" fetchpriority="high"' if eager else 'loading="lazy" decoding="async"'
    cap = f'<figcaption data-t="{didascalia}"></figcaption>' if didascalia else ""
    cl = f' class="{classe}"' if classe else ""
    return (f'<figure{cl}><picture>'
            f'<source type="image/avif" srcset="{set_("avif")}" sizes="{sizes}">'
            f'<source type="image/webp" srcset="{set_("webp")}" sizes="{sizes}">'
            f'<img src="/assets/foto/{ultimo}" alt="{alt}" width="{v["w"]}" height="{v["h"]}" {carico}>'
            f'</picture>{cap}</figure>')


def testa(attivo, slug_corrente=""):
    def voce(h, k):
        att = ' aria-current="page"' if h == attivo else ''
        return '      <a href="%s"%s data-t="%s"></a>' % (h, att, k)
    voci = "\n".join(voce(h, k) for h, k in NAV)
    return f'''<header class="testa attaccata">
  <div class="wrap">
    <a class="marchio" href="/">
<span class="segno">
        <img class="colorato" src="/assets/marke/cavaleri-marchio.svg" alt="" width="36" height="36">
        <img class="chiaro" src="/assets/marke/cavaleri-marchio-bianco.svg" alt="" width="36" height="36">
      </span>
      <span>
        <span class="nome">Cavaleri</span>
        <span class="sotto" data-t="marchio.sotto"></span>
      </span>
    </a>
    <nav class="navi" aria-label="Principale">
{voci}
      <a class="bottone" href="/preventivo/" data-t="nav.preventivo"></a>
    </nav>
    <div class="lingue" role="group" aria-label="Lingua">
      <button type="button" data-lingua="it" data-vai="{radice('it')}{slug_corrente}">IT</button><span class="sep">/</span>
      <button type="button" data-lingua="de" data-vai="{radice('de')}{slug_corrente}">DE</button><span class="sep">/</span>
      <button type="button" data-lingua="en" data-vai="{radice('en')}{slug_corrente}">EN</button>
    </div>
    <button class="menu-tasto" type="button" aria-expanded="false" aria-label="Menu">
      <svg width="26" height="26" viewBox="0 0 26 26" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M3 8h20M3 18h20"/></svg>
    </button>
  </div>
</header>'''


PIEDE = '''<footer class="piede">
  <div class="wrap riga">
    <p data-t="piede.diritti"></p>
    <p>
      <a href="/note-legali/" data-t="piede.note"></a> ·
      <a href="/note-legali/#privacy" data-t="piede.privacy"></a> ·
      <span class="credito"><a href="https://www.vecom-design.it" target="_blank" rel="noopener" data-t="piede.credito"></a></span>
    </p>
  </div>
</footer>'''


def intro(chiave_occhiello, h1, lead):
    return f'''  <section class="intro">
    <div class="wrap">
      <p class="occhiello" data-t="{chiave_occhiello}"></p>
      <h1 data-t="{h1}"></h1>
      <p class="guida" data-t="{lead}"></p>
    </div>
  </section>'''


CONTATTI_BLOCCO = '''  <section class="sfondo-carta riga-sopra">
    <div class="wrap contatti">
      <div class="blocco">
        <h3 data-t="contatti.sede"></h3>
        <p>Cavaleri Srl<br>Via Empedocle 6 — Zona Industriale<br>93100 Caltanissetta (CL)</p>
        <a href="https://www.google.com/maps/search/?api=1&query=Via+Empedocle+6+Caltanissetta" target="_blank" rel="noopener" data-t="contatti.indicazioni"></a>
      </div>
      <div class="blocco">
        <h3 data-t="contatti.tel"></h3>
        <a href="tel:+390934931551">+39 0934 931551</a>
        <a href="tel:+390934584577">+39 0934 584577</a>
        <p data-t="contatti.orari"></p>
      </div>
      <div class="blocco">
        <h3 data-t="contatti.scrivi"></h3>
        <a href="mailto:info@cavaleri.it">info@cavaleri.it</a>
        <a href="https://www.facebook.com/cavaleritrasporti/" target="_blank" rel="noopener">Facebook</a>
        <p>P.IVA 01764920854</p>
      </div>
    </div>
  </section>'''

PERSONE = '''  <section class="riga-sopra">
    <div class="wrap">
      <div class="intestazione">
        <div>
          <p class="occhiello" data-t="persone.occhiello"></p>
          <h2 data-t="persone.titolo"></h2>
        </div>
        <p class="guida" data-t="persone.guida"></p>
      </div>
      <div class="persone">
        <article class="persona">
          <p class="ruolo" data-t="p1.ruolo"></p><h3>Francesco Cavaleri</h3>
          <a href="tel:+393488063771">+39 348 806 3771</a><a href="mailto:francesco@cavaleri.it">francesco@cavaleri.it</a>
        </article>
        <article class="persona">
          <p class="ruolo" data-t="p2.ruolo"></p><h3>Antonino Cavaleri</h3>
          <a href="tel:+393488063773">+39 348 806 3773</a><a href="mailto:tonino@cavaleri.it">tonino@cavaleri.it</a>
        </article>
        <article class="persona">
          <p class="ruolo" data-t="p3.ruolo"></p><h3>Giusy Cavaleri</h3>
          <a href="tel:+393663567922">+39 366 356 7922</a><a href="mailto:giusy@cavaleri.it">giusy@cavaleri.it</a>
        </article>
      </div>
    </div>
  </section>'''

INVITO = '''  <section class="invito sfondo-blu riga-sopra">
    <div class="wrap">
      <p class="occhiello" data-t="invito.occhiello"></p>
      <h2 class="testo" data-t="invito.titolo"></h2>
      <p class="guida" style="margin-top:var(--s4)" data-t="invito.txt"></p>
      <div class="azioni">
        <a class="bottone" href="/preventivo/"><span data-t="nav.preventivo"></span><span class="freccia">→</span></a>
        <a class="bottone bottone--linea" href="tel:+390934931551" data-t="invito.cta2"></a>
      </div>
    </div>
  </section>'''


def storia():
    tappe = [("1974", "storia.t1"), ("1979", "storia.t2"), ("1980—99", "storia.t3"),
             ("2007", "storia.t4"), ("2018", "storia.t5"), ("2019", "storia.t6")]
    righe = "\n".join(
        f'        <article class="tappa"><p class="anno">{a}</p><p data-t="{k}"></p></article>'
        for a, k in tappe)
    return f'''  <section class="riga-sopra">
    <div class="wrap">
      <div class="intestazione">
        <div><p class="occhiello" data-t="storia.occhiello"></p><h2 data-t="storia.titolo"></h2></div>
      </div>
      <div class="storia">
{righe}
        <article class="tappa"><p class="anno" data-t="storia.oggi"></p><p data-t="storia.t7"></p></article>
      </div>
    </div>
  </section>'''


def fatti():
    dati = [("1974", "", "fatti.1"), ("80", "+", "fatti.2"), ("50", "+", "fatti.3"),
            ("30", "", "fatti.4"), ("40", "+", "fatti.5")]
    celle = "\n".join(
        f'''        <div class="fatto"><p class="cifra" data-cifra="{n}">0{f'<span class="unita">{u}</span>' if u else ''}</p><p data-t="{k}"></p></div>'''
        for n, u, k in dati)
    return f'''  <section style="padding-block:0">
    <div class="wrap"><div class="fatti">
{celle}
    </div></div>
  </section>'''


def servizi(indici):
    art = []
    for i in indici:
        art.append(f'''        <article class="servizio">
          <span class="num">0{i}</span>
          <h3 data-t="s{i}.tit"></h3>
          <p data-t="s{i}.txt"></p>
          <ul data-t="s{i}.tag" data-tag="lista"></ul>
        </article>''')
    return '''  <section class="riga-sopra">
    <div class="wrap">
      <div class="servizi">
''' + "\n".join(art) + '''
      </div>
    </div>
  </section>'''


ROTTA = '''  <section class="sfondo-blu riga-sopra">
    <div class="wrap rotta">
      <div>
        <p class="occhiello" data-t="rotta.occhiello"></p>
        <h2 data-t="rotta.titolo"></h2>
        <p class="guida" style="margin-top:var(--s4)" data-t="rotta.txt1"></p>
        <p class="guida" style="margin-top:var(--s3)" data-t="rotta.txt2"></p>
      </div>
      <figure class="mappa visibile" style="margin:0">
        <span class="carta" data-parallasse="0.05" aria-hidden="true"></span>
        <svg viewBox="0 0 620 500" role="img" aria-labelledby="mt2"><title id="mt2">Dalla Sicilia all’Europa</title>
          <g class="griglia"><line x1="0" y1="120" x2="620" y2="120"/><line x1="0" y1="240" x2="620" y2="240"/><line x1="0" y1="360" x2="620" y2="360"/></g>
          <path class="percorso" d="M90 430 C 150 405 185 385 220 340 S 320 265 370 205 S 480 130 540 80"/>
          <g class="nodo nodo--hub"><circle class="pulsa" cx="90" cy="430" r="9" stroke="none" fill="#8fb6ff" opacity=".5"/><circle cx="90" cy="430" r="7"/><text x="110" y="435" data-t="rotta.n1"></text></g>
          <g class="nodo"><circle cx="220" cy="340" r="5"/><text x="238" y="345" data-t="rotta.n2"></text></g>
          <g class="nodo"><circle cx="370" cy="205" r="5"/><text x="388" y="210" data-t="rotta.n3"></text></g>
          <g class="nodo"><circle cx="540" cy="80" r="5"/><text x="522" y="85" text-anchor="end" data-t="rotta.n4"></text></g>
        </svg>
        <figcaption class="nota-fonte" data-t="rotta.fonte"></figcaption>
      </figure>
    </div>
  </section>'''

FIDUCIA = '''  <section class="sfondo-carta riga-sopra">
    <div class="wrap">
      <div class="fiducia">
        <div class="prova"><strong data-t="fiducia.1t"></strong><span data-t="fiducia.1s"></span></div>
        <div class="prova"><strong data-t="fiducia.2t"></strong><span data-t="fiducia.2s"></span></div>
        <div class="prova"><strong data-t="fiducia.3t"></strong><span data-t="fiducia.3s"></span></div>
        <div class="prova"><strong data-t="fiducia.4t"></strong><span data-t="fiducia.4s"></span></div>
      </div>
    </div>
  </section>'''

EDILIZIA_BLOCCHI = '''  <section class="riga-sopra">
    <div class="wrap">
      <div class="blocchi">
        <article><h3 data-t="ed.b1t"></h3><p data-t="ed.b1s"></p></article>
        <article><h3 data-t="ed.b2t"></h3><p data-t="ed.b2s"></p></article>
        <article><h3 data-t="ed.b3t"></h3><p data-t="ed.b3s"></p></article>
      </div>
    </div>
  </section>'''


def gallery():
    foto = [("flotta-schierata", "ga.c1"), ("daf-piazzale", "ga.c2"),
            ("rimorchio-kogel", "ga.c3"), ("rimorchio-krone", "ga.c4"),
            ("ribaltabile", "ga.c5"), ("ribaltabili-toscana", "ga.c6"),
            ("imbarco", "ga.c7"), ("nave-grimaldi", "ga.c8"),
            ("aeroporto", "ga.c9")]
    figs = "\n".join(
        "        " + figura(n, sizes="(min-width:900px) 33vw, 100vw", didascalia=k)
        for n, k in foto)
    return f'''  <section>
    <div class="wrap">
      <p class="nota-vuoto" style="margin:0 0 var(--s4)" data-t="ga.vuoto"></p>
      <div class="griglia-foto">
{figs}
      </div>
    </div>
  </section>'''


MODULO = '''  <section>
    <div class="wrap">
      <form class="modulo" novalidate>
        <div class="barra"><i></i></div>
        <p class="stato"><span data-t="pr.passo"></span> <span class="conta">1</span> <span data-t="pr.di"></span> 3</p>

        <fieldset class="passo" style="border:0;margin:0;padding:0">
          <h2 data-t="pr.p1"></h2>
          <div class="campo">
            <p class="etichetta" data-t="pr.q1"></p>
            <div class="scelte" id="g-merce" data-t="pr.q1a" data-tag="scelte"></div>
          </div>
          <div class="campo coppia">
            <span><label for="c-ritiro" data-t="pr.q2"></label><input id="c-ritiro" required></span>
            <span><label for="c-destinazione" data-t="pr.q3"></label><input id="c-destinazione" required></span>
          </div>
          <div class="azioni-modulo"><button type="button" class="bottone" data-avanti><span data-t="pr.avanti"></span><span class="freccia">→</span></button></div>
        </fieldset>

        <fieldset class="passo" style="border:0;margin:0;padding:0" hidden>
          <h2 data-t="pr.p2"></h2>
          <div class="campo">
            <p class="etichetta" data-t="pr.q4"></p>
            <div class="scelte" id="g-quando" data-t="pr.q4a" data-tag="scelte"></div>
          </div>
          <div class="campo"><label for="c-quantita" data-t="pr.q5"></label><input id="c-quantita" data-p="pr.q5p" required></div>
          <div class="campo"><label for="c-note" data-t="pr.q6"></label><textarea id="c-note" data-p="pr.q6p"></textarea></div>
          <div class="azioni-modulo">
            <button type="button" class="bottone bottone--linea" data-indietro data-t="pr.indietro"></button>
            <button type="button" class="bottone" data-avanti><span data-t="pr.avanti"></span><span class="freccia">→</span></button>
          </div>
        </fieldset>

        <fieldset class="passo" style="border:0;margin:0;padding:0" hidden>
          <h2 data-t="pr.q7"></h2>
          <div class="campo coppia">
            <span><label for="c-nome" data-t="pr.nome"></label><input id="c-nome" required></span>
            <span><label for="c-azienda" data-t="pr.azienda"></label><input id="c-azienda"></span>
          </div>
          <div class="campo coppia">
            <span><label for="c-email" data-t="pr.email"></label><input id="c-email" type="email" required></span>
            <span><label for="c-tel" data-t="pr.tel"></label><input id="c-tel" type="tel"></span>
          </div>
          <div class="azioni-modulo">
            <button type="button" class="bottone bottone--linea" data-indietro data-t="pr.indietro"></button>
            <button type="button" class="bottone" data-invia><span data-t="pr.invia"></span><span class="freccia">→</span></button>
          </div>
          <p class="nota-modulo" data-t="pr.nota"></p>
        </fieldset>
      </form>
    </div>
  </section>'''


def fascia(nome, chiave, forza="0.22"):
    return f'''  <section class="fascia">
    <div class="sfondo" data-parallasse="{forza}" data-asse="scala">{figura(nome, sizes="100vw")}</div>
    <p class="frase" data-t="{chiave}"></p>
  </section>'''


def mondo():
    tappe = [("ro.s1k", "ro.s1t", "ro.s1x", "flotta-schierata"),
             ("ro.s2k", "ro.s2t", "ro.s2x", "rimorchio-krone"),
             ("ro.s3k", "ro.s3t", "ro.s3x", "imbarco"),
             ("ro.s4k", "ro.s4t", "ro.s4x", "nave-grimaldi"),
             ("ro.s5k", "ro.s5t", "ro.s5x", "ribaltabili-toscana")]
    sfondi = "\n".join(
        '      <div class="scena" data-scena="%d">%s</div>' % (n, figura(f, sizes="100vw"))
        for n, (_, _, _, f) in enumerate(tappe))
    blocchi = "\n".join(
        '''      <article class="stazione" data-stazione="%d">
        <p class="occhiello" data-t="%s"></p>
        <h2 data-t="%s"></h2>
        <p class="guida" data-t="%s"></p>
      </article>''' % (n, k, tt, x)
        for n, (k, tt, x, _) in enumerate(tappe))
    # Die Karte zeichnet sich mit dem Scrollen. Die Punkte setzt das Skript
    # über getPointAtLength auf den Pfad — keine von Hand gesetzten Koordinaten.
    return f'''  <section class="mondo" data-tappe="{len(tappe)}">
    <div class="scene" aria-hidden="true">
{sfondi}
      <aside class="mappa-viva">
        <svg viewBox="0 0 200 260" role="img" aria-labelledby="mv-tit">
          <title id="mv-tit" data-t="ro.mappa"></title>
          <path class="scia" d="M35 232 C 48 214 58 204 66 194 S 92 166 106 146 S 142 100 156 72 S 176 42 180 26"/>
          <path class="tracciato" d="M35 232 C 48 214 58 204 66 194 S 92 166 106 146 S 142 100 156 72 S 176 42 180 26"/>
          <g class="punti"></g>
          <circle class="viaggiatore" r="5.5"/>
        </svg>
        <p class="etichetta"></p>
      </aside>
    </div>
    <div class="wrap stazioni">
{blocchi}
    </div>
    <p class="mondo-fine wrap" data-t="ro.fine"></p>
  </section>'''


NOTE = '''  <section>
    <div class="wrap testo-lungo">
      <h2 data-t="nl.d1t"></h2>
      <p>Cavaleri Srl — Via Empedocle 6, Zona Industriale, 93100 Caltanissetta (CL), Italia<br>P.IVA 01764920854</p>
      <h2 data-t="nl.d2t"></h2>
      <p><a href="mailto:info@cavaleri.it">info@cavaleri.it</a> · <a href="tel:+390934931551">+39 0934 931551</a></p>
      <h2 data-t="nl.d3t"></h2><p data-t="nl.d3x"></p>
      <h2 data-t="nl.d4t"></h2><p data-t="nl.d4x"></p>
      <h2 data-t="nl.d5t"></h2><p data-t="nl.d5x"></p>
      <h2 data-t="nl.d6t"></h2><p data-t="nl.d6x"></p>
    </div>
  </section>'''


PAGINE = {
 "azienda":    ("az.title", "az.lead", intro("storia.occhiello", "az.h1", "az.lead") + "\n" + fatti() + "\n" + fascia("flotta-schierata", "fa.2") + "\n" + storia() + "\n" + PERSONE + "\n" + FIDUCIA + "\n" + INVITO, ""),
 "trasporti":  ("tr.title", "tr.lead", intro("servizi.occhiello", "tr.h1", "tr.lead") + "\n" + servizi([1, 2, 3]) + "\n" + fascia("imbarco", "fa.1") + "\n" + ROTTA + "\n" + INVITO, ""),
 "edilizia":   ("ed.title", "ed.lead", intro("servizi.occhiello", "ed.h1", "ed.lead") + "\n" + servizi([4]) + "\n" + fascia("ribaltabile", "fa.3") + "\n" + EDILIZIA_BLOCCHI + "\n" + INVITO, ""),
 "rotta":      ("ro.title", "ro.lead", intro("rotta.occhiello", "ro.h1", "ro.lead") + "\n" + mondo() + "\n" + INVITO, "mondo"),
 "gallery":    ("ga.title", "ga.lead", intro("nav.gallery", "ga.h1", "ga.lead") + "\n" + gallery() + "\n" + INVITO, ""),
 "contatti":   ("co.title", "co.lead", intro("nav.contatti", "co.h1", "co.lead") + "\n" + CONTATTI_BLOCCO + "\n" + PERSONE + "\n" + INVITO, ""),
 "preventivo": ("pr.title", "pr.lead", intro("invito.occhiello", "pr.h1", "pr.lead") + "\n" + MODULO + "\n" + CONTATTI_BLOCCO, "modulo"),
 "note-legali":("nl.title", "nl.lead", intro("piede.note", "nl.h1", "nl.lead") + "\n" + NOTE, ""),
}

DATI_STRUTTURATI = """{
  "@context":"https://schema.org","@type":"MovingCompany","name":"Cavaleri Srl",
  "url":"%s/","foundingDate":"1974","vatID":"IT01764920854","email":"info@cavaleri.it",
  "telephone":"+390934931551",
  "address":{"@type":"PostalAddress","streetAddress":"Via Empedocle 6, Zona Industriale",
   "postalCode":"93100","addressLocality":"Caltanissetta","addressRegion":"CL","addressCountry":"IT"},
  "areaServed":["IT","EU"],"sameAs":["https://www.facebook.com/cavaleritrasporti/"]
}""" % SITO


def pagina(slug, titolo_key, desc_key, corpo, extra_js, lingua="it"):
    js = {"modulo": '\n<script src="/assets/js/preventivo.js" defer></script>',
          "mondo": '\n<script src="/assets/js/mondo.js" defer></script>'}.get(extra_js, "")
    via = f"{radice(lingua)}{slug}/"
    alternative = "\n".join(
        f'<link rel="alternate" hreflang="{l}" href="{SITO}{radice(l)}{slug}/">' for l in LINGUE)
    alternative += f'\n<link rel="alternate" hreflang="x-default" href="{SITO}{radice("it")}{slug}/">'
    briciole = json.dumps({
        "@context": "https://schema.org", "@type": "BreadcrumbList",
        "itemListElement": [
            {"@type": "ListItem", "position": 1, "name": "Home", "item": SITO + radice(lingua)},
            {"@type": "ListItem", "position": 2, "name": slug, "item": SITO + via}]},
        ensure_ascii=False)
    return f'''<!DOCTYPE html>
<html lang="{lingua}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title data-t="{titolo_key}">Cavaleri Srl</title>
<meta name="description" content="" data-meta="{desc_key}">
<link rel="canonical" href="{SITO}{via}">
{alternative}
<meta property="og:type" content="website">
<meta property="og:url" content="{SITO}{via}">
<meta property="og:image" content="{SITO}/assets/foto/og-cavaleri-1200.jpg">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta name="twitter:card" content="summary_large_image">
<meta name="theme-color" content="#0b1b45">
<link rel="icon" href="/assets/marke/cavaleri-marchio.svg" type="image/svg+xml">
<link rel="icon" href="/assets/marke/favicon-32.png" sizes="32x32" type="image/png">
<link rel="apple-touch-icon" href="/assets/marke/apple-touch-icon.png">
<link rel="manifest" href="/site.webmanifest">
<link rel="preload" href="/assets/font/archivo-latin.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="/assets/font/inter-latin.woff2" as="font" type="font/woff2" crossorigin>
<link rel="stylesheet" href="/assets/css/site.css">
<script type="application/ld+json">{DATI_STRUTTURATI}</script>
<script type="application/ld+json">{briciole}</script>
</head>
<body>
<a class="salta" href="#contenuto" data-t="salta"></a>
<div class="filo" aria-hidden="true"></div>
{testa("/" + slug + "/", slug + "/")}
<main id="contenuto">
{corpo}
</main>
{PIEDE}
<script>window.LINGUA="{lingua}";</script>
<script src="/assets/js/i18n.js"></script>
<script src="/assets/js/i18n-pagine.js"></script>
<script src="/assets/js/site.js" defer></script>
<script src="/assets/js/parallasse.js" defer></script>{js}
</body>
</html>
'''


def per_lingua(html, lingua):
    """Interne Seitenverweise auf das Sprachverzeichnis umbiegen.
    Dateien unter /assets/ bleiben unberührt — sie sind sprachlos."""
    if lingua == "it":
        return html
    slugs = "|".join(list(PAGINE) + ["404"])
    html = re.sub(r'href="/(%s)/"' % slugs, lambda m: f'href="/{lingua}/{m.group(1)}/"', html)
    html = html.replace('href="/"', f'href="/{lingua}/"')
    return html


def incorpora_media(html):
    """Für die Einzeldatei-Vorschau: <picture> auf ein kleines eingebettetes
    JPEG eindampfen und den Film als Datenstrom einbetten. Die ausgelieferte
    Fassung behält AVIF, WebP und srcset."""
    import io, subprocess, tempfile
    from PIL import Image

    memoria = {}

    def dato(nome, larghezza, q=60):
        chiave = (nome, larghezza)
        if chiave not in memoria:
            im = Image.open(W / "assets/foto/originali" / f"{nome}.jpg").convert("RGB")
            if im.width > larghezza:
                im = im.resize((larghezza, round(im.height * larghezza / im.width)), Image.LANCZOS)
            buf = io.BytesIO(); im.save(buf, "JPEG", quality=q, optimize=True)
            memoria[chiave] = "data:image/jpeg;base64," + base64.b64encode(buf.getvalue()).decode()
        return memoria[chiave]

    html = re.sub(r"<source[^>]*>", "", html)

    # Dasselbe Foto kommt mehrfach vor (Band, Gallery, Szene). In der Vorschau
    # wird es einmal eingebettet und beim Laden zugewiesen — sonst wächst die
    # Datei mit jeder Wiederholung.
    usati = {}
    vuoto = ("data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///"
             "yH5BAEAAAAALAAAAAABAAEAAAIBRAA7")

    def img(m):
        tag = m.group(0)
        nome = re.search(r"assets/foto/([\w-]+?)(?:-\d+)?\.jpg", tag).group(1)
        larga = 1100 if nome == "hero" else 620
        usati[nome] = dato(nome, larga)
        tag = re.sub(r'src="[^"]*"', 'src="%s" data-foto="%s"' % (vuoto, nome), tag)
        return tag

    html = re.sub(r"<img[^>]*?assets/foto/[^>]*>", img, html)
    elenco = ",".join('"%s":"%s"' % (n, u) for n, u in usati.items())
    html = html.replace("</body>",
        "<script>const FOTO={%s};"
        "document.querySelectorAll('[data-foto]').forEach(i=>i.src=FOTO[i.dataset.foto]);"
        "</script></body>" % elenco)

    video = W / "assets/video/piazzale.mp4"
    if video.exists():
        leggero = pathlib.Path(tempfile.gettempdir()) / "piazzale-lite.mp4"
        if not leggero.exists():
            subprocess.run(["ffmpeg", "-v", "error", "-ss", "8", "-t", "14", "-i", str(video),
                            "-an", "-r", "20", "-vf", "scale=320:-2", "-c:v", "libx264",
                            "-crf", "34", "-preset", "slow", "-pix_fmt", "yuv420p",
                            "-movflags", "+faststart", str(leggero), "-y"], check=False)
        if leggero.exists():
            html = re.sub(r'(\.\./)*assets/video/piazzale\.mp4',
                          "data:video/mp4;base64," + base64.b64encode(leggero.read_bytes()).decode(), html)
    poster = W / "assets/video/piazzale-poster.jpg"
    if poster.exists():
        html = re.sub(r'(\.\./)*assets/video/piazzale-poster\.jpg',
                      "data:image/jpeg;base64," + base64.b64encode(poster.read_bytes()).decode(), html)
    return html.replace('preload="none"', 'preload="auto"')


def adatta(html, profondita):
    """Wurzelbezogene Pfade in relative umschreiben.
    profondita 0 = Startseite, 1 = Unterseite in einem Verzeichnis."""
    p = "../" * profondita
    html = re.sub(r'(href|src|data-vai)="/(?!/)', lambda m: f'{m.group(1)}="{p}', html)
    html = html.replace(f'data-vai="{p}"', f'data-vai="{p}index.html"' if p else 'data-vai="index.html"')
    html = html.replace(f'href="{p}"', f'href="{p}index.html"')
    return html


def controlla_js():
    """Vor jedem Bau: alle Skripte auf Syntax prüfen. Ein fehlendes Komma in den
    Textbausteinen legt sonst die ganze Sprachumschaltung lahm."""
    import shutil, subprocess
    if not shutil.which("node"):
        print("Hinweis: node fehlt, Syntaxprüfung übersprungen.")
        return
    guasti = []
    for f in sorted((W / "assets/js").glob("*.js")):
        r = subprocess.run(["node", "--check", str(f)], capture_output=True, text=True)
        if r.returncode:
            guasti.append(f"{f.name}: {r.stderr.strip().splitlines()[1] if len(r.stderr.splitlines()) > 1 else r.stderr.strip()}")
    if guasti:
        raise SystemExit("Bau abgebrochen — fehlerhafte Skripte:\n  " + "\n  ".join(guasti))
    print("Skripte geprüft: in Ordnung")


def controlla_vorschau(percorso):
    """Auch die zusammengesetzte Vorschau prüfen: beim Zusammenfügen kann kaputt
    gehen, was einzeln in Ordnung war."""
    import re as _re, shutil, subprocess, tempfile
    if not shutil.which("node"):
        return
    testo = percorso.read_text(encoding="utf-8")
    for n, blocco in enumerate(_re.findall(r"<script>([\s\S]*?)</script>", testo)):
        with tempfile.NamedTemporaryFile("w", suffix=".js", delete=False, encoding="utf-8") as f:
            f.write(blocco); nome = f.name
        r = subprocess.run(["node", "--check", nome], capture_output=True, text=True)
        if r.returncode:
            raise SystemExit(f"Vorschau: Skriptblock {n} fehlerhaft\n{r.stderr.strip()}")
    print("Vorschau geprüft: in Ordnung")


def main():
    controlla_js()

    sorgente_home = (W / "sorgenti/index.html").read_text(encoding="utf-8")

    for lingua in LINGUE:
        base = W if lingua == "it" else (W / lingua)
        base.mkdir(exist_ok=True)
        salto = 0 if lingua == "it" else 1

        # Startseite
        home = per_lingua(sorgente_home, lingua)
        home = home.replace('<script src="/assets/js/i18n.js">',
                            '<script>window.LINGUA="%s";</script>\n<script src="/assets/js/i18n.js">' % lingua)
        home = home.replace('<html lang="it">', f'<html lang="{lingua}">')
        alt = "\n".join(f'<link rel="alternate" hreflang="{l}" href="{SITO}{radice(l)}">' for l in LINGUE)
        home = home.replace(f'<link rel="canonical" href="{SITO}/">',
                            f'<link rel="canonical" href="{SITO}{radice(lingua)}">\n{alt}')
        (base / "index.html").write_text(adatta(home, salto), encoding="utf-8")

        for slug, (tit, desc, corpo, extra) in PAGINE.items():
            cartella = base / slug
            cartella.mkdir(exist_ok=True)
            testo = per_lingua(pagina(slug, tit, desc, corpo, extra, lingua), lingua)
            (cartella / "index.html").write_text(adatta(testo, salto + 1), encoding="utf-8")
        print(f"erzeugt: {radice(lingua)} mit {len(PAGINE)} Unterseiten")

    # 404 (sprachlos, die Umschaltung greift dort über das Skript)
    (W / "404.html").write_text(
        adatta(pagina("404", "e404.title", "e404.lead",
               intro("marchio.sotto", "e404.h1", "e404.lead") + '''
  <section><div class="wrap"><a class="bottone" href="/"><span data-t="e404.torna"></span><span class="freccia">→</span></a></div></section>''',
               "").replace(f'<link rel="canonical" href="{SITO}/404/">',
                           '<meta name="robots" content="noindex">'), 0), encoding="utf-8")

    (W / "robots.txt").write_text(f"User-agent: *\nAllow: /\nSitemap: {SITO}/sitemap.xml\n", encoding="utf-8")

    voci = []
    for lingua in LINGUE:
        voci.append(radice(lingua))
        voci += [f"{radice(lingua)}{s}/" for s in PAGINE]
    righe = "\n".join(
        f"  <url><loc>{SITO}{v}</loc><changefreq>monthly</changefreq>"
        f"<priority>{'1.0' if v in ('/',) else '0.7'}</priority></url>" for v in voci)
    (W / "sitemap.xml").write_text(
        '<?xml version="1.0" encoding="UTF-8"?>\n'
        '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' + righe + "\n</urlset>\n",
        encoding="utf-8")
    print(f"erzeugt: 404.html, robots.txt, sitemap.xml ({len(voci)} Adressen)")

    # ---- Einzeldatei-Vorschau: alle Seiten, Umschaltung über den Anker ----
    css = (W / "assets/css/site.css").read_text(encoding="utf-8").replace('@import url("../font/schriften.css");\n', "")
    b64 = lambda f: "data:font/woff2;base64," + base64.b64encode((W / "assets/font" / f).read_bytes()).decode()
    fonts = (f"@font-face{{font-family:'Archivo';font-weight:100 900;font-display:swap;src:url({b64('archivo-latin.woff2')}) format('woff2');}}\n"
             f"@font-face{{font-family:'Inter';font-weight:100 900;font-display:swap;src:url({b64('inter-latin.woff2')}) format('woff2');}}\n")
    marchio = "data:image/svg+xml;base64," + base64.b64encode((W / MARCHIO.lstrip("/")).read_bytes()).decode()

    # Die gezeichneten Motive stehen im CSS mit relativen Pfaden — für die
    # Einzeldatei werden sie eingebettet, die AVIF/WebP-Varianten entfallen.
    for nome in ("mappa-mediterraneo-1600", "trama-linee-1400"):
        dati = base64.b64encode((W / "assets/grafica" / f"{nome}.jpg").read_bytes()).decode()
        css = css.replace(f'url("../grafica/{nome}.jpg")', f'url("data:image/jpeg;base64,{dati}")')
    css = re.sub(r"background-image:image-set\([^;]*?\);", "", css)

    def corpo_di(f):
        s = pathlib.Path(f).read_text(encoding="utf-8")
        return re.search(r"<main[^>]*>(.*)</main>", s, re.S).group(1)

    viste = [("/", corpo_di(W / "index.html"))] + [(f"/{s}/", corpo_di(W / s / "index.html")) for s in PAGINE]
    sezioni = "\n".join(f'<div class="vista" data-vista="{n}">{c}</div>' for n, c in viste)

    idx = (W / "index.html").read_text(encoding="utf-8")
    capo = re.search(r'(<header class="testa".*?</header>)', idx, re.S).group(1)
    capo = re.sub(r'href="(?:\.\./)*(index\.html|[a-z0-9-]+/)"',
                  lambda m: 'href="#%s"' % ("/" if m.group(1) == "index.html" else "/" + m.group(1)), capo)

    js = "\n".join((W / "assets/js" / f).read_text(encoding="utf-8") for f in ("i18n.js", "i18n-pagine.js"))
    comportamento = (W / "assets/js/site.js").read_text(encoding="utf-8")
    moduli = "\n".join((W / "assets/js" / f).read_text(encoding="utf-8") for f in ("preventivo.js", "mondo.js"))

    router = """
(() => {
  const viste = [...document.querySelectorAll('.vista')];
  const mostra = () => {
    const n = (location.hash || '#/').slice(1);
    viste.forEach(v => v.hidden = v.dataset.vista !== n);
    document.querySelector('.testa').classList.toggle('attaccata', n !== '/');
    scrollTo(0,0);
    document.querySelectorAll('.vista:not([hidden]) .rivela, .vista:not([hidden]) .mappa')
      .forEach(e => e.classList.add('visibile'));
    dispatchEvent(new Event('vista-cambiata'));
  };
  addEventListener('hashchange', mostra); mostra();
})();
"""
    vista_css = ".vista[hidden]{display:none}\n"
    out = f'''<!DOCTYPE html><html lang="it"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Cavaleri Srl — Vorschau</title>
<style>{fonts}{css}{vista_css}</style></head><body>
<div class="filo" aria-hidden="true"></div>
{capo}
<main>{sezioni}</main>
{PIEDE}
<script>{js}</script>
<script>{comportamento}</script>
<script>{router}</script>
<script>{moduli}</script>
</body></html>'''
    out = re.sub(r'src="(\.\./)*assets/marke/cavaleri-marchio\.svg"', f'src="{marchio}"', out)
    out = re.sub(r' data-vai="[^"]*"', '', out)
    out = incorpora_media(out)
    fuori = pathlib.Path("/mnt/user-data/outputs/cavaleri-vorschau.html")
    fuori.write_text(out, encoding="utf-8")
    controlla_vorschau(fuori)
    print("Vorschau:", len(out) // 1024, "KB")


if __name__ == "__main__":
    main()
