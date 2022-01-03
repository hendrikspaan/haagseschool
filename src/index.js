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
}

function tabMenu(parent) {  
  const tabmenuContainer = parent.appendChild(document.createElement('div'));
  tabmenuContainer.classList.add("tabmenu-container")
  const tabpageContainer = parent.appendChild(document.createElement('div'));
  tabpageContainer.classList.add("tabpage-container")
 
  const btn1 = tabmenuContainer.appendChild(document.createElement('button'));  
  btn1.classList.add("tablink")
  btn1.innerText = "Geschiedenis van Hendik Spaan als kunstverzamelaar"
  btn1.addEventListener("click", () => openPage("geschiedenis", btn1))


  const tabContent1 = tabpageContainer.appendChild(document.createElement('div'));
  tabContent1.id = "geschiedenis"
  tabContent1.classList.add("tabcontent")  
  tabContent1.style="display:none"
  epub(tabContent1,'bionda',18)

  const btn2 = tabmenuContainer.appendChild(document.createElement('button'));
  btn2.classList.add("tablink")
  btn2.innerText = "Schilders van de Haagse School"
  btn2.addEventListener("click", () => openPage("schilders", btn2))
   
  const tabContent2 = tabpageContainer.appendChild(document.createElement('div'));
  tabContent2.id = "schilders"
  tabContent2.classList.add("tabcontent")  
  
  tabContent2.style="display:none"
  schildersMenu(tabContent2)


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
    elmnt.style.backgroundColor = "blue";
  }
}

function schildersMenu(parent) {
  const schildersContainer = parent.appendChild(document.createElement('div'));
  schildersContainer.classList.add("schilders-container")

  for (var i = 0; i < json.schilders.length; i++) {
    const schilder = json.schilders[i].schilder;
    const schildersItem = schildersContainer.appendChild(document.createElement('a'))
    schildersItem.classList.add("schilders-item")
    schildersItem.href = "http://www.nu.nl"
    /*
        const figure = schildersItem.appendChild(document.createElement('figure'));
        //  figure.style = "width:150px";
        const img = figure.appendChild(document.createElement('img'));
        img.src =  "./images/" + schilder.id + ".jpg";
        const capt = figure.appendChild(document.createElement('figcaption'));
        */
    schildersItem.innerHTML = schilder.naam + "<br> (" + schilder.tijd + ")"
  }
}

function schildersMenuxx(div) {
  const ul = div.appendChild(document.createElement('ul'));
  ul.classList.add("menu_schilders")
  for (var i = 0; i < json.schilders.length; i++) {
    const schilder = json.schilders[i].schilder;
    const li = ul.appendChild(document.createElement('li'));
    li.classList.add("menu-item")
    li.innerHTML = schilder.naam + " <a href='" + schilder.url + "' target='_blank'>aa</a>";

    const ul2 = li.appendChild(document.createElement('ul'));
    /*
        ul2.classList.add("menu")
   
       for (var j = 0; j < schilder.schilderijen.length; j++) {
         const schilderij = schilder.schilderijen[j]
         const li = ul2.appendChild(document.createElement('li'));
         li.classList.add("menu-item")
         li.innerText=schilderij.naam;
       }*/

  }
}

function schildersMenuyy(div) {

  const tbl = div.appendChild(document.createElement('table'));
  tbl.classList.add('schilders')
  const hdr = tbl.appendChild(document.createElement('thead'));

  const body = tbl.appendChild(document.createElement('tbody'));

  const tr = hdr.appendChild(document.createElement('tr'));
  let th = tr.appendChild(document.createElement('th'));
  th.innerText = "Schilder";
  th = tr.appendChild(document.createElement('th'));
  th.innerText = "Schilderijen";

  for (var i = 0; i < json.schilders.length; i++) {

    const schilder = json.schilders[i].schilder;
    const tr = body.appendChild(document.createElement('tr'));


    let td = tr.appendChild(document.createElement('td'));
    let a = td.appendChild(document.createElement('a'));
    a.innerText = schilder.naam + " (" + schilder.tijd + ")"
    a.target = "_blank"

    if (Array.isArray(schilder.url)) {
      a.href = schilder.url[0]
      td.appendChild(document.createElement('br'));
      td.appendChild(document.createElement('br'));
      a = td.appendChild(document.createElement('a'));
      a.href = schilder.url[1]
      a.innerText = "MEER"
      a.target = "_blank"

    } else
      a.href = schilder.url


    td = tr.appendChild(document.createElement('td'));

    const tbl2 = td.appendChild(document.createElement('table'));
    tbl2.classList.add('schilder')

    const head2 = tbl2.appendChild(document.createElement('thead'));
    const tr2 = head2.appendChild(document.createElement('tr'));
    let th2 = tr2.appendChild(document.createElement('th'));
    th2.innerText = "Schilderij";
    th2 = tr2.appendChild(document.createElement('th'));
    th2.innerText = "Materiaal";
    th2 = tr2.appendChild(document.createElement('th'));
    th2.innerText = "Afmeting";
    th2 = tr2.appendChild(document.createElement('th'));
    th2.innerText = "Gesigneerd";
    th2 = tr2.appendChild(document.createElement('th'));
    th2.innerText = "Jaar";
    th2 = tr2.appendChild(document.createElement('th'));
    th2.innerText = "Taxatie";
    th2 = tr2.appendChild(document.createElement('th'));
    th2.innerText = "Taxatie";
    const body2 = tbl2.appendChild(document.createElement('tbody'));

    for (var j = 0; j < schilder.schilderijen.length; j++) {
      const schilderij = schilder.schilderijen[j]
      let tr = body2.appendChild(document.createElement("tr"))
      let td = tr.appendChild(document.createElement("td"))
      td.innerText = schilderij.naam
      td = tr.appendChild(document.createElement("td"))
      td.innerText = schilderij.materiaal
      td = tr.appendChild(document.createElement("td"))
      if (schilderij.afmeting) td.innerHTML = "breedte=" + schilderij.afmeting[0] + "<br>hoogte=" + schilderij.afmeting[1]
      td = tr.appendChild(document.createElement("td"))
      td.innerText = schilderij.gesigneerd
      td = tr.appendChild(document.createElement("td"))
      if (schilderij.jaar) td.innerText = schilderij.jaar
      td = tr.appendChild(document.createElement("td"))
      td.innerText = schilderij.taxaties[0]["1"][0] + "-" + schilderij.taxaties[0]["1"][1]
      td = tr.appendChild(document.createElement("td"))
      if (schilderij.taxaties[1]) {
        td.innerText = schilderij.taxaties[1]["2"]
      }
      td = tr.appendChild(document.createElement("td"))
      let img = td.appendChild(document.createElement("img"))
      img.src = "./images/" + schilder.id + (j + 1) + ".jpg"//fotos.get(schilder.id + (j + 1))
      // img.width = 200;
      // img.height = 200;
    }
  }
}

function site(div) {
  mainTitle(div)
  hoofdMenu(div)
  tabMenu(div)
}

const div = document.body.appendChild(document.createElement('div'));
site(div);

function figure(parent) {
  const div = parent.appendChild(document.createElement('div'));

  const figure = div.appendChild(document.createElement('figure'));
  figure.style = "width:100px";
  const img = figure.appendChild(document.createElement('img'));
  img.src = './images/hendrik_spaan.jpg'
  const capt = figure.appendChild(document.createElement('figcaption'));
  capt.innerText = json.naam + " (" + json.tijd + ")"
}