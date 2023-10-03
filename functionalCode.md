document.addEventListener("load",init);

init(event){
  
    // update or populate gameState
    // add properties to the gameState with values 
    // build ui
    buildUI();
}

// Below are functions with the R&R - MVC

// Model - 
function newGame(){
    // create game obj
    // create the game obj
    game = new Game();
    // create the player1 and player2 objs
    player1 = new Player();
    player2 = new Player();
    // check local storage
    // if we have a game in ls
    // hydrate state
}

// Model functions
/*
    updateState({key:value});
    addMove({who:player1, where:square5});
    evalWinCondition()
   
*/

// View - 
function buildUI(){

}

// Controller - 
function onMove (){
makeBlock() // you have blocked other player from making 3 in a row

}