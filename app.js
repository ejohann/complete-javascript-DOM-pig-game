/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- If the player rolls two sixes in a row, the player loses all score including global score and its next player turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, roundScores, activePlayer, diceDOM, gamePlaying, previousDice, gameScore;

init();

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
        console.log(gameScore);
      }
});



//roll dice
document.querySelector('.btn-roll').addEventListener('click', function(){
    
    if(gamePlaying){
      
      //1. create a random number between 1 and 6
      var dice = Math.floor(Math.random() * 6) + 1;
    
      //2. Display the result
      // changing css
      diceDOM.style.display = 'block';
      // changing the image
      diceDOM.src = 'dice-' + dice + '.png';
     
      //3. Update the round score if the rolled number was not a 1
      if(dice !== 1){
        // add score
        if(previousDice === 6 && dice === 6)
            {
                scores[activePlayer] = 0;
                document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
                nextPlayer();
            }
          else
            {
              previousDice = dice;
              roundScore += dice;
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
     if(scores[activePlayer] >= 100){
        // player won
        document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
        diceDOM.style.display = 'none';
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
    previousDice = 0;
    diceDOM = document.querySelector('.dice');
    document.querySelector('.dice').style.display = 'none';
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
        previousDice = 0;
        document.getElementById('current-' + activePlayer).textContent = roundScore;
        document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
        diceDOM.style.display = 'none';
        
        activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
        document.querySelector('.player-' + activePlayer + '-panel').classList.add('active');
}