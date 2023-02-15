'use strict';

// selecting elements by storing them in const
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const btnNewGame = document.querySelector('.btn--new');

//declare below variables outside so the js doesn't throw errors when calling them in function
let scores, currentScore, activePlayer, playing;
// starting conditions of elements on the page

//function to create initial values of the game

const init = function () {
  scores = [0, 0]; //to store players score. p1 = 0, p2= 1;

  currentScore = 0;
  activePlayer = 0;
  playing = true;

  score0El.textContent = 0;
  score1El.textContent = 0;

  current0El.textContent = 0;
  current1El.textContent = 0;

  diceEl.classList.add('hidden');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
};

init();

//function to switch players in functions below
const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  //switch css class of an active player
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

//functionality of dice rolling
btnRoll.addEventListener('click', function () {
  if (playing) {
    //1- generate random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;

    //2- display the dice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;

    //3- check if 1 is rolled if 1 witch to next player
    if (dice !== 1) {
      //add dice to the current score
      currentScore = currentScore + dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      //if active player is 1(0) switch to 1 if active player is 2(1) switch to 0- function switchPlayer is called
      switchPlayer();
    }
  }
});

//4- storing current score in total score when a user clicks hold button
btnHold.addEventListener('click', function () {
  if (playing) {
    //1- add current score to active player's score
    scores[activePlayer] += currentScore;

    //to the above line-- scores[1] + currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    //2- check if player's score is >= 100
    if (scores[activePlayer] >= 100) {
      // finish the game
      playing = false;
      diceEl.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--winner`)
        .classList.remove('player--active');
    } else {
      //3- or switch to next player using the switch player function
      switchPlayer();
    }
  }
});

//reseting the game

btnNewGame.addEventListener('click', init);

const btnClose = document.querySelector('.close-modal');
const modal = document.querySelector('.modal');

const closeModal = function () {
  console.log('button clicked');
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

modal.addEventListener('click', closeModal);
