<?php
	
	$status = $_FILES["file"]["error"];
	if ($status == UPLOAD_ERR_OK) {
		$tmp_name = $_FILES["file"]["tmp_name"];
		$name = basename($_FILES["file"]["name"]);
		move_uploaded_file($tmp_name, "C:/xampp/htdocs/TCUconfig/upload/upload-" . $name);
	} else {
		$output = array("success" => false, "error" => "File konnte nicht hochgeladen werden");
		echo json_encode($output);		
		exit();
	}

	$ini_array = parse_ini_file("../../upload/upload-" . $name, true, INI_SCANNER_RAW);
	$output = array(
		"success" => true, 
		"ini_array" => $ini_array
	);

	echo json_encode($output);
?>