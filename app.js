/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, roundScores, activePlayer;

scores = [0,0];
roundScore = 0;
activePlayer = 0;



//document.querySelector('#current-' + activePlayer).innerHTML = '<em>' + dice + '</em>';
// var x = document.querySelector('#score-' + activePlayer).textContent;

document.querySelector('.dice').style.display = 'none';

document.getElementById('score-0').textContent = '0';
document.getElementById('score-1').textContent = '0';
document.getElementById('current-0').textContent = '0';
document.getElementById('current-1').textContent = '0';


//roll dice
document.querySelector('.btn-roll').addEventListener('click', function(){
   //1. create a random number between 1 and 6
    var dice = Math.floor(Math.random() * 6) + 1;
    
    //2. Display the result
    
    var diceDOM = document.querySelector('.dice');
    
    // changing css
    diceDOM.style.display = 'block';
    
    // changing the image
    diceDOM.src = 'dice-' + dice + '.png';
    
     
    //3. Update the round score if the rolled number was not a 1
    if(dice !== 1){
        // add score
        roundScore += dice;
        document.querySelector('#current-' + activePlayer).textContent = roundScore;
      }
    else{
        // next player
        roundScore = 0;
        document.getElementById('current-' + activePlayer).textContent = roundScore;
        document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
        
        activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
        document.querySelector('.player-' + activePlayer + '-panel').classList.add('active');
    }
    
    
});

