<?php

$connection=mysqli_connect('localhost','root','csip','');

if (mysqli_connect_errno()) {
  echo "failed to connect " . mysqli_connect_error();
}

$sql = "SELECT id, name from its.tags;";
$arr = mysqli_query($connection, $sql);

$filename = "/root/repos/Its_Spring_2014/tagsData.json";
$file = fopen($filename, "w");

fwrite($file, "\"tags\":[
	");

while ($row = mysqli_fetch_array($arr)) {
	fwrite($file,
	"{\"" . $row[0] . "\"" . ":" . "\"" . $row[1] . "\"},
	");
}

fwrite($file, "]");

fclose($file);

?>
