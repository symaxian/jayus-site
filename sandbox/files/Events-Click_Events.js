
// Define a helper function

function addScene(x, y, color) {

	var text = jayus.Text.fromObject({
		text: 'Click on me!',
		x: 10,
		y: 10,
		brush: {
			fill: 'black'
		}
	});

	var scene = jayus.Scene.fromObject({
		x: x,
		y: y,
		width: 200,
		height: 100,
		bg: {
			stroke: color,
			lineWidth: 2,
			fill: 'rgba(255, 255, 255, 0.8)'
		},
		dragButton: 'left',
		children: [
			text
		]
	});

	scene.handle({

		cursorEnter: function(e) {
			text.setText('Hi!');
		},

		cursorLeave: function(e) {
			text.setText("Hey where'd you go?!");
		},

		leftClick: function(e) {
			text.setText('You clicked on me!');
		},

		scroll: function(e) {
			text.setText('You scrolled on me!');
			// Try uncommenting this line and see what happens when you scroll over both of them at the same time
			return true;
		},

		dragStart: function(e) {
			text.setText('Hey where are we going?');
		},

		dragEnd: function(e) {
			text.setText("What's this place?");
		}

	});

	display.children.add(scene);

}

addScene(40, 40, 'blue');

addScene(100, 100, 'red');


jayus.start();