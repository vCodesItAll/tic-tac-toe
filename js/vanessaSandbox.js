// Constants

const game = document.getElementById('game'); //id of the one div
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

displayResult(message)
    init messageElement to create div in document
    add class called message
    set messageElement text content as message
    appendChild messageElement to parent game

renderBoard
    set game.innerHTML to an empty string //clear the game board

    //build the tiles
    for (iterate i from 0 to BOARDSIZE ^ 2, by 1)
        init tile as create a div element
        add classList name tile
        init textContent as value of index in board[]
        create click handler to tile object
        append tile as child to game

    //make new row after 3 tiles
    if (index plus 1's mod of BOARDSIZE is equivalent to 0)
        append a line break as a child element to game

    //display whose turn it is
    if gameEnded is false
        create a div element called messageElement
        add message to messageElement
        add textContent string: It's stringliteral currentPlayer's turn
        append the child of messageElement to game

restartGame
    // clear board
    set board as fill method for board array with empty strings
    set currentPlayer as "X"
    set gameEnded as false
    call renderBoard

//render board for the first time
renderBoard