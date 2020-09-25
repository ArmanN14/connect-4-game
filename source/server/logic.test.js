const each = require('jest-each').default;
const {
  createBoard,
  takeTurn,
  state,
  checkWinnerColumn,
  checkWinnerRow,
  diagonalWin,
} = require('./logic.js');

describe('boardCreation', () => {
  const rows = 6;
  const columns = 7;
  const expectedOutput = [
    [null, null, null, null, null, null],
    [null, null, null, null, null, null],
    [null, null, null, null, null, null],
    [null, null, null, null, null, null],
    [null, null, null, null, null, null],
    [null, null, null, null, null, null],
    [null, null, null, null, null, null],
  ];
  const secondRow = 8;
  const secondColumn = 10;
  const secondExpectedOutput = [
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
  ];

  each([[rows, columns, expectedOutput], [secondRow, secondColumn, secondExpectedOutput]]).it('create a 2d array of initial board state', (row, column, expected) => {
    // Act
    const actualOutput = createBoard(row, column);
    // Assert
    expect(actualOutput).toStrictEqual(expected);
  });
});
describe('takeTurn tests', () => {
  test('takeTurn returns the row a pawn is placed and any winners', () => {
    state.board = [
      [null, null, null, null, null, null],
      [null, null, null, null, null, null],
      [null, null, null, null, null, null],
      [null, null, null, null, null, null],
      [null, null, null, null, null, null],
      [null, null, null, null, null, null],
      [null, null, null, null, null, null],
    ];
    const currentPlayer = 'red';
    const column = 0;
    const output = {
      currentRow: 5,
      roWin: null,
      colWin: null,
    };
    const turnOutput = takeTurn(column, currentPlayer);
    expect(turnOutput).toEqual(output);
  });

  test('takeTurn returns full when the column is full', () => {
    state.board = [
      ['yellow', 'red', 'yellow', 'red', 'yellow', 'red'],
      [null, null, null, null, null, null],
      [null, null, null, null, null, null],
      [null, null, null, null, null, null],
      [null, null, null, null, null, null],
      [null, null, null, null, null, null],
      [null, null, null, null, null, null],
    ];
    const currentPlayer = 'red';
    const column = 0;
    const output = 'full';
    const turnOutput = takeTurn(column, currentPlayer);
    expect(turnOutput).toEqual(output);
  });
});
describe('column win tests', () => {
  test('checkWinnerColumn returns red when win condition is met in a column', () => {
    state.board = [
      [null, null, 'red', 'red', 'red', 'red'],
      [null, null, null, 'yellow', 'yellow', 'yellow'],
      [null, null, null, null, null, null],
      [null, null, null, null, null, null],
      [null, null, null, null, null, null],
      [null, null, null, null, null, null],
      [null, null, null, null, null, null],
    ];
    const column = 0;
    const output = 'red';
    const turnOutput = checkWinnerColumn(column);
    expect(turnOutput).toEqual(output);
  });
  test('checkWinnerColumn returns yellow when win condition is met in a column', () => {
    state.board = [
      [null, null, 'yellow', 'yellow', 'yellow', 'yellow'],
      [null, null, null, 'red', 'red', 'red'],
      [null, null, null, null, null, 'red'],
      [null, null, null, null, null, null],
      [null, null, null, null, null, null],
      [null, null, null, null, null, null],
      [null, null, null, null, null, null],
    ];
    const column = 0;
    const output = 'yellow';
    const turnOutput = checkWinnerColumn(column);
    expect(turnOutput).toEqual(output);
  });
  test('checkWinnerColumn returns null when no win condition is met in a column', () => {
    state.board = [
      [null, 'red', 'yellow', 'red', 'red', 'red'],
      [null, null, null, 'yellow', 'yellow', 'yellow'],
      [null, null, null, null, null, null],
      [null, null, null, null, null, null],
      [null, null, null, null, null, null],
      [null, null, null, null, null, null],
      [null, null, null, null, null, null],
    ];
    const column = 0;
    const output = null;
    const turnOutput = checkWinnerColumn(column);
    expect(turnOutput).toEqual(output);
  });
});

describe('row win tests', () => {
  test('checkWinnerRow returns red when win condition is met in a row', () => {
    state.board = [
      [null, null, null, 'yellow', 'red', 'red'],
      [null, null, null, 'yellow', 'yellow', 'red'],
      [null, null, null, null, null, 'red'],
      [null, null, null, null, null, 'red'],
      [null, null, null, null, null, null],
      [null, null, null, null, null, null],
      [null, null, null, null, null, null],
    ];
    const currentRow = 5;
    const output = 'red';
    const turnOutput = checkWinnerRow(currentRow);
    expect(turnOutput).toEqual(output);
  });

  test('checkWinnerRow returns yellow when win condition is met in a row', () => {
    state.board = [
      [null, null, null, 'red', 'red', 'yellow'],
      [null, null, null, 'red', 'red', 'yellow'],
      [null, null, null, null, null, 'yellow'],
      [null, null, null, null, null, 'yellow'],
      [null, null, null, null, null, null],
      [null, null, null, null, null, null],
      [null, null, null, null, null, null],
    ];
    const currentRow = 5;
    const output = 'yellow';
    const turnOutput = checkWinnerRow(currentRow);
    expect(turnOutput).toEqual(output);
  });

  test('checkWinnerRow returns null when no win condition is met in a row', () => {
    state.board = [
      [null, null, null, 'yellow', 'red', 'red'],
      [null, null, null, 'yellow', 'yellow', 'red'],
      [null, null, null, null, null, 'red'],
      [null, null, null, null, null, null],
      [null, null, null, null, null, null],
      [null, null, null, null, null, null],
      [null, null, null, null, null, null],
    ];
    const currentRow = 5;
    const output = null;
    const turnOutput = checkWinnerRow(currentRow);
    expect(turnOutput).toEqual(output);
  });
});

describe('diagonal wins tests', () => {
  test('check positive diagonal wins', () => {
    state.board = [
      [null, null, null, null, 'yellow', 'red'],
      [null, null, null, null, 'red', 'yellow'],
      [null, null, null, 'red', 'red', 'yellow'],
      [null, null, 'red', 'yellow', 'red', 'yellow'],
      [null, null, null, null, null, null],
      [null, null, null, null, null, null],
      [null, null, null, null, null, null],
    ];
    const row = 5;
    const column = 0;
    const output1 = 'red';
    const diagWinOutput = diagonalWin(column, row);
    expect(diagWinOutput).toEqual(output1);
  });
});
