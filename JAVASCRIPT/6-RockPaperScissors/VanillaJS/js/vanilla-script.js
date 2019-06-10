document.addEventListener("DOMContentLoaded", function(){
    let userChoise = "";
    const imgChoises = document.querySelectorAll("#userChoice img");
    const imgUserGame = document.querySelectorAll("#userGame img");
    const imgComputerGame = document.querySelectorAll("#computerGame img");
    const resultGameLabel = document.querySelector("#resultGame");
    const playGameButton = document.querySelector("#playGame");
    const playAgainButton = document.querySelector("#playAgain");

    for(const img of imgChoises){
        img.addEventListener("click", showClickedChoise);
    }
    playGameButton.addEventListener("click", computerChoise);
    playAgainButton.addEventListener("click", restartGame);

    function computerChoise(){
        const compChoise = Math.trunc(Math.random()*3);
        imgComputerGame[compChoise].style.display = "block";
        showResult(compChoise);
        playGameButton.style.display = "none";
        playAgainButton.style.display = "block";
    }
    function showResult(compChoise){
        const result = (compChoise + 3 - userChoise ) % 3;
        if (result === 0){
            resultGameLabel.style.backgroundColor = "grey";
            resultGameLabel.textContent = "TIE";
        }
        if (result === 1){
            resultGameLabel.style.backgroundColor = "red";
            resultGameLabel.textContent = "LOSE";
        }
        if (result === 2){
            resultGameLabel.style.backgroundColor = "green";
            resultGameLabel.textContent = "WIN";
        }
        resultGameLabel.style.display = "block";
    }
    function restartGame(){
        for(const img of imgUserGame){
            img.style.display = "none";
        }
        for(const img of imgComputerGame){
            img.style.display = "none";
        }
        playAgainButton.style.display = "none";
        resultGameLabel.style.display = "none";
        for(const img of imgChoises){
            img.addEventListener("click", showClickedChoise);
        }
    }
    function showClickedChoise(){
        const choiseName = this.alt.split(" ")[1];
        const choise = document.querySelector("#user"+choiseName);
        choise.style.display = "block";
        userChoise = choiseName === "Pierre"? 0 : choiseName === "Feuille" ? 1 : 2;
        for(const img of imgChoises){
            img.removeEventListener("click", showClickedChoise);
        }
        document.querySelector("#playGame").style.display = "block";
    }
});