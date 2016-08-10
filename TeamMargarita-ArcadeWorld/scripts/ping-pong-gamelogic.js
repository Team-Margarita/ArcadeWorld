function pingPong(){
  //LOGIC FOR PING PONG HERE
  //За момента може да слагате в state-a, където свършва играта един alert, като после
  //ще се нагоди връзката между игрите
  //Canvas-a е с размер 600x600

  // Ако искате да си тествате само конкретната игра в game-initialize.js извиквайте тази функция

  let canvas = document.getElementById("game-canvas");
  let ctx = canvas.getContext("2d");

  let firstPLayerScore = 0,
      secondPlayerScore = 0;

  // keys states
  let startPressed = false,
      downArrowPressed = false,
      upArrowPressed = false,
      wKeyPressed = false,    
      sKeyPressed = false;

  // Paddels cords
  let paddleWidh = 20,
      paddleHeight = 75;

  // Firs player paddle cords
  let firstPLayerpaddleX = 0,
      firstPlayerPaddleY = canvas.height / 2 - paddleHeight / 2;

  // Second player paddle cords
  let secondPlayerPaddleX = canvas.width - paddleWidh,
      secondPlayerPaddleY = canvas.height / 2 - paddleHeight / 2;

  //ball cords
  let ballX = canvas.width / 2,
      ballY = canvas.height / 2;

  let ballDeltaX = 3,
      ballDeltaY = 3;


  // draw functions
  function drawBall(){
    ctx.beginPath();
    ctx.arc(ballX, ballY, 10, 0, 2 * Math.PI);
    ctx.fillStyle = 'red';
    ctx.fill();
    ctx.closePath();
  }

  function drawPaddle(x, y){
    ctx.beginPath();
    ctx.rect(x, y, paddleWidh, paddleHeight);
    ctx.fillStyle = 'blue';
    ctx.fill();   
    ctx.closePath();
  }  

  function drawFirstPlayerScore() {
      ctx.font = "32px ArcadeFont";
      ctx.fillStyle = "#FFFFFF";
      ctx.textAlign = 'left';
      ctx.fillText("FirstPlayerScore  " + firstPLayerScore, 10, 35);
      
  }

  function drawSecondPlayerScore() {
      ctx.font = "32px ArcadeFont";
      ctx.fillStyle = "#FFFFFF";
      ctx.textAlign = 'left';
      ctx.fillText("SecondPlayerScore  " + secondPlayerScore, canvas.width / 2 + 50, 35);
  }

  function drawPrepeareMsg() {
      ctx.font = "32px ArcadeFont";
      if(playerId === 1){
      ctx.fillStyle = '#DD0000';
      }else{
      ctx.fillStyle = '#0000DD';
      }
      ctx.textAlign = 'center';
      ctx.fillText("Preapare" , canvas.width/2, 35);
  }
  function drawUpperBound(){
    ctx.beginPath();
    ctx.moveTo(0, 50);
    ctx.lineTo(600, 50);
    ctx.strokeStyle= '#FFFFFF';
    ctx.stroke();
  }

  //events
  document.addEventListener("keydown", onKeyDown, false);
  document.addEventListener("keyup", onKeyUp, false);
  function onKeyDown(e){
    key = e.which;
    switch(key){
      case(38): // upKey
        upArrowPressed = true;
        downArrowPressed = false;
        break;
      case(40): // downKey
        downArrowPressed = true;
        upArrowPressed = false;
        break;
      case(87): // wKey
        wKeyPressed = true;
        sKeyPressed = false;
        break; 
      case(83): // sKey
        sKeyPressed = true;
        wKeyPressed = false;
        break;
    }
  }

  function onKeyUp(e){
    key = e.which;
    switch(key){
      case(38): // upKey
        upArrowPressed = false;
        break;
      case(40): // downKey
        downArrowPressed = false;
        break;
      case(87): // wKey
        wKeyPressed = false;
        break; 
      case(83): // sKey
        sKeyPressed = false;
        break; 
    }
  }

  // update Cords functions
  function updatePaddleCords(){
    if (upArrowPressed){
      if (secondPlayerPaddleY > 55){
        secondPlayerPaddleY -= 5;
      }
    }
    if (downArrowPressed){
      if (secondPlayerPaddleY < canvas.height - paddleHeight){
        secondPlayerPaddleY += 5;     
      }
    }
    if (wKeyPressed){
      if (firstPlayerPaddleY > 55){      
        firstPlayerPaddleY -= 5;
      }
    }
    if (sKeyPressed){
      if (firstPlayerPaddleY < canvas.height - paddleHeight){      
        firstPlayerPaddleY += 5;      
      }
    }
  }

  function updateBall(){
    if(ballDeltaY + ballY > canvas.height - 5 || ballDeltaY + ballY < 60){
      ballDeltaY *= -1;     
    }   
    ballY += ballDeltaY;
    ballX += ballDeltaX;
  }


  // check for collision with player paddle 
  function collisionCheck(){
    if(ballX + ballDeltaX < paddleWidh + 10 || ballX + ballDeltaX > canvas.width - paddleWidh - 10){
      ballDeltaX *= -1;
      if(((ballY + ballDeltaY < firstPlayerPaddleY || 
         ballY + ballDeltaY > firstPlayerPaddleY + paddleHeight) && ballDeltaX > 0) ||
         ((ballY + ballDeltaY < secondPlayerPaddleY || 
         ballY + ballDeltaY > secondPlayerPaddleY + paddleHeight)  && ballDeltaX < 0)){
           ballDeltaX *= -1;
      }
    }

    if(ballX + ballDeltaX < 0){
      secondPlayerScore += 1;
      ballX = canvas.width / 2;
      ballY = canvas.height /2;
    }
    else if(ballX + ballDeltaX > canvas.width){
      firstPLayerScore += 1;
      ballX = canvas.width / 2;
      ballY = canvas.height /2;
    }
  }
  
   function TestFunction(){
      ctx.clearRect(0, 0, 600, 600);
      //drawPrepeareMsg();
      drawFirstPlayerScore();
      drawSecondPlayerScore();
      drawUpperBound();      
      updatePaddleCords();
      collisionCheck();
      updateBall()
      drawBall();
      drawPaddle(firstPLayerpaddleX,firstPlayerPaddleY);
      drawPaddle(secondPlayerPaddleX, secondPlayerPaddleY);
   }
  
  
   setInterval(TestFunction, 5);
}
