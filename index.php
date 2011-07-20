<!DOCTYPE html>
<html>
  <head>
    <title>Jarad DeLorenzo</title>
    <link type="text/css" rel="stylesheet" href="css/reset.css" />
    <link href='http://fonts.googleapis.com/css?family=Amaranth&v1' rel='stylesheet' type='text/css'>
    <link type="text/css" rel="stylesheet" href="css/shadowbox.css" />        
    <link type="text/css" rel="stylesheet" href="css/home.css" />    
    <script type="text/javascript" src="js/box2dDangly.min.js"></script>
    <script type="text/javascript" src="js/jquery.min.js"></script>
    <script type="text/javascript" src="js/jquery-ui.min.js"></script>
    <script type="text/javascript" src="js/jquery.easing.1.3.js"></script>
    <script type="text/javascript" src="js/jquery.backgroundPosition.js"></script>
    <script type="text/javascript" src="js/jquery.spritely-0.4.js"></script>
    <script type="text/javascript" src="js/shadowbox.js"></script>
    <script type="text/javascript">
      $j = jQuery.noConflict();    
    </script>    
    <script type="text/javascript" src="js/epcb2dDanglies.js"></script>
    <script type="text/javascript" src="js/epcDanglies.js"></script>
    <script type="text/javascript" src="js/epcb2dSpacies.js"></script>
    <script type="text/javascript" src="js/epcSpacies.js"></script>    
    <script type="text/javascript" src="js/epc.js"></script>
    <script type="text/javascript" src="js/epcDuckTunt.js"></script>    
  </head>
  <body>
    <div class="mainwrap">
      <div id="wrapper">
        <canvas id="homecanvas" width="1024" height="600"></canvas>
        <canvas id="workcanvas" width="1200" height="600"></canvas>
        <canvas id="musiccanvas"></canvas>
      </div>
      <div id="content"></div>
      <div id="container"></div>
      <div class="wrapper">
        <img id="work-stuff" class="homesprite sprite" src="images/canvas/work-stuff.png"></img>
        <img id="music-stuff" class="homesprite sprite" src="images/canvas/music-stuff.png"></img>
        <img id="facebook" class="homesprite sprite" src="images/canvas/facebook.png"></img>
        <img id="linkedin" class="homesprite sprite" src="images/canvas/linkedin.png"></img>
        <img id="gplus" class="homesprite sprite" src="images/canvas/gplus.png"></img>
        <img id="jacksnaps" class="homesprite sprite" src="images/canvas/jacksnaps.png"></img>
        <img id="satAnchor" class="worksprite sprite" src="images/canvas/down.png"></img>
        <img id="sobe-sign" class="worksprite sprite floaty-sign" src="images/canvas/sobe-sign.png"></img>
        <img id="orbit-sign" class="worksprite sprite floaty-sign" src="images/canvas/orbit-sign.png"></img>
        <img id="eclipse-sign" class="worksprite sprite floaty-sign" src="images/canvas/eclipse-sign.png"></img>
        <img id="fivegum-sign" class="worksprite sprite floaty-sign" src="images/canvas/5gum-sign.png"></img>
        <img id="sonic-sign" class="worksprite sprite floaty-sign" src="images/canvas/sonic-sign.png"></img>
        <img id="sat" class="worksprite sprite" src="images/canvas/SatelliteOnly.png"></img>
        <div id="flash"></div>
      </div>
      <a class="sb sobe-sign" title="SoBe's Try A New Look Kiosk and iPhone App" href="images/sobe_tryeverything.jpg"></a>
      <a class="sb sobe-sign" title="SoBe's Facebook Profile" href="images/sobe_skinsuit_facebook.jpg"></a>
      <a class="sb sobe-sign" title="SoBe Mobile Website" href="images/sobe_girl_01.png"></a>
      <a class="sb sobe-sign" title="SoBe Mobile Website" href="images/sobe_girl_02.jpg"></a>    
      <a class="sb orbit-sign" title="Orbit Gum" href="images/orbitgum.jpg"></a>
      <a class="sb eclipse-sign" title="Eclipse Gum / Twilight Eclipse Promo Site" href="images/Twilight_Eclipse_01.jpg"></a>
      <a class="sb eclipse-sign" title="Eclipse Gum / Twilight Eclipse Promo Site" href="images/Twilight_Eclipse_02.jpg"></a>
      <a class="sb fivegum-sign" title="Coachella 5gum Promo Site" href="images/coachella_5gum_02.jpg"></a>
      <a class="sb fivegum-sign" title="Coachella 5gum Promo Site" href="images/coachella_5gum_01.jpg"></a>
      <a class="sb sonic-sign" title="Sonic Burgers Contest Site" href="images/sonic01.png"></a>
      <a class="sb sonic-sign" title="Sonic Burgers Contest Site" href="images/sonic02.png"></a>
      <a class="sb sonic-sign" title="Sonic Burgers Contest Site" href="images/sonic03.png"></a>
      <a class="sb sonic-sign" title="Sonic Burgers Contest Site" href="images/sonic04.png"></a>
    </div>
    <div id="footer">
      <img src="images/grass_tree.png"></img>
    </div>
    <audio id="blast">
      <source src="js/blast.ogg" type="audio/ogg"></source>
      <source src="js/blast.mp3" type="audio/mpeg"></source>
    </audio>    
    <audio id="quack">
      <source src="js/quack.ogg" type="audio/ogg"></source>
      <source src="js/quack.mp3" type="audio/mpeg"></source>
    </audio>        
    <audio id="end-round">
      <source src="js/end_round.ogg" type="audio/ogg"></source>
      <source src="js/end_round.mp3" type="audio/mpeg"></source>
    </audio>        
    <audio id="wings">
      <source src="js/wings.ogg" type="audio/ogg"></source>
      <source src="js/wings.wav" type="audio/wav"></source>
    </audio>            
  </body>
</html>
