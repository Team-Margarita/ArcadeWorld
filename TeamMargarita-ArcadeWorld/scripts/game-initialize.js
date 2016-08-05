function beginGame(){
  breakOut(); //CALL YOUR GAME FOR TESTING
}

function updateScoreBoard(playerId, scoreToAdd){
    $player1Score = $("#player1-score").text() | 0;
    $player2Score = $("#player2-score").text() | 0;
      playerId === 1 ? ($player1Score += scoreToAdd) : ($player2Score += scoreToAdd);

    $("#player1-score").text($player1Score);
    $("#player2-score").text($player2Score);
}