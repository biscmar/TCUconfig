<?php

//===================================================================================================================================================
//  Alte txt-Files aus dem Output-Verzeichnis entfernen
//===================================================================================================================================================	
	
	foreach (glob("../../output/system-config_*.txt") as $filename) {
		if (preg_match('/' . date('Ymd') . '/', $filename) === 1) {
			continue;
		} else {
			unlink($filename);
		}
	}

//===================================================================================================================================================
//  Neues Config-File generieren
//===================================================================================================================================================

	$ini_preset = parse_ini_file("system-config-preset.txt", true, INI_SCANNER_RAW);
	
	$fileSuffix = date('YmdGis');
	$fileLocation = getenv("DOCUMENT_ROOT") . '/TCUconfig/output/system-config_' . $fileSuffix . '.txt';
	$file = fopen($fileLocation, "w");

	// Abschlitt [General]
	fwrite($file, "[General]" . PHP_EOL);
	$GeneralData = $_POST['GeneralData'];

	foreach ($GeneralData as $key => $value) {
		fwrite($file, $key . "=" . $value . PHP_EOL);
	}

	fwrite($file, PHP_EOL);
	
	// Abschlitt [Shortcuts]
	$ShortcutData = $_POST['ShortcutData'];

	foreach ($ShortcutData as $section => $content) {
		fwrite($file, "[" . $section . "]" . PHP_EOL);
	 	
		foreach ($content as $key => $value) {
	 		fwrite($file, $key . "=" . $value . PHP_EOL);
		}

		fwrite($file, PHP_EOL);
	}
	
	// Abschlitt [Cards]
	$CardData = $_POST['CardData'];

	foreach ($CardData as $section => $content) {
		fwrite($file, "[" . $section . "]" . PHP_EOL);
	 	
		foreach ($content as $key => $value) {
	 		fwrite($file, $key . "=" . $value . PHP_EOL);
		}

		fwrite($file, PHP_EOL);
	}
	
	// Abschlitt [Sponsors]
	$SponsorData = $_POST['SponsorData'];

	foreach ($SponsorData as $section => $content) {
		fwrite($file, "[" . $section . "]" . PHP_EOL);
	 	
		foreach ($content as $key => $value) {
	 		fwrite($file, $key . "=" . $value . PHP_EOL);
		}

		fwrite($file, PHP_EOL);
	}
	
	// Abschlitt [Hidden]
	fwrite($file, "[Hidden]" . PHP_EOL);

	foreach ($ini_preset["Hidden"] as $key => $value) {
 		fwrite($file, $key . "=" . $value . PHP_EOL);
	}

	fwrite($file, PHP_EOL);

	fwrite($file, "[LastLineInConfig]");
	fclose($file);

	$path = $_SERVER["HTTP_HOST"] . '/TCUconfig/output/';
	$file = 'system-config_' . $fileSuffix . '.txt';

	if (isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] != 'off') {
		$return = array(
			"protocol" => "https://",
			"path" => $path,
			"file" => $file
		);
    } else {
		$return = array(
			"protocol" => "http://",
			"path" => $path,
			"file" => $file
		);
    }

	echo json_encode($return);
?>