startPoint = new jayus.Point(50, 50);
endPoint = new jayus.Point(50, 100);

linearGradient = new jayus.LinearGradient(startPoint, endPoint).
	addColorStop(0, 'red').
	addColorStop(0.2, 'orange').
	addColorStop(0.4, 'yellow').
	addColorStop(0.6, 'green').
	addColorStop(0.8, 'blue').
	addColorStop(1, 'purple');

brush = { stroke: '#BBB', lineWidth: 3 };

handle1 = new jayus.Circle(startPoint, 12).paintedWith(brush);
handle2 = new jayus.Circle(endPoint, 12).paintedWith(brush);

display.setBg({ fill: linearGradient }).children.add(handle1, handle2);

handle1.addHandler('dirty', function(type) {
	linearGradient.start.set(this.shape.x, this.shape.y);
});

handle2.addHandler('dirty', function(type) {
	linearGradient.end.set(this.shape.x, this.shape.y);
});

display.children.forEach(function(){
	this.setDragButton('left');
	this.addHandler('cursorEnter',function(){
		this.brush.setLineWidth(8);
	});
	this.addHandler('cursorLeave',function(){
		this.brush.setLineWidth(3);
	});
});

jayus.start();