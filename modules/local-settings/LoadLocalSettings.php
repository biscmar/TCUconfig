<?php

//===================================================================================================================================================
//  Alte Files entfernen
//===================================================================================================================================================	
	
	foreach (glob("../../upload/upload-*.txt") as $filename) {
		if (preg_match('/' . date('Ymd') . '/', $filename) === 1) {
			continue;
		} else {
			unlink($filename);
		}
	}

//===================================================================================================================================================
//  Neues Config-File generieren
//===================================================================================================================================================

	$fileSuffix = date('YmdGis');

	$status = $_FILES["file"]["error"];
	if ($status == UPLOAD_ERR_OK) {
		$tmp_name = $_FILES["file"]["tmp_name"];
		move_uploaded_file($tmp_name, "../../upload/upload-" . $fileSuffix . ".txt");
	} else {
		$output = array("success" => false, "error" => "File konnte nicht hochgeladen werden");
		echo json_encode($output);		
		exit();
	}

	$ini_array = parse_ini_file("../../upload/upload-" . $fileSuffix . ".txt", true, INI_SCANNER_RAW);
	$output = array(
		"success" => true, 
		"ini_array" => $ini_array
	);

	echo json_encode($output);
?>