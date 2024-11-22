const player = document.getElementById('player');
const computer = document.getElementById('computer');
const timer = document.getElementById('timer');
const startButton = document.getElementById('start-button');

let playerSpeed = 0; // Start with zero speed
const computerSpeed = 1; // Adjust computer speed as needed
let startTime;
let animationFrameId;

const gameHeight = window.innerHeight - player.offsetHeight; // Calculate game height

function movePlayer() {
  const currentTop = parseFloat(player.style.top) || 0;
  player.style.top = `${Math.min(currentTop + playerSpeed, gameHeight)}px`;
}

function moveComputer() {
  const currentTop = parseFloat(computer.style.top) || 0;
  const newTop = Math.min(currentTop + computerSpeed, gameHeight);
  computer.style.top = `${newTop}px`;
}

function startGame() {
  startTime = Date.now();
  startButton.disabled = true;
  playerSpeed = 0; // Reset player speed at the start of the game
  resetGame();

  function updateGame() {
    const currentTime = Date.now();
    const elapsedTime = (currentTime - startTime) / 1000;
    timer.textContent = elapsedTime.toFixed(2);

    moveComputer();
    movePlayer(); // Ensure player moves based on current speed

    const playerReachedEnd = player.offsetTop >= gameHeight;
    const computerReachedEnd = computer.offsetTop >= gameHeight;

    if (playerReachedEnd || computerReachedEnd) {
      cancelAnimationFrame(animationFrameId);
      const winner = playerReachedEnd ? 'Player' : 'RoboBlock';
      alert(`${winner} wins!`);
      startButton.disabled = false;
    } else {
      animationFrameId = requestAnimationFrame(updateGame);
    }
  }

  animationFrameId = requestAnimationFrame(updateGame);
}

function resetGame() {
  player.style.top = '0px';
  computer.style.top = '0px';
  timer.textContent = '0.00';
}

// Event listener for player control using the start button
startButton.addEventListener('click', (event) => {
  if (startButton.disabled) {
    playerSpeed += 2; // Increase speed with each button press
    movePlayer(); // Move player immediately on button press
  } else {
    startGame();
  }
});