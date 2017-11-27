<?php 
	header ('Content-Type: text/plain; charset=utf-8');
	readfile ('../../output/' . $_GET['file']);
?> 