function beginGame(){
  breakOut();
}

function initializeGame(){
  var $root = $('#root');
  $root.empty();
  var $scoreboardContainer = $('<div/>').attr('id', 'scoreboard-container');

  $root.append($scoreboardContainer);
  var $player1Score = $('<span/>').attr('id', 'player1-score')
             .text('000');
  var $player2Score = $('<span/>').attr('id', 'player2-score')
             .text('000');
  $scoreboardContainer.append($player1Score);
  $scoreboardContainer.append($player2Score);
  $scoreboardContainer.append('<svg id="score-board" xmlns="http://www.w3.org/2000/svg">');
  createSvgRectangle();
  $root.append('<div id="canvas-container">');
  var $canvasContainer = $('#canvas-container');
  $canvasContainer.append('<canvas id="game-canvas" width="600" height="600"></canvas>');
  beginGame();
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
        ctx.textAlign = 'center';
        ctx.fillText("Player " + playerId, canvas.width/2, canvas.height/2);
      }

      function drawInstruction() {
          ctx.font = "24px ArcadeFont";
          ctx.fillStyle = '#888888';
          ctx.textAlign = 'center';
          ctx.fillText("Press  ' ENTER '  to  start", canvas.width/2, canvas.height/2 + 30);
      }

      drawPlayer();
      drawInstruction();
    }
}

function endScreen(){
  let canvas = document.getElementById("game-canvas");
  let ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  let player1Score = $("#player1-score").text() | 0,
      player2Score = $("#player2-score").text() | 0;
  let color = '#FFFFFF',
      winner = '';
  if(player1Score > player2Score){
    color = '#DD0000';
    winner = 'PLAYER 1 WINS'
  }else if(player1Score < player2Score){
    color = '#0000DD';
    winner = 'PLAYER 2 WINS'
  }else{
    winner = 'DRAW';
  }

  document.addEventListener('keypress', returnToMainMenu, false);

  function returnToMainMenu(e){
    let key = e.which || e.keyCode || 0;
    if(key === 13) {
        //initializeNewLevel();
        document.removeEventListener('keypress', returnToMainMenu);
        location.reload();
        //mainMenu();
    }
  }

  function loop(){
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      function drawWinner(){
        ctx.font = "66px ArcadeFont";
        ctx.fillStyle = color;
        ctx.textAlign = 'center';
        ctx.fillText(winner, canvas.width/2, canvas.height/2);
      }
      function drawInstruction() {
          ctx.font = "24px ArcadeFont";
          ctx.fillStyle = '#888888';
          ctx.textAlign = 'center';
          ctx.fillText("Press  ' ENTER '  to  return", canvas.width/2, canvas.height/2 + 30);
      }
      drawWinner();
      drawInstruction();

    requestAnimationFrame(loop);
  }

  loop();
}
