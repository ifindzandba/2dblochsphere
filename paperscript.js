// This a paperscript for paperjs
// Cannot be external loaded due to CORS security
// For applying and correcting -> Using internal script in html.

var canvas = document.getElementById('myCanvas');

		var straightLine1 = new Path.Line(view.bounds.topLeft, view.bounds.bottomRight);
		straightLine1.strokeColor = 'magenta';
		straightLine1.strokeWidth = 8.5;

		var straightLine2 = new Path.Line(view.bounds.topRight, view.bounds.bottomLeft);
		straightLine2.strokeColor = 'magenta';
		straightLine2.strokeWidth = 8.5;

		var straightLine3 = new Path.Line(view.bounds.topCenter, view.bounds.bottomCenter);
		straightLine3.strokeColor = 'magenta';
		straightLine3.strokeWidth = 8.5;

		var straightLine4 = new Path.Line(view.bounds.leftCenter, view.bounds.rightCenter);
		straightLine4.strokeColor = 'magenta';
		straightLine4.strokeWidth = 8.5;

		var circle = new Shape.Circle({
			center: view.center,
			radius: 250,
			strokeColor: 'White',
			strokeWidth: 8.5,
		});

		var dot = new Path.Circle({
			center: view.center,
			radius: 45,
			strokeColor: 'Aqua',
			fillColor: 'Aqua'
		});


		/////////////////////////////////// Spherical Coordinate ///////////////////////////////////////////////
		var x = (circle.radius * Math.sin(0) * Math.cos(0)) + view.center.x;
		var y = (circle.radius * Math.sin(0) * Math.sin(0)) + view.center.y;

		var destination = new Point(x, y);
		/////////////////////////////////// Spherical Coordinate ///////////////////////////////////////////////

		
		var previewPath = new Path.Line({
	    from: dot.position,
	    to: dot.position,
	    strokeColor: 'aqua',
	    strokeWidth: 6.5
	});

		var previewDot = new Path.Circle({
		 center: dot.position+200,
    	 radius: 30,
    	 fillColor: 'aqua'
	});

		var previewDotSymbol = new Symbol(previewDot);
		previewDotSymbol.definition.opacity = 0;

		var dotdot = new SymbolItem();

		view.onResize = function(event) { //For responsive design.
		    dot.position = view.center;

		    straightLine1.segments[0].point = view.bounds.topLeft;
		    straightLine1.segments[1].point = view.bounds.bottomRight;

		    straightLine2.segments[0].point = view.bounds.topRight;
		    straightLine2.segments[1].point = view.bounds.bottomLeft;

		    straightLine3.segments[0].point = view.bounds.topCenter;
		    straightLine3.segments[1].point = view.bounds.bottomCenter;

		    straightLine4.segments[0].point = view.bounds.leftCenter;
		    straightLine4.segments[1].point = view.bounds.rightCenter;	
	}	


	/////////////////////////////////////////////////////// Event //////////////////////////////////////////////////////////////

		function onKeyDown(event) { //For radius calibration
			if(event.key == 'up'){
				circle.radius += 1;
		}
			if(event.key == 'down'){
				circle.radius -= 1;
		}
	}

		function onFrame(event) {
				var vector = destination - dot.position;

				if(changeFlag == 1){
					dot.position += vector/30;
				}

				if(previewFlag == 1){
					if(previewPath.segments[1].point < destination) {
						previewPath.segments[1].point += vector/60;
							if(previewPath.segments[1].point >= destination){
								dotdot = previewDotSymbol.place(destination);
							}
					}
				}

				if(previewPath.segments[1].point >= destination){
					previewDotSymbol.definition.opacity += 0.05;
					previewDotSymbol.definition.fillColor.hue += 1;
					if(previewDotSymbol.definition.opacity >= 1){
						previewFlag = 0;
					}
				}
		}

		var previewFlag = 0;
		var changeFlag = 0;
		var count = 0;

		function previewGate(theta, phi) {
			changeFlag = 0;
			previewPath.segments[0].point = dot.position;
			previewPath.segments[1].point = dot.position;
			dotdot.remove();

			x = (circle.radius * Math.sin(theta*Math.PI) * Math.cos(phi*Math.PI)) + view.center.x;
			y = (circle.radius * Math.sin(theta*Math.PI) * Math.sin(phi*Math.PI)) + view.center.y;

			destination = new Point(x, y);
			previewFlag = 1;
		}


		function changeState(theta, phi) {
			previewFlag = 0;
			previewPath.segments[0].point = dot.position;
			previewPath.segments[1].point = dot.position;
			dotdot.remove();

			x = (circle.radius * Math.sin(theta*Math.PI) * Math.cos(phi*Math.PI)) + view.center.x;
			y = (circle.radius * Math.sin(theta*Math.PI) * Math.sin(phi*Math.PI)) + view.center.y;

			destination = new Point(x, y);
			changeFlag = 1;
		}

		function changeStateInstant() { //Use this to forcing state to change to avoid misleading preview gate.
			previewFlag = 0;
			previewPath.segments[0].point = dot.position;
			previewPath.segments[1].point = dot.position;
			dotdot.remove();

			dot.position = destination;
			changeFlag = 0;
		}


		function resetState(){
			changeFlag = 0;
			previewFlag = 0;
			dot.position = view.center;
			previewPath.segments[0].point = dot.position;
			previewPath.segments[1].point = dot.position;
			dotdot.remove();
		}

	/////////////////////////////////////////////////////// Event //////////////////////////////////////////////////////////////


		////////////////////////////////////////////////// Playground //////////////////////////////////////////////////////////////

		previewGate(1/2, 1/2);

		function onMouseDown(event){
			if(count == 0){
				changeState(1/2, 1/2);
				count++;
			}
			else if(count == 1){
				if(changeFlag == 1){
					changeStateInstant();
				}
				previewGate(1/4,1/4);
				count++;
			}
			else if(count == 2){
				changeState(1/4, 1/4);
				count++;
			}
			else if(count == 3){
				resetState();
			}
		}

		////////////////////////////////////////////////// Playground //////////////////////////////////////////////////////////////