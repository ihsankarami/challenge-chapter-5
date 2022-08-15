// player variables
const player = document.querySelectorAll('.player');
const batuPlyr = document.querySelector('.player-batu');
const guntingPlyr = document.querySelector('.player-gunting');
const kertasPlyr = document.querySelector('.player-kertas');
let playerChoice = '';

// cpu variables
const cpu = document.querySelector('.cpu');
const batuCpu = document.querySelector('.cpu-batu');
const guntingCpu = document.querySelector('.cpu-gunting');
const kertasCpu = document.querySelector('.cpu-kertas');
let cpuChoice = '';

const rstBtn = document.querySelector('.restart-btn');
const resultText = document.querySelector('.vs');

//  start game
/////////////////

let gameStart = true;

// player choose batu
batuPlyr.addEventListener('click', function (e) {
  if (gameStart) {
    batuPlyr.classList.add('game-active');
    playerChoice = 'batu';
    cpuSelect();
    result();
  }
  gameStart = false;
});
// player choose kertas
kertasPlyr.addEventListener('click', function () {
  if (gameStart) {
    kertasPlyr.classList.add('game-active');
    playerChoice = 'kertas';
    cpuSelect();
    result();
  }
  gameStart = false;
});
// player choose gunting
guntingPlyr.addEventListener('click', function () {
  if (gameStart) {
    guntingPlyr.classList.add('game-active');
    playerChoice = 'gunting';
    cpuSelect();
    result();
  }
  gameStart = false;
});

// cpu choice
const cpuSelect = () => {
  c = Math.floor(Math.random() * 3);
  if (c === 0) {
    cpuChoice = 'batu';
    batuCpu.classList.add('game-active');
  }
  if (c === 1) {
    cpuChoice = 'kertas';
    kertasCpu.classList.add('game-active');
  }
  if (c === 2) {
    cpuChoice = 'gunting';
    guntingCpu.classList.add('game-active');
  }
};

// game result fucntion

const result = () => {
  //batu
  if ((playerChoice === 'batu') & (cpuChoice === 'gunting')) {
    document.querySelector('.vs').innerText = 'player 1 win';
    resultText.classList.add('win');
  }
  if ((playerChoice === 'batu') & (cpuChoice === 'kertas')) {
    document.querySelector('.vs').innerText = 'com win';
    resultText.classList.add('lose');
  }

  //gunting
  if ((playerChoice === 'gunting') & (cpuChoice === 'kertas')) {
    document.querySelector('.vs').innerText = 'player 1 win';
    resultText.classList.add('win');
  }
  if ((playerChoice === 'gunting') & (cpuChoice === 'batu')) {
    document.querySelector('.vs').innerText = 'com win';
    resultText.classList.add('lose');
  }

  //kertas
  if ((playerChoice === 'kertas') & (cpuChoice === 'gunting')) {
    document.querySelector('.vs').innerText = 'com win';
    resultText.classList.add('lose');
  }
  if ((playerChoice === 'kertas') & (cpuChoice === 'batu')) {
    document.querySelector('.vs').innerText = 'player 1 win';
    resultText.classList.add('win');
  }

  //tie
  if (playerChoice === cpuChoice) {
    document.querySelector('.vs').innerText = 'draw';
    resultText.classList.add('tie');
  }
};

// restart game fucntion

rstBtn.addEventListener('click', function () {
  kertasPlyr.classList.remove('game-active');
  batuPlyr.classList.remove('game-active');
  guntingPlyr.classList.remove('game-active');
  kertasCpu.classList.remove('game-active');
  batuCpu.classList.remove('game-active');
  guntingCpu.classList.remove('game-active');
  document.querySelector('.vs').innerText = 'vs';
  resultText.classList.remove('win', 'tie', 'lose');
  gameStart = true;
});
