const container = document.querySelector('.grid-container');
const sizeButton = document.querySelector('#gridsize');
const resetButton = document.querySelector('#reset');
const eraserTool = document.querySelector('#eraser');
const brushTool = document.querySelector('#color');

let mouseIsDown = false; 
let selectedTool = null;

document.addEventListener('mousedown', function() {mouseIsDown = true});
document.addEventListener('mouseup', function() {mouseIsDown = false});
document.ondragstart = function() {return false};

eraserTool.addEventListener('click', () => {
    brushTool.style.backgroundColor = 'rgb(223, 222, 222)';
    selectedTool = 'eraser';
    eraserTool.style.backgroundColor = 'lightblue';
    document.body.style.cursor = "url('./eraser.cur'), auto";
})

brushTool.addEventListener('click', ()=>{
    eraserTool.style.backgroundColor = 'rgb(223, 222, 222)';
    selectedTool = 'brush';
    brushTool.style.backgroundColor = 'lightblue';
    document.body.style.cursor = "url('./Actions-draw-brush-icon.png'), auto";
})

resetButton.addEventListener('click', clearCanvas);

function clearCanvas(){
    let tiles = document.querySelectorAll('.grid-item');
    tiles.forEach((tile) => {
        tile.style.backgroundColor = '';
    });
    
}


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
                if (mouseIsDown && selectedTool === 'brush') {gridTile.style.backgroundColor = document.getElementById('color').value;}
                if (mouseIsDown && selectedTool === 'eraser') {gridTile.style.backgroundColor = '';}
            })
        }        
    }
}

sizeButton.addEventListener('click', ()=> {
    while(true){
    
    colSize = prompt('How many columns? (max 100)');
    rowSize = prompt('How many rows? (max 100)');
    if (colSize === null || rowSize === null) break;
    if (colSize === "" || rowSize === "") break;
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


