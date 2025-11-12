//board
let board;
const rowCount = 21;
const columCount = 19;
const tileSize = 32;
const boardWidth = columCount * tileSize;
const boardHeight = rowCount * tileSize;
let context;

//images 
 let blueghost;
 let greenghost;
 let redghost;
 let yellowghost;
 let pacmanright;
 let pacmanleft;
 let pacmanup;
 let pacmandown;
 let wallimage;


window.onload = function() {
    board = document.getElementById("board");
    board.width = boardWidth;
    board.height = boardHeight;
    context = board.getContext("2d");

    loadImages();   
    loadBoard();


    //console.log(walls.size);
    //console.log(foods.size);
    //console.log(ghosts.size);
}

//tile map design
// X - wall , O - space , P - pacman , r - red ghost , b - blue ghost , g - green ghost , y - yellow ghost
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
    "O       bgy       O",
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

//the reason for using sets is to avoid duplicate entries
const walls = new Set();
const foods = new Set();
const ghosts = new Set();
let pacman; //the reason for not using set for pacman is because there is only one pacman


function loadImages() {

    blueghost = new Image();
    blueghost.src = "./icons/blue.png";

    greenghost = new Image();
    greenghost.src = "./icons/green.png";

    redghost = new Image();
    redghost.src = "./icons/red.png";

    yellowghost = new Image();
    yellowghost.src = "./icons/yellow.png";

    pacmanright = new Image();
    pacmanright.src = "./icons/right.png";

    pacmanleft = new Image();
    pacmanleft.src = "./icons/left.png";
    
    pacmanup = new Image();
    pacmanup.src = "./icons/up.png";

    pacmandown = new Image();
    pacmandown.src = "./icons/down.png";
    
    wallimage = new Image();
    wallimage.src = "./icons/wall.png"; 
}

function loadBoard() {
    for(let r = 0; r < rowCount; r++) {
        for(let c = 0; c < columCount; c++) {

            const row = tileMap[r];
            const tileMapchar = row[c];
            
            const x = c * tileSize;
            const y = r * tileSize;
            
            if(tileMapchar == "X") {
                const wall = new Block(wallimage, x, y, tileSize, tileSize);
                walls.add(wall);

                }
            else if(tileMapchar == "g") {
                const ghost = new Block(greenghost, x, y, tileSize, tileSize);
                ghosts.add(ghost);
            } 
            else if(tileMapchar == "b") {
                const ghost = new Block(blueghost, x, y, tileSize, tileSize);
                ghosts.add(ghost);
            } 
            else if(tileMapchar == "r") {
                const ghost = new Block(redghost, x, y, tileSize, tileSize);
                ghosts.add(ghost);
            } 
            else if(tileMapchar == "y") {
                const ghost = new Block(yellowghost, x, y, tileSize, tileSize);
                ghosts.add(ghost);
            } 
            else if(tileMapchar == "P") {
                pacman = new Block(pacmanright, x, y, tileSize, tileSize);
            }

            else if(tileMapchar == " ") {
                const food =new Block(null, x + 4, y + 4, 4, 4);
                foods.add(food);
            }
        }     
    }
}

class Block{
    constructor(image,x, y, width, height){

        this.image = image;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;

        /*the reason for startx and starty is to reset the position 
        when pacman collides with a ghost*/
        this.startx = x;
        this.starty = y;
    }
}