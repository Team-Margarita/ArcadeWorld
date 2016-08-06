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

function updateScoreBoard(playerId, scoreToAdd){
    player1Score = $("#player1-score").text() | 0;
    player2Score = $("#player2-score").text() | 0;
      playerId === 1 ? (player1Score += scoreToAdd) : (player2Score += scoreToAdd);

    let denominator = player1Score + player2Score;
    let ratio = Math.round((player1Score / denominator) * 100);
    let ratioBar = ratio * 6;
    let dX = 2;
    let rect = document.getElementById('score-rect');
    let oldRatioBar = +rect.getAttribute('x');

    console.log('ratio ' + ratio);
    console.log('ratioBar ' + ratio);

    oldRatioBar > ratioBar ? dX = -2 : dX = 2;

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
  console.log(x);
  rect.setAttribute('x', x + deltaX);
  requestAnimationFrame(animate);
  }
  animate();
}
