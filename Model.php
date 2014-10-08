<?php namespace Model;
include 'Dao.php';
use \Dao\Dao as Dao;

class Model{
	function writeToJson($userID){
		$result = Dao::fetchData($userID);
		//This will read result row by row
		while($row = mysqli_fetch_assoc($result)) { 
			//tier_id as key
			$tier_id = $row['tier'];
			$tier[$tier_id]['question_id'] = $row['question_id'];

			//question_id as key
			$question_id = $row['question_id']; 
			$question[$question_id]['question']  = $row['question'];
			$question[$question_id]['title']  = $row['title'];
			$question[$question_id]['image_id']  = $row['image_id'];
			$question[$question_id]['score']  = $row['score'];
			$question[$question_id]['parent']  = $row['parent'];
			$question[$question_id]['concept_name']  = $row['concept_name'];
		}
		//bind data
		$data['tier'] = $tier;
		$data['question'] = $question;
		$json_string = json_encode($data);
		$myArray = json_decode($json_string);
		//echo $myArray->{'tier'};
		$file = 'file.json';
		file_put_contents($file, $json_string);
   }
}
?>
