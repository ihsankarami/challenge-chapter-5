const txtRoomCode = document.getElementById('txtRoomCode');
const btnSubmitRoomCode = document.getElementById('submitRoomCode');
const statusText = document.querySelector('.status');
// player1 variables
const playerOne = document.querySelectorAll('.playerOne');
const batuPlyr = document.querySelector('.playerOne-batu');
const guntingPlyr = document.querySelector('.playerOne-gunting');
const kertasPlyr = document.querySelector('.playerOne-kertas');
const playerOneOptions = [rockBtn, paperBtn, scissorsBtn];

// player2 variables
const playerTwo = document.querySelector('.playerTwo');
const batuCpu = document.querySelector('.playerTwo-batu');
const guntingCpu = document.querySelector('.playerTwo-gunting');
const kertasCpu = document.querySelector('.playerTwo-kertas');
const playerTwoOptions = [rockBtnTwo, paperBtnTwo, scissorsBtnTwo];

const rstBtn = document.querySelector('.restart-btn');
const resultText = document.querySelector('.vs');

//  start game
/////////////////

// get user id from url query string
const urlParams = new URLSearchParams(window.location.search);
const userId = urlParams.get('userId');

//starting condition
let gameStart = true;
let mode = '';
playerOne.style.display = 'none';
playerTwo.style.display = 'none';

// untuk melakukan pengecekan status secara realtime
function checkStatusPeriodicaly() {
  const roomCode = txtRoomCode.value;
  const interval = setInterval(async () => {
    const response = await axios.get('/game-page/status/' + roomCode);

    if (response.data.status == true) {
      clearInterval(interval);

      resultText.innerText =
        'player 1 Picks ' + response.data.data.playerOnePick;
      resultText.innerText =
        'player 2 Picks ' + response.data.data.playerTwoPick;
      if (response.data.data.winnerUserId == userId) {
        document.querySelector('.vs').innerText = 'player 1 win';
        resultText.classList.add('win');
      } else if (response.data.data.winnerUserId == null) {
        document.querySelector('.vs').innerText = 'draw';
        resultText.classList.add('tie');
      } else {
        document.querySelector('.vs').innerText = 'player 2 win';
        resultText.classList.add('lose');
      }
    }
  }, 2000);
}

// Disable button
const btnDisableMaster = () => {
  playerOneOptions.forEach((option) => {
    option.disabled = true;
  });
};
const btnDisableGuest = () => {
  playerTwoOptions.forEach((option) => {
    option.disabled = true;
  });
};
// Enable button
const btnEnable = () => {
  playerOneOptions.forEach((option) => {
    option.disabled = false;
  });
};

btnSubmitRoomCode.addEventListener('click', function onClick() {
  txtRoomCode.innerText = txtRoomCode.value;
  const roomCode = txtRoomCode.value;

  axios
    .post('/suit-game/join', {
      userId: userId,
      roomCode: roomCode,
    })
    .then((res) => {
      alert(res.data.message);
      statusText.innerText = 'Choose one';

      if (res.data.mode == 'master') {
        playerOne.style.display = 'flex';
        playerTwo.style.display = 'none';
      }
      if (res.data.mode == 'guest') {
        playerOne.style.display = 'flex';
        playerTwo.style.display = 'none';
      }
    });
  playerOneOptions.forEach((option) => {
    option.addEventListener('click', function onClick() {
      btnDisableMaster();
      const pick = option.value;

      document.querySelector('.' + option.className).style.backgroundColor =
        '#C4C4C4';
      submitPick(pick);
    });
  });
  playerTwoOptions.forEach((option) => {
    option.addEventListener('click', function onClick() {
      btnDisableGuest();
      console.log('pilihan', option.value);
      const pick = option.value;
      document.querySelector('.' + option.className).style.backgroundColor =
        '#C4C4C4';
      submitPick(pick);
    });
  });
});

async function submitPick(pick) {
  txtRoomCode.innerText = txtRoomCode.value;
  const roomCode = txtRoomCode.value;
  const response = await axios.post('/game-page/submit', {
    roomCode: roomCode,
    userId: userId,
    pick: pick,
  });
  const data = response.data;
  console.log('ini respon dari submit pick', data);
  if (
    (data.status == 'pending' && data.success == true) ||
    (data.status == 'settled' && data.success == true)
  ) {
    checkStatusPeriodicaly();
  }
}
