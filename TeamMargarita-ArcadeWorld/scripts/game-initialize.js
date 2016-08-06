function beginGame(){
  breakOut(); //CALL YOUR GAME FOR TESTING
}

function initializeGame(){
  var $root = $('#root');
  $root.empty();
  var $scoreboardContainer = $('<div/>').attr('id', 'scoreboard-container');

  $root.append($scoreboardContainer);
  var $player1Score = $('<span/>').attr('id', 'player1-score')
             .text('0');
  var $player2Score = $('<span/>').attr('id', 'player2-score')
             .text('0');
  //var $svg = $('<svg/>').attr('id', 'score-board')
  //                      .attr('xmlns', 'http://www.w3.org/2000/svg')
  //                      .css('background-color: blue; width: 600; height: 50');
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
