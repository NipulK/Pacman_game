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
  "O      byg      O",
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

//the reason for using set is to avoid duplicate walls. if we use array, there will be duplicate walls
const walls = new Set();
const food = new Set();
const ghosts = new Set();
let pacman;


//draw board
window.onload = function() {
    board = document.getElementById("board"); // get board from HTML
    board.width = boardwidth;
    board.height = boardheight;
    context = board.getContext("2d"); // used for drawing on the board

    
    loadImages();
    loadMap();

    console.log(walls.size);
    console.log(food.size);
    console.log(ghosts.size);
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

function loadMap() {
    walls.clear();
    food.clear();
    ghosts.clear();

    for (let r = 0; r < rowcount; r++) {
        for (let c = 0; c < colcount; c++) {
            
            const row = tileMap[r];
            const tileMapChar = row[c];

            const x = c * cellsize;
            const y = r * cellsize;

            if (tileMapChar == 'X') {
                //create wall block
                const wallBlock = new Block(wall, x, y, cellsize, cellsize);
                walls.add(wallBlock);
            }
            else if (tileMapChar == '') {
                //create food block
                const foodBlock = new Block(null, x+14, y+14, 4, 4); //the reason for x+14 and y+14 is to center the food block in the cell
                food.add(foodBlock);
            }
            else if (tileMapChar == 'P') {
                //create pacman block
                pacman = new Block(right, x, y, cellsize, cellsize);
            }
            else if (tileMapChar == 'r') {
                //create red ghost block
                const redGhostBlock = new Block(redghost, x, y, cellsize, cellsize);
                ghosts.add(redGhostBlock);
            }
            else if (tileMapChar == 'b') {
                //create blue ghost block
                const blueGhostBlock = new Block(blueghost, x, y, cellsize, cellsize);
                ghosts.add(blueGhostBlock);
            }
            else if (tileMapChar == 'y') {
                //create yellow ghost block
                const yellowGhostBlock = new Block(yellowghost, x, y, cellsize, cellsize);
                ghosts.add(yellowGhostBlock);
            }
            else if (tileMapChar == 'g') {
                //create green ghost block
                const greenGhostBlock = new Block(greenghost, x, y, cellsize, cellsize);
                ghosts.add(greenGhostBlock);
            }
        }
    }
}



//block class to create blocks
class Block {
    //constructor for blocks
    constructor(image,x,y,width,height) {
        this.image = image;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;

        //starting position (pacman and ghosts)
        this.startX = x;
        this.startY = y;
    }
}