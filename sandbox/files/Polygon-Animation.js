display.setBg({ fill: 'black' });

polygonCount = 4;

randX = function(){
	return Math.random()*display.size.getWidth();
};

randY = function(){
	return Math.random()*display.size.getHeight();
};

randDuration = function(){
	return 1+Math.random()*2;
};

randColor = function(){
	return jayus.math.randomFrom(jayus.colors.cssNames);
};

animatePoint = function(point){
	point.animate().set(randX(), randY()).setDuration(randDuration()).addHandler('finished',function(){
		animatePoint(point);
	}).start();
};

for(var i=0;i<polygonCount;i++){
	var polygon = new jayus.Polygon();
	for(var j=0;j<4;j++){
		var point = new jayus.Point(randX(), randY());
		animatePoint(point);
		polygon.add(point);
	}
	display.children.add(new jayus.PaintedShape(polygon, { stroke: randColor(), lineWidth: 2 }));
}

jayus.start();