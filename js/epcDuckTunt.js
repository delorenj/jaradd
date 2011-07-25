EPC.DT = (function () {
  var _ctx;
  var _width;
  var _height;
  var _score = 0;
  var _mouseX = 0;
  var _mouseY = 0;
  var _images = {};
  var _quackInt;
  var _flapInt;
  var _bird = {
    active: false,
    ending: false,
    alive: true,
    x: 0,
    y: 600,
    w: 37,
    h: 49,    
    dx: 1,
    dy: -0.5,
    frame: 0,
    nframes: 3,
    frameIncrease: true,
    speed: 5
  };
  
  var draw = function() {
    clear();
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
 
  var updateBird = function() {
    if(!_bird.active) return;
    
    if(_bird.alive) {
      _bird.x += _bird.speed * _bird.dx;
      _bird.y += _bird.speed * _bird.dy;      
    } else {
      _bird.y += 10;
      if(_bird.y > _height) {
        _bird.active = false;
        setTimeout(initBird, Math.random() * 30000);
      }
    }

    if(_bird.ending && ((_bird.x > _width)) || (_bird.x < 0) || (_bird.y > _height) || (_bird.y < 0)) {
      _bird.active = false;
      clearInterval(_quackInt);
      clearInterval(_flapInt);
      jQuery("#end-round")[0].play();
      setTimeout(initBird, Math.random() * 30000);
    }
  }
  
  var drawScore = function() {
    _ctx.textBaseline = "top";
    _ctx.font = "bold 16px Arial";
    _ctx.fillStyle = "#fff";
   _ctx.fillText("Score: " + _score, 5, 5);
  }
  
  var drawBird = function() {
    if(_bird.dx < 0) {
      foff = _bird.h;
    } else {
      foff = 0;
    }
    if(!_bird.active && _bird.alive) return;
    
    if(!_bird.active && !_bird.alive){
      _ctx.drawImage(_images.bird, 3*_bird.w, foff, _bird.w, _bird.h, _bird.x, _bird.y, _bird.w, _bird.h);
      return;
    }
    
    if(_bird.active && !_bird.alive) {
      _ctx.drawImage(_images.bird, _bird.frame*_bird.w, _bird.h*2, _bird.w, _bird.h, _bird.x, _bird.y, _bird.w, _bird.h);
      if(_bird.frame == _bird.nframes-1) {
        _bird.frame = 0;
      } else {
        _bird.frame++;
      }
      return;
    }
    _ctx.drawImage(_images.bird, _bird.frame*_bird.w, foff, _bird.w, _bird.h, _bird.x, _bird.y, _bird.w, _bird.h);

    if(_bird.frame == _bird.nframes-1) {
        _bird.frameIncrease = false;
    } else if(_bird.frame == 0) {
      _bird.frameIncrease = true;
    }
    
    _bird.frame = _bird.frameIncrease == true ? _bird.frame+1 : _bird.frame-1
  }
  
  var ev_mousemove = function(ev) {
    _mouseX = ev.pageX;
    _mouseY = ev.pageY;    
  }
  
  var ev_click = function(ev) {
    _ctx.save();
    _ctx.fillStyle="#fff";
    _ctx.fillRect(0,0,_width, _height);
    _ctx.restore();
    audio = document.getElementById("blast");
    if(audio.currentTime == 0) {
      audio.play();    
    } else {
      audio.currentTime = 0;
    }
    
    //check for collision
    if(collision(ev, _bird)) {
      killBird();
    }
  }
  
  var ev_keydown = function(ev) {
    alert("key");
  }
  
  var collision = function(mouseevent, obj) {
    var px = mouseevent.pageX;
    var py = mouseevent.pageY;
    if((px > obj.x) && (px < obj.x + obj.w) && (py > obj.y) && (py < obj.y+obj.h)) {
      return true;
    } else {
      return false;
    }
  }
  
  var initBird = function() {
    _bird.x = Math.random() * (jQuery("#musiccanvas").width()/2);
    _bird.y = jQuery(window).height() - 251;
    _bird.dx = (Math.random()) * 2;
    _bird.dy = -(Math.random() * 2 );
    _bird.active = true;
    _bird.ending = false;
    _bird.alive = true;
    _quackInt = setInterval(function() {
      audio = document.getElementById("quack");
      audio.play();
    }, 2000);

    _flapInt = setInterval(function() {
      audio = document.getElementById("wings");
      audio.play();
    }, 100);

    setTimeout(changeBird, Math.random() * 3000);
    setTimeout(endBird, 10000);
  }
  
  var changeBird = function() {
    var x = Math.random();
    if(x < 0.5) _bird.dx *= -1;

    var y = Math.random();
    if(y < 0.5) _bird.dy *= -1;
    
    if(!_bird.ending) {
      setTimeout(changeBird, Math.random() * 3000);    
    }
  }
  
  var endBird = function() {
    _bird.ending = true;
  }
  
  var killBird = function() {
    _bird.active = false;
    _bird.alive = false;
    _bird.frame = 0;
    _score++;
    clearInterval(_quackInt);
    clearInterval(_flapInt);            
    setTimeout(function() {
      _bird.active = true
    }, 1500);
  }
  
  return  {    
    initCanvas : function() {
      _ctx = jQuery("#musiccanvas")[0].getContext("2d");
      _width = jQuery("#musiccanvas").width();
      _height = jQuery("#musiccanvas").height();
      jQuery("#musiccanvas").bind('mousemove', ev_mousemove);
      jQuery("#musiccanvas").bind('click', ev_click);
      jQuery("#musiccanvas")[0].addEventListener("keydown", ev_keydown, true);
      
      var sources = {
        bird: "images/canvas/duck.png"
      }
      
      loadImages(sources, function() {
        console.log("images loaded");
      });
      
      setTimeout(initBird, Math.random() * 10000);
      return setInterval(draw, 40);
    },
    
    mousemouse : function(ev) {
      ev_mousemove(ev);
    }
  }
})();