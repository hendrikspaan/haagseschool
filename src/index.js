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
      elmnt.style.backgroundColor = "green";
    }
  }

  createMenuItem(menuContainer, pageContainer, "geschiedenis", "Geschiedenis van Hendik Spaan als kunstverzamelaar",
    (parent) => epub(parent, 'bionda', 18))

  createMenuItem(menuContainer, pageContainer, "schilders", "Schilders van de Haagse School", (parent) => schildersMenu(parent))
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
        li.innerHTML += "<b>Afmetingen:</b><br>&nbsp;&nbsp;hoogte=" + schilderij.afmeting[1] + "<br>&nbsp;&nbsp;breedte=" + schilderij.afmeting[0]
      }
      li = ul.appendChild(document.createElement("li"))
      li.innerHTML += "<b>Gesigneerd:</b> " + schilderij.gesigneerd
      if (schilderij.jaar) {
        let li = ul.appendChild(document.createElement("li"))
        li.innerHTML += "<b>Jaar:</b> " + schilderij.jaar
      }
      li = ul.appendChild(document.createElement("li"))

      li.innerHTML = "<b>taxatie 1978:</b>" + schilderij.taxaties[0]["1"][0] + "-" + schilderij.taxaties[0]["1"][1]
      if (schilderij.taxaties[1]) {
        li = ul.appendChild(document.createElement("li"))
        li.innerHTML = "<b>taxatie 2004:</b>" + schilderij.taxaties[1]["2"]
      }
      td = tr.appendChild(document.createElement("td"))
      let img = td.appendChild(document.createElement("img"))
      img.src = "./images/" + schilder.id + (j + 1) + ".jpg"//fotos.get(schilder.id + (j + 1))
      img.width=200;
      img.height=200;
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