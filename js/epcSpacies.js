(function() {
    
var Spacies = function() {
    b2jsSpacies.__constructor.apply(this, arguments);
};

extend(Spacies.prototype, b2jsSpacies.prototype)

Spacies.prototype.createWorld = function() {
    var that = this;
    var satAnchor = null;
    var world = b2jsSpacies.prototype.createWorld.apply(this, arguments);
    function spawn(x, y, w, h, a) {
        w = w || 1.7;
        h = h || 1.7;
        var bodyDef = new b2BodyDef();
        bodyDef.type = b2Body.b2_dynamicBody;
        bodyDef.position.Set(x, y);
        bodyDef.angle = a;
        var body = world.CreateBody(bodyDef);
        body.w = w;
        body.h = h;
        var shape = new b2PolygonShape.AsBox(body.w, body.h);
        var fixtureDef = new b2FixtureDef();
        fixtureDef.restitution = .25;
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

    function createRope(x, y, w, h, numJoints, delta, div) {
      w = w || 1.7;
      h = h || 1.7;
      var anchor = createAnchor(x,y);
      if(div == "satAnchor") {
        that.satAnchor = anchor;
      }
      //var xOffset = (Math.random() - 0.5) * 100
      var xOffset = 0
      console.log("createRope: " + x + ", " + y);
      for(var i=0; i<numJoints; i++) {
        jointDef = new b2RevoluteJointDef();
        jointDef.localAnchorA.Set(0, 0);
        jointDef.localAnchorB.Set(0, 0.5);
        jointDef.bodyA = anchor;          
        jointDef.bodyB = that.createBall(world, x, y-delta*i, 0.25, 1, 1, 10);  //x,y,radius,fric,rest,density
        world.CreateJoint(jointDef);
        anchor = jointDef.bodyB;
      }
      jointDef = new b2RevoluteJointDef();        
      jointDef.localAnchorA.Set(0, 0);
      jointDef.localAnchorB.Set(0,1.2);
      jointDef.bodyA = anchor;
      jointDef.bodyB = spawn(x+xOffset, y-(numJoints*delta),w, h, 0);
      jointDef.bodyB.m_userData = div;
      world.CreateJoint(jointDef);
    }
    
    function createDoubleRope(x1, y1, x2, y2, w, h, numJoints, delta, div) {
      var anchor1 = createAnchor(x1,y1);
      var anchor2 = createAnchor(x2,y2);
      var xOffset = 0
      console.log("createDoubleRope: " + x1 + ", " + y1 + " ---> " + x2 + ", " + y2);
      for(var i=0; i<numJoints; i++) {
        jointDef = new b2RevoluteJointDef();
        jointDef.localAnchorA.Set(0, 0);
        jointDef.localAnchorB.Set(0, 1);
        jointDef.bodyA = anchor1;          
        jointDef.bodyB = that.createBall(world, x1, y1-delta*i, 0.5, 1, 1, 70);  //x,y,radius,fric,rest,density
        world.CreateJoint(jointDef);
        anchor1 = jointDef.bodyB;
      }
      jointDef = new b2RevoluteJointDef();        
      jointDef.localAnchorA.Set(0, 0);
      jointDef.localAnchorB.Set(-w/2,4.2);
      jointDef.bodyA = anchor1;
      jointDef.bodyB = spawn(x1+xOffset, y1-(numJoints*delta),w, h, Math.random()/2);
      jointDef.bodyB.m_userData = div;
      world.CreateJoint(jointDef);
      
      var sign = jointDef.bodyB;
      
      for(i=0; i<numJoints; i++) {
        jointDef = new b2RevoluteJointDef();
        jointDef.localAnchorA.Set(0, 0);
        jointDef.localAnchorB.Set(0, 1);
        jointDef.bodyA = anchor2;          
        jointDef.bodyB = that.createBall(world, x2, y2-delta*i, 0.5, 1, 1, 70);  //x,y,radius,fric,rest,density
        world.CreateJoint(jointDef);
        anchor2 = jointDef.bodyB;
      }
      jointDef = new b2RevoluteJointDef();        
      jointDef.localAnchorA.Set(0, 0);
      jointDef.localAnchorB.Set(w/2,4.2);
      jointDef.bodyA = anchor2;
      jointDef.bodyB = sign;
      jointDef.bodyB.m_userData = div;
      world.CreateJoint(jointDef);      
    }    

    function spawnFloatySign(x, y, sign_id) {
      var dbgWidth = jQuery("#"+sign_id).width()/that._dbgDraw.m_drawScale/2;
      var dbgHeight = jQuery("#"+sign_id).height()/that._dbgDraw.m_drawScale/2;
      var sign = spawn(x, y, dbgWidth, dbgHeight, Math.random()/2);
      sign.m_userData = sign_id;
      return sign;
    }
    
    createRope(28,29,
               1.7,1.7,
               10,0.1,"satAnchor");

//    createDoubleRope(14.5,18.0,
//                     26.0,18.0,
//                     11.1,6,
//                     6,1.1, "sobe-sign");

    spawnFloatySign(17, 12, "sobe-sign");
    spawnFloatySign(40, 18, "orbit-sign");
    spawnFloatySign(48, 25,"eclipse-sign");
    spawnFloatySign(48, 25, "fivegum-sign");
    
    return world;
};

Spacies.prototype.draw = function() {
  var c = this._canvas.getContext("2d");
  this._scale = this._dbgDraw.GetDrawScale();
  this._dbgDraw.SetLineThickness(2);
  c.clearRect(0,0,this._canvas.width,this._canvas.height);

  this._dbgDraw.SetSprite(c);
  if(this._world) {
      this._world.SetDebugDraw(this._dbgDraw);
      this._world.DrawDebugData();
  }          
//    c.fillStyle = "black";
//    if(this._paused) {
//        c.fillText("paused", 5, 15);
//    } else {
//        c.fillText("FPS: " + this._fpsAchieved, 5, 15);
//    }
//      
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
    b!=this.m_groundBody&&this.m_debugDraw.DrawSegment(d,h,f);
    this.m_debugDraw.DrawSegment(h,g,f);
    c!=this.m_groundBody&&this.m_debugDraw.DrawSegment(e,g,f)
  }
};

window.spacies = Spacies;
    
})();