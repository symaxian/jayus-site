startPoint = new jayus.Point(50, 50);
endPoint = new jayus.Point(50, 100);

linearGradient = new jayus.LinearGradient(startPoint, endPoint).
	addColorStop(0, 'red').
	addColorStop(0.2, 'orange').
	addColorStop(0.4, 'yellow').
	addColorStop(0.6, 'green').
	addColorStop(0.8, 'blue').
	addColorStop(1, 'purple');

brush = { stroke: 'white', lineWidth: 2 };

handle1 = new jayus.Circle(startPoint, 12).paintedWith(brush);
handle2 = new jayus.Circle(endPoint, 12).paintedWith(brush);

handle1.canAcceptCursor = true;
handle2.canAcceptCursor = true;

display.setBg({ fill: linearGradient }).children.add(handle1, handle2);

display.children.forEach(function(){
	this.setDraggable(true);
	this.addHandler('cursorEnter',function(){
		this.brush.setLineWidth(4);
	});
	this.addHandler('cursorLeave',function(){
		this.brush.setLineWidth(2);
	});
});

jayus.start();