<?php

$connection=mysqli_connect('localhost','root','csip','');

if (mysqli_connect_errno()) {
  echo "failed to connect " . mysqli_connect_error();
}

$sql = "SELECT answered from its.stats_1029;";
$arr = mysqli_query($connection, $sql);

$filename = "/root/repos/Its_Spring_2014/newFile.html";
$file = fopen($filename, "w");

fwrite($file,
	'<!DOCTYPE html>
	<html>
	<head>
	<title >Test Connection File</title>
	</head>
	<body>
	<table border="1">
	<tr>
	<td>Answered</td>
	</tr>');

while ($row = mysqli_fetch_array($arr)) {
	fwrite($file,
	"<tr>
	<td>" . $row[0] . "</td>
	</tr>");
}

fwrite($file,
	"</table
	</body>
	</html>");

fclose($file)
?>
