var label = new jayus.Text("I iz some text\nJust use a newline character to start a new line");
label.setFont('26px sans-serif');

label.setBg({ stroke: 'grey' });

label.setBrush({ fill: 'black' });

label.setOrigin(40, 40);

display.children.add(label);

jayus.start();