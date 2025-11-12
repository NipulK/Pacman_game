//board
let board;
const rowCount = 21;
const columCount = 19;
const tileSize = 32;
const boardWidth = columCount * tileSize;
const boardHeight = rowCount * tileSize;
let context;

window.onload = function() {
    board = document.getElementById("board");
    board.width = boardWidth;
    board.height = boardHeight;
    context = board.getContext("2d");

}
