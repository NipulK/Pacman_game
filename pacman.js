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

const directions = ["U", "D", "L", "R"]; //ghost directions use to pick random direction

window.onload = function() {
    board = document.getElementById("board");
    board.width = boardWidth;
    board.height = boardHeight;
    context = board.getContext("2d");

    loadImages();   
    loadBoard();

    for (let ghost of ghosts) {
        const randomDirection = directions[Math.floor(Math.random() * 4)]; //4 use to get index from 0 to 3 
        ghost.updateDirection(randomDirection);
    }

    update();
    //console.log(walls.size);
    //console.log(foods.size);
    //console.log(ghosts.size);
    
    document.addEventListener("keyup", movepackman)
    //keyup and keydown are two different events
    //keyup - when the key is released
    //keydown - when the key is pressed down
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
                const food =new Block(null, x + 12, y + 12, 5, 5);
                foods.add(food);
            }
        }     
    }
}

function update() {
    //to be implemented
    move();
    draw();
    setTimeout(update, 50); //20 fps 1 -> 1000ms/20 = 50
}

function draw() {

    context.clearRect(0, 0, boardWidth, boardHeight); //clear the previous frame data
    //to be implemented
    //in here we will draw all the elements on the board (show the elements that we have in our sets)
    context.drawImage(pacman.image, pacman.x, pacman.y, pacman.width, pacman.height);

    for (let wall of walls) {
        context.drawImage(wall.image, wall.x, wall.y, wall.width, wall.height);
    }

    for (let ghost of ghosts) {
        context.drawImage(ghost.image, ghost.x, ghost.y, ghost.width, ghost.height);
    }

    context.fillStyle = "white"; //set the color of the food and fillstyle used to draw shapes
    for (let food of foods) {
        context.fillRect(food.x, food.y, food.width, food.height);
    }

}

function move() {
    //to be implemented
    pacman.x += pacman.velocityX;
    pacman.y += pacman.velocityY;

    //check wall collision for pacman
    for (let wall of walls) {
        if (Collison(pacman, wall)) {
            //reset pacman's position
            pacman.x -= pacman.velocityX;
            pacman.y -= pacman.velocityY;
        }
    }

    for (let ghost of ghosts) {
        ghost.x += ghost.velocityX;
        ghost.y += ghost.velocityY;

        //check wall collision for ghosts
        let collided = false;
        for (let wall of walls) {
            if (Collison(ghost, wall)) {
                ghost.x -= ghost.velocityX;
                ghost.y -= ghost.velocityY;
                collided = true;
                break;
            }
        }

        //if collided, pick a new random direction
        if (collided) {
            const randomDirection = directions[Math.floor(Math.random() * 4)];
            ghost.direction = randomDirection;
            ghost.velocityUpdate();
        }
    }
}

function movepackman(e) {
    if(e.key == "ArrowUp"|| e.key == "w") {
        pacman.updateDirection("U");
    }
    else if(e.key == "ArrowDown" || e.key == "s") {
        pacman.updateDirection("D");
    }
    else if(e.key == "ArrowLeft" || e.key == "a") {
        pacman.updateDirection("L");
    }
    else if(e.key == "ArrowRight" || e.key == "d") {
        pacman.updateDirection("R");
    }

    //update pacman image based on direction
    if(e.key == "ArrowUp"|| e.key == "w") {
        pacman.image = pacmanup;
    }
    else if(e.key == "ArrowDown" || e.key == "s") {
        pacman.image = pacmandown;
    }
    else if(e.key == "ArrowLeft" || e.key == "a") {
        pacman.image = pacmanleft;
    }
    else if(e.key == "ArrowRight" || e.key == "d") {
        pacman.image = pacmanright;
    }
}

//collision detection function
function Collison(block1, block2) {
    return (block1.x < block2.x + block2.width &&
            block1.x + block1.width > block2.x &&
            block1.y < block2.y + block2.height &&
            block1.y + block1.height > block2.y);
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

        this.direction = "right"; //initial direction of pacman
        this.velocityX = 0;
        this.velocityY = 0;
    }

    updateDirection(direction) {
        const prevDirection = this.direction;
        this.direction = direction;
        this.velocityUpdate();
        this.x += this.velocityX;
        this.y += this.velocityY;
        
        //check wall collision
        for (let wall of walls) {
            if (Collison(this, wall)) {
                //if there is a collision, revert to previous direction
                this.direction = prevDirection;
                this.velocityUpdate();
                break; //exit the loop once a collision is detected
            }
        }
    }

    velocityUpdate() {
        if(this.direction == "U") {
            this.velocityX = 0;
            this.velocityY = -tileSize/4;
        }
        else if(this.direction == "D") {
            this.velocityX = 0;
            this.velocityY = tileSize/4;
        }
        else if(this.direction == "L") {
            this.velocityX = -tileSize/4;
            this.velocityY = 0;
        }
        else if(this.direction == "R") {
            this.velocityX = tileSize/4;
            this.velocityY = 0;
        }
    }
}