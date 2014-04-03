
image = new jayus.Image('assets/chest.png');

// Even though the image might not be loaded yet, we can modify all of its properties

image.setOrigin(80, 80);

image.rotate(jayus.math.toRadians(45));

image.handle({

	rightPress: function() {
		image.rotate(jayus.math.toRadians(45));
	},

	scroll: function(e) {
		image.setScale(image.xScale-e.scroll, image.yScale-e.scroll);
	}

});

image.setDragButton('left');

// But only add the image onto the display when finished loading
image.whenLoaded(function() {
	display.children.add(image);
});

jayus.start();