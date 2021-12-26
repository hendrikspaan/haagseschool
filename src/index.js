import _ from 'lodash';
import './style.css';
import json from './data/paintings.json';


const schilders = new Map();
const fotos = new Map();

import akkeringa from './images/akkeringa.jpg';
schilders.set("akkeringa", akkeringa);

import akkeringa1 from './images/akkeringa1.jpg';
fotos.set("akkeringa1", akkeringa1);
import akkeringa2 from './images/akkeringa2.jpg';
fotos.set("akkeringa2", akkeringa2);
import akkeringa3 from './images/akkeringa3.jpg';
fotos.set("akkeringa3", akkeringa3);

import arntzenius from './images/arntzenius.jpg';
schilders.set("arntzenius", arntzenius);
import arntzenius1 from './images/arntzenius1.jpg';
fotos.set("arntzenius1", arntzenius1);
import arntzenius2 from './images/arntzenius2.jpg';
fotos.set("arntzenius2", arntzenius2);
import arntzenius3 from './images/arntzenius3.jpg';
fotos.set("arntzenius3", arntzenius3);
import arntzenius4 from './images/arntzenius4.jpg';
fotos.set("arntzenius4", arntzenius4);
import arntzenius5 from './images/arntzenius5.jpg';
fotos.set("arntzenius5", arntzenius5);
import arntzenius6 from './images/arntzenius6.jpg';
fotos.set("arntzenius6", arntzenius6);

//import  daalhoff from './images/daalhoff.jpg';
//schilders.set(" daalhoff",  daalhoff);
import daalhoff1 from './images/daalhoff1.jpg';
fotos.set("daalhoff1", daalhoff1);
import daalhoff2 from './images/daalhoff2.jpg';
fotos.set("daalhoff2", daalhoff2);
import daalhoff3 from './images/daalhoff3.jpg';
fotos.set("daalhoff3", daalhoff3);
import daalhoff4 from './images/daalhoff4.jpg';
fotos.set("daalhoff4", daalhoff4);
import daalhoff5 from './images/daalhoff5.jpg';
fotos.set("daalhoff5", daalhoff5);
import daalhoff6 from './images/daalhoff6.jpg';
fotos.set("daalhoff6", daalhoff6);

import dankmeijer from './images/dankmeijer.jpg';
schilders.set("dankmeijer", dankmeijer);
import dankmeijer1 from './images/dankmeijer1.jpg';
fotos.set("dankmeijer1", dankmeijer1);
import dankmeijer2 from './images/dankmeijer2.jpg';
fotos.set("dankmeijer2", dankmeijer2);
import dankmeijer3 from './images/dankmeijer3.jpg';
fotos.set("dankmeijer3", dankmeijer3);
import dankmeijer4 from './images/dankmeijer4.jpg';
fotos.set("dankmeijer4", dankmeijer4);
import dankmeijer5 from './images/dankmeijer5.jpg';
fotos.set("dankmeijer5", dankmeijer5);

import gabriel from './images/gabriel.jpg';
schilders.set("gabriel", gabriel);
import gabriel1 from './images/gabriel1.jpg';
fotos.set("gabriel1", gabriel1);

//import hofker from './images/hofker.jpg';
//schilders.set("hofker", hofker);
import hofker1 from './images/hofker1.jpg';
fotos.set("hofker1", hofker1);
import hofker2 from './images/hofker2.jpg';
fotos.set("hofker2", hofker2);
import hofker3 from './images/hofker3.jpg';
fotos.set("hofker3", hofker3);

//import rueter from './images/rueter.jpg';
//schilders.set("rueter", rueter);
import rueter1 from './images/rueter1.jpg';
fotos.set("rueter1", rueter1);

import israels from './images/israels.jpg';
schilders.set("israels", israels);
import israels1 from './images/israels1.jpg';
fotos.set("israels1", israels1);

import mauve from './images/mauve.jpg';
schilders.set("mauve", mauve);
import mauve1 from './images/mauve1.jpg';
fotos.set("mauve1", mauve1);

import marism from './images/marism.jpg';
schilders.set("marism", marism);
import marism1 from './images/marism1.jpg';
fotos.set("marism1", marism1);

import marisw from './images/marisw.jpg';
schilders.set("marisw", marisw);
import marisw1 from './images/marisw1.jpg';
fotos.set("marisw1", marisw1);

import mesdag from './images/mesdag.jpg';
schilders.set("mesdag", mesdag);
import mesdag1 from './images/mesdag1.jpg';
fotos.set("mesdag1", mesdag1);

import toorop from './images/toorop.jpg';
schilders.set("toorop", toorop);
import toorop1 from './images/toorop1.jpg';
fotos.set("toorop1", toorop1);

//import  morel from './images/morel.jpg';
//schilders.set(" morel",  morel);
import morel1 from './images/morel1.jpg';
fotos.set("morel1", morel1);

import weissenbruch from './images/weissenbruch.jpg';
schilders.set("weissenbruch", weissenbruch);
import weissenbruch1 from './images/weissenbruch1.jpg';
fotos.set("weissenbruch1", weissenbruch1);

import zwart from './images/zwart.jpg';
schilders.set("zwart", zwart);
import zwart1 from './images/zwart1.jpg';
fotos.set("zwart1", zwart1);
import zwart2 from './images/zwart2.jpg';
fotos.set("zwart2", zwart2);
import zwart3 from './images/zwart3.jpg';
fotos.set("zwart3", zwart3);
import zwart4 from './images/zwart4.jpg';
fotos.set("zwart4", zwart4);

function mainTitle(div) {
  const title = div.appendChild(document.createElement('h1'));
  title.classList.add("main-title")
  title.innerText = "Collectie van " + json.naam + " (" + json.tijd + ")"
}

function hoofdMenu(div) {
  const header = div.appendChild(document.createElement('div'));
  header.classList.add("header")

  figure(header)
  menu(header)



  function menu(header) {
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
}


function schildersMenu3(parent) {

  const h1 = parent.appendChild(document.createElement('h1'));
  h1.innerText="Schilders van de Haagse school"
  const container = parent.appendChild(document.createElement('div'));
  container.classList.add("schilders-container")

  for (var i = 0; i < json.schilders.length; i++) {

    const schilder = json.schilders[i].schilder;
    const div3 = container.appendChild(document.createElement('div'));

    div3.classList.add("schilders-item")
    figure(div3, schilder)

    function figure(parent, schilder) {
      const div = parent.appendChild(document.createElement('div'));
      const foto = schilders.get(schilder.id)
      const caption = schilder.naam + " (" + schilder.tijd + ")"

      if (foto == null) {
        div.innerHTML = caption;
      } else {
        const figure = div.appendChild(document.createElement('figure'));
        //  figure.style = "width:150px";
        const img = figure.appendChild(document.createElement('img'));
        img.src = foto;
        const capt = figure.appendChild(document.createElement('figcaption'));
        capt.innerText = caption;
      }
    }

  }
}

function schildersMenu2(div) {
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

function schildersMenu(div) {

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
      img.src = fotos.get(schilder.id + (j + 1))
      img.width = 200;
      img.height = 200;
    }
  }
}

function site(div) {
  mainTitle(div)
  hoofdMenu(div)
  schildersMenu3(div)
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