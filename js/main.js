const movementDisplay = document.getElementById('movement');
const game = document.getElementById('game');
let gameOver = true;
let hit = false;

class Crawler {
    constructor(x, y, width, height, color) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = color;
        this.alive = true;
    }

    render() {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }

    moveVert(change) {
        if (this.checkBoundsY(change)) {
            this.y = this.y + change;
        }
    }

    moveHoriz(change) {
        if (this.checkBoundsX(change)) {
            this.x = this.x + change;
        }
    }

    checkBoundsX(change) {
        let newPosition = this.x + change;
        if ((0 <= newPosition) && (newPosition <= 800)) {
            return true;
        } else {
            return false;
        }
    }

    checkBoundsY(change) {
        let newPosition = this.y + change;
        if (0 <= newPosition && newPosition <= 400) {
            return true;
        } else {
            return false;
        }
    }
}

const ogre = new Crawler(10, 10, 40, 80, '#BADA55');

const hero = new Crawler(100, 100, 20, 20, 'hotpink');

/*
function drawBox(x, y, dX, dY, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, dX, dY)
} */

function rePaint() {
    if (!gameOver) {
        //clear canvas
        ctx.clearRect(0, 0, game.width, game.height);
        //re render
        detectHit();
        if (hero.alive) { hero.render(); }
        if (ogre.alive) { ogre.render(); }
    }
}

function detectHit() {
    if (hero.x < (ogre.x + ogre.width) && (hero.x + hero.width) > ogre.x) {
        if (ogre.y < (hero.y + hero.height) && (ogre.y + ogre.height) > hero.y) {
            hit = true;
        }
    } else {
        hit = false;
    }
    if (hit === true) {
        ogre.alive = false

        gameOver = true;
    }
}

//first set canvas size to match actual page
//changes size of canvas which automatically thinks it is 180x360 no matter how big you actually made it
//this is the CSS of the canvas in an object
const computedStyle = getComputedStyle(game);
const height = computedStyle.height;
const width = computedStyle.width;
game.setAttribute('width', width);
game.setAttribute('height', height);

//then grab context
let ctx = game.getContext('2d');
/*
//then 
//establish how to do things
ctx.fillStyle = 'white';
ctx.strokeStyle = 'red';
ctx.lineWidth = 10;

//then draw
//set these in x, y, deltaX, deltaY
//draws in order written
ctx.fillRect(5, 5, 100, 100);
//coordinates x,y is midpoint of the border in the top right corner
ctx.strokeRect(0, 0, 100, 100);

drawBox(150, 150, 50, 50, 'orange');
*/
setInterval(rePaint, 80);

document.querySelector('#btm-right').addEventListener('click', function() {
    gameOver = false;
    hero.render()
    ogre.render()
})

//listen for keypress - use keyCode or key
document.addEventListener('keyup', function(e) {
    if (e.key === 'w') {
        //up
        let change = -10;
        hero.moveVert(change);
    } else if (e.key === 's') {
        //down
        let change = 10;
        hero.moveVert(change);
    } else if (e.key === 'a') {
        //left
        let change = -10;
        hero.moveHoriz(change);
    } else if (e.key === 'd') {
        //right
        let change = 10;
        hero.moveHoriz(change);
    }
})