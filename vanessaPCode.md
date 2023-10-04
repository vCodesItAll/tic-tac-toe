DECLARE CONSTANTS
game get element id game
board set equal to 3 // 3x3
multidimensional array with winning combinations

GAME STATE
declare board array
declare current player
init gameEnd as false

FUNCTIONS
checkWin
    return winningCombinations do some method to check if it exists

checkTie
    return every method to check all cells are not empty

handleTileClick(index)
    if gameEnded and boardIndex do not equal empty return; // stops user from clicking if game is over or on any occupied tile

    init boardIndex as currentPlayer

    if checkWin(currentPlayer)
        gameEnded is true // game ends because someone won
        displayResult string literal currentPlayer wins
    else if checkTie
        gameEnded is true // game ended to tie
        displayResult string It's a tie
    else
        currentPlayer = currentPlayer switch statement if they're not x, switch to o otherwise switch to x
renderBoard

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