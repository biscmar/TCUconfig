<?php

function  getGameSettings() {
    $curl = curl_init();
    curl_setopt_array($curl, [
        CURLOPT_URL            => $_POST['ApiUrl'] . $_POST['GameNr'] . $_POST['ApiParams'],
        CURLOPT_CUSTOMREQUEST  => "GET",
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_SSL_VERIFYHOST => false,
        CURLOPT_SSL_VERIFYPEER => false
    ]);
    $response = curl_exec($curl);
    $statuscode = curl_getinfo($curl, CURLINFO_HTTP_CODE);
    curl_close($curl);
    return [ 'statuscode' => $statuscode, 'response' => $response ];
}

echo json_encode( getGameSettings() );

?>