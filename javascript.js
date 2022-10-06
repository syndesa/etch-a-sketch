const container = document.querySelector('.grid-container');
const sizeButton = document.querySelector('#gridsize');
const resetButton = document.querySelector('#reset');

let mouseIsDown = false; 


document.addEventListener('mousedown', function() {mouseIsDown = true});
document.addEventListener('mouseup', function() {mouseIsDown = false});
document.ondragstart = function() {return false};

resetButton.addEventListener('click', function() { initGrid(16,16);});


// Initialize a row * col grid layout
function initGrid(numRows, numCols){
    // Clear the grid 
    container.innerHTML= ''; 
    // Set grid container properties
    container.style.setProperty('--col-count', numCols);
    container.style.setProperty('--row-count', numRows);

    for (let i = 0; i < numCols; i++){
        for (let j = 0; j<numRows; j++){
            let gridTile = document.createElement('div');
            gridTile.classList.add('grid-item');
            container.appendChild(gridTile);
            gridTile.addEventListener('mousemove', () => {
                if (mouseIsDown) {gridTile.style.backgroundColor = document.getElementById('color').value;}
            })
        }        
    }
}

sizeButton.addEventListener('click', ()=> {
    
    while(true){
    colSize = prompt('How many columns? (max 100)');
    rowSize = prompt('How many rows? (max 100)');
    if (colSize === null || rowSize === null) break;
    if(colSize>100 || rowSize > 100) {
        alert('Max size exceeded. Try again. ')
        continue
    } else { 
        initGrid(rowSize, colSize);
        break
    }
    
    }


})


initGrid(16, 16);


