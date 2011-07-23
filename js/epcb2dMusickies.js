(function(){

var Musickies = function() {
    this.__constructor(arguments);
}

Musickies.__constructor = function(canvas) {
    var that = this;
    this._canvas = canvas;
    this._paused = true;
    this._fps = 200;
    this._lastClick = 0;
    this._mouseClicked = false;
    this._dbgDraw = new b2MusickyDebugDraw();
    this._tree = null;
    
    this._handleMouseMove = function(e){
        var o = that._canvas;
        var x = o.offsetLeft - document.documentElement.scrollLeft,
            y = o.offsetTop - document.documentElement.scrollTop;

        while (o = o.offsetParent) {
            x += o.offsetLeft - o.scrollLeft;
            y += o.offsetTop - o.scrollTop;
        }

        var p = new b2Vec2(e.clientX - x, e.clientY - y);

        that._mousePoint = that._dbgDraw.ToWorldPoint(p);
    };
    
    this._handleMouseDown = function(e){
        that._mouseDown = true;
        that._mouseClicked = false;
        that._lastClick = new Date().getTime();
    };
    this._handleMouseUp = function(e) {
        that._mouseDown = false;
        var time = new Date().getTime();
        delta = (time - that._lastClick) / 1000;
        console.log("delta=" + delta);
        if(delta < 0.25) {
            that._mouseClicked = true;
            console.log("mouseClicked=" + that._mouseClicked);
        }
    };
    canvas.addEventListener("mousemove", this._handleMouseMove, true);
    canvas.addEventListener("mousedown", this._handleMouseDown, true);
    canvas.addEventListener("mouseup", this._handleMouseUp, true);
    
    this._velocityIterationsPerSecond = 300;
    this._positionIterationsPerSecond = 200;
    
    this._dbgDraw.m_drawScale = Math.min(canvas.width/64, canvas.height/36);
    this._dbgDraw.SetFlags(b2MusickyDebugDraw.e_shapeBit | b2MusickyDebugDraw.e_jointBit);
    this._world = this.createWorld();
}

Musickies.prototype.log = function(arg) {
    if(typeof(window.console) != 'undefined') {
        console.log(arg);
    }
};

Musickies.prototype.destroy = function() {
    this.pause();
    
    canvas.removeEventListener("mousemove", this._handleMouseMove, true);
    canvas.removeEventListener("mousedown", this._handleMouseDown, true);
    canvas.removeEventListener("mouseup", this._handleMouseUp, true);
    this._canvas = null;
    this._dbgDraw = null;
    this._world = null;
}

Musickies.prototype.createWorld = function(){
    var m_world = new b2World(new b2Vec2(0.0, -9.0), true);
    m_world.SetWarmStarting(true);
    
    this._tree = new Image();
    this._tree.src = "images/canvas/tree.png";
    
    // Create border of boxes
    var wall = new b2PolygonShape();
    var wallBd = new b2BodyDef();
    
    // Left
    wallBd.position.Set( -27.0, 18);
    wall.SetAsBox(10, 40);
    this._wallLeft = m_world.CreateBody(wallBd);
    this._wallLeft.CreateFixture2(wall);
    // Right
    wallBd.position.Set(99.0, 18);
    this._wallRight = m_world.CreateBody(wallBd);
    this._wallRight.CreateFixture2(wall);
    // Top
    wallBd.position.Set(70, 48.5);
    wall.SetAsBox(64, 10);
    this._wallTop = m_world.CreateBody(wallBd);
    this._wallTop.CreateFixture2(wall); 
    // Bottom
    wallBd.position.Set(32, -18.0);
    this._wallBottom = m_world.CreateBody(wallBd);
    this._wallBottom.CreateFixture2(wall); 
    return m_world;
    
    
};

Musickies.prototype.createBall = function(world, x, y, radius, fric, rest, dens) {
    radius = radius || 2;
    fric = fric || 0.4;
    rest = rest || 0.6;
    dens = dens || 1.0;
    
    var fixtureDef = new b2FixtureDef();
    fixtureDef.shape = new b2CircleShape(radius);
    fixtureDef.friction = fric;
    fixtureDef.restitution = rest;
    fixtureDef.density = dens;
    var ballBd = new b2BodyDef();
    ballBd.type = b2Body.b2_dynamicBody;
    ballBd.position.Set(x,y);
    var body = world.CreateBody(ballBd);
    body.CreateFixture(fixtureDef);
    return body;
}

Musickies.prototype.step = function(delta) {
    if(!this._world)
        return;
        
    this._world.ClearForces();
    
    var delta = (typeof delta == "undefined") ? 1/this._fps : delta;
    
    this._world.Step(delta, delta * this._velocityIterationsPerSecond, delta * this._positionIterationsPerSecond);  
}

Musickies.prototype._updateMouseInteraction = function() {
    function getBodyAtPoint(world, p) {
        var aabb = new b2AABB();
        aabb.lowerBound.Set(p.x - 0.001, p.y - 0.001);
        aabb.upperBound.Set(p.x + 0.001, p.y + 0.001);

        var selectedBody = null;
        world.QueryAABB(function(fixture){
            if(fixture.GetBody().GetType() != b2Body.b2_staticBody) {
                if(fixture.GetShape().TestPoint(fixture.GetBody().GetTransform(), p)) {
                    selectedBody = fixture.GetBody();
                    return false;
                }
            }
            return true;
            }, aabb);
            return selectedBody;
    }

    if(!this._mousePoint)
        return;

    if(this._mouseDown && (!this._mouseJoint)) {
        var body = getBodyAtPoint(this._world, this._mousePoint);
        if(body) {
            var md = new b2MouseJointDef();
            md.bodyA = this._world.GetGroundBody();
            md.bodyB = body;
            md.target = this._mousePoint;
            md.collideConnected = true;
            md.maxForce = 300.0 * body.GetMass();
            this._mouseJoint = this._world.CreateJoint(md);
            this._mouseJoint.m_userData = "mj";
            body.SetAwake(true);
        }
    }
    
    if(!this._mouseDown && (this._mouseClicked)) {
      this._mouseClicked = false;
      body = getBodyAtPoint(this._world, this._mousePoint);
      if(body) {
        switch(body.m_userData) {
          case "satAnchor":
            break;
            
          default:
            jQuery("." + body.m_userData).click();
        }
      }
    }

    if(this._mouseJoint) {
        if(this._mouseDown) {
            this._mouseJoint.SetTarget(this._mousePoint);
        } else {
            this._world.DestroyJoint(this._mouseJoint);
            this._mouseJoint = undefined;
        }
    }   
}

Musickies.prototype._updateKeyboardInteraction = function() {
    // TBD
}

Musickies.prototype._updateUserInteraction = function() {
    this._updateMouseInteraction();
    this._updateKeyboardInteraction();
    
    if(!this._paused) {
        var that = this;
        this._updateUserInteractionTimout = window.setTimeout(function(){that._updateUserInteraction()}, 1000/20);
    }
}

Musickies.prototype._update = function() {
    var time = new Date().getTime();
    delta = (time - this._lastUpdate) / 1000;
    this._lastUpdate = time;
    if(delta > 10)
        delta = 1/this._fps;
        
    // see this._updateFPS
    this._fpsCounter++;
    
    this.step(delta);
    this.draw();
    if(!this._paused) {
        var that = this;
        this._updateTimeout = window.setTimeout(function(){that._update()});
    }
}

Musickies.prototype._updateFPS = function() {
    this._fpsAchieved = this._fpsCounter;
    this._fpsCounter = 0;
    
    if(!this._paused) {
        var that = this;
        this._updateFPSTimeout = window.setTimeout(function(){that._updateFPS()}, 1000);
    }
}

Musickies.prototype.resume = function() {
    if(this._paused) {
        this._paused = false;
        this._lastUpdate = 0;
        this._update();
        this._updateFPS();
        this._updateUserInteraction();
    }
}

Musickies.prototype.pause = function() {
    this._paused = true;
    
    window.clearTimeout(this._updateTimeout);
    window.clearTimeout(this._updateFPSTimeout);
    window.clearTimeout(this._updateUserInteractionTimout);
}

Musickies.prototype.isPaused = function() {
    return this._paused;
}

b2MusickyDebugDraw.prototype.DrawSolidPolygon=function(vertices,numVertices,c, body) {
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
//  this.m_sprite.closePath();

  var rotationStyle = 'rotate(' + (-body.m_xf.GetAngle() * 57.2957795) + 'deg)';
  var sprite = jQuery("#" + body.m_userData);
  jQuery(sprite)
    .css("position", "absolute")
    .css("-moz-transform", rotationStyle)
    .css("-webkit-transform", rotationStyle)
    .css("transform", rotationStyle)
    .css("left", (body.m_xf.position.x*this.m_drawScale)- (this.m_drawScale)- 405  + "px")
    .css("top",  this.Y(body.m_xf.position.y*this.m_drawScale) - (1150 - document.getElementById("footer").offsetHeight) + ((145/148)*jQuery(window).height()+(-38520/37)) + "px");

      
  if(jQuery(sprite).css("top") > jQuery(window).height()) {
    jQuery(sprite).hide();
  } else {
    jQuery(sprite).show();
  }  
  
}

b2MusickyDebugDraw.prototype.DrawSegment=function(a,b,c, mouseDown){
  mouseDown = mouseDown || false;
  this.m_sprite.lineWidth=4;
  this.m_sprite.strokeStyle='#1F1F1F';
  this.m_sprite.beginPath();
  this.m_sprite.moveTo(a.x*this.m_drawScale,this.Y(a.y*this.m_drawScale) + -(640 - document.getElementById("footer").offsetHeight));
  this.m_sprite.lineTo(b.x*this.m_drawScale,this.Y(b.y*this.m_drawScale) + -(640 - document.getElementById("footer").offsetHeight));
  this.m_sprite.stroke();
  this.m_sprite.closePath()
};

b2MusickyDebugDraw.prototype.DrawSolidCircle=function(a,b,c,d) {
  return;
}

window.b2jsMusickies = Musickies;
    
})();