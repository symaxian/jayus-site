display.setBg({ fill: 'white' });

hStack = new jayus.hStack();
hStack.setSpacing(10).setReversed(false);
hStack.setOrigin(40, 40);

vStack = new jayus.vStack();
vStack.setSpacing(10).setReversed(false);
vStack.setOrigin(40, 120);

function addTextToStack(stack, text){
    stack.children.add(
        new jayus.Frame(
            new jayus.Text(text).setBrush({ fill: 'black' })
        ).setBrush({ stroke: 'blue' })
    );
}

var htext = ["I'm", "a", "horizontal", "stack."];
for(var i=0;i<htext.length;i++){
    addTextToStack(hStack, htext[i]);
}

var vtext = ["I'm", "a", "vertical", "stack."];
for(var i=0;i<vtext.length;i++){
    addTextToStack(vStack, vtext[i]);
}

display.children.add(
    new jayus.EditableFrame(hStack).setBrush({ fill: '#BBB' }),
    new jayus.EditableFrame(vStack).setBrush({ fill: '#BBB' })
);

display.children.onEach('addHandler', ['scroll', function(e){
    if(e.scroll < 0 && this.child.children.count() < 10){
        addTextToStack(this.child, '---');
    }
    else if(e.scroll > 0 && this.child.children.count() > 4){
        this.child.children.removeAt(4);
    }
    return true;
}]);

jayus.start();