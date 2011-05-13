var EPC = function () {
  var canvasWidth = $(window).width();
  var canvasHeight = $(window).height();
  var cloudWidth = 370;
  var cloudHeight = 147;
  var cloudX = 0;
  var cloudY = 175;
  var cloudObj = null;

  function initCloud(context, x, y) {
    var cloud = new Image();
    cloud.src = "images/canvas/cloud_370x147.png";
    cloud.onload = function () {
      context.drawImage(cloud, x, y);
      cloudX=x;
      cloudY=y;
    }
    cloudObj = cloud;
  }

  function moveCloud() {
    console.log("moving cloud...");
    var canvas = $("#clouds").get(0);
    if (canvas.getContext){
      var context = canvas.getContext('2d');
      context.save();
      context.clearRect(cloudX, cloudY,cloudX+cloudWidth, cloudY+cloudHeight);
      context.drawImage(cloudObj, cloudX+1, cloudY);
      cloudX += 1;
      context.restore();
    }
  }  
  return  {
    initCanvas : function() {
      $("#clouds, #content").attr("width", canvasWidth)
      .attr("height", canvasHeight)
      .css("width", canvasWidth + "px")
      .css("height", canvasHeight + "px");
      $("#clouds").css("background-position", function() {
        return (canvasWidth/2 - 1024/2);
      });
      var canvas = $("#clouds").get(0);
      if (canvas.getContext){
        var context = canvas.getContext('2d');
        initCloud(context, cloudX, cloudY);
        setInterval(moveCloud, 150);
      }
    }
  };
}

$(document).ready(function() {
  EPC.initCanvas();
});