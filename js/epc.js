var EPC = (function () {
  var canvasWidth = jQuery(window).width();
  var z0_speed = 350000;
  var z1_speed = 450000;
  var z2_speed = 800000;
  var bgPosOffset = 0;
  
  var animateCloud = function(img, layer) {
    jQuery(img).animate({
      left: "+=" + canvasWidth,
      top: "+=" + bgPosOffset
    },{
      duration: layer
    });    
  }
  
  var oscilate = function(x, vel) {
    jQuery(x).animate({      
      top: "-=" + vel + "px"
    }, 1000, 'linear', function() {
      oscilate(x, -vel);
    })
  }
  
  return  {    
    initBgClouds : function() {
      jQuery("body").append("<img id='cloud1' src='images/canvas/cloud_370x147.png' alt='' />");
      jQuery("body").append("<img id='cloud2' src='images/canvas/cloud_500x200.png' alt='' />");      
      jQuery("body").append("<img id='cloud3' src='images/canvas/cloud_410x272.png' alt='' />");      
      jQuery("img[id*='cloud']").each(function() {
        jQuery(this).css({
        left: Math.random() * jQuery(window).width(),
        top: Math.random() * jQuery(window).height()
        });        
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
    },
    
    initMusicStuff : function() {
      jQuery("#flash").html("Coming Soon").fadeIn("slow", function() {        
        jQuery("#flash").fadeOut("slow");
      });
    },
    
    setBgOffset : function(pos) {
      bgPosOffset = pos;
    },
    
    getBgOffset : function() {
      return bgPosOffset;
    },
    
    initWorkStuff : function() {
//      jQuery("#flash").html("Coming Soon").fadeIn("slow", function() {        
//        jQuery("#flash").fadeOut("slow");
//      });
      jQuery("#content").animate({
        backgroundPosition: "(0 0)"
      }, {
        duration: 6000,
        easing: "easeInOutExpo"
      });
      jQuery("body").animate({
        backgroundPosition: "(0 0)"
      }, {
        duration: 6000,
        easing: "easeInOutExpo"
      });      
    }   
    
  };
})();

jQuery(document).ready(function() {
  EPC.initBgClouds();
//  EPC.initBird();

var runner = new danglies(jQuery("#canvas")[0]);
runner.draw();	
runner.resume();
	
});
