display.setBg({ fill: 'white' });

frame = new jayus.EditableFrame().setBrush({ fill: '#BBB' });
frame.setPos(50, 50);

hBox = new jayus.hBox().setSpacing(10);

frame.setChild(hBox);

function addColor(stack,color){
    var child = new jayus.Scene();
    child.setBg({ fill: color });
    child.addHandler('scroll',function(e){
        this.policy.weight = jayus.clamp(0.1,this.policy.weight-e.scroll/10, 10);
        this.getChildAt(0).setText((''+this.policy.weight).substr(0,4));
    });
    child.children.add(new jayus.Text('1').setFont('12px sans-serif').setBrush({ fill: 'black' }));
    stack.children.add(child);
}

var htext = ['red','green','blue'];
for(var i=0;i<htext.length;i++){
    addColor(hBox,htext[i]);
}

display.children.add(frame);

jayus.start();