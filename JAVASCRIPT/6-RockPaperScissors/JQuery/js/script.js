$(function() {
  let userChoise = "";
  $("#userChoice img").on("click", showChoise);
  $("#playGame").on("click", playGame);
  $("#playAgain").on("click", playAgain);

  function cleanChoise() {
    $("#userPierre").css("display", "none");
    $("#userFeuille").css("display", "none");
    $("#userCiseaux").css("display", "none");
    $("#compPierre").css("display", "none");
    $("#compFeuille").css("display", "none");
    $("#compCiseaux").css("display", "none");
    $("#resultGame").css("display", "none");
  }
  function showChoise() {
    userChoise = this.alt.split(" ")[1];
    $("#user" + userChoise).css("display", "block");
    userChoise = userChoise === "Pierre" ? 0 : userChoise === "Feuille" ? 1 : 2;
    $("#playGame").css("display", "block");
    $("#userChoice img").off("click", showChoise);
  }
  function compPlay() {
    const compChoice = Math.trunc(Math.random() * 3);
    if (compChoice === 0) $("#compPierre").css("display", "block");
    if (compChoice === 1) $("#compFeuille").css("display", "block");
    if (compChoice === 2) $("#compCiseaux").css("display", "block");
    showResult(compChoice);
  }
  function showResult(compChoice) {
    $("#resultGame").css("display", "block");
    if ((userChoise === 0 ? 3 : userChoise) - compChoice === 1) {
      $("#resultGame").css("background-color", "green");
      $("#resultGame").text("WIN");
    }
    if (userChoise === compChoice) {
      $("#resultGame").css("background-color", "grey");
      $("#resultGame").text("DRAW");
    }
    if ((compChoice === 0 ? 3 : compChoice) - userChoise === 1) {
      $("#resultGame").css("background-color", "red");
      $("#resultGame").text("LOSE");
    }
  }

  function playGame() {
    $("#userChoice img").off("click", showChoise);
    $("#playGame").css("display", "none");
    $("#playAgain").css("display", "block");
    compPlay();
  }
  function playAgain() {
    $("#userChoice img").on("click", showChoise);
    $("#playAgain").css("display", "none");
    cleanChoise();
  }
});
