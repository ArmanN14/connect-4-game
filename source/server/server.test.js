const request = require('supertest');
const app = require('./server');
const { state } = require('./logic.js');

describe('POST /game', () => {
  const board = [
    [null, null, null, null, null, null],
    [null, null, null, null, null, null],
    [null, null, null, null, null, null],
    [null, null, null, null, null, null],
    [null, null, null, null, null, null],
    [null, null, null, null, null, null],
    [null, null, null, null, null, null],
  ];
  it('should return a 2d array of the baord', (done) => {
    request(app)
      .post('/game')
      .send({
        row: 6,
        column: 7,
      })
      .expect(200, board)
      .end(done);
  });
});

describe('POST /game/takeTurn', () => {
  state.board = [
    [null, null, null, null, null, null],
    [null, null, null, null, null, null],
    [null, null, null, null, null, null],
    [null, null, null, null, null, null],
    [null, null, null, null, null, null],
    [null, null, null, null, null, null],
    [null, null, null, null, null, null],
  ];
  const result = {
    result: {
      currentRow: 5,
      roWin: null,
      colWin: null,
    },
  };
  it('should retun the row and if there is any winner', (done) => {
    request(app)
      .post('/game/takeTurn')
      .send({
        column: 0,
        turnColour: 'red',
      })
      .expect(200, result)
      .end(done);
  });
});
