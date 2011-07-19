EPC.DT = (function () {
  var _ctx;
  var _width;
  var _height;
  var _score = 0;
  var _mouseX = 0;
  var _mouseY = 0;
  var _images = {};
  var _bird = {
    active: false,
    x: 0,
    y: 600,
    w: 37,
    h: 49,    
    dx: 1,
    dy: -0.5,
    frame: 0,
    nframes: 3,
    frameIncrease: true,
    speed: 1
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
    if(!_bird.active) return;
    
    _bird.x += _bird.speed * _bird.dx;
    _bird.y += _bird.speed * _bird.dy;
  }
  
  var drawScore = function() {
    _ctx.textBaseline = "top";
    _ctx.font = "bold 16px Arial";
    _ctx.fillStyle = "#fff";
//    _ctx.fillText("(" + _mouseX + "," + _mouseY + ")", 5, 5);
   _ctx.fillText("Score: " + _score, 5, 5);
  }
  
  var drawBird = function() {
    if(_bird.dx < 0) {
      foff = _bird.h;
    } else {
      foff = 0;
    }
    if(!_bird.active) return;
    _ctx.drawImage(_images.bird, _bird.frame*_bird.w, foff, _bird.w, _bird.h, _bird.x, _bird.y, _bird.w, _bird.h);

    if(_bird.frameIncrease){
      _bird.frame++;
    } else {
      _bird.frame--;
    }
    
    if(_bird.frame == _bird.nframes) {
      _bird.frameIncrease = false;
    } else if(_bird.frame == 0) {
      _bird.frameIncrease = true;
    }
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
  
  var initBird = function() {
    _bird.x = Math.random() * (jQuery("#musiccanvas").width()/2);
    _bird.y = jQuery(window).height() - 251;
    _bird.dx = (Math.random()) * 2;
    _bird.dy = -(Math.random() * 2 );
    _bird.active = true;
    setTimeout(changeBird, Math.random() * 3000);
    setTimeout(initBird, Math.random() * 20000);
  }
  
  var changeBird = function() {
    var x = Math.random();
    if(x < 0.5) _bird.dx *= -1;

    var y = Math.random();
    if(y < 0.5) _bird.dy *= -1;
    setTimeout(changeBird, Math.random() * 3000);
  }
  return  {    
    initCanvas : function() {
      _ctx = jQuery("#musiccanvas")[0].getContext("2d");
      _width = jQuery("#musiccanvas").width();
      _height = jQuery("#musiccanvas").height();
      jQuery("#musiccanvas")[0].addEventListener('mousemove', ev_mousemove, false);
      
      var sources = {
        bird: "images/canvas/duck.png"
      }
      
      loadImages(sources, function() {
        console.log("images loaded");
      });
      
      setTimeout(initBird, Math.random() * 10000);
      return setInterval(draw, 10);
    }
  }
})();