//board

let board;
const rowcount = 21;
const colcount = 19;
const cellsize = 32;
const boardwidth = colcount * cellsize;
const boardheight = rowcount * cellsize;
let context;

//draw board
window.onload = function() {
    board = document.getElementById("board"); // get board from HTML
    board.width = boardwidth;
    board.height = boardheight;
    context = board.getContext("2d"); // used for drawing on the board

    drawBoard();
}