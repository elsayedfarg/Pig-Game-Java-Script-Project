'use strict';

let dice = document.querySelector('.dice');
const rollDiceBtn = document.querySelector('.btn--roll');
const holdBtn = document.querySelector('.btn--hold');
const newGame = document.querySelector('.btn--new');

let player1 = document.querySelector('.player--0');
let player2 = document.querySelector('.player--1');

let totalScoreOfPlayer1 = document.querySelector('#score--0');
let totalScoreOfPlayer2 = document.querySelector('#score--1');
let currentScoreOfPlayer1 = document.getElementById('current--0');
let currentScoreOfPlayer2 = document.getElementById('current--1');

let gameActive;
let randomDiceRoll;
let currentScore;
let activePlayer;
let totalScores;

// Starting Conditions
const init = function () {
  gameActive = true;
  randomDiceRoll = 0;
  currentScore = 0;
  activePlayer = 0;
  totalScores = [0, 0];

  totalScoreOfPlayer1.textContent = 0;
  totalScoreOfPlayer2.textContent = 0;

  currentScoreOfPlayer1.textContent = 0;
  currentScoreOfPlayer2.textContent = 0;

  dice.classList.add('hidden');
  player1.classList.remove('player--winner');
  player2.classList.remove('player--winner');

  player1.classList.add('.player--active');
  player2.classList.remove('.player--active');
};
init();

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  currentScore = 0;
  player1.classList.toggle('player--active');
  player2.classList.toggle('player--active');
};

rollDiceBtn.addEventListener('click', () => {
  if (gameActive) {
    randomDiceRoll = Math.trunc(Math.random() * 6) + 1;
    dice.classList.remove('hidden');
    dice.src = `dice-${randomDiceRoll}.png`;

    if (randomDiceRoll !== 1) {
      currentScore += randomDiceRoll;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      switchPlayer();
    }
  }
});

holdBtn.addEventListener('click', () => {
  if (gameActive) {
    totalScores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      totalScores[activePlayer];

    if (totalScores[activePlayer] >= 100) {
      gameActive = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--active');
      dice.classList.add('hidden');
    } else {
      switchPlayer();
    }
  }
});

newGame.addEventListener('click', init);
