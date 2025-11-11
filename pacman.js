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
    "X        X        X",
    "X XX XXX X XXX XX X",
    "X                 X",
    "X XX X XXXXX X XX X",
    "X    X       X    X",
    "XXXX XXXX XXXX XXXX",
    "OOOX X       X XOOO",
    "XXXX X XXrXX X XXXX",
    "O       bpo       O",
    "XXXX X XXXXX X XXXX",
    "OOOX X       X XOOO",
    "XXXX X XXXXX X XXXX",
    "X        X        X",
    "X XX XXX X XXX XX X",
    "X  X     P     X  X",
    "XX X X XXXXX X X XX",
    "X    X   X   X    X",
    "X XXXXXX X XXXXXX X",
    "X                 X",
    "XXXXXXXXXXXXXXXXXXX" 
];


//the reason for using set is to avoid duplicate walls. if we use array, there will be duplicate walls
const walls = new Set();
const food = new Set();
const ghosts = new Set();
let pacman;


//draw board
window.onload = function() {
    board = document.getElementById("board");
    board.height = boardHeight;
    board.width = boardWidth;
    context = board.getContext("2d"); //used for drawing on the board

    loadImages();
    loadMap();
    
    console.log(walls.size)
    console.log(foods.size)
    console.log(ghosts.size)

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
    foods.clear();
    ghosts.clear();

    for (let r = 0; r < rowCount; r++) {
        for (let c = 0; c < columnCount; c++) {
            const row = tileMap[r];
            const tileMapChar = row[c];

            const x = c*tileSize;
            const y = r*tileSize;

            if (tileMapChar == 'X') { //block wall
                const wall = new Block(wallImage, x, y, tileSize, tileSize);
                walls.add(wall);  
            }
            else if (tileMapChar == 'b') { //blue ghost
                const ghost = new Block(blueGhostImage, x, y, tileSize, tileSize);
                ghosts.add(ghost);
            }
            else if (tileMapChar == 'o') { //orange ghost
                const ghost = new Block(orangeGhostImage, x, y, tileSize, tileSize);
                ghosts.add(ghost);
            }
            else if (tileMapChar == 'p') { //pink ghost
                const ghost = new Block(pinkGhostImage, x, y, tileSize, tileSize);
                ghosts.add(ghost);
            }
            else if (tileMapChar == 'r') { //red ghost
                const ghost = new Block(redGhostImage, x, y, tileSize, tileSize);
                ghosts.add(ghost);
            }
            else if (tileMapChar == 'P') { //pacman
                pacman = new Block(pacmanRightImage, x, y, tileSize, tileSize);
            }
            else if (tileMapChar == ' ') { //empty is food
                const food = new Block(null, x + 14, y + 14, 4, 4);
                foods.add(food);
            }
        }
    }
}


//block class to create blocks
class Block {
    constructor(image,x,y,width,height) {
        this.image = image;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.startX = x;
        this.startY = y;
    }
}
