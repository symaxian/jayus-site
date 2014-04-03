display.setBg({ fill: 'white' });

src = 'assets/guard.png';

jayus.images.whenLoaded(src, function() {

	image = new jayus.Image(src);
	image.setOrigin(40, 40);

	image.setSection(36, 30, 30, 36);

	key = new jayus.Image(src);
	key.setOrigin(40, 120);

	display.children.add(image, key);

});

jayus.start();