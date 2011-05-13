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
  
  return  {
    initCanvas : function() {
      footer_height = $("#footer").css("height");
      footer_height = footer_height.split("px")
      //$("#content").css("height", (canvasHeight - footer_height[0]) + "px");
      $("#content").css("height", "900px");
      linkwidth = canvasWidth/6;
      $(".wrapper").css("width", canvasWidth);
      $("#beeflinks").css("width", canvasWidth);
      $(".cloudlink:eq(0)").css("left", linkwidth * 1);
      $(".cloudlink:eq(1)").css("left", linkwidth * 2);
      $(".cloudlink:eq(2)").css("left", linkwidth * 3);
      $(".cloudlink:eq(3)").css("left", linkwidth * 4);
      
      $(".cloudicon:eq(0)").css("left", linkwidth * 1 + 40).css("top", -40);
      $(".cloudicon:eq(1)").css("left", linkwidth * 2 + 50).css("top", -40);
      $(".cloudicon:eq(2)").css("left", linkwidth * 3 + 45).css("top", -40);
      $(".cloudicon:eq(3)").css("left", linkwidth * 4 + 45).css("top", -40);      
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
