<?php 
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
header("Allow: GET, POST, OPTIONS, PUT, DELETE");

class Conexion1 {
public function getConexionMonedero(){
$host = "162.214.97.39";
$db = "jkmpg7ol_monedero";
$user = "jkmpg7ol_sistemas"; 
$password = "5R3U6vvQWI0a";

$db = new PDO("mysql:host=$host;dbname=$db;", $user, $password);

return $db;

}


}



?>