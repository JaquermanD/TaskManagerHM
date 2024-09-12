<?php 
require_once "../config.php";
//----------------------------------------
$action = $_POST['_action'];
switch ($action) {
    case 'READ':
        getTasks();
    break;
    case 'CREATE':
        saveTask();
    break;
    default:
        echo json_encode("Error en obtener los datos");
    break;
}
//----------------------------------------
function getTasks(){
    $data = query("SELECT id,text,status FROM tasks");
    echo json_encode($data);
}

function saveTask(){
    $data = query("");
    echo json_encode($data);
}
