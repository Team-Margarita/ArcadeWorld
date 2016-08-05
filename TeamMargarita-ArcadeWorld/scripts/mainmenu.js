window.addEventListener('load', mainMenu);

function mainMenu(){
  var selectedOption = 1;
  var isInGame = false;

  var $root = $('#root');
  $root.empty();
  $root.append('<div id="game-wrapper"/>');

  var $wrapper = $('#game-wrapper');

  var $logo = $('<img/>').attr('id', 'main-logo')
                         .attr('src', './images/arcade-world-logo.png');
  $wrapper.append($logo);
  $wrapper.append('<ul id="menu-list"/>');

  //Setting up the menu
  var $menu = $('#menu-list');

  var menuOptions = 3;
  for (var i = 1; i <= menuOptions; i++) {
    var $option = $('<div/>').addClass('menu-option')
               .attr('data-option', i);
    $menu.append($option);
  }

  $('[data-option="1"]').text('Start').addClass('selected');
  $('[data-option="2"]').text('Instructions');
  $('[data-option="3"]').text('About');

$('body').on('keydown', updateSelectedItem);
$('body').on('keyup', enterSelectedItem);
  //Events
  function enterSelectedItem(e){
    //13 - enter
    if(e.keyCode === 13 && !isInGame)
    {
      if(selectedOption === 1){
        initializeGame();
      }
    }
  }
  function updateSelectedItem(e){

        var currentItemOption = '[data-option="' + selectedOption + '"]';

          $(currentItemOption).removeClass('selected');
        //40 - down; 38 - up
        if(e.keyCode === 40){
          selectedOption === 3 ? (selectedOption = 1) : (selectedOption+=1);
        }else if(e.keyCode === 38)
        {
          selectedOption === 1 ? (selectedOption = 3) : (selectedOption-=1);
        }

        currentItemOption = '[data-option="' + selectedOption + '"]';
        $(currentItemOption).addClass('selected');
  }


  function initializeGame(){
    isInGame = true;
    $root.empty();
    var player1Score = $('<div/>').attr('id', 'player1-score')
               .text('0');
    var player2Score = $('<div/>').attr('id', 'player2-score')
               .text('0');
    $root.append(player1Score);
    $root.append(player2Score);
    $root.append('<div id="canvas-container">');
    var $canvasContainer = $('#canvas-container');
    $canvasContainer.append('<canvas id="game-canvas" width="600" height="600"></canvas>');
    beginGame();
  }
}
