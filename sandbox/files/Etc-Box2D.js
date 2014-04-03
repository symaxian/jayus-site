
// Create a Box2D world with some gravity
world = new Box2D.Dynamics.b2World(new Box2D.Common.Math.b2Vec2(0, 40), true);
// And add it to jayus
jayus.box2d.addWorld(world);

// Create a surface for Box2D to draw debug info onto
var b2DebugSurface = new jayus.Surface(display.width, display.height);
// Add the Box2D debug surface onto the display
// display.children.add(b2DebugSurface);

// Create and configure the Box2D debugDraw object
debugDraw = new Box2D.Dynamics.b2DebugDraw();
debugDraw.SetSprite(b2DebugSurface.context);
debugDraw.SetFillAlpha(0.5);
debugDraw.SetLineThickness(1.0);
debugDraw.SetFlags(Box2D.Dynamics.b2DebugDraw.e_shapeBit | Box2D.Dynamics.b2DebugDraw.e_jointBit);
world.SetDebugDraw(debugDraw);

var fixDef = new Box2D.Dynamics.b2FixtureDef();
fixDef.density = 0.5;
fixDef.friction = 0.5;
fixDef.restitution = 0.001;

var bodyDef = new Box2D.Dynamics.b2BodyDef();

// Use a static polygon body
bodyDef.type = Box2D.Dynamics.b2Body.b2_staticBody;
fixDef.shape = new Box2D.Collision.Shapes.b2PolygonShape();
// The top/bottom walls
fixDef.shape.SetAsBox(display.width, 2);
bodyDef.position.Set(0, 0);
world.CreateBody(bodyDef).CreateFixture(fixDef);
bodyDef.position.Set(0, display.height);
world.CreateBody(bodyDef).CreateFixture(fixDef);
// The left/right walls
fixDef.shape.SetAsBox(2, display.height);
bodyDef.position.Set(0, 0);
world.CreateBody(bodyDef).CreateFixture(fixDef);
bodyDef.position.Set(display.width, 0);
world.CreateBody(bodyDef).CreateFixture(fixDef);


bodyDef.type = Box2D.Dynamics.b2Body.b2_dynamicBody;

var paintedLine = new jayus.Polygon.Line(0, 0, 10, 10).paintedWith({ stroke: 'red', lineWidth: 3, });
paintedLine.hide();
display.children.add(paintedLine);

// Create items to move around the display

addObject = function(text, x, y) {

	text = jayus.Text.fromObject({
		text: text,
		font: '60px sans-serif',
		brush: {
			fill: 'black'
		},
		bg: {
			fill: 'aqua',
			alpha: 0.4,
			stroke: 'blue'
		}
	});

	fixDef.shape = new Box2D.Collision.Shapes.b2PolygonShape();
	fixDef.shape.SetAsBox(text.width*jayus.box2d.scale, text.height*jayus.box2d.scale);
	bodyDef.position.x = x*jayus.box2d.scale;
	bodyDef.position.y = y*jayus.box2d.scale;
	var body = world.CreateBody(bodyDef);
	body.CreateFixture(fixDef);

	text.setBody(body);

	display.children.add(text);
};

addObject('Hello!', 80, 80);

getBodyAtMouse = function(x, y) {
	var mouseVec = new Box2D.Common.Math.b2Vec2(x, y);
	var aabb = new Box2D.Collision.b2AABB();
	aabb.lowerBound.Set(x - 0.001, y - 0.001);
	aabb.upperBound.Set(x + 0.001, y + 0.001);
	var body = null;
	var fixture = new Box2D.Dynamics.b2Fixture();
	
	// Query the world for overlapping shapes
	function GetBodyCallback(fixture) {
		var shape = fixture.GetShape();
		if(fixture.GetBody().GetType() !== Box2D.Dynamics.b2Body.b2_staticBody) {
			var inside = shape.TestPoint(fixture.GetBody().GetTransform(), mouseVec);
			if(inside) {
				body = fixture.GetBody();
				return false;
			}
		}
		return true;
	}

	world.QueryAABB(GetBodyCallback, aabb);
	return body;
};

mouseJoint = null;

display.addHandler('leftPress', function(e) {
	var body = getBodyAtMouse(display.cursor.x, display.cursor.y);
	if(body !== null) {
		var md = new Box2D.Dynamics.Joints.b2MouseJointDef();
		md.bodyA = world.GetGroundBody();
		md.bodyB = body;
		md.target.Set(display.cursor.x, display.cursor.y);
		md.collideConnected = true;
		md.maxForce = 300 * body.GetMass();
		mouseJoint = world.CreateJoint(md);
		body.SetAwake(true);
		paintedLine.shape.setPoint(1, e.x, e.y);
		paintedLine.show();
		body.entity.addHandler('dirty', function(type) {
			if(type & jayus.DIRTY.POSITION) {
				var pos = this.getUnFrame().getOrigin();
				pos.translate(this.width/2, this.height/2);
				paintedLine.shape.setPoint(0, pos);
			}
		});
		draggedBody = body;
	}
	else{
		addObject('Hi!', display.cursor.x/jayus.box2d.scale, display.cursor.y/jayus.box2d.scale);
	}
});

display.addHandler('rightPress', function(e) {
	var body = getBodyAtMouse(display.cursor.x, display.cursor.y);
	if(body !== null) {
		world.DestroyBody(body);
		display.children.remove(body.entity);
	}
});

display.addHandler('leftRelease', function(e) {
	if(mouseJoint) {
		draggedBody.entity.removeHandlers('dirty');
		paintedLine.hide();
		world.DestroyJoint(mouseJoint);
		mouseJoint = null;
	}
});

display.addHandler('cursorMove', function(e) {
	if(mouseJoint) {
		paintedLine.shape.setPoint(1, e.x, e.y);
		var p2 = new Box2D.Common.Math.b2Vec2(display.cursor.x, display.cursor.y);
		mouseJoint.SetTarget(p2);
	}
});

jayus.start();