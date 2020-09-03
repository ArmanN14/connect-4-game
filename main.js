/* eslint-disable radix */
$('#btn_grid').click(gridSelection);
const grid = $('#grid');

function gridSelection() {
  grid.html(' ');
  // clear the grid if it was populated from a previous game
  const rowSelect = parseInt($('#row_select').val());
  const columnSelect = parseInt($('#column_select').val());

  // a function that creates a coonect 4 grid based on the use input
  // first creating a row by looping over th enumber of rows entered
  for (let i = 0; i < rowSelect; i++) {
    // create an element(div)
    const row = $('<div></div>').addClass('row').attr('id', 'row=' + i);
    // assign row with class "row" and links with css
    // append the row to the grid, essentially adding the row element is the grid div element
    grid.append(row);

    // each row will have columns follow same logic as row but instead of adding it to the
    // grid it gets added to the row.
    for (let j = 0; j < columnSelect; j++) {
      // create id for each column
      const column = $('<div></div>').addClass('column');
      const pawn = $('<div></div>').addClass('pawn');
      for (let k = 0; k <= j; k++) {
        column.attr('id', 'column=' + k);
        for (let l = 0; l <= k; l++) {
          pawn.attr('id', 'pawn=' + l);
        }
      }
      column.append(pawn);

      row.append(column);
    }
  }
}
