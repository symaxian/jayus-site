display.setBg({ fill: 'white' });

player = new jayus.Sprite('deathknight.png');
player.setOrigin(40, 40);
player.keepAligned = true;

sheet = new jayus.SpriteSheet();
sheet.setSpriteSize(126, 126);

function addAnimation(name, row, length, duration, flipX){
	var sequence = [];
	for(var i=0;i<length;i++){
		sequence.push(new jayus.Point(i, row));
	}
	sheet.addAnimation(name, sequence, duration);
	sheet.setAnimationFlipping(name, flipX, false);
}

var attackDuration = 500,
	walkDuration = 800,
	standDuration = 800;

addAnimation('attack-right', 0, 5, attackDuration, false);
addAnimation('walk-right', 1, 4, walkDuration, false);
addAnimation('stand-right', 2, 2, standDuration, false);

addAnimation('attack-up', 3, 5, attackDuration, false);
addAnimation('walk-up', 4, 4, walkDuration, false);
addAnimation('stand-up', 5, 2, standDuration, false);

addAnimation('attack-down', 6, 5, attackDuration, false);
addAnimation('walk-down', 7, 4, walkDuration, false);
addAnimation('stand-down', 8, 2, standDuration, false);

addAnimation('attack-left', 0, 5, attackDuration, true);
addAnimation('walk-left', 1, 4, walkDuration, true);
addAnimation('stand-left', 2, 2, standDuration, true);

player.setSpriteSheet(sheet);

facing = 'down';
state = 'stand';
x = 0;
y = 0;
speed = 120;
attacking = false;

function refresh(){
	if(x === -1){
		facing = 'left';
	}
	else if(x === 1){
		facing = 'right';
	}
	else if(y === -1){
		facing = 'up';
	}
	else if(y === 1){
		facing = 'down';
	}
	player.setVelocity(x*speed, y*speed);
	if(x || y){
		state = 'walk';
	}
	else{
		state = 'stand';
	}
	player.loopAnimation(state+'-'+facing);
}

jayus.addHandler('keyPress', function(e){
	if(e.key === 'w'){
		y--;
	}
	else if(e.key === 'a'){
		x--;
	}
	else if(e.key === 's'){
		y++;
	}
	else if(e.key === 'd'){
		x++;
	}
	if(!attacking){
		if(e.key === 'space'){
			player.playAnimation('attack-'+facing);
			player.animator.addHandler('finished', function(){
				attacking = false;
				refresh();
			});
			attacking = true;
			player.origin.clearVelocity();
		}
		else{
			refresh();
		}
	}
});

jayus.addHandler('keyRelease', function(e){
	if(e.key === 'w'){
		y++;
	}
	else if(e.key === 'a'){
		x++;
	}
	else if(e.key === 's'){
		y--;
	}
	else if(e.key === 'd'){
		x--;
	}
	if(!attacking){
		refresh();
	}
});

refresh();

display.children.add(player);

jayus.start();