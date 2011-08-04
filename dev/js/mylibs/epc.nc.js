var EPC = (function () {
  var windowWidth = jQuery(window).width();
  var z0_speed = 350000;
  var z2_speed = 800000;
  var bgPosOffset = 0;
  var footerShowing = false;
  var footerOffset = 0;
  var bgTriggerOffset = -7000;
  var _duckTuntThread = null;
  
  var animateCloud = function(img, layer) {
    jQuery(img).animate({
      left: "+=" + windowWidth
    },{
      duration: layer
    });    
  }
  
  return  {    
    initBgClouds : function() {
      jQuery("#wrapper").append("<img id='cloud1' src='img/cloud_370x147.png' alt='' />");
      jQuery("#wrapper").append("<img id='cloud2' src='img/cloud_500x200.png' alt='' />");      
      jQuery("#wrapper").append("<img id='cloud3' src='img/cloud_410x272.png' alt='' />");      
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
         
    initMusicStuff : function() {
      setTimeout(function() {
        jQuery("#homecanvas").hide();
        jQuery("#musiccanvas, .musicsprite").show();
      }, 3000);
      
      jQuery("#content").animate({
        backgroundPosition: "(0 -15255)"
      }, {
        duration: 6000,
        easing: "easeInOutExpo",
        complete: function() {
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
    },
    
    getBgOffset : function() {
      return bgPosOffset;
    },
    
    setFooterOffset : function(pos) {
      footerOffset = pos;
    },
    
    getFooterOffset : function() {
      return footerOffset;
    },
    
    getBgTriggerOffset : function() {
      return bgTriggerOffset;
    },
    
    startHomeCanvas : function() {
      jQuery("#workcanvas").hide();
      jQuery("#musiccanvas").attr("width", jQuery(document).width())
        .attr("height", jQuery(document).height())
        .hide();        
      jQuery("#footer").css("top", (jQuery(window).height()));
    },
    
    initWorkStuff : function() {
      setTimeout(function() {
        jQuery("#workcanvas").show();
        jQuery("#homecanvas").hide();
        jQuery(".worksprite").show();
        jQuery(".homesprite").hide();
      }, 3000);
      
      jQuery("#content").animate({
        backgroundPosition: "(0 0)"
      }, {
        duration: 6000,
        easing: "easeInOutExpo",
        complete: function() {
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
        jQuery("#homecanvas, .homesprite").show();
        jQuery("#workcanvas,.worksprite").hide();
      }, 3000);
      
      if(EPC.isFooterOn()) {
        setTimeout(function() {
          EPC.setFooterOff();
          jQuery("#musiccanvas, .musicsprite").hide();
        },100);
        
        jQuery("#footer").animate({
          top: "+=641"
        }, {
          duration: 1000,
          easing: "easeInOutExpo",
          step : function(a, b) {
            var off = b.start-b.now;
            console.log("step: " + off);
            EPC.setFooterOffset(off);
          },
          complete: function() {
          }
        });
      }
      
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
  
  EPC.startHomeCanvas();
  EPC.initBgClouds();

  Shadowbox.init({ 
    language: 'en', 
    players: ['img', 'html', 'iframe', 'qt', 'wmp', 'swf', 'flv'],
    autoplayMovies: true,
    onOpen : function(e) {
      if(EPC.isFooterOn()) {
        EPC.destroyDuckTunt();
      }
    },
    
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

  Shadowbox.setup("a.dentsu-sign", {
    gallery: "Dentsu Network Public Site & CMS"
  });

  Shadowbox.setup("a.video");

});
