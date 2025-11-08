//board

let board;
const rowcount = 21;
const colcount = 19;
const cellsize = 32;
const boardwidth = colcount * cellsize;
const boardheight = rowcount * cellsize;
let context;

//images
let blueghost;
let redghost;
let yellowghost;
let greenghost;
let up;
let down;
let left;
let right;
let wall;


//board setup 
const tileMap = [
  "XXXXXXXXXXXXXXXXXXX",
  "X                 X",
  "X XX XXX XXX XX XX",
  "X X   X X X   X  X",
  "XXXX XXXXX XXXXXXX",
  "OOOXX X       XOOO",
  "XXXX X XXrXX X XXXX",
  "O      bpo      O",
  "XXXX X XXXXX X XXXX",
  "OOOX X     X XOOOX",
  "XXXX X XXXXX X XXXX",
  "X X   X     X   X X",
  "X XX XXXXXXX XX XX",
  "X   X   P   X    X",
  "X X X XXXXX X X  X",
  "X X X       X X  X",
  "X XXXXXXXXXXXXX  X",
  "X                X",
  "XXXXXXXXXXXXXXXXXXX"
];



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

    //ghost images
    blueghost = new Image();
    blueghost.src = "icons/blue.png";
    redghost = new Image();
    redghost.src = "icons/red.png";
    yellowghost = new Image();
    yellowghost.src = "icons/yellow.png";
    greenghost = new Image();
    greenghost.src = "icons/green.png";

}