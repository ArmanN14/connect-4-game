$('#btn_grid').click(gridSelection);
const grid = $('#grid');
let board;
let currentPlayer = 'red';

function gridSelection() {
  grid.html('');
  // clear the grid if it was populated from a previous game
  const rowSelect = Number.parseInt($('#row_select').val(), 10) || 6;

  const columnSelect = Number.parseInt($('#column_select').val(), 10) || 7;

  createBoard(rowSelect, columnSelect);
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
        drawPawn(i, col);
      });

      column.append(pawn);
      row.append(column);
    }
    // $('#column-' + j).click(() => drawPawn(j));
  }
}

function createBoard(rows, columns) {
  board = [...Array(rows).keys()].map(i => Array(columns).fill(null));
}

function drawPawn(rowNumber, columnNumber) {
  $(`#column-${columnNumber} #pawn-${rowNumber}`).css('background-color', currentPlayer);
  takeTurn(rowNumber, columnNumber);
  console.log(board);
}

function takeTurn(row, column) {
  board[column][row] = currentPlayer;
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
if (typeof module !== 'undefined') {
  module.exports = {
    createBoard,
    gridSelection,
    takeTurn,
  }
}
