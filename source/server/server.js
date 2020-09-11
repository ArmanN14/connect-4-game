const express = require('express');
const {
  createBoard,
  takeTurn,
  checkWinnerRow,
  checkWinnerColumn
} = require('./logic.js');
const app = express();

// static will load the index.html when no path is specified
app.use(express.static('./source/client'));

// exchange data with json format
app.use(express.json());

app.post('/game', (req, res) => {
  console.log(createBoard(req.body.row, req.body.column));
});

app.post('/game/takeTurn', (req, res) => {
  const col = req.body.column;
  const turnResult = {
    row: takeTurn(col),
  };
  res.json(turnResult);
});
app.listen(8080, () => {
  console.log('Server started at port: 8080');
});

// when using post rememer to include content-type: 'application/json'
