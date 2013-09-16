var verticalPadding = 4,
	textOffset = 10,
	font = '10pt sans-serif',
	children = display.children,
	frameOcurred = false,
	jayusEvents = [
		'keyPress',
		'keyRelease',
		'keyTap',
		'charType'
	],
	displayEvents = [
		'cursorEnter', 'cursorLeave', 'cursorMove',
		'leftDrag', 'leftPress', 'leftRelease', 'leftClick', 'leftDoubleClick',
		'middleDrag', 'middlePress', 'middleRelease', 'middleClick', 'middleDoubleClick',
		'rightDrag', 'rightPress', 'rightRelease', 'rightClick', 'rightDoubleClick',
		'scroll',
		'focused',
		'blurred',
		'resized'
	];

display.setBg({ fill: 'lightgrey' });

handler = function(event){
	// Start with the event target and name
	var text = this.name;
	// Print out the event object properties
	for(var key in event){
		if(event.hasOwnProperty(key)){
			text += '\n    '+key+': '+event[key];
		}
	}
	// Add the message to the display
	addMessage(text);
};

addMessage = function(text){
	// Add a new line
	children.add(new jayus.Polygon.Line(0, 0, display.width, 0).paintedWith({ stroke: frameOcurred ? 'red' : 'white' }));
	// Create the new text entity
	var newText = new jayus.Text(text, font, { fill: 'black' });
	newText.setOrigin(textOffset, verticalPadding);
	// Move every other item down to make room for the new text
	children.forEach(function(){
		this.translate(0, newText.height+verticalPadding*2);
	});
	// Add the text
	children.add(newText);
	// Remove any children outside of the display, and slightly dim the others
	children.forEach(function(){
		if(this.y > display.height){
			children.remove(this);
		}
		else{
			this.setAlpha(this.alpha*0.85);
		}
	});
	frameOcurred = false;
};

for(var i=0;i<jayusEvents.length;i++){
	var name = jayusEvents[i];
	jayus.addHandler(name, handler, { context: { 'name': 'jayus - '+name } } );
}

for(var i=0;i<displayEvents.length;i++){
	var name = displayEvents[i];
	display.addHandler(name, handler, { context: { 'name': 'display - '+name } } );
}

jayus.addHandler('frame', function(){
	frameOcurred = true;
});

jayus.start();