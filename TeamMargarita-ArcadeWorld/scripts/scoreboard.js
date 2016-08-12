function createSvgRectangle(){
  var svgNS = 'http://www.w3.org/2000/svg';
  var rect = document.createElementNS(svgNS, 'rect');
  rect.setAttribute('x', 300);
  rect.setAttribute('y', 0);
  rect.setAttribute('width', 600);
  rect.setAttribute('height', 50);
  rect.setAttribute('id', 'score-rect');
  document.getElementById('score-board').appendChild(rect);
}

function updateScoreBoard(player1scoreToAdd, player2scoreToAdd){
  console.log('here');
    player1Score = $("#player1-score").text() | 0;
    player2Score = $("#player2-score").text() | 0;

    player1Score += player1scoreToAdd;
    player2Score += player2scoreToAdd;

    let denominator = player1Score + player2Score;
    let ratio = Math.round((player1Score / denominator) * 100);
    let ratioBar = ratio * 6;
    let dX = 2;
    let rect = document.getElementById('score-rect');
    let oldRatioBar = +rect.getAttribute('x');

    oldRatioBar > ratioBar ? dX = -2 : dX = 2;

    //padding zeroes
    if(player1Score < 10){
      player1Score = '00' + player1Score;
    }else if(player1Score > 9 && player1Score < 100){
      player1Score = '0' + player1Score;
    }
    if(player2Score < 10){
      player2Score = '00' + player2Score;
    }else if(player2Score > 9 && player2Score < 100){
      player2Score = '0' + player2Score;
    }
    $("#player1-score").text(player1Score);
    $("#player2-score").text(player2Score);
    barUpdate(ratioBar, dX);
}

function barUpdate(ratioBar, dX){

  rect = document.getElementById('score-rect');
  var ratio = ratioBar;
  let deltaX = dX;

  function animate(){
  var x = +rect.getAttribute('x');

  if(x > ratio && dX > 0){
    return;
  }else if(x < ratio && dX < 0){
    return;
  }
  rect.setAttribute('x', x + deltaX);
  requestAnimationFrame(animate);
  }
  animate();
}
