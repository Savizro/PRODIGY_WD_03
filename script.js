const cells = document.querySelectorAll('.cell');
const statusText = document.getElementById('status');
const resetButton = document.getElementById('reset');
let currentPlayer = 'X';
let gameState = ['', '', '', '', '', '', '', '', ''];
const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

const handleCellClick = (event) => {
    const clickedCell = event.target;
    const clickedCellIndex = parseInt(clickedCell.getAttribute('data-index'));

    if (gameState[clickedCellIndex] !== '' || !isGameActive()) {
        return;
    }

    updateCell(clickedCell, clickedCellIndex);
    checkForWinner();
};

const updateCell = (cell, index) => {
    gameState[index] = currentPlayer;
    cell.textContent = currentPlayer;
    cell.classList.add(`player${currentPlayer}`);
};

const checkForWinner = () => {
    let roundWon = false;

    for (let i = 0; i < winningConditions.length; i++) {
        const [a, b, c] = winningConditions[i];
        if (gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        statusText.textContent = `Player ${currentPlayer} wins!`;
        setTimeout(resetGame, 2000);
        return;
    }

    const roundDraw = !gameState.includes('');
    if (roundDraw) {
        statusText.textContent = 'Draw!';
        setTimeout(resetGame, 2000);
        return;
    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    statusText.textContent = `Player ${currentPlayer}'s turn`;
};

const resetGame = () => {
    gameState = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'X';
    statusText.textContent = `Player ${currentPlayer}'s turn`;
    cells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('playerX', 'playerO');
    });
};

const isGameActive = () => {
    return !statusText.textContent.includes('wins') && !statusText.textContent.includes('Draw');
};

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
resetButton.addEventListener('click', resetGame);

statusText.textContent = `Player ${currentPlayer}'s turn`;
