<!DOCTYPE html>
<html>
  <head>
    <title>Jarad DeLorenzo</title>
    <link type="text/css" rel="stylesheet" href="css/reset.css" />
    <link type="text/css" rel="stylesheet" href="css/home.css" />    

		<!--=============================-->
		<!-- Copy this part to your app. -->
		<!-- START                       -->
		<!--=============================-->
		<!-- libs -->
		<!--[if IE]><script type="text/javascript" src="lib/excanvas.js"></script><![endif]-->
    <script src="lib/prototype-1.6.0.2.js"></script>

		<!-- box2djs -->
    <script src='js/box2d/common/b2Settings.js'></script>
    <script src='js/box2d/common/math/b2Vec2.js'></script>
    <script src='js/box2d/common/math/b2Mat22.js'></script>
    <script src='js/box2d/common/math/b2Math.js'></script>
    <script src='js/box2d/collision/b2AABB.js'></script>
    <script src='js/box2d/collision/b2Bound.js'></script>
    <script src='js/box2d/collision/b2BoundValues.js'></script>
    <script src='js/box2d/collision/b2Pair.js'></script>
    <script src='js/box2d/collision/b2PairCallback.js'></script>
    <script src='js/box2d/collision/b2BufferedPair.js'></script>
    <script src='js/box2d/collision/b2PairManager.js'></script>
    <script src='js/box2d/collision/b2BroadPhase.js'></script>
    <script src='js/box2d/collision/b2Collision.js'></script>
    <script src='js/box2d/collision/Features.js'></script>
    <script src='js/box2d/collision/b2ContactID.js'></script>
    <script src='js/box2d/collision/b2ContactPoint.js'></script>
    <script src='js/box2d/collision/b2Distance.js'></script>
    <script src='js/box2d/collision/b2Manifold.js'></script>
    <script src='js/box2d/collision/b2OBB.js'></script>
    <script src='js/box2d/collision/b2Proxy.js'></script>
    <script src='js/box2d/collision/ClipVertex.js'></script>
    <script src='js/box2d/collision/shapes/b2Shape.js'></script>
    <script src='js/box2d/collision/shapes/b2ShapeDef.js'></script>
    <script src='js/box2d/collision/shapes/b2BoxDef.js'></script>
    <script src='js/box2d/collision/shapes/b2CircleDef.js'></script>
    <script src='js/box2d/collision/shapes/b2CircleShape.js'></script>
    <script src='js/box2d/collision/shapes/b2MassData.js'></script>
    <script src='js/box2d/collision/shapes/b2PolyDef.js'></script>
    <script src='js/box2d/collision/shapes/b2PolyShape.js'></script>
    <script src='js/box2d/dynamics/b2Body.js'></script>
    <script src='js/box2d/dynamics/b2BodyDef.js'></script>
    <script src='js/box2d/dynamics/b2CollisionFilter.js'></script>
    <script src='js/box2d/dynamics/b2Island.js'></script>
    <script src='js/box2d/dynamics/b2TimeStep.js'></script>
    <script src='js/box2d/dynamics/contacts/b2ContactNode.js'></script>
    <script src='js/box2d/dynamics/contacts/b2Contact.js'></script>
    <script src='js/box2d/dynamics/contacts/b2ContactConstraint.js'></script>
    <script src='js/box2d/dynamics/contacts/b2ContactConstraintPoint.js'></script>
    <script src='js/box2d/dynamics/contacts/b2ContactRegister.js'></script>
    <script src='js/box2d/dynamics/contacts/b2ContactSolver.js'></script>
    <script src='js/box2d/dynamics/contacts/b2CircleContact.js'></script>
    <script src='js/box2d/dynamics/contacts/b2Conservative.js'></script>
    <script src='js/box2d/dynamics/contacts/b2NullContact.js'></script>
    <script src='js/box2d/dynamics/contacts/b2PolyAndCircleContact.js'></script>
    <script src='js/box2d/dynamics/contacts/b2PolyContact.js'></script>
    <script src='js/box2d/dynamics/b2ContactManager.js'></script>
    <script src='js/box2d/dynamics/b2World.js'></script>
    <script src='js/box2d/dynamics/b2WorldListener.js'></script>
    <script src='js/box2d/dynamics/joints/b2JointNode.js'></script>
    <script src='js/box2d/dynamics/joints/b2Joint.js'></script>
    <script src='js/box2d/dynamics/joints/b2JointDef.js'></script>
    <script src='js/box2d/dynamics/joints/b2DistanceJoint.js'></script>
    <script src='js/box2d/dynamics/joints/b2DistanceJointDef.js'></script>
    <script src='js/box2d/dynamics/joints/b2Jacobian.js'></script>
    <script src='js/box2d/dynamics/joints/b2GearJoint.js'></script>
    <script src='js/box2d/dynamics/joints/b2GearJointDef.js'></script>
    <script src='js/box2d/dynamics/joints/b2MouseJoint.js'></script>
    <script src='js/box2d/dynamics/joints/b2MouseJointDef.js'></script>
    <script src='js/box2d/dynamics/joints/b2PrismaticJoint.js'></script>
    <script src='js/box2d/dynamics/joints/b2PrismaticJointDef.js'></script>
    <script src='js/box2d/dynamics/joints/b2PulleyJoint.js'></script>
    <script src='js/box2d/dynamics/joints/b2PulleyJointDef.js'></script>
    <script src='js/box2d/dynamics/joints/b2RevoluteJoint.js'></script>
    <script src='js/box2d/dynamics/joints/b2RevoluteJointDef.js'></script>
		<!--=============================-->
		<!-- Copy this part to your app. -->
		<!-- END                         -->
		<!--=============================-->


    <script type="text/javascript" src="js/jquery.min.js"></script>
    <script type="text/javascript" src="js/jquery-ui.min.js"></script>
    <script type="text/javascript" src="js/jquery.easing.1.3.js"></script>
    <script type="text/javascript" src="js/epc.js"></script>
  </head>
  <body>
<!--    <canvas width="800" height="600"></canvas>-->
    <div id="canvas"></div>
    <div id="content"></div>
      <div class="wrapper">
        <ul id="beeflinks">
          <li id="linkedin">
            <img class="cloudlink" src="images/canvas/cloudlink.png"></img>
            <img class="cloudicon" src="images/canvas/linkedin.png"></img>
          </li>
          <li id="facebook">
            <img class="cloudlink" src="images/canvas/cloudlink.png"></img>
            <img class="cloudicon" src="images/canvas/facebook.png"></img>
          </li>
          <li id="twitter">
            <img class="cloudlink" src="images/canvas/cloudlink.png"></img>
            <img class="cloudicon" src="images/canvas/twitter.png"></img>
          </li>
          <li id="somethin">
            <img class="cloudlink" src="images/canvas/cloudlink.png"></img>
            <img class="cloudicon" src="images/canvas/linkedin.png"></img>
          </li>
        </ul>
      </div>
    </div>    
    <div id="footer">
      <span>Copyright &copy; 2011 somethin somethin somethin</span>
    </div>          
  </body>
</html>
