var canvas = document.getElementById('myCanvas');

var straightLine3 = new Path.Line(view.bounds.topCenter, view.bounds.bottomCenter);
straightLine3.strokeColor = 'SpringGreen';
straightLine3.strokeWidth = 8.5;

var straightLine4 = new Path.Line(view.bounds.leftCenter, view.bounds.rightCenter);
straightLine4.strokeColor = 'HotPink';
straightLine4.strokeWidth = 8.5;

var circle = new Shape.Circle({
	center: view.center,
	radius: 250,
	strokeColor: 'DarkOrange',
	strokeWidth: 8.5
});

var dot = new Shape.Ellipse({
	center: view.center,
	size: [90, 90],
	strokeColor: 'Aqua',
	fillColor: 'Aqua'
});

var previewPath = new Path.Line({
	from: dot.position,
	to: dot.position,
	strokeColor: 'aqua',
	strokeWidth: 16
});

var previewDot = new Shape.Ellipse({
	center: dot.position,
	size: [50, 50],
	fillColor: 'aqua'
});

var clearDot0 = new Shape.Circle({
	center: view.center,
	radius: 100,
	fillColor: '#4285f4',
	opacity: 0
});

var clearDot1 = new Shape.Circle({
	center: view.center,
	radius: 100,
	fillColor: '#db4437',
	opacity: 0
});

var clearDot2 = new Shape.Circle({
	center: view.center,
	radius: 100,
	fillColor: '#f4b400',
	opacity: 0
});

var clearDot3 = new Shape.Circle({
	center: view.center,
	radius: 100,
	fillColor: '#0f9d58',
	opacity: 0
});

var rippleDot = new Shape.Circle({
	center: view.center,
	radius: 100,
	strokeColor: 'Red',
	strokeWidth: 8.5,
	opacity: 0
});


/////////////////////////////////// Spherical Coordinate ///////////////////////////////////////////////
var x = (circle.radius * Math.sin(0 * Math.PI) * Math.cos(0 * Math.PI)) + view.center.x;
var y = (circle.radius * Math.sin(0 * Math.PI) * Math.cos(0 * Math.PI)) + view.center.y;

var destination = new Point(x, y);

var circleRef0 = new Point(view.center.x, view.center.y - circle.radius);
var circleRef1 = new Point(view.center.x - circle.radius, view.center.y);
var circleRef2 = new Point(view.center.x + circle.radius, view.center.y);
var circleRef3 = new Point(view.center.x, view.center.y + circle.radius);

var distRef0 = view.center - circleRef0;
var distRef1 = view.center - circleRef1;
var distRef2 = view.center - circleRef2;
var distRef3 = view.center - circleRef3;
var totalDist = distRef0 + distRef1 + distRef2 + distRef3;

var preRef0 = previewPath.segments[1].point - circleRef0;
var preRef1 = previewPath.segments[1].point - circleRef1;
var preRef2 = previewPath.segments[1].point - circleRef2;
var preRef3 = previewPath.segments[1].point - circleRef3;
var previewDist = preRef0 + preRef1 + preRef2 + preRef3;

console.log(distRef0);
console.log(distRef1);
console.log(distRef2);
console.log(distRef3);
console.log(totalDist);

/////////////////////////////////// Spherical Coordinate ///////////////////////////////////////////////

var previewDotSymbol = new Symbol(previewDot);
previewDotSymbol.definition.opacity = 0;

var chDotSymbol = new Symbol(previewDot);
chDotSymbol.definition.opacity = 0;

var rippleSymbol = new Symbol(rippleDot);
rippleSymbol.definition.opacity = 0;

var chRippleSymbol = new Symbol(rippleDot);
rippleSymbol.definition.opacity = 0;

var dotdot = new SymbolItem();
var challengeDot = dotdot;
var ripple = dotdot;
var chripple = dotdot;
var rippleplace = 1;

var sceneflag = 0;
var bitsceneflag = 0;
var qubitsceneflag = 0;
var clearsceneflag = 0;
var scenecount = 0;

var thetaScene = 1 * Math.PI;
var phiScene = 1 * Math.PI;

var vector = destination - dot.position;

view.onResize = function (event) { //For responsive design.
	dot.position = view.center;

	straightLine3.segments[0].point = view.bounds.topCenter;
	straightLine3.segments[1].point = view.bounds.bottomCenter;

	straightLine4.segments[0].point = view.bounds.leftCenter;
	straightLine4.segments[1].point = view.bounds.rightCenter;
}


/////////////////////////////////////////////////////// Event //////////////////////////////////////////////////////////////

function onKeyDown(event) { //For radius calibration
	if (event.key == 'up') {
		circle.radius += 1;
	}
	if (event.key == 'down') {
		circle.radius -= 1;
	}
}

function onFrame(event) {
	circleRef0 = new Point(view.center.x, view.center.y - circle.radius);
	circleRef1 = new Point(view.center.x - circle.radius, view.center.y);
	circleRef2 = new Point(view.center.x + circle.radius, view.center.y);
	circleRef3 = new Point(view.center.x, view.center.y + circle.radius);

	distRef0 = dot.position - circleRef0;
	distRef1 = dot.position - circleRef1;
	distRef2 = dot.position - circleRef2;
	distRef3 = dot.position - circleRef3;
	totalDist = distRef0 + distRef1 + distRef2 + distRef3;

	preRef0 = previewPath.segments[1].point - circleRef0;
	preRef1 = previewPath.segments[1].point - circleRef1;
	preRef2 = previewPath.segments[1].point - circleRef2;
	preRef3 = previewPath.segments[1].point - circleRef3;
	previewDist = preRef0 + preRef1 + preRef2 + preRef3;

	previewDotSymbol.definition.size.width = 60 + Math.abs(previewDist.y) / 20;
	previewDotSymbol.definition.size.height = 60 + Math.abs(previewDist.x) / 20;

	dot.size.width = 90 + Math.abs(totalDist.y) / 20;
	dot.size.height = 90 + Math.abs(totalDist.x) / 20;


	if(sceneflag == 0){
		if (changeFlag == 1) { //change state
			dot.position += vector / 100;
			if (dot.position.isClose(destination, 5) && rippleplace == 1) {
				rippleOn('dot');
				rippleplace = 0;
				changeFlag = 0;
			}
		}

		if (previewFlag == 1) { //preview gate
			if (previewPath.segments[1].point.isClose(destination, 0.1) == false) {
				previewPath.segments[1].point += vector / 100;
				if (previewPath.segments[1].point.isClose(destination, 0.1)) {
					dotdot = previewDotSymbol.place(destination);
					previewFlag = 0;
				}
			}
		}

		if (challengeFlag == 1) {
			rippleOn('challenge');
			challengeFlag = 0;
		}
	}
	else { //sceneflag = 1
		if (bitsceneflag == 1){
			scenecount++;

			if(scenecount == 1){
				rippleOn('dot');
			}

			if(scenecount % 100 == 0){
				ripple.remove();
				thetaScene += 1 * Math.PI;
				z = (circle.radius * Math.cos(thetaScene)) + view.center.x;
				y = (circle.radius * Math.sin(thetaScene) * Math.cos(1/2 * Math.PI)) + view.center.y;
				
				dot.position = new Point(y, z);
				rippleOn('dot');	
			}
		}
		else if(qubitsceneflag == 1){
			scenecount++;

			if(scenecount == 100){
				ripple.remove();
				rippleplace = 1;
				thetaScene += 1/4 * Math.PI;
				phiScene += 1/4 * Math.PI;
				z = (circle.radius * Math.cos(thetaScene)) + view.center.x;
				y = (circle.radius * Math.sin(thetaScene) * Math.cos(phiScene)) + view.center.y;
				
				destination = new Point(y, z);
				vector = destination - dot.position;
			}
			if (dot.position.isClose(destination, 5) && rippleplace == 1) {
				ripple.remove();
				thetaScene += 1/4 * Math.PI;
				phiScene += 1/4 * Math.PI;
				z = (circle.radius * Math.cos(thetaScene)) + view.center.x;
				y = (circle.radius * Math.sin(thetaScene) * Math.cos(phiScene)) + view.center.y;
				
				destination = new Point(y, z);
				vector = destination - dot.position;
				rippleOn('dot');
			}
			else{
				dot.position += vector / 90;
			}	
		}
		else if(clearsceneflag == 1){
			if(scenecount == 0){
				clearDot0.opacity = 1;
				clearDot0.radius += 20;
				if(clearDot0.radius >= 1000){
					clearDot0.radius = 1;
					scenecount++;
				}
			}
			else if(scenecount == 1){
				clearDot1.opacity = 1;
				clearDot1.radius += 20;
				if(clearDot1.radius >= 1000){
					clearDot1.radius = 1;
					scenecount++;
				}
			}
			else if(scenecount == 2){
				clearDot2.opacity = 1;
				clearDot2.radius += 20;
				if(clearDot2.radius >= 1000){
					clearDot2.radius = 1;
					scenecount++;
				}
			}
			else if(scenecount == 3){
				clearDot3.opacity = 1;
				clearDot3.radius += 20;
				if(clearDot3.radius >= 1000){
					clearDot3.radius = 1;
					scenecount = 0;
				}
			}
		}
	}

	if (rippleFlag == 1) {
		rippleSymbol.definition.radius += 10;
		chRippleSymbol.definition.radius += 10;
		if (rippleSymbol.definition.radius > 1500) {
			rippleSymbol.definition.radius = 0;
		}

		if (chRippleSymbol.definition.radius > 1500) {
			chRippleSymbol.definition.radius = 0;
		}
	}

	previewDotSymbol.definition.opacity += 0.05;
	previewDotSymbol.definition.fillColor.hue += 2;
}


var previewFlag = 0;
var changeFlag = 0;
var rippleFlag = 0;
var challengeFlag = 0;
var count = 0;

function previewGate(theta, phi) {
	changeFlag = 0;
	previewPath.segments[0].point = dot.position;
	previewPath.segments[1].point = dot.position;
	dotdot.remove();

	z = (circle.radius * Math.cos(theta + 1 * Math.PI)) + view.center.x;
	y = (circle.radius * Math.sin(theta + 1 * Math.PI) * Math.cos(phi)) + view.center.y;

	destination = new Point(y, z);
	vector = destination - dot.position;
	previewFlag = 1;
}


function changeState(theta, phi) {
	previewFlag = 0;
	previewPath.segments[0].point = dot.position;
	previewPath.segments[1].point = dot.position;
	dotdot.remove();
	ripple.remove();

	z = (circle.radius * Math.cos(theta + 1 * Math.PI)) + view.center.x;
	y = (circle.radius * Math.sin(theta + 1 * Math.PI) * Math.cos(phi)) + view.center.y;

	destination = new Point(y, z);

	vector = destination - dot.position;
	changeFlag = 1;
	rippleplace = 1;
}

function changeStateInstant() { //Use this to forcing state to change to avoid misleading preview gate.
	previewFlag = 0;
	previewPath.segments[0].point = dot.position;
	previewPath.segments[1].point = dot.position;
	dotdot.remove();

	dot.position = destination;
	changeFlag = 0;
}


function resetState() {
	z = (circle.radius * Math.cos(1 * Math.PI)) + view.center.x;
	y = (circle.radius * Math.sin(1 * Math.PI) * Math.cos(1 * Math.PI)) + view.center.y;

	destination = new Point(y, z);

	changeFlag = 0;
	previewFlag = 0;
	sceneflag = 0;
	rippleFlag = 0;
	dot.position = destination;
	previewPath.segments[0].point = dot.position;
	previewPath.segments[1].point = dot.position;
	challengeDot.remove();
	dotdot.remove();
	ripple.remove();
	chripple.remove();

	clearDot0.opacity = 0;
	clearDot1.opacity = 0;
	clearDot2.opacity = 0;
	clearDot3.opacity = 0;

	clearDot0.radius = 0;
	clearDot1.radius = 0;
	clearDot2.radius = 0;
	clearDot3.radius = 0;
}

function initState() {
	z = (circle.radius * Math.cos(0)) + view.center.x;
	y = (circle.radius * Math.sin(0) * Math.cos(0)) + view.center.y;

	destination = new Point(y, z);

	changeFlag = 0;
	previewFlag = 0;
	dot.position = destination;
	previewPath.segments[0].point = dot.position;
	previewPath.segments[1].point = dot.position;
	challengeDot.remove();
	dotdot.remove();
}

function challengeMarker(theta, phi) {
	challengeDot.remove();
	dotdot.remove();
	challengeFlag = 1;
	previewFlag = 0;
	changeFlag = 0;
	z = (circle.radius * Math.cos(theta + 1 * Math.PI)) + view.center.x;
	y = (circle.radius * Math.sin(theta + 1 * Math.PI) * Math.cos(phi)) + view.center.y;

	destination = new Point(y, z);
	challengeDot = chDotSymbol.place(destination);
	chDotSymbol.definition.fillColor = 'Tomato';
	chDotSymbol.definition.opacity = 1;
	rippleplace = 1;
}

function rippleOn(where) {
	if (where == "challenge") {
		chripple = chRippleSymbol.place(challengeDot.position);
		chRippleSymbol.definition.strokeColor = 'Tomato';
		chRippleSymbol.definition.radius = 0;
	} else {
		ripple = rippleSymbol.place(dot.position);
		rippleSymbol.definition.strokeColor = 'aqua';
		rippleSymbol.definition.radius = 0;
	}

	rippleFlag = 1;
	rippleSymbol.definition.opacity = 1;
	chRippleSymbol.definition.opacity = 1;
}

function bitScene() {
	changeFlag = 0;
	previewFlag = 0;
	dot.position = destination;
	previewPath.segments[0].point = dot.position;
	previewPath.segments[1].point = dot.position;
	challengeDot.remove();
	dotdot.remove();
	ripple.remove();

	scenecount = 0;
	sceneflag = 1;
	bitsceneflag = 1;
}

function qubitScene() {
	bitsceneflag = 0;
	changeFlag = 0;
	previewFlag = 0;
	dot.position = destination;
	previewPath.segments[0].point = dot.position;
	previewPath.segments[1].point = dot.position;
	challengeDot.remove();
	dotdot.remove();
	ripple.remove();

	scenecount = 0;
	sceneflag = 1;
	qubitsceneflag = 1;
}

function clearScene() {
	qubitsceneflag = 0;
	changeFlag = 0;
	previewFlag = 0;
	dot.position = destination;
	previewPath.segments[0].point = dot.position;
	previewPath.segments[1].point = dot.position;
	challengeDot.remove();
	chripple.remove();
	dotdot.remove();
	ripple.remove();

	clearDot0.radius = 0;
	clearDot1.radius = 0;
	clearDot2.radius = 0;
	clearDot3.radius = 0;

	scenecount = 0;
	sceneflag = 1;
	clearsceneflag = 1;
}
/////////////////////////////////////////////////////// Event //////////////////////////////////////////////////////////////


////////////////////////////////////////////////// Playground //////////////////////////////////////////////////////////////

initState();

/*function onMouseDown(event) {
	if (count == 0) {
		count++;
	} else if (count == 1) {
		resetState();
		//count++;
	} else if (count == 2) {
		clearScene();
		count++;
	} else if (count == 3) {
		//rippleOn('dot');
		count++;
	} else if (count == 4) {} else if (count == 5) {
		//rippleOn('challenge');
	}
}*/

////////////////////////////////////////////////// Playground //////////////////////////////////////////////////////////////

var socket = io('http://localhost:3000');

socket.on('previewGate', function (coordinate) {
	console.log(coordinate);
	if (changeFlag == 1) {
		changeStateInstant();
	}
	previewGate(coordinate[0], coordinate[1]);
});

socket.on('applyGate', function (coordinate) {
	console.log(coordinate);
	changeState(coordinate[0], coordinate[1]);
});

socket.on('reset', function () {
	resetState();
});

socket.on('event', function (msg) {
	console.log(msg);
});

socket.on('challengeMark', function (coordinate) {
	if (changeFlag == 1) {
		changeStateInstant();
	}
	chripple.remove();
	console.log(coordinate);
	challengeMarker(coordinate[0], coordinate[1]);
});

/*socket.on('removeMark', function () {
	challengeDot.remove();
	chripple.remove();
});*/

socket.on('bitScene', function () {
	thetaScene = 1 * Math.PI;
	phiScene = 1 * Math.PI;
	bitScene();
});

socket.on('qubitScene', function () {
	thetaScene = 1 * Math.PI;
	phiScene = 1 * Math.PI;
	qubitScene();
});

socket.on('clearScene', function () {
	if(changeFlag == 1){
		thetaScene = 1 * Math.PI;
		phiScene = 1 * Math.PI;
		clearScene();
	}
});