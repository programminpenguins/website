function moveAndDraw(dist) {
    context.beginPath();
    context.moveTo(turtle.x, turtle.y);
    
    turtle.x = turtle.x + Number(dist) * Math.cos(turtle.direction);
    turtle.y = turtle.y + Number(dist) * Math.sin(turtle.direction);
    
    context.lineTo(turtle.x, turtle.y);
    context.closePath();
    context.stroke();
}

function moveNoDraw(dist) {
    turtle.x = turtle.x + Number(dist) * Math.cos(turtle.direction);
    turtle.y = turtle.y + Number(dist) * Math.sin(turtle.direction);
}

function moveAgeDraw(dist, shrinkage) {
    context.beginPath();
    context.moveTo(turtle.x, turtle.y);
    
    turtle.x = turtle.x + Number(dist) / Math.pow(Number(shrinkage), Number(localStorage.getItem("iteration"))) * Math.cos(turtle.direction);
    turtle.y = turtle.y + Number(dist) / Math.pow(Number(shrinkage), Number(localStorage.getItem("iteration"))) * Math.sin(turtle.direction);
    
    context.lineTo(turtle.x, turtle.y);
    context.closePath();
    context.stroke();
}

function moveAgeNoDraw(dist, shrinkage) {
    turtle.x = turtle.x + Number(dist) / Math.pow(Number(shrinkage), Number(localStorage.getItem("iteration"))) * Math.cos(turtle.direction);
    turtle.y = turtle.y + Number(dist) / Math.pow(Number(shrinkage), Number(localStorage.getItem("iteration"))) * Math.sin(turtle.direction);
}

function turnRight(degAngle) {
    radAngle = Number(degAngle) * (Math.PI / 180);
    turtle.direction = turtle.direction + radAngle;
}

function turnLeft(degAngle) {
    radAngle = Number(degAngle) * (Math.PI / 180);
    turtle.direction = turtle.direction - radAngle;
}

function pushStateToStack(value) {
    stateStack.push(turtle);
}

function popStateFromStack(value) {
    turtle = stateStack.pop();
}