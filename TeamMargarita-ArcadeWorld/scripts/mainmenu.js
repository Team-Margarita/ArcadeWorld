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

      var data = {
        games: [
           {
             src: './images/breakoutgame-instr.jpg',
             name: 'breakout',
             players: '1',
             description: 'Destroy as many blocks as possible',
             points: 'x 2',
             keys: 'LEFT RIGHT'
           },
           {
             src: './images/snake-instr.jpg',
             name: 'snake',
             players: '1',
             description: 'Collect as much food as possible',
             points: 'x 1',
             keys: 'UP DOWN LEFT RIGHT'
           },
           {
             src: './images/pingpong-instr.jpg',
             name: 'ping pong',
             players: '2',
             description: 'Score 10 points against your opponent',
             points: 'x 5',
             keys: '</br>UP DOWN</br>W S'
           },
           {
             src: './images/player1_victory.png',
             name: 'tron',
             players: '2',
             description: 'Achieve 3 wins against your opponent',
             points: 'x 20',
             keys: '</br>UP DOWN LEFT RIGHT</br>W S A D'
           }
         ]
      };

      var $wrapper = $('#game-wrapper');
      $wrapper.empty();

      var instrTemplate = `<div id='instructions-title'>INSTRUCTIONS</div>
      {{#each games}}
        <div class = "gameinstructions-container">
          <img src="{{src}}" />
          <div class = 'game-title'>{{name}}</div>
          <div class = 'game-description'><span>Description</span>: {{description}}</div>
          <div class = 'game-keys'><span>Keys</span>: {{{keys}}}</div>
          <div class = 'game-points'><span>Points</span>: {{points}}</div>
          <div class = 'game-players'><span>Players</span>: {{players}}</div>
        </div>
      {{/each}}
      `;

      var template = Handlebars.compile(instrTemplate);

      $wrapper.html(template(data));

      var $instrDiv = $('<div/>').append('<span/>').attr('class', 'instructions').text("Press 'B' to return to main menu.");

      $wrapper.append($instrDiv);

    }

    //Function for creating about page
    function createAbout(){
        var $wrapper = $('#game-wrapper');
        $wrapper.empty();

        var $teamlogo = $('<img/>').attr('id', 'team-logo')
                               .attr('src', './images/team-margarita-logo.png');
        var $description = $('<div/>').attr('id', 'description-container');
        var $firstDiv = $('<div/>').html('Welcome to <span>Arcade World</span> - A place where you and your friends can compete against each other.' +
        '<br/>Test your gaming skills on the arcade fields and prove your dominance.');
        var $secondDiv = $('<div/>').html('<div><br/>This is an educational team work project for the <span>JavaScript UI and DOM</span> course in <span>Telerik Academy</span>.');
        var $thirdDiv = $('<div/>').append('<span/>').attr('class', 'instructions').text("Press 'B' to return to main menu.");

        $description.append($firstDiv);
        $description.append($secondDiv);
        $description.append($thirdDiv);

        $wrapper.append($teamlogo);
        $wrapper.append($description);
        //TODO: Implementation
    }
}
