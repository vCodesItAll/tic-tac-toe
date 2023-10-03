// State and Building the UI


// State
// we want to build a domain model for state
// Game Status
    let gameState = {};
// boardState
    let tileObj = {};
    let checkObj = {};
    let entityObj = {title:tileObj, symbol:symbolObj}
    let boardState = newArray(64).fill();
    gameState.boardState = boardState();
    let  currentTurn = 0;
    gameState.currentTurn = currentTurn;
    let currentPlayers = [];
    currentPlayers.push({name: "Player 1"});
    currentPlayers.push({name:"Player 2"});
// currentTurn = currentPlayers[currentTurn]; // player 1
    gameState.currentPlayers = currentPlayers;
    console.log(gameState);
// 
// CurrentPlayers
//player1 player2(CPU)


// end State


// UI



// end UI