<?php 
include 'Model.php';
use \Model\Model as Model;
Model::writeToJson(1243);
//Model::writeToJson(1271);
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>ITs Tree</title>
  <link rel="stylesheet" href="_/base.css">
  <link rel="stylesheet" href="style.css">
</head>
<body>
	<div class="container">
	<h2>ITS Tree</h2>
	<div id="chart"></div>
	</div>
	<script src="_/d3.min.js"></script>
	<script src="script.js"></script>
</body>
<body>
<!--
	 <div id="Next">
		<input name="updateButton" type="button" value="Next"/>
	</div>
	<div id="Down">
		<input name="updateButton" type="button" value="Down"/>
	</div> 
-->
</body>

</html>

