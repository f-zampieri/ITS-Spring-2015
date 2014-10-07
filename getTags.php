<?php

$connection=mysqli_connect('localhost','root','csip','its');

if (mysqli_connect_errno()) {
  echo "failed to connect " . mysqli_connect_error();
}

$sql = "SELECT id, name from tags;";
$sql1 = "SELECT * FROM intelligent_review_Spring 2014 AS it left outer join tags AS c ON c.id = it.concept left outer join questions AS q ON q.id = it.question LIMIT 5;"
echo $sql;
$arr = mysqli_query($connection, $sql);

$filename = "/root/repos/Its_Spring_2014/tagsData.json";
$file = fopen($filename, "w");
/*
fwrite($file, "\"tags\":[
	");

while ($row = mysqli_fetch_array($arr)) {
	fwrite($file,
	"{\"" . $row[0] . "\"" . ":" . "\"" . $row[1] . "\"},
	");
}

fwrite($file, "]");

fclose($file);
*/
?>
