display.setBg({ fill: 'white' });

// Warning: This demo may be very slow for some users
// In this demo we show the effects of enabling different types of aligning/rounding on entities
// On the left are three moving rectangles, they have been scaled up tremendously to enhance the visibility of each pixel

showPixelGrid = false;

// Set some variables
velocity = 5;
scale = 10;
scaledWidth = Math.round(display.width / scale);
scaledHeight = Math.round(display.height / scale);
backgroundBrush = {
	fill: '#CCC',
	stroke: 'blue',
	lineWidth: 1
		// Try setting the lineWidth here to 2, you'll notice that the translation rounding doesn't effect even-numbered line widths
};
pixelGridBrush = {
	stroke: 'black',
	lineWidth: 1,
	alpha: 0.2
};

// Create a scene to hold the rectangles
// To create the pixelated look we'll buffer this scene and scale it up
scene = jayus.Scene.fromObject({
	x: 0,
	y: 0,
	width: scaledWidth,
	height: scaledHeight,
	buffering: true,
	xScale: scale,
	yScale: scale,
	negateBlur: true
		// This property is very important, disable it to see the normal way that canvas will render scaled up objects
		// Enabling this is results in very intensive rendering, and is the reason this demo may be slow for some
});

display.children.add(scene);

// Define a helper function
function addRect(number, round, alignBg) {
	// Create the rect
	var rect = jayus.Scene.fromObject({
		x: 5,
		y: 5+15*(number-1),
		width: 10,
		height: 10,
		xVelocity: velocity,
		bg: backgroundBrush,
		dragButton: 'left',
		roundX: round,
		roundY: round,
		alignBg: alignBg
	});
	// Set some handlers to bounce them and disable the motion when being dragged
	rect.handle({
		// If the entity moves off-screen(when not being dragged), then bounce it back the other way
		dirty: function() {
			// console.log(Date.now());
			if(!this.dragging) {
				if(this.x < 0) {
					this.setXVelocity(velocity);
				}
				else if(this.x+this.width > scaledWidth) {
					this.setXVelocity(-velocity);
				}
			}
		},
		// If we start dragging, turn the velocity off
		dragStart: function() {
			this.setXVelocity(0);
		},
		// If we stop dragging, turn the velocity back on
		dragEnd: function() {
			this.setXVelocity(velocity);
		},
		// Override the default drag action, as we have to translate the entity by the amount divided by the scale
		dragged: function(e) {
			this.translate(e.deltaX / scale, e.deltaY / scale);
			return true;
		}
	});
	// Add the rect to the scene
	scene.children.add(rect);
	// Create a label and add it to the display
	display.children.add(jayus.parse({
		type: 'Text',
		text: 'Rounding: '+round+'\nAlign Bg: '+alignBg,
		font: '12px sans-serif',
		brush: { fill: 'black' },
		x: rect.x * scale,
		y: rect.y * scale
	}));
}

// The first rectangle is the one with default settings
// origin rounding : off
// background aligning : on
// You can see that it tries to align the border, but fails across the x axis when the entity is at a non-integer position

addRect(1, false, true);

// The second rectangle turns off the background alignment
// origin rounding : off
// background aligning : off
// This would be the default look if rendering directly onto a canvas, there is no alignment or rounding, the border is very blurred

addRect(2, false, false);

// The third rectangle turns the translation rounding on, and the background alignment off
// origin rounding : on
// background aligning : off
// It appears very blurry

addRect(3, true, false);

// The fourth rectangle turns everything on
// origin rounding : on
// background aligning : on
// Its movement does not appear fluid but it is drawn with "pixel-perfect" clarity

addRect(4, true, true);

// Show the pixel grid
if(showPixelGrid) {

	// A very primitive technique, using a new polygon for each line, but it works

	for(var x=0; x<display.width; x+=scale) {
		display.children.add(jayus.parse({
			type: 'PaintedShape',
			shape: jayus.Polygon.Line(x+0.5, 0, x+0.5, display.height),
			brush: pixelGridBrush
		}));
	}

	for(var y=0; y<display.height; y+=scale) {
		display.children.add(jayus.parse({
			type: 'PaintedShape',
			shape: jayus.Polygon.Line(0, y+0.5, display.width, y+0.5),
			brush: pixelGridBrush
		}));
	}

}

jayus.start();