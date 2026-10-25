import './index.css';
import './tabmenu.css';
import json from './data/paintings.json';
import epub from './epub.js';

const PAINTERS_WITH_PORTRAIT = new Set([
  'gabriel', 'mesdag', 'marism', 'marisw', 'mauve', 'weissenbruch',
  'morel', 'hendriks', 'arntzenius', 'dankmeijer', 'israelsi', 'israelsj',
  'zwart', 'akkeringa', 'toorop', 'bauer', 'hofker', 'rueter'
]);

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
  p.innerText = "Hendrik Spaan (1851–1915) bouwde als bakker aan de Korte Beestenmarkt in Den Haag een hechte band op met eigentijdse kunstenaars. Het leeuwendeel van zijn verzameling werd in 1977 nagelaten aan het Kunstmuseum Den Haag. De hier gedocumenteerde catalogus omvat het complementaire particuliere familie-erfgoed dat onder berusting was gebleven bij zijn enige kleindochter, wijlen mevrouw Antoinette Petronella Spaan (1925–2024).";

  const links = content.appendChild(document.createElement('div'));
  links.classList.add("hero-links");

  for (let i = 0; i < json.urls.length; i++) {
    const a = links.appendChild(document.createElement('a'));
    a.classList.add("btn-museum-link");
    a.href = json.urls[i][1];
    a.target = "_blank";
    a.innerHTML = "🏛️ " + json.urls[i][0] + " &#8599;";
  }

  const pdfA = links.appendChild(document.createElement('a'));
  pdfA.classList.add("btn-museum-link");
  pdfA.href = "./data/hendrik_spaan.pdf";
  pdfA.target = "_blank";
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
    btn.innerText = title;
    btn.addEventListener("click", () => openPage(id, btn));

    const content = tabpageContainer.appendChild(document.createElement('div'));
    content.id = id;
    content.classList.add("tabcontent");
    content.style.display = "none";
    addContent(content);

    function openPage(pageName, elmnt) {
      const tabcontent = document.getElementsByClassName("tabcontent");
      for (let i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
      }

      const tablinks = document.getElementsByClassName("tablink");
      for (let i = 0; i < tablinks.length; i++) {
        tablinks[i].classList.remove("active-tab");
      }

      document.getElementById(pageName).style.display = "block";
      elmnt.classList.add("active-tab");
    }
  }

  createMenuItem(menuContainer, pageContainer, "over", "🏛️ Over de Collectie", (parent) => overCollectie(parent));
  createMenuItem(menuContainer, pageContainer, "schilders", "🎨 Kunstenaars & Werken", (parent) => schildersMenu(parent));
  createMenuItem(menuContainer, pageContainer, "geschiedenis", "📖 Geschiedenis (Bionda 1989)", (parent) => epub(parent, 'bionda', 18));

  const firstTab = menuContainer.querySelector('.tablink');
  if (firstTab) {
    firstTab.click();
  }
}

function overCollectie(parent) {
  const container = parent.appendChild(document.createElement('div'));
  container.classList.add("over-collectie");

  const title = container.appendChild(document.createElement('h2'));
  title.innerText = "De Collectie Hendrik Spaan (1851–1915)";

  const p1 = container.appendChild(document.createElement('p'));
  p1.innerHTML = "Deze website documenteert de kunstwerken die in bezit waren van <strong>wijlen mevrouw Antoinette Petronella Spaan (1925–2024)</strong>, de enige kleindochter van de Haagse kunstverzamelaar en mecenas <strong>Hendrik Spaan (1851–1915)</strong>.";

  const p2 = container.appendChild(document.createElement('p'));
  p2.innerHTML = "Hendrik Spaan, van beroep bakker en woonachtig aan de Korte Beestenmarkt 2 te Den Haag, bouwde vanuit zijn persoonlijke contacten met eigentijdse kunstenaars een unieke en hoogwaardige verzameling op. Deze omvatte niet uitsluitend meesters van de Haagse School (zoals Willem Maris, Paul Gabriël, H.W. Mesdag en Anton Mauve), maar evenzeer toonaangevende Amsterdamse impressionisten, symbolisten en tijdgenoten — waaronder Floris Arntzenius, Willem de Zwart, Isaac Israëls, Jan Toorop, Marius Bauer en Odilon Redon, alsmede latere werken van Willem Gerard Hofker en Maria Hofker-Rueter.";

  const h3_1 = container.appendChild(document.createElement('h3'));
  h3_1.innerText = "Museale schenking aan het Kunstmuseum Den Haag (1977)";

  const p3 = container.appendChild(document.createElement('p'));
  p3.innerHTML = "Het overgrote deel van zijn oorspronkelijke verzameling werd in 1977 nagelaten aan het toenmalige Haags Gemeentemuseum (thans <strong>Kunstmuseum Den Haag</strong>). Hiertoe behoort onder meer het bekende topstuk <em>Morgenstond</em> van Willem Maris, evenals de door meesterschilder Willem de Zwart vervaardigde portretten van Hendrik Spaan en diens echtgenote in de vaste museumcollectie.";

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

  const schilderDiv = parent.appendChild(document.createElement('div'));
  schilderDiv.classList.add("artworks-display");

  for (let i = 0; i < json.schilders.length; i++) {
    const schilder = json.schilders[i].schilder;
    const btn = menuContainer.appendChild(document.createElement('button'));
    btn.classList.add("schilder-card-btn");

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

    btn.addEventListener("click", () => openPainter(schilder, btn));
  }

  function openPainter(schilder, activeBtn) {
    const allBtns = menuContainer.querySelectorAll('.schilder-card-btn');
    allBtns.forEach(b => b.classList.remove('active-painter'));
    if (activeBtn) {
      activeBtn.classList.add('active-painter');
    }

    schilderDiv.innerHTML = "";

    const banner = schilderDiv.appendChild(document.createElement('div'));
    banner.classList.add("selected-painter-banner");

    const info = banner.appendChild(document.createElement('div'));
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
      img.title = "Klik om de foto in ware grootte te openen";
      img.addEventListener("click", () => {
        window.open(imgSrc, '_blank');
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
      photoNotice.innerHTML = "📷 <em>Rijksmuseum-fotografie Henni van Beek (12-02-2022) — Hoge resolutie opvraagbaar via <a href=\"mailto:herbrand.hofker@gmail.com\">herbrand.hofker@gmail.com</a></em>";
    }

    // Scroll zachtjes naar de schilderijen
    banner.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  // Open eerste schilder standaard
  const firstBtn = menuContainer.querySelector('.schilder-card-btn');
  if (firstBtn && json.schilders.length > 0) {
    openPainter(json.schilders[0].schilder, firstBtn);
  }
}

const div = document.body.appendChild(document.createElement('div'));
site(div);

function site(div) {
  mainTitle(div);
  hoofdMenu(div);
  tabMenu(div);
}
