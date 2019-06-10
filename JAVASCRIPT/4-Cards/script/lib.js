//showCard(playerId, rank, suit) will show the card
//playerNb : 1 or 2
//suit : hearts, diamonds, clubs, spades
//rank : 2, 3, 4, 5, 6, 7, 8, 9, 10, j, q, k, a
function showCard(playerId, suit, rank) {
  //selecting the good player's hand
  const currentPlayerHand = document.querySelector(
    "#player" + playerId + " .hand"
  );
  //modifying the HTML to add the card
  currentPlayerHand.innerHTML =
    '<div class="card card-' + suit + " card-" + rank + '"><span></span></div>';
}

function showTableCard(cardId, suit, rank) {
  //selecting the good player's hand
  const currentPlayerHand = document.querySelector("#card" + cardId + " .hand");
  //modifying the HTML to add the card
  currentPlayerHand.innerHTML =
    '<div class="card card-' + suit + " card-" + rank + '"><span></span></div>';
}

// win(playerId) will show win beside the player title
//playerNb : 1 or 2 - 0 for draw
function win(playerId) {
  //draw game
  if (playerId == 0) {
    document.querySelector("#player1 h2 span").innerText = "DRAW";
    document.querySelector("#player2 h2 span").innerText = "DRAW";
    return;
  }
  //Change to good player heading to "win"
  document.querySelector("#player" + playerId + " h2 span").innerText = "WIN";
  //Finding the other Player ID
  const otherId = playerId == 1 ? 2 : 1;
  //Change other player to LOSE
  document.querySelector("#player" + otherId + " h2 span").innerText = "LOSE";
}

function rndNumber(limit) {
  return Math.floor(Math.random() * (limit + 1));
}
