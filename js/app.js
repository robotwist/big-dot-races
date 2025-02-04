const player = document.getElementById('player');
const computer = document.getElementById('computer');
const timer = document.getElementById('timer');
const startButton = document.getElementById('start-button');

let playerSpeed = 1; // Speed is determined by button press frequency
const computerSpeed = 1; // Computer's constant speed
let startTime;
let animationFrameId;
let countdownTimerId;
let lastPressTime = 0;

const gameHeight = window.innerHeight - player.offsetHeight; // Calculate game height

function movePlayer() {
  const currentTop = parseFloat(player.style.top) || 0;
  const newTop = Math.min(currentTop + playerSpeed, gameHeight);
  player.style.top = `${newTop}px`;
}

function moveComputer() {
  const currentTop = parseFloat(computer.style.top) || 0;
  computer.style.top = `${Math.min(currentTop + computerSpeed, gameHeight)}px`;
}

function startCountdown(callback) {
  let countdown = 3; // Countdown from 3 seconds
  timer.textContent = `Get Ready: ${countdown}`;

  countdownTimerId = setInterval(() => {
    countdown--;
    if (countdown > 0) {
      timer.textContent = `Get Ready: ${countdown}`;
    } else {
      clearInterval(countdownTimerId);
      timer.textContent = 'Go!';
      callback(); // Start the game after the countdown
    }
  }, 1000);
}

function startGame() {
  startButton.disabled = true; // Disable the button during the game
  playerSpeed = 1; // Reset player speed
  resetGame();

  startCountdown(() => {
    startTime = Date.now();

    function updateGame() {
      const currentTime = Date.now();
      const elapsedTime = (currentTime - startTime) / 1000;
      timer.textContent = elapsedTime.toFixed(2);

      movePlayer();
      moveComputer();

      const playerReachedEnd = player.offsetTop >= gameHeight;
      const computerReachedEnd = computer.offsetTop >= gameHeight;

      if (playerReachedEnd || computerReachedEnd) {
        cancelAnimationFrame(animationFrameId);
        const winner = playerReachedEnd ? 'Master Squarehead' : 'RoboBlock';
        alert(`${winner} wins!`);
        startButton.disabled = false;
      } else {
        animationFrameId = requestAnimationFrame(updateGame);
      }
    }

    animationFrameId = requestAnimationFrame(updateGame);
  });
}

function resetGame() {
  player.style.top = '0px';
  computer.style.top = '0px';
  timer.textContent = '';
}

function setupPlayerMovement() {
  const increaseSpeed = () => {
    if (startButton.disabled) {
      const now = Date.now();
      if (now - lastPressTime < 500) {
        // If presses are quick, increase speed faster
        playerSpeed += 4.5;
      } else {
        // Otherwise, increase speed at a normal rate
        playerSpeed += 1.75;
      }
      lastPressTime = now;
    }
  };

  // Desktop: mouse click
  startButton.addEventListener('mousedown', increaseSpeed);

  // Mobile: touch start
  startButton.addEventListener('touchstart', (event) => {
    event.preventDefault(); // Prevent accidental scrolling
    increaseSpeed();
  });
}

// Attach start game logic to button click
startButton.addEventListener('click', () => {
  if (!startButton.disabled) {
    startGame();
  }
});

// Initialize player movement logic
setupPlayerMovement();

