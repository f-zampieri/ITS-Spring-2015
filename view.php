<?php 
include 'Model.php';
use \Model\Model as Model;
Model::writeToJson(1243);
?>
<!DOCTYPE html>
<html>
	<head>
		<title>ITS Tree</title>
		<script src="//ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js"></script>
		<script type="text/javascript" src="Timer.js"></script>
		<link rel="stylesheet" href="timer.css">  
		<link rel="stylesheet" href="style.css">
	</head>

<body>

	<div class="left">
		<div id="title-area">
			<h1>ITS Tree</h1>
		</div>
		<div class="tabs-area">
			<ul class="tab-links">
				<li >
					<a href="#tree-area">Tree</a>
				</li>
				<li>
					<a href="#stats-area">Statistics</a>
				</li>
				<li>
					<a href="#settings-area">Settings</a>
				</li>
			</ul>
			<div class="tab-content">
				<div id="settings-area" style="display: none;">
					<input type="radio" name="mode" id="manual" checked="true"> &nbsp Manual </input>
					<br><br>
					<input type="radio" name="mode" id="auto"> &nbsp Auto </input>
				</div>
				<div id="stats-area" style ="display: none;">
					<div id="bars-area">
						<p>Total Progress</p>
						<progress max="16" id="totalProgress"></progress>
						<br></br>
						<p>Sub Progress</p>
						<progress max="6.25" id="subProgress" style="margin-bottom: 20px;"></progress>
					</div>
					<div id="scores-area">
						<p id="avg-score">Average correct: 0</p>
						<p id="num-completed">Number completed: 0</p>
					</div>
					<p>Timer</p>
					<div id="timer-area">
					</div>
				</div>
				<div id="tree-area" class="active-tab"></div>
			</div>
		</div>
	</div>

	<div class="right">
		<div id="select-area" class="right">
			Base <select id = "menuSelectB"></select>
			Questions <select id = "menuSelectQ"></select>
		<br>
		</div>
		<div id="question-answer-area">
			<div id = "question-content"></div>
			<br><br>
			<!-- <div id = "answer-content"></div> -->
		</div>
		<div class="buttons-area">
			<button type="button" id="pre-question" title="Previous Question"><</button>
			<button type="button" id="submit">Submit</button>
			<button type="button" id="next-question" title="Next Question">></button>
		</div>
	</div>

	<script src="//netdna.bootstrapcdn.com/bootstrap/3.1.1/js/bootstrap.min.js"></script>
	<script src="d3/d3.min.js"></script>
	<script src="tabScript.js"></script>
	<script src="script.js"></script> 
</body>
</html>