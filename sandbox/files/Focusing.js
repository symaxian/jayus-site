display.setBg({ fill: 'white' });

label = new jayus.Text('', '32px sans-serif', { fill: 'black' });
label.setOrigin(50, 50);
display.children.add(label);

display.handle({

	focused: function(e){
		label.setText('Display is focused');
	},

	blurred: function(e){
		label.setText('Display is not focused');
	}

});

display.focus();

jayus.start();