/* -------- setup -------- */

if (localStorage.getItem("iteration") == undefined) { // haven't ever run this before
    storageResetToDragon();
    storageResetToDefaultActionsJS();
}

fillData();

function fillData() {
    document.getElementById("tokens").innerHTML = ""; // clear before writing again
    
    var axiom_x = document.getElementById("axiom_x");
    var axiom_y = document.getElementById("axiom_y");
    var axiom_dir = document.getElementById("axiom_dir");
    var axiom_line = document.getElementById("axiom_line");
    axiom_x.setAttribute("value", localStorage.getItem("axiom_x"));
    axiom_y.setAttribute("value", localStorage.getItem("axiom_y"));
    axiom_dir.setAttribute("value", localStorage.getItem("axiom_dir"));
    axiom_line.setAttribute("value", localStorage.getItem("axiom_line"));
    
    var tokens = [];
    for (k = 0; k<localStorage.length; k++) {
	var key = localStorage.key(k)
	if (key.indexOf("token_") != -1 && key.indexOf("_action") == -1 && key.indexOf("_value") == -1 && key.indexOf("_replacement") == -1) { // find token & only the one with no modifier
	    var token = localStorage.getItem(key);
	    tokens.push(token);
	}
    }
    for (t = 0; t < tokens.length; t++) {
	showToken(tokens[t]);
    }
    
    editor.setValue(localStorage.getItem("actionJS"));
    editor.clearSelection();
}

/* -------- functions -------- */

function showToken(token) {
    var tokenDiv = document.getElementById("tokens");
    
    var newTr = document.createElement("tr");
    newTr.setAttribute("id", token);
    var newTd_token = document.createElement("td");
    newTd_token.innerHTML = token;
    var newTd_action = document.createElement("td");
    var newInput_action = document.createElement("input");
    newInput_action.setAttribute("type", "text");
    newInput_action.setAttribute("id", "token_" + token + "_action");
    newInput_action.setAttribute("onchange", "changeAction(\"" + token + "\", this.value); updateValue(\"token_" + token + "_action\", this.value)");
    newInput_action.setAttribute("value", localStorage.getItem("token_" + token + "_action"));
    var newTd_value = document.createElement("td");
    var newInput_value = document.createElement("input");
    newInput_value.setAttribute("type", "text");
    newInput_value.setAttribute("id", "token_" + token + "_value");
    newInput_value.setAttribute("onchange", "changeValue(\"" + token + "\", this.value); updateValue(\"token_" + token + "_value\", this.value)");
    newInput_value.setAttribute("value", localStorage.getItem("token_" + token + "_value"));
    var newTd_replacement = document.createElement("td");
    var newInput_replacement = document.createElement("input");
    newInput_replacement.setAttribute("type", "text");
    newInput_replacement.setAttribute("id", "token_" + token + "_replacement");
    newInput_replacement.setAttribute("onchange", "changeReplacement(\"" + token + "\", this.value); updateValue(\"token_" + token + "_replacement\", this.value)");
    newInput_replacement.setAttribute("value", localStorage.getItem("token_" + token + "_replacement"));
    var newButton_remove = document.createElement("button");
    newButton_remove.setAttribute("onclick", "removeToken(this.value)");
    newButton_remove.setAttribute("value", token);
    newButton_remove.innerHTML = "-";
    
    newTd_action.appendChild(newInput_action);
    newTd_value.appendChild(newInput_value);
    newTd_replacement.appendChild(newInput_replacement);
    newTr.appendChild(newTd_token);
    newTr.appendChild(newTd_action);
    newTr.appendChild(newTd_value);
    newTr.appendChild(newTd_replacement);
    newTr.appendChild(newButton_remove);
    tokenDiv.appendChild(newTr);
}

function unshowToken(token) {
    var tokenDiv = document.getElementById("tokens");
    tokenDiv.removeChild(document.getElementById(token));
}

function changeTheme() {
    var selector = document.getElementById("theme");
    editor.setTheme("ace/theme/" + selector.options[selector.selectedIndex].value);
}

/* -------- input handlers -------- */

function changeAxiom_x(x) {
    localStorage.setItem("axiom_x", x);
}

function changeAxiom_y(y) {
    localStorage.setItem("axiom_y", y);
}

function changeAxiom_dir(dir) {
    localStorage.setItem("axiom_dir", dir);
}

function changeAxiom_line(line) {
    localStorage.setItem("axiom_line", line);
}

function changeAction(token, action) {
    localStorage.setItem("token_" + token + "_action", action);
}

function changeValue(token, value) {
    localStorage.setItem("token_" + token + "_value", value);
}

function changeReplacement(token, replacement) {
    localStorage.setItem("token_" + token + "_replacement", replacement);
}

function updateValue(id, value) {
    var element = document.getElementById(id);
    element.setAttribute("value", value);
}

function removeToken(token) {
    unshowToken(token)
    storageRemoveToken(token);
}

function addToken() {
    var token = document.getElementById("token_newToken").getAttribute("value");
    var action = document.getElementById("token_newToken_action").getAttribute("value");
    var value = document.getElementById("token_newToken_value").getAttribute("value");
    var replacement = document.getElementById("token_newToken_replacement").getAttribute("value");
    storageAddToken(token, action, value, replacement);
    showToken(token);
}

/* -------- reset -------- */

function resetToDragon() {
    storageResetToDragon();
    fillData();
}

function resetToKochCurve() {
    storageResetToKochCurve();
    fillData();
}

function resetToSerpinskiTriangle() {
    storageResetToSerpinskiTriangle();
    fillData();
}