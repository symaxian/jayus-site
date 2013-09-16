path = new jayus.Path().
	moveTo(24.132, 7.971).
	bezierCurveBy(-2.203, -2.205, -5.916, -2.098, -8.25, 0.235).
	lineTo(15.5, 8.588).
	lineBy(-0.382, -0.382).
	bezierCurveBy(-2.334, -2.333, -6.047, -2.44, -8.25, -0.235).
	bezierCurveBy(-2.204, 2.203, -2.098, 5.916, 0.235, 8.249).
	lineBy(8.396, 8.396).
	lineBy(8.396, -8.396).
	bezierCurveTo(26.229, 13.887, 26.336, 10.174, 24.132, 7.971).
	closePath();

// The methods above trace out a heart icon
// They were converted from the SVG commands below, provided with RaphaelJS

// M	24.132,	7.971
// c	-2.203,	-2.205, -5.916, -2.098, -8.25, 0.235
// L	15.5, 8.588
// l	-0.382, -0.382
// c	-2.334, -2.333, -6.047, -2.44, -8.25, -0.235
// c	-2.204, 2.203, -2.098, 5.916, 0.235, 8.249
// l	8.396, 8.396
// l	8.396, -8.396
// C	26.229, 13.887, 26.336, 10.174, 24.132, 7.971
// z

paintedPath = new jayus.PaintedShape(path, { stroke: 'red', lineWidth: 1 });

paintedPath.setScale(10, 10);

display.children.add(paintedPath);

jayus.start();