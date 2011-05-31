var EPC = (function () {
  var canvasWidth = jQuery(window).width();
  var canvasHeight = jQuery(window).width();
  var world;
  var context;
  var z0_speed = 350000;
  var z1_speed = 450000;
  var z2_speed = 800000;
  
  var animateCloud = function(img, layer) {
    jQuery(img).animate({
      left: "+=" + canvasWidth
    }, layer);    
  }
  
  var oscilate = function(x, vel) {
    jQuery(x).animate({      
      top: "-=" + vel + "px"
    }, 1000, 'linear', function() {
      oscilate(x, -vel);
    })
  }
  
  var b2d = (function() {
    var m_world;
    var m_shapeHalfBB = 35;
    var m_groundBody;
    var m_ceilingBody;
    var m_linkedInIcon = null;
    var currShape = null;    
    
    return {
      createWorld : function() {
        var worldAABB = new b2AABB();
        worldAABB.minVertex.Set(-1000, -1000);
        worldAABB.maxVertex.Set(1000, 1000);
        var gravity = new b2Vec2(0, 300);
        var doSleep = true;
        var canvasElm = jQuery('canvas').get(0);
        m_context = canvasElm.getContext('2d');      
        context = m_context;
        m_world = new b2World(worldAABB, gravity, doSleep);
        world = m_world;
        m_groundBody = this.createGround();
        m_ceilingBody = this.createCeiling();
      //	createBox(world, 0, 125, 10, 250);
      //	createBox(world, 500, 125, 10, 250);
      },

      createGround : function() {
        var groundSd = new b2BoxDef();      
        groundSd.extents.Set(512, 10);
        groundSd.restitution = 0.2;
        var groundBd = new b2BodyDef();
        groundBd.AddShape(groundSd);     
        groundBd.position.Set(512, 900);      
        return m_world.CreateBody(groundBd)
      },
      
      createCeiling : function() {
        var groundSd = new b2BoxDef();      
        groundSd.extents.Set(512, 10);
        groundSd.restitution = 0.2;
        groundSd.density=0;
        groundSd.friction=0.5;
        var groundBd = new b2BodyDef();
        groundBd.AddShape(groundSd);     
        groundBd.position.Set(512, 0);      
        return m_world.CreateBody(groundBd)
      },

      createBall : function(x, y, radius) {
        if (typeof(radius) == 'undefined') radius = 20;
        var ballSd = new b2CircleDef();
        ballSd.density = 1.0;
        ballSd.radius = radius;
        ballSd.restitution = 0.7;
        ballSd.friction = 0;
        var ballBd = new b2BodyDef();
        ballBd.AddShape(ballSd);
        ballBd.position.Set(x,y);      
        return m_world.CreateBody(ballBd);
      },

      createBox : function(x, y, width, height, fixed) {
        if (typeof(fixed) == 'undefined') fixed = true;
        var boxSd = new b2BoxDef();
        if (!fixed) boxSd.density = 1.0;
        boxSd.extents.Set(width, height);
        var boxBd = new b2BodyDef();
        boxBd.AddShape(boxSd);
        boxBd.position.Set(x,y);
        return m_world.CreateBody(boxBd)
      },

      createAnchor : function(x, y) {
        var fixed = true;
        var anchorBd = new b2BodyDef();
        anchorBd.position.Set(x,y);
        return m_world.CreateBody(anchorBd)
      },

      drawWorld : function() {
        for (var j = m_world.m_jointList; j; j = j.m_next) {
          this.drawJoint(j);
        }
        for (var b = m_world.m_bodyList; b; b = b.m_next) {
          for (var s = b.GetShapeList(); s != null; s = s.GetNext()) {
            this.drawShape(s);
          }
        }
      },

      clearShapes : function() {
        for (var b = m_world.m_bodyList; b; b = b.m_next) {
          for (var s = b.GetShapeList(); s != null; s = s.GetNext()) {
            m_context.clearRect(s.m_position.x-m_shapeHalfBB,s.m_position.y-m_shapeHalfBB,s.m_position.x+m_shapeHalfBB, s.m_position.y+m_shapeHalfBB);
          }
        }      
        m_context.clearRect(0,890, 1024,910);
      },

      drawJoint : function(joint) {
        var b1 = joint.m_body1;
        var b2 = joint.m_body2;
        var x1 = b1.m_position;
        var x2 = b2.m_position;
        var p1 = joint.GetAnchor1();
        var p2 = joint.GetAnchor2();
        m_context.strokeStyle = '#000000';
        m_context.beginPath();
        switch (joint.m_type) {
        case b2Joint.e_distanceJoint:
          m_context.moveTo(p1.x, p1.y);
          m_context.lineTo(p2.x, p2.y);
          break;

        case b2Joint.e_pulleyJoint:
          // TODO
          break;

        default:
          if (b1 == world.m_groundBody) {
            m_context.moveTo(p1.x, p1.y);
            m_context.lineTo(x2.x, x2.y);
          }
          else if (b2 == world.m_groundBody) {
            m_context.moveTo(p1.x, p1.y);
            m_context.lineTo(x1.x, x1.y);
          }
          else {
            m_context.moveTo(x1.x, x1.y);
            m_context.lineTo(p1.x, p1.y);
            m_context.lineTo(x2.x, x2.y);
            m_context.lineTo(p2.x, p2.y);
          }
          break;
        }
        m_context.stroke();
      },

      drawShape : function(shape) {
        m_context.strokeStyle = '#000000';
        m_context.beginPath();
        switch (shape.m_type) {
        case b2Shape.e_circleShape:
          {
            var circle = shape;
            var pos = circle.m_position;
            var r = circle.m_radius;
            var segments = 16.0;
            var theta = 0.0;
            var dtheta = 2.0 * Math.PI / segments;
            // draw circle
            m_context.moveTo(pos.x + r, pos.y);
            for (var i = 0; i < segments; i++) {
              var d = new b2Vec2(r * Math.cos(theta), r * Math.sin(theta));
              var v = b2Math.AddVV(pos, d);
              m_context.lineTo(v.x, v.y);
              theta += dtheta;
            }
            m_context.lineTo(pos.x + r, pos.y);
            // draw radius
            m_context.moveTo(pos.x, pos.y);
            //var ax = circle.m_R.col1;
            //var pos2 = new b2Vec2(pos.x + r * ax.x, pos.y + r * ax.y);
            //context.lineTo(pos2.x, pos2.y);
          }
          break;
        case b2Shape.e_polyShape:
          {
            var poly = shape;
            var tV = b2Math.AddVV(poly.m_position, b2Math.b2MulMV(poly.m_R, poly.m_vertices[0]));
            m_context.moveTo(tV.x, tV.y);
            for (var j = 0; j < poly.m_vertexCount; j++) {
              var w = b2Math.AddVV(poly.m_position, b2Math.b2MulMV(poly.m_R, poly.m_vertices[j]));
              m_context.lineTo(w.x, w.y);
            }
            m_context.lineTo(tV.x, tV.y);
          }
          break;
        }
        m_context.stroke();
      },
      createRope : function(length, left) {
        var link = m_ceilingBody;
        var revolute_joint = new b2RevoluteJointDef();
        for (i=1; i<=10; i+=1) {
          // rope segment
          bodyDef = new b2BodyDef();
          bodyDef.position.x=left;
          bodyDef.position.y=i;
          boxDef = new b2BoxDef();
          boxDef.extents.Set(1, 1);
          boxDef.density=100;
          boxDef.friction=0.5;
          boxDef.restitution=0.2;
          bodyDef.AddShape(boxDef)
          body=m_world.CreateBody(bodyDef);
          // joint
          revolute_joint.body1 = link;
          revolute_joint.body2 = body;
          revolute_joint.anchorPoint.Set(left, i-1);
          m_world.CreateJoint(revolute_joint);
          // saving the reference of the last placed link
          link=body;
        }        
        return link;
      },
      
      createLinkedInIcon : function() {      
//        var boxSd = new b2BoxDef();
        length = 40;
        left = 100;
//        boxSd.density = 1.0;
//        boxSd.extents.Set(30, 30);
//        var boxBd = new b2BodyDef();
//        boxBd.AddShape(boxSd);
//        boxBd.position.Set(left,length);
//       var box = b2d.createBox(100,100,10,10,false);
        //var rope1 = this.createRope(length, left);
//        m_linkedInIcon = m_world.CreateBody(boxBd);
//        var revolute_joint = new b2RevoluteJointDef();
//        revolute_joint.body1 = m_ceilingBody;
//        revolute_joint.body2 = box;
//        revolute_joint.anchorPoint.Set(left, length+100);
//        m_world.CreateJoint(revolute_joint);
//        
        var i;
        var left = 100;
        var top = 20;
        var delta = 40;
        var anchor = b2d.createAnchor(left,top);
        for(var i=0; i<4; i++) {
          jointDef = new b2RevoluteJointDef();        
          jointDef.anchorPoint.Set(left, top+i*delta);
          jointDef.body1 = anchor;          
          jointDef.body2 = b2d.createBall(left, top+i*delta, 10);
          m_world.CreateJoint(jointDef);
          anchor = jointDef.body2;
        }
        jointDef = new b2RevoluteJointDef();        
        jointDef.anchorPoint.Set(left, top+4*delta);
        jointDef.body1 = anchor;          
        jointDef.body2 = b2d.createBall(left-40, top+4*delta);
        m_world.CreateJoint(jointDef);
        
        

      }
    }
  })();
  
  return  {
    step : function(cnt) {
      var stepping = false;      
      var timeStep = 1.0/60;
      var iteration = 1;
      //      console.log(currShape);
      //      b2d.clearShapes(world, ctx);
      world.Step(timeStep, iteration);
      context.clearRect(0, 0, canvasWidth, canvasHeight);
      b2d.drawWorld();
      setTimeout('EPC.step(' + (cnt || 0) + ')', 10);    
    },
    
    initLinkClouds : function() {
      footer_height = jQuery("#footer").css("height");
      footer_height = footer_height.split("px")
      //jQuery("#content").css("height", (canvasHeight - footer_height[0]) + "px");

      //****** set canvas dimensions
      jQuery("#content").css("height", "900px");
      
      //****** bind cloud hover animations
      jQuery("img.cloudlink").hover(function() {        
        jQuery(this).siblings("img.cloudicon").animate({top: "-100px"}, {queue: false, duration: 100, easing: "linear"});
        }, function() {
          jQuery(this).siblings("img.cloudicon").animate({top: "-60px"}, {queue: false, duration: 450, easing: "easeOutBounce"});
        }
      ).click(function() {
          jQuery(this).siblings("img.cloudicon").animate({
            height: 20,
            width: 80,
            top: -40
          }, 500, "easeOutCubic", function() {
            jQuery(this).animate({
              height: 200,
              width: 10              
            },{
              duration: 50,
              queue: false              
            }).animate({top: -1000}, 300, function() {jQuery(this).hide()});
          })
      });
    },
    
    initBgClouds : function() {
      jQuery("body").append("<img id='cloud1' src='images/canvas/cloud_370x147.png' alt='' />");
      jQuery("body").append("<img id='cloud2' src='images/canvas/cloud_500x200.png' alt='' />");      
      jQuery("body").append("<img id='cloud3' src='images/canvas/cloud_410x272.png' alt='' />");      
      jQuery("img[id*='cloud']").each(function() {
        jQuery(this).css({
        left: Math.random() * jQuery(window).width(),
        top: Math.random() * jQuery(window).height()
        });
        
//        jQuery(this).hover(function() {
//          jQuery(this).css("border", "1px dashed red");
//        }, function() {
//          jQuery(this).css("border", "none");
//        });
      });
      animateCloud("#cloud1", Math.random() * (z2_speed-z0_speed) + z0_speed);
      animateCloud("#cloud2", Math.random() * (z2_speed-z0_speed) + z0_speed);
      animateCloud("#cloud3", Math.random() * (z2_speed-z0_speed) + z0_speed);
    },
    
    initPhysics : function() {	    
      
    },
    
    initCanvas : function() {
      b2d.createWorld();      
      b2d.createLinkedInIcon();
      Event.observe('canvas', 'click', function(e) {
        if (Math.random() < 0.5) {
          b2d.createBall(Event.pointerX(e) - document.getElementById("canvas").offsetLeft, Event.pointerY(e));          
        }
        else {
          b2d.createBox(Event.pointerX(e) - document.getElementById("canvas").offsetLeft, Event.pointerY(e), 10, 10, false);          
        }
      });      
      this.step();
    },

    initBird : function() {
      jQuery('#bird').sprite({fps: 8, no_of_frames: 3, rewind:true})
      .spRandom({
          top: 70,
          left: 100,
          right: 800,
          bottom: 640,
          speed: 4000,
          pause: 3000
      }).isDraggable();
    }
  };
})();

jQuery(document).ready(function() {
  EPC.initLinkClouds();
  EPC.initBgClouds();
  EPC.initBird();
  EPC.initCanvas();
   
});
