shape = new jayus.Rectangle(display.width/3, display.height/3, display.width/3, display.height/3);

// Only a few of the possible brush properties are shown below

style = new jayus.Brush({
	fill: 'skyblue',
	stroke: 'black',
	lineWidth: 4,
	lineDash: [10, 20],
	shadow: 'blue',
	shadowBlur: 10
});

styledShape = new jayus.PaintedShape(shape, style);

display.children.add(styledShape);

jayus.start();