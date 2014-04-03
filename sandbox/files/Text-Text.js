var label = new jayus.Text("I'm a jayus.Text() object\nJust use a newline character to start a new line");
label.setFont('26px sans-serif');

label.setBg({ stroke: 'grey' });

label.setBrush({ fill: 'black' });

label.setOrigin(40, 40);

display.children.add(label);

display.children.add(jayus.Text.fromObject({
	text: 'I was created using a JSON object',
	font: '24px sans-serif',
	bg: {
		stroke: 'blue'
	},
	brush: {
		fill: 'black',
	},
	x: 60,
	y: 140
}));

jayus.start();