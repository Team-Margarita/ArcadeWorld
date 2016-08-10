'use strict';
function tron(){
  //LOGIC FOR PING PONG HERE
  //За момента може да слагате в state-a, където свършва играта един alert, като после
  //ще се нагоди връзката между игрите
  //Canvas-a е с размер 600x600

  // Ако искате да си тествате само конкретната игра в game-initialize.js извиквайте тази функция

  //  let canvas = document.getElementById("game-canvas");
  //  let ctx = canvas.getContext("2d");

  const cellDimension = 5;

  function createPoint (x, y){
    return {
      x : x,
      y : y
    }
  }

  function createKeys(up, down, left, right) {
    return {
      up : up,
      down : down,
      left : left,
      right : right
    }
  }

  let direction = {
    up : {
      x : 0,
      y : -1
    },
    down : {
      x : 0,
      y : 1
    },
    left : {
      x : -1,
      y : 0
    },
    right : {
      x : 1,
      y : 0
    }
  }

  function Player (startX, startY, color, direction, keys, initialscore, ctx) {
    return
    {
      //name: name,
      position : createPoint(startX, startY),
      history : [].push(this.position),
      color : color,
      direction : direction,
      keys : keys,
      score = initialscore,
      // hasCollision : false,
      draw : function(ctx) {
        ctx.fillStyle = color;
        ctx.fillRect(this.position.x * cellDimension, this.position.y * cellDimension, cellDimension, cellDimension);
      },
      detectCollision : function() {

      },
      move : function () {
        this.position.x += this.direction.x;
        this.position.y += this.direction.y;
      };
    }



  }

  function tronGameLoop (player1, player2) {
    player1.draw();
    player2.draw();
    requestAnimationFrame(tronGameLoop);
  }

  function playTronGame() {
    function onKeyDowninTron(e)
    {
      let key = e.which || e.keyCode || 0;

    }

    initializeNewLevel();
    let canvas = document.getElementById("game-canvas");
    let ctx = canvas.getContext("2d");

    var player1 = new Player(canvas.width/3,
                              canvas.height/2,
                              '#FEFF49',
                              direction.right,
                              createKeys(87, 90, 65, 83),
                              0,
                              ctx );

    var player2 = new Player(canvas.width/3*2,
                              canvas.height/2,
                              '#00FF40',
                              direction.left,
                              createKeys(38, 40, 37, 39),
                              0,
                              ctx);
    document.addEventListener("keydown", onKeyDowninTron, false);

    tronGameLoop(player1, player2);
  }

  {
    playTronGame();
  }
}
