const cells = document.querySelectorAll('.cell');
const statusText = document.getElementById('status');
const resultScreen = document.getElementById('result-screen');
const resultText = document.getElementById('result-text');
const newGameBtn = document.getElementById('newGameBtn');

let currentPlayer = 'X';
let board = Array(9).fill('');
let gameActive = true;

const winPatterns = [
  [0,1,2],[3,4,5],[6,7,8],
  [0,3,6],[1,4,7],[2,5,8],
  [0,4,8],[2,4,6]
];

function startGame() {
  board.fill('');
  currentPlayer = 'X';
  gameActive = true;
  statusText.textContent = `Player ${currentPlayer}'s turn`;
  cells.forEach(cell => {
    cell.textContent = '';
    cell.classList.remove('x', 'o');
  });
  resultScreen.classList.add('hidden');
}

function handleClick(index) {
  if (!gameActive || board[index] !== '') return;

  board[index] = currentPlayer;
  cells[index].textContent = currentPlayer;
  cells[index].classList.add(currentPlayer.toLowerCase());

  if (checkWin()) {
    showResult(`🎉 Player ${currentPlayer} Wins!`);
    gameActive = false;
  } else if (board.every(cell => cell !== '')) {
    showResult(`😃 It's a Draw!`);
    gameActive = false;
  } else {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    statusText.textContent = `Player ${currentPlayer}'s turn`;
  }
}

function checkWin() {
  return winPatterns.some(pattern => {
    const [a, b, c] = pattern;
    return board[a] && board[a] === board[b] && board[a] === board[c];
  });
}

function showResult(message) {
  resultText.textContent = message;
  resultScreen.classList.remove('hidden');
}

// Event listeners
cells.forEach((cell, index) => {
  cell.addEventListener('click', () => handleClick(index));
});
newGameBtn.addEventListener('click', startGame);

// Initialize game
startGame();
