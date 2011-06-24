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
    //var boxsize = 1.7;
    function spawn(x, y, a, s) {
        var boxsize = s || 1.7;
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

    function createRope(x, y, numJoints, delta, div, size) {
      var boxsize = size || 1.7;
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
      jointDef.localAnchorB.Set(0,1.2);
      jointDef.bodyA = anchor;
      jointDef.bodyB = spawn(x+xOffset, y-(numJoints*delta),0, boxsize);
      jointDef.bodyB.m_userData = div;
      world.CreateJoint(jointDef);
    }

    createRope(15,32,25,0.1,"linkedin", 1.7);
    createRope(22,33,27,0.1, "facebook", 1.7);    
    createRope(31,33,40,0.1, "youtube", 1.7);
    createRope(40,35,27,0.1, "rach1", 1.85);
    
    return world;
};

Danglies.prototype.draw = function() {
  var c = this._canvas.getContext("2d");
  this._scale = this._dbgDraw.GetDrawScale();
  this._dbgDraw.SetLineThickness(2);
  c.clearRect(0,0,this._canvas.width,this._canvas.height);

  this._dbgDraw.SetSprite(c);
  if(this._world) {
      this._world.SetDebugDraw(this._dbgDraw);
      this._world.DrawDebugData();
  }          
}

b2DebugDraw.prototype.DrawSolidPolygon=function(vertices,numVertices,c, body) {
//  this.m_sprite.strokeSyle=this.ColorStyle(c,this.m_alpha);
//  this.m_sprite.lineWidth=this.m_lineThickness;
//  this.m_sprite.fillStyle=this.ColorStyle(c,this.m_fillAlpha);
//  this.m_sprite.beginPath();
//  this.m_sprite.moveTo(vertices[0].x*this.m_drawScale,this.Y(vertices[0].y*this.m_drawScale));
//
//  for(var i=1;i<numVertices;i++) 
//    this.m_sprite.lineTo(vertices[i].x*this.m_drawScale,this.Y(vertices[i].y*this.m_drawScale));
//
//  this.m_sprite.lineTo(vertices[0].x*this.m_drawScale,this.Y(vertices[0].y*this.m_drawScale));
//  this.m_sprite.fill();
//  this.m_sprite.stroke();
//  this.m_sprite.closePath()
  var rotationStyle = 'rotate(' + (-body.m_xf.GetAngle() * 57.2957795) + 'deg)';
  jQuery("#" + body.m_userData + " img.cloudicon")
    .css("position", "absolute")
    .css("-moz-transform", rotationStyle)
    .css("-webkit-transform", rotationStyle)
    .css("left", (body.m_xf.position.x*this.m_drawScale)- (1.6*this.m_drawScale)  + "px")
    .css("top",  this.Y(body.m_xf.position.y*this.m_drawScale)-575 + "px");
}

b2World.prototype.DrawJoint=function(a) {
var b=a.GetBodyA(),c=a.GetBodyB(),d=b.m_xf.position,e=c.m_xf.position,h=a.GetAnchorA(),g=a.GetAnchorB(),f=b2World.s_jointColor;

if(c.GetUserData() != null) return;

switch(a.m_type){
  case b2Joint.e_distanceJoint:
    this.m_debugDraw.DrawSegment(h,g,f);
    break;

  case b2Joint.e_pulleyJoint:
    b=a.GetGroundAnchorA();
    a=a.GetGroundAnchorB();
    this.m_debugDraw.DrawSegment(b,h,f);
    this.m_debugDraw.DrawSegment(a,g,f);
    this.m_debugDraw.DrawSegment(b,a,f);
    break;

  case b2Joint.e_mouseJoint:
    //this.m_debugDraw.DrawSegment(h,g,f);
    break;

  default:
    if(a.m_userData == "dont") return
    b!=this.m_groundBody&&this.m_debugDraw.DrawSegment(d,h,f);
    this.m_debugDraw.DrawSegment(h,g,f);
    c!=this.m_groundBody&&this.m_debugDraw.DrawSegment(e,g,f)
  }
};

b2DebugDraw.prototype.DrawSolidCircle=function(a,b,c,d) {
  return;
}

window.danglies = Danglies;
    
})();