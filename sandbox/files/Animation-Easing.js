
var graphSize = 200,
	hOffset = 100,
	vOffset = 50,
	hSpacing = 10,
	vSpacing = 10,
	pointCount = 100,
	labelFont = '16px sans-serif';

// Initialize jayus

jayus.init();
display.setBg({ fill: 'grey' });

var easingTypeNames = ['In', 'Out', 'InOut'];

var easingFunctionNames = [
	'Quad',
	'Cubic',
	'Quart',
	'Quint',
	'Sine',
	'Expo',
	'Circ',
	'Elastic',
	'Back',
	'Bounce'
];

function getGraphScene(name, x, y, easing) {

	var poly = new jayus.Polygon();
	poly.closed = false;
	for(var i=0;i<pointCount+1;i++){
		var pos = easing(i/pointCount);
		poly.addPoint(graphSize*(i/pointCount),graphSize-graphSize*pos);
	}

	return jayus.Scene.fromObject({
		x: x,
		y: y,
		width: graphSize,
		height: graphSize,
		tooltip: name,
		bg: {
			fill: 'black',
			alpha: 0.6
		},
		children: [
			new jayus.PaintedShape(poly, { stroke: 'white' })
		]
	});

}

layer = new jayus.Layer();

// Loop over the easing function names
for(var row=0; row<easingFunctionNames.length; row++) {
	// Add the label
	var text = new jayus.Text(easingFunctionNames[row], labelFont, { fill: 'black' });
	text.setOrigin(hOffset/2 - text.width/2, vOffset+graphSize/2+row*(graphSize+hSpacing) - text.height/2);
	layer.children.add(text);
	// Loop over the 'styles' for the easing function, in/out/inout
	for(var col=0; col<easingTypeNames.length; col++){
		var funcName = 'ease'+easingTypeNames[col]+easingFunctionNames[row];
		var x = hOffset+col*(graphSize+vSpacing);
		var y = vOffset+row*(graphSize+hSpacing);
		layer.children.add(getGraphScene(funcName, x, y, jayus.easing[funcName]));
	}
}

for(var i=0;i<easingTypeNames.length;i++) {
	var text = new jayus.Text(easingTypeNames[i], labelFont, { fill: 'black' });
	text.setOrigin(hOffset + i*(graphSize+hSpacing), vOffset/2 - 10);
	layer.children.add(text);
}

layer.addHandler('scroll', function(e) {
	// Get the new scale
	var scale = this.xScale * (1-e.scroll/10);
	// Scale around the cursor
	this.setScaleAround(scale, this.cursorX, this.cursorY);
});

layer.setDragButton('left');
display.children.add(layer);

jayus.start();