display.setBg({ fill: 'white' });

label = jayus.Text.fromObject({
	text: '',
	font: '32px sans-serif',
	brush: {
		fill: 'black'
	},
	x: 50,
	y: 50
});

display.handle({

	focused: function(e){
		label.setText('Display is focused');
	},

	blurred: function(e){
		label.setText('Display is not focused');
	}

});

display.children.add(label);

display.focus();

jayus.start();