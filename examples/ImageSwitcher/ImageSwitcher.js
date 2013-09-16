function init(){

	jayus.init({
		framerate:200,
		cursor:{
			exposed:false,
			suppressScrolling:true
		}
	});

	jayus.Surface.prototype.xAnchor = .5;
	jayus.Surface.prototype.yAnchor = .5;

	images = new jayus.Layer().addImage(
		'images/1.jpg',
		'images/2.jpg',
		'images/3.jpg',
		'images/4.jpg',
		'images/5.jpg',
		'images/6.jpg',
		'images/7.jpg',
		'images/8.jpg'
	);

	function resetVerticalPos(){
		images.forEach(function(){
			this.setY(jayus.director.getHeight()/2);
		});
	}

	images.forEach(function(){
		this.hide();
		this.setAnchor(.5,.5);
		console.log(this.base.h/2);
		this.setHandler('loaded',function(){
			this.setY(jayus.display.getHeight()/2);
		});
	});

	resetVerticalPos();

	jayus.director.add(images);

	jayus.expand();

	jayus.director.style({fill:'black'});

	jayus.keyPress(function(event){
		if(event.key === 'left' || event.key === 'right'){

			for(var i=0;i<jayus.animators.length;i++){
				jayus.animators[i].finish();
			}

			// Crude, remove
			jayus.animators = [];

			if(event.key === 'left'){

				//Left Arrow, Move Images Right

				var image0 = secondLeftImage();
				image0.setX(-jayus.display.w/2);
				//image0.setScale(.5);
				jayus.director.add(image0);
				image0.animate().move(jayus.display.w/2,0).setEasing(jayus.easing.easeOutQuint).play();

				var image1 = leftImage();
				image1.setX(0);
				//image1.animate().scale(2).setEasing(jayus.easing.easeOutQuint).play();
				image1.animate().move(jayus.display.w/2,0).setEasing(jayus.easing.easeOutQuint).play();

				var image2 = images.get(currentImage);
				image2.setX(jayus.display.w/2);
				//image2.animate().scale(.5).setEasing(jayus.easing.easeOutQuint).play();
				image2.animate().move(jayus.display.w/2,0).setEasing(jayus.easing.easeOutQuint).play();

				var image3 = rightImage();
				image3.setX(jayus.display.w);
				image3.animate().move(jayus.display.w/2,0).setEasing(jayus.easing.easeOutQuint).setCallback(function(){
					jayus.director.remove(this);
				}).play();

				currentImage = leftIndex();

			}
			else{

				//Right Arrow, Move Images Left

				var image0 = leftImage();
				image0.x = 0;
				image0.animate().move(-jayus.display.w/2,0).setEasing(jayus.easing.easeOutQuint).setCallback(function(){
					this.hide();
				}).play();

				var image1 = images.get(currentImage);
				image1.setX(jayus.display.w/2);
				//image1.animate().scale(.5).setEasing(jayus.easing.easeOutQuint).play();
				image1.animate().move(-jayus.display.w/2,0).setEasing(jayus.easing.easeOutQuint).play();

				var image2 = rightImage();
				image2.x = jayus.display.w;
				//image2.animate().scale(2).setEasing(jayus.easing.easeOutQuint).play();
				image2.animate().move(-jayus.display.w/2,0).setEasing(jayus.easing.easeOutQuint).play();

				currentImage = rightIndex();

				var image3 = rightImage().show();
				image3.x = jayus.display.w*1.5;
				//image3.setScale(.5);
				image3.animate().move(-jayus.display.w/2,0).setEasing(jayus.easing.easeOutQuint).play();

			}

			jayus.director.dirty('Images moved');

		}
	});

	currentImage = 0;

	var image0 = leftImage().show();
	//image0.scale(.5);
	image0.setX(-image0.getWidth()/2);

	var image1 = images.get(currentImage).show();
	image1.setX(jayus.display.w/2);

	var image2 = rightImage().show();
	//image2.scale(.5);
	image2.setX(jayus.display.w);

	fps = new jayus.Text('...','sans-serif',14);
	fps.style({fill:'white'});
	fps.setPos(10,10);
	jayus.director.add(fps);

	jayus.onFrame(function(){

		fps.setText(''+jayus.fps);

	});

	jayus.start();

}

//Left Image

function leftIndex(){
	if(currentImage === 0)
		return images.count()-1;
	return currentImage-1;
}

function leftImage(){
	return images.get(leftIndex());
}

function secondLeftIndex(){
	var i = leftIndex();
	if(i === 0)
		return images.count()-1;
	return i-1;
}

function secondLeftImage(){
	return images.get(secondLeftIndex());
}

//Right Image

function rightIndex(){
	if(currentImage === images.count()-1)
		return 0;
	return currentImage+1;
}

function rightImage(){
	return images.get(rightIndex());
}

function secondRightIndex(){
	var i = rightIndex();
	if(i === images.length-1)
		return 0;
	return i+1;
}

function secondRightImage(){
	return images.get(secondRightIndex());
}
