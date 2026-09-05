# Cavaleri Srl — Übergabe (Stand 48: zwei Leistungsseiten)

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

## Zwei eigene Leistungsseiten
`/groupage/` und `/deposito/`, dreisprachig — die Sitemap führt jetzt 36 Adressen
statt 30.

**Warum eigene Seiten:** Wer „groupage Sicilia" oder „deposito conto terzi
Caltanissetta" sucht, findet eher eine Seite, die genau davon handelt, als eine
Karte auf einer Sammelseite. Die Wettbewerber machen es so, und in diesem Punkt
hatten sie recht.

Beide folgen demselben Aufbau (`pagina_servizio()`): Kopfbild, Erklärung, drei
Blöcke, dann **„Was wir für ein Angebot brauchen"** als Liste. Der letzte Teil
ist der eigentliche Nutzen — er nimmt dem Anrufer die Unsicherheit, was er
überhaupt sagen soll, und uns die Rückfragen.

**Nicht ins Menü aufgenommen.** Mit acht Punkten ist es voll; ein neunter und
zehnter hätten es zum Umbrechen gebracht. Stattdessen führt von den
Leistungskarten auf `/trasporti/` ein Verweis „Wie es abläuft →" auf die
jeweilige Seite. Die Tippfläche dieses Verweises war zunächst 24 px hoch — auf
44 px gebracht.

## Umwelt (`/azienda/`, Abschnitt „Weniger Straße, weniger Fahrten")
Drei Punkte, alle aus dem Betrieb belegbar, keiner erfunden:

- **Der Seeweg**: Von Caltanissetta nach Mailand sind es 1.200 km, davon fährt
  der Auflieger nur einen Teil auf der Straße. Ein Schiff, das ohnehin fährt,
  nimmt ihn mit.
- **Sammelgut vermeidet Leerfahrten** — ein halb beladener Sattelzug verbraucht
  so viel wie ein voller.
- **Das ASTRE-Netz füllt die Rückfahrt** — der praktische Nutzen der
  Mitgliedschaft seit 2018.
- **Eigene Fahrzeuge, eigene Wartung.**

Darunter steht ausdrücklich: *„Wir veröffentlichen keine Emissionszahlen: Wir
würden sie nur nennen, wenn wir sie gemessen hätten."* Wettbewerber führen an
dieser Stelle gern Zahlen, die niemand nachrechnen kann. Der Satz ist stärker
als eine erfundene Tonnenangabe.

## Offene Stelle auf `/lavora/`
Auf der Facebook-Seite des Unternehmens steht eine echte Stellenanzeige:
**Fahrer mit Führerschein CE und CQC, nationale Strecken, Planenauflieger und
Kipper, Erfahrung vorausgesetzt**, Bewerbung telefonisch bei Francesco unter
348 806 3771. Sie steht jetzt hervorgehoben über den drei Bereichen.

**Zu bestätigen:** Ich kenne das Datum der Anzeige nicht. Ist die Stelle besetzt,
nehme ich den Block heraus — es sind zwei Zeilen.

Der Satz darunter wurde angepasst: Er lautete „Wir führen hier keine Liste
offener Stellen" und widersprach damit der Anzeige.

## Stellenseite `/lavora/`
Im Kopf schimmert ein Bild durch die blaue Fläche: jemand steigt in die Kabine.
Es stammt aus **dem Film** — auf keinem der elf Fotos sind Menschen zu sehen.
Ein Einzelbild bei Sekunde 22, ohne Gesicht, was auf einer Stellenseite ohnehin
richtiger ist.

Es folgt demselben Prinzip wie der Kopfbereich der Startseite: **das Bild trägt
die Fläche**, der Verlauf hält nur den Text lesbar, und es bewegt sich — dieselbe
langsame Vergrößerung wie dort, 30 Sekunden hin und zurück.

Der Kopf ist dafür höher (bis 64 % der Bildschirmhöhe). Bei einem
hochformatigen Bild in einem flachen Band sieht man sonst nur einen Streifen.
Das Bild steht bei 42 % Deckung, der Text sitzt unten links, und genau dort ist
der Verlauf am dichtesten — ein weicher Kern in der unteren linken Ecke statt
einer gleichmäßigen Abdunklung, die das ganze Bild grau machen würde.

Das Bild ist nur 464 Pixel breit (Filmauflösung). Bei dieser Deckung und der
Abdunklung fällt das nicht auf; als scharfes Kopfbild wäre es zu wenig.

**Gemessen wurde nach jeder Änderung.** Der erste Versuch mit sichtbarerem Bild
kam an der Vorzeile auf 1,47:1 — die stand über der weißen Fahrertür. Behoben
durch den Eckverlauf, ein etwas dunkleres Bild und eine weiße statt blaue
Vorzeile: Auf einem Foto trägt das kräftige Akzentblau nicht.

Endstand: Desktop 5,1 / 13,0 / 5,1 — Telefon 6,0 / 5,3 / 6,0. `kopf.py` misst das
nach.

Ein Bild im Seitenkopf setzen: `intro("schlüssel", "h1", "lead", foto="dateiname")`.

Im Menü als achter Punkt und zusätzlich im Fuß verlinkt, dreisprachig.

**Es werden keine konkreten Stellen behauptet.** Genannt sind die drei Bereiche,
in denen die dreißig Beschäftigten arbeiten — Fahrer, Lager, Verwaltung und
Disposition — mit den Anforderungen, die dort üblich sind. Dazu ein klarer Satz:
Es gibt hier keine Liste offener Stellen, Initiativbewerbungen werden gelesen und
aufbewahrt. Das ist ehrlich und kostet nichts an Wirkung; eine erfundene
Stellenliste hätte beim ersten Anruf Schaden angerichtet.

Das Argument für den Betrieb steht oben und ist belegt: eigene Fahrzeuge,
angestellte Fahrer, ein Standort, die Geschäftsführung im Haus. Im Fahrermarkt
ist genau das der Unterschied zu einer Vermittlung.

**Das Formular** ist einstufig: Bereich per Kachel, Name, Telefon, E-Mail,
Führerscheine, Erfahrung und Verfügbarkeit. Der Knopf öffnet das E-Mail-Programm
mit fertigem Text — bewusst, damit der Lebenslauf angehängt werden kann. Ein
Formulardienst könnte keine Dateien annehmen, ohne dass Daten über Dritte laufen.

**Anzupassen, sobald bekannt:** die Empfängeradresse (steht auf
`info@cavaleri.it`) und die Angaben in den Anforderungen, falls sie nicht
zutreffen — sie beschreiben, was in diesen Berufen üblich ist, nicht was das
Unternehmen konkret verlangt.

## Neue Inhalte
Alle Angaben stammen von cavaleri.it und aus der ASTRE-Reportage — nichts ist
hinzuerfunden.

**Die Anlage** (`/azienda/`): 2.000 m² überdachte Halle, 30.000 m² Hof,
Fahrzeuge rund um die Uhr videoüberwacht, Ware versichert unterwegs. Vier Karten
mit mitzählenden Zahlen. Das ist die überzeugendste Zahlenreihe, die das
Unternehmen hat, und sie fehlte bisher vollständig.

**Wie es abläuft** (`/trasporti/`): sechs Schritte von der Anfrage bis zur
Zustellung. Beantwortet die Frage, die jeder stellt, der noch nie speditiert hat.

**Die fünf Häfen** in der Karte: Genua, Ravenna, Livorno, Civitavecchia und
Neapel, an ihren echten Koordinaten. Palermo fehlt bewusst — dort steht schon die
Station „Sizilien". Dazu ein Satz im Text der Routen-Abschnitte.

**Der Ursprungssitz** in Serradifalco steht jetzt im Kontaktblock, mit dem
Hinweis, dass das Unternehmen dort 1974 gegründet wurde.

## Noch offen (brauche Angaben)
- **Eintragung im Albo Gestori Ambientali** für den Abfalltransport — die Nummer
  gehört sichtbar auf die Seite, ich kenne sie nicht.
- **Versicherungssumme** und etwaige Zertifikate (ISO, Qualitätsmanagement).
- **Referenzen und Branchen** über Monier hinaus.
- **Stellenseite** — nur sinnvoll, wenn tatsächlich gesucht wird.
- **Widerspruch bei den E-Mail-Adressen**: `info@cavaleri.it` (neue Seite),
  `info@cavaleritrasporti.it` (alte Kontaktseite), `logistica@cavaleri.it`
  (Aufschrift der Auflieger). Welche gilt?

Ein Abschnitt „Aktuelles" mit Beiträgen aus Facebook und Instagram wäre möglich,
würde aber fremde Skripte laden und die Content-Security-Policy sowie die
Cookie-Freiheit der Seite aufgeben. Sinnvoller wäre ein von Hand gepflegter
Block.

## Fußzeile
Alles steht mittig auf einer Achse: Logo, Satz, die beiden Symbole, darunter eine
kurze Trennlinie und die Rechtslinks. Vorher lagen Marke und Symbole links, die
Links am rechten Rand — zwei Blöcke ohne Bezug zueinander.

Nach dem Schattensystem: Auf dunkler Fläche trägt kein Schatten, deshalb kommt
die Tiefe aus einer **Lichtkante an der Oberkante** des Fußes
(`inset 0 1px 0` in Weiß bei 9 %). Die beiden Symbole sind Schaltflächen und
liegen auf **Ebene 2**, beim Zeigen eine höher und drei Pixel angehoben, beim
Drücken eine tiefer.

Die Trennlinie läuft nicht über die ganze Breite, sondern über höchstens 560 px —
sie soll gliedern, nicht durchschneiden. Auf Telefonen stehen die drei Links
untereinander, mit 12 px Abstand nach oben und unten, damit sie sich mit dem
Daumen treffen lassen.

## Soziale Netze
Im Fuß jeder Seite stehen zwei Symbole, im Kontaktblock zusätzlich als Textlink:

- Facebook: https://www.facebook.com/cavaleritrasporti (rund 1.340 Likes)
- Instagram: https://www.instagram.com/cavaleritrasporti (rund 820 Follower, 86 Beiträge)

Beide auch in den strukturierten Daten unter `sameAs` — so verknüpfen
Suchmaschinen Website und Profile miteinander. Die Symbole sind selbst gezeichnet
und liegen im Markup; es wird nichts von Facebook oder Instagram geladen, die
Content-Security-Policy bleibt unangetastet.

## Sprachen
**Sprachweiche für Erstbesucher ist wieder aktiv**: Ein deutscher Browser landet
auf `/de/`, ein englischer auf `/en/`, alle anderen auf der italienischen
Startseite. Als 302, damit `/` die maßgebliche Adresse für Suchmaschinen bleibt.
Steht in `netlify.toml` und ebenso in `.htaccess` für den späteren Umzug.

**Die zuletzt gewählte Sprache wird wieder gemerkt.** Sie greift dort, wo keine
Sprache in der Adresse steht — also auf der 404-Seite und in der
Einzeldatei-Vorschau. Auf den echten Seiten entscheidet immer die Adresse:
`/` ist italienisch, `/de/` deutsch, `/en/` englisch.

**Umschalten funktioniert aus jeder Sprache heraus**, auch mit italienischem
Browser: Der Schalter springt auf dieselbe Seite im anderen Sprachverzeichnis,
und die Sprache bleibt beim Weiterklicken erhalten, weil dann alle Menüpunkte
dorthin zeigen. Geprüft: `/en/gallery/` → IT ergibt `/gallery/`, → DE ergibt
`/de/gallery/`.

Nebenbei behoben: Das Ziel „Italienisch" führte auf `/index.html` statt auf `/` —
zwei Adressen für dieselbe Seite. Jetzt zeigt es auf das Verzeichnis.

Deutsch und Englisch erreicht man über die Umschaltung oben rechts oder direkt
über `/de/` und `/en/`. Die einmal gewählte Sprache bleibt beim Weiterklicken
erhalten, weil die Menüpunkte dann auf das jeweilige Sprachverzeichnis zeigen.

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

## Die Karte
Vorher stand ein abstraktes Streckendiagramm vor einem erzeugten Kartenbild —
die Punkte lagen dadurch an falschen Orten: „Caltanissetta" westlich von Sizilien,
„Sizilien" über Sardinien, „Europa" über Kroatien.

Jetzt ist die Karte echt. `mappa.py` zeichnet sie aus **Natural Earth 1:50 Mio.**
(gemeinfreie Kartendaten), Mercator-Projektion, Ausschnitt 7,0°–19,2° Ost und
35,4°–47,9° Nord. Die Stationen stehen an ihren tatsächlichen Koordinaten:

| Station | Koordinaten | Ort |
|---|---|---|
| Caltanissetta · Hub | 37,490 N / 14,062 O | Sitz |
| Sicilia | 38,115 N / 13,361 O | Palermo, Verladehafen |
| Centro-Nord | 44,494 N / 11,343 O | Bologna |
| Europa | 47,270 N / 9,600 O | Alpenrand |

Der Streckenverlauf führt über echte Zwischenpunkte (Tyrrhenisches Meer, Livorno,
Bologna, Mailand). Die Herkunftszeile unter der Karte sagt das auch: Küstenlinien
aus Natural Earth, Stationen an realen Koordinaten, Verlauf vereinfacht und keine
Seeroute.

Die mitlaufende Karte auf `/rotta/` benutzt denselben Verlauf in derselben
Projektion — beide Karten zeigen dieselbe Wirklichkeit.

Karte neu erzeugen (etwa nach geänderten Stationen): `python3 mappa.py`, dann
`python3 build.py`. Die Datei `ne50.json` mit den Kartendaten wird einmalig
geladen von `raw.githubusercontent.com/nvkelso/natural-earth-vector`.

Das erzeugte Kartenbild `mappa-mediterraneo-*` ist entfallen — es war der Grund
für die falschen Positionen.

## Scrollytelling: was wo passiert
- **Startseite** — Kopfbild als Folge; ganzflächige Aussage über der nächtlichen
  Straße, deren Wörter beim Scrollen einzeln erscheinen; drei Parallaxbänder;
  Karte mit sich zeichnender Route.
- **Azienda** — Fuhrparkraster: achtzig Silhouetten, die sich beim Scrollen füllen,
  mit mitzählender Zahl. Danach die Zeitleiste, bei der die Jahreszahl stehen
  bleibt, solange ihre Etappe läuft.
- **Trasporti** — zweite Aussage über dem Hafenschema, dann der Fahrzeugwähler.
- **Rotta** — die begehbare Seite mit mitlaufender Karte (siehe unten).
- **Gallery** — die Bilder kommen gestaffelt herein.

`assets/js/racconto.js` steuert Wortenthüllung und Raster in einem gemeinsamen
rAF-Lauf: es liest nur Rechtecke, schreibt kein Layout, und rechnet nur für
Elemente in Sichtweite. Bei „reduzierter Bewegung" steht sofort alles fertig da.

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

## Behoben: Auf Netlify erschienen alle Seiten auf Englisch
Die Sprache wurde über ein Inline-Skript gesetzt (`window.LINGUA="de"`). Die
Content-Security-Policy in `netlify.toml` erlaubt aber nur `script-src 'self'` —
**Inline-Code wird blockiert.** Damit war `window.LINGUA` nie gesetzt, und das
Skript fiel auf die zuletzt gespeicherte oder die Browsersprache zurück: Ein
englischer Browser sah unter `/de/` eine englische Seite.

Auf GitHub Pages trat der Fehler nicht auf, weil dort keine CSP gesetzt wird —
die Regeln stehen in `netlify.toml`. Erst der Umzug hat ihn ausgelöst.

Die Sprache steht jetzt als **Attribut am `html`-Element** (`data-lingua="de"`),
`i18n.js` liest es in der ersten Zeile. Es gibt damit **kein einziges
Inline-Skript** mehr auf der ganzen Seite — die strenge CSP kann bleiben, was
die richtige Reihenfolge ist: nicht die Regel lockern, sondern den Code anpassen.

## Renderaufwand
Gemessen mit `fluss.py`: Anteil zäher Frames beim Scrollen der Startseite, CPU
vierfach gedrosselt, sieben Durchläufe, Median.

**Von 15 % auf 7 %** durch zwei Eingriffe:

1. **Dauerhaftes `will-change` entfernt.** Es stand fest auf drei Regeln
   (Kopfbild, Kopftext, Filmrahmen). Der Browser hält dafür jeweils eine eigene
   Ebene im Speicher, auch wenn sich nichts bewegt. `parallasse.js` setzt es
   ohnehin selbst, solange ein Element im Bild ist, und nimmt es danach weg.
2. **Weichzeichner in den Aussagen ersetzt.** Zehn Wörter blendeten mit
   `blur(2px)` ein — die teuerste animierbare Eigenschaft überhaupt. Jetzt
   Deckung plus ein Versatz von 0,22 em und `scale(.985)`. Für das Auge fast
   derselbe Eindruck, für die Grafikkarte ein Bruchteil.

**`content-visibility: auto` wurde geprüft und wieder verworfen.** Es gilt als
Standardrat für lange Seiten, war hier aber messbar schlechter: Median 17 %
gegen 7 %. Der Browser holt das gesparte Rendern genau dann nach, wenn gescrollt
wird. Bei einer Seite mit vielen bewegten Abschnitten lohnt es sich nicht.

## Typografie
- **Zeilenlänge in `em` statt `ch`.** `ch` misst die Null, und die ist in Inter
  deutlich breiter als der Durchschnittsbuchstabe: 58 `ch` ergaben gemessene
  70 Zeichen je Zeile. Jetzt 32 em für Fließtext, gemessen 55–57 Zeichen in der
  längsten Zeile, 65 in den Einleitungen.
- **`text-wrap: balance` auf allen Überschriften** — vorher lag nur `pretty` auf
  Absätzen, weshalb Überschriften mit einem einzelnen Wort in der letzten Zeile
  endeten.
- **`font-optical-sizing: auto`** — beide Schriften haben eine opsz-Achse. Bei
  einer Skala von 13 bis 83 px lohnt sich das.
- **`font-synthesis: none`** — kein vom Browser gerechnetes Kunstfett, wo ein
  Schnitt fehlt.

## Messskripte gegen die Eingangsanimation abgesichert
`contrasto.py` und `kopf.py` maßen zeitweise den Vorhang statt der Seite — der
Kopfbereich kam dadurch auf 16:1 statt der echten 4,97:1. Beide setzen jetzt vor
dem Laden den Sitzungsmerker, sodass die Animation ausbleibt.

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

## Logo
Das gelieferte Logo lag als JPEG auf schwarzem Grund vor. Daraus sind vier
Fassungen entstanden, alle in `assets/marke/`:

| Datei | Verwendung |
|---|---|
| `logo-compatto-colore-*` | Kopfzeile auf hellem Grund |
| `logo-compatto-bianco-*` | Kopfzeile über dem dunklen Kopfbild |
| `logo-colore-*` / `logo-bianco-*` | vollständige Sperrung mit Fußzeile |

**Freistellung:** Der schwarze Grund ist über die Helligkeit in Transparenz
umgerechnet und die Farbe anschließend zurückgerechnet, damit Blau und Silber
unverfälscht bleiben. Die weiße Fassung ist keine Silhouette — sonst wäre das C
in der Raute verschwunden: Blau und die graue Fußzeile werden weiß, die
Silberfüllung der Raute wird fast durchsichtig, damit die Raute als Kontur steht.

**Kompakt gegen vollständig:** In einer 38 px hohen Leiste wäre die Zeile
„Trasporti nazionali e internazionali" vier Pixel hoch — ein Fleck. Im Kopf steht
deshalb die kompakte Sperrung (Raute + Schriftzug), die vollständige steht im
Seitenfuß mit 64 px Höhe, wo sie lesbar ist.

Eingebunden als CSS-Hintergrund mit `image-set()`: AVIF in einfacher und doppelter
Auflösung, PNG als Rückfallebene. Alle sechs Dateien zusammen unter 40 KB.
Der Name steht als `aria-label` am Link, damit Vorlesesoftware ihn findet.

Favicon, Startbildschirmsymbol und Manifest-Symbole sind aus der Raute des echten
Logos neu gerastert. Der frühere SVG-Nachbau ist entfernt.


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
Vier Motive, alle rein dekorativ, alle in `assets/grafica/`, alle in AVIF, WebP
und JPEG. Modell `gpt-image/1.5-text-to-image`, je 22 Credits.

- `mappa-mediterraneo-*` — hinter dem Streckendiagramm
- `trama-linee-*` — Linienraster auf dunklen Flächen
- `notte-strada-*` — nächtliche Autobahn hinter der ersten Aussage
- `porto-schema-*` — Hafenschema hinter der zweiten Aussage

Die nächtliche Straße sieht aus wie eine Fotografie, ist aber keine. Deshalb
nennt `/note-legali/` sie ausdrücklich beim Namen: gezeichnet sind nur die
Hintergründe, alle Fotografien und der Film zeigen das Unternehmen selbst.

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

## Leere Bildflächen: zwei Ursachen, beide behoben
1. **Kein Platzhalter.** Bis ein Bild geladen war, stand eine leere Fläche.
   `immagini.py` erzeugt jetzt zu jedem Foto ein Vorschaubild von 24 Pixeln
   Breite (rund 400 Byte) und legt es als Datenstrom direkt ins Markup — es steht
   sofort da, hochskaliert und dadurch weich, und wird vom richtigen Bild zugedeckt.
   Kostet nichts an Anfragen und nichts an Wartezeit.
2. **Die Scroll-Effekte hielten die Kacheln versteckt, solange das Skript lud.**
   `.rivela` und die Stationen starten mit `opacity: 0` — das galt auch, wenn
   `site.js` noch unterwegs war. Auf langsamer Verbindung sah man deshalb Weiß,
   wo Bilder sein sollten. Die Anfangszustände hängen jetzt an einer Klasse `js`,
   die **das Skript selbst** als erste Anweisung setzt. Vorher gilt: alles sichtbar.
   Damit ist die Seite auch ganz ohne JavaScript vollständig lesbar.

## Helle Schrift auf Bildern
Weiße Schrift auf hellen Fahrzeugen war schwer zu lesen. `contrasto.py` misst das
jetzt: Es blendet die Schrift aus, macht ein Bild und liest die Helligkeit genau
dort, wo die Schrift steht — die hellste Stelle unter jedem Textblock entscheidet.

Gemessen vorher:

| Stelle | vorher | jetzt |
|---|---|---|
| Kopfzeile, Überschrift | 3,76:1 | 4,97:1 |
| Kopfzeile, Vorzeile | 3,90:1 | 5,41:1 |
| Bildband, Satz | 4,26:1 | 10,32:1 |
| Aussage | **2,81:1** | 5,35:1 |
| Akzentwort „Sizilien" | **2,69:1** | 4,14:1 |
| Routenseite, Stationskennung | **2,70:1** | 6,63:1 |

Behoben wurde es **am Bild, nicht an der Schrift**: dichtere Verläufe dort, wo
der Text steht (im Kopfbereich von links unten, auf den Bändern als weicher Kern
in der Mitte, auf der Routenseite von links), und ein etwas zurückgenommenes
Hintergrundbild. Textschatten auf unruhigem Bild frisst Kontrast, statt ihn zu
schaffen — deshalb kommt keiner zum Einsatz.

Zwei Farben wurden zusätzlich aufgehellt, weil sie auf Fotos nicht trugen: das
Akzentwort im Kopfbereich und die Stationskennung auf der Routenseite stehen jetzt
in `#cfe1ff` statt `#8fb6ff`. Auf einfarbigen Flächen bleibt das kräftige
Akzentblau.

Nebenbei: Auf dem Telefon lief der Text der Routenseite hinter die mitlaufende
Karte. Er sitzt jetzt darüber.

## Ansprechpartner als eigene Karten
Die drei standen zuvor in einem zusammenhängenden Raster mit Haarlinien
dazwischen — das las sich wie eine Tabelle. Jetzt sind es drei getrennte Felder
mit eigenem Rand und eigener Höhe, nach der Zuordnungstabelle des
Schattensystems:

- Ruhe: **Ebene 2** — Kante plus Kontakt- und Streuschatten
- Zeigen: **Ebene 3** und drei Pixel angehoben, 240 ms
- Der Verbund selbst hat **keine Höhe** mehr; die Höhe liegt bei den Karten
- Das Bild in der Karte bekommt **keine zweite Höhe**, nur eine Trennlinie zum
  Text — verschachtelte Höhen ergeben Matsch

Abstand zwischen den Karten: 16 bis 28 px je nach Breite. Bei den bisherigen
2 px hätten sich die Schatten gegenseitig gefressen.

Die Leistungs- und Blockraster (`/trasporti/`, `/edilizia/`) sind bewusst weiter
als Verbund gesetzt: dort stehen Zeilen, keine Karten. Sollen sie ebenfalls
getrennt werden, sind es dieselben vier Zeilen.

## Porträts der Ansprechpartner
Alle drei Porträts liegen vor, deshalb steht jetzt in jeder Karte oben das Bild —
auf `/azienda/` und `/contatti/`. Die Umschaltung geschieht im Bau von selbst:
Sind alle drei Dateien da, wandern sie in die Karten; fehlt eine, stehen die
vorhandenen stattdessen neben der Überschrift und die Karten bleiben text-only.

Der Bildausschnitt steht je Person in `build.py` (`object-position`), weil die
Gesichter unterschiedlich im Bild sitzen:

| Person | Ausschnitt | Grund |
|---|---|---|
| Francesco | `50% 20%` | mittig, sitzend |
| Antonino | `50% 12%` | Gesicht weiter oben |
| Giusy | `62% 14%` | steht rechts im Bild |

Auf Tablets stehen Bild und Text nebeneinander, auf Telefonen untereinander.

**Zur Bildqualität:** Alle drei Vorlagen sind Bildschirmfotos um 490 × 490 Pixel,
zugeschnitten auf 397 × 496 im Hochformat. In der Karte werden sie mit 370 px
Breite angezeigt — auf gewöhnlichen Bildschirmen reicht das knapp, auf
hochauflösenden bleiben sie weich. Originale aus der Kamera mit mindestens
1200 px Höhe wären deutlich besser.


## Satz der Zeitleiste
- **Die Jahre stehen jetzt bündig.** Jede Etappe war zuvor ein eigenes Raster,
  deshalb richtete sich jede für sich aus und „1980–99" ragte gegenüber den
  anderen heraus. Die Zeitleiste ist jetzt ein gemeinsames Raster, die Etappen
  übernehmen dessen Spalten per `subgrid`. Die Jahre sind rechtsbündig und bilden
  eine saubere Kante zum Text.
- **Jahr und erste Textzeile stehen auf derselben Schriftlinie** (`align-items:
  baseline`), vorher saß das Jahr optisch zu tief.
- **Kürzere Zeile:** 58 Zeichen statt 64. Auf breiten Bildschirmen wächst die
  Grundschrift auf 19 px, dadurch wurden die Zeilen zuvor deutlich zu lang.
- **Etwas mehr Präsenz im Fließtext**: `#4d586a` statt `#5b6675`, 7:1 auf Weiß.
- **Bis-Strich statt Gedankenstrich** in der Jahresspanne: „1980–99".
- **Silbentrennung** für Absätze eingeschaltet. Im Deutschen zerreißt sonst der
  rechte Rand an Wörtern wie „Baustoffgroßhandel". Überschriften und Zahlen sind
  ausgenommen. Die Trennmuster kommen vom Browser über das `lang`-Attribut, das
  je Sprachverzeichnis richtig gesetzt ist.

Auf Telefonen stehen Jahr und Text weiter untereinander, linksbündig und über die
volle Breite.

## Ton des Films
Kommt der Abschnitt ins Bild, läuft der Film und der Ton geht an. Verlässt er das
Bild, ist beides wieder aus. Der Knopf im Rahmen schaltet den Ton von Hand um;
wer ihn dort ausschaltet, bekommt ihn beim nächsten Hereinscrollen **nicht wieder
aufgedrängt** — die Wahl bleibt bestehen, bis er sie zurücknimmt.

**Wichtig zur Erwartung:** Browser lassen Ton ohne vorherige Nutzerhandlung nicht
zu. Beim allerersten Besuch startet der Film deshalb stumm, und der Knopf lädt zum
Einschalten ein; sobald irgendwo auf der Seite geklickt wurde, greift die
Automatik. Das ist keine Einstellungssache, sondern eine Regel der Browser — sie
lässt sich nicht umgehen, nur sauber abfangen. Genau das tut das Skript: Wird der
Ton verweigert, läuft der Film stumm weiter statt gar nicht.

Zwei Dinge waren dafür nötig:

1. **Die Tonspur fehlte.** Beim ersten Komprimieren hatte ich den Film mit `-an`
   stummgeschaltet. Er ist neu kodiert, mit AAC bei 64 kbit/s Mono — 2,3 statt
   2,0 MB.
2. **Eine zweite Fassung in freien Codecs** (`piazzale.webm`, VP9 und Opus). Sie
   steht als erste Quelle im `<video>`, MP4 als zweite. Das ist nicht nur
   Vorsorge: Chromium ohne proprietäre Codecs — auch der Browser, mit dem ich
   hier prüfe — kann H.264 gar nicht abspielen. Ohne WebM ließ sich das Verhalten
   nicht messen, sondern nur behaupten.

Gemessen wurde: im Bild Ton an und Film läuft · Klick schaltet stumm, Film läuft
weiter · außer Sicht stumm und angehalten · zurück im Bild läuft er, bleibt aber
stumm, weil der Nutzer das so wollte.

## Filmabschnitt
Der Rahmen ist auf breiten Bildschirmen jetzt genau so hoch wie die Textspalte
daneben. Vorher gab das Seitenverhältnis 9:16 die Höhe vor, der Film ragte um das
Doppelte über den Text hinaus.

Zwei Dinge waren dafür nötig: die Zeile richtet sich nicht mehr nach dem
höchsten Element (`align-items: stretch`), und das Video liegt absolut im Rahmen.
Sonst hätte seine eigene Größe von 464 × 832 die Zeilenhöhe weiter bestimmt.
Der Film wird dabei beschnitten, nicht gestaucht.

Auf Telefonen und im Querformat behält der Rahmen sein Hochformat — dort stehen
Text und Film untereinander, eine Angleichung hätte keinen Sinn.

Dazu ein leichter Rahmen: eine Linie in Weiß bei 22 % statt der bisherigen
inneren Kante. Eine Linie, nicht zwei.

## Menü
Alle sieben Einträge sind gleich — auch „Angebot". Vorher war er eine gefüllte
Schaltfläche: weißer Kasten über dem Kopfbild, eigener Schatten, eigene Bewegung
beim Zeigen. Damit fiel er aus der Reihe. Jetzt trägt er dieselbe Schrift,
dieselbe Größe und denselben Unterstrich wie die übrigen.

Der Weg zum Angebot bleibt trotzdem breit: die großen Schaltflächen im
Kopfbereich, am Ende jeder Seite und beim Fahrzeugwähler führen dorthin. Soll der
Menüeintrag wieder auffallen, ist die zurückhaltende Fassung eine farbige
Schrift statt eines Kastens — sag Bescheid, das ist eine Zeile.

Das offene Menü auf Telefonen ist jetzt deckend weiß. Vorher schlug der
Kopfbereich durch, weil die Fläche nur zu 98 % gedeckt war und der Weichzeichner
dahinter nicht überall greift.

## Behoben: Auf Netlify erschienen alle Seiten auf Englisch
Die Sprache wurde über ein Inline-Skript gesetzt (`window.LINGUA="de"`). Die
Content-Security-Policy in `netlify.toml` erlaubt aber nur `script-src 'self'` —
**Inline-Code wird blockiert.** Damit war `window.LINGUA` nie gesetzt, und das
Skript fiel auf die zuletzt gespeicherte oder die Browsersprache zurück: Ein
englischer Browser sah unter `/de/` eine englische Seite.

Auf GitHub Pages trat der Fehler nicht auf, weil dort keine CSP gesetzt wird —
die Regeln stehen in `netlify.toml`. Erst der Umzug hat ihn ausgelöst.

Die Sprache steht jetzt als **Attribut am `html`-Element** (`data-lingua="de"`),
`i18n.js` liest es in der ersten Zeile. Es gibt damit **kein einziges
Inline-Skript** mehr auf der ganzen Seite — die strenge CSP kann bleiben, was
die richtige Reihenfolge ist: nicht die Regel lockern, sondern den Code anpassen.

## Renderaufwand
Gemessen mit `fluss.py`: Anteil zäher Frames beim Scrollen der Startseite, CPU
vierfach gedrosselt, sieben Durchläufe, Median.

**Von 15 % auf 7 %** durch zwei Eingriffe:

1. **Dauerhaftes `will-change` entfernt.** Es stand fest auf drei Regeln
   (Kopfbild, Kopftext, Filmrahmen). Der Browser hält dafür jeweils eine eigene
   Ebene im Speicher, auch wenn sich nichts bewegt. `parallasse.js` setzt es
   ohnehin selbst, solange ein Element im Bild ist, und nimmt es danach weg.
2. **Weichzeichner in den Aussagen ersetzt.** Zehn Wörter blendeten mit
   `blur(2px)` ein — die teuerste animierbare Eigenschaft überhaupt. Jetzt
   Deckung plus ein Versatz von 0,22 em und `scale(.985)`. Für das Auge fast
   derselbe Eindruck, für die Grafikkarte ein Bruchteil.

**`content-visibility: auto` wurde geprüft und wieder verworfen.** Es gilt als
Standardrat für lange Seiten, war hier aber messbar schlechter: Median 17 %
gegen 7 %. Der Browser holt das gesparte Rendern genau dann nach, wenn gescrollt
wird. Bei einer Seite mit vielen bewegten Abschnitten lohnt es sich nicht.

## Typografie
- **Zeilenlänge in `em` statt `ch`.** `ch` misst die Null, und die ist in Inter
  deutlich breiter als der Durchschnittsbuchstabe: 58 `ch` ergaben gemessene
  70 Zeichen je Zeile. Jetzt 32 em für Fließtext, gemessen 55–57 Zeichen in der
  längsten Zeile, 65 in den Einleitungen.
- **`text-wrap: balance` auf allen Überschriften** — vorher lag nur `pretty` auf
  Absätzen, weshalb Überschriften mit einem einzelnen Wort in der letzten Zeile
  endeten.
- **`font-optical-sizing: auto`** — beide Schriften haben eine opsz-Achse. Bei
  einer Skala von 13 bis 83 px lohnt sich das.
- **`font-synthesis: none`** — kein vom Browser gerechnetes Kunstfett, wo ein
  Schnitt fehlt.

## Messskripte gegen die Eingangsanimation abgesichert
`contrasto.py` und `kopf.py` maßen zeitweise den Vorhang statt der Seite — der
Kopfbereich kam dadurch auf 16:1 statt der echten 4,97:1. Beide setzen jetzt vor
dem Laden den Sitzungsmerker, sodass die Animation ausbleibt.

## Angebotsformular
Die Auswahlkacheln sind jetzt gleich hoch, füllen die Zeile aus und zeigen die
Auswahl an einem gefüllten Ring — dieselbe Sprache wie die Punkte an der
Zeitleiste. Auch das Bewerbungsformular auf `/lavora/` erbt das.

Was vorher nicht stimmte:
- **Ungleiche Höhen.** „Sammelgut — wenige Paletten" ist zweizeilig und machte
  die Kachel höher als die anderen. Jetzt gilt eine Mindesthöhe für alle.
- **Eine Kachel allein in der zweiten Zeile.** Im Raster stand „Anderes" neben
  drei leeren Feldern. Mit Flexbox dehnen sich die Kacheln der letzten Zeile auf
  die volle Breite — drei oben, zwei unten, kein Loch.
- **`min-width: 0` war nötig**, sonst hält der längste Begriff die Kachel breit
  und der Umbruch gerät durcheinander. Dazu `overflow-wrap` und Silbentrennung,
  damit „Komplettladung" nicht über den Rand läuft.
- **Die Schrittanzeige** stand als graue Kleinschrift über einem dünnen Strich.
  Jetzt in der Display-Schrift mit hervorgehobener Ziffer, der Balken in
  Markenblau.
- **Der Hinweis auf die Pflichtfelder** stand über der Schrittanzeige und damit
  vor dem Formular. Er steht jetzt darunter, wo er gelesen wird.

## Eingangsanimation
`assets/js/entrata.js` und der Abschnitt „Eingangsanimation" in `site.css`.
Rund vier Sekunden: Die Raute zeichnet sich, das C zeichnet sich hinein, die
Raute dreht sich um die Hochachse weg, die vollständige Marke kommt daraus
hervor, ein Lichtstreif läuft darüber, der Vorhang wird durchsichtig.

**Kein Video, sondern SVG und CSS** — rund 3 KB statt ein bis zwei Megabyte,
scharf in jeder Größe, und es verzögert nichts: die Seite darunter ist fertig
geladen, der Vorhang liegt nur davor.

Wann sie läuft:
- **Beim Aktualisieren immer wieder** — so oft man neu lädt.
- **Beim ersten Aufruf einer Sitzung** einmal.
- **Beim Weiterklicken innerhalb der Seite nicht**, sonst stünden vier Sekunden
  vor jedem Klick.

Unterschieden wird das über die Navigation Timing API: Der Browser meldet selbst,
ob die Seite neu geladen (`reload`), angeklickt (`navigate`) oder über die
Zurück-Taste geholt wurde. Nur bei `reload` wird der Merker in `sessionStorage`
übergangen.

Weitere Vorkehrungen:
- **Bei „reduzierter Bewegung" gar nicht** — das Skript erzeugt dann nichts.
- **Überspringbar**: ein Klick oder die Esc-Taste blendet sie in 350 ms aus.
  Zusätzlich räumt ein Zeitgeber nach 5 Sekunden auf, falls eine Animation
  ausfällt.

**Eine Namenskollision war die Ursache eines stillen Fehlers:** Der innere
Baustein hieß zuerst `.scena` — diesen Namen benutzt schon die Routenseite, wo
er mit `opacity: 0` beginnt. Der Vorhang erschien dadurch leer. Die Bausteine
heißen jetzt `.scena-entrata` und `.rombo-entrata`.

## Durchgang über alle Seiten
Alle zehn Seiten in drei Sprachen wurden gemessen. Behoben:

**Die Startseite hatte keinen Titel.** Das `<title>` in der SVG-Karte trägt eine
Übersetzungskennung; mein Ausdruck `title[data-t]` griff diese statt der im
Seitenkopf, und da ihre Kennung fehlte, blieb der Titel leer. In Google und im
Browsertab stand nichts. Der Ausdruck lautet jetzt `head > title[data-t]`, die
fehlende Kennung ist ergänzt.

**Die Alternativtexte standen im Markup, wurden aber nie eingesetzt.** `figura()`
schreibt `data-alt="..."`, die Texte liegen dreisprachig in den Sprachdateien —
nur fehlte im Skript die Zeile, die daraus `img.alt` macht. Fünfundzwanzig Bilder
waren dadurch für Vorlesesoftware und Suchmaschinen stumm.

**Seitenbeschreibungen**: `/azienda/` und `/edilizia/` haben eigene
Beschreibungen bekommen — sie benutzten den sichtbaren Einleitungstext, der mit
über 200 Zeichen für ein Suchergebnis zu lang ist. Alle dreißig Seiten liegen
jetzt zwischen 115 und 175 Zeichen.

**Pflichtfelder** tragen einen Stern an der Beschriftung, über dem Formular steht
eine Zeile dazu. `aria-required` war schon gesetzt, sichtbar war es nicht.

**Die einzelne Leistungskarte auf `/edilizia/`** läuft nicht mehr über die halbe
Breite mit leerer rechter Hälfte, sondern ist dreispaltig: Nummer, Text, Merkmale.

**Die Bilderseite** hat einen zweiten Absatz bekommen; mit 133 Wörtern war sie
die dünnste Seite.

## Zwischenspeicher: Prüfsummen an den Dateien
GitHub Pages lässt CSS und JavaScript zehn Minuten im Browser liegen — nach einer
Änderung sah man deshalb weiter den alten Stand. `build.py` hängt jetzt an jede
eigene CSS- und JS-Adresse die Prüfsumme der Datei
(`site.css?v=0921a065`). Ändert sich die Datei, ändert sich die Adresse, und der
Browser holt sie sofort neu. Kein Nachdenken über Zwischenspeicher mehr.

## Moderne Schicht
- **Seitenwechsel ohne Blitzer.** `@view-transition { navigation: auto }` blendet
  beim Wechsel zwischen den Seiten. Kopfzeile und Logo bleiben dabei stehen, statt
  mitzublenden. Browser ohne Unterstützung navigieren wie bisher.
- **Überschriften laufen zeilenweise ein** — ein Aufziehen über `clip-path`.
  Beobachtet wird dabei das umgebende Element, nicht die Überschrift selbst: ihr
  eigener `clip-path` macht sie für den IntersectionObserver unsichtbar, sie würde
  nie als „im Bild" gemeldet werden.
- **Licht folgt dem Zeiger** über den dunklen Flächen — ein weicher Schein, der
  die Fläche als Material lesbar macht. Nur mit echtem Zeiger, nicht auf Touch,
  und nicht bei „reduzierter Bewegung".
- **Feines Korn** auf den dunklen Abschnitten: filmische Anmutung, ein SVG-Rauschen
  ohne zusätzliche Datei.
- **Bildkacheln neigen sich** beim Zeigen leicht zum Betrachter, gemeinsam mit dem
  Höhenwechsel aus dem Schattensystem.

## Logo: Höhe und Glanz
Das Logo ist ein freigestelltes Motiv und bekommt deshalb `drop-shadow`, nicht
`box-shadow` — letzteres würde den unsichtbaren Rahmen schatten und den
Freisteller verraten. Zwei gestapelte Filter, Kontakt und Streuung, wie bei den
Flächen. Auf weißem Grund im Schattenton der Marke, auf dunklem Grund schwarz.

Die leichte Wölbung macht ein ruhender Lichtverlauf von oben, der über
`mask-image` auf die Silhouette des Logos begrenzt ist — deshalb liegt er auf dem
Motiv und nicht in einem Kasten darum. Kein Emboss: es gibt keinen hellen
Schatten nach oben, nur den Verlauf innerhalb der Form.

Der **Lichtglanz** ist ein schmaler Streif, der beim Zeigen einmal über das Logo
läuft, ebenfalls auf die Silhouette maskiert. Beim Zeigen hebt sich das Logo
zugleich um eine Ebene. Bei „reduzierter Bewegung" bleibt der Streif aus, Schatten
und Wölbung bleiben.

Die Datei steht dafür in einer Variable `--img`, damit Hintergrundbild und Maske
immer dieselbe Fassung benutzen — sonst läge der Glanz auf der falschen Silhouette,
wenn die Kopfzeile zwischen heller und dunkler Fassung wechselt.

## Schatten und Höhe
`assets/css/schatteneffekte.css` ist die zentrale Datei — Schattenwerte stehen
nirgends sonst.

**Eine Lichtquelle** für die ganze Seite: von oben, nur y-Versatz, nie x.
**Zwei Schichten je Höhe**: ein kurzer Kontaktschatten, der das Objekt an die
Fläche klebt, und ein weiter Streuschatten, der die Höhe macht. Mit steigender
Höhe wird der Schatten weicher und **blasser**, nicht kräftiger.

**Schattenfarbe aus der Marke abgeleitet**, nicht Schwarz: `#1a3a8f` hat den
Farbton 224°; halbierte Sättigung und 12 % Helligkeit ergeben `20 26 41`. Auf den
kühlen Flächen dieser Seite wirkt reines Schwarz sonst grau und schmutzig.

**Auf den dunklen Flächen** (Kopfbereich, blaue Abschnitte, Aussagen, Fuß) trägt
Schatten nicht — dort kommt die Tiefe aus einer Lichtkante an der Oberkante und
einer hellen statt dunklen Hairline.

Zuordnung der Bauteile:

| Bauteil | Ruhe | Zeigen | Drücken |
|---|---|---|---|
| Schaltflächen, Auswahlkacheln, Reiter | 2 | 3 + 3 px nach oben | 1 + `scale(.98)` |
| Bilder der Gallery | 2 | 3 + 3 px nach oben | — |
| Bild in einer Karte | nur Kante | — | — |
| Kartenraster (Leistungen, Personen) | 1 am Verbund | nur Flächentönung | — |
| Eingabefelder | eingelassen | — | — |
| Kopfzeile | keine Höhe, 2 beim Scrollen | — | — |
| Fuß, Bildbänder, Aussagen | keine Höhe | — | — |

Die Zeilen der Kartenraster wechseln bewusst **nicht** die Höhe — bei mehreren
nebeneinander wirkt das nervös.

Das Logo ist freigestellt und bekommt deshalb `drop-shadow`, nicht `box-shadow`;
letzteres würde den unsichtbaren Rahmen schatten.

Textschatten gibt es nur noch dort, wo er zulässig wäre — auf den Bildbändern ist
er entfallen und durch einen etwas kräftigeren Verlauf unter der Schrift ersetzt.

Die Leuchtspuren an Routenlinie und Wanderpunkt sind bewusst einschichtig und ohne Versatz — das ist abgestrahltes Licht, kein Höhenschatten.

Nachgemessen mit dem Audit des Skills: keine Schatten mit x-Versatz, kein reines
Schwarz auf hellen Flächen, keine einschichtigen Flächenschatten, kein
Textschatten unter Überschriftengröße.

## Feinschliff
Anker rutschen nicht mehr unter die Kopfzeile; Textauswahl in Markenfarbe;
`text-wrap: pretty` gegen Schusterjungen; Ziffern mit gleicher Breite bei Zählern,
Jahreszahlen und Telefonnummern; Bildunterschriften kommen beim Zeigen heran
(auf Touch-Geräten stehen sie fest); Karten heben sich leicht an; über die
Schaltflächen läuft beim Zeigen einmal ein Lichtstreif.

## Ladeverhalten: gemessen, mit Budget
`misura.py` ruft jede Seite auf einem gedrosselten Mobilfunknetz (4 Mbit/s,
120 ms Latenz) in Telefongröße auf und misst, was der Besucher merkt. Reißt eine
Seite das Budget, endet das Skript mit Fehler.

Budget: LCP unter 2500 ms, CLS unter 0,05, höchstens 2200 KB und 40 Anfragen.

Gemessen am 29.08.:

| Seite | LCP | CLS | Gewicht | Anfragen |
|---|---|---|---|---|
| `/` | 988 ms | 0 | 449 KB | 19 |
| `/azienda/` | 1028 ms | 0 | 332 KB | 14 |
| `/trasporti/` | 1048 ms | 0 | 405 KB | 17 |
| `/rotta/` | 1708 ms | 0 | 530 KB | 19 |
| `/gallery/` | 1068 ms | 0 | 960 KB | 20 |
| `/preventivo/` | — | 0 | 208 KB | 14 |

CLS von null auf allen Seiten heißt: nichts springt beim Laden. Das kommt daher,
dass jedes Bild seine Maße im Markup trägt. Auf `/preventivo/` meldet der Browser
keinen LCP-Wert, weil dort kein Bild und kein großer Textblock im ersten Bild
liegt — das ist kein Fehler.

## Darstellung: geprüft, nicht geschätzt
`prova.py` ruft jede Seite in sieben Breiten in einem echten Browser auf —
320 (kleines Telefon), 380, 844 × 390 (Telefon im Querformat), 768, 1440,
1920 und 2560, macht Bildschirmfotos und meldet Überläufe, Tippflächen unter
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

## Breite Bildschirme, kleine Telefone, Querformat
- Ab 1600 px wächst der Satzspiegel bis 1760 px mit, Grundschrift auf 19 px,
  Überschriften und Schaltflächen entsprechend größer. Vorher versank die Seite
  auf einem 2560er Monitor in der Mitte.
- Unter 400 px ist die Kopfzeile weiter entlastet; die Sprachwahl wandert auf
  allen Geräten unter 900 px **ins Menü**, wo die Knöpfe volle Größe haben. In der
  Leiste wären sie 32 px breit gewesen.
- Telefon im Querformat: bildschirmhohe Abschnitte sind dort eine Zumutung —
  Kopfbereich, Seitenköpfe und Aussagen haben eigene, flachere Maße.

## Netlify
Es gibt jetzt ein Netlify-Projekt **cavaleri-trasporti**
(app.netlify.com/projects/cavaleri-trasporti). Die Zwangsanmeldung über das
Netlify-Konto, die für neue Projekte des Teams voreingestellt war, ist
abgeschaltet — die Seite ist ohne Konto erreichbar.

`netlify.toml` übernimmt, was `.htaccess` auf einem Apache-Server tut, denn
Netlify kennt `.htaccess` nicht:

- ein Jahr Zwischenspeicher für Bilder, Schriften, Film und Zeichnungen
- eine Woche für CSS und JS (die tragen ihre Prüfsumme in der Adresse)
- HTML ohne Zwischenspeicher
- Sicherheitskopfzeilen samt Content-Security-Policy
- Weiterleitung der alten `.html`-Adressen
- `sorgenti/` und `assets/foto/originali/` sind gesperrt

Adresse: **https://cavaleri-trasporti.netlify.app**

**Zwei Stolpersteine, beide behoben:**

1. Bei Netlify gewinnt die **zuletzt** passende Kopfzeilen-Regel. Meine
   allgemeine `/*`-Regel stand unten und hat damit sämtliche
   Zwischenspeicher-Regeln überschrieben — Bilder wurden gar nicht
   zwischengespeichert. Sie steht jetzt oben.
2. Sperren und Weiterleitungen brauchen `force = true`, wenn an der Stelle eine
   Datei liegt. Ohne das waren `sorgenti/`, `build.py` und die Originalfotos
   trotz Sperre abrufbar, und die Sprachweiche griff nie.

Nachgemessen: Bilder ein Jahr, CSS und JS eine Woche, HTML ohne
Zwischenspeicher; `sorgenti/`, `*.py` und `assets/foto/originali/` liefern 404;
deutscher Browser landet auf `/de/`, englischer auf `/en/`, italienischer
bleibt auf `/`.

**Noch offen:** Netlify ist bisher nicht mit GitHub verbunden — ich habe direkt
veröffentlicht. Für automatische Veröffentlichung bei jedem Push:
Netlify → Project configuration → Build & deploy → Link repository →
`vecom2709/cavaleri-transporte`, Branch `main`, Build command leer,
Publish directory `.`.

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