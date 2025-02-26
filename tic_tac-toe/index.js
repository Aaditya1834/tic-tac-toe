// script.js

let board = Array(9).fill(null); // Array to store the board state
let currentPlayer = 'X'; // Start with Player X
let gameOver = false;

const cells = document.querySelectorAll('.cell');
const statusDisplay = document.getElementById('status');

// Event listener for cell clicks
cells.forEach(cell => {
    cell.addEventListener('click', handleCellClick);
});

// Function to handle cell clicks
function handleCellClick(event) {
    const index = event.target.getAttribute('data-index');

    // If the cell is already filled or the game is over, do nothing
    if (board[index] || gameOver) {
        return;
    }

    // Mark the cell with the current player's symbol
    board[index] = currentPlayer;
    event.target.textContent = currentPlayer;

    // Check if the game is won
    if (checkWinner()) {
        statusDisplay.textContent = `${currentPlayer} wins!`;
        gameOver = true;
        return;
    }

    // Check if it's a tie
    if (board.every(cell => cell)) {
        statusDisplay.textContent = 'It\'s a tie!';
        gameOver = true;
        return;
    }

    // Switch player
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    statusDisplay.textContent = `${currentPlayer}'s turn`;
}

// Function to check for a winner
function checkWinner() {
    const winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    return winningCombinations.some(combination => {
        const [a, b, c] = combination;
        return board[a] && board[a] === board[b] && board[a] === board[c];
    });
}

// Reset the game
function resetGame() {
    board = Array(9).fill(null);
    currentPlayer = 'X';
    gameOver = false;
    cells.forEach(cell => {
        cell.textContent = '';
    });
    statusDisplay.textContent = `${currentPlayer}'s turn`;
}
