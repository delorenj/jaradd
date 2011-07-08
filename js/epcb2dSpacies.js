(function(){

var Spacies = function() {
    this.__constructor(arguments);
}

Spacies.__constructor = function(canvas) {
    var that = this;
    this._canvas = canvas;
    this._paused = true;
    this._fps = 200;
    this._lastClick = 0;
    this._mouseClicked = false;
    this._dbgDraw = new b2SpaceyDebugDraw();
    this.satbounds = 60;
    this.satdir = 1;
    
    this._handleMouseMove = function(e){
        // adapted from cocos2d-js/Director.js
        var o = that._canvas;
        var x = o.offsetLeft - document.documentElement.scrollLeft,
            y = o.offsetTop - document.documentElement.scrollTop;

        while (o = o.offsetParent) {
            x += o.offsetLeft - o.scrollLeft;
            y += o.offsetTop - o.scrollTop;
        }

        var p = new b2Vec2(e.clientX - x, e.clientY - y);

        that._mousePoint = that._dbgDraw.ToWorldPoint(p);
//        console.log("MOUSE MOVE: " + p.x + "," + p.y + "(" + that._mousePoint.x + "," + that._mousePoint.y + ")");
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
    // see _updateUserInteraction
    canvas.addEventListener("mousemove", this._handleMouseMove, true);
    canvas.addEventListener("mousedown", this._handleMouseDown, true);
    canvas.addEventListener("mouseup", this._handleMouseUp, true);
    
    this._velocityIterationsPerSecond = 300;
    this._positionIterationsPerSecond = 200;
    
    // sublcasses expect visual area inside 64x36
    this._dbgDraw.m_drawScale = Math.min(canvas.width/64, canvas.height/36);
    this._dbgDraw.SetFlags(b2SpaceyDebugDraw.e_shapeBit | b2SpaceyDebugDraw.e_jointBit);
    this._world = this.createWorld();
}

Spacies.prototype.log = function(arg) {
    if(typeof(window.console) != 'undefined') {
        console.log(arg);
    }
};

Spacies.prototype.destroy = function() {
    this.pause();
    
    canvas.removeEventListener("mousemove", this._handleMouseMove, true);
    canvas.removeEventListener("mousedown", this._handleMouseDown, true);
    canvas.removeEventListener("mouseup", this._handleMouseUp, true);
    this._canvas = null;
    this._dbgDraw = null;
    this._world = null;
}

Spacies.prototype.createWorld = function(){
    var m_world = new b2World(new b2Vec2(0.0, -9.81), true);
    var m_physScale = 1;
    m_world.SetWarmStarting(true);
    return m_world;
};

Spacies.prototype.createBall = function(world, x, y, radius, fric, rest, dens) {
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

Spacies.prototype.draw = function() {
    var c = this._canvas.getContext("2d");
    
    this._dbgDraw.SetSprite(c);
    if(this._world) {
        this._world.SetDebugDraw(this._dbgDraw);
        this._world.DrawDebugData();
    }
    
    c.fillStyle = "black";
    if(this._paused) {
        c.fillText("paused", 5, 15);
    } else {
        c.fillText("FPS: " + this._fpsAchieved, 5, 15);
    }
}

Spacies.prototype.step = function(delta) {
    if(!this._world)
        return;
        
    this._world.ClearForces();
//    this.twitterAnchor.ApplyForce(new b2Vec2(1000,0), this.twitterAnchor.GetPosition());
    var pos = this.twitterAnchor.GetPosition();
    if(this.satdir > 0) {
      if(pos.x > this.satbounds) {
        this.satdir *= -1;
        this.satbounds = 0;
      }
    } else {
      if(pos.x < this.satbounds) {
        this.satdir *= -1;
        this.satbounds = 600;
      }
    }
    this.twitterAnchor.SetPosition(new b2Vec2(pos.x+0.1 * this.satdir, pos.y));
    
    jQuery("#sat")
      .css("position", "absolute")
      .css("left", (pos.x*this._dbgDraw.m_drawScale)- (this._dbgDraw.m_drawScale)-150  + "px")
      .css("top",  pos.y*this._dbgDraw.m_drawScale-575 + EPC.getBgOffset() - 7615 + "px");
    
    var delta = (typeof delta == "undefined") ? 1/this._fps : delta;
    
    this._world.Step(delta, delta * this._velocityIterationsPerSecond, delta * this._positionIterationsPerSecond);  
}

Spacies.prototype._updateMouseInteraction = function() {
    // todo: refactor into world helper or similar
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

Spacies.prototype._updateKeyboardInteraction = function() {
    // TBD
}

Spacies.prototype._updateUserInteraction = function() {
    this._updateMouseInteraction();
    this._updateKeyboardInteraction();
    
    if(!this._paused) {
        var that = this;
        this._updateUserInteractionTimout = window.setTimeout(function(){that._updateUserInteraction()}, 1000/20);
    }
}

Spacies.prototype._update = function() {
    // derive passed time since last update. max. 10 secs
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

Spacies.prototype._updateFPS = function() {
    this._fpsAchieved = this._fpsCounter;
    this._fpsCounter = 0;
    
    if(!this._paused) {
        var that = this;
        this._updateFPSTimeout = window.setTimeout(function(){that._updateFPS()}, 1000);
    }
}

Spacies.prototype.resume = function() {
    if(this._paused) {
        this._paused = false;
        this._lastUpdate = 0;
        this._update();
        this._updateFPS();
        this._updateUserInteraction();
    }
}

Spacies.prototype.pause = function() {
    this._paused = true;
    
    window.clearTimeout(this._updateTimeout);
    window.clearTimeout(this._updateFPSTimeout);
    window.clearTimeout(this._updateUserInteractionTimout);
}

Spacies.prototype.isPaused = function() {
    return this._paused;
}

b2SpaceyDebugDraw.prototype.DrawSolidPolygon=function(vertices,numVertices,c, body) {
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
    .css("left", (body.m_xf.position.x*this.m_drawScale)- (this.m_drawScale)-20  + "px")
    .css("top",  this.Y(body.m_xf.position.y*this.m_drawScale)-575 + EPC.getBgOffset() - 7250 + "px");

      
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

b2SpaceyDebugDraw.prototype.DrawSegment=function(a,b,c, mouseDown){
  mouseDown = mouseDown || false;
  if(mouseDown) console.log("Segment Y: " + this.Y(a.y*this.m_drawScale) + EPC.getBgOffset());
  this.m_sprite.lineWidth=this.m_lineThickness;
  this.m_sprite.strokeSyle=this.ColorStyle(new b2Color(255,255,255),this.m_alpha);
  this.m_sprite.beginPath();
  this.m_sprite.moveTo(a.x*this.m_drawScale,this.Y(a.y*this.m_drawScale) + EPC.getBgOffset());
  this.m_sprite.lineTo(b.x*this.m_drawScale,this.Y(b.y*this.m_drawScale) + EPC.getBgOffset());
  this.m_sprite.stroke();
  this.m_sprite.closePath()
};

//b2SpaceyDebugDraw.prototype.DrawSolidCircle=function(a,b,c,d) {
//  return;
//}

window.b2jsSpacies = Spacies;
    
})();