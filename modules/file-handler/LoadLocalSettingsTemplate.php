<?php

	$ini_array = parse_ini_file("../../templates/system-config-template.txt", true, INI_SCANNER_RAW);
	$output = array(
		"success" => true, 
		"ini_array" => $ini_array
	);

	echo json_encode($output);
?>