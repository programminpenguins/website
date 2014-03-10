/* -------- setup -------- */

var canvas = document.getElementById("viewer");
var context = canvas.getContext("2d");

canvas.setAttribute("width", window.innerWidth);
canvas.setAttribute("height", window.innerHeight);

/* -------- objects -------- */

var turtle = new Object;
turtle.x;
turtle.y;
turtle.direction;

/* -------- variables -------- */

var stateStack = [];

/* -------- configure -------- */

if (localStorage.getItem("iteration") == undefined) { // haven't ever run this before
    storageResetToDragon();
    storageResetToDefaultActionsJS();
}
resetFractal(); // reset the fractal upon reload

/* -------- functions -------- */

function turtleGo() {
    clearCanvas();
    resetTurtle();
    eval(parseLine(localStorage.getItem("line")));
    localStorage.setItem("iteration", Number(localStorage.getItem("iteration")) + 1);
}

function parseLine(line) {
    var parsedLine = "";
    
    for (c = 0; c < line.length; c++) {
	ch = line.charAt(c);
	parsedLine = parsedLine + localStorage.getItem("token_" + ch + "_action") + "(" + localStorage.getItem("token_" + ch + "_value") + ");";
    }
    
    return parsedLine;
}

function ageLine() {
    var originalLine = localStorage.getItem("line");
    var line = "";
    
    for (c = 0; c < originalLine.length; c++) {
	ch = originalLine[c];
	line = line + localStorage.getItem("token_" + ch + "_replacement");
    }
    
    localStorage.setItem("iteration", Number(localStorage.getItem("iteration")) + 1);
    localStorage.setItem("line", line);
}

function clearCanvas() {
    context.clearRect(0, 0, canvas.getAttribute("width"), canvas.getAttribute("height"));
}

function resetTurtle() {
    turtle.x = Number(localStorage.getItem("axiom_x"));
    turtle.y = Number(localStorage.getItem("axiom_y"));
    turtle.direction = Number(localStorage.getItem("axiom_dir"));
}

/* -------- actions -------- */

function iterate() {
    clearCanvas();
    ageLine();
    resetTurtle();
    turtleGo();
}

function resetFractal() {
    clearCanvas();
    resetLineToAxiom();
    resetTurtle();
    stateStack = [];
    stateStack.push(turtle);
    turtleGo();
}