display.setBg({ fill: 'white' });

src = 'assets/chest.png';

// Wait until our source image is loaded
jayus.images.whenLoaded(src, function() {

	// When the image file is loaded, create a new Image object and add it to the display

	image = new jayus.Image(src);
	image.setOrigin(40, 40);
	display.children.add(image);

});

jayus.start();