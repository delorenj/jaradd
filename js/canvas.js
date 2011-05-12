var canvasWidth = window.screen.width;
var canvasHeight = window.screen.height;
var cloudWidth = 370;
var cloudHeight = 147;
var cloudX = 0;
var cloudY = 175;


function initCanvas(){
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
    drawCloud(context, cloudX, cloudY);
  } 
}

function drawCloud(context, x, y) {
  var cloud = new Image();
  cloud.src = "images/canvas/cloud_370x147.png";
  cloud.onload = function () {
    context.drawImage(cloud, x, y);
    cloudX=x;
    cloudY=y;
  }
}

function moveCloud() {
  console.log("moving cloud...");
  var canvas = $("#clouds").get(0);
  if (canvas.getContext){
    var context = canvas.getContext('2d');
    context.save();
    context.clearRect(cloudX, cloudY,cloudX+cloudWidth, cloudY+cloudHeight);
    drawCloud(context, cloudX+1, cloudY);
    context.restore();
  }
}

$(document).ready(function() {
  initCanvas();
  setInterval(moveCloud, 150);
});