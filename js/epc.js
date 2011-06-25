var EPC = (function () {
  var canvasWidth = jQuery(window).width();
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
  
  return  {
    initLinkClouds : function() {
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
//  EPC.initBird();
  //EPC.initCanvas();

var runner = new danglies(jQuery("#canvas")[0]);
runner.draw();	
runner.resume();
	
});
