function mainMenu(inGame){
  var selectedOption = 1;
  var isInGame = false;
  var isInMenuOption = false;

  var $root = $('#root');

  createMenu();

  $('body').on('keydown', updateSelectedItem);

  setTimeout(eventEnter, 500); //setting a small delay for event listener

  function eventEnter(){
  $('body').on('keyup', enterSelectedItem);
  }
    //Function for entering in options
    function enterSelectedItem(e){
      let key = e.which || e.keyCode || 0;
      //13 - enter
      if(key === 13 && !isInGame)
      {
        if(selectedOption === 1){
          isInGame = true;
          initializeGame();
        }
        if(selectedOption === 2){
          createInstructions();
          isInMenuOption = true;
        }
        if(selectedOption === 3){
          createAbout();
          isInMenuOption = true;
        }
      }
      if(key === 66 && !isInGame && isInMenuOption){
        selectedOption = 1;
        isInMenuOption = false;
        createMenu();
      }
    }

    //Function for changing current option
    function updateSelectedItem(e){
        let key = e.which || e.keyCode || 0;
        var currentItemOption = '[data-option="' + selectedOption + '"]';

        $('[data-option]').removeClass('selected');

          //40 - down; 38 - up
          if(key === 40 && !isInGame){
            selectedOption === 3 ? (selectedOption = 1) : (selectedOption+=1);
          }else if(key === 38 && !isInGame)
          {
            selectedOption === 1 ? (selectedOption = 3) : (selectedOption-=1);
          }

          currentItemOption = '[data-option="' + selectedOption + '"]';
          $(currentItemOption).addClass('selected');
    }

    //Function for creating menu page
    function createMenu(){
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
    }

    //Function for creating instructions page
    function createInstructions(){
      var $wrapper = $('#game-wrapper');
      $wrapper.empty();
      //TODO: Implementation
    }

    //Function for creating about page
    function createAbout(){
        var $wrapper = $('#game-wrapper');
        $wrapper.empty();

        var $teamlogo = $('<img/>').attr('id', 'team-logo')
                               .attr('src', './images/team-margarita-logo.png');
        var $description = $('<div/>').attr('id', 'description-container');
        var $firstDiv = $('<div/>').html('Welcome to <span>Arcade World</span> - A place where you and your friends can compete against each other.' +
        '<br/>Test your gaming skills on the arcade fields and proove your dominance.');
        var $secondDiv = $('<div/>').html('<div><br/>This is an educational team work project for the <span>JavaScript UI and DOM</span> course in <span>Telerik Academy</span>.');
        var $thirdDiv = $('<div/>').append('<span/>').attr('id', 'instructions').text("Press 'B' to return to main menu.");

        $description.append($firstDiv);
        $description.append($secondDiv);
        $description.append($thirdDiv);

        $wrapper.append($teamlogo);
        $wrapper.append($description);
        //TODO: Implementation
    }
}
