const sectionList = document.querySelector("#trending");
for (const article of articles) {
  const newArticle = document.createElement("article");
  const newParagraph = document.createElement("p");

  newArticle.classList.add(article.category);
  newParagraph.textContent = article.title;

  sectionList.appendChild(newArticle);
  newArticle.appendChild(newParagraph);
}

const formElement = document.querySelector("form");
const categorySelect = document.querySelector("#category");

formElement.addEventListener("submit", function(e) {
  e.preventDefault();
  buttonFilter(categorySelect.value);
});
const linkList = document.querySelectorAll("a");
for (const link of linkList) {
  link.addEventListener("click", function(e) {
    buttonFilter(this.hash.replace("#", ""));
  });
}

function newsFilter(category) {
  let articles = document.querySelectorAll("article");
  for (const article of articles) {
    if (category === "all") article.style.display = "block";
    else article.style.display = "none";
  }
  if (category !== "all") {
    articles = document.querySelectorAll("." + category);
    for (const article of articles) {
      article.style.display = "block";
    }
  }
}
function buttonFilter(category) {
  event.preventDefault();

  categorySelect.value = category;
  const linkList = document.querySelectorAll("a");
  for (const link of linkList) {
    link.classList.remove("selected");
  }
  document
    .querySelector('[href="#' + category + '"]')
    .classList.add("selected");
  newsFilter(category);
}
