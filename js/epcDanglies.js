(function() {
    
var Danglies = function() {
    b2jsTest.__constructor.apply(this, arguments);
};
extend(Danglies.prototype, b2jsTest.prototype)

Danglies.prototype.createWorld = function() {
    var that = this;
    var world = b2jsTest.prototype.createWorld.apply(this, arguments);
    world.DestroyBody(this._wallTop);
    world.DestroyBody(this._wallLeft);
    world.DestroyBody(this._wallRight);
    world.DestroyBody(this._wallBottom);
    var boxsize = 1.4;
    function spawn(x, y, a) {
        var bodyDef = new b2BodyDef();
        bodyDef.type = b2Body.b2_dynamicBody;
        bodyDef.position.Set(x, y);
        bodyDef.angle = a;
        var body = world.CreateBody(bodyDef);
        body.w = boxsize;
        body.h = boxsize;
        var shape = new b2PolygonShape.AsBox(body.w, body.h);
        var fixtureDef = new b2FixtureDef();
        fixtureDef.restitution = 0.0;
        fixtureDef.density = 2.0;
        fixtureDef.friction = 0.9;
        fixtureDef.shape = shape;
        body.CreateFixture(fixtureDef);
        return body;
    }

    function createAnchor(x, y) {
      var anchorBd = new b2BodyDef();
      anchorBd.position.Set(x,y);
      return world.CreateBody(anchorBd)
    }

    function createRope(x, y, numJoints, delta, div) {
      var anchor = createAnchor(x,y);
      //var xOffset = (Math.random() - 0.5) * 100
      var xOffset = 0
      console.log("createRope: " + x + ", " + y);
      for(var i=0; i<numJoints; i++) {
        jointDef = new b2RevoluteJointDef();
        jointDef.localAnchorA.Set(0, 0);
        jointDef.localAnchorB.Set(0, 0.2);
        jointDef.bodyA = anchor;          
        jointDef.bodyB = that.createBall(world, x, y-delta*i, 0.05, 1, 1, 1000);  //x,y,radius,fric,rest,density
        world.CreateJoint(jointDef);
        anchor = jointDef.bodyB;
      }
      jointDef = new b2RevoluteJointDef();        
      jointDef.localAnchorA.Set(0, 0);
      jointDef.localAnchorB.Set(0,1);
      jointDef.bodyA = anchor;
      jointDef.bodyB = spawn(x+xOffset, y-(numJoints*delta),0);
      jointDef.bodyB.m_userData = div      
      world.CreateJoint(jointDef);      
    }

    function createLinkedInIcon() {      
      //createRope(230,390,15,10);
      createRope(15,28,25,0.1,"linkedin");
    }
      
    function createFacebookIcon() {      
      createRope(30,15,27,0.1, "facebook");
    }
      
    function createYoutubeIcon() {      
      createRope(35,10,15,0.1, "youtube");
    }
        
    createLinkedInIcon();
    createFacebookIcon();
    createYoutubeIcon();
//    createFacebookIcon();
//    createYoutubeIcon();
    
    console.log(world);
    return world;
};

Danglies.prototype.draw = function() {
  var c = this._canvas.getContext("2d");
  this._scale = this._dbgDraw.GetDrawScale();
  this._dbgDraw.SetLineThickness(3);
  c.clearRect(0,0,this._canvas.width,this._canvas.height);

  this._dbgDraw.SetSprite(c);
  if(this._world) {
      this._world.SetDebugDraw(this._dbgDraw);
      this._world.DrawDebugData();
  }    
  
//  for (var b = this._world.m_bodyList; b; b = b.m_next) {
//    for (var s = b.GetFixtureList(); s != null; s = s.GetNext()) {
//      this.drawShape(s, c);
//    }
//  }            
//  for (var j = this._world.m_jointList; j; j = j.m_next) {
//    var jprox = j.GetUpperLimit();
//    this.drawJoint(j, c);
//  }            
}

Danglies.prototype.drawShape = function(s, c) {
  switch(s.m_userData){
    case "linkedin":           // icon
      jQuery("#linkedin img.cloudicon").css("position","absolute").css("left", s.m_shape.x*this._scale).css("top", s.m_shape.y*this._scale);
      break;
  }
}

Danglies.prototype.drawJoint = function(j,c) {
    var b1 = j.m_bodyA;
    var b2 = j.m_bodyB;
    var x1 = b1.GetPosition();
    var x2 = b2.GetPosition();
//    var p1 = j.localAnchor1.GetPosition();
//    var p2 = j.localAnchor2.GetPosition();
    c.strokeStyle = '#0b0b0b';
    c.beginPath();
    c.moveTo(x1.x*this._scale, x1.y*this._scale);
    c.lineTo(x2.x*this._scale, x2.y*this._scale);
    c.closePath();
    c.stroke();  
}

b2DebugDraw.prototype.DrawSolidPolygon=function(a,b,c) {
}

b2World.prototype.DrawJoint=function(a) {
if(a.m_userData == "mj") return;
var b=a.GetBodyA(),c=a.GetBodyB(),d=b.m_xf.position,e=c.m_xf.position,h=a.GetAnchorA(),g=a.GetAnchorB(),f=b2World.s_jointColor;switch(a.m_type){case b2Joint.e_distanceJoint:this.m_debugDraw.DrawSegment(h,g,f);break;case b2Joint.e_pulleyJoint:b=a.GetGroundAnchorA();a=a.GetGroundAnchorB();this.m_debugDraw.DrawSegment(b,h,f);this.m_debugDraw.DrawSegment(a,g,f);this.m_debugDraw.DrawSegment(b,a,f);break;case b2Joint.e_mouseJoint:this.m_debugDraw.DrawSegment(h,g,
f);break;default:b!=this.m_groundBody&&this.m_debugDraw.DrawSegment(d,h,f);this.m_debugDraw.DrawSegment(h,g,f);c!=this.m_groundBody&&this.m_debugDraw.DrawSegment(e,g,f)}};

b2DebugDraw.prototype.DrawSolidCircle=function(a,b,c,d) {
  return;
}

window.danglies = Danglies;
    
})();