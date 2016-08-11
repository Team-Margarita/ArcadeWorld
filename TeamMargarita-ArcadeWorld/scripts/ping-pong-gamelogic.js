function pingPong() {

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
        ctx.arc(ballX, ballY, 10, 0, 2 * Math.PI);
        ctx.fillStyle = 'red';
        ctx.fill();
        ctx.closePath();
    }

    function drawPaddle(x, y) {
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
        ctx.fillText("First  Player  Score   " + firstPLayerScore, 10, 35, 250);

    }

    function drawSecondPlayerScore() {
        ctx.font = "32px ArcadeFont";
        ctx.fillStyle = "#FFFFFF";
        ctx.textAlign = 'left';
        ctx.fillText("Second  Player  Score   " + secondPlayerScore, canvas.width / 2 + 30, 35, 250);
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
        ctx.fillStyle = 'blue';
        ctx.textAlign = 'center';
        ctx.fillText("Prepare", canvas.width/2, canvas.height/2);
      }

      function drawInstruction() {
          ctx.font = "24px ArcadeFont";
          ctx.fillStyle = '#888888';
          ctx.textAlign = 'center';
          ctx.fillText("Press  ' ENTER '  to  start", canvas.width/2, canvas.height/2 + 30);
      }

    //events
    document.addEventListener("keydown", onKeyDown, false);
    document.addEventListener("keyup", onKeyUp, false);

    function onKeyDown(e) {
        key = e.which;
        switch (key) {
            case (38): // upKey
                upArrowPressed = true;
                downArrowPressed = false;
                break;
            case (40): // downKey
                downArrowPressed = true;
                upArrowPressed = false;
                break;
            case (87): // wKey
                wKeyPressed = true;
                sKeyPressed = false;
                break;
            case (83): // sKey
                sKeyPressed = true;
                wKeyPressed = false;
                break;
            case (13): // enter 
                startPressed = true;    
        }
    }

    function onKeyUp(e) {
        key = e.which;
        switch (key) {
            case (38): // upKey
                upArrowPressed = false;
                break;
            case (40): // downKey
                downArrowPressed = false;
                break;
            case (87): // wKey
                wKeyPressed = false;
                break;
            case (83): // sKey
                sKeyPressed = false;
                break;
        }
    }


    // update Cords functions
    function updatePaddleCords() {
        if (upArrowPressed) {
            if (secondPlayerPaddleY > 55) {
                secondPlayerPaddleY -= 5;
            }
        }
        if (downArrowPressed) {
            if (secondPlayerPaddleY < canvas.height - paddleHeight) {
                secondPlayerPaddleY += 5;
            }
        }
        if (wKeyPressed) {
            if (firstPlayerPaddleY > 55) {
                firstPlayerPaddleY -= 5;
            }
        }
        if (sKeyPressed) {
            if (firstPlayerPaddleY < canvas.height - paddleHeight) {
                firstPlayerPaddleY += 5;
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
        if (ballX + ballDeltaX < paddleWidh + 10 || ballX + ballDeltaX > canvas.width - paddleWidh - 10) {
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
        if (firstPLayerScore >= 10 || secondPlayerScore >= 10) {
            callNextLvl();
            clearInterval(loop);
        }
    }

    function callNextLvl() {
        updateScoreBoard(1, firstPLayerScore * 5);
        updateScoreBoard(2, secondPlayerScore * 5);
        initializeNewLevel();
        endScreen(); // CALL NEXT GAME
    }


    function GameLoop() {
        ctx.clearRect(0, 0, 600, 600);
        if (startPressed){
        drawFirstPlayerScore();
        drawSecondPlayerScore();
        drawUpperBound();
        updatePaddleCords();
        collisionCheck();
        CheckPlayersScore();
        updateBall()
        drawBall();
        drawPaddle(firstPLayerpaddleX, firstPlayerPaddleY);
        drawPaddle(secondPlayerPaddleX, secondPlayerPaddleY);
        }
        else{
            drawMsg();
            drawInstruction();
        }
    }


    loop = setInterval(GameLoop, 25);
    setInterval(SpeedUp, 10000);
}
