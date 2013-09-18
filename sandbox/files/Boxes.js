display.setBg({ fill: 'white' });

hBox = new jayus.hBox().setSpacing(10);
hBox.setSize(200, 100);

vBox = new jayus.vBox().setSpacing(10);
vBox.setSize(100, 200);

brush = { fill: 'black' };

flow = new jayus.FlowLayout();
flow.children.add(
	new jayus.Text('Hi! ').setBrush(brush),
	new jayus.Text('Im ').setBrush(brush),
	new jayus.Text('some ').setBrush(brush),
	new jayus.Text('text ').setBrush(brush),
	new jayus.Text('in ').setBrush(brush),
	new jayus.Text('a ').setBrush(brush),
	new jayus.Text('flow ').setBrush(brush),
	new jayus.Text('layout, ').setBrush(brush),
	new jayus.Text('you ').setBrush(brush),
	new jayus.Text('can ').setBrush(brush),
	new jayus.Text('change ').setBrush(brush),
	new jayus.Text('my ').setBrush(brush),
	new jayus.Text('width ').setBrush(brush),
	new jayus.Text('to ').setBrush(brush),
	new jayus.Text('see ').setBrush(brush),
	new jayus.Text('how ').setBrush(brush),
	new jayus.Text('I ').setBrush(brush),
	new jayus.Text('flow.').setBrush(brush)
);

hBox.children.add(
    new jayus.Scene().setBg({ fill: 'red' }),
    new jayus.Scene().setBg({ fill: 'green' }),
    new jayus.Scene().setBg({ fill: 'blue' }),
    flow
);

vBox.children.add(
    new jayus.Scene().setBg({ fill: 'yellow' }),
    new jayus.Scene().setBg({ fill: 'cyan' }),
    new jayus.Scene().setBg({ fill: 'magenta' })
);

frame1 = new jayus.EditableFrame(hBox);
frame1.setBrush({ fill: '#BBB' });
frame1.setOrigin(50, 50);

frame2 = new jayus.EditableFrame(vBox);
frame2.setBrush({ fill: '#BBB' });
frame2.setOrigin(50, 200);

display.children.add(frame1, frame2);

jayus.start();