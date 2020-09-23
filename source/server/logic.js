const fs = require('fs').promises;

let state = {
  board: [],
};

function createBoard(rows, columns) {
  state.board = [...Array(columns).keys()].map(i => Array(rows).fill(null));
  return state.board;
}
// does it empty the state after the first run therefore the board is empty again
async function writeGameState() {
  try {
    const boardState = state.board;
    const lPS = state.lastPlayerServer;
    const body = {
      boardState,
      lPS,
    };
    await fs.writeFile('./source/server/gameData.json', JSON.stringify(body), 'utf-8');
  } catch (error) {
    console.log(error);
  }
}

async function takeTurn(column, currentPlayer) {
  for (let row = state.board[column].length - 1; row >= 0; row--) {
    if (state.board[column][row] === null) {
      state.board[column][row] = currentPlayer;
      const rowWin = checkWinnerRow(row);
      const columnWin = checkWinnerColumn(column);
      await writeGameState();
      const result = {
        currentRow: row,
        roWin: rowWin,
        colWin: columnWin,
      };
      return result;
    }
  }
  return 'full';
}

function checkWinnerColumn(currentColumn) {
  let redWin = 0;
  let yellowWin = 0;
  for (let i = state.board[currentColumn].length; i > 0; i--) {
    if (state.board[currentColumn][i] === 'red' && state.board[currentColumn][i - 1] === 'red') {
      redWin += 1;
    } else {
      redWin = 0;
    }
    if (state.board[currentColumn][i] === 'yellow' && state.board[currentColumn][i - 1] === 'yellow') {
      yellowWin += 1;
    } else {
      yellowWin = 0;
    }
    if (redWin === 3) {
      return 'red';
    }
    if (yellowWin === 3) {
      return 'yellow';
    }
  }
  return null;
}

function checkWinnerRow(currentRow) {
  let redWin = 0;
  let yellowWin = 0;
  for (let i = 0; i < state.board[i].length; i++) {
    if (state.board[i][currentRow] === 'red' && state.board[i + 1][currentRow] === 'red') {
      redWin += 1;
    } else {
      redWin = 0;
    }
    if (state.board[i][currentRow] === 'yellow' && state.board[i + 1][currentRow] === 'yellow') {
      yellowWin += 1;
    } else {
      yellowWin = 0;
    }
    if (redWin === 3) {
      return 'red';
    }
    if (yellowWin === 3) {
      return 'yellow';
    }
  }
  return null;
}

if (typeof module !== 'undefined') {
  module.exports = {
    createBoard,
    takeTurn,
    checkWinnerColumn,
    checkWinnerRow,
    state,
    writeGameState,
  };
}
