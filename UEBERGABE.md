# Cavaleri Srl — Übergabe (Stand 14: Pfadfehler behoben und abgesichert)

## Design-DNA
- **Haltung:** souverän, präzise, sizilianisch-warm.
- **Prinzip von trendonix-buecher.de übernommen:** der durchlaufende Faden. Dort ein Goldfaden durch die Menschheitsgeschichte, hier **„la linea"** — eine Bernsteinlinie, die als Scroll-Fortschritt oben mitläuft, die Zeitleiste von 1974 bis heute füllt und auf der Karte die Route Caltanissetta → Sizilien → Festland → Europa zeichnet. Zweites Prinzip: **jede Zahl ist belegt** (Trendonix: „Behauptet wird nichts, was sich nicht prüfen lässt").
- **Nicht:** kein Stock-Lkw im Sonnenuntergang, kein blaues Corporate-Gradient, kein Icon-Karussell.

## Tokens (`assets/css/site.css`, `:root`)
Die Farben stammen aus der Marke selbst: weiße Fahrzeuge mit marineblauem Schriftzug.
Der Blauton wurde aus einem Flottenbild gemessen (≈ `#0E1A4A`–`#14285F`) und auf einen
druck- und bildschirmtauglichen Wert gesetzt.

| Token | Wert | Rolle |
|---|---|---|
| `--blu` | `#1a3a8f` | Marke: Schriftzug, Überschriften, Hauptschalter |
| `--blu-scuro` | `#0b1b45` | Tiefe: Hero, Karte, Fuß |
| `--blu-medio` | `#244cb3` | Hover-Zustand |
| `--blu-chiaro` | `#e9eefa` | getönte Fläche, Schlagworte |
| `--segnale` | `#3b7be0` | einziger Akzent: Linien, Zahlen, Zustände |
| `--carta` | `#f5f7fa` | wechselnde Sektionsfläche |
| `--inchiostro` / `--grigio` | `#0f1725` / `#5b6675` | Text, gedämpfter Text |

Nachgeschärft gegenüber dem Bestand: eine einzige Blaufamilie statt mehrerer Blautöne
nebeneinander, klare Rollen je Ton, ausreichender Kontrast (Fließtext ≥ 7:1 auf Weiß),
und Weiß als Hauptfläche — passend zu einer weißen Flotte.


Schrift: **Archivo** (Display, 800, Versal) + **Inter** (Text), beide selbst gehostet in `assets/font/` — keine Verbindung zu Google-Servern, damit kein Cookie-/Drittanbieter-Thema entsteht. Lizenz: SIL OFL 1.1.

## Was noch eingesetzt werden muss
1. **Bildmarke** — `assets/marke/cavaleri-marchio.svg` ist ein Platzhalter (Raute mit C). Original unter demselben Dateinamen ablegen.
2. **Foto Betriebshof** — als `assets/foto/piazzale-notte.jpg` ablegen (Querformat, mind. 2000 px breit, dunkel/blaue Stunde). Fehlt es, bleibt die gebaute Nachtszene stehen — die Seite ist ohne Foto vollständig.
3. **OG-Bild** — `assets/foto/og-cavaleri.jpg`, 1200 × 630 px.
4. **Instagram-Adresse** — im Kontaktblock ergänzen (Facebook ist verlinkt).
5. **Impressum und Datenschutz** — im Fuß derzeit auf `#` gesetzt.

## Bekannte Grenzen
- Angebotsanfrage läuft aktuell über `mailto:`. Ein mehrstufiges Formular ist als nächster Schritt vorgesehen.
- Inhalte stammen aus dem bestehenden Auftritt (cavaleri.it), der ASTRE-Reportage und den Kontaktangaben. Zahlen stehen mit „circa" in der Quelle, deshalb im Zahlenband als `80+`, `50+`, `40+`.
- `--blu` = `#1a3a8f` ist aus der Aufliegerbeschriftung gemessen (zwei Aufnahmen, Kernwerte `#183890` und `#2e44ab`).

## Sprachen
Jede Sprache hat eigene Adressen — vorher lagen alle drei unter derselben, womit
Suchmaschinen nur Italienisch erfassen konnten:

- Italienisch in der Wurzel: `/`, `/azienda/`, `/trasporti/` …
- Deutsch unter `/de/`, Englisch unter `/en/`

Jede Seite nennt ihre Übersetzungen per `hreflang` (inklusive `x-default` auf
Italienisch), trägt `lang` im HTML und ein eigenes `canonical`. Der Sprachschalter
wechselt jetzt die Adresse statt nur den Text; die gewählte Sprache bleibt beim
Weiterklicken erhalten. In der `.htaccess` schickt eine Weiche Erstbesucher mit
deutschem oder englischem Browser einmalig von der Wurzel in ihre Sprache — als
302, damit die italienische Startseite die maßgebliche bleibt.

Die Sitemap führt alle 27 Adressen.

## Seitenstruktur und Adressen
Saubere Verzeichnisadressen ohne Dateiendung, wie auf trendonix-buecher.de:

`/` · `/azienda/` · `/trasporti/` · `/edilizia/` · `/rotta/` · `/gallery/` ·
`/contatti/` · `/preventivo/` · `/note-legali/` · `404.html`

Erzeugt aus `build.py` (gemeinsamer Kopf, Fuß und Bausteine). Nach einer Änderung
an Kopf, Fuß oder Bausteinen: `python3 build.py`. Das Skript schreibt zugleich
`sitemap.xml`, `robots.txt`, die 404-Seite und die Einzeldatei-Vorschau.

Weil die Adressen absolut sind (`/assets/…`), muss die Seite über einen Webserver
laufen, nicht per Doppelklick aus dem Ordner. Zum Ansehen ohne Server ist die
Vorschaudatei da.

## Bildpipeline
`immagini.py` erzeugt aus jedem Foto in `assets/foto/originali/` je drei Breiten
in AVIF, WebP und JPEG und schreibt `immagini.json`. `build.py` baut daraus
`<picture>`-Blöcke mit `srcset`, `sizes` und festen Maßen — der Browser lädt die
kleinste passende Datei, und beim Laden springt nichts.

AVIF spart gegenüber JPEG rund ein Drittel (Kopfbild 235 statt 371 KB).
Neue Fotos: nach `assets/foto/originali/` legen, `python3 immagini.py`, dann
`python3 build.py`.

## „La rotta" — Scrollytelling
Fünf Stationen von Caltanissetta bis auf das Festland. Die Bilder stehen fest im
Hintergrund und wechseln mit dem Text; rechts unten läuft eine Karte mit:

- die Linie zeichnet sich mit dem Scrollfortschritt (`stroke-dashoffset`),
- ein Punkt wandert die Strecke ab,
- die fünf Stationsmarken leuchten auf, sobald sie erreicht sind,
- darunter stehen Stationsname und ein Fortschrittsbalken.

Die Marken setzt das Skript über `getPointAtLength` auf den Pfad — keine von Hand
gepflegten Koordinaten. Wird der Pfad geändert, wandern die Punkte mit.

Der Fortschritt ist eine einzige Custom Property (`--avanzamento`), einmal je
Bild gesetzt; daran hängen Linie, Punkt, Balken und die leichte Bewegung der Szene.
Auf `animation-timeline` (CSS scroll-driven animations) habe ich bewusst verzichtet:
in Firefox liegt es noch hinter einem Schalter, und der Fortschritt müsste über
`timeline-scope` quer durch den Baum gereicht werden. Der Weg über eine Variable
ist hier robuster und kostet nicht mehr.

Bei „reduzierter Bewegung" ist die Karte fertig gezeichnet und der wandernde Punkt
entfällt. Auf dem Telefon sitzt die Karte unten rechts, damit sie die Überschrift
nicht verdeckt.

## Auffindbarkeit
Je Seite eigener Titel, eigene Beschreibung, `canonical`, OG- und Twitter-Angaben
mit Bildmaßen. Strukturierte Daten: `MovingCompany` und `BreadcrumbList` je Seite.

## Angebotsformular
Drei Schritte, Auswahl per Kachel, Pflichtfelder werden geprüft. Der Absendeknopf
öffnet das E-Mail-Programm mit fertiger Anfrage — die Seite speichert nichts und
braucht keinen Server. Soll die Anfrage stattdessen direkt zugestellt werden, ist ein
Formulardienst (Formspree oder Basin) nötig; das ist eine Zeile in `preventivo.js`.

## Bild- und Filmmaterial
Alle gelieferten Aufnahmen sind eingesetzt. Die Screenshots wurden von Statusleiste
und Vorschaustreifen befreit und aufgerichtet; bei einer Aufnahme ist die Ortsmarke
weggeschnitten.

- `assets/foto/hero.jpg` — die vier Scania, Kopfbild der Startseite
- `assets/foto/` — neun Aufnahmen für die Gallery, mit Bildunterschriften in drei Sprachen
- `assets/foto/og-cavaleri.jpg` — Teilbild für soziale Netze, 1200 × 630
- `assets/video/piazzale.mp4` — 34 s, ohne Ton, 2,1 MB; lädt erst, wenn der Abschnitt
  ins Bild kommt, läuft stumm in Schleife und bleibt bei „reduzierter Bewegung" stehen

## Bildmarke
`assets/marke/cavaleri-marchio.svg` ist jetzt ein Nachbau nach den Fahrzeugfotos
(Raute mit Verlauf, blaues C). Liegt die Vektordatei des Originals vor, ersetzt sie
diese Datei unter demselben Namen.

## Pfade: zwei Fallen, beide jetzt abgesichert
Die Seite läuft mit relativen Pfaden, damit sie in jedem Verzeichnis funktioniert.
Beim Umstellen sind zwei Attribute durchgerutscht:

1. **`srcset`** — die Ersetzung fasste nur `href`, `src` und `data-vai`. In
   `srcset` stehen mehrere Adressen in einer Zeichenkette, die blieben
   wurzelbezogen. Folge: unter GitHub Pages lieferten **alle AVIF- und
   WebP-Bilder 404**, weil sie unter der Domainwurzel gesucht wurden statt im
   Projektverzeichnis. Sichtbar war nur noch das JPEG — und wo der Browser die
   AVIF-Quelle bereits gewählt hatte, gar kein Bild.
2. **`poster`** des Videos — stand in der Quelle ohne führenden Schrägstrich und
   entzog sich damit der Umschreibung. In `/de/` und `/en/` fehlte das Standbild.

`build.py` prüft das jetzt nach jedem Bau in zwei Richtungen und **bricht ab**,
wenn etwas übrig bleibt: kein wurzelbezogener Pfad in den erzeugten Seiten, und
in Unterverzeichnissen kein `assets/…` ohne `../`.

## Die Vorschaudatei
`build.py` schreibt neben der Website eine Einzeldatei zum Ansehen ohne Server.
Sie enthält jetzt dieselben Bilder wie die Live-Seite: AVIF in der größten Breite,
den vollständigen Film, beide Schriftschnitte, die Zeichnungen als AVIF. Rund 5,3 MB.

Zwei Unterschiede bleiben systembedingt:

- Alle Seiten stecken in einer Datei, umgeschaltet über den Anker (`#/azienda/`)
  statt über echte Adressen.
- Die Sprachumschaltung wechselt den Text an Ort und Stelle statt nach `/de/`
  zu springen — in einer Datei gibt es die drei Adressen nicht.

Die Vorschau setzt AVIF voraus; jeder Browser ab etwa 2022 kann das. Maßgeblich
ist ohnehin die veröffentlichte Seite.

## Fahrzeugwähler
Auf `/trasporti/` steht ein Wähler mit drei Typen — Planenauflieger, Kipper,
Zugmaschinen. Reiter statt Aufklappen, damit alle drei mit einem Tipp erreichbar
sind; mit Pfeiltasten bedienbar, `role="tablist"` samt `aria-selected`.

Jeder Typ führt über „Angebot für dieses Fahrzeug" nach
`/preventivo/?mezzo=…`. Dort steht der Typ oben im Formular und geht in die
E-Mail mit — der Kunde muss ihn nicht noch einmal beschreiben.

**Bewusst ohne Zahlen.** Innenmaße, Nutzlasten und Palettenplätze fehlen, weil ich
sie nicht kenne und nicht erfinden wollte. Sobald sie vorliegen, gehören sie in
`i18n-pagine.js` unter `mz.1t`, `mz.2t`, `mz.3t` — die Schlagwortleisten sind
dafür schon da.

## Kopfbild als Folge
Drei Aufnahmen lösen sich im Kopf der Startseite ab — Hof, Verladung, Festland,
dieselbe Reihenfolge wie die Route. Sieben Sekunden je Bild, zwei Sekunden
Überblendung, dazu eine langsame Vergrößerung.

Damit das nichts kostet: nur die erste Aufnahme steht im Markup mit `src`, die
beiden anderen tragen `data-src` und werden erst 700 ms nach dem `load`-Ereignis
nachgezogen. `loading="lazy"` hätte hier nichts gebracht — die Bilder liegen im
sichtbaren Bereich, und die holt der Browser trotzdem sofort. Ohne JavaScript
bleibt die erste Aufnahme stehen, ohne Fehlerbild.

Andere Aufnahmen einsetzen: in `sorgenti/index.html` im Block `.hero-scena`.
Bei mehr als drei Bildern müssen in `site.css` die Werte in `@keyframes sequenza`
und die `animation-delay`-Stufen angepasst werden.

## Tiefe beim Scrollen
`assets/js/parallasse.js` bewegt Bildebenen langsamer als die Seite. Ein einziger
rAF-Lauf für alle Ebenen, nur `transform`, kein Layout-Lesen im Bild; ein
IntersectionObserver rechnet nur, was gerade sichtbar ist. Bei „reduzierter
Bewegung" schaltet sich das Skript vollständig ab.

Ein Element nimmt teil, sobald es `data-parallasse="0.18"` trägt — die Zahl ist der
Anteil der Sichtfensterhöhe, um den es sich gegenläufig verschiebt. Mit
`data-asse="scala"` kommt eine leichte Skalierung dazu.

Eingesetzt an fünf Stellen: Kopfbild (0.12, dazu zieht sich der Text beim
Wegscrollen zurück), drei Bildbänder mit Satz darüber (0.18–0.22), Filmrahmen (0.07).
Die Gallery-Kacheln zeigen einen Bildausschnitt, der größer ist als die Kachel.

Neues Band setzen: in `build.py` `fascia("dateiname", "textschlüssel")` an die
gewünschte Stelle der Seite schreiben.

## Gezeichnete Motive (Kie.ai)
Zwei Motive sind erzeugt, beide rein dekorativ, beide in `assets/grafica/`:

- `mappa-mediterraneo-*` — Kartenbild hinter dem Streckendiagramm, 42 % Deckung
  und weich ausmaskiert. Die Aussage der Sektion trägt weiterhin das SVG davor;
  die gezeichnete Küstenlinie behauptet nichts.
- `trama-linee-*` — sehr leises Linienraster auf den dunklen Flächen
  (Seitenköpfe, Angebotsblock, Kartenabschnitt).

Modell `gpt-image/1.5-text-to-image`, 44 Credits für beide, Restguthaben danach
137,5. Jeweils in AVIF, WebP und JPEG; das Raster wiegt in AVIF 5 KB.

Unter der Karte steht eine Herkunftszeile, und `/note-legali/` benennt es ebenfalls:
gezeichnet ist nur der Hintergrund, alle Fotografien und der Film zeigen das
Unternehmen selbst. Das ist derselbe Umgang wie bei Trendonix, wo im Fuß steht,
dass kein Motiv eine historische Fotografie ist.

## Darstellung: geprüft, nicht geschätzt
`prova.py` ruft jede Seite in drei Breiten (380, 768, 1440) in einem echten
Browser auf, macht Bildschirmfotos und meldet Überläufe, Tippflächen unter
44 Pixeln und Schrift unter 12 Pixeln.

```bash
python3 -m http.server 8099   # in einem zweiten Fenster laufen lassen
python3 prova.py
```

Dabei gefunden und behoben:

- **Kopfzeile brach auf dem Desktop um.** Sechs Menüpunkte, Schaltfläche,
  Sprachwahl und Unterzeile passten bei 1440 px nicht nebeneinander. Jetzt bricht
  nichts mehr um, und die Leiste geht schon ab 1180 px ins Menü statt erst ab 900.
- **Die Bildmarke verlor ihr C.** Auf dunklem Grund wurde sie mit
  `filter: brightness(0) invert(1)` weiß gefärbt — damit verschwand auch das
  weiße C in der Raute. Es gibt jetzt zwei Dateien, `cavaleri-marchio.svg` und
  `cavaleri-marchio-bianco.svg`, die je nach Zustand der Kopfzeile eingeblendet werden.
- **Bilderraster lief über den Rand** (812 statt 768 px). Ursache: `1fr` bedeutet
  `minmax(auto, 1fr)`, und `auto` ist bei einem Bild dessen echte Breite. Behoben mit
  `minmax(0, 1fr)` und `min-width: 0` auf allen Rasterkindern.
- **Zu kleine Tippflächen**: Sprachwahl 29 × 24 px, Kontaktzeilen 32 px hoch.
  Alles Anklickbare liegt jetzt bei mindestens 44 × 44 px.
- **Zu kleine Schrift**: Unterzeile 9,6 px, Schlagworte und Rollen 11,5 px.
  Nichts unter 12 px mehr.
- **Enge Geräte**: Zahlenband zweispaltig statt fünf untereinander, Schaltflächen
  über die volle Breite, Formularfelder einspaltig, Auswahlkacheln untereinander,
  Filmrahmen begrenzt, Kopfzeile ab 560 px zusätzlich entlastet.

## Auf den Server legen
Der gesamte Ordnerinhalt gehört in das Wurzelverzeichnis der Domain, `.htaccess`
eingeschlossen (versteckte Datei — im FTP-Programm „versteckte Dateien anzeigen"
einschalten). Die Datei regelt:

- Weiterleitung der alten `.html`-Adressen auf die neuen Verzeichnisse
- https und `www` als einzige gültige Form
- `404.html` als Fehlerseite
- Kompression; ein Jahr Zwischenspeicher für Bilder, Schriften und Film,
  aber keiner für HTML
- Sicherheitskopfzeilen samt strenger Content-Security-Policy — sie erlaubt nur
  Inhalte vom eigenen Server. Sollte später doch etwas von Dritten eingebunden
  werden (Kartendienst, Statistik), muss diese Zeile angepasst werden.

Läuft die Domain nicht auf Apache, sondern auf nginx, sage Bescheid — dann liefere
ich dieselben Regeln in nginx-Schreibweise.

## Symbole und Kontrast
Symbole für Adressleiste und Startbildschirm liegen bei (`favicon.ico`,
`favicon-32.png`, `apple-touch-icon.png`, `icona-192/512.png`, `site.webmanifest`).

Alle Textfarben sind gegen ihren Hintergrund geprüft: Fließtext 18:1, gedämpfter
Text 5,8:1, Marke 10,3:1. Der Akzentblau gibt es in zwei Fassungen — `#3b7be0`
für Linien und Flächen, `#3269cc` für Schrift auf Weiß (5,2:1). Jede Seite hat
genau eine H1, alle Bilder haben Maße, und ein Sprunglink führt mit der Tastatur
direkt zum Inhalt.

## Zu prüfen vor dem Livegang
- `/note-legali/` enthält Impressum und Datenschutzhinweise nach dem heutigen Stand
  der Seite (keine Cookies, keine Statistik, keine Drittanbieter). Der Text sollte
  vom Unternehmen bzw. dessen Berater gegengelesen werden.
- Instagram-Adresse ergänzen, Vektordatei der Bildmarke einsetzen.
- Server: 404-Seite auf `404.html` zeigen lassen; Weiterleitung der alten
  `.html`-Adressen auf die neuen Verzeichnisse, falls sie schon verlinkt sind.