<?php
	
	$fileLocation = getenv("DOCUMENT_ROOT") . '/TCUconfig/output/game-config.txt';
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

	foreach ($HomeTeamData["HomeTeamLineup"] as $number => $name) {
		fwrite($file, $number . "=" . $name . PHP_EOL);
	}

	fwrite($file, "HomeTeamLong=" . $HomeTeamData['HomeTeamLong'] . PHP_EOL);
	fwrite($file, "HomeTeamShort=" . $HomeTeamData['HomeTeamShort'] . PHP_EOL);
	fwrite($file, "HomeHeadcoach=" . $HomeTeamData['HomeHeadcoach'] . PHP_EOL);
	fwrite($file, "HomeStarting6=" . $HomeTeamData['HomeStarting6'] . PHP_EOL . PHP_EOL);
	
	// Abschlitt [Away]
	fwrite($file, "[Away]" . PHP_EOL);
	
	$AwayTeamData = $_POST['AwayTeamData'];

	foreach ($AwayTeamData["AwayTeamLineup"] as $number => $name) {
		fwrite($file, $number . "=" . $name . PHP_EOL);
	}

	fwrite($file, "AwayTeamLong=" . $AwayTeamData['AwayTeamLong'] . PHP_EOL);
	fwrite($file, "AwayTeamShort=" . $AwayTeamData['AwayTeamShort'] . PHP_EOL);
	fwrite($file, "AwayHeadcoach=" . $AwayTeamData['AwayHeadcoach'] . PHP_EOL);
	fwrite($file, "AwayStarting6=" . $AwayTeamData['AwayStarting6'] . PHP_EOL . PHP_EOL);

	fwrite($file, "[LastLineInConfig]");
	fclose($file);

	if (isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] != 'off') {
		echo 'https://' . $_SERVER["HTTP_HOST"] . '/TCUconfig/output/game-config.txt';
    } else {
		echo 'http://' . $_SERVER["HTTP_HOST"] . '/TCUconfig/output/game-config.txt';
    }

?>