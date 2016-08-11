'use strict';
function tron(){

  const cellDimension = 10;
  const pointsPerWin = 20;
  const speedIndex = 300;

  function createPoint (x, y){
    var point = {
      x : x,
      y : y
    };
    return point;
  }

  function waitForKey(){
    var key=0;

    document.addEventListener('keydown', keyDownAny);
    function keyPressed(e){
      key = e.keyCode;
      console.log(key);
    }
    while(!key)
      {}
    document.removeEventListener('keypress', keyPressed);
  }

  function printOnCanvas(textToPrint) {
    let canvas = document.getElementById("game-canvas");
    let ctx = canvas.getContext("2d");

    ctx.font = "24px ArcadeFont";
    ctx.fillStyle = '#888888';
    ctx.textAlign = 'center';
    ctx.fillText(textToPrint, canvas.width/2, canvas.height/2);
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
        let canvas = document.getElementById("game-canvas");
        let ctx = canvas.getContext("2d");
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

  function paintBoom(point){
    const boomW = 50;
    const boomH = 50;
    let canvas = document.getElementById("game-canvas");
    let ctx = canvas.getContext("2d");
    //let boom = new Image();
    //boom.src = './images/boom.png';
    //ctx.drawImage(boom, point.x*cellDimension, point.y*cellDimension, boomW, boomH);
    ctx.beginPath();
    ctx.fillStyle = '#FF0000';
    ctx.arc(point.x*cellDimension, point.y*cellDimension, cellDimension*2,0,2*Math.PI);
    ctx.fill();
    ctx.closePath();
  }

  function tronGameLoop (player1, player2) {
        player1.paint();
        player2.paint();
        player1.move();
        player2.move();

        if (player1.hasCollided(player2)&&player2.hasCollided(player1)) {
          paintBoom(player1.position);
        }
        else if (player1.hasCollided(player2)) {
          player2.wins += 1;
          paintBoom(player1.position);
          return;
        }
        if (player2.hasCollided(player1)) {
          paintBoom(player2.position);
          return;
        }

        //setTimeout(tronGameLoop (player1, player2), 500);

        //requestAnimationFrame(tronGameLoop(player1, player2));
  }

  function playTronGame(wins1, wins2) {

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
                              wins1);

    //var player2Keys = keysToIndex ("38", "40", "37", "39");
    var player2 = createPlayer(canvas.width/3*2/cellDimension,
                              canvas.height/2/cellDimension,
                              "#00FF40",
                              direction.left,
    //                          player2Keys,
                              wins2);

     function onKeyDown(e) {
                    //let key = event.which || event.keyCode || 0;
                    //"87", "90", "65", "83"
                    let key = e.keyCode;
                    console.log(key);
                    console.log(direction[keysToIndex[key]]);
                    switch (key) {
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

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    document.addEventListener("keydown", onKeyDown);

    var interval = setInterval(tronGameLoop, speedIndex, player1, player2);

    function tronGameLoop (player1, player2) {
          player1.paint();
          player2.paint();

          if (player1.hasCollided(player2)&&player2.hasCollided(player1)) {
            paintBoom(player1.position);
            return;
          }
          else if (player1.hasCollided(player2)) {
            paintBoom(player1.position);
            player2.wins += 1;
            return;
          }
          if (player2.hasCollided(player1)) {
            paintBoom(player2.position);
            player1.wins += 1;
            return;
          }
          player1.move();
          player2.move();
          // if (player1.hasCollided(player2)||player2.hasCollided(player1)) {
          //   document.removeEventListener("keydown", onKeyDown);
          //   if (player1.wins>=3||player2.wins>=3) {
          //     //final screen with results player__.wins*pointsPerWin;
          //     var winner = player1.wins>player2.wins ? 1 : 2;
          //     printOnCanvas("Tron winner is player" + winner);
          //     //waitForKey();
          //     clearInterval(interval);
          //   }
          //   else {
          //     printOnCanvas("Press a key to play again");
          //     //waitForKey();
          //     clearInterval(interval);
          //     playTronGame(player1.wins, player2.wins);
          //   }
          //
          // }
    }
  }


    playTronGame(0, 0);

}
