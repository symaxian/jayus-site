display.setBg({ fill: 'white' });

label = jayus.parse({
	type: 'Text',
	x: 40,
	y: 40,
	text: 'You can drag and resize the frame below',
	font: '20px sans-serif',
	brush: { fill: 'black' }
});

frame = jayus.parse({
	type: 'EditableFrame',
	x: 60,
	y: 120,
	child: {
		type: 'FlowLayout',
		alignment: 0,
		width: 200
	},
	alignBg: true,
	bg: {
		fill: '#BBB',
		stroke: 'black',
		lineWidth: 2
	},
	widthMode: jayus.RESIZE_CHILD,
	heightMode: jayus.RESIZE_CHILD
});

frame.child.children.add(
	new jayus.Text('Hi! ').setBrush({ fill: 'black' }),
	new jayus.Text("I'm ").setBrush({ fill: 'black' }),
	new jayus.Text('some ').setBrush({ fill: 'black' }),
	new jayus.Text('text ').setBrush({ fill: 'black' }),
	new jayus.Text('and ').setBrush({ fill: 'black' }),
	new jayus.Text('some ').setBrush({ fill: 'black' }),
	new jayus.Text('images ').setBrush({ fill: 'black' }),
	new jayus.Text('in ').setBrush({ fill: 'black' }),
	new jayus.Text('a ').setBrush({ fill: 'black' }),
	new jayus.Text('flow ').setBrush({ fill: 'black' }),
	new jayus.Text('layout, ').setBrush({ fill: 'black' }),
	new jayus.Text('you ').setBrush({ fill: 'black' }),
	new jayus.Text('can ').setBrush({ fill: 'black' }),
	new jayus.Text('change ').setBrush({ fill: 'black' }),
	new jayus.Text('my ').setBrush({ fill: 'black' }),
	new jayus.Text('width ').setBrush({ fill: 'black' }),
	new jayus.Text('to ').setBrush({ fill: 'black' }),
	new jayus.Text('see ').setBrush({ fill: 'black' }),
	new jayus.Text('how ').setBrush({ fill: 'black' }),
	new jayus.Text('I ').setBrush({ fill: 'black' }),
	new jayus.Text('flow.').setBrush({ fill: 'black' }),
	// To start placing elements on a new line, just insert a Scene with infinite width
    new jayus.Scene(Infinity, 0),
    new jayus.Frame(new jayus.Image('assets/chest.png')).setBg({ fill: 'cyan' }),
    new jayus.Frame(new jayus.Image('assets/chest.png')).setBg({ fill: 'yellow' }),
    new jayus.Frame(new jayus.Image('assets/chest.png')).setBg({ fill: 'magenta' })
);

display.children.add(label, frame);

jayus.start();