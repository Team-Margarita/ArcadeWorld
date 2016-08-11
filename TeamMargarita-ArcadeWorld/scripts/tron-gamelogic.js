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

  function createPlayer (startX, startY, playerColor, playerDirection, playerKeys, initialscore) {

    var player = {
      //name: name,
      position : createPoint(startX, startY),
      history : [],
      color : playerColor,
      directionPair : playerDirection,
      keys : playerKeys,
      score : initialscore,
      draw : function() {
        let canvas = document.getElementById("game-canvas");
        let ctx = canvas.getContext("2d");
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.fillRect(this.position.x * cellDimension, this.position.y * cellDimension, cellDimension, cellDimension);
        ctx.fill();
        ctx.closePath();
        console.log(this.position.x+","+this.position.y+","+cellDimension+","+this.playerColor);
      },
      hasCollided : function(otherPlayer) {
        let canvas = document.getElementById("game-canvas");
        let ctx = canvas.getContext("2d");
        var playerHitHimself = this.history.indexOf(this.position) >=0;
        var playerHitTheWalls = this.position.x<=0||this.position.x>=canvas.width
                              || this.position.y<=0||this.position.y>=canvas.height;
        var playerHitTheOtherPlayer = otherPlayer.history.indexOf(this.position) >=0
        return playerHitHimself || playerHitTheWalls || playerHitTheOtherPlayer;
      },
      move : function () {
        this.history.push(this.position);
        this.position.x += this.playerDirection.x;
        this.position.y += this.playerDirection.y;
      }
    }
    return player;
  }

  function drawBoom(point){
    let canvas = document.getElementById("game-canvas");
    let ctx = canvas.getContext("2d");
    ctx.beginPath();
    ctx.fillStyle = '#FF0000';
    ctx.arc(point.x*cellDimension, point.y*cellDimension, cellDimension+1,0,2*Math.PI);
    ctx.fill();
    ctx.closePath();
  }

  function tronGameLoop (player1, player2) {
    player1.draw();
    player2.draw();
    if (player1.hasCollided(player2)) {
      drawBoom(player1.position);
      //return;
    }
    if (player2.hasCollided(player1)) {
      drawBoom(player2.position);
      //return;
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
                              "#FEFF49",
                              direction.right,
                              player1Keys,
                              0);

    var player2Keys = keysToIndex (38, 40, 37, 39);
    var player2 = createPlayer(canvas.width/3*2/cellDimension,
                              canvas.height/2/cellDimension,
                              "#00FF40",
                              direction.left,
                              player2Keys,
                              0);
    //var gameStarted = false;
    document.addEventListener("keydown", function(event){
                    let key = event.which || event.keyCode || 0;
                    //if (player1.keys.indexOf(key)>=0){
                    if (player1.keys[key]!=null) {
                      player1.direction = player1.keys[key];
                    }
                    // else if (player2.keys.indexOf(key)>=0) {
                    if (player2.keys[key]!=null) {
                      player2.direction = player2.keys[key];
                    }
                    //gameStarted = key==="13";
    }
     , false);

    tronGameLoop(player1, player2);
  }

  {
    playTronGame();
  }
}
