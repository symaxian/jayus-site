image = new jayus.Image('assets/chest.png');
image.setOrigin(80, 80);

image.rotate(jayus.math.toRadians(45));

image.handle({

	rightPress: function(){
		image.rotate(jayus.math.toRadians(45));
	},

	scroll: function(e){
		image.setScale(image.xScale-e.scroll, image.yScale-e.scroll);
	}

});

display.children.add(image);

jayus.start();