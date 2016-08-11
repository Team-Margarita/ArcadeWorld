'use strict';
function tron(){

  const cellDimension = 5;

  function createPoint (x, y){
    var point = {
      x : x,
      y : y
    };
    return point;
  }

  function keysToIndex(keyup, keydown, keyleft, keyright) {
    var keys =  {
      keyup : "up",
      keydown : "down",
      keyleft : "left",
      keyright : "right"
    };
    return keys;
  }

  let direction = {
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

  function createPlayer (startX, startY, playerColor, playerDirection, playerKeys, initialscore, ctx) {

    var player = {
      //name: name,
      position : createPoint(startX, startY),
      history : [],
      color : playerColor,
      directionPair : playerDirection,
      keys : playerKeys,
      score : initialscore,
      draw : function(ctx) {
        ctx.fillStyle = this.playerColor;
        ctx.fillRect(this.position.x * cellDimension, this.position.y * cellDimension, cellDimension, cellDimension);
        console.log(this.position.x+","+this.position.y+","+cellDimension);
      },
      hasCollided : function(otherPlayer) {
        var playerHitHimself = this.history.indexOf(this.position) >=0;
        var playerHitTheWalls = this.position.x<=0||this.position.x>=ctx.width
                              || this.position.y<=0||this.position.y>=ctx.height;
        var playerHitTheOtherPlayer = otherPlayer.history.indexOf(this.position) >=0
        return playerHitHimself || playerHitTheWalls || playerHitTheOtherPlayer;
      },
      move : function () {
        this.history.push(this.position);
        this.position.x += this.directionPlayer.x;
        this.position.y += this.directionPlayer.y;
      }
    }
    return player;
  }

  function drawBoom(point, ctx){
    ctx.fillStyle = '#FF0000';
    ctx.beginPath();
    ctx.arc(point.x, point.y, cellDimension+1,0,2*Math.PI);
  }

  function tronGameLoop (player1, player2, ctx) {
    player1.draw(ctx);
    player2.draw(ctx);
    if (player1.hasCollided) {
      drawBoom(player1.position, ctx);
      return;
    }
    if (player2.hasCollided) {
      drawBoom(player2.position, ctx);
      return;
    }
    player1.move();
    player2.move();
    requestAnimationFrame(tronGameLoop);
  }

  function playTronGame() {

    initializeNewLevel();
    let canvas = document.getElementById("game-canvas");
    let ctx = canvas.getContext("2d");

    var player1Keys = keysToIndex(87, 90, 65, 83);
    var player1 = createPlayer(canvas.width/3/cellDimension,
                              canvas.height/2/cellDimension,
                              '#FEFF49',
                              direction.right,
                              player1Keys,
                              0,
                              ctx );

    var player2Keys = keysToIndex (38, 40, 37, 39);
    var player2 = createPlayer(canvas.width/3*2/cellDimension,
                              canvas.height/2/cellDimension,
                              '#00FF40',
                              direction.left,
                              player2Keys,
                              0,
                              ctx);
    //var gameStarted = false;
    document.addEventListener("keydown", function(event){
                    let key = event.which || event.keyCode || 0;
                    //if (player1.keys.indexOf(key)>=0){
                    if (player1.keys[key]) {
                      player1.direction = player1.keys[key];
                    }
                    // else if (player2.keys.indexOf(key)>=0) {
                    if (player2.keys[key]) {
                      player2.direction = player2.keys[key];
                    }
                    //gameStarted = key==="13";
    }
     , false);

    tronGameLoop(player1, player2, ctx);
  }

  {
    playTronGame();
  }
}
