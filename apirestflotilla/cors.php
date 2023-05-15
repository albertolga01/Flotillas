<?php
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: X-API.KEY, Origin, Authorization, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
header("Allow: GET, POST, OPTIONS, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Disposition, Content-Type, Content-Length, Accept-Encoding");
header("Content-type:application/json");
header("connection:keep-alive");

$allowedOrigins = [
    'http://localhost:3000',
    'http://192.168.1.89:3000',
    'http://192.168.1.88:3000',
    'https://actividades.grupopetromar.com',  
    'https://compras.grupopetromar.com'  
 ];
  
 if(in_array($_SERVER['HTTP_ORIGIN'], $allowedOrigins))
 {
  $http_origin = $_SERVER['HTTP_ORIGIN'];
 } else {
  $http_origin = "http://localhost:3000";
 }
 header("Access-Control-Allow-Origin: $http_origin");

//header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Credentials: true");
?> 

 

