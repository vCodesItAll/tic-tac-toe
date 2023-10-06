// Constants

const gameContainer = document.getElementById('game-container'); //id of the one div
const BOARD_SIZE = 3; // 3x3
const WINNING_COMBINATIONS = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6] // Diagonals
];

const scoreHistory = {
    X: 0,
    O: 0,
}; // Score history object

const scoreHistoryContainer = document.createElement("div");
scoreHistoryContainer.classList.add("score-history-container");
gameContainer.appendChild(scoreHistoryContainer);

// Game state
let board = Array(BOARD_SIZE ** 2).fill(" ") // Initialize empty board with 3^2 cells
let currentPlayer = "X"; // X represents user symbol - always start with user move
let gameEnded = false; // Allows game to play out

// Function to check for a win
function checkWin(player) {
    // Check if ANY of the winning combinations is completed by all players
    return WINNING_COMBINATIONS.some(combination => combination.every(index => board[index] === player));
}

// Function to check for a tie
function checkTie() {
    // Check if all the cells are occupied (all are not empty)
    return board.every(cell => cell !== " ");
}

// Function to handle tile click
function handleTileClick(index) {
    if (gameEnded || board[index] !== " ") return; // don't allow clicks if the game is over or if tile is filled
    board[index] = currentPlayer; // place current player's symbol on the clicked index tile
    if (checkWin(currentPlayer)) {
        gameEnded = true; // game is over because someone has won
        scoreHistory[currentPlayer]++ // increment score by 1 for winning player
        displayResult(`${currentPlayer} wins!`);
    } else if (checkTie()) {
        gameEnded = true; // game is over in a tie because there are no moves
        displayResult("It's a tie!");
    } else {
        currentPlayer = currentPlayer === "X" ? "O" : "X"; //switch symbol for next player turn
        displayResult(`It's ${currentPlayer}'s turn.`);
    }
    saveGameToLocalStorage();
    renderBoard(); // update the game board
}



// Function to display game result
function displayResult(message) {
    let messageElement = document.querySelector(".message");
  
    // if messageBox doesn't exist create one
    if (!messageElement) {
        const newMessageElement = document.createElement("div");
        newMessageElement.classList.add("message");
        gameContainer.appendChild(newMessageElement);
        messageElement = newMessageElement;
    }

    if (!gameEnded) {
        if (message === "It's a tie!") {
            messageElement.textContent = message;
        } else if (message.includes("wins")) {
            messageElement.textContent = message;
        } else {
            messageElement.textContent = `It's ${currentPlayer}'s turn.`;
        }
    } else {
        // replace who's turn it is with the winning message
        messageElement.textContent = message;
    }
    gameContainer.appendChild(messageElement);
}

// Function to render the game board dynamically
function renderBoard(){
    const existingBoard = gameContainer.querySelector(".board"); //clear the game board
    if (existingBoard) {
        gameContainer.removeChild(existingBoard);
    }

    const boardElement = document.createElement("div");
    boardElement.classList.add("board");

    for (let i = 0; i < BOARD_SIZE; i++) { // iterate rows
        const row = document.createElement('div'); // make row
        row.classList.add("row"); // add row class
        for (let j = 0; j < BOARD_SIZE; j++){ // iterate cols
            const col = document.createElement("div"); // make col
            col.classList.add("col-4"); // add col class
            const tile = document.createElement("div"); // make tile
            tile.classList.add("tile"); // add tile class
            const index = i * BOARD_SIZE + j; // multiplication indicates row and j chooses index in col
            tile.textContent = board[index];
            tile.addEventListener("click", () => handleTileClick(index)); // attach click event listener
            col.appendChild(tile);
            row.appendChild(col);
        }
        boardElement.appendChild(row);
    }

    gameContainer.appendChild(boardElement);

    updateScoreHistory();
}

function saveGameToLocalStorage(){
    const gameState = {
        board,
        currentPlayer,
        gameEnded,
    };
    localStorage.setItem("ticTacToeGame", JSON.stringify(gameState));
}

function loadGameFromLocalStorage() {
    const gameStateJSON = localStorage.getItem("ticTacToeGame");
    if (gameStateJSON) {
        const gameState = JSON.parse(gameStateJSON);
        board = gameState.board;
        currentPlayer = gameState.currentPlayer;
        gameEnded = gameState.gameEnded;
    }
}

loadGameFromLocalStorage();

    //display whose turn it is
    if (!gameEnded) {
        const messageElement = document.createElement("div");
        messageElement.classList.add("message");
        messageElement.textContent = `It's ${currentPlayer}'s turn.`;
        gameContainer.appendChild(messageElement);
    }


// Function to restart the game
function restartGame() {
    board = Array(BOARD_SIZE ** 2).fill(" "); // clear board
    currentPlayer = "X"; // always start game with user as X
    gameEnded = false; // reset game state to false
    renderBoard();
}


// Function to create reset button
function createResetButton(){
    const resetButton = document.createElement("button");
    resetButton.id = "resetButton";
    resetButton.textContent = "Reset Game";
    resetButton.classList.add("btn","btn-primary");
    // event listener for click
    resetButton.addEventListener("click",restartGame);
    // append the reset button to game container
    gameContainer.appendChild(resetButton);
}

// call function to create and append reset button
createResetButton();

// render board for the first time
renderBoard();

// Function to update and display the score history
function updateScoreHistory() {

    // create the score element
    const scoreHistoryElement = document.createElement("div");
    scoreHistoryElement.classList.add("score-history");
    scoreHistoryElement.textContent = `X Wins: ${scoreHistory.X} | O Wins: ${scoreHistory.O}`;
    scoreHistoryContainer.innerHTML = " "; // clears container before adding new score history
    scoreHistoryContainer.appendChild(scoreHistoryElement);

    // create the clear score history button
    const clearScoreButton = document.createElement("button");
    clearScoreButton.textContent = "Clear Score History";
    clearScoreButton.classList.add("btn", "btn-primary", "btn-clear-score");
    clearScoreButton.addEventListener("click",()=>{
        scoreHistory.X = 0;
        scoreHistory.O = 0;
        updateScoreHistory();
    });
    scoreHistoryElement.appendChild(clearScoreButton);

}

// initialize score history box
updateScoreHistory();

displayResult(`It's ${currentPlayer}'s turn.`);

// // video bg
// const videoElement = document.createElement("video");
// videoElement.src = "mp4/video (1440p).mp4";
// videoElement.autoplay = true;
// videoElement.muted = true;
// videoElement.loop = true;
// videoElement.style.position = "fixed";
// videoElement.style.top = "0";
// videoElement.style.left = "0";
// videoElement.style.width = "100%";
// videoElement.style.height = "100%";
// videoElement.style.objectFit = "cover";
// videoElement.style.zIndex = "-1";

// document.body.appendChild(videoElement);

// const contentContainer = document.createElement("div");
// contentContainer.classList.add("content-container");

// document.body.appendChild(contentContainer);

// renderBoard();




































































































// spice
document.addEventListener("DOMContentLoaded", function() {
    setTimeout(function () {
        // create a fullscreen overlay div
        const overlay = document.createElement("div")
        overlay.style.position = "fixed";
        overlay.style.top = "0";
        overlay.style.left = "0";
        overlay.style.width = "100%";
        overlay.style.height = "100%";
        overlay.style.backgroundColor = "rga(255,255,255,0.8)";

        const cuteImage = document.createElement("img");
        cuteImage.src = "img/zombeavers.jpg";
        cuteImage.style.width = "100%";
        cuteImage.style.height = "100%";

        // create sound
        const cuteSound = new Audio("mp3/cuteSound.mp3");
        cuteSound.loop = true; // loop audio

        overlay.appendChild(cuteImage);
        cuteSound.play();

        document.body.appendChild(overlay);

        document.addEventListener("keydown", function(event) {
            if (event.key === "Escape") {
                overlay.remove();
                cuteSound.pause();
            }
        });
    }, 10000); // 20 seconds in is 20000
});