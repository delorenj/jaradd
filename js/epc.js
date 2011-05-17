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
    initCanvas : function() {
      footer_height = $("#footer").css("height");
      footer_height = footer_height.split("px")
      //$("#content").css("height", (canvasHeight - footer_height[0]) + "px");
      $("#content").css("height", "900px");
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
            }).animate({top: -1000}, 300, function() { $(this).hide()});
          })
      });

    },
    
    initClouds : function() {
      $("body").append("<img id='cloud1' src='images/canvas/cloud_370x147.png' alt='' />");
      animateCloud("#cloud1", z1_speed);
      
      $("body").append("<img id='cloud2' src='images/canvas/cloud_500x200.png' alt='' />");      
      animateCloud("#cloud2", z2_speed);
    }
  };
})();

$(document).ready(function() {
  EPC.initCanvas();
  EPC.initClouds();
   
});
