import './index.css';
import './tabmenu.css';
import json from './data/paintings.json';
import epub from './epub.js';

const PAINTERS_WITH_PORTRAIT = new Set([
  'gabriel', 'mesdag', 'marism', 'marisw', 'mauve', 'weissenbruch',
  'morel', 'hendriks', 'arntzenius', 'dankmeijer', 'israelsi', 'israelsj',
  'zwart', 'akkeringa', 'toorop', 'bauer', 'hofker', 'rueter'
]);

let selectPainterFn = null;

function switchTab(tabId) {
  const tabcontent = document.getElementsByClassName("tabcontent");
  for (let i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }

  const tablinks = document.getElementsByClassName("tablink");
  for (let i = 0; i < tablinks.length; i++) {
    tablinks[i].classList.remove("active-tab");
  }

  const targetContent = document.getElementById(tabId);
  if (targetContent) {
    targetContent.style.display = "block";
  }

  const targetBtn = document.querySelector(`.tablink[data-tab="${tabId}"]`);
  if (targetBtn) {
    targetBtn.classList.add("active-tab");
  }
}

function handleHashChange() {
  const rawHash = (window.location.hash || '').replace(/^#\/?/, '');
  const parts = rawHash.split('/');
  const tab = parts[0] || 'over';
  const painterId = parts[1] || null;

  if (tab === 'over' || tab === 'geschiedenis') {
    switchTab(tab);
  } else if (tab === 'schilders') {
    switchTab('schilders');
    if (selectPainterFn) {
      if (painterId) {
        selectPainterFn(painterId, false);
      }
    }
  } else {
    // fallback naar over
    switchTab('over');
  }
}

function mainTitle(parent) {
  const bar = parent.appendChild(document.createElement('header'));
  bar.classList.add("main-title-bar");

  const h1 = bar.appendChild(document.createElement('h1'));
  h1.innerText = "Collectie Hendrik Spaan (1851–1915)";

  const sub = bar.appendChild(document.createElement('div'));
  sub.classList.add("subtitle");
  sub.innerText = "Haagse School, Impressionisten & Tijdgenoten — Particulier Familie-Erfgoed";
}

function hoofdMenu(parent) {
  const hero = parent.appendChild(document.createElement('div'));
  hero.classList.add("museum-hero");

  const fig = hero.appendChild(document.createElement('div'));
  fig.classList.add("hero-figure");

  const imgWrap = fig.appendChild(document.createElement('div'));
  imgWrap.classList.add("hero-img-wrapper");
  const img = imgWrap.appendChild(document.createElement('img'));
  img.src = './images/hendrik_spaan.jpg';
  img.alt = json.naam + " (" + json.tijd + ")";

  const cap = fig.appendChild(document.createElement('div'));
  cap.classList.add("hero-caption");
  cap.innerText = json.naam + " (" + json.tijd + ")";

  const content = hero.appendChild(document.createElement('div'));
  content.classList.add("hero-content");

  const h2 = content.appendChild(document.createElement('h2'));
  h2.innerText = "Haags kunstverzamelaar en mecenas";

  const p = content.appendChild(document.createElement('p'));
  p.innerText = "Hendrik Spaan (1851–1915) bouwde als banketbakker aan de Korte Beestenmarkt in Den Haag een hechte band op met eigentijdse kunstenaars. Het leeuwendeel van zijn verzameling werd in 1977 nagelaten aan het Kunstmuseum Den Haag. De hier gedocumenteerde catalogus omvat het complementaire particuliere familie-erfgoed dat onder berusting was gebleven bij zijn enige kleindochter, wijlen mevrouw Antoinette Petronella Spaan (1925–2024).";

  const links = content.appendChild(document.createElement('div'));
  links.classList.add("hero-links");

  for (let i = 0; i < json.urls.length; i++) {
    const a = links.appendChild(document.createElement('a'));
    a.classList.add("btn-museum-link");
    a.href = json.urls[i][1];
    a.target = "_blank";
    a.rel = "noopener noreferrer";
    a.innerHTML = "🏛️ " + json.urls[i][0] + " &#8599;";
  }

  const pdfA = links.appendChild(document.createElement('a'));
  pdfA.classList.add("btn-museum-link");
  pdfA.href = "./data/hendrik_spaan.pdf";
  pdfA.target = "_blank";
  pdfA.rel = "noopener noreferrer";
  pdfA.innerHTML = "📄 Bionda-studie (PDF) &#8599;";
}

function tabMenu(parent) {
  const menuContainer = parent.appendChild(document.createElement('div'));
  menuContainer.classList.add("tabmenu-container");
  const pageContainer = parent.appendChild(document.createElement('div'));
  pageContainer.classList.add("tabpage-container");

  function createMenuItem(tabmenuContainer, tabpageContainer, id, title, addContent) {
    const btn = tabmenuContainer.appendChild(document.createElement('button'));
    btn.classList.add("tablink");
    btn.dataset.tab = id;
    btn.innerText = title;
    btn.addEventListener("click", () => {
      window.location.hash = '#' + id;
    });

    const content = tabpageContainer.appendChild(document.createElement('div'));
    content.id = id;
    content.classList.add("tabcontent");
    content.style.display = "none";
    addContent(content);
  }

  createMenuItem(menuContainer, pageContainer, "over", "🏛️ Over de Collectie", (parent) => overCollectie(parent));
  createMenuItem(menuContainer, pageContainer, "schilders", "🎨 Kunstenaars & Werken", (parent) => schildersMenu(parent));
  createMenuItem(menuContainer, pageContainer, "geschiedenis", "📖 Geschiedenis (Bionda 1989)", (parent) => epub(parent, 'bionda', 18));
}

function overCollectie(parent) {
  const container = parent.appendChild(document.createElement('div'));
  container.classList.add("over-collectie");

  const title = container.appendChild(document.createElement('h2'));
  title.innerText = "De Collectie Hendrik Spaan (1851–1915)";

  const p1 = container.appendChild(document.createElement('p'));
  p1.innerHTML = "Deze website documenteert de kunstwerken die in bezit waren van <strong>wijlen mevrouw Antoinette Petronella Spaan (1925–2024)</strong>, de enige kleindochter van de Haagse kunstverzamelaar en mecenas <strong>Hendrik Spaan (1851–1915)</strong>.";

  const p2 = container.appendChild(document.createElement('p'));
  p2.innerHTML = "Hendrik Spaan, van beroep banketbakker en gevestigd aan de Korte Beestenmarkt 2 te Den Haag (destijds recht tegenover het Koninklijk Conservatorium), bouwde vanuit zijn persoonlijke contacten met eigentijdse kunstenaars een unieke en hoogwaardige verzameling op. Deze omvatte niet uitsluitend meesters van de Haagse School (zoals Willem Maris, Paul Gabriël, H.W. Mesdag en Anton Mauve), maar evenzeer toonaangevende Amsterdamse impressionisten, symbolisten en tijdgenoten — waaronder Floris Arntzenius, Willem de Zwart, Isaac Israëls, Jan Toorop, Marius Bauer en Odilon Redon, alsmede latere werken van Willem Gerard Hofker en Maria Hofker-Rueter.";

  const h3_1 = container.appendChild(document.createElement('h3'));
  h3_1.innerText = "Museaal Legaat Kunstmuseum Den Haag & Stichting H. Spaan Fonds (1977)";

  const p3 = container.appendChild(document.createElement('p'));
  p3.innerHTML = "Een essentieel deel van de oorspronkelijke verzameling van Hendrik Spaan werd in 1977 nagelaten aan de gemeente 's-Gravenhage ter plaatsing in het toenmalige Haags Gemeentemuseum (thans <strong>Kunstmuseum Den Haag</strong>). Dit geschiedde via het testamentaire legaat van zijn dochter, <strong>mejuffrouw Hendrika Spaan</strong> (1888–1977), die woonde aan de Laan van Meerdervoort 151 en op 24 april 1977 overleed. Bij besluit van de gemeenteraad van Den Haag op <strong>5 september 1977</strong> werd haar legaat officieel en met bijzondere erkentelijkheid aanvaard.";

  const p3_fond = container.appendChild(document.createElement('p'));
  p3_fond.innerHTML = "Uit de verkoopopbrengst van haar herenhuis aan de Laan van Meerdervoort werd tevens de <strong>'Stichting H. Spaan Fonds'</strong> opgericht. Blijkens de officiële statuten treedt de directeur van het Gemeentemuseum qualitate qua op als voorzitter van het bestuur, bijgestaan door notaris mr. L.W.F.H. van Peski en de voorzitter van het Schilderkundig Genootschap Pulchri Studio. Doel van het fonds is om uit de jaarlijkse renteopbrengst kunstwerken aan te kopen van toonaangevende Haagse meesters ten behoeve van de vaste museumcollectie.";

  // De 4 museumstukken in beeld
  const museumGridTitle = container.appendChild(document.createElement('h4'));
  museumGridTitle.classList.add("museum-subsection-title");
  museumGridTitle.innerText = "Schilderijen uit het Legaat Spaan in de collectie van Kunstmuseum Den Haag:";

  const museumGrid = container.appendChild(document.createElement('div'));
  museumGrid.classList.add("museum-pieces-grid");

  const museumWorks = [
    {
      title: "Portret van Hendrik Spaan",
      artist: "Floris Arntzenius (1864–1925)",
      year: "1904",
      medium: "Olieverf op paneel",
      dimensions: "52 × 37,5 cm",
      objnr: "0334805",
      img: "./images/km_arntzenius_spaan.jpg",
      url: "https://www.kunstmuseum.nl/nl/collectie/portret-van-h-spaan-0?origin=gm",
      info: "Karaktervol portret van banketbakker en kunstverzamelaar Hendrik Spaan, getooid met hoge hoed en bril."
    },
    {
      title: "Portret van Hendrik Spaan",
      artist: "Willem de Zwart (1862–1931)",
      year: "ca. 1895–1905",
      medium: "Olieverf op doek",
      dimensions: "59,5 × 46,5 cm",
      objnr: "0334806",
      img: "./images/km_zwart_spaan.jpg",
      url: "https://www.kunstmuseum.nl/nl/collectie/portret-van-h-spaan",
      info: "Intiem en virtuoos geschilderd portret in warme, donkere tonen door 'de Haagse Breitner' Willem de Zwart."
    },
    {
      title: "Portret van mevr. A.P. Spaan-van Meeuwen",
      artist: "Albert Neuhuys (1844–1914)",
      year: "Eind 19e eeuw",
      medium: "Olieverf op doek",
      dimensions: "70 × 61 cm",
      objnr: "0334807",
      img: "./images/km_neuhuys_meeuwen.jpg",
      url: "https://www.kunstmuseum.nl/nl/collectie/portret-van-mevrouw-ap-spaan-van-meeuwen",
      info: "Voornaam portret van Antoinette Petronella van Meeuwen (1854–1904), echtgenote van Hendrik Spaan."
    },
    {
      title: "Liggende koe",
      artist: "Willem Maris (1844–1910)",
      year: "ca. 1893",
      medium: "Olieverf op doek",
      dimensions: "58,2 × 82,6 cm",
      objnr: "0334808",
      img: "./images/km_maris_koe.jpg",
      url: "https://www.kunstmuseum.nl/nl/collectie/liggende-koe",
      info: "Gewaardeerd topstuk van de Haagse School met een koe aan de waterkant, badend in het Hollandse licht."
    }
  ];

  for (let w of museumWorks) {
    const card = museumGrid.appendChild(document.createElement('div'));
    card.classList.add("museum-piece-card");

    const imgBox = card.appendChild(document.createElement('div'));
    imgBox.classList.add("museum-piece-img-box");
    const img = imgBox.appendChild(document.createElement('img'));
    img.src = w.img;
    img.alt = w.title + " - " + w.artist;
    img.title = "Klik om op Kunstmuseum.nl te bekijken";
    img.addEventListener("click", () => window.open(w.url, '_blank', 'noopener,noreferrer'));

    const body = card.appendChild(document.createElement('div'));
    body.classList.add("museum-piece-body");

    const artist = body.appendChild(document.createElement('div'));
    artist.classList.add("museum-piece-artist");
    artist.innerText = w.artist;

    const pieceTitle = body.appendChild(document.createElement('div'));
    pieceTitle.classList.add("museum-piece-title");
    pieceTitle.innerText = w.title;

    const meta = body.appendChild(document.createElement('ul'));
    meta.classList.add("museum-piece-meta");
    meta.innerHTML =
      "<li><strong>Techniek:</strong> <span>" + w.medium + "</span></li>" +
      "<li><strong>Afmetingen:</strong> <span>" + w.dimensions + "</span></li>" +
      "<li><strong>Kunstmuseum nr:</strong> <span>" + w.objnr + "</span></li>";

    const desc = body.appendChild(document.createElement('p'));
    desc.classList.add("museum-piece-desc");
    desc.innerText = w.info;

    const btn = body.appendChild(document.createElement('a'));
    btn.classList.add("museum-piece-btn");
    btn.href = w.url;
    btn.target = "_blank";
    btn.rel = "noopener noreferrer";
    btn.innerHTML = "🏛️ Kunstmuseum Collectie &#8599;";
  }

  // Overige gelegateerde werken
  const overigeBox = container.appendChild(document.createElement('div'));
  overigeBox.classList.add("overige-legaat-box");
  overigeBox.innerHTML = "<h4>Overige werken uit het legaat Spaan (Museumdepot & Historie):</h4>" +
    "<p>Naast de hierboven getoonde schilderijen omvatte het testamentaire legaat uit 1977 tevens:" +
    "<ul>" +
      "<li><strong>Jozef Israëls:</strong> Een ensemble van 9 sepia pentekeningen met gedichten opgedragen aan Hendrik Spaan, alsmede een portrettekening van een vrouw in zwart krijt (24 × 32 cm).</li>" +
      "<li><strong>Marius van der Maarel:</strong> Schilderij <em>Moeder met kind</em> (olieverf op doek, 56 × 48 cm).</li>" +
      "<li><strong>Charles van Wijk:</strong> Twee beelden (<em>Zittend naaktfiguur</em> en <em>Naaistertje</em>), die blijkens het museumrapport d.d. 6 juni 1977 helaas kort na het overlijden van mej. Spaan uit de woning aan de Laan van Meerdervoort zijn ontvreemd voordat de collectie veiliggesteld kon worden.</li>" +
    "</ul></p>";

  // PDF Documenten Archief
  const docsContainer = container.appendChild(document.createElement('div'));
  docsContainer.classList.add("archive-docs-container");
  
  const docsHeading = docsContainer.appendChild(document.createElement('h3'));
  docsHeading.innerHTML = "📑 Origineel Museumarchief Kunstmuseum Den Haag (1972–1977)";
  
  const docsIntro = docsContainer.appendChild(document.createElement('p'));
  docsIntro.innerText = "Inzage in de officiële museumcorrespondentie, inventarisatielijsten, taxaties en gemeentelijke raadsbesluiten rondom de aanvaarding van het legaat Spaan en de oprichting van het Stichting H. Spaan Fonds:";

  const docsGrid = docsContainer.appendChild(document.createElement('div'));
  docsGrid.classList.add("archive-docs-grid");

  const pdfFiles = [
    {
      title: "Voorbereiding Legaat & Kunstwerkenlijst",
      desc: "Bezoekverslag van drs. M.H. Josephus Jitta en wethouder F.D. Bastet, inventarisatielijst van kunstwerken ten huize van mej. Spaan en brieven van museumdirecteur L.J.F. Wijsenbeek.",
      file: "./data/spaan/20170508_9.pdf",
      tag: "Correspondentie 1972"
    },
    {
      title: "Kennisgeving Notaris & Diefstalrapportage",
      desc: "Kennisgeving notaris Mr. L.W.F.H. van Peski, voorstel tot aanvaarding door directeur Drs. Th. van Velzen, melding inbraak Van Wijk-sculpturen en ontvangstbewijs via Venduhuis.",
      file: "./data/spaan/bn0339.pdf",
      tag: "Overdracht 1977"
    },
    {
      title: "Raadsvoorstel No. 365 & Statuten H. Spaan Fonds",
      desc: "Voordracht van Burgemeester en Wethouders met exacte maten, historische verzekeringswaarden (fl. 7.500,- voor Arntzenius, fl. 40.000,- voor Maris) en de formele oprichtingsstatuten van het H. Spaan Fonds.",
      file: "./data/spaan/20180502_7.pdf",
      tag: "Raadsvoorstel & Statuten"
    },
    {
      title: "Raadsbesluit Aanvaarding Gemeenteraad",
      desc: "Officieel afschrift van het besluit van de Gemeenteraad van 's-Gravenhage d.d. 5 september 1977, ondertekend door burgemeester Schols en secretaris Gebel, tot definitieve aanvaarding van het legaat.",
      file: "./data/spaan/bn0362.pdf",
      tag: "Raadsbesluit 1977"
    }
  ];

  for (let doc of pdfFiles) {
    const card = docsGrid.appendChild(document.createElement('div'));
    card.classList.add("archive-doc-card");

    const header = card.appendChild(document.createElement('div'));
    header.classList.add("archive-doc-header");

    const icon = header.appendChild(document.createElement('span'));
    icon.classList.add("archive-doc-icon");
    icon.innerText = "📄";

    const tag = header.appendChild(document.createElement('span'));
    tag.classList.add("archive-doc-tag");
    tag.innerText = doc.tag;

    const cardTitle = card.appendChild(document.createElement('div'));
    cardTitle.classList.add("archive-doc-title");
    cardTitle.innerText = doc.title;

    const cardDesc = card.appendChild(document.createElement('p'));
    cardDesc.classList.add("archive-doc-desc");
    cardDesc.innerText = doc.desc;

    const btn = card.appendChild(document.createElement('a'));
    btn.classList.add("archive-doc-btn");
    btn.href = doc.file;
    btn.target = "_blank";
    btn.rel = "noopener noreferrer";
    btn.innerHTML = "Bekijk PDF-document &#8599;";
  }

  const h3_2 = container.appendChild(document.createElement('h3'));
  h3_2.innerText = "Particulier familie-erfgoed & Professionele fotografie";

  const p4 = container.appendChild(document.createElement('p'));
  p4.innerHTML = "De op deze website gedocumenteerde 49 particuliere schilderijen en tekeningen vormden het complementaire familie-erfgoed dat onder berusting was gebleven bij zijn enige kleindochter mw. A.P. Spaan.";

  const highlight = container.appendChild(document.createElement('div'));
  highlight.classList.add("over-highlight");
  highlight.innerHTML = "<p><strong>Professionele Fotografie & Museale Initiatieven (12 februari 2022):</strong><br>" +
    "Voor de integrale visuele catalogus van de Collectie Hendrik Spaan zijn alle 49 bewaard gebleven particuliere familiestukken op zaterdag <strong>12 februari 2022</strong> professioneel en kleurecht gefotografeerd door Rijksmuseum-fotograaf <strong>Henni van Beek</strong>. " +
    "Dit initiatief en de organisatie hiervan vonden plaats door achterkleinzoon Herbrand Hofker ten behoeve van een mogelijke overzichtstentoonstelling bij Kunstmuseum Den Haag rondom Hendrik Spaan en ter bestendige wetenschappelijke ontsluiting en behoud van dit familie-erfgoed.</p>" +
    "<p style=\"margin-top: 14px; font-size: 0.95rem; color: #374151;\">📷 <em>De originele digitale foto's in hoge resolutie zijn voor museale doeleinden, kunsthistorisch onderzoek en verificatie kosteloos opvraagbaar via: <a href=\"mailto:herbrand.hofker@gmail.com\" style=\"color: var(--museum-burgundy); font-weight: bold;\">herbrand.hofker@gmail.com</a></em></p>";

  const h3_3 = container.appendChild(document.createElement('h3'));
  h3_3.innerText = "Wetenschappelijk onderzoek Richard Bionda (Oud Holland, 1989)";

  const p5 = container.appendChild(document.createElement('p'));
  p5.innerHTML = "In 1989 wijdde kunsthistoricus Richard Bionda in het toonaangevende tijdschrift <em>Oud Holland</em> (vol. 103, nr. 4) een uitgebreide wetenschappelijke studie aan Hendrik Spaan: <em>'De Haagse kunstverzamelaar Hendrik Spaan (1851-1915)'</em>. Daarin beschrijft hij Spaan als een bepalende, onterecht over het hoofd geziene verzamelaar die een directe rol speelde in het Haagse kunstklimaat van het fin de siècle. Deze publicatie is integraal te raadplegen onder het tabblad <strong>Geschiedenis (Bionda 1989)</strong>.";
}

function schildersMenu(parent) {
  const header = parent.appendChild(document.createElement('div'));
  header.classList.add("schilders-header");
  const h3 = header.appendChild(document.createElement('h3'));
  h3.innerText = "Kunstenaars in de Collectie";
  const p = header.appendChild(document.createElement('p'));
  p.innerText = "Kies een schilder om de geregistreerde schilderijen en documentatie te bekijken.";

  const menuContainer = parent.appendChild(document.createElement('div'));
  menuContainer.classList.add("schilders-grid");
  menuContainer.id = "schilders-grid";

  const schilderDiv = parent.appendChild(document.createElement('div'));
  schilderDiv.classList.add("artworks-display");

  const painterMap = new Map();

  for (let i = 0; i < json.schilders.length; i++) {
    const schilder = json.schilders[i].schilder;
    painterMap.set(schilder.id, schilder);

    const btn = menuContainer.appendChild(document.createElement('button'));
    btn.classList.add("schilder-card-btn");
    btn.dataset.painterId = schilder.id;

    if (PAINTERS_WITH_PORTRAIT.has(schilder.id)) {
      const avatar = btn.appendChild(document.createElement('img'));
      avatar.classList.add("schilder-avatar");
      avatar.src = "./images/" + schilder.id + ".jpg";
      avatar.alt = schilder.naam;
    } else {
      const placeholder = btn.appendChild(document.createElement('div'));
      placeholder.classList.add("schilder-avatar-placeholder");
      placeholder.innerText = schilder.naam.charAt(0);
    }

    const name = btn.appendChild(document.createElement('div'));
    name.classList.add("schilder-name");
    name.innerText = schilder.naam;

    const dates = btn.appendChild(document.createElement('div'));
    dates.classList.add("schilder-dates");
    dates.innerText = schilder.tijd || "";

    const badge = btn.appendChild(document.createElement('span'));
    badge.classList.add("schilder-count-badge");
    const count = schilder.schilderijen ? schilder.schilderijen.length : 0;
    badge.innerText = count + (count === 1 ? " werk" : " werken");

    btn.addEventListener("click", () => {
      window.location.hash = '#schilders/' + schilder.id;
    });
  }

  function renderPainterDetails(schilder, shouldScroll) {
    schilderDiv.innerHTML = "";

    const banner = schilderDiv.appendChild(document.createElement('div'));
    banner.classList.add("selected-painter-banner");

    const info = banner.appendChild(document.createElement('div'));

    const backBtn = info.appendChild(document.createElement('button'));
    backBtn.classList.add("back-to-painters-btn");
    backBtn.innerHTML = "&#10094; Alle kunstenaars";
    backBtn.title = "Ga terug naar het overzicht van alle schilders";
    backBtn.addEventListener("click", () => {
      window.location.hash = '#schilders';
      menuContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });

    const bTitle = info.appendChild(document.createElement('div'));
    bTitle.classList.add("selected-painter-title");
    bTitle.innerText = schilder.naam;

    const bSub = info.appendChild(document.createElement('div'));
    bSub.classList.add("selected-painter-subtitle");
    const count = schilder.schilderijen ? schilder.schilderijen.length : 0;
    bSub.innerText = (schilder.tijd ? schilder.tijd + " — " : "") + count + (count === 1 ? " geregistreerd werk" : " geregistreerde werken");

    if (schilder.url) {
      const wiki = banner.appendChild(document.createElement('a'));
      wiki.classList.add("wiki-btn");
      wiki.href = schilder.url;
      wiki.target = "_blank";
      wiki.rel = "noopener noreferrer";
      wiki.innerHTML = "🌐 Bekijk op Wikipedia &#8599;";
    }

    const list = schilderDiv.appendChild(document.createElement('div'));
    list.classList.add("artworks-list");

    for (let j = 0; j < schilder.schilderijen.length; j++) {
      const schilderij = schilder.schilderijen[j];
      const card = list.appendChild(document.createElement('div'));
      card.classList.add("artwork-card");

      // Linkerkolom: afbeelding
      const imgContainer = card.appendChild(document.createElement('div'));
      imgContainer.classList.add("artwork-image-container");

      const imgFrame = imgContainer.appendChild(document.createElement('div'));
      imgFrame.classList.add("artwork-img-frame");

      const img = imgFrame.appendChild(document.createElement('img'));
      const imgSrc = "./images/" + schilder.id + (j + 1) + ".jpg";
      img.src = imgSrc;
      img.alt = schilderij.naam;
      img.title = "Klik om de foto in ware grootte te openen in een nieuw tabblad";
      img.addEventListener("click", () => {
        window.open(imgSrc, '_blank', 'noopener,noreferrer');
      });

      // Rechterkolom: gegevens
      const details = card.appendChild(document.createElement('div'));
      details.classList.add("artwork-details");

      const topPart = details.appendChild(document.createElement('div'));
      const title = topPart.appendChild(document.createElement('h4'));
      title.classList.add("artwork-title");
      title.innerText = schilderij.naam;

      const metaList = topPart.appendChild(document.createElement('ul'));
      metaList.classList.add("artwork-meta-list");

      if (schilderij.materiaal) {
        const li = metaList.appendChild(document.createElement('li'));
        li.classList.add("artwork-meta-item");
        li.innerHTML = "<strong>Materiaal:</strong> <span>" + schilderij.materiaal + "</span>";
      }

      if (schilderij.afmeting && schilderij.afmeting.length >= 2) {
        const li = metaList.appendChild(document.createElement('li'));
        li.classList.add("artwork-meta-item");
        li.innerHTML = "<strong>Afmetingen:</strong> <span>" + schilderij.afmeting[0] + " cm (hoogte) × " + schilderij.afmeting[1] + " cm (breedte)</span>";
      }

      if (schilderij.gesigneerd) {
        const li = metaList.appendChild(document.createElement('li'));
        li.classList.add("artwork-meta-item");
        li.innerHTML = "<strong>Gesigneerd:</strong> <span>" + schilderij.gesigneerd + "</span>";
      }

      if (schilderij.jaar) {
        const li = metaList.appendChild(document.createElement('li'));
        li.classList.add("artwork-meta-item");
        li.innerHTML = "<strong>Jaartal:</strong> <span>" + schilderij.jaar + "</span>";
      }

      if (schilderij.status) {
        const li = metaList.appendChild(document.createElement('li'));
        li.classList.add("artwork-meta-item");
        li.innerHTML = "<strong>Status:</strong> <span>" + schilderij.status + "</span>";
      }

      const photoNotice = details.appendChild(document.createElement('div'));
      photoNotice.classList.add("artwork-photo-notice");
      photoNotice.innerHTML = "📷 <em>Rijksmuseum-fotografie Henni van Beek (12-02-2022) — Hoge resolutie digitaal opvraagbaar via <a href=\"mailto:herbrand.hofker@gmail.com\">herbrand.hofker@gmail.com</a></em>";
    }

    if (shouldScroll) {
      banner.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  selectPainterFn = function(painterId, shouldScroll = true) {
    const schilder = painterMap.get(painterId) || (json.schilders[0] ? json.schilders[0].schilder : null);
    if (!schilder) return;

    const allBtns = menuContainer.querySelectorAll('.schilder-card-btn');
    allBtns.forEach(b => {
      if (b.dataset.painterId === schilder.id) {
        b.classList.add('active-painter');
      } else {
        b.classList.remove('active-painter');
      }
    });

    renderPainterDetails(schilder, shouldScroll);
  };

  // Open eerste schilder als standaard weergave
  if (json.schilders.length > 0) {
    const firstPainter = json.schilders[0].schilder;
    selectPainterFn(firstPainter.id, false);
  }
}

const div = document.body.appendChild(document.createElement('div'));
site(div);

function site(div) {
  mainTitle(div);
  hoofdMenu(div);
  tabMenu(div);

  // Hash router activeren
  window.addEventListener('hashchange', handleHashChange);
  handleHashChange();
}
