var lines = [];
var list;
var fom;
var db, dbref;
function setup() {
    db = firebase.database();
    canvas = createCanvas(400,400);
    canvas.parent("canvas")
    var ref = db.ref("/");
    ref.on("value",gotData, errData);
    var a = createA("/paint draw", "draw paintings");
    a.position(700, 490);
    var a2 = createA("/open.html", "go to home page");
    a2.position(550, 490);
    var h = createElement('h1', "<  list of drawings");
    h.position (250, 440)
}

function draw() {
    background(140);
    noFill();
    strokeWeight(10);
    strokeCap(ROUND);
    stroke(255)
    for (var i = 0; i < lines.length; i++) {
        var lin = lines[i];
        beginShape();
        for (var j = 0; j < lin.length; j++) {
            vertex(lin[j].x, lin[j].y);
        }
        endShape();
    }
    
}

function gotData(data) {


    var elt = selectAll('.draws');

    for (var m = 0 ; m < elt.length; m++) {
        elt[m].remove();
    }

    var drawings = data.val();
    var keys = Object.keys(drawings);
    for(var i = 0; i < keys.length; i++)  {
        var key = keys[i];
        var li = createElement('li', '');
        li.class('draws');
        var a = createA('#', key);
        a.mousePressed(seeDraw);
        a.parent(li);
        li.parent('draws');
    }
}

function errData(err) {
    alert("error loading the database" + err);
}

function seeDraw() {
    var key = this.html();
    var ref = db.ref(key);
    ref.on("value", drawOn);

    function drawOn(data) {
        var drawings = data.val();
        lines = drawings;
    }
}