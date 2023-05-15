<?php 

 require 'vendor/autoload.php'; 
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception; 

require_once('conexion.php'); 
require_once('conexionmonedero.php'); 


//require_once('api.php');  

//require_once('cors.php');
 
seguros();
serviciosFecha();
serviciosOdometro();
dictamenes();
placas();
//seguros
//diario 
 function seguros(){
 
    //solo a marlene 
    $vehiculos = array();
    $conexion = new Conexion();
    $db = $conexion->getConexion();
    $hoy = date('Y-m-d'); 
    $hoy1 = date('Y-m-d', strtotime('-15 days')); 
    $fechavencimiento=date('Y-m-d', strtotime('+15 days'));
    $sqld = "SELECT t2.descripcion as nombrevehiculo, t1.vehiculoid as vehiculoid, t1.noseguro as noseguro, t1.fechafinal as fechafinal 
    FROM seguros t1 inner join vehiculos t2 on t1.vehiculoid = t2.vehiculoid 
    WHERE  t2.notificar = '1' order by t1.fechacaptura desc limit 1
    ";
    
    $consultad = $db->prepare($sqld);
    $consultad->execute();
    while($filau = $consultad->fetch()){
        $vehiculos[] = $filau;

    }
    //print_r($vehiculos);
    //obtener destinatarios 
    //y enviar correos 
    //tipo 1
    foreach($vehiculos as $v){
        if(($v["fechafinal"] <= $fechavencimiento) && ($v["fechafinal"] > $hoy1)){
            $selCorreo = "SELECT correo from correosvehiculo where vehiculoid = '".$v["vehiculoid"]."' and tipo = '1'";
            $consultac = $db->prepare($selCorreo);
                $consultac->execute();
                while($filac = $consultac->fetch()){
                    //enviar correo
                    $mensaje = "Aviso de vencimiento (seguro) ".$v["noseguro"]." vehiculo: ".$v["nombrevehiculo"]." para el día ".$v["fechafinal"].".";
                    correo($filac["correo"], $mensaje);
    
                }
        }
    }
        
        

}

//servicio x fecha proximo servicio
function serviciosFecha(){

    $vehiculos = array();
    $conexion = new Conexion();
    $db = $conexion->getConexion();
    $hoy = date('Y-m-d'); 
    $hoy1 = date('Y-m-d', strtotime('-15 days')); 
    $fechavencimiento=date('Y-m-d', strtotime('+15 days'));
    $sqld = "SELECT t2.descripcion as nombrevehiculo, t1.vehiculoid as vehiculoid, t1.servicio as servicio, t1.fechaproximo as fechaproximo 
    FROM servicios t1 inner join vehiculos t2 on t1.vehiculoid = t2.vehiculoid 
    WHERE DATE(t1.fechaproximo)  <= '".$fechavencimiento."' and date(t1.fechaproximo) > '".$hoy."'
    and t2.notificar = '1'
    ";
    
    $consultad = $db->prepare($sqld);
    $consultad->execute();
    while($filau = $consultad->fetch()){
        $vehiculos[] = $filau;

    }
    //print_r($vehiculos);
    //obtener destinatarios 
    //y enviar correos 
    //tipo 2
    foreach($vehiculos as $v){
        $selCorreo = "SELECT correo from correosvehiculo where vehiculoid = '".$v["vehiculoid"]."' and tipo = '2'";
        $consultac = $db->prepare($selCorreo);
            $consultac->execute();
            while($filac = $consultac->fetch()){
                //enviar correo
                $mensaje = "Aviso de vencimiento '".$v["servicio"]."' vehiculo: '".$v["nombrevehiculo"]."' para el día '".$v["fechaproximo"]."'";
                correo($filac["correo"], $mensaje);

            }
    }
}

//servicio x odometro 
function serviciosOdometro(){
    //por cada vehiculo 

    //obtener ultimo odometro registrado 

    //obtener ultimo odometro del ultimo servicio registrado 
    //tipo 3

    
    $vehiculos = array();
    $conexion = new Conexion();
    $db = $conexion->getConexion();
    $hoy = date('Y-m-d'); 
    $hoy1 = date('Y-m-d', strtotime('-15 days')); 
    $fechavencimiento=date('Y-m-d', strtotime('+15 days'));
    $sqld = "SELECT t1.kilometraje AS kilometrajeproximo,  t2.descripcion as nombrevehiculo, t1.vehiculoid as vehiculoid, t1.servicio as servicio, t1.fechaproximo as fechaproximo 
    FROM servicios t1 inner join vehiculos t2 on t1.vehiculoid = t2.vehiculoid 
    WHERE  t2.notificar = '1' and t1.kilometraje > 0
    ORDER BY fecha DESC limit 1 
    ";

    //echo $sqld;
    
    $consultad = $db->prepare($sqld);
    $consultad->execute();
    while($filau = $consultad->fetch()){
        $vehiculos[] = $filau;

    }
   // print_r($vehiculos);
    //obtener destinatarios 
    //y enviar correos 
    //tipo 4
    foreach($vehiculos as $v){
        $kilometrajeproximo = $v["kilometrajeproximo"];
        
        $odometro = "SELECT ifnull(kilometraje, 0) as kilometraje FROM carga   WHERE vehiculoid = '".$v["vehiculoid"]."' order by fechacarga desc limit 1";
        
        $consultao = $db->prepare($odometro);
        $consultao->execute();
        while($filao = $consultao->fetch()){
            $ultimokilometraje = $filao["kilometraje"];
        } 
       
        if($ultimokilometraje > $kilometrajeproximo){
          
            $selCorreo = "SELECT correo from correosvehiculo where vehiculoid = '".$v["vehiculoid"]."' and tipo = '3'";
            
            $consultac = $db->prepare($selCorreo);
                $consultac->execute();
                while($filac = $consultac->fetch()){
                    //enviar correo
                    $mensaje = "Aviso de KM excedido ".$ultimokilometraje." KM vehiculo: ".$v["nombrevehiculo"]." KM limite último servicio ".$kilometrajeproximo."";
                    correo($filac["correo"], $mensaje);
    
                }
        }
        //funcion establecer cada cuanto requiere servicio  notificacion desdde monedero 
    /*
        $odometro = "SELECT ifnull(odometro, 0) as odometro FROM vehiculos   WHERE idvehiculoflotilla = '".$v["vehiculoid"]."' AND controlaodometro = '1'";
        $consultao = $db->prepare($odometro);
        $consultao->execute();
        while($filao = $consultao->fetch()){
            $odometro = $filao["odometro"];
        }
        if($odometro != 0 && $odometro < ($odo + 10000)){
            $selCorreo = "SELECT correo from correosvehiculo where vehiculoid = '".$v["vehiculoid"]."' and tipo = '4'";
            $consultac = $db->prepare($selCorreo);
                $consultac->execute();
                while($filac = $consultac->fetch()){
                    //enviar correo
                    $mensaje = "Aviso de vencimiento '".$v["servicio"]."' vehiculo: '".$v["nombrevehiculo"]."' para el día '".$v["fechaproximo"]."'";
                    correo($filac["correo"], $mensaje);
    
                }
        }
        */
        
    }
}


//dictamenes (verificaciones)
function dictamenes(){
    $vehiculos = array();
    $conexion = new Conexion();
    $db = $conexion->getConexion();
    $hoy = date('Y-m-d'); 
    $hoy1 = date('Y-m-d', strtotime('-15 days')); 
    $fechavencimiento=date('Y-m-d', strtotime('+15 days'));
    $sqld = "SELECT t2.descripcion as nombrevehiculo, t1.vehiculoid as vehiculoid, t1.nombre as nombre, t1.fechafinal as fechafinal 
    FROM verificaciones t1 inner join vehiculos t2 on t1.vehiculoid = t2.vehiculoid 
    WHERE DATE(t1.fechafinal)  <= '".$fechavencimiento."' and date(t1.fechafinal) > '".$hoy."'
    and t2.notificar = '1'
    ";
    
    $consultad = $db->prepare($sqld);
    $consultad->execute();
    while($filau = $consultad->fetch()){
        $vehiculos[] = $filau;

    }
    //print_r($vehiculos);
    //obtener destinatarios 
    //y enviar correos 
    //tipo 4
    foreach($vehiculos as $v){
        $selCorreo = "SELECT correo from correosvehiculo where vehiculoid = '".$v["vehiculoid"]."' and tipo = '4'";
        $consultac = $db->prepare($selCorreo);
            $consultac->execute();
            while($filac = $consultac->fetch()){
                //enviar correo
                $mensaje = "Aviso de vencimiento '".$v["nombre"]."' vehiculo: '".$v["nombrevehiculo"]."' para el día '".$v["fechafinal"]."'";
                correo($filac["correo"], $mensaje);

            }
    }
}

//placas
function placas(){
    $vehiculos = array();
    $conexion = new Conexion();
    $db = $conexion->getConexion();
    $hoy = date('Y-m-d'); 
    $hoy1 = date('Y-m-d', strtotime('-15 days')); 
    $fechavencimiento=date('Y-m-d', strtotime('+15 days'));
    $sqld = "SELECT t2.descripcion as nombrevehiculo, t1.vehiculoid as vehiculoid, t1.placas as placas, t1.fechafinal as fechafinal 
    FROM placas t1 inner join vehiculos t2 on t1.vehiculoid = t2.vehiculoid 
    WHERE DATE(t1.fechafinal)  <= '".$fechavencimiento."' and date(t1.fechafinal) > '".$hoy."'
    and t2.notificar = '1'
    "; 
   
    $consultad = $db->prepare($sqld);
    $consultad->execute();
    while($filau = $consultad->fetch()){
        $vehiculos[] = $filau;

    }
    //print_r($vehiculos); 
    //obtener destinatarios 
    //y enviar correos 
    //tipo 5
    foreach($vehiculos as $v){
        $selCorreo = "SELECT correo from correosvehiculo where vehiculoid = '".$v["vehiculoid"]."' and  tipo = '5'";
        $consultac = $db->prepare($selCorreo);
            $consultac->execute();
            while($filac = $consultac->fetch()){
                //enviar correo
                $mensaje = "Aviso de vencimiento '".$v["placas"]."' vehiculo: '".$v["nombrevehiculo"]."' para el día '".$v["fechafinal"]."'";
                correo($filac["correo"], $mensaje);
                

            }
    }
}

//correo 

function correo($correo, $mensaje){
   // $address = array('desarrollosistemas@grupopetromar.com','auxdesarrollo@grupopetromar.com');
  
    $mail = new PHPMailer(true); 
    $mail->SMTPDebug;      
    $mail->CharSet = 'UTF-8'; 
    $mail->Encoding = 'base64'; 
    $mail->SetLanguage("es", 'includes/phpMailer/language/');  
 
    try {  
        $mail->IsMail();  
        $mail->SMTPAuth   = TRUE; 
        $mail->SMTPSecure = "ssl"; 
        $mail->Port       = 465; 
        $mail->Host       = "mail.grupopetromar.com"; 
        $mail->Username   = "desarrollosistemas@grupopetromar.com"; 
        $mail->Password   = "nAUZ3N4zMw&E"; 
  
        $mail->setFrom('desarrollosistemas@competro.mx', 'Grupo Petromar S.A. DE C.V'); 
           
    $mail->AddAddress($correo);   
        $mail->isHTML(true);                                  // Set email format to HTML 
        $mail->Subject = 'Información sistema de flotillas'; 
        $mail->Body    = '
        
        '.$mensaje.'
        
        
        '; 
        $mail->AltBody = ' ---- '; 
 
        if (!$mail->send()) { 
    //		echo 'Mailer Error: ' . $mail->ErrorInfo; 
        } else { 
        //	echo 'Message sent!'; 
        } 
 
    } catch (Exception $e) { 
     echo $e; 
    } 

 

}

 




?>