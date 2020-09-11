$('#btn_grid').click(gridSelection);
$('#btn_new_game').click(resetGame);
const grid = $('#grid');
let board;
let currentPlayer = 'red';

function gridSelection() {
  grid.html('');
  // clear the grid if it was populated from a previous game
  const rowSelect = Number.parseInt($('#row_select').val(), 10) || 6;

  const columnSelect = Number.parseInt($('#column_select').val(), 10) || 7;
  const body = {
    row: rowSelect,
    column: columnSelect,
  };
  $.ajax({
    type: 'POST',
    url: '/game',
    data: JSON.stringify(body),
    contentType: 'application/json',
    success: (result) => {
      console.log(result);
    },
  });
  // createBoard(rowSelect, columnSelect);
  // a function that creates a coonect 4 grid based on the use input
  // first creating a row by looping over th enumber of rows entered

  for (let i = 0; i < rowSelect; i++) {
    // create an element(div)
    const row = $('<div></div>').addClass('row').attr('id', `row-${i}`);

    // assign row with class "row" and links with css
    // append the row to the grid, essentially adding the row element is the grid div element
    grid.append(row);

    // each row will have columns follow same logic as row but instead of adding it to the
    // grid it gets added to the row.
    for (let j = 0; j < columnSelect; j++) {
      // create id for each column
      const column = $('<div></div>').addClass('column');
      const pawn = $('<div></div>').addClass('pawn');
      column.attr('id', `column-${j}`);
      for (let k = 0; k <= i; k++) {
        pawn.attr('id', `pawn-${k}`);
      }

      column.click((event) => {
        const col = event.currentTarget.id.split('-')[1];
        const clickEvent = {
          column: col,
        };
        $.ajax({
          type: 'POST',
          url: '/game/takeTurn',
          data: JSON.stringify(clickEvent),
          contentType: 'application/json',
          success: (result) => {
            drawPawn(result.row, col);
          },
        });
        // togglePlayerIndicator();
        // checkWinnerColumn(col);
        // checkWinnerRow(rowPawn);
      });

      column.append(pawn);
      row.append(column);
    }
  }
}

function drawPawn(rowNumber, columnNumber) {
  $(`#column-${columnNumber} #pawn-${rowNumber}`).css('background-color', currentPlayer);
}

// seperate logic from frontent before moving to backend
function togglePlayerIndicator() {
  if (currentPlayer === 'red') {
    currentPlayer = 'yellow';
    $('#player_1').css('background-color', 'white');
    $('#player_2').css('background-color', 'yellow');
  } else {
    currentPlayer = 'red';
    $('#player_2').css('background-color', 'white');
    $('#player_1').css('background-color', 'red');
  }
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
  redBanner(redWin);
  yellowBanner(yellowWin);
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
  redBanner(redWin);
  yellowBanner(yellowWin);
}
// move logic to server
function redBanner(red) {
  if (red === 3) {
    $('#banner').text('RED WIN').css('background-color', 'red');
  }
}
// move logic to server
function yellowBanner(yellow) {
  if (yellow === 3) {
    $('#banner').text('YELLOW WIN').css('background-color', 'yellow');
  }
}
// move the fucntions to server and keep the css here
function resetGame() {
  gridSelection();
  currentPlayer = 'yellow';
  togglePlayerIndicator();
  $('#banner').text('Keep playing...').css('background-color', 'white');
}
if (typeof module !== 'undefined') {
  module.exports = {
    gridSelection,
    takeTurn,
  };
}
