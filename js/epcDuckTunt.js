EPC.DT = (function () {
  var _ctx;
  var _width;
  var _height;
  var _score = 0;
  var _mouseX = 0;
  var _mouseY = 0;
  var _images = {};
  var _bird = {
    x: 200,
    y: 300,
    dx: 1,
    dy: 0.5,
    speed: 10
  };
  
  var draw = function() {
    clear();
    updateScore();
    updateBird();
    
    
    drawScore();    
    drawBird();
  }
  
  var clear = function() {
    _ctx.clearRect(0, 0, _width, _height);
  }
  
  var loadImages = function(sources, callback){
    var loadedImages = 0;
    var numImages = 0;
    for (var src in sources) {
        numImages++;
    }
    for (var src in sources) {
        _images[src] = new Image();
        _images[src].onload = function(){
            if (++loadedImages >= numImages) {
                callback();
            }
        };
        _images[src].src = sources[src];
    }
  }
 
  var updateScore = function() {
    _score = 0;
  }
  
  var updateBird = function() {
    _bird.x += _bird.speed * _bird.dx;
    _bird.y += _bird.speed * _bird.dy;
  }
  
  var drawScore = function() {
    _ctx.textBaseline = "top";
    _ctx.font = "bold 28px Courier";
    _ctx.fillStyle = "#fff";
    _ctx.fillText("(" + _mouseX + "," + _mouseY + ")", 5, 5);
  }
  
  var drawBird = function() {
    _ctx.drawImage(_images.bird, _bird.x, _bird.y, _bird.x+10, _bird.y+10);    
  }
  
  var ev_mousemove = function(ev) {
    var x;
    var y;
    if (ev.layerX || ev.layerX == 0) { // Firefox
      x = ev.layerX;
      y = ev.layerY;
    } else if (ev.offsetX || ev.offsetX == 0) { // Opera
      x = ev.offsetX;
      y = ev.offsetY;
    }    
    _mouseX = x;
    _mouseY = y;    
  }
  
  return  {    
    initCanvas : function() {
      _ctx = jQuery("#musiccanvas")[0].getContext("2d");
      _width = jQuery("#musiccanvas").width();
      _height = jQuery("#musiccanvas").height();
      jQuery("#musiccanvas")[0].addEventListener('mousemove', ev_mousemove, false);
      
      var sources = {
        bird: "images/canvas/bird_90x90.png"
      }
      
      loadImages(sources, function() {
        console.log("images loaded");
      });
      
      return setInterval(draw, 10);     
    }
  }
})();