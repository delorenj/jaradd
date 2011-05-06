<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
  <head>
    <title>Jarad DeLorenzo</title>
    <link type="text/css" rel="stylesheet" href="css/reset.css" />
    <link href='http://fonts.googleapis.com/css?family=Cabin+Sketch:bold' rel='stylesheet' type='text/css' />
    <link href='http://fonts.googleapis.com/css?family=Luckiest+Guy' rel='stylesheet' type='text/css' />
    <link href='http://fonts.googleapis.com/css?family=Orbitron' rel='stylesheet' type='text/css' />
    <link type="text/css" rel="stylesheet" href="css/orbit/orbit-1.2.3.css" />        
    <link type="text/css" rel="stylesheet" href="css/default.css" />    
    <script src="https://www.google.com/jsapi?key=ABQIAAAAg5hreqiv4zDpiIkbdnYh2hQzjbXTZc_qR8GRjgQn4thEx_x7-RRurJaW6-Mnhat6W7QH5fI6paACGA" type="text/javascript"></script>
    <script type="text/javascript" src="js/jquery.min.js"></script>
    <script type="text/javascript" src="js/jquery-ui.min.js"></script>
    <script type="text/javascript" src="js/jquery.orbit-1.2.3.js"></script>
    <!--[if IE]>
         <style type="text/css">
             .timer { display: none !important; }
             div.caption { background:transparent; filter:progid:DXImageTransform.Microsoft.gradient(startColorstr=#99000000,endColorstr=#99000000);zoom: 1; }
        </style>
    <![endif]-->
    
		<script type="text/javascript">
			$(window).load(function() {
				$('#gallery').orbit({
         animation: 'horizontal-push',                  // fade, horizontal-slide, vertical-slide, horizontal-push
         animationSpeed: 800,                // how fast animtions are
         timer: true, 			 // true or false to have the timer
         advanceSpeed: 4000, 		 // if timer is enabled, time between transitions 
         pauseOnHover: true, 		 // if you hover pauses the slider
         startClockOnMouseOut: true, 	 // if clock should start on MouseOut
         startClockOnMouseOutAfter: 1000, 	 // how long after MouseOut should the timer start again
         directionalNav: true, 		 // manual advancing directional navs
         captions: true, 			 // do you want captions?
         captionAnimation: 'slideOpen', 		 // fade, slideOpen, none
         captionAnimationSpeed: 800, 	 // if so how quickly should they animate in
         bullets: true,			 // true or false to activate the bullet navigation
         bulletThumbs: true,		 // thumbnails for the bullets
         bulletThumbLocation: 'images/thumbs/',		 // location from this file where thumbs will be
         afterSlideChange: function(){
           //callback
         } 	 
        });
			});
		</script>    
  </head>
  <body>
    <div id="wrapper">
      <div id="banner">
        <span class="title">Jarad DeLorenzo</span>
      </div>
      <div id="content">
        <div class="container">
          <div id="gallery">
            <img src="images/Twilight_Eclipse_01.jpg" data-caption="#eclipse" data-thumb="Twilight_Eclipse_01.jpg" />
<!--            <img src="images/Twilight_Eclipse_02.jpg" data-caption="#eclipse" /> -->
            <img src="images/coachella_5gum_01.jpg" data-caption="#coachella" data-thumb="coachella_5gum_01.jpg" />
<!--            <img src="images/coachella_5gum_02.jpg" data-caption="#coachella" /> -->
            <img src="images/orbitgum.jpg" data-caption="#orbitgum" data-thumb="orbitgum.jpg" />
<!--            <img src="images/sobe_girl_01.png" />
            <img src="images/sobe_girl_02.jpg" />
            <img src="images/sobe_skinsuit_facebook.jpg" />-->
            <img src="images/sobe_tryeverything.jpg" data-caption="#tryeverything" data-thumb="sobe_tryeverything.jpg" />
          </div>          
        </div>
      </div>
      <div id="footer">
<!--        <ul>
          <li>jaradd@gmail.com</li>
          <li>973.440.8809</li>
          <li><a href="#">Resume</a></li>
          <li><a href="http://www.linkedin.com/profile/view?id=12114139">LinkedIn</a></li>
          <li><a href="http://www.facebook.com/jaradd">Facebook</a></li>
        </ul>-->
<span>Copyright &copy; 2011 somethin somethin somethin</span>
      </div>
    </div>
  </body>

  <div class="orbit-caption" id="eclipse">
    <span class="cap-title">Twilight Eclipse Bad Breath Contest for Wrigley Eclipse Gum</span>    
  </div>
  
  <div class="orbit-caption" id="coachella">
    <span class="cap-title">Wrigley 5gum Live Coachella Broadcast Site</span>
  </div>
  
  <div class="orbit-caption" id="orbitgum">
    <span class="cap-title">Orbit Gum: Clean Campaign Micro-Site</span>
  </div>
  
  <div class="orbit-caption" id="tryeverything">
    <span class="cap-title">SoBe: Try Everything iPhone App and Share Page</span>
  </div>  

</html>