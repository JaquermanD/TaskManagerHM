<?php

$host = "localhost";
$dbname = "taskmanager";
$user = "root";
$pass = "";

$dsn = 'mysql:host=' . $host . ';dbname=' . $dbname . ';charset=utf8';
        $options = [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_EMULATE_PREPARES => false,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            PDO::ATTR_PERSISTENT => true
        ];

$db = new PDO($dsn, $user, $pass, $options);

function query($query){
    global $db;
    $stm = $db->prepare($query);
    $stm->execute();
    return $stm->fetchAll(PDO::FETCH_ASSOC);
}
