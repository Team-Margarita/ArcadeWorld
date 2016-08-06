function beginGame(){
  breakOut(); //CALL YOUR GAME FOR TESTING
}

function updateScoreBoard(playerId, scoreToAdd){
    $player1Score = $("#player1-score").text() | 0;
    $player2Score = $("#player2-score").text() | 0;
      playerId === 1 ? ($player1Score += scoreToAdd) : ($player2Score += scoreToAdd);

    $("#player1-score").text($player1Score);
    $("#player2-score").text($player2Score);
}

function initializeNewLevel(){
  let $canvasContainer = $('#canvas-container');
  $canvasContainer.empty();
  $canvasContainer.append('<canvas id="game-canvas" width="600" height="600"></canvas>');
}

function startScreen(playerId, startPressed){

  let canvas = document.getElementById("game-canvas");
  if(canvas){
      let ctx = canvas.getContext("2d");

      function drawPlayer(){
        ctx.font = "66px ArcadeFont";
        if(playerId === 1){
        ctx.fillStyle = '#DD0000';
        }else{
        ctx.fillStyle = '#0000DD';
        }
        ctx.fillText("Player " + playerId, canvas.width/2 - 120, canvas.height/2);
      }

      function drawInstruction() {
          ctx.font = "24px ArcadeFont";
          ctx.fillStyle = '#888888';
          ctx.fillText("Press  ' ENTER '  to  start", canvas.width/2 - 120, canvas.height/2 + 30);
      }

      drawPlayer();
      drawInstruction();
    }
}
