display.setBg({ fill: 'white' });

// flow = new jayus.FlowLayout();
// flow.children.add(
// 	new jayus.Text('Hi! ').setBrush({ fill: 'black' }),
// 	new jayus.Text('Im ').setBrush({ fill: 'black' }),
// 	new jayus.Text('some ').setBrush({ fill: 'black' }),
// 	new jayus.Text('text ').setBrush({ fill: 'black' }),
// 	new jayus.Text('in ').setBrush({ fill: 'black' }),
// 	new jayus.Text('a ').setBrush({ fill: 'black' }),
// 	new jayus.Text('flow ').setBrush({ fill: 'black' }),
// 	new jayus.Text('layout, ').setBrush({ fill: 'black' }),
// 	new jayus.Text('you ').setBrush({ fill: 'black' }),
// 	new jayus.Text('can ').setBrush({ fill: 'black' }),
// 	new jayus.Text('change ').setBrush({ fill: 'black' }),
// 	new jayus.Text('my ').setBrush({ fill: 'black' }),
// 	new jayus.Text('width ').setBrush({ fill: 'black' }),
// 	new jayus.Text('to ').setBrush({ fill: 'black' }),
// 	new jayus.Text('see ').setBrush({ fill: 'black' }),
// 	new jayus.Text('how ').setBrush({ fill: 'black' }),
// 	new jayus.Text('I ').setBrush({ fill: 'black' }),
// 	new jayus.Text('flow.').setBrush({ fill: 'black' })
// );

flow = new jayus.TextBox("Hi! I'm some text in a \n \nTextBox you can change my width to see how I flow.");
flow.setBrush({ fill: 'black' });

frame1 = jayus.EditableFrame.fromObject({
	x: 50,
	y: 50,
	width: 400,
	height: 200,
	child: {
		type: 'hBox',
		spacing: 10,
		children: [
			new jayus.Scene().setBg({ fill: 'red' }),
			new jayus.Scene().setBg({ fill: 'green' }),
			new jayus.Scene().setBg({ fill: 'blue' }),
			flow
		]
	},
	widthMode: jayus.RESIZE_CHILD,
	heightMode: jayus.RESIZE_CHILD,
	bg: { fill: '#BBB' }
});

frame2 = jayus.EditableFrame.fromObject({
	x: 100,
	y: 300,
	child: {
		type: 'vBox',
		spacing: 10,
		children: [
			new jayus.Scene().setBg({ fill: 'yellow' }),
			new jayus.Scene().setBg({ fill: 'cyan' }),
			new jayus.Scene().setBg({ fill: 'magenta' })
		]
	},
	widthMode: jayus.RESIZE_CHILD,
	heightMode: jayus.RESIZE_CHILD,
	bg: { fill: '#BBB' }
});

display.children.add(frame1, frame2);

jayus.start();