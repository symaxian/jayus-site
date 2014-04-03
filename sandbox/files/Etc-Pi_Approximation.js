
targetFramerate = 30;

dotsPerFrame = 500;
	// How many points to place per frame
	// This value will be raised/lowered to hit the target framerate

size = 1000;
	// The size of the circle
	// A larger circle usually results in a more accurate approximation

// Add our entities to the display
display.children.add(
	{
		type: 'Scene',
		id: 'circle',
		x: 0,
		y: 0,
		width: size,
		height: size,
		bg: {
			stroke: 'black'
		},
		children: [
			{
				type: 'Surface',
				id: 'surface',
				x: 0,
				y: 0,
				width: size,
				height: size
			},
			{
				type: 'PaintedShape',
				id: 'painted',
				shape: {
					type: 'Circle',
					x: size/2,
					y: size/2,
					radius: size/2
				},
				brush: {
					stroke:'black',lineWidth:1
				}
			}
		]
	},
	{
		type: 'vStack',
		id: 'labelStack',
		x: 20,
		y: 20,
		children: [
			{
				type: 'Text',
				id: 'dotsLabel',
				font: '20px sans-serif',
				brush: {
					fill: 'black'
				}
			},
			{
				type: 'Text',
				id: 'piLabel',
				font: '20px sans-serif',
				brush: {
					fill: 'black'
				}
			},
			{
				type: 'Text',
				id: 'accuracyLabel',
				font: '20px sans-serif',
				brush: {
					fill: 'black'
				}
			}
		]
	}
);

// Resize the scene so it fits in the display
display.circle.setScale(Math.min(display.width, display.height)/size);

// Let the scene be draggable
display.circle.setDragButton('left');

// Add a handle to zoom the scene
display.circle.handle({
	scroll: function(e) {
		// Get the relative cursor position in the scene
		var anchorX = this.cursorX/this.width;
		var anchorY = this.cursorY/this.height;
		// Set the scale
		if(e.scroll > 0) {
			this.setScale(this.xScale*0.9);
		}
		else {
			this.setScale(this.xScale*1.1);
		}
		// Reposition the scene under the cursor
		this.setPosAt(display.cursor, anchorX, anchorY);
	}
});

// Some variables
dotsIn = 0;
dotsTotal = 0;

jayus.addHandler('frame', function() {

	// Grab the entities for easier access
	var circleSurface = display.circle.surface,
		circleShape = display.circle.painted.shape,
		labelStack = display.labelStack;

	for(var i=0;i<dotsPerFrame;i++) {
	
		// Get a random position
		var x = jayus.math.randomBetween(0, size);
		var y = jayus.math.randomBetween(0, size);

		// Check if it's inside the circle
		if(circleShape.intersectsAt(x, y)) {
			// Increment the "in" count and set the pixel red
			dotsIn++;
			circleSurface.setPixel(x, y, 255, 0, 0);
		}
		else{
			// Else set the pixel green
			circleSurface.setPixel(x, y, 0, 255, 0);
		}

	}

	// Set the total count and compute Pi
	dotsTotal += dotsPerFrame;
	var pi = 4*(dotsIn/dotsTotal);

	// Compute the accuracy
	var accuracy = 100*pi/Math.PI;
	if(accuracy > 100) {
		accuracy = 100-(accuracy-100);
	}

	// Set the label text
	labelStack.dotsLabel.setText('Dots: '+dotsTotal);
	labelStack.piLabel.setText('Pi: '+pi);
	labelStack.accuracyLabel.setText('Accuracy: '+accuracy);

	// Adjust the dotsPerFrame to try and achieve the target framerate
	if(jayus.fps < targetFramerate) {
		dotsPerFrame--;
	}
	else {
		dotsPerFrame++;
	}

});

jayus.start();