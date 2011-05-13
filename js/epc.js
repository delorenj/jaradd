var EPC = (function () {
  var canvasWidth = $(window).width();
  var canvasHeight = $(window).height();
  
  return  {
    initCanvas : function() {
      footer_height = $("#footer").css("height");
      footer_height = footer_height.split("px")
      //$("#content").css("height", (canvasHeight - footer_height[0]) + "px");
      $("#content").css("height", "900px");
    },
    
    initClouds : function() {
      $("body").append("<img id='cloud1' src='images/canvas/cloud_370x147.png' alt='' />");
      $("#cloud1").animate({
        left: "+=" + canvasWidth
      }, 450000);
      
    }
  };
})();

$(document).ready(function() {
  EPC.initCanvas();
  EPC.initClouds();
});
