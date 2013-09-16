start = new jayus.Circle(50, 50, 40);
end = new jayus.Circle(50, 100, 400);

radialGradient = new jayus.RadialGradient(start, end).
	addColorStop(0, 'red').
	addColorStop(0.2, 'orange').
	addColorStop(0.4, 'yellow').
	addColorStop(0.6, 'green').
	addColorStop(0.8, 'blue').
	addColorStop(1, 'purple');

brush = { stroke: 'white', lineWidth: 2 };

handle1 = start.paintedWith(brush);
handle2 = end.paintedWith(brush);

handle1.canAcceptCursor=true;
handle2.canAcceptCursor=true;

display.setBg({ fill: radialGradient }).children.add(handle2, handle1);

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











// startPoint = new jayus.Point(50, 50);
// endPoint = new jayus.Point(50, 100);

// startRadius = 50;
// endRadius = 400;

// radialGradient = new jayus.RadialGradient(startPoint, startRadius, endPoint, endRadius).
// 	addColorStop(0, 'red').
// 	addColorStop(0.2, 'orange').
// 	addColorStop(0.4, 'yellow').
// 	addColorStop(0.6, 'green').
// 	addColorStop(0.8, 'blue').
// 	addColorStop(1, 'purple');

// brush = { stroke: 'white', lineWidth: 2 };

// handle1 = new jayus.Circle(0, 0, startRadius).paintedWith(brush).setOrigin(startPoint);
// handle2 = new jayus.Circle(0, 0, endRadius).paintedWith(brush).setOrigin(endPoint);

// display.setBg({ fill: radialGradient }).children.add(handle1, handle2);

// display.children.forEach(function(){
// 	this.setDraggable(true);
// 	this.addHandler('cursorEnter',function(){
// 		this.brush({ lineWidth: 4 });
// 	});
// 	this.addHandler('cursorLeave',function(){
// 		this.brush({ lineWidth: 2 });
// 	});
// });

// jayus.start();