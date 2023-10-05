// Constants

const gameContainer = document.getElementById('game-container'); //id of the one div
const BOARD_SIZE = 3; // 3x3
const WINNING_COMBINATIONS = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6] // Diagonals
];

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
        displayResult(`${currentPlayer} wins!`);
    } else if (checkTie()) {
        gameEnded = true; // game is over in a tie because there are no moves
        displayResult("It's a tie!");
    } else {
        currentPlayer = currentPlayer === "X" ? "O" : "X"; //switch symbol for next player turn
    }
    renderBoard(); // update the game board
}

// Function to display game result
function displayResult(message) {
    const messageElement = document.createElement("div");
    messageElement.classList.add("message");
    messageElement.textContent = message;
    gameContainer.appendChild(messageElement);
}

// Function to render the game board dynamically
function renderBoard(){
    gameContainer.innerHTML = " "; //clear the game board
    for (let i = 0; i < BOARD_SIZE; i++) { // iterate rows
        const row = document.createElement('div'); // make row
        row.classList.add("row"); // add row class
        for (let j = 0; j < BOARD_SIZE; j++){ // iterate cols
            const col = document.createElement("div"); // make col
            col.classList.add("col-4"); // add col class
            const tile = document.createElement("div"); // make tile
            tile.classList.add("tile"); // add tile class
            const index = i * BOARD_SIZE + j; // multiplication indicates row and j chooses index in col
        tile.textContent = board[i];
        tile.addEventListener("click", () => handleTileClick(i)); // attach click event listener
        gameContainer.appendChild(tile);

        //make new row after 3 tiles
        if ((i+1) % BOARD_SIZE === 0) {
            gameContainer.appendChild(document.createElement("br")); 
        }
    }

    //display whose turn it is
    if (!gameEnded) {
        const messageElement = document.createElement("div");
        messageElement.classList.add("message");
        messageElement.textContent = `It's ${currentPlayer}'s turn.`;
        gameContainer.appendChild(messageElement);
    }
}

// Function to restart the game
function restartGame() {
    board = Array(BOARD_SIZE ** 2).fill(" "); // clear board
    currentPlayer = "X"; // always start game with user as X
    gameEnded = false; // reset game state to false
    renderBoard();
}

//render board for the first time
renderBoard();