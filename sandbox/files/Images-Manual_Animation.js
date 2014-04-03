display.setBg({ fill: 'white' });

// This is a very ugly way to do sprite animation, and is never recommended but demonstrated here anyway

src = 'assets/item-bluesword.png';

jayus.images.whenLoaded(src, function() {

	sprite = new jayus.Image(src);
	sprite.setOrigin(40, 40);

	fullImage = new jayus.Image(src);
	fullImage.setOrigin(40, 120);

	display.children.add(sprite, fullImage);

	sprite.setSection(0, 0, 48, 48);

	anim = new jayus.Animator.Discrete(6, function(index){
		sprite.setSection(index*48, 0, 48, 48);
	});

	anim.setLooped(true).start();

	jayus.start();

});