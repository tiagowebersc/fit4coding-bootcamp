const rank = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "j", "q", "k", "a"];
const deck = [];
const tableCards = [];
const players = [];
for (const r of rank) {
  deck.push({ rank: r, suit: "hearts" });
  deck.push({ rank: r, suit: "spades" });
  deck.push({ rank: r, suit: "clubs" });
  deck.push({ rank: r, suit: "diamonds" });
}

for (let i = 0; i < deck.length; i++) {
  const randonNb = rndNumber(deck.length - 1);
  const cardPick = deck[randonNb];
  deck[randonNb] = deck[i];
  deck[i] = cardPick;
}

tableCards[tableCards.length] = deck.shift();
tableCards[tableCards.length] = deck.shift();
tableCards[tableCards.length] = deck.shift();
tableCards[tableCards.length] = deck.shift();
tableCards[tableCards.length] = deck.shift();

for (let i = 0; i < 3; i++) {
  showTableCard(i + 1, tableCards[i].suit, tableCards[i].rank);
}

const hidenCards = document.querySelector(".hideCard");

const cardFlip = document.querySelector(".cardFlip");
cardFlip.addEventListener("click", function() {
  cardFlip.classList.toggle("is-flipped");
});
