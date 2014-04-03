display.setBg({ fill: 'white' });

hStack = new jayus.hStack();
hStack.setSpacing(10).setReversed(false);
hStack.automaticHeight = false;

vStack = new jayus.vStack();
vStack.setSpacing(10).setReversed(false);
vStack.automaticWidth = false;

function addTextToStack(stack, text){
    var frame = new jayus.FlexibleFrame(
        new jayus.Text(text).setBrush({ fill: 'black' })
    ).setBg({ stroke: 'blue' });
    frame.widthMode = jayus.RESIZE_SELF;
    frame.heightMode = jayus.RESIZE_SELF;
    stack.children.add(frame);
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
    jayus.parse({
        type: 'EditableFrame',
        child: hStack,
        bg: { fill: '#BBB' },
        height: 100,
        widthMode: jayus.RESIZE_SELF,
        heightMode: jayus.RESIZE_CHILD
    }),
    jayus.parse({
        type: 'EditableFrame',
        child: vStack,
        bg: { fill: '#BBB' },
        width: 100,
        widthMode: jayus.RESIZE_CHILD,
        heightMode: jayus.RESIZE_SELF
    })
);

hStack.parent.setOrigin(40, 40);
vStack.parent.setOrigin(40, 120);

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