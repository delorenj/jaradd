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

    function createRope(x, y, numJoints, delta) {
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
      world.CreateJoint(jointDef);      
    }

    function createLinkedInIcon() {      
      //createRope(230,390,15,10);
      createRope(15,28,25,0.1);
    }
      
    function createFacebookIcon() {      
      createRope(30,15,27,0.1);
    }
      
    function createYoutubeIcon() {      
      createRope(35,10,15,0.1);
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
    c.clearRect(0,0,this._canvas.width,this._canvas.height);
    
    for (var b = this._world.m_bodyList; b; b = b.m_next) {
        for (var s = b.GetFixtureList(); s != null; s = s.GetNext()) {
            this.drawShape(s, c);
        }
    }        
    
    for (var j = this._world.m_jointList; j; j = j.m_next) {
      this.drawJoint(j, c);
    }            
}

Danglies.prototype.drawShape = function(s, c) {
  c.strokeStyle = '#0055ee';
  c.beginPath();  
  switch(s.m_shape.m_type){
    case 1:           // icon
      break;
  }
  c.closePath();
  c.stroke();
}

Danglies.prototype.drawJoint = function(j,c) {
    var b1 = j.m_bodyA;
    var b2 = j.m_bodyB;
    var x1 = b1.GetPosition();
    var x2 = b2.GetPosition();
//    var p1 = j.localAnchor1.GetPosition();
//    var p2 = j.localAnchor2.GetPosition();
    c.strokeStyle = '#0055ee';
    c.beginPath();
    c.moveTo(x1.x*30, -x1.y*30);
    c.lineTo(x2.x*30, -x2.y*30);
    c.closePath();
    c.stroke();  
}

window.danglies = Danglies;
    
})();