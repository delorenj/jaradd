var EPC = (function () {
  var windowWidth = jQuery(window).width();
  var windowHeight = jQuery(window).height();
  var z0_speed = 350000;
  var z1_speed = 450000;
  var z2_speed = 800000;
  var bgPosOffset = 0;
  var runner = null;
  var homerunner = null
  var workrunner = null
  var footerShowing = false;
  var bgTriggerOffset = -7000;
  
  var animateCloud = function(img, layer) {
    jQuery(img).animate({
      left: "+=" + windowWidth
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
      jQuery("#wrapper").append("<img id='cloud1' src='images/canvas/cloud_370x147.png' alt='' />");
      jQuery("#wrapper").append("<img id='cloud2' src='images/canvas/cloud_500x200.png' alt='' />");      
      jQuery("#wrapper").append("<img id='cloud3' src='images/canvas/cloud_410x272.png' alt='' />");      
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
        
    isFooterOn : function() {
      return footerShowing;
    },
    
    setFooterOn : function() {
      footerShowing = true;
    },

    setFooterOff : function() {
      footerShowing = false;
    },

    hideFooter : function() {
      console.log("hide footer");
      jQuery("#footer").animate({
        marginTop: "+=251px"
      }, {
        duration: 1000,
        step: function(a,b) {
          console.log(a + " : " + b);
        }
      });
    },
         
    initMusicStuff : function() {
      setTimeout(function() {
        jQuery("#homecanvas").hide();
        jQuery("#musiccanvas").show();
        jQuery(".musicsprite").show();
      }, 3000);
      
      jQuery("#content").animate({
        backgroundPosition: "(0 -15255)"
      }, {
        duration: 6000,
        easing: "easeInOutExpo",
        complete: function() {
          homerunner.pause();
          //jQuery("#flash").html("Coming Soon").fadeIn("slow");
          jQuery("#homecanvas").hide();
          EPC.DT.initCanvas();
        }
      });
      
      jQuery("body").animate({
        backgroundPosition: "(0 -15255)"
      }, {
        duration: 6000,
        easing: "easeInOutExpo"
      });      
    },
    
    setBgOffset : function(pos) {
      bgPosOffset = pos + 7255;
//      console.log("new offset: " + bgPosOffset);
    },
    
    getBgOffset : function() {
      return bgPosOffset;
    },
    
    getBgTriggerOffset : function() {
      return bgTriggerOffset;
    },
    
    setRunner : function(r) {
      runner = r;
    },
    
    startHomeCanvas : function() {
      console.log("Window height: " + jQuery(document).height());
      jQuery("#workcanvas").hide();
      jQuery("#musiccanvas").attr("width", jQuery(document).width())
        .attr("height", jQuery(document).height())
        .hide();        
      jQuery("#footer").css("top", (jQuery(window).height()));
      homerunner = new danglies(jQuery("#homecanvas")[0]);            
      workrunner = new spacies(jQuery("#workcanvas")[0]);
      
      homerunner.draw();	
      homerunner.resume();
    },
    
    initWorkStuff : function() {
      setTimeout(function() {
        jQuery("#workcanvas").show();
        jQuery("#homecanvas").hide();
        jQuery(".worksprite").show();
        jQuery(".homesprite").hide();
        homerunner.pause();
        workrunner.draw();
        workrunner.resume();        
      }, 3000);
      
      jQuery("#content").animate({
        backgroundPosition: "(0 0)"
      }, {
        duration: 6000,
        easing: "easeInOutExpo",
        complete: function() {
          console.log("canvasWidth: " + jQuery("#workcanvas").width());
          console.log("floatyOffset: " + jQuery(".floaty-sign").css("margin-left"));
          console.log("ratio: " + (parseInt(jQuery(".floaty-sign").css("margin-left").split("px")[0]))/jQuery("#workcanvas").width());
        }
      });
      
      jQuery("body").animate({
        backgroundPosition: "(0 0)"
      }, {
        duration: 6000,
        easing: "easeInOutExpo"
      });      
    },

    initHome : function() {
      setTimeout(function() {
        jQuery("#homecanvas").show();
        jQuery("#musiccanvas").hide();
        jQuery(".musicsprite").hide();
      }, 3000);
      
      jQuery("#homelink").fadeOut();
      
      if(EPC.isFooterOn()) {
        jQuery("#footer").animate({
          top: "+=641"
        }, {
          duration: 1000,
          easing: "easeInOutExpo",
          complete: function() {
            jQuery(this).hide();
            EPC.setFooterOff();
          }
        });
      }
      
      setTimeout(function() {
        jQuery("#homecanvas").show();
        jQuery("#workcanvas").hide();
        jQuery(".worksprite").hide();
        jQuery(".homesprite").show();        
        workrunner.pause();
        homerunner.draw();
        homerunner.resume();        
      }, 3000);
      
      jQuery("#content").animate({
        backgroundPosition: "(0 -7255)"
      }, {
        duration: 6000,
        easing: "easeInOutExpo",
        complete: function() {

        }
      });
      
      jQuery("body").animate({
        backgroundPosition: "(0 -7255)"
      }, {
        duration: 6000,
        easing: "easeInOutExpo"
      });            
    }
    
  };
})();

jQuery(document).ready(function() {
  
//  jQuery(window).bind("resize", function(e) {
//    jQuery("#workcanvas").attr("width", jQuery("#workcanvas").width());
//  });
  
  EPC.startHomeCanvas();
  EPC.initBgClouds();
  Shadowbox.init({
    skipSetup: true
  });
  
  Shadowbox.setup("a.sobe-sign", {
    gallery: "SoBe: Try Everything Campaign"
  });

  Shadowbox.setup("a.fivegum-sign", {
    gallery: "Wrigley 5gum Coachella Promo"
  });

  Shadowbox.setup("a.eclipse-sign", {
    gallery: "Wrigley Twilight Eclipse Promo"
  });

  Shadowbox.setup("a.orbit-sign", {
    gallery: "Wrigley Orbit: Clean Campaign"
  });

  Shadowbox.setup("a.sonic-sign", {
    gallery: "Sonic Burgers Contest Site"
  });

});
