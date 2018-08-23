<?php

    require "../../lib/SimpleImage.php";

//===================================================================================================================================================
//  Alte png-Files aus dem Output-Verzeichnis entfernen
//===================================================================================================================================================	
	
	foreach (glob("../../output/*-thumbnail_*.png") as $filename) {
		if (preg_match('/' . date('Ymd') . '/', $filename) === 1) {
			continue;
		} else {
			unlink($filename);
		}
	}

//===================================================================================================================================================
//  Neues png-File generieren
//===================================================================================================================================================
	
	$fileSuffix = date('YmdGis');

	$image = new \claviska\SimpleImage();
	$image->fromFile("../../templates/game-thumbnail.png"); 
	
	
	$HomeTeamData = $_POST['HomeTeamData']; 
        file_put_contents("../../output/home-thumbnail_" . $fileSuffix . ".png", file_get_contents($HomeTeamData['HomeTeamLogo']));
        
        $AwayTeamData = $_POST['AwayTeamData']; 
        file_put_contents("../../output/away-thumbnail_" . $fileSuffix . ".png", file_get_contents($AwayTeamData['AwayTeamLogo']));
        
        $home = new \claviska\SimpleImage();
        $home->fromFile("../../output/home-thumbnail_" . $fileSuffix . ".png"); 
        $home->resize(220);
        
	$away = new \claviska\SimpleImage();
        $away->fromFile("../../output/away-thumbnail_" . $fileSuffix . ".png"); 
        $away->resize(220);
        
        $image->overlay($home, 'top left', 1, 239, 207);
	$image->overlay($away, 'top left', 1, 819, 207);
        
	$image->toFile("../../output/game-thumbnail_" . $fileSuffix . ".png", 'image/png');

        $path = $_SERVER["HTTP_HOST"] . '/' . $_POST['OutputDirectory'] . '/';
	$file = 'game-thumbnail_' . $fileSuffix . '.png';

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

