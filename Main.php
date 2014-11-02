<?php 
include 'Model.php';
use \Model\Model as Model;
Model::writeToJson(1243);
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>ITs Tree</title>
  <!-- css files -->
  <link href="bootstrap/css/bootstrap.min.css" rel="stylesheet">
  <link rel="stylesheet" href="d3/base.css">
  <link rel="stylesheet" href="style.css">
   <!-- js files -->
</head>
<body>
	<div class="container">
		<h2>ITS Tree</h2>
		<div class="first-row">
			<div class="col-md-3" id = "tree"></div>
			<div class="btn-group btn-group-md">
				<button type="button" class="btn btn-default" id="next-branch">Next Branch</button>
				<button type="button" class="btn btn-default" id="pre-question">Previous Question</button>
				<button type="button" class="btn btn-default" id="next-question">Next Question</button>
			</div>
			<div></div>
			<div class="mode">
				<input type="radio" value="manual" name="mode" id="manual" checked="true"> Manual <br>
				<input type="radio" value="auto" name="mode" id="auto"> Auto
			</div>
		</div>
	</div> <!-- container-->

	<div class="question-answer">
		<div class="question-area container">
			<div class="col-xs-2 question-label-column">
				<p class="question-label">Question: </p>
				<div id = "image-content"></div>
			</div>
			<div id = "question-content"></div>
			<br>
			<div class="col-xs-2 answer-label-column">
				<p class="answer-label">Answer: </p>
			</div>
			<div id = "answer-content"></div>
		</div>
<!--
		<div class="answer-area container">
			<div class="col-xs-2 question-label-column">
				<p class="question-label">Answer: </p>
			</div>
			<div class="col-xs-10 question-content-column">
				<select id ="answer "multiple class="form-control">
					<option>1</option>
					<option>2</option>
					<option>3</option>
					<option>4</option>
					<option>5</option>
				</select>
			</div>
		</div>
-->
		<button class="btn btn-success" id="submit">Submit</button>
	</div>
	<script src="d3/d3.min.js"></script>
	<script src="script.js"></script>
</body>
</html>

