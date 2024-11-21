const player = document.getElementById('player');
const computer = document.getElementById('computer');
const timer = document.getElementById('timer');
const startButton = document.getElementById('start-button');

let playerSpeed = 0;
let computerSpeed = 2; // Adjust computer speed as needed
let startTime;
let elapsedTime = 0;

function startGame() {
  startTime = Date.now();
  startButton.disabled = true;

  const gameInterval = setInterval(() => {
    const currentTime = Date.now();
    elapsedTime = (currentTime - startTime) / 1000;
    timer.textContent = elapsedTime.toFixed(2);

    player.style.left = `${playerSpeed * elapsedTime}px`;
    computer.style.left = `${computerSpeed * elapsedTime}px`;

    if (player.offsetLeft >= window.innerWidth - player.offsetWidth ||
        computer.offsetLeft >= window.innerWidth - computer.offsetWidth) {
      clearInterval(gameInterval);
      const winner = player.offsetLeft > computer.offsetLeft ? 'You' : 'Computer';
      alert(`${winner} wins!`);
      startButton.disabled = false;
    }
  }, 10);

  document.addEventListener('keydown', (event) => {
    if (event.key === ' ') {
      playerSpeed += 0.5; // Adjust acceleration as needed
    }
  });

  document.addEventListener('keyup', (event) => {
    if (event.key === ' ') {
      playerSpeed = 0;
    }
  });
}

startButton.addEventListener('click', startGame);