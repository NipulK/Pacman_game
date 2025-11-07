//board

let board;
const rowcount = 21;
const colcount = 19;
const cellsize = 32;
const boardwidth = colcount * cellsize;
const boardheight = rowcount * cellsize;
let context;

//images
let darkblue;
let lightblue;
let up;
let down;
let left;
let right;
let wall;



//draw board
window.onload = function() {
    board = document.getElementById("board"); // get board from HTML
    board.width = boardwidth;
    board.height = boardheight;
    context = board.getContext("2d"); // used for drawing on the board

    
    loadImages();
}

//load images
function loadImages() {

    //packman images
    up = new Image();
    up.src = "icons/up.png";
    down = new Image();
    down.src = "icons/down.png";
    left = new Image();
    left.src = "icons/left.png";
    right = new Image();
    right.src = "icons/right.png";

    //wall image
    wall = new Image();
    wall.src = "icons/wall.png";

    //board images
    darkblue = new Image();
    darkblue.src = "icons/darkblue.png";
    lightblue = new Image();
    lightblue.src = "icons/lightblue.png";

}