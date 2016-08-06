function mainMenu(inGame){
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
        isInGame = true;
        initializeGame();
      }
    }
  }
  function updateSelectedItem(e){

        var currentItemOption = '[data-option="' + selectedOption + '"]';

          $('[data-option]').removeClass('selected');
        //40 - down; 38 - up
        if(e.keyCode === 40 && !isInGame){
          selectedOption === 3 ? (selectedOption = 1) : (selectedOption+=1);
        }else if(e.keyCode === 38 && !isInGame)
        {
          selectedOption === 1 ? (selectedOption = 3) : (selectedOption-=1);
        }

        currentItemOption = '[data-option="' + selectedOption + '"]';
        $(currentItemOption).addClass('selected');
  }
}
