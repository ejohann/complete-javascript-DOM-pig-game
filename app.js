/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- If the player rolls two sixes in a row, the player loses all score including global score and its next player turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach score entered during game startup on GLOBAL score wins the game

*/

var scores, roundScores, activePlayer, diceDOM0, diceDOM1, gamePlaying, previousDice, gameScore;


//Game score
document.querySelector('.play-game').addEventListener('click', function(){
    gameScore = document.getElementById('score').value;
    
    if( gameScore <= 10 )
      {
          document.getElementById('score').value = '';
          alert('Please enter a number greater than 10');
      }
    else
      {
        document.getElementById('game-score').classList.remove('winning-score'); 
        document.getElementById('game-score').classList.add('hidden'); 
        document.getElementById('rules').classList.remove('game-rules'); 
        document.getElementById('rules').classList.add('hidden'); 
        document.getElementById('game-wrapper').classList.remove('hidden');
        document.getElementById('game-wrapper').classList.add('wrapper');
        init();  
      }
});



//roll dice
document.querySelector('.btn-roll').addEventListener('click', function(){
    
    if(gamePlaying){
      
      //1. create a random number between 1 and 6
      var dice0 = Math.floor(Math.random() * 6) + 1;
      var dice1 = Math.floor(Math.random() * 6) + 1;
        
      //2. Display the result
      // changing css
      diceDOM0.style.display = 'block';
      diceDOM1.style.display = 'block';
      // changing the image
      diceDOM0.src = 'dice-' + dice0 + '.png';
      diceDOM1.src = 'dice-' + dice1 + '.png';
     
      //3. Update the round score if the rolled number was not a 1
      if(dice0 !== 1 && dice1 !== 1){
        // add score
        if((previousDice[0] === 6 || previousDice[1] === 6) && (dice0 === 6 || dice1 === 6))
            {
                scores[activePlayer] = 0;
                document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
                nextPlayer();
            }
          else
            {
              previousDice = [dice0, dice1];
              roundScore += (dice0 + dice1);
              document.querySelector('#current-' + activePlayer).textContent = roundScore;
            }
      }
     else
      {
        // next player
          nextPlayer();
      }    
    } 
});

//hold button
document.querySelector('.btn-hold').addEventListener('click', function(){
   
    if(gamePlaying){
      // add current score to global score
      scores[activePlayer] += roundScore;
    
      //update the UI
      document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
        
     // check if player won the game
     if(scores[activePlayer] >= gameScore){
        // player won
        document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
        diceDOM0.style.display = 'none';
        diceDOM1.style.display = 'none';
        document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
        document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
        gamePlaying = false;
     }
    else
     {   
        nextPlayer();
     }
    }
});

// new game button
document.querySelector('.btn-new').addEventListener('click', init);

function init(){
    scores = [0,0];
    activePlayer = 0;
    roundScore = 0;
    gamePlaying = true;
    previousDice = [0,0];
    diceDOM0 = document.querySelector('.dice-0');
    diceDOM1 = document.querySelector('.dice-1');
    document.querySelector('.dice-0').style.display = 'none';
    document.querySelector('.dice-1').style.display = 'none';
    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.querySelector('#name-0').textContent = 'Player 1';
    document.querySelector('#name-1').textContent = 'Player 2';
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
}

function nextPlayer(){
       roundScore = 0;
        previousDice = [0,0];
        document.getElementById('current-' + activePlayer).textContent = roundScore;
        document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
        diceDOM0.style.display = 'none';
        diceDOM1.style.display = 'none';
        
        activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
        document.querySelector('.player-' + activePlayer + '-panel').classList.add('active');
}