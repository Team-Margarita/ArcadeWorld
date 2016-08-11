'use strict';
function tron(){

  const cellDimension = 10;
  const pointPerWin = 20;
  const speedIndex = 100;
  var isInGame = false;
  var canvas = document.getElementById("game-canvas");
  var ctx = canvas.getContext("2d");

  function createPoint (x, y){
    var point = {
      x : x,
      y : y
    };
    return point;
  }

  var keysToIndex =  {
    "38" : "up",
    "40" : "down",
    "37" : "left",
    "39" : "right",
    "87" : "up",
    "83" : "down",
    "65" : "left",
    "68" : "right"
  };

  function createPlayer (startX, startY, playerColor, playerDirection, initialWins) {

    function positionIsInHistory(position, history) {
      for (var i=0; i<history.length; i+=1) {
        if ((position.x===history[i].x)&&(position.y===history[i].y)){
          return true;
        }
      }
      return false;
    }

    var player = {
      //name: name,
      position : createPoint(startX, startY),
      history : [],
      color : playerColor,
      directionPair : playerDirection,
      wins : initialWins,
      paint : function() {
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.fillRect(this.position.x * cellDimension, this.position.y * cellDimension, cellDimension, cellDimension);
        ctx.fill();
        ctx.closePath();
      },
      hasCollided : function(otherPlayer) {
        let canvas = document.getElementById("game-canvas");
        let ctx = canvas.getContext("2d");
        var playerHitHimself = positionIsInHistory(this.position, this.history);
        var playerHitTheWalls = this.position.x<=0||this.position.x>=canvas.width
                              || this.position.y<=0||this.position.y>=canvas.height;
        var playerHitTheOtherPlayer = positionIsInHistory(this.position, otherPlayer.history)
                ||((this.position.x===otherPlayer.position.x)&&(this.position.y===otherPlayer.position.y));
        return playerHitHimself || playerHitTheWalls || playerHitTheOtherPlayer;
      },
      move : function () {
        var oldPosition = createPoint(this.position.x, this.position.y);
        this.history.push(oldPosition);
        this.position.x += this.directionPair.x;
        this.position.y += this.directionPair.y;
      }
    }
    return player;
  }

  function drawMsg(){
      ctx.font = "66px ArcadeFont";
      ctx.fillStyle = '#FFFFFF';
      ctx.textAlign = 'center';
      ctx.fillText("Prepare", canvas.width/2, canvas.height/2);
    }

    function drawInstruction() {
        ctx.font = "24px ArcadeFont";
        ctx.fillStyle = '#888888';
        ctx.textAlign = 'center';
        ctx.fillText("Press  ' ENTER '  to  start", canvas.width/2, canvas.height/2 + 30);
    }

  function resetGame(point){
    isInGame = false;
    //point === 1 -> player1 points ++
    //point === 2 -> player2 points ++
    //трябва да се reset-ват нещата за играчите (без точките)
    //if(достигнат брой точки) - извикване на end screen
    //else reset-ване на играта
  }

  function tronGameLoop (player1, player2) {
    if(isInGame){
        player1.paint();
        player2.paint();
        if (player1.hasCollided(player2)) {
          resetGame(1)
          return;
        }
        if (player2.hasCollided(player1)) {
          resetGame(2);
          return;
        }

        player1.move();
        player2.move();
    }else{
      drawMsg();
      drawInstruction();
    }
  }

  function playTronGame() {

    var direction = {
      "up" : {
        x : 0,
        y : -1
      },
      "down" : {
        x : 0,
        y : 1
      },
      "left" : {
        x : -1,
        y : 0
      },
      "right" : {
        x : 1,
        y : 0
      }
    }

    let canvas = document.getElementById("game-canvas");
    let ctx = canvas.getContext("2d");

    //var player1Keys = keysToIndex("87", "90", "65", "83");
    var player1 = createPlayer(canvas.width/3/cellDimension,
                              canvas.height/2/cellDimension,
                              "#FEFF49",
                              direction.right,
    //                          player1Keys,
                              0);

    //var player2Keys = keysToIndex ("38", "40", "37", "39");
    var player2 = createPlayer(canvas.width/3*2/cellDimension,
                              canvas.height/2/cellDimension,
                              "#00FF40",
                              direction.left,
    //                          player2Keys,
                              0);

     function onKeyDown(e) {
                    //let key = event.which || event.keyCode || 0;
                    //"87", "90", "65", "83"
                    let key = e.keyCode;
                    console.log(key);
                    switch (key) {
                      case 13 :
                          isInGame = true;
                          ctx.clearRect(0,0,600,600);
                          break;
                      case 87 :
                      case 83 :
                      case 65 :
                      case 68 :
                          player1.directionPair = direction[keysToIndex[key]];
                          break;
                      case 38 :
                      case 40 :
                      case 37 :
                      case 39 :
                          player2.directionPair = direction[keysToIndex[key]];
                          break;
                    }
                    // if (player1.keys[key.toString()]!=undefined) {
                    //   player1.direction = direction[player1.keys[key]];
                    // }
                    // if (player2.keys[key.toString()]!=undefined) {
                    //   player2.direction = direction[player2.keys[key+""]];
                    // }
    }

    //initializeNewLevel();
    document.addEventListener("keydown", onKeyDown);

    setInterval(tronGameLoop, speedIndex, player1, player2);
  }


    playTronGame();

}
