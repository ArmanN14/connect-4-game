const each = require('jest-each').default;
const {
  createBoard,
  takeTurn,
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
    [null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null],
  ]
  each([[rows, columns,
    expectedOutput], [secondRow, secondColumn, secondExpectedOutput]]).it('create a 2d array of initial board state', (row, column, expected) => {
    // Act
    const actualOutput = createBoard(row, column);
    // Assert
    expect(actualOutput).toStrictEqual(expected);
  });
});
