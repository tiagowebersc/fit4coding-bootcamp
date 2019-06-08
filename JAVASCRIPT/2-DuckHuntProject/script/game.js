// Players info
let mousePlayer = "";
let keyboardPlayer = "";
let mouseScore = 0;
let keyboardScore = 0;
// Duck info
const duck = document.querySelector("#duck");
let duckPosition = { top: 50, left: 50 };
const duckStartSpeed = 200;
const decreaseduckInterval = 30;
let duckInterval = duckStartSpeed;
const duckMovimentSize = 5;
let timeOutSpeed = 10000;
let duckDirection = "UP";
// Timers id
let idGameInterval = "";
let idKeyboardTimeout = "";

// store keyboard direction
// each keyup call the keyboardDirection to see if was a direction button
document.addEventListener("keyup", keyboardDirection);
function keyboardDirection(e) {
  // e (event) is necessary to get wich key was pressed
  if (e.code === "ArrowUp") {
    duckDirection = "UP";
  }
  if (e.code === "ArrowDown") {
    duckDirection = "DOWN";
  }
  if (e.code === "ArrowLeft") {
    duckDirection = "LEFT";
  }
  if (e.code === "ArrowRight") {
    duckDirection = "RIGHT";
  }
}
function computerDirection() {
  // just gets a random value from 0 to 3 to use as direction
  const direction = Math.trunc(Math.random() * 4);
  switch (direction) {
    case 0:
      duckDirection = "UP";
      break;
    case 1:
      duckDirection = "DOWN";
      break;
    case 2:
      duckDirection = "LEFT";
      break;
    default:
      duckDirection = "RIGHT";
  }
}
function duckMove() {
  // if computer mode is selected call the computerDirection to change randomily the direction
  if (checkboxComputer.checked) computerDirection();
  // start transition duration with the normal value
  document.querySelector("#duck").style.transitionDuration = "0.3s";
  // adds or subtracts the position
  if (duckDirection === "UP") duckPosition.top -= duckMovimentSize;
  if (duckDirection === "DOWN") duckPosition.top += duckMovimentSize;
  if (duckDirection === "LEFT") duckPosition.left -= duckMovimentSize;
  if (duckDirection === "RIGHT") duckPosition.left += duckMovimentSize;
  // looks if the position is out of the screen
  // if duck goes out of screen transition duration 0 to avoid duck jump over the screen
  if (
    duckPosition.top < 2 ||
    duckPosition.top > 97 ||
    duckPosition.left < 2 ||
    duckPosition.left > 97
  ) {
    document.querySelector("#duck").style.transitionDuration = "0s";
  }
  // as the duck goes out of screen update the position to go in the oposity position
  if (duckPosition.top < 2) {
    duckPosition.top = 97;
  }
  if (duckPosition.top > 97) {
    duckPosition.top = 2;
  }
  if (duckPosition.left < 2) {
    duckPosition.left = 97;
  }
  if (duckPosition.left > 97) {
    duckPosition.left = 2;
  }
  // updates the position on the div #duck
  duck.style.top = duckPosition.top + "%";
  duck.style.left = duckPosition.left + "%";
}
// Asks for the players names and display on the site
function askPlayers() {
  // gets the value from the user input inside of welcome div
  mousePlayer = document.querySelector("#userMouseInput").value;
  keyboardPlayer = document.querySelector("#userKeyboardInput").value;
  // get the elements (td) of the table score to put the names
  const mUserTd = document.querySelector("#userMouse");
  const kUserTd = document.querySelector("#userKeyboard");
  // insert the names in the td of the table score
  mUserTd.innerHTML = mousePlayer;
  kUserTd.innerHTML = keyboardPlayer;
}
// Updates the score table
function updateScore() {
  // get the elements (td) of the table score to put the score
  const mScore = document.querySelector("#scoreMouse");
  const kScore = document.querySelector("#scoreKeyboard");
  // insert the scores in the td of the table score
  mScore.innerHTML = mouseScore;
  kScore.innerHTML = keyboardScore;
}
// Start/Reset the game score and starts the game
function startGame() {
  // set all the value for the initial value to start the game
  mouseScore = 0;
  keyboardScore = 0;
  duckPosition.top = 50;
  duckPosition.left = 50;
  // default speed for the duck, after it'll be increased after the hits
  duckInterval = duckStartSpeed;
  // update table score
  updateScore();
  // store the ids to be used after
  idGameInterval = setInterval(runGame, duckInterval);
  idKeyboardTimeout = setTimeout(keyboardWon, timeOutSpeed);
}
// Running logic
function runGame() {
  // display the duck
  duck.style.display = "initial";
  // update duck position
  duckMove();
}
// Keyboard Hit Case
// call if the timeout if triggered (mouse didn't hit the duck)
function keyboardWon() {
  // stops the duck moviment
  clearInterval(idGameInterval);
  // add keyboard points
  keyboardScore++;
  // update score table
  updateScore();
  // if didn't won continues
  if (keyboardScore < 5) {
    // display for 1 second the miss and continues the game
    // hide the duck
    duck.style.display = "none";
    // show miss screen
    document.querySelector("#missScreen").style.display = "initial";
    // waits 1 second to continues
    setTimeout(function() {
      document.querySelector("#missScreen").style.display = "none";
      //show duck
      duck.style.display = "initial";
      // restarts duck moviment
      idGameInterval = setInterval(runGame, duckInterval);
      // timeout keyboard condition
      idKeyboardTimeout = setTimeout(keyboardWon, timeOutSpeed);
    }, 1000);
  } else {
    // if gets 5 points end the game
    endGame(keyboardPlayer);
  }
}
// Mouse Hit Case
// call if duck is clicked
duck.addEventListener("click", duckHit);
function duckHit() {
  // stops duck movimento
  clearInterval(idGameInterval);
  // stops the keyboard timeout because the duck was hit
  clearTimeout(idKeyboardTimeout);
  // increase mouse points
  mouseScore++;
  // reduce the interval that the duck is update (increase the speed)
  duckInterval -= decreaseduckInterval;
  // update table score
  updateScore();
  // if didn't won continues
  if (mouseScore < 5) {
    // display for 1 second the hit and continues the game
    // hide the duck
    duck.style.display = "none";
    // show hit screen
    document.querySelector("#hitScreen").style.display = "initial";
    // waits 1 second to continues
    setTimeout(function() {
      document.querySelector("#hitScreen").style.display = "none";
      //show duck
      duck.style.display = "initial";
      // restarts duck moviment
      idGameInterval = setInterval(runGame, duckInterval);
      // timeout keyboard condition
      idKeyboardTimeout = setTimeout(keyboardWon, timeOutSpeed);
    }, 1000);
  } else {
    endGame(mousePlayer);
  }
}
// Finished the game
function endGame(winner) {
  // hide duck
  duck.style.display = "none";
  // insert the winner name inside of h2 of the winScreen
  winnerNameTitle.innerHTML = winner;
  // display winScreen
  divwinScreen.style.display = "initial";
}

//******************************************************************** */
// dialogs part / divs
const divWelcome = document.querySelector("#welcome");
const startGameButton = document.querySelector("#startGamButton");
const checkboxComputer = document.querySelector("#keyboardComputer");
const userMouseInput = document.querySelector("#userMouseInput");
const userKeyboardInput = document.querySelector("#userKeyboardInput");
// checkbox change - welcome div
checkboxComputer.addEventListener("change", function() {
  if (checkboxComputer.checked) {
    userKeyboardInput.value = "Computer";
    userKeyboardInput.disabled = true;
  } else {
    userKeyboardInput.disabled = false;
    userKeyboardInput.value = "";
  }
});
// start game button - welcome div
startGameButton.addEventListener("click", function() {
  if (userMouseInput.value.length > 0 && userKeyboardInput.value.length > 0) {
    divWelcome.style.display = "none";
    askPlayers();
    startGame();
  }
});

const divwinScreen = document.querySelector("#winScreen");
const winnerNameTitle = document.querySelector("#winnerName");
const restartGamButton = document.querySelector("#restartGamButton");
const newGameButton = document.querySelector("#newGamButton");
// restart game button - end game
restartGamButton.addEventListener("click", function() {
  divwinScreen.style.display = "none";
  startGame();
});
// new game button - end game
newGameButton.addEventListener("click", function() {
  checkboxComputer.checked = false;
  userKeyboardInput.disabled = false;
  userKeyboardInput.value = "";
  userMouseInput.value = "";
  divwinScreen.style.display = "none";
  divWelcome.style.display = "initial";
});
