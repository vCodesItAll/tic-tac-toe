document.addEventListener("load",init);

init(event){
  
    // update or populate gameState
    // add properties to the gameState with values 
    // build ui
    buildUI();

    // initialize  click handlers
    setupHandlers();
}

// Below are functions with the R&R (role and responsibilities) - MVC

// Model - 
function newGame(){
    // create game obj
    // create the game obj
    game = new Game();
    // create the player1 and player2 objs
    player1 = new Player();
    player2 = new Player();
    // check local storage
    // if (we have a game in ls)
        // hydrate state
        gameState = ls.state
    else 
        gameState = gameState.board.default
}

// Model functions
/*
    updateState({key:value});
    addMove({
        who:player1, 
        what: x or o, 
        where:tile5
        }
    );
    evalWinCondition()
    updateView()

   
*/

// View - 
function buildUI(){
    // do stuff with the UI, View
}

// View functions
    buildTilesAndPieces()
    buildTiles()
    buildScoreboard()
    buildControlBoard()


// Controller - 
function setupHandlers(){
    // Tile clickhandler
    // Scoreboard clickhandler (player, reset)
    // 
}
function onMove (){
makeBlock() // you have blocked other player from making 3 in a row

}