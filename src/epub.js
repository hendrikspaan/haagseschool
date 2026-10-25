import './epub.css';

export default function epub(parent, name, aantal) {
  // Toolbar bovenaan
  const toolbar = parent.appendChild(document.createElement('div'));
  toolbar.classList.add("bionda-toolbar");

  const navControls = toolbar.appendChild(document.createElement('div'));
  navControls.classList.add("bionda-nav-controls");

  const prevBtn = navControls.appendChild(document.createElement('button'));
  prevBtn.classList.add("bionda-nav-btn");
  prevBtn.innerHTML = "&#10094; Vorige";
  prevBtn.addEventListener("click", () => plusSlides(-1));

  const counter = navControls.appendChild(document.createElement('span'));
  counter.classList.add("bionda-counter");

  const nextBtn = navControls.appendChild(document.createElement('button'));
  nextBtn.classList.add("bionda-nav-btn");
  nextBtn.innerHTML = "Volgende &#10095;";
  nextBtn.addEventListener("click", () => plusSlides(1));

  const pdfLink = toolbar.appendChild(document.createElement('a'));
  pdfLink.classList.add("bionda-pdf-btn");
  pdfLink.href = "./data/hendrik_spaan.pdf";
  pdfLink.target = "_blank";
  pdfLink.innerHTML = "📄 Volledige publicatie (PDF) &#8599;";

  // Slideshow container
  const container = parent.appendChild(document.createElement('div'));
  container.classList.add("slideshow-container");

  const dotMenu = parent.appendChild(document.createElement('div'));
  dotMenu.classList.add("dot-menu");

  for (let i = 1; i <= aantal; i++) {
    const slides = container.appendChild(document.createElement('div'));
    slides.classList.add("mySlides");
    slides.classList.add("fade");

    const img = slides.appendChild(document.createElement('img'));
    img.classList.add("carousel-image");
    const src = "./data/" + name + "/" + getImageId(i) + ".png";
    img.src = src;
    img.style.width = "100%";
    img.alt = "Pagina " + i + " - Richard Bionda (1989)";

    const span = dotMenu.appendChild(document.createElement('span'));
    span.classList.add("dot");
    span.title = "Pagina " + i;
    span.addEventListener("click", () => currentSlide(i));
  }

  var slideIndex = 1;
  showSlides(slideIndex);

  function getImageId(i) {
    let number = i;
    if (number < 10)
      return '0' + number;
    return number;
  }

  function plusSlides(n) {
    showSlides(slideIndex += n);
  }

  function currentSlide(n) {
    showSlides(slideIndex = n);
  }

  function showSlides(n) {
    const slides = container.getElementsByClassName("mySlides");
    const dots = dotMenu.getElementsByClassName("dot");

    if (n > slides.length) { slideIndex = 1; }
    if (n < 1) { slideIndex = slides.length; }

    for (let i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
    }
    for (let i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
    }

    if (slides[slideIndex - 1]) {
      slides[slideIndex - 1].style.display = "block";
    }
    if (dots[slideIndex - 1]) {
      dots[slideIndex - 1].className += " active";
    }

    counter.innerText = "Pagina " + slideIndex + " van " + aantal;
  }
}
