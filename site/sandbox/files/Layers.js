display.setBg({ fill: 'white' });

layer1 = new jayus.Layer();
layer2 = new jayus.Layer();

brush = { fill: 'black' };

var getRect = function(color){
	var rect = new jayus.Rectangle(jayus.math.randomBetween(0, display.width), jayus.math.randomBetween(0, display.height), 40, 40);
	return rect.paintedWith({ stroke: color });
}

for(var i=0;i<30;i++){
	layer1.children.add(getRect('red'));
	layer2.children.add(getRect('blue'));
}


display.children.add(layer1, layer2);

layer1.setDragButton('left');
layer1.setDraggable(true);

layer2.setDragButton('right');
layer2.setDraggable(true);

jayus.start();