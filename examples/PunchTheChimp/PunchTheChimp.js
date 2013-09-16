jayus.initClient = function(){

	//Jayus Settings

	jayus.setFrameRate(60);
	jayus.setBorder(1,'white','solid');

	showMenu();

}

jayus.mainClient = function(){



}

function showMenu(){

	menuScene = new jayus.Scene(600,400);

	playButton = new jayus.Text('Start','sans-serif',20).origin(300,200).style({
		fill:new jayus.Color('grey'),
	});

	playButton.expose();

	playButton.mouseEnter(function(){
		this.fontSize(30);
	});

	playButton.mouseLeave(function(){
		this.fontSize(20);
	});

	playButton.leftClick(function(){
		jayus.director.remove(menuScene);
		loadLevel(1);
	});

	menuScene.add(playButton);

	jayus.director.add(menuScene);

}

function loadLevel(level){

	gameScene = new jayus.Scene(600,400);
	gameScene.add(images.PlayerShip);

	jayus.director.keyPress(function(event){
		if(event.keyId === 'up'){
			images.PlayerShip.y -= 10;
		}
		else if(event.keyId === 'down'){
			images.PlayerShip.y += 10;
		}
	});

	jayus.director.add(gameScene);

}
