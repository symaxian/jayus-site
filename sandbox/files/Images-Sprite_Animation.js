src = 'assets/item-redsword.png';

sprite = new jayus.Sprite(src);
sprite.setOrigin(40, 40);

sprite.whenLoaded(function() {

	sheet = new jayus.SpriteSheet(src);
	sheet.setSpriteSize(48, 48);
	sheet.addAnimation('float', [
		new jayus.Point(0, 0),
		new jayus.Point(1, 0),
		new jayus.Point(2, 0),
		new jayus.Point(3, 0),
		new jayus.Point(4, 0),
		new jayus.Point(5, 0)
	], 1200);

	sprite.loopAnimation('float');

	// Setting a non-linear easing slightly modifies the "look" of the animation
	// Try other easings such as 'easeInOutCirc' or 'easeOutBounce' to see the effect
	sprite.animator.setEasing('easeInOutQuad');

	key = new jayus.Image(src);
	key.setOrigin(40, 120);

	display.children.add(sprite, key);

});

jayus.start();