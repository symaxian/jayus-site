display.setBg({ fill: 'white' });

label = jayus.Frame.fromObject({
	x: 40,
	y: 40,
	bg: { fill: '#BBB', stroke: 'black' },
	child: {
		type: 'Text',
		text: 'You can use the left mouse button to drag the red squares\nand the right mouse button to drag the blue squares.',
		font: '20px sans-serif',
		brush: { fill: 'black' }
	}
});

layer1 = new jayus.Layer();
layer2 = new jayus.Layer();

var getRect = function(color){
	var rect = new jayus.Rectangle(jayus.math.randomBetween(0, display.width), jayus.math.randomBetween(0, display.height), 40, 40);
	rect.setRounding(true);
	return rect.paintedWith({ stroke: color });
};

for(var i=0;i<30;i++){
	layer1.children.add(getRect('red'));
	layer2.children.add(getRect('blue'));
}

layer1.setDragButton('left');

layer2.setDragButton('right');

display.children.add(layer1, layer2, label);

jayus.start();