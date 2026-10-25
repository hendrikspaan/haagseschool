//import _, { divide } from 'lodash';
import './index.css';
import './tabmenu.css';
import json from './data/paintings.json';
import epub from './epub.js'

function mainTitle(parent) {
  const title = parent.appendChild(document.createElement('h1'));
  title.classList.add("main-title")
  title.innerText = "Collectie van " + json.naam + " (" + json.tijd + ")"
}

function hoofdMenu(parent) {
  const header = parent.appendChild(document.createElement('div'));
  header.classList.add("header")

  figure(header)
  const menu = header.appendChild(document.createElement('div'));
  menu.classList.add("menu")

  for (var i = 0; i < json.urls.length; i++) {
    const a = menu.appendChild(document.createElement('a'));
    a.classList.add("menu-item")
    a.href = json.urls[i][1]
    a.innerText = json.urls[i][0]
    a.target = "_blank"
  }

  function figure(parent) {
    const div = parent.appendChild(document.createElement('div'));

    const figure = div.appendChild(document.createElement('figure'));
    figure.style = "width:100px";
    const img = figure.appendChild(document.createElement('img'));
    img.src = './images/hendrik_spaan.jpg'
    const capt = figure.appendChild(document.createElement('figcaption'));
    capt.innerText = json.naam + " (" + json.tijd + ")"
  }
}

function tabMenu(parent) {
  const menuContainer = parent.appendChild(document.createElement('div'));
  menuContainer.classList.add("tabmenu-container")
  const pageContainer = parent.appendChild(document.createElement('div'));
  pageContainer.classList.add("tabpage-container")

  function createMenuItem(tabmenuContainer, tabpageContainer, id, title, addContent) {
    const btn = tabmenuContainer.appendChild(document.createElement('button'));
    btn.classList.add("tablink")
    btn.innerText = title;
    btn.addEventListener("click", () => openPage(id, btn))

    const content = tabpageContainer.appendChild(document.createElement('div'));
    content.id = id
    content.classList.add("tabcontent")
    content.style = "display:none"
    addContent(content)

    function openPage(pageName, elmnt) {
      var i, tabcontent, tablinks;
      tabcontent = document.getElementsByClassName("tabcontent");
      for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
      }

      tablinks = document.getElementsByClassName("tablink");
      for (i = 0; i < tablinks.length; i++) {
        tablinks[i].style.backgroundColor = "";
      }

      document.getElementById(pageName).style.display = "block";
      elmnt.style.backgroundColor = "var(--contrast-bg-color, #870d4d)";
    }
  }

  createMenuItem(menuContainer, pageContainer, "over", "Over de Collectie", (parent) => overCollectie(parent))

  createMenuItem(menuContainer, pageContainer, "geschiedenis", "Geschiedenis van Hendrik Spaan (Bionda 1989)",
    (parent) => epub(parent, 'bionda', 18))

  createMenuItem(menuContainer, pageContainer, "schilders", "Collectie & Kunstwerken", (parent) => schildersMenu(parent))

  const firstTab = menuContainer.querySelector('.tablink');
  if (firstTab) {
    firstTab.click();
  }
}

function overCollectie(parent) {
  const container = parent.appendChild(document.createElement('div'));
  container.classList.add("over-collectie");

  const title = container.appendChild(document.createElement('h2'));
  title.innerText = "Over de Collectie Hendrik Spaan (1851–1915)";

  const p1 = container.appendChild(document.createElement('p'));
  p1.innerHTML = "Deze website documenteert de kunstwerken die in het bezit waren van <strong>wijlen mevrouw Antoinette Petronella Spaan (1925–2024)</strong>, de enige kleindochter van de Haagse kunstverzamelaar en mecenas <strong>Hendrik Spaan (1851–1915)</strong>.";

  const p2 = container.appendChild(document.createElement('p'));
  p2.innerHTML = "Hendrik Spaan, van beroep bakker en woonachtig aan de Korte Beestenmarkt 2 te Den Haag, bouwde vanuit zijn persoonlijke contacten met eigentijdse kunstenaars een unieke en hoogwaardige verzameling op. Deze omvatte niet uitsluitend de meesters van de Haagse School (zoals Willem Maris, Paul Gabriël, H.W. Mesdag en Anton Mauve), maar evenzeer toonaangevende Amsterdamse impressionisten, symbolisten en tijdgenoten — waaronder Floris Arntzenius, Willem de Zwart, Isaac Israëls, Jan Toorop, Marius Bauer en Odilon Redon, alsmede latere werken van Willem Gerard Hofker en Maria Hofker-Rueter.";

  const h3_1 = container.appendChild(document.createElement('h3'));
  h3_1.innerText = "Museale schenking aan het Kunstmuseum Den Haag (1977)";

  const p3 = container.appendChild(document.createElement('p'));
  p3.innerHTML = "Het overgrote deel van zijn oorspronkelijke verzameling werd in 1977 nagelaten aan het toenmalige Haags Gemeentemuseum (thans <strong>Kunstmuseum Den Haag</strong>). Hiertoe behoort onder meer het bekende topstuk <em>Morgenstond</em> van Willem Maris, evenals de door meesterschilder Willem de Zwart vervaardigde portretten van Hendrik Spaan en diens echtgenote in de vaste museumcollectie.";

  const h3_2 = container.appendChild(document.createElement('h3'));
  h3_2.innerText = "Particulier familie-erfgoed & Professionele fotografie";

  const p4 = container.appendChild(document.createElement('p'));
  p4.innerHTML = "De op deze website gedocumenteerde 49 schilderijen en tekeningen vormden het complementaire particuliere familie-erfgoed dat onder berusting was gebleven bij zijn enige kleindochter mw. A.P. Spaan.";

  const highlight = container.appendChild(document.createElement('div'));
  highlight.classList.add("over-highlight");
  highlight.innerHTML = "<p><strong>Professionele Fotografie & Museale Initiatieven (12 februari 2022):</strong><br>" +
    "Voor de integrale visuele catalogus van de Collectie Hendrik Spaan zijn alle 49 bewaard gebleven particuliere familiestukken op zaterdag <strong>12 februari 2022</strong> professioneel en kleurecht gefotografeerd door Rijksmuseum-fotograaf <strong>Henni van Beek</strong>. " +
    "Dit initiatief en de organisatie hiervan vonden plaats door achterkleinzoon Herbrand Hofker ten behoeve van een mogelijke overzichtstentoonstelling bij Kunstmuseum Den Haag rondom Hendrik Spaan en ter bestendige wetenschappelijke ontsluiting en behoud van dit familie-erfgoed.</p>" +
    "<p style=\"margin-top: 12px; font-size: 0.95em; color: #444;\">📷 <em>De originele digitale foto's in hoge resolutie zijn voor museale doeleinden, kunsthistorisch onderzoek en verificatie kosteloos opvraagbaar via: <a href=\"mailto:herbrand.hofker@gmail.com\" style=\"color: var(--contrast-bg-color, #870d4d); font-weight: bold;\">herbrand.hofker@gmail.com</a></em></p>";

  const h3_3 = container.appendChild(document.createElement('h3'));
  h3_3.innerText = "Wetenschappelijk onderzoek Richard Bionda (Oud Holland, 1989)";

  const p5 = container.appendChild(document.createElement('p'));
  p5.innerHTML = "In 1989 wijdde kunsthistoricus Richard Bionda in het toonaangevende tijdschrift <em>Oud Holland</em> (vol. 103, nr. 4) een uitgebreide wetenschappelijke studie aan Hendrik Spaan: <em>'De Haagse kunstverzamelaar Hendrik Spaan (1851-1915)'</em>. Daarin beschrijft hij Spaan als een bepalende, onterecht over het hoofd geziene verzamelaar die een directe rol speelde in het Haagse kunstklimaat van het fin de siècle. Deze publicatie is integraal te raadplegen onder het tabblad <strong>Geschiedenis van Hendrik Spaan</strong>.";
}

function schildersMenu(parent) {
  const menuContainer = parent.appendChild(document.createElement('div'));
  menuContainer.classList.add("schilders-container")
  const schilderDiv = parent.appendChild(document.createElement('div'));
  schilderDiv.classList.add("schilder")

  for (var i = 0; i < json.schilders.length; i++) {
    const schilder = json.schilders[i].schilder;
    const btn = menuContainer.appendChild(document.createElement('button'))
    btn.classList.add("schilders-button")
    btn.addEventListener("click", () => openPage(schilder))
    btn.innerHTML = schilder.naam + "<br> (" + schilder.tijd + ")"
  }

  function openPage(schilder) {
    schilderDiv.innerHTML = null;
    const title = schilderDiv.appendChild(document.createElement('h1'))
    title.classList.add("title")
    title.innerText = schilder.naam;
    title.innerHTML = schilder.naam + "<br> (" + schilder.tijd + ")"

    const tbl = schilderDiv.appendChild(document.createElement('table'))
    const thead = tbl.appendChild(document.createElement('thead'));
    const tbody = tbl.appendChild(document.createElement('tbody'));

    //  schilderDiv.innerText+=schilderij.naam;

    const tr = thead.appendChild(document.createElement('tr'));
    let th = tr.appendChild(document.createElement('th'));
    th.innerText = "Schilderij";
    th = tr.appendChild(document.createElement('th'));
    th.innerText = "Foto";

    for (var j = 0; j < schilder.schilderijen.length; j++) {
      const schilderij = schilder.schilderijen[j]
      let tr = tbody.appendChild(document.createElement("tr"))
      let td = tr.appendChild(document.createElement("td"))
      let h3 = td.appendChild(document.createElement("h3"))
      h3.innerText = schilderij.naam;
      let ul = td.appendChild(document.createElement("ul"))
      let li = ul.appendChild(document.createElement("li"))
      li.innerHTML = "<b>Materiaal:</b> " + schilderij.materiaal
      if (schilderij.afmeting) {
        let li = ul.appendChild(document.createElement("li"))
        li.innerHTML += "<b>Afmetingen:</b><br>&nbsp;&nbsp;hoogte=" + schilderij.afmeting[0] + "<br>&nbsp;&nbsp;breedte=" + schilderij.afmeting[1]
      }
      li = ul.appendChild(document.createElement("li"))
      li.innerHTML += "<b>Gesigneerd:</b> " + schilderij.gesigneerd
      if (schilderij.jaar) {
        let li = ul.appendChild(document.createElement("li"))
        li.innerHTML += "<b>Jaar:</b> " + schilderij.jaar
      }
       if (schilderij.taxaties) {
        li = ul.appendChild(document.createElement("li"))
        if (schilderij.taxaties[0]) {

          li.innerHTML = "<b>taxatie 2004:</b>" + schilderij.taxaties[0]["1"][0] + "-" + schilderij.taxaties[0]["1"][1]
        } if (schilderij.taxaties[1]) {
          li = ul.appendChild(document.createElement("li"))
          li.innerHTML = "<b>taxatie 1978:</b>" + schilderij.taxaties[1]["2"]
        }
      }
      if (schilderij.status) {
        li = ul.appendChild(document.createElement("li"))
        li.innerHTML="<b>Status</b>:"+schilderij.status
      }
    
      td = tr.appendChild(document.createElement("td"))
      let img = td.appendChild(document.createElement("img"))
      img.src = "./images/" + schilder.id + (j + 1) + ".jpg"//fotos.get(schilder.id + (j + 1))
      img.width = 200;
      img.height = 200;
      if (schilderij.afmeting) {
        img.height = schilderij.afmeting[0] * 30;
        img.width = schilderij.afmeting[1] * 30;
      }


    }
  }
}


const div = document.body.appendChild(document.createElement('div'));
site(div);


function site(div) {
  mainTitle(div)
  hoofdMenu(div)
  tabMenu(div)
}