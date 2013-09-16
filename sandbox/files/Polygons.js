blueStyle = { stroke: 'blue', lineWidth: 2 };

poly1 = new jayus.Polygon();

poly1.addPoints([
	new jayus.Point(40,40),
	new jayus.Point(60,40),
	new jayus.Point(100,80),
	new jayus.Point(80,150)
]);

var paintedPoly1 = new jayus.PaintedShape(poly1, blueStyle);

display.children.add(paintedPoly1);

jayus.start();