# Cavaleri Srl — Website

Statische Website für Cavaleri Srl (Trasporti nazionali e internazionali,
Caltanissetta). Dreisprachig IT / DE / EN, ohne Framework, ohne Cookies,
ohne Inhalte von Dritten.

## Bauen

```bash
python3 immagini.py   # Fotos in AVIF/WebP/JPEG und mehrere Breiten rechnen
python3 build.py      # Seiten, sitemap.xml, robots.txt, 404 und Vorschau erzeugen
```

`build.py` prüft vorher alle Skripte mit `node --check`, danach alle erzeugten
Seiten auf wurzelbezogene Pfade — und bricht bei Fehlern ab.

## Prüfen

```bash
python3 -m http.server 8099   # in einem zweiten Fenster
python3 prova.py              # Darstellung in sieben Breiten, mit Bildschirmfotos
python3 misura.py             # Ladeverhalten gegen ein festes Budget
```

## Aufbau

| Pfad | Inhalt |
|---|---|
| `sorgenti/index.html` | Quelle der Startseite |
| `build.py` | Erzeugt alle Unterseiten aus gemeinsamen Bausteinen |
| `immagini.py` | Bildpipeline |
| `assets/css`, `assets/js` | Stylesheet und Skripte |
| `assets/foto/originali` | Ausgangsfotos, alles darüber wird gerechnet |
| `assets/grafica` | gezeichnete Hintergrundmotive |
| `UEBERGABE.md` | Übergabedokument: Farben, Technik, offene Punkte |

Alle Verweise sind relativ, die Seite läuft daher unter jeder Adresse —
auch in einem Unterverzeichnis.

Erstellt von [Vecom Design](https://www.vecom-design.it).
