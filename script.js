document.addEventListener('DOMContentLoaded', function () {
    let moveCount = 0;
  
    const boardSize = 5;
    const board = document.getElementById('board');
    const newGameButton = document.getElementById('newGameButton');
    const moveCounter = document.getElementById('moveCounter');
  
    // Create a random solvable board
    function createRandomBoard() {
      const boardArray = Array.from({ length: boardSize ** 2 }, () => Math.random() > 0.5);
      return boardArray;
    }
  
    // Render the board
    function renderBoard(boardArray) {
      board.innerHTML = '';
      for (let i = 0; i < boardArray.length; i++) {
        const square = document.createElement('div');
        square.classList.add('square');
        if (boardArray[i]) {
          square.classList.add('is-off');
        }
        square.addEventListener('click', () => {
          toggleSquares(boardArray, i);
          moveCount++;
          updateMoveCounter();
          checkWin(boardArray);
        });
        board.appendChild(square);
      }
    }
  
    // Toggle the state of a square and adjacent squares
    function toggleSquares(boardArray, index) {
      const row = Math.floor(index / boardSize);
      const col = index % boardSize;
  
      toggleSquare(boardArray, index);
      toggleSquare(boardArray, index - 1);
      toggleSquare(boardArray, index + 1);
      toggleSquare(boardArray, index - boardSize);
      toggleSquare(boardArray, index + boardSize);
  
      renderBoard(boardArray);
    }
  
    // Toggle the state of a single square
    function toggleSquare(boardArray, index) {
      if (index >= 0 && index < boardArray.length) {
        boardArray[index] = !boardArray[index];
      }
    }
  
    // Update the move counter
    function updateMoveCounter() {
      moveCounter.textContent = `Moves: ${moveCount}`;
    }
  
    // Check for a win
    function checkWin(boardArray) {
      if (boardArray.every(square => !square)) {
        window.alert('Congratulations! You did it!');
        // You can add more logic here for post-win actions
      }
    }
  
    // New Game button click event
    newGameButton.addEventListener('click', function () {
      moveCount = 0;
      updateMoveCounter();
      const newBoard = createRandomBoard();
      renderBoard(newBoard);
    });
  
    // Initial setup
    const initialBoard = createRandomBoard();
    renderBoard(initialBoard);
  });
  