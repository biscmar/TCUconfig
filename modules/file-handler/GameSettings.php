<?php

//===================================================================================================================================================
//  Alte txt-Files aus dem Output-Verzeichnis entfernen
//===================================================================================================================================================	
	
	foreach (glob("../../output/game-config_*.txt") as $filename) {
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
	$fileLocation = getenv("DOCUMENT_ROOT") . '/' . $_POST['OutputDirectory'] . '/game-config_' . $fileSuffix . '.txt';
	$file = fopen($fileLocation, "w");

	// Abschlitt [Game]
	fwrite($file, "[Game]" . PHP_EOL);
	fwrite($file, "GameNr=" . $_POST['GameNr'] . PHP_EOL);
	fwrite($file, "Title=" . $_POST['Title'] . PHP_EOL);
	fwrite($file, "Date=" . $_POST['Date'] . PHP_EOL);
	fwrite($file, "Time=" . $_POST['Time'] . PHP_EOL);
	fwrite($file, "Location=" . $_POST['Location'] . PHP_EOL);
	fwrite($file, "Referee1=" . $_POST['Referee1'] . PHP_EOL);
	fwrite($file, "Referee2=" . $_POST['Referee2'] . PHP_EOL);
	fwrite($file, "Commentator1=" . $_POST['Commentator1'] . PHP_EOL);
	fwrite($file, "Commentator2=" . $_POST['Commentator2'] . PHP_EOL . PHP_EOL);
	
	// Abschlitt [Home]
	fwrite($file, "[Home]" . PHP_EOL);
	
	$HomeTeamData = $_POST['HomeTeamData'];

	foreach ($HomeTeamData["HomeTeamLineup"]['roster'] as $number => $name) {
		$nr = $number == 0 ? '00' : $number;
		if (strlen($name) != 0) {
			fwrite($file, $nr . "=" . $name . PHP_EOL);
		}
	}

	fwrite($file, "TeamLong=" . $HomeTeamData['HomeTeamLong'] . PHP_EOL);
	fwrite($file, "TeamShort=" . $HomeTeamData['HomeTeamShort'] . PHP_EOL);
	fwrite($file, "Coach=" . $HomeTeamData['HomeCoach'] . PHP_EOL);
	fwrite($file, "Starting6=" . $HomeTeamData['HomeTeamLineup']['startingSix'] . PHP_EOL);

	if ($HomeTeamData['HomeTeamLineup']['line1'] != null) { fwrite($file, "Line1=" . $HomeTeamData['HomeTeamLineup']['line1'] . PHP_EOL); }
	if ($HomeTeamData['HomeTeamLineup']['line2'] != null) { fwrite($file, "Line2=" . $HomeTeamData['HomeTeamLineup']['line2'] . PHP_EOL); }
	if ($HomeTeamData['HomeTeamLineup']['line3'] != null) { fwrite($file, "Line3=" . $HomeTeamData['HomeTeamLineup']['line3'] . PHP_EOL); }
	if ($HomeTeamData['HomeTeamLineup']['line4'] != null) { fwrite($file, "Line4=" . $HomeTeamData['HomeTeamLineup']['line4'] . PHP_EOL); }
	if ($HomeTeamData['HomeTeamLineup']['goal'] != null) { fwrite($file, "Goal=" . $HomeTeamData['HomeTeamLineup']['goal'] . PHP_EOL); }
	
	// Abschlitt [Away]
	fwrite($file, PHP_EOL);
	fwrite($file, "[Away]" . PHP_EOL);
	
	$AwayTeamData = $_POST['AwayTeamData'];

	foreach ($AwayTeamData["AwayTeamLineup"]['roster'] as $number => $name) {
		$nr = $number == 0 ? '00' : $number;
		if (strlen($name) != 0) {
			fwrite($file, $nr . "=" . $name . PHP_EOL);
		}
	}

	fwrite($file, "TeamLong=" . $AwayTeamData['AwayTeamLong'] . PHP_EOL);
	fwrite($file, "TeamShort=" . $AwayTeamData['AwayTeamShort'] . PHP_EOL);
	fwrite($file, "Coach=" . $AwayTeamData['AwayCoach'] . PHP_EOL);
	fwrite($file, "Starting6=" . $AwayTeamData['AwayTeamLineup']['startingSix'] . PHP_EOL);

	if ($AwayTeamData['AwayTeamLineup']['line1'] != null) { fwrite($file, "Line1=" . $AwayTeamData['AwayTeamLineup']['line1'] . PHP_EOL); }
	if ($AwayTeamData['AwayTeamLineup']['line2'] != null) { fwrite($file, "Line2=" . $AwayTeamData['AwayTeamLineup']['line2'] . PHP_EOL); }
	if ($AwayTeamData['AwayTeamLineup']['line3'] != null) { fwrite($file, "Line3=" . $AwayTeamData['AwayTeamLineup']['line3'] . PHP_EOL); }
	if ($AwayTeamData['AwayTeamLineup']['line4'] != null) { fwrite($file, "Line4=" . $AwayTeamData['AwayTeamLineup']['line4'] . PHP_EOL); }
	if ($AwayTeamData['AwayTeamLineup']['goal'] != null) { fwrite($file, "Goal=" . $AwayTeamData['AwayTeamLineup']['goal'] . PHP_EOL); }

	fwrite($file, PHP_EOL);
	fwrite($file, "[Game-Config]" . PHP_EOL);
	fwrite($file, "[LastLineInConfig]");
	fclose($file);

	$path = $_SERVER["HTTP_HOST"] . '/' . $_POST['OutputDirectory'] . '/';
	$file = 'game-config_' . $fileSuffix . '.txt';

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