/* -------- setup -------- */

window.onload = setup;
window.onresize = resizeCanvas;
window.onmousedown = down;
window.onmouseup = up;
window.onkeydown = down;
window.onkeyup = up;
addEventListener("touchstart", down, true);
addEventListener("touchend", up, true);

function setup() {
    setupCanvas();
    setupGame();
    draw();
}

/* -------- objects -------- */

function rect(x, y, width, height, color) {
    this.x = typeof x !== undefined ? x : 0;
    this.y = typeof y !== undefined ? y : 0;
    this.width = typeof width !== undefined ? width : 10;
    this.height = typeof height !== undefined ? height : 200;
    this.color = typeof color !== undefined ? color : "#FFFFFF";
    // draw
}

function user(pos, ahead, lift, color) {
    this.pos = typeof pos !== undefined ? pos : 50;
    this.ahead = typeof ahead !== undefined ? ahead : 100; // make sure it's divisible by 10
    this.lift = typeof lift !== undefined ? lift : 0;
    this.color = typeof color !== undefined ? color : "#0000FF";
}
var you = new user(50, 100, 0, "#0000FF");

/* -------- variables -------- */

var canvas;
var context;

// game variables
var gameInterval;
var score; // distance you have traveled
var caveRects; // list of rects making up cave
var caveBlocks; // list of obstruction blocks
var youFollowers; // list of tail rectangles
// in game variables
var fuel; // user input - mouse down? - bool
var caveHeight; // height of the new blocks
var caveBlockTimer; // counts down until next block

/* -------- functions -------- */

function setupCanvas() {
    canvas = document.getElementById("screen");
    context = canvas.getContext("2d");
    
    canvas.setAttribute("width", window.innerWidth);
    canvas.setAttribute("height", window.innerHeight - document.getElementById("information").scrollHeight);
}

function resizeCanvas() {
    canvas.setAttribute("width", window.innerWidth);
    canvas.setAttribute("height", window.innerHeight - document.getElementById("information").scrollHeight);
    
    draw();
}

function setupGame() {
    caveHeight = canvas.getAttribute("height");
    caveRects = new Array(Math.ceil(window.innerWidth / 10)); // make enough to have 10px wide cave rects across screen
    for (r = 0; r < caveRects.length; r++) {
	caveRects[r] = new rect(r * 10, 0, 10, caveHeight, "#7DE66E");
    }
    caveBlocks = [];
    youFollowers = new Array(you.ahead / 10);
    for (f = 0; f < youFollowers.length; f++) {
	youFollowers[f] = new rect(f * 10, you.pos, 10, 5, "#0000FF");
    }
    // you already set up - foo!
    score = (caveRects.length - (you.ahead / 10)) * -1
}

function resetGame() {
    score = (caveRects.length - (you.ahead / 10)) * -1
    // reset cave
    caveHeight = canvas.getAttribute("height");
    for (r = 0; r < caveRects.length; r++) {
	caveRects[r].y = 0;
	caveRects[r].height = caveHeight;
    }
    caveBlocks = [];
    caveBlockTimer = 10;
    // reset you
    you.pos = 50;
    you.ahead = 100;
    you.lift = 0;
    for (f = 0; f < youFollowers.length; f++) {
	youFollowers[f].y = you.pos;
    }
    // draw
    draw();
}

function down() {
    fuel = true;
}

function up() {
    fuel = false;
}

function beginGame() {
    resetGame();
    gameInterval = setInterval(gameLoop, 50);
    changeControlButtonToPause(); // in UI manipulation
}

function endGame() {
    clearInterval(gameInterval);
    changeControlButtonToAgain(); // in UI manipulation
}

function pauseGame() {
    clearInterval(gameInterval);
    changeControlButtonToResume(); // in UI manipulation
}

function resumeGame() {
    gameInterval = setInterval(gameLoop, 50);
    changeControlButtonToPause(); // in UI manipulation
}

function gameLoop() {
    score = score + 1; // keep track
    
    // get user input
	// with event listeners of mouseDown and mouseUp
    
    // cave rects
	// change cave top
    var oldCaveTop = caveRects[caveRects.length-2].y;
    var currentCaveTop = caveRects[caveRects.length-1].y;
    var difference = currentCaveTop - oldCaveTop; // negative = cave moving down // positive = cave moving up
    var changeChance = Math.floor(Math.random() * 10); // 1/10 chance of changing direction
    var change = Math.floor(Math.random()* 10 + 1); // amount to change by
    if (difference < 0) { // cave is going down
	change = change * -1;
    }
    if (changeChance == 0) { // change direction - go up
	change = change * -1;
    }
    var newCaveTop = currentCaveTop + change; // apply change
	// change cave height
    var newCaveHeight = 100000 / (score + 500) + 42; // interesting formula, try it out sometime (y=100000/(x+500)+42) you'll see
    caveHeight = newCaveHeight // TODO: see if this can be eliminated (caveHeight variable entirely)
	// keep cave within bounds
    if (newCaveTop < 0 || newCaveTop > canvas.height - caveHeight) { // if the cave is going out of bounds
	newCaveTop = currentCaveTop + change * -1; // force it to turn around
    }
	// advance 1 segment
    shiftCaveRects(newCaveTop, newCaveHeight);
    
    // cave blocks
    caveBlockTimer = caveBlockTimer - 1; // update loop count
    
    if (caveBlockTimer == 0) { // if timer is up
	caveBlockTimer = Math.floor(Math.random() * 6) + 10; // reset timer to 10 - 15 loops
	
	var newBlockHeight = (100000 / (score + 1500)) - 10; // another interesting formula!
	var newBlockTop = Math.floor(Math.random() * (newCaveHeight - newBlockHeight)) + newCaveTop; // randomly between top of cave and bottom of cave
	caveBlocks.push(new rect(caveRects[caveRects.length-1].x, newBlockTop, 10, newBlockHeight, "#000000")); // add a fresh block
	    // a bit of courtesy
	if (newBlockHeight < 10) { // if it's super small
	    caveBlocks.pop(caveBlocks.length-1); // don't bother keeping them anymore - the cave is tough enough now!
	}
    }
    
    if (caveBlocks[0] != undefined) { // it starts with 0 items, so just checking...
	if (caveBlocks[0] < 0) { // if the oldest block has gone off screen
	    caveBlocks.pop(0); // remove it
	}
    }
	// advance 1 segment
    shiftCaveBlocks();
    
    // you
    if (fuel) {
	you.lift = you.lift - 1; // accelerate upwards
    } else {
	you.lift = you.lift + 1; // accelerate downwards
    }
	// update
    shiftYouFollowers(); // make the snake wiggle! // do this before setting the new position
    you.pos = you.pos + you.lift; // change position
    
    // test for death
    var youTop = you.pos;
    var youBottom = youTop + 5;
    var caveTop = caveRects[you.ahead / 10].y;
    var caveBottom = caveTop + caveRects[you.ahead / 10].height;
    if (youTop < caveTop || youBottom > caveBottom) { // if you're outside the cave (you've crashed with the wall)
	endGame()
    }
    for (b = 0; b < caveBlocks.length; b++) {
	if (caveBlocks[b].x == you.ahead) {
	    var blockTop = caveBlocks[b].y
	    var blockBottom = blockTop + caveBlocks[b].height
	    if (youBottom > blockTop && youTop < blockBottom) { // if you're within the block (you've crashed with the block)
		endGame()
	    }
	}
    }
    
    // draw
    draw();
    updateScoreDisplay();
}

/* -------- actions -------- */

function draw() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    caveRects.draw();
    caveBlocks.draw();
    youFollowers.draw();
    you.draw();
}

function updateScoreDisplay() {
    document.getElementById("score").innerHTML = score;
}

function shiftCaveRects(newCaveTop, newCaveHeight) {
    for (r = 0; r < caveRects.length - 1; r++) {
	caveRects[r].y = caveRects[r+1].y;
	caveRects[r].height = caveRects[r+1].height;
    }
    caveRects[caveRects.length-1].y = newCaveTop;
    caveRects[caveRects.length-1].height = newCaveHeight;
}

function shiftCaveBlocks() {
    for (b = 0; b < caveBlocks.length; b++) {
	caveBlocks[b].x = caveBlocks[b].x - 10;
    }
}

function shiftYouFollowers() {
    for (f = 0; f < youFollowers.length - 1; f++) {
	youFollowers[f].y = youFollowers[f+1].y;
    }
    youFollowers[youFollowers.length-1].y = you.pos;
}

/* -------- methods -------- */

rect.prototype.draw = function() {
    context.beginPath();
    context.fillStyle = this.color;
    context.fillRect(this.x, this.y, this.width, this.height);
    context.closePath();
};

Array.prototype.draw = function() {
    for (r = 0; r < this.length; r++) {
	this[r].draw();
    }
}

user.prototype.draw = function() {
    context.beginPath();
    context.fillStyle = this.color;
    context.fillRect(this.ahead, this.pos, 10, 5);
    context.closePath();
}

/* -------- User Interface Manipulation -------- */ // not essential to game

function changeControlButtonToStart() {
    var controlButton = document.getElementById("control");
    controlButton.setAttribute("onclick", "beginGame()");
    controlButton.innerHTML = "START";
}

function changeControlButtonToPause() {
    var controlButton = document.getElementById("control");
    controlButton.setAttribute("onclick", "pauseGame()");
    controlButton.innerHTML = "PAUSE";
}

function changeControlButtonToResume() {
    var controlButton = document.getElementById("control");
    controlButton.setAttribute("onclick", "resumeGame()");
    controlButton.innerHTML = "RESUME";
}

function changeControlButtonToAgain() {
    var controlButton = document.getElementById("control");
    controlButton.setAttribute("onclick", "beginGame()");
    var buttonTitle;
    switch (Math.floor(Math.random() * 6)) {
	case 0:
	    buttonTitle = "GO AGAIN";
	    break;
	case 1:
	    buttonTitle = "ENCORE!";
	    break;
	case 2:
	    buttonTitle = "JUST ONE MORE TIME";
	    break;
	case 3:
	    buttonTitle = "TRY AGAIN";
	    break;
	case 4:
	    buttonTitle = "NOT GOOD ENOUGH";
	    break;
	case 5:
	    buttonTitle = "IS THAT ALL YOU'VE GOT?";
	    break;
    }
    controlButton.innerHTML = buttonTitle;
}