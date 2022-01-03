
import './epub.css';
export default function epub(parent, name,aantal) {
    const container = parent.appendChild(document.createElement('div'));
   container.classList.add("slideshow-container")
   const menu = parent.appendChild(document.createElement('div'));
   menu.style = "text-align:center";
 
   for (let i = 1; i <= aantal; i++) {
     const slides = container.appendChild(document.createElement('div'));
     slides.classList.add("mySlides")
     slides.classList.add("fade")
   //  const numberText = slides.appendChild(document.createElement('div'));
   //  numberText.innerText =i+ " / "+aantal;
   //  numberText.classList.add("numbertext")
     const img = slides.appendChild(document.createElement('img'));
     img.classList.add("carousel-image")
     const src = "./data/"+name+"/" + getImageId(i) + ".png";
     img.src = src;
     img.style = "width:100%"
   //  const captionText = slides.appendChild(document.createElement('div'));
   //  captionText.classList.add("text")
   //  captionText.innerText = "Caption Text"
 
     const span = menu.appendChild(document.createElement('span'));
     span.classList.add("dot");
     span.addEventListener("click", () => currentSlide(i))
   }
 
   const prev = container.appendChild(document.createElement('a'));
   prev.classList.add("prev")
   prev.addEventListener("click", () => plusSlides(-1))
   prev.innerHTML = "&#10094;"
 
   const next = container.appendChild(document.createElement('a'));
   next.classList.add("next")
   next.innerHTML = "&#10095;"
   next.addEventListener("click", () => plusSlides(+1))
 
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
     const slides = document.getElementsByClassName("mySlides");
 
     var dots = document.getElementsByClassName("dot");
     if (n > slides.length) { slideIndex = 1 }
     if (n < 1) { slideIndex = slides.length }
     for (let i = 0; i < slides.length; i++) {
       slides[i].style.display = "none";
     }
     for (let i = 0; i < dots.length; i++) {
       dots[i].className = dots[i].className.replace(" active", "");
     }
     slides[slideIndex - 1].style.display = "block";
     dots[slideIndex - 1].className += " active";
   }
 }
 