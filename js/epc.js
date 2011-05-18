var EPC = (function () {
  var canvasWidth = $(window).width();
  var z0_speed = 350000;
  var z1_speed = 450000;
  var z2_speed = 800000;
  
  var animateCloud = function(img, layer) {
    $(img).animate({
      left: "+=" + canvasWidth
    }, layer);    
  }
  
  var oscilate = function(x, vel) {
    $(x).animate({      
      top: "-=" + vel + "px"
    }, 1000, 'linear', function() {
      oscilate(x, -vel);
    })
  }
  
  return  {
    initLinkClouds : function() {
      footer_height = $("#footer").css("height");
      footer_height = footer_height.split("px")
      //$("#content").css("height", (canvasHeight - footer_height[0]) + "px");

      //****** set canvas dimensions
      $("#content").css("height", "900px");
      
      //****** bind cloud hover animations
      $("img.cloudlink").hover(function() {        
        $(this).siblings("img.cloudicon").animate({top: "-100px"}, {queue: false, duration: 400, easing: "easeOutExpo"});
        }, function() {
          $(this).siblings("img.cloudicon").animate({top: "-60px"}, {queue: false, duration: 400, easing: "easeOutBounce"});
        }
      ).click(function() {
          $(this).siblings("img.cloudicon").animate({
            height: 20,
            width: 80,
            top: -40
          }, 500, "easeOutCubic", function() {
            $(this).animate({
              height: 200,
              width: 10              
            },{
              duration: 50,
              queue: false              
            }).animate({top: -1000}, 300, function() {$(this).hide()});
          })
      });
    },
    
    initBgClouds : function() {
      $("body").append("<img id='cloud1' src='images/canvas/cloud_370x147.png' alt='' />");
      $("body").append("<img id='cloud2' src='images/canvas/cloud_500x200.png' alt='' />");      
      $("body").append("<img id='cloud3' src='images/canvas/cloud_410x272.png' alt='' />");      
      $("img[id*='cloud']").each(function() {
        $(this).css({
        left: Math.random() * $(window).width(),
        top: Math.random() * $(window).height()
        });
        
        $(this).hover(function() {
          $(this).css("border", "1px dashed red");
        }, function() {
          $(this).css("border", "none");
        });
      });
      animateCloud("#cloud1", Math.random() * (z2_speed-z0_speed) + z0_speed);
      animateCloud("#cloud2", Math.random() * (z2_speed-z0_speed) + z0_speed);
      animateCloud("#cloud3", Math.random() * (z2_speed-z0_speed) + z0_speed);
    },
    
    initPhysics : function() {
      var worldAABB = new b2AABB();
      worldAABB.minVertex.Set(-1000, -1000);
      worldAABB.maxVertex.Set(1000, 1000);
      var gravity = new b2Vec2(0, 300);
      var doSleep = true;
      var world = new b2World(worldAABB, gravity, doSleep); 
      
      var i;
      var ground = world.GetGroundBody();
      var jointDef = new b2RevoluteJointDef();
      var L = 150;
      for (i = 0; i < 4; i++) {
        jointDef.anchorPoint.Set(250 + 40 * i, 200 - L);
        jointDef.body1 = ground;
        jointDef.body2 = createBall(world, 250 + 40 * i, 200);
        world.CreateJoint(jointDef);
      }
      jointDef.anchorPoint.Set(250 - 40, 200 - L);
      jointDef.body1 = ground;
      jointDef.body2 = createBall(world, 250 - 40 - L, 200 - L);
      world.CreateJoint(jointDef);

    }
  };
})();

$(document).ready(function() {
  EPC.initLinkClouds();
  EPC.initBgClouds();
  EPC.initPhysics();
   
});
