function pingPong() {

    // constants

    const firstPlayerDownKey = 83,
        firstPlayerUpKey = 87,
        secondPlayerDownKey = 40,
        secondPlayerUpKey = 38,
        startKey = 13,
        paddleSpeed = 5;


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
        ballDeltaY = 3.5;


    // draw functions
    function drawBall() {
        ctx.beginPath();
        ctx.rect(ballX, ballY, 20, 20);
        ctx.fillStyle = '#FFFFFF';
        ctx.fill();
        ctx.closePath();
    }

    function drawPaddle(playerId, x, y) {
        ctx.beginPath();
        ctx.rect(x, y, paddleWidh, paddleHeight);
        if(playerId === 1){
        ctx.fillStyle = '#DD0000';
        }else if(playerId === 2){
          ctx.fillStyle = '#0000DD';
        }
        ctx.fill();
        ctx.closePath();
    }

    function drawFirstPlayer() {
        ctx.font = "32px ArcadeFont";
        ctx.fillStyle = "#DD0000";
        ctx.textAlign = 'left';
        ctx.fillText("Player 1 ", 10, 35, 250);
    }

    function drawSecondPlayer() {
        ctx.font = "32px ArcadeFont";
        ctx.fillStyle = "#0000DD";
        ctx.textAlign = 'right';
        ctx.fillText("Player 2 ", canvas.width - 10, 35, 250);
    }

    function drawScore() {
        ctx.font = "32px ArcadeFont";
        ctx.fillStyle = "#FFFFFF";
        ctx.textAlign = 'left';
        ctx.fillText(firstPLayerScore, canvas.width / 2 - 50, 35);
        ctx.fillText(secondPlayerScore, canvas.width / 2 + 30, 35);
    }

    function drawUpperBound() {
        ctx.beginPath();
        ctx.moveTo(0, 50);
        ctx.lineTo(600, 50);
        ctx.strokeStyle = '#FFFFFF';
        ctx.stroke();
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

      function drawGameName() {
          ctx.font = "50px ArcadeFont";
          ctx.fillStyle = '#888888';
          ctx.textAlign = 'center';
          ctx.fillText("PING PONG", canvas.width/2, canvas.height/2 - 58);
      }

    //events
    document.addEventListener("keydown", onKeyDown, false);
    document.addEventListener("keyup", onKeyUp, false);

    function onKeyDown(e) {
        key = e.which;
        switch (key) {
            case (secondPlayerUpKey):
                upArrowPressed = true;
                downArrowPressed = false;
                break;
            case (secondPlayerDownKey):
                downArrowPressed = true;
                upArrowPressed = false;
                break;
            case (firstPlayerUpKey):
                wKeyPressed = true;
                sKeyPressed = false;
                break;
            case (firstPlayerDownKey):
                sKeyPressed = true;
                wKeyPressed = false;
                break;
            case (startKey):
                startPressed = true;
        }
    }

    function onKeyUp(e) {
        key = e.which;
        switch (key) {
            case (secondPlayerUpKey):
                upArrowPressed = false;
                break;
            case (secondPlayerDownKey):
                downArrowPressed = false;
                break;
            case (firstPlayerUpKey):
                wKeyPressed = false;
                break;
            case (firstPlayerDownKey):
                sKeyPressed = false;
                break;
        }
    }

    // update Cords functions
    function updatePaddleCords() {
        if (upArrowPressed) {
            if (secondPlayerPaddleY > 55) {
                secondPlayerPaddleY -= paddleSpeed;
            }
        }
        if (downArrowPressed) {
            if (secondPlayerPaddleY < canvas.height - paddleHeight) {
                secondPlayerPaddleY += paddleSpeed;
            }
        }
        if (wKeyPressed) {
            if (firstPlayerPaddleY > 55) {
                firstPlayerPaddleY -= paddleSpeed;
            }
        }
        if (sKeyPressed) {
            if (firstPlayerPaddleY < canvas.height - paddleHeight) {
                firstPlayerPaddleY += paddleSpeed;
            }
        }
    }

    function updateBall() {
        if (ballDeltaY + ballY > canvas.height - 5 || ballDeltaY + ballY < 60) {
            ballDeltaY *= -1;
        }
        ballY += ballDeltaY;
        ballX += ballDeltaX;
    }

    // resseting field for nextGame
    function reset(){
      let randomDirection = Math.floor(Math.random()*4+1);
      if(randomDirection === 1){
        ballDeltaX = 3,
        ballDeltaY = 3.5;
      }else if(randomDirection === 2){
        ballDeltaX = -3,
        ballDeltaY = 3.5;
      }else if(randomDirection === 2){
        ballDeltaX = -3,
        ballDeltaY = -3.5;
      }else{
        ballDeltaX = 3,
        ballDeltaY = -3.5;
      }
        ballX = canvas.width / 2;
        ballY = canvas.height / 2;
        secondPlayerPaddleX = canvas.width - paddleWidh;
        secondPlayerPaddleY = canvas.height / 2 - paddleHeight / 2;
        firstPLayerpaddleX = 0;
        firstPlayerPaddleY = canvas.height / 2 - paddleHeight / 2;
        startPressed = false;
    }

    // check for collision with player paddle if no adding points
    function collisionCheck() {

        if (ballX + ballDeltaX < paddleWidh || ballX + ballDeltaX > canvas.width - paddleWidh - 15) {
            ballDeltaX *= -1;
            if (((ballY + ballDeltaY < firstPlayerPaddleY ||
                    ballY + ballDeltaY > firstPlayerPaddleY + paddleHeight) && ballDeltaX > 0) ||
                ((ballY + ballDeltaY < secondPlayerPaddleY ||
                    ballY + ballDeltaY > secondPlayerPaddleY + paddleHeight) && ballDeltaX < 0)) {
                ballDeltaX *= -1;
            }
        }

        if (ballX + ballDeltaX < 0) {
            secondPlayerScore += 1;
            reset();

        } else if (ballX + ballDeltaX > canvas.width) {
            firstPLayerScore += 1;
            reset();
        }

    }

    function SpeedUp(){
        ballDeltaX *= 1.2;
        ballDeltaY *= 1.2;
    }

    function CheckPlayersScore() {
        if (firstPLayerScore >= 5 || secondPlayerScore >= 5) {
            callNextLvl();
        }
    }

    function callNextLvl() {
        updateScoreBoard(firstPLayerScore * 10, secondPlayerScore * 10);
        initializeNewLevel();
        endScreen(); // CALL NEXT GAME
    }

    function GameLoop() {
        ctx.clearRect(0, 0, 600, 600);
        if (startPressed){
        drawFirstPlayer();
        drawSecondPlayer();
        drawScore();
        drawUpperBound();
        updatePaddleCords();
        collisionCheck();
        CheckPlayersScore();
        updateBall()
        drawBall();
        drawPaddle(1, firstPLayerpaddleX, firstPlayerPaddleY);
        drawPaddle(2, secondPlayerPaddleX, secondPlayerPaddleY);
        }
        else{
            drawGameName();
            drawMsg();
            drawInstruction();
            reset();
        }

        requestAnimationFrame(GameLoop);
    }

    setInterval(SpeedUp, 5000);
    GameLoop();

}
