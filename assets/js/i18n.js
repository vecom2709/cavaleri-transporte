/* Die Sprache steht als Attribut am html-Element, nicht in einem
   Inline-Skript: die Content-Security-Policy erlaubt nur Skriptdateien
   aus eigener Quelle, Inline-Code wird blockiert. */
window.LINGUA = document.documentElement.dataset.lingua || "it";

/* Cavaleri Srl — Textbausteine. Italienisch ist die Leitsprache,
   Deutsch und Englisch sind vollwertige Übersetzungen, keine Kurzfassungen. */
window.TESTI = {

/* ===================== ITALIANO ===================== */
it:{
  "meta.title":"Cavaleri Srl — Trasporti nazionali e internazionali · Caltanissetta",
  "meta.desc":"Dal 1974 trasporti a carico completo e in groupage, deposito televigilato e ingrosso di materiale edile. Ottanta mezzi, trenta persone, hub logistico a Caltanissetta.",

  "nav.azienda":"Azienda", "nav.servizi":"Servizi", "nav.rotta":"Dove operiamo",
  "nav.persone":"Persone", "nav.contatti":"Contatti", "nav.preventivo":"Preventivo",
  "marchio.sotto":"Trasporti · Logistica · Edilizia",

  "hero.occhiello":"Cavaleri Srl · Caltanissetta",
  "hero.h1":'<span class="riga"><span>Dal 1974</span></span><span class="riga"><span><em>la Sicilia</em></span></span><span class="riga"><span>si muove con noi</span></span>',
  "hero.guida":"Trasporti nazionali e internazionali, groupage e distribuzione pallet, deposito televigilato e ingrosso di materiale edile. Un solo interlocutore, dalla rampa al cantiere.",
  "hero.cta1":"Richiedi un preventivo", "hero.cta2":"Conosci l’azienda", "hero.scorri":"Scorri",

  "fatti.1":"Anno di fondazione, a Serradifalco",
  "fatti.2":"Mezzi in flotta, diversificati per tipologia",
  "fatti.3":"Unità impiegate nel conto terzi",
  "fatti.4":"Persone: autisti, magazzino, amministrazione",
  "fatti.5":"Anni come trasportatore ufficiale Monier",

  "servizi.occhiello":"Che cosa facciamo",
  "servizi.titolo":"Quattro servizi, una sola catena",
  "servizi.guida":"Il carico non passa di mano quattro volte. Chi prende l’ordine è chi risponde della consegna — e resta lo stesso referente anche quando il materiale è nostro.",
  "s1.tit":"Trasporti nazionali e internazionali",
  "s1.txt":"Carico completo su tutta la penisola e verso l’Europa, con un parco veicolare diversificato per tipologia e dimensione. Mezzi propri, autisti qualificati, tempi dichiarati prima della partenza.",
  "s1.tag":"Carico completo|Europa|Centine e casse mobili|Trasporto rifiuti",
  "s2.tit":"Groupage e distribuzione pallet",
  "s2.txt":"Anche pochi bancali viaggiano insieme ad altri carichi: costi più bassi, partenze più frequenti, nessuna attesa che il camion si riempia. È il servizio che ci ha portato dentro la rete ASTRE Italia.",
  "s2.tag":"Da 1 pallet|Partenze regolari|Rete ASTRE",
  "s3.tit":"Deposito e logistica televigilata",
  "s3.txt":"Magazzino e gestione conto terzi nello stabilimento dell’area industriale di Caltanissetta, sotto sorveglianza continua. Dal 2019 la logistica dello stabilimento è nostra, sede compresa.",
  "s3.tag":"Conto terzi|Televigilanza|Picking e stoccaggio",
  "s4.tit":"Ingrosso materiale edile",
  "s4.txt":"Laterizi, coperture e materiali per l’edilizia a magazzino: dal 2007 trasporto e ingrosso sono la stessa azienda. Chi compra da noi non deve poi cercare chi lo porta in cantiere.",
  "s4.tag":"Laterizi|Coperture|Consegna in cantiere",

  "rotta.occhiello":"Dove operiamo",
  "rotta.titolo":"Il baricentro è a Caltanissetta",
  "rotta.txt1":"Da febbraio 2019 la sede amministrativa e operativa è dentro lo stabilimento dell’area industriale. Da lì partono i carichi per la Sicilia, per la penisola e per l’Europa — e lì rientrano.",
  "rotta.txt2":"Dal 2018 siamo soci del consorzio ASTRE Italia: le partenze si appoggiano a una rete di colleghi in tutta la penisola, e un bancale diretto in Veneto non aspetta che il camion sia pieno.",
  "rotta.n1":"Caltanissetta · hub", "rotta.n2":"Sicilia", "rotta.n3":"Centro-Nord Italia", "rotta.n4":"Europa",

  "storia.occhiello":"Cinquant’anni di strada",
  "storia.titolo":"Come si arriva a ottanta mezzi",
  "storia.t1":"Giovanni Cavaleri fonda a Serradifalco una piccola impresa di autotrasporti. I primi carichi sono legna da ardere e materiale edile, per tutta la Sicilia.",
  "storia.t2":"Arriva il primo autotreno, un Iveco 170-35. Comincia la specializzazione nel trasporto di laterizi.",
  "storia.t3":"Con i consorzi agrari del Nord e del Mezzogiorno l’area di attività esce dall’isola: nascono i rapporti con le aziende del Centro e del Settentrione.",
  "storia.t4":"Trasporti e ingrosso di materiale edile si fondono nell’attuale Cavaleri Srl: due settori, una sola azienda.",
  "storia.t5":"Adesione al consorzio ASTRE Italia, dopo una prima fase di prova.",
  "storia.t6":"Cavaleri assume la gestione logistica dello stabilimento nell’area industriale di Caltanissetta e vi trasferisce la propria sede.",
  "storia.t7":"Circa ottanta mezzi, trenta persone, tre fratelli alla guida. Il conto terzi resta il mestiere.",
  "storia.oggi":"Oggi",

  "persone.occhiello":"Chi risponde",
  "persone.titolo":"Tre fratelli, tre numeri diretti",
  "persone.guida":"Nessun centralino da attraversare: chi decide risponde al telefono.",
  "p1.ruolo":"Amministratore · Commerciale", "p2.ruolo":"Logistica · Efficienza dei mezzi", "p3.ruolo":"Area finanziaria e amministrativa",

  "fiducia.1t":"Trasportatore ufficiale Monier", "fiducia.1s":"Da circa quarant’anni, senza interruzione.",
  "fiducia.2t":"Socio ASTRE Italia", "fiducia.2s":"Dal 2018, dentro una rete nazionale di trasportatori.",
  "fiducia.3t":"Deposito televigilato", "fiducia.3s":"Sorveglianza continua nell’area industriale.",
  "fiducia.4t":"Conto terzi dal 1974", "fiducia.4s":"Mezzi propri e autisti dipendenti, non solo intermediazione.",

  "invito.occhiello":"Preventivi",
  "invito.titolo":"Dica che cosa deve spostare",
  "invito.txt":"Peso, misure, punto di carico e destinazione. Rispondiamo con un prezzo e una data, non con un modulo da compilare due volte.",
  "invito.cta1":"Scrivi a info@cavaleri.it", "invito.cta2":"Chiama 0934 931551",

  "contatti.sede":"Sede e magazzino", "contatti.tel":"Telefono", "contatti.scrivi":"Scrivi",
  "contatti.orari":"Lunedì – venerdì, 8:00 – 18:00", "contatti.indicazioni":"Indicazioni stradali",

  "piede.diritti":"Trasporti nazionali e internazionali televigilati.",
  "piede.privacy":"Privacy", "piede.note":"Note legali",
  "piede.credito":"Sito realizzato da Vecom Design"
},

/* ===================== DEUTSCH ===================== */
de:{
  "meta.title":"Cavaleri Srl — Nationale und internationale Transporte · Caltanissetta",
  "meta.desc":"Seit 1974 Komplett- und Sammelgutverkehre, bewachtes Lager und Baustoffgroßhandel. Achtzig Fahrzeuge, dreißig Mitarbeiter, Logistikdrehscheibe in Caltanissetta.",

  "nav.azienda":"Unternehmen", "nav.servizi":"Leistungen", "nav.rotta":"Einzugsgebiet",
  "nav.persone":"Ansprechpartner", "nav.contatti":"Kontakt", "nav.preventivo":"Angebot",
  "marchio.sotto":"Transport · Logistik · Baustoffe",

  "hero.occhiello":"Cavaleri Srl · Caltanissetta",
  "hero.h1":'<span class="riga"><span>Seit 1974</span></span><span class="riga"><span>bewegen wir</span></span><span class="riga"><span><em>Sizilien</em></span></span>',
  "hero.guida":"Nationale und internationale Transporte, Sammelgut und Palettenverteilung, bewachtes Lager und Baustoffgroßhandel. Ein Ansprechpartner — von der Rampe bis auf die Baustelle.",
  "hero.cta1":"Angebot anfordern", "hero.cta2":"Das Unternehmen", "hero.scorri":"Scrollen",

  "fatti.1":"Gründungsjahr, in Serradifalco",
  "fatti.2":"Fahrzeuge im Fuhrpark, nach Typ und Größe gemischt",
  "fatti.3":"Einheiten im Werkverkehr für Dritte",
  "fatti.4":"Mitarbeiter: Fahrer, Lager, Verwaltung",
  "fatti.5":"Jahre offizieller Monier-Transporteur",

  "servizi.occhiello":"Was wir tun",
  "servizi.titolo":"Vier Leistungen, eine Kette",
  "servizi.guida":"Die Ladung wechselt nicht viermal den Besitzer. Wer den Auftrag annimmt, haftet für die Zustellung — und bleibt derselbe Ansprechpartner, auch wenn das Material aus unserem Lager kommt.",
  "s1.tit":"Nationale und internationale Transporte",
  "s1.txt":"Komplettladungen auf der gesamten Halbinsel und nach Europa, mit einem nach Typ und Größe gemischten Fuhrpark. Eigene Fahrzeuge, qualifizierte Fahrer, Termine, die vor der Abfahrt feststehen.",
  "s1.tag":"Komplettladung|Europa|Planen und Wechselbrücken|Abfalltransport",
  "s2.tit":"Sammelgut und Palettenverteilung",
  "s2.txt":"Auch wenige Paletten fahren mit anderen Sendungen mit: niedrigere Kosten, häufigere Abfahrten, kein Warten, bis der Lkw voll ist. Dieser Dienst hat uns ins Netzwerk ASTRE Italia gebracht.",
  "s2.tag":"Ab 1 Palette|Feste Abfahrten|Netzwerk ASTRE",
  "s3.tit":"Lager und bewachte Logistik",
  "s3.txt":"Lagerhaltung und Logistik für Dritte im Werk im Industriegebiet von Caltanissetta, unter durchgehender Überwachung. Seit 2019 führen wir die Werkslogistik — Firmensitz inbegriffen.",
  "s3.tag":"Für Dritte|Videoüberwacht|Kommissionierung und Lagerung",
  "s4.tit":"Baustoffgroßhandel",
  "s4.txt":"Ziegel, Dachbaustoffe und Material für den Hochbau ab Lager: seit 2007 sind Transport und Großhandel dasselbe Unternehmen. Wer bei uns kauft, muss den Transport nicht separat suchen.",
  "s4.tag":"Ziegel|Dach|Lieferung auf die Baustelle",

  "rotta.occhiello":"Einzugsgebiet",
  "rotta.titolo":"Der Schwerpunkt liegt in Caltanissetta",
  "rotta.txt1":"Seit Februar 2019 sitzen Verwaltung und Betrieb im Werk im Industriegebiet. Von dort gehen die Ladungen nach Sizilien, auf die Halbinsel und nach Europa — und dorthin kehren sie zurück.",
  "rotta.txt2":"Seit 2018 sind wir Mitglied im Konsortium ASTRE Italia: Die Abfahrten stützen sich auf ein Netz von Kollegen in ganz Italien, und eine einzelne Palette nach Venetien wartet nicht, bis der Lkw voll ist.",
  "rotta.n1":"Caltanissetta · Hub", "rotta.n2":"Sizilien", "rotta.n3":"Mittel- und Norditalien", "rotta.n4":"Europa",

  "storia.occhiello":"Fünfzig Jahre Straße",
  "storia.titolo":"Wie man auf achtzig Fahrzeuge kommt",
  "storia.t1":"Giovanni Cavaleri gründet in Serradifalco ein kleines Fuhrunternehmen. Die ersten Ladungen sind Brennholz und Baumaterial, in ganz Sizilien.",
  "storia.t2":"Der erste Lastzug kommt, ein Iveco 170-35. Die Spezialisierung auf Ziegeltransporte beginnt.",
  "storia.t3":"Über die Agrarkonsortien in Nord- und Süditalien reicht das Gebiet erstmals über die Insel hinaus: Es entstehen die Verbindungen zu Unternehmen in Mittel- und Norditalien.",
  "storia.t4":"Transport und Baustoffgroßhandel verschmelzen zur heutigen Cavaleri Srl: zwei Branchen, ein Unternehmen.",
  "storia.t5":"Beitritt zum Konsortium ASTRE Italia, nach einer ersten Probephase.",
  "storia.t6":"Cavaleri übernimmt die Werkslogistik im Industriegebiet von Caltanissetta und verlegt den Firmensitz dorthin.",
  "storia.t7":"Rund achtzig Fahrzeuge, dreißig Mitarbeiter, drei Geschwister an der Spitze. Der Werkverkehr für Dritte bleibt das Handwerk.",
  "storia.oggi":"Heute",

  "persone.occhiello":"Wer antwortet",
  "persone.titolo":"Drei Geschwister, drei Durchwahlen",
  "persone.guida":"Keine Zentrale dazwischen: Wer entscheidet, geht selbst ans Telefon.",
  "p1.ruolo":"Geschäftsführung · Vertrieb", "p2.ruolo":"Logistik · Fuhrparkeffizienz", "p3.ruolo":"Finanzen und Verwaltung",

  "fiducia.1t":"Offizieller Monier-Transporteur", "fiducia.1s":"Seit rund vierzig Jahren, ohne Unterbrechung.",
  "fiducia.2t":"Mitglied ASTRE Italia", "fiducia.2s":"Seit 2018, in einem landesweiten Transportnetzwerk.",
  "fiducia.3t":"Bewachtes Lager", "fiducia.3s":"Durchgehende Überwachung im Industriegebiet.",
  "fiducia.4t":"Für Dritte seit 1974", "fiducia.4s":"Eigene Fahrzeuge und angestellte Fahrer, keine reine Vermittlung.",

  "invito.occhiello":"Angebote",
  "invito.titolo":"Sagen Sie, was zu bewegen ist",
  "invito.txt":"Gewicht, Maße, Ladestelle und Ziel. Sie bekommen einen Preis und einen Termin — kein Formular, das zweimal auszufüllen ist.",
  "invito.cta1":"E-Mail an info@cavaleri.it", "invito.cta2":"Anrufen: 0934 931551",

  "contatti.sede":"Sitz und Lager", "contatti.tel":"Telefon", "contatti.scrivi":"E-Mail",
  "contatti.orari":"Montag – Freitag, 8:00 – 18:00 Uhr", "contatti.indicazioni":"Anfahrt",

  "piede.diritti":"Nationale und internationale Transporte, bewacht.",
  "piede.privacy":"Datenschutz", "piede.note":"Impressum",
  "piede.credito":"Website von Vecom Design"
},

/* ===================== ENGLISH ===================== */
en:{
  "meta.title":"Cavaleri Srl — National and international haulage · Caltanissetta, Sicily",
  "meta.desc":"Full loads and groupage since 1974, monitored warehousing and building-materials wholesale. Eighty vehicles, thirty people, a logistics hub in Caltanissetta.",

  "nav.azienda":"Company", "nav.servizi":"Services", "nav.rotta":"Where we work",
  "nav.persone":"People", "nav.contatti":"Contact", "nav.preventivo":"Get a quote",
  "marchio.sotto":"Haulage · Logistics · Building materials",

  "hero.occhiello":"Cavaleri Srl · Caltanissetta",
  "hero.h1":'<span class="riga"><span>Since 1974</span></span><span class="riga"><span>we move</span></span><span class="riga"><span><em>Sicily</em></span></span>',
  "hero.guida":"National and international haulage, groupage and pallet distribution, monitored warehousing and building-materials wholesale. One point of contact, from the loading bay to the site.",
  "hero.cta1":"Request a quote", "hero.cta2":"About the company", "hero.scorri":"Scroll",

  "fatti.1":"Founded, in Serradifalco",
  "fatti.2":"Vehicles in the fleet, mixed by type and size",
  "fatti.3":"Units running third-party haulage",
  "fatti.4":"People: drivers, warehouse, administration",
  "fatti.5":"Years as official Monier carrier",

  "servizi.occhiello":"What we do",
  "servizi.titolo":"Four services, one chain",
  "servizi.guida":"A load does not change hands four times. Whoever takes the order answers for the delivery — and stays your contact even when the material comes out of our own warehouse.",
  "s1.tit":"National and international haulage",
  "s1.txt":"Full loads across Italy and into Europe, with a fleet mixed by type and size. Our own vehicles, qualified drivers, delivery windows fixed before departure.",
  "s1.tag":"Full loads|Europe|Curtainsiders and swap bodies|Waste transport",
  "s2.tit":"Groupage and pallet distribution",
  "s2.txt":"Even a few pallets travel with other consignments: lower cost, more frequent departures, no waiting for the truck to fill. This service is what brought us into the ASTRE Italia network.",
  "s2.tag":"From 1 pallet|Scheduled departures|ASTRE network",
  "s3.tit":"Warehousing and monitored logistics",
  "s3.txt":"Storage and third-party logistics inside the plant in the Caltanissetta industrial area, under continuous surveillance. Since 2019 the plant's logistics — and our head office — are ours.",
  "s3.tag":"Third-party|CCTV monitored|Picking and storage",
  "s4.tit":"Building-materials wholesale",
  "s4.txt":"Bricks, roofing and construction materials from stock: since 2007 haulage and wholesale have been one company. Buy from us and you don't have to find someone else to deliver.",
  "s4.tag":"Bricks|Roofing|Delivery to site",

  "rotta.occhiello":"Where we work",
  "rotta.titolo":"The centre of gravity is Caltanissetta",
  "rotta.txt1":"Since February 2019 administration and operations sit inside the plant in the industrial area. Loads leave from there for Sicily, mainland Italy and Europe — and return there.",
  "rotta.txt2":"Since 2018 we have been members of the ASTRE Italia consortium: departures lean on a network of hauliers across the country, and a single pallet bound for Veneto doesn't wait for a full truck.",
  "rotta.n1":"Caltanissetta · hub", "rotta.n2":"Sicily", "rotta.n3":"Central & Northern Italy", "rotta.n4":"Europe",

  "storia.occhiello":"Fifty years on the road",
  "storia.titolo":"How you get to eighty vehicles",
  "storia.t1":"Giovanni Cavaleri founds a small haulage business in Serradifalco. The first loads are firewood and building materials, all over Sicily.",
  "storia.t2":"The first articulated lorry arrives, an Iveco 170-35. Specialisation in brick transport begins.",
  "storia.t3":"Through agricultural consortia in the north and south, the territory reaches beyond the island: relationships with firms in central and northern Italy take shape.",
  "storia.t4":"Haulage and building-materials wholesale merge into today's Cavaleri Srl: two trades, one company.",
  "storia.t5":"The company joins the ASTRE Italia consortium after an initial trial period.",
  "storia.t6":"Cavaleri takes over logistics at the plant in the Caltanissetta industrial area and moves its head office there.",
  "storia.t7":"Around eighty vehicles, thirty people, three siblings in charge. Third-party haulage remains the craft.",
  "storia.oggi":"Today",

  "persone.occhiello":"Who answers",
  "persone.titolo":"Three siblings, three direct lines",
  "persone.guida":"No switchboard in between: the people who decide answer the phone themselves.",
  "p1.ruolo":"Managing director · Sales", "p2.ruolo":"Logistics · Fleet efficiency", "p3.ruolo":"Finance and administration",

  "fiducia.1t":"Official Monier carrier", "fiducia.1s":"For some forty years, without a break.",
  "fiducia.2t":"ASTRE Italia member", "fiducia.2s":"Since 2018, inside a national haulage network.",
  "fiducia.3t":"Monitored warehouse", "fiducia.3s":"Continuous surveillance in the industrial area.",
  "fiducia.4t":"Third-party haulage since 1974", "fiducia.4s":"Own vehicles and employed drivers, not brokerage.",

  "invito.occhiello":"Quotes",
  "invito.titolo":"Tell us what needs moving",
  "invito.txt":"Weight, dimensions, collection point and destination. You get a price and a date — not a form to fill in twice.",
  "invito.cta1":"Email info@cavaleri.it", "invito.cta2":"Call +39 0934 931551",

  "contatti.sede":"Office and warehouse", "contatti.tel":"Phone", "contatti.scrivi":"Email",
  "contatti.orari":"Monday – Friday, 8:00 – 18:00", "contatti.indicazioni":"Directions",

  "piede.diritti":"National and international haulage, under surveillance.",
  "piede.privacy":"Privacy", "piede.note":"Legal notice",
  "piede.credito":"Website by Vecom Design"
}
};
