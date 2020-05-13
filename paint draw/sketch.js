var lines = [];
var linset = [];

var fom;
var button;
var button2;
var ondraw = false;
var db, dbref;
function setup() {
    db = firebase.database();
    dbref = db.ref("/");
    canvas = createCanvas(400,400);
    canvas.mousePressed(startDraw);
    canvas.mouseReleased(endDraw);
    button = createButton("clear");
    button.position(0, 440);
    button.mousePressed(hol);
    button2 = createButton("submit drawing");
    button2.position(100, 440);
    button2.mousePressed(submit);
    var a = createA("/open.html", "go back");
    a.position(250, 490);
    var a2 = createA("/paint see", "see the drawings");
    a2.position(340, 490)
}

function startDraw() {
    ondraw = true;
    linset = [];
    lines.push(linset);
}

function endDraw() {
    ondraw = false;

}

function draw() {
    background(140);
    if (ondraw === true) {
        var point = {
            x : mouseX,
            y : mouseY
        }
        linset.push(point);
    }

    
    noFill();
    strokeWeight(10);
    strokeCap(ROUND)
    for (var i = 0; i < lines.length; i++) {
        var lin = lines[i];
        beginShape();
        for (var j = 0; j < lin.length; j++) {
            vertex(lin[j].x, lin[j].y);
        }
        endShape();
    }
    
    
}

function hol() {
    lines = [];
}

function submit() {
    if (lines.length > 0){
    dbref.push(lines);
    alert("drawing submitted");
    lines = [];
}else
if  (lines.length === 0) {
    alert("draw th digram first")
}
}

