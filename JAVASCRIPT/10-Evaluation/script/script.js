let slideTimeoutId = "";
let slideIndex = 1;
// where all html is loaded
document.addEventListener("DOMContentLoaded", function() {
  // start the slide show
  showSlides(slideIndex);
  // submit event
  document.querySelector("form").addEventListener("submit", e => {
    submitForm(e);
  });
  // for the change of the field it removes the invalid status
  document.querySelector("select").addEventListener("change", () => {
    document.querySelector("select").classList.remove("invalid");
  });
  // for the change of the field it removes the invalid status
  document.querySelector("textarea").addEventListener("change", () => {
    document.querySelector("textarea").classList.remove("invalid");
  });
});
// validation of the fields
function validInput() {
  let valid = true;
  const petInput = document.querySelector("select");
  const motivationInput = document.querySelector("textarea");
  if (petInput.value === "") {
    petInput.classList.add("invalid");
    valid = false;
  }
  if (motivationInput.value.length < 15) {
    motivationInput.classList.add("invalid");
    valid = false;
  }

  return valid;
}
// submit function
function submitForm(e) {
  e.preventDefault();
  if (validInput()) {
    //document.querySelector("form")
    document.querySelector("#requestForm").innerHTML =
      "<p>Thank you for your interest, we'll be in touch soon, have a great day.</p>";
  }
}

/****** script necessary for the slideshow *****/
/*slideshow - https://www.w3schools.com/howto/howto_js_slideshow.asp */
// for the arrows buttons
function plusSlides(n) {
  showSlides((slideIndex += n));
}
// used on the bottom buttons to select a specific image
function currentSlide(n) {
  showSlides((slideIndex = n));
}
// function that changes the imagem
function showSlides(n) {
  var i;
  var slides = document.getElementsByClassName("mySlides");
  var dots = document.getElementsByClassName("dot");
  if (n > slides.length) {
    slideIndex = 1;
  }
  if (n < 1) {
    slideIndex = slides.length;
  }
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex - 1].style.display = "block";
  dots[slideIndex - 1].className += " active";

  //this is to avoid the spontaneous change after click, will await the default time again
  if (slideTimeoutId !== "") clearTimeout(slideTimeoutId);
  slideTimeoutId = setTimeout(() => {
    showSlides(++slideIndex);
  }, 3000);
}
