var EPC = (function () {
  var windowWidth = jQuery(window).width();
  var z0_speed = 350000;
  var z2_speed = 800000;
  var bgPosOffset = 0;
  var homerunner = null
  var workrunner = null
  var musicrunner = null
  var footerShowing = false;
  var footerOffset = 0;
  var bgTriggerOffset = -7000;
  var _duckTuntThread = null;
  var _windowHeight = null;
  var animateCloud = function(img, layer) {
    jQuery(img).animate({
      left: "+=" + windowWidth
    },{
      duration: layer
    });    
  }
  
  return  {    
    getWindowHeight : function() {
      return _windowHeight;
    },
    
    setWindowHeight : function(h) {
      _windowHeight = h;
    },
    
    initBgClouds : function() {
      jQuery("img[id*='cloud']").each(function() {
        jQuery(this).css({
        left: Math.random() * jQuery(window).width()/2 - $(this).width(),
        top: Math.random() * jQuery(window).height() - $(this).height()
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
        jQuery("#musiccanvas").show();
        musicrunner.draw();
        musicrunner.resume();
      }, 3000);
 
      jQuery("#homecanvas").animate({
        top: "-=8000px"
      },
      {
        duration: 6000,
        easing: "easeInOutExpo"
      })
      
      jQuery("#content").animate({
        backgroundPosition: "(0 -15255)"
      }, {
        duration: 6000,
        easing: "easeInOutExpo",
        complete: function() {
          homerunner.pause();
          EPC.initDuckTunt();
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
    
    setRunner : function(r) {
      runner = r;
    },
    
    startHomeCanvas : function() {
      jQuery("#homecanvas");
//        .attr("height", jQuery(window).height())
        
      jQuery("#workcanvas")
//        .attr("height", jQuery(window).height())
//        .attr("width", jQuery(window).width())
        .hide();
        
      jQuery("#musiccanvas")
        .attr("width", jQuery(document).width())
        .attr("height", jQuery(document).height())
        .hide();        
        
      jQuery("#footer").css("top", (jQuery(window).height()));
      
      homerunner = new danglies(jQuery("#homecanvas")[0]);            
      workrunner = new spacies(jQuery("#workcanvas")[0]);
      musicrunner = new musickies(jQuery("#musiccanvas2d")[0]);
      
      homerunner.draw();	
      homerunner.resume();
    },
    
    initWorkStuff : function() {
      jQuery("#wrapper").css("overflow", "visible");
      
      if(!EPC.isFooterOn()) {
        setTimeout(function() {
          jQuery("#workcanvas").show();
          jQuery("#homecanvas").hide();
          homerunner.pause();
          workrunner.draw();
          workrunner.resume();        
        }, 3000);

        jQuery("#homecanvas, #workcanvas").animate({
          top: "+=8000px"
        }, 
        {
          duration: 6000,
          easing: "easeInOutExpo"
        })

        jQuery("#content, body").animate({
          backgroundPosition: "(0 0)"
        }, {
          duration: 6000,
          easing: "easeInOutExpo"
        });

      } else {
        setTimeout(function() {
          musicrunner.pause();
          jQuery("#musiccanvas").hide();
          EPC.destroyDuckTunt();
        },100);
        
        jQuery("#footer").animate({
          top: "+=641"
        }, {
          duration: 1000,
          easing: "easeInOutExpo",
          step : function(a, b) {
            var off = b.start-b.now;
            EPC.setFooterOffset(off);
          },
          complete: function() {
            footerShowing=false
            jQuery("#footer").hide();            
          }
        });
        
        setTimeout(function() {
          jQuery("#workcanvas").show();
          jQuery("#homecanvas").hide();
          homerunner.pause();
          workrunner.draw();
          workrunner.resume();        
        }, 5000);

        setTimeout(function() {
          jQuery("#homecanvas").show();
          jQuery("#musiccanvas").hide();
          musicrunner.pause();
          homerunner.draw();
          homerunner.resume();        
        }, 3000);

        jQuery("#homecanvas").animate({
          top: "+=16000px"
        },
        {
          duration: 8000,
          easing: "easeInOutExpo"
        })

        jQuery("#workcanvas").animate({
          top: "+=8000px"
        },
        {
          duration: 8000,
          easing: "easeInOutExpo"
        })

        jQuery("#content,body").animate({
          backgroundPosition: "(0 0)"
        }, {
          duration: 8000,
          easing: "easeInOutExpo",
          complete: function() {
          }
        });
      }
    },

    initDuckTunt : function () {
      _duckTuntThread = EPC.DT.initCanvas();      
    },
    
    destroyDuckTunt : function() {
      EPC.DT.destroyCanvas();
      clearInterval(_duckTuntThread);      
    },
    
    initHome : function() {
      setTimeout(function() {
        jQuery("#homecanvas").show();
        jQuery("#workcanvas,.worksprite").hide();
        workrunner.pause();
        homerunner.draw();
        homerunner.resume();                
      }, 3000);
      
      if(EPC.isFooterOn()) {
        setTimeout(function() {
          EPC.setFooterOff();
          musicrunner.pause();
          jQuery("#musiccanvas").hide();
          EPC.destroyDuckTunt();
        },100);

        jQuery("#homecanvas").animate({
          top: "+=8000px"
        },
        {
          duration: 6000,
          easing: "easeInOutExpo"
        })

        jQuery("#footer").animate({
          top: "+=641"
        }, {
          duration: 1000,
          easing: "easeInOutExpo",
          step : function(a, b) {
            var off = b.start-b.now;
            EPC.setFooterOffset(off);
          },
          complete: function() {
            footerShowing = false;
            jQuery("#footer").hide()

          }
        });
      } else {
      jQuery("#homecanvas,#workcanvas").animate({
        top: "-=8000px"
      },
      {
        duration: 6000,
        easing: "easeInOutExpo"
      })        
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
    },
    
    ieRotate : function(angle) {
      cos = Math.cos(angle),
      sin = Math.sin(angle);
      return ("progid:DXImageTransform.Microsoft.Matrix(sizingMethod='auto expand', M11 = " + cos + ", M12 = " + (-sin) + ", M21 = " + sin + ", M22 = " + cos);
    }
    
  };
})();

jQuery(document).ready(function() {
  
  jQuery("#content").height(jQuery(window).height());
  EPC.setWindowHeight(jQuery(window).height());
  
  EPC.startHomeCanvas();
  EPC.initBgClouds();
  Shadowbox.init({
    skipSetup: true
  });

  Shadowbox.init({ 
    language: 'en', 
    players: ['img', 'html', 'iframe', 'qt', 'wmp', 'swf', 'flv'],
    autoplayMovies: true,
    modal: true,
    onOpen : function(e) {
      if(EPC.isFooterOn()) {
        EPC.destroyDuckTunt();
      }
    },
    
    onClose : function() {
      if(EPC.isFooterOn()) {
        EPC.initDuckTunt();
      }
    }
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
