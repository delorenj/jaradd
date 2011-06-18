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
    
    return world;
};

window.danglies = Danglies;
    
})();