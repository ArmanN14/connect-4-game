const express = require('express');
const {
  createBoard,
  takeTurn,
} = require('./logic.js');
const app = express();

// static will load the index.html when no path is specified
app.use(express.static('./source/client'));

// exchange data with json format
app.use(express.json());

app.post('/game', (req, res) => {
  try {
    const board = createBoard(req.body.row, req.body.column);
    res.status(200);
    res.send(board);
  } catch (error) {
    res.send(error);
  }
});

app.post('/game/takeTurn', (req, res) => {
  try {
    const col = req.body.column;
    const colour = req.body.turnColour;
    const turnResult = {
      result: takeTurn(col, colour),
    };
    res.json(turnResult);
    res.status(200);
  } catch (error) {
    res.send(error);
  }
});

if (process.env.NODE_ENV !== 'test') {
  app.listen(8080, () => {
    console.log('server started on port 8080');
  });
}

module.exports = app;
