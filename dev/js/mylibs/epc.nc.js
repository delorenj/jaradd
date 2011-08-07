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
      left: windowWidth - jQuery(img).width()
    },{
      duration: layer,
      complete: function() {
        jQuery(this).fadeOut("slow", function() {
          jQuery(this)
            .css("left", "0")
            .css("top", Math.random() * jQuery(window).height() - jQuery(this).height())
            .fadeIn("slow", function() {
              animateCloud(this, (Math.random() * (z2_speed-z0_speed) + z0_speed)/10)
            });
        });
      }
    })
  }
    
  var animateCloudGroup = function(img, layer) {
    var rel = jQuery("img[rel='" + jQuery(img).attr("id") + "']");    
    jQuery(rel).animate({
      left: jQuery(window).width() - jQuery(rel).width()*2
    },
    {
      duration: layer,
      easing: "linear",
      step: function(a, b) {
        jQuery("#" + jQuery(this).attr("rel")).css("left", a)
      },
      complete: function() {
        jQuery(img).fadeOut("slow", function() {
          jQuery(img).css("left", "0").fadeIn("slow");
        });
        
        jQuery(rel).fadeOut("slow", function() {
          jQuery(rel).css("left", "0").fadeIn("slow");
          animateCloudGroup(img, (Math.random() * (z2_speed-z0_speed) + z0_speed)/10);
        });                
      }
    });
  }
  
  var initCloudLink = function(obj, x, y, scale) {
    jQuery(obj)
      .css("position", "absolute")
      .css("top", y)
      .css("margin-left", "50px")
      .fadeIn("slow")      
      .parent()
        .append($("<img></img>")
          .attr({
            src: "img/cloudlink.png",
            rel: jQuery(obj).attr("id")
          })
          .hover(function() {
            jQuery(this).pause();
            jQuery("#" + jQuery(this).attr("rel")).animate({
              top: "-=30px"
            })
          }, function() {
            jQuery(this).resume();
            jQuery("#" + jQuery(this).attr("rel")).animate({
              top: "+=30px"
            })            
          })
          .css("position", "absolute")
          .css("top", y - jQuery(window).height()/2+10)
          .css("left", x)
          .css("z-index", "2000")
        );
    animateCloudGroup(obj, (Math.random() * (z2_speed-z0_speed) + z0_speed)/10);
  }
  
  return  {    
    initBgClouds : function() {
      jQuery("img[id*='cloud']").each(function() {
        jQuery(this).css({
        left: Math.random() * jQuery(window).width()/2,
        top: Math.random() * jQuery(window).height() - jQuery(this).height()
        });
        animateCloud(this, (Math.random() * (z2_speed-z0_speed) + z0_speed)/10);
      });
    },
    
    initCloudLinks : function() {
      var index = 2;
      var count = jQuery(".homesprite.cloudlink").length + 2;
      jQuery(".homesprite.cloudlink").each(function() {
        initCloudLink(this,
                      Math.random() * jQuery(window).width() * 0.75, 
                      (jQuery(window).height()/count * index++) - (jQuery(window).height()/2), 
                      1);
      });
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

      EPC.setFooterOn();
      
      setTimeout(function() {
        jQuery("#footer")
          .show()
          .animate({
            top: "-=641px"
          }, 
          {
            duration: 1000,
            easing: "easeInOutExpo",
            step : function(a, b) {
              var off = b.now-b.start;
              EPC.setFooterOffset(off);
          }
        });
        jQuery("#musiccanvas2d").show();
      }, 5000);
      

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
      jQuery("#musiccanvas").attr("width", jQuery(window).width())
        .attr("height", jQuery(window).height())
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
  jQuery("#content").height(jQuery(window).height());  
  jQuery(".homesprite.planelink").hide();
  EPC.startHomeCanvas();
  EPC.initBgClouds();
  EPC.initCloudLinks();
  Shadowbox.init({ 
    language: 'en', 
    players: ['img', 'html', 'iframe', 'qt', 'wmp', 'swf', 'flv'],
    autoplayMovies: true,
    onOpen : function(e) {
      if(EPC.isFooterOn()) {
        EPC.destroyDuckTunt();
      }
    }
  });

  jQuery("#work-stuff").click(function() {
    EPC.initWorkStuff();
  });

  jQuery("#music-stuff").click(function() {
    EPC.initMusicStuff();
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
