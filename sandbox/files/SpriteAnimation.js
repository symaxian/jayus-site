sprite = new jayus.Sprite('item-redsword.png');
sprite.setOrigin(40, 40);

sheet = new jayus.SpriteSheet();
sheet.setSpriteSize(48, 48);
sheet.addAnimation('float', [
	new jayus.Point(0,0),
	new jayus.Point(1,0),
	new jayus.Point(2,0),
	new jayus.Point(3,0),
	new jayus.Point(4,0),
	new jayus.Point(5,0)
], 1200);

sprite.setSpriteSheet(sheet);

sprite.loopAnimation('float');
sprite.animator.setEasing('easeInOutQuad');

key = new jayus.Image('item-redsword.png');
key.setOrigin(40, 120);

display.children.add(sprite, key);

jayus.start();