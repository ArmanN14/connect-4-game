const btn_grid = document.getElementById("btn_grid").addEventListener("click", gridSelection);
const grid = document.getElementById("grid");
const row_select = document.getElementById("row_select").value;
const column_select = document.getElementById('column_select').value;

function gridSelection() {
    //clear the grid if it was populated from a previous game
    grid.innerHTML = " ";
    
    // a function that creates a coonect 4 grid based on the use input 
    // first creating a row by looping over th enumber of rows entered
    for(let i=0; i < row_select; i++) {
        
        // create an element(div)
        const row = document.createElement("div"); 

        //assign row with class "row" and links with css
        row.className = "row";
        row.id = "row=" + i;
        // append the row to the grid, essentially adding the row element is the grid div element
        grid.appendChild(row);

        // each row will have columns follow same logic as row but instead of adding it to the
        // grid it gets added to the row.
        for(let j=0; j < column_select; j++){

            //create id for each column
            const column = document.createElement("div")
            for(let k = 0; k <=j; k++){
                column.id = "column="+k;
            }
            column.className = "column";
                const circle = document.createElement("div")
                    circle.className = "pawn";
                    column.appendChild(circle);

            row.appendChild(column);
        }
    }
}

