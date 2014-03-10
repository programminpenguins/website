/* -------- sets -------- */

function storageSetLine(line, iteration) {
    localStorage.setItem("line", line);
    localStorage.setItem("iteration", iteration);
}

function storageSetAxiom(x, y, dir, line) {
    localStorage.setItem("axiom_x", x);
    localStorage.setItem("axiom_y", y);
    localStorage.setItem("axiom_dir", dir);
    localStorage.setItem("axiom_line", line);
}

function storageAddToken(token, action, value, replacement) {
    localStorage.setItem("token_" + token, token);
    localStorage.setItem("token_" + token + "_action", action);
    localStorage.setItem("token_" + token + "_value", value);
    localStorage.setItem("token_" + token + "_replacement", replacement);
}

function storageRemoveToken(token) {
    localStorage.removeItem("token_" + token);
    localStorage.removeItem("token_" + token + "_action");
    localStorage.removeItem("token_" + token + "_value");
    localStorage.removeItem("token_" + token + "_replacement");
}

function storageSaveActionsJS(fileString) {
    console.log(fileString);
    localStorage.setItem("actionJS", fileString);
}

/* -------- resets -------- */

function resetLineToAxiom() {
    storageSetLine(localStorage.getItem("axiom_line"), 1);
}

function storageResetToDefaultActionsJS() {
    var filePath = "defaultActions.js";
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", filePath, false);
    xmlhttp.send(null);
    var fileContent = xmlhttp.responseText;
    
    storageSaveActionsJS(fileContent);
}

function storageResetToDragon() {
    localStorage.clear();
    storageSetAxiom("600", "150", "0", "f");
    storageAddToken("f", "moveAndDraw", "10", "f+h");
    storageAddToken("h", "moveAndDraw", "10", "f-h");
    storageAddToken("g", "moveNoDraw", "10", "g");
    storageAddToken("+", "turnRight", "90", "+");
    storageAddToken("-", "turnLeft", "90", "-");
    storageAddToken("[", "pushStateToStack", "", "[");
    storageAddToken("]", "popStateFromStack", "", "]");
    resetLineToAxiom();
    storageResetToDefaultActionsJS();
}

function storageResetToKochCurve() {
    localStorage.clear();
    storageSetAxiom("10", "350", "0", "f+f+f");
    storageAddToken("f", "moveAndDraw", "10", "f-f+f-f");
    storageAddToken("h", "moveAndDraw", "10", "h");
    storageAddToken("g", "moveNoDraw", "10", "g");
    storageAddToken("+", "turnRight", "120", "+");
    storageAddToken("-", "turnLeft", "60", "-");
    storageAddToken("[", "pushStateToStack", "", "[");
    storageAddToken("]", "popStateFromStack", "", "]");
    resetLineToAxiom();
    storageResetToDefaultActionsJS();
}

function storageResetToSerpinskiTriangle() {
    localStorage.clear();
    storageSetAxiom("10", "500", "0", "f");
    storageAddToken("f", "moveAndDraw", "10", "h-f-h");
    storageAddToken("h", "moveAndDraw", "10", "f+h+f");
    storageAddToken("g", "moveNoDraw", "10", "g");
    storageAddToken("+", "turnRight", "60", "+");
    storageAddToken("-", "turnLeft", "60", "-");
    storageAddToken("[", "pushStateToStack", "", "[");
    storageAddToken("]", "popStateFromStack", "", "]");
    resetLineToAxiom();
    storageResetToDefaultActionsJS();
}