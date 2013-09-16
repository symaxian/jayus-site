display.setBg({ fill: 'white' });

sprite = new jayus.Image('assets/item-bluesword.png');
sprite.setOrigin(40, 40);

fullImage = new jayus.Image('assets/item-bluesword.png');
fullImage.setOrigin(40, 120);

display.children.add(sprite, fullImage);

jayus.start();

sprite.setSection(0, 0, 48, 48);

anim = new jayus.Animator.Discrete(6, function(index){
	sprite.setSection(index*48, 0, 48, 48);
});

anim.setLooped(true).start();