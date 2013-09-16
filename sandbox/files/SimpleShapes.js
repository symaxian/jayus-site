var blueStyle = { stroke: 'blue', lineWidth: 2 };
var redStyle = { stroke: 'red', lineDash: [4,2] };

var rect1 = new jayus.Rectangle(30,30,100,100);
var rect2 = new jayus.Rectangle(60,80,120,100);

var circ = new jayus.Circle(200, 100, 40);

var paintedRect1 = new jayus.PaintedShape(rect1, blueStyle);
var paintedRect2 = new jayus.PaintedShape(rect2, redStyle);

var paintedCirc = new jayus.PaintedShape(circ, blueStyle);

display.children.add(paintedRect1, paintedRect2, paintedCirc);

jayus.start();