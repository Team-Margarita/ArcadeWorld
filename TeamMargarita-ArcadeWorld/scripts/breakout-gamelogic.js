'use strict';

function breakOut() {
  let playerId = 1;
  let canvas = document.getElementById("game-canvas");
  let ctx = canvas.getContext("2d");
  //general
  let score = 0,
      lives = 6;
  //paddle
  let paddleHeight = 20,
      paddleWidth = 90,
      paddleX = (canvas.width-paddleWidth)/2;
  //ball
  let squareSide = 20;
  //block
  let blockRows = 6,
      blockColumns = 5,
      blockWidth = 90,
      blockHeight = 25,
      blockPadding = 8,
      blockOffsetTop = 60,
      blockOffsetLeft = 10;
  //hearts
  let heartWidth = 22,
      heartOffset = 10;
  //coordinates and speed of paddle and ball
  let x = paddleX + paddleWidth/2,
      y = canvas.height - (paddleHeight + squareSide),
      dx = 3,
      dy = -3;
  //keys states
  let rightPressed = false,
      leftPressed = false,
      startPressed = false;
  // building lives
  let hearts = [];
  for (let l = 0; l < 3; l+=1) {
    hearts[l] = { x: 0, y: 0, status: 1};
  }
  //building blocks
  let blocks = [];
  for(let c = 0; c<blockColumns; c++) {
      blocks[c] = [];
      for(let r = 0; r<blockRows; r++) {
          if(c === 0){
            blocks[c][r] = { x: 0, y: 0, status: 3 };
          }else if(c === 1 || c === 2){
            blocks[c][r] = { x: 0, y: 0, status: 2 };
          }
          else{
          blocks[c][r] = { x: 0, y: 0, status: 1 };
          }
      }
  }

  //EVENTS FOR KEYBINDINGS
  document.addEventListener("keydown", onKeyDown, false);
  document.addEventListener("keyup", onKeyUp, false);

  function onKeyDown(e) {
      if(e.keyCode === 37) {
          leftPressed = true;
      }
      else if(e.keyCode === 39) {
          rightPressed = true;
      }
      else if(e.keyCode === 13 && canvas){
        startPressed = true;
      }
  }
  function onKeyUp(e) {
      if(e.keyCode === 37) {
          leftPressed = false;
      }
      else if(e.keyCode === 39) {
          rightPressed = false;
      }
  }

  //COLLISION FOR BLOCKS AND BALL
  function collisionDetection() {
      for(let c = 0; c<blockColumns; c+=1) {
          for(let r = 0; r<blockRows; r+=1) {
              let b = blocks[c][r];
              if(b.status !== 0) {
                  if(x > b.x && x < b.x+blockWidth && y > b.y && y < b.y+blockHeight) {
                      dy = -dy;
                      b.status -= 1;
                      if(b.status === 0)
                      {
                          score += 1;
                      }
                      if(score === blockRows * blockColumns) {
                          if(playerId === 2){
                            console.log('1');
                            callNextLvl();
                          }else{
                            console.log('2');
                          endTurn();
                          }
                      }
                  }
              }
          }
      }
  }

  //DRAW FUNCTIONS
  function drawSquare() {
      ctx.beginPath();
      ctx.rect(x, y, squareSide, squareSide);
      ctx.fillStyle = "#FFFFFF";
      ctx.fill();
      ctx.closePath();
  }
  function drawPaddle() {
      ctx.beginPath();
      ctx.rect(paddleX, canvas.height-paddleHeight, paddleWidth, paddleHeight);
      if(playerId === 1){
      ctx.fillStyle = '#DD0000';
      }else{
      ctx.fillStyle = '#0000DD';
      }
      ctx.fill();
      ctx.closePath();
  }
  function drawLives(){
    for (let l = 1; l <= 3; l+=1) {
              let livesX = canvas.width - l*(heartOffset + heartWidth);
              let livesY = 15;
              ctx.beginPath();
              ctx.moveTo(livesX, livesY);
              ctx.lineTo(livesX + 0, livesY + 4);
              ctx.lineTo(livesX + 2, livesY + 4);
              ctx.lineTo(livesX + 2, livesY + 2);
              ctx.lineTo(livesX + 4, livesY + 2);
              ctx.lineTo(livesX + 4, livesY + 0);
              ctx.lineTo(livesX + 8, livesY + 0);
              ctx.lineTo(livesX + 8, livesY + 2);
              ctx.lineTo(livesX + 10, livesY + 2);
              ctx.lineTo(livesX + 10, livesY + 4);
              ctx.lineTo(livesX + 12, livesY + 4);
              ctx.lineTo(livesX + 12, livesY + 2);
              ctx.lineTo(livesX + 14, livesY + 2);
              ctx.lineTo(livesX + 14, livesY + 0);
              ctx.lineTo(livesX + 18, livesY + 0);
              ctx.lineTo(livesX + 18, livesY + 2);
              ctx.lineTo(livesX + 20, livesY + 2);
              ctx.lineTo(livesX + 20, livesY + 4);
              ctx.lineTo(livesX + 22, livesY + 4);
              ctx.lineTo(livesX + 22, livesY + 10);
              ctx.lineTo(livesX + 20, livesY + 10);
              ctx.lineTo(livesX + 20, livesY + 12);
              ctx.lineTo(livesX + 18, livesY + 12);
              ctx.lineTo(livesX + 18, livesY + 14);
              ctx.lineTo(livesX + 16, livesY + 14);
              ctx.lineTo(livesX + 16, livesY + 16);
              ctx.lineTo(livesX + 14, livesY + 16);
              ctx.lineTo(livesX + 14, livesY + 18);
              ctx.lineTo(livesX + 12, livesY + 18);
              ctx.lineTo(livesX + 12, livesY + 20);
              ctx.lineTo(livesX + 10, livesY + 20);
              ctx.lineTo(livesX + 10, livesY + 18);
              ctx.lineTo(livesX + 8, livesY + 18);
              ctx.lineTo(livesX + 8, livesY + 16);
              ctx.lineTo(livesX + 6, livesY + 16);
              ctx.lineTo(livesX + 6, livesY + 14);
              ctx.lineTo(livesX + 4, livesY + 14);
              ctx.lineTo(livesX + 4, livesY + 12);
              ctx.lineTo(livesX + 2, livesY + 12);
              ctx.lineTo(livesX + 2, livesY + 10);
              ctx.lineTo(livesX + 0, livesY + 8);
              if(hearts[l - 1].status === 1){
                ctx.fillStyle = "#DD0000";
              }else if(hearts[l - 1].status === 0)
              {
                ctx.fillStyle = "#BBBBBB";
              }
              ctx.fill();
              ctx.closePath()

    }
  }
  function drawBlocks() {
      for(let c = 0; c<blockColumns; c++) {
          for(let r = 0; r<blockRows; r++) {
              if(blocks[c][r].status !== 0) {
                  let blockX = (r*(blockWidth+blockPadding)) + blockOffsetLeft;
                  let blockY = (c*(blockHeight+blockPadding)) + blockOffsetTop;
                  blocks[c][r].x = blockX;
                  blocks[c][r].y = blockY;
                  ctx.beginPath();
                  ctx.rect(blockX, blockY, blockWidth, blockHeight);
                  if(blocks[c][r].status === 3){
                    ctx.fillStyle = "#666666";
                  }else if(blocks[c][r].status === 2){
                    ctx.fillStyle = "#BBBBBB";
                  }
                  else
                  {
                    ctx.fillStyle = "#FFFFFF";
                  }
                  ctx.fill();
                  ctx.closePath();
              }
          }
      }
  }
  function drawScore() {
      ctx.font = "32px ArcadeFont";
      ctx.fillStyle = "#FFFFFF";
      ctx.fillText("Score  "+score, 10, 35);
  }
  function drawPlayerOnTurn() {
      ctx.font = "32px ArcadeFont";
      if(playerId === 1){
      ctx.fillStyle = '#DD0000';
      }else{
      ctx.fillStyle = '#0000DD';
      }
      ctx.fillText("Player " + playerId, canvas.width/2 - 40, 35);
  }

  function drawUpperBound(){
    ctx.beginPath();
    ctx.moveTo(0, blockOffsetTop - 10);
    ctx.lineTo(600, blockOffsetTop - 10);
    ctx.strokeStyle= '#FFFFFF';
    ctx.stroke();
  }

  //DRAW LOOP
  function gameLoop() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      if(!startPressed){
        startScreen(playerId, startPressed);
      }
      else
      {
      drawBlocks();
      drawSquare();
      drawPaddle();
      drawScore();
      drawLives();
      drawPlayerOnTurn();
      drawUpperBound();
      collisionDetection();

      if(x + dx > canvas.width - squareSide || x + dx < 0) {
          dx = -dx;
      }
      if(y + dy < blockOffsetTop) {
          dy = -dy;
      }
      if(y + dy > canvas.height - squareSide - paddleHeight) {
          if(x > paddleX && x < paddleX + paddleWidth) {
              dy = -dy;
          }
          else {
              lives--;
              if(!lives) {
                console.log('3');
                  callNextLvl();
              }
              if(lives === 3 && playerId === 1){
                endTurn();
              }else
              {
                if(lives > 3 && lives < 6){
                  hearts[lives-3].status = 0;
                }else if(lives < 4 && lives > 0){
                  hearts[lives].status = 0;
                }
                  paddleX = (canvas.width-paddleWidth)/2;
                  x = paddleX + paddleWidth/2;
                  y = canvas.height - (paddleHeight + squareSide + 10);
                  dx = 3;
                  dy = -3;
              }
            }
          }

      if(rightPressed && paddleX < canvas.width-paddleWidth) {
          paddleX += 7;
      }
      if(leftPressed && paddleX > 0) {
          paddleX -= 7;
      }

      x += dx;
      y += dy;
      }
      requestAnimationFrame(gameLoop);
  }

  //SPEED UP EVERY 10 SEC
  setInterval(speedUp, 10000);

  function speedUp(){
    dx *= 1.1;
    dy *= 1.1;
  }

  function callNextLvl(){
    updateScoreBoard(playerId, score);
    initializeNewLevel();
    snake();

  }

  function endTurn(){
      updateScoreBoard(playerId, score);
      reset();
  }

  //RESET ON VALUES BETWEEN PLAYER'S TURNS
  function reset(){
    //general
    startPressed = false;
    score = 0;
    lives = 3;
    playerId = 2;
    //paddle
    paddleX = (canvas.width-paddleWidth)/2;
    //coordinates and speed of paddle and ball
    x = paddleX + paddleWidth/2;
    y = canvas.height - (paddleHeight + squareSide);
    dx = 3;
    dy = -3;
    //building blocks
    blocks = [];
    for(let c = 0; c<blockColumns; c++) {
        blocks[c] = [];
        for(let r = 0; r<blockRows; r++) {
          if(c === 0){
            blocks[c][r] = { x: 0, y: 0, status: 3 };
          }else if(c === 1 || c === 2){
            blocks[c][r] = { x: 0, y: 0, status: 2 };
          }
          else{
          blocks[c][r] = { x: 0, y: 0, status: 1 };
          }
        }
    }
    //building heartslet
    for (let l = 0; l < lives; l+=1) {
      hearts[l].status = 1;
    }
  }

  gameLoop();

}
