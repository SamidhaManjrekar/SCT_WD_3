// DOM elements
const cells = document.querySelectorAll('.cell');
const gameStatus = document.getElementById('game-status');
const resetButton = document.getElementById('reset-button');
const turnXO = document.querySelectorAll('.turn__XO');

// Game variables
let turn = 'X';
let gameActive = true;
let winner = null;

// Winning combinations
const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], 
    [0, 3, 6], [1, 4, 7], [2, 5, 8], 
    [0, 4, 8], [2, 4, 6]             
];

// Event listeners
cells.forEach(cell => cell.addEventListener('click', cellClick));
resetButton.addEventListener('click', resetGame);

// Function to handle cell click
function cellClick(e) {
    const cell = e.target;
    const cellIndex = Array.from(cells).indexOf(cell);

    if (!gameActive || cell.textContent !== '') return;

    cell.textContent = turn;
    cell.classList.add(turn);

    checkGameStatus();
}

// Function to check game status 
function checkGameStatus() {
    checkForWinner();
    if (!gameActive) return;
    checkForDraw();
    if (!gameActive) return;

    turn = turn === 'X' ? 'O' : 'X';
    updateTurnDisplay();
}

// Function to check if there's a winner
function checkForWinner() {
    for (let combination of winningCombinations) {
        const [a, b, c] = combination;
        if (cells[a].textContent && 
            cells[a].textContent === cells[b].textContent &&
            cells[a].textContent === cells[c].textContent) {
                
            cells[a].classList.add('win');
            cells[b].classList.add('win');
            cells[c].classList.add('win');
            
            gameActive = false;
            winner = turn;
            gameStatus.textContent = `Player ${winner} wins!`; 
            return;
        }
    }
}

// Function to check for a draw
function checkForDraw() {
    if (Array.from(cells).every(cell => cell.textContent !== '')) {
        gameActive = false;
        gameStatus.textContent = "It's a draw!";
    }
}

// Function to update turn display
function updateTurnDisplay() {
    gameStatus.textContent = `Player ${turn}'s turn`;

    const activeTurnIndex = turn === 'X' ? 0 : 1;
    const inactiveTurnIndex = turn === 'X' ? 1 : 0;
    
    turnXO[activeTurnIndex].classList.add('turn__bg');
    turnXO[inactiveTurnIndex].classList.remove('turn__bg');
}

// Function to reset the game
function resetGame() {
    turn = 'X';
    gameActive = true;
    winner = null;

    cells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('X', 'O', 'win');
    });

    gameStatus.textContent = `Player ${turn}'s turn`;
    turnXO.forEach(item => item.classList.remove('turn__bg'));
    turnXO[0].classList.add('turn__bg');
}
