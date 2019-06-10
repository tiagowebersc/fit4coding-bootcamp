const rank = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "j", "q", "k", "a"];
const deck = [];
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

const cardPlayer1 = deck.shift();
const cardPlayer2 = deck.shift();
showCard(1, cardPlayer1.suit, cardPlayer1.rank);
showCard(2, cardPlayer2.suit, cardPlayer2.rank);
const rankPlayer1 = rank.indexOf(cardPlayer1.rank);
const rankPlayer2 = rank.indexOf(cardPlayer2.rank);

if (rankPlayer1 > rankPlayer2) win(1);
else if (rankPlayer2 > rankPlayer1) win(2);
else win(0);
