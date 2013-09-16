var shape = new jayus.Rectangle(30,30,120,100);
var paintedShape = new jayus.PaintedShape(shape,{ stroke: 'blue', lineWidth: 2 });

var text = new jayus.Text('Click on me!').setBrush({ fill: 'black' });
text.setOrigin(40, 40);

paintedShape.handle({

	leftClick: function(e){
		alert('You clicked on me!');
	}

});

display.children.add(paintedShape, text);

jayus.start();