(function() {
    
var Spacies = function() {
    b2jsTest.__constructor.apply(this, arguments);
};
extend(Spacies.prototype, b2jsTest.prototype)

Spacies.prototype.createWorld = function() {
    var that = this;
    var world = b2jsTest.prototype.createWorld.apply(this, arguments);
    world.DestroyBody(this._wallTop);
    world.DestroyBody(this._wallLeft);
    world.DestroyBody(this._wallRight);
    world.DestroyBody(this._wallBottom);
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

    function createRope(x, y, w, h, numJoints, delta, div) {
      w = w || 1.7;
      h = h || 1.7;
      var anchor = createAnchor(x,y);
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
        jointDef.localAnchorB.Set(0, 0.5);
        jointDef.bodyA = anchor1;          
        jointDef.bodyB = that.createBall(world, x1, y1-delta*i, 0.25, 1, 1, 70);  //x,y,radius,fric,rest,density
        world.CreateJoint(jointDef);
        anchor1 = jointDef.bodyB;
      }
      jointDef = new b2RevoluteJointDef();        
      jointDef.localAnchorA.Set(0, 0);
      jointDef.localAnchorB.Set(-w/2,1.2);
      jointDef.bodyA = anchor1;
      jointDef.bodyB = spawn(x1+xOffset, y1-(numJoints*delta),w, h, Math.random()/2);
      jointDef.bodyB.m_userData = div;
      world.CreateJoint(jointDef);
      
      var sign = jointDef.bodyB;
      
      for(i=0; i<numJoints; i++) {
        jointDef = new b2RevoluteJointDef();
        jointDef.localAnchorA.Set(0, 0);
        jointDef.localAnchorB.Set(0, 0.5);
        jointDef.bodyA = anchor2;          
        jointDef.bodyB = that.createBall(world, x2, y2-delta*i, 0.25, 1, 1, 10);  //x,y,radius,fric,rest,density
        world.CreateJoint(jointDef);
        anchor2 = jointDef.bodyB;
      }
      jointDef = new b2RevoluteJointDef();        
      jointDef.localAnchorA.Set(0, 0);
      jointDef.localAnchorB.Set(w/2,1.2);
      jointDef.bodyA = anchor2;
      jointDef.bodyB = sign;
      jointDef.bodyB.m_userData = div;
      world.CreateJoint(jointDef);      
    }    

    createRope(28,24,
               1.7,1.7,
               25,0.1,"linkedin");
               
    createRope(32,24,
               1.7,1.7,
               20,0.1, "facebook");    
               
    createDoubleRope(38.5,24.0,
                     43.0,24.7,
                     4.35,1.95,
                     12,0.1, "work-stuff");

    createDoubleRope(18.5,24.0,
                     23.0,24.7,
                     4.35,1.95,
                     12,0.1, "music-stuff");

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
  var sprite = jQuery("#" + body.m_userData);
  jQuery(sprite)
    .css("position", "absolute")
    .css("-moz-transform", rotationStyle)
    .css("-webkit-transform", rotationStyle)
    .css("transform", rotationStyle)
    .css("left", (body.m_xf.position.x*this.m_drawScale)- (this.m_drawScale)  + "px")
    .css("top",  this.Y(body.m_xf.position.y*this.m_drawScale)-575 + EPC.getBgOffset() + "px");
    
  if(jQuery(sprite).css("top") > jQuery("canvas").css("height")) {
    jQuery(sprite).hide();
  } else {
    jQuery(sprite).show();
  }
  
  if(EPC.getBgOffset() > 0) {
    jQuery("img[id*='cloud']").each(function() {
      if(jQuery(this).css("top") > jQuery("canvas").css("height")) {
        jQuery(this).hide();
      } else {
        jQuery(this).show()
         .stop()
         .css("position","absolute")
         .css("top", EPC.getBgOffset()/10 + parseInt(jQuery(this).css("top")) + "px");
      }
    });
  }
  
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

b2DebugDraw.prototype.DrawSegment=function(a,b,c, mouseDown){
  mouseDown = mouseDown || false;
  if(mouseDown) console.log("Segment Y: " + this.Y(a.y*this.m_drawScale) + EPC.getBgOffset());
  this.m_sprite.lineWidth=this.m_lineThickness;
  this.m_sprite.strokeSyle=this.ColorStyle(c,this.m_alpha);
  this.m_sprite.beginPath();
  this.m_sprite.moveTo(a.x*this.m_drawScale,this.Y(a.y*this.m_drawScale) + EPC.getBgOffset());
  this.m_sprite.lineTo(b.x*this.m_drawScale,this.Y(b.y*this.m_drawScale) + EPC.getBgOffset());
  this.m_sprite.stroke();
  this.m_sprite.closePath()
};

b2DebugDraw.prototype.DrawSolidCircle=function(a,b,c,d) {
  return;
}

window.spacies = Spacies;
    
})();