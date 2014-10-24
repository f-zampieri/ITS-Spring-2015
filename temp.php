
<?
$counter = 0;
$i = 0;
$data = 0;
$index = 1;
$bIndex = 0;
while ($data < 322){
	$i++; $counter++;
	$branch[$bIndex][] = $data;
	if ($i == $index){
		$bIndex++;
		$i = 0;
	}
	if ($counter = 16 || $counter = 48 || $counter = 112){
		$index = $index * 2;
		$i = 0;
		$bindex = 0;
	}
	$data ++;
}
print_r($branch);
?>

