display.setBg({ fill: 'white' });

layout = new jayus.FlowLayout();
layout.setAlignment(0);

brush = { fill: 'black' };

layout.children.add(
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

frame = new jayus.EditableFrame(layout);
frame.setMargin(0);
frame.setOrigin(40, 40);
frame.setBrush({ fill: '#BBB' });

display.children.add(frame);

jayus.start();