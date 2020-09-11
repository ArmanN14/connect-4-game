let board;
let currentPlayer = 'red';

function createBoard(rows, columns) {
  board = [...Array(columns).keys()].map(i => Array(rows).fill(null));
  return console.log(board);
}

// move to backend without any change
function takeTurn(column) {
  for (let row = board[column].length - 1; row >= 0; row--) {
    if (board[column][row] === null) {
      board[column][row] = currentPlayer;
      return row;
    }
  }
  return console.log('full');
}

// move to backend as it is however change to return when red or yellow wins for the frontend
function checkWinnerColumn(currentColumn) {
  let redWin = 0;
  let yellowWin = 0;
  for (let i = board[currentColumn].length; i > 0; i--) {
    if (board[currentColumn][i] === 'red' && board[currentColumn][i - 1] === 'red') {
      redWin += 1;
    }
    if (board[currentColumn][i] === 'yellow' && board[currentColumn][i - 1] === 'yellow') {
      yellowWin += 1;
    }
  }
}
// move to backend as it is however change to return when red or yellow wins for the frontend
function checkWinnerRow(currentRow) {
  let redWin = 0;
  let yellowWin = 0;
  for (let i = 0; i < board[i].length; i++) {
    if (board[i][currentRow] === 'red' && board[i + 1][currentRow] === 'red') {
      redWin += 1;
    }
    if (board[i][currentRow] === 'yellow' && board[i + 1][currentRow] === 'yellow') {
      yellowWin += 1;
    }
  }
}

if (typeof module !== 'undefined') {
  module.exports = {
    createBoard,
    takeTurn,
    checkWinnerColumn,
    checkWinnerRow,
  };
}
