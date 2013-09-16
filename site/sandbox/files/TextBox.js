textbox = new jayus.TextBox('Im a very long and word-wrapped piece of text.');
textbox.setFont('26px sans-serif');

brush = { fill: 'black' };
textbox.setBrush(brush);

textbox.setBg({ stroke: 'grey' });

textbox.setOrigin(40, 40);

// We can set the size of the text box
// Any text past this will wrap around to the next line if possible
textbox.setSize(140, 200);

display.children.add(textbox);

jayus.start();