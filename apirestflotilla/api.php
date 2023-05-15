<?php 

header('Access-Control-Allow-Origin: *');

header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method");

header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");

header("Allow: GET, POST, OPTIONS, PUT, DELETE");





class Api{
  
  public function obtenerCorreos($vehiculoid){



    $refacciones = array();
    $conexion = new Conexion();
    $db = $conexion->getConexion();
    $sqld = "SELECT t1.folio, t1.vehiculoid, t1.correo, t2.tipo FROM correosvehiculo t1 
    inner join tipocorreo t2 on t1.tipo = t2.folio 
    where t1.vehiculoid = '".$vehiculoid."'";
    
    $consultad = $db->prepare($sqld);
    $consultad->execute();
    while($filau = $consultad->fetch()){

        $refacciones[] = array(

          "folio" => $filau['folio'],
          "vehiculoid" => $filau['vehiculoid'],
          "correo" => $filau['correo'],
          "tipo" => $filau['tipo']
        );

    }
        return $refacciones;

    }

    public function obtenerUsuariosVehiculo($vehiculoid){



      $refacciones = array();
      $conexion = new Conexion();
      $db = $conexion->getConexion();
      $sqld = "SELECT t1.folio, t1.vehiculoid, t1.userid, t3.descripcion as vehiculo, t2.name, t2.usuario FROM usuariosvehiculos t1 
     inner join usuarios t2 on t1.userid = t2.userid 
     inner join vehiculos t3 on t1.vehiculoid = t3.vehiculoid 
      where t1.vehiculoid = '".$vehiculoid."'";
      
      $consultad = $db->prepare($sqld);
      $consultad->execute();
      while($filau = $consultad->fetch()){
  
          $refacciones[] = array(
  
            "folio" => $filau['folio'],
            "vehiculoid" => $filau['vehiculoid'],
            "vehiculo" => $filau['vehiculo'],
            "name" => $filau['name'],
            "usuario" => $filau['usuario']
          );
  
      }
          return $refacciones;
  
      }


    public function obtenerTiposCorreos(){



      $refacciones = array();
      $conexion = new Conexion();
      $db = $conexion->getConexion();
      $sqld = "SELECT folio, tipo FROM tipocorreo";
     
      $consultad = $db->prepare($sqld);
      $consultad->execute();
      while($filau = $consultad->fetch()){
  
          $refacciones[] = array( 
            "folio" => $filau['folio'],
            "tipo" => $filau['tipo']   
          );
  
      }
          return $refacciones;
  
      }
      public function obtenerFlotillas(){



        $refacciones = array();
        $conexion = new Conexion();
        $db = $conexion->getConexion();
        $sqld = "SELECT idflotilla, nombre FROM flotilla";
       
        $consultad = $db->prepare($sqld);
        $consultad->execute();
        while($filau = $consultad->fetch()){
    
            $refacciones[] = array( 
              "idflotilla" => $filau['idflotilla'],
              "nombre" => $filau['nombre']   
            );
    
        }
            return $refacciones;
    
        }
      


  public function verRendimiento($vehiculoid){



    $refacciones = array();
    $conexion = new Conexion();
    $db = $conexion->getConexion();
    $sqld = "SELECT t1.ticket, t1.folio, t1.fechacarga, t1.kilometraje, t1.kilometrajefinal, t1.litros, t1.importe, t2.descripcion as vehiculo FROM carga t1 inner join vehiculos t2 on t1.vehiculoid = t2.vehiculoid where t1.vehiculoid = '".$vehiculoid."' order by fechacarga desc";
    
    $consultad = $db->prepare($sqld);
    $consultad->execute();
    while($filau = $consultad->fetch()){

        $refacciones[] = array(

          "folio" => $filau['folio'],
          "fechacarga" => $filau['fechacarga'],
          "kilometraje" => $filau['kilometraje'],
          "kilometrajefinal" => $filau['kilometrajefinal'],
          "litros" => $filau['litros'],
          "importe" => $filau['importe'],
          "vehiculo" => $filau['vehiculo'],
          "ticket" => $filau['ticket']
        );

    }
        return $refacciones;

    }
  public function verRefacciones($vehiculoid){



    $refacciones = array();
    $conexion = new Conexion();
    $db = $conexion->getConexion();
    $sqld = "SELECT  t1.folio, t1.fechacompra, t1.fecha, t1.refaccion, t1.descripcion, t1.precio, t2.descripcion as vehiculo FROM refacciones t1 inner join vehiculos t2 on t1.vehiculoid = t2.vehiculoid where t1.vehiculoid = '".$vehiculoid."' order by fechacompra desc limit 100 ";
    
    $consultad = $db->prepare($sqld);
    $consultad->execute();
    while($filau = $consultad->fetch()){

        $refacciones[] = array(

          "folio" => $filau['folio'],
          "fechacompra" => $filau['fechacompra'],
          "fecha" => $filau['fecha'],
          "refaccion" => $filau['refaccion'],
          "descripcion" => $filau['descripcion'],
          "precio" => $filau['precio'],
          "vehiculo" => $filau['vehiculo']
        );

    }
        return $refacciones;

    }

  public function verSeguro($vehiculoid){



    $refacciones = array();
    $conexion = new Conexion();
    $db = $conexion->getConexion();
    $sqld = "SELECT t1.folio, t1.vehiculoid, t1.noseguro, t1.compania, t1.fechainicial, t1.fechafinal, t1.fechacaptura, t2.descripcion as vehiculo FROM seguros t1  inner join vehiculos t2 on t1.vehiculoid = t2.vehiculoid where t1.vehiculoid = '".$vehiculoid."' ";
    
    $consultad = $db->prepare($sqld);
    $consultad->execute();
    while($filau = $consultad->fetch()){

        $refacciones[] = array(

          "folio" => $filau['folio'],
          "vehiculoid" => $filau['vehiculoid'],
          "noseguro" => $filau['noseguro'],
          "compania" => $filau['compania'],
          "fechainicial" => $filau['fechainicial'],
          "fechafinal" => $filau['fechafinal'],
          "fechacaptura" => $filau['fechacaptura'],
            "vehiculo" => $filau['vehiculo']
        );

    }
        return $refacciones;

    }

  public function verVehiculo($vehiculoid){



    $refacciones = array();
    $conexion = new Conexion();
    $db = $conexion->getConexion();
    $sqld = "SELECT t1.folio, t1.vehiculoid, t1.placas, t1.fechainicial, t1.fechafinal, t1.fechacaptura, t2.descripcion as vehiculo FROM placas t1  inner join vehiculos t2 on t1.vehiculoid = t2.vehiculoid where t1.vehiculoid = '".$vehiculoid."' ";
    
    $consultad = $db->prepare($sqld);
    $consultad->execute();
    while($filau = $consultad->fetch()){

        $refacciones[] = array(

          "folio" => $filau['folio'],
          "vehiculoid" => $filau['vehiculoid'],
          "placas" => $filau['placas'],
          "fechainicial" => $filau['fechainicial'],
          "fechafinal" => $filau['fechafinal'],
          "fechacaptura" => $filau['fechacaptura'],
            "vehiculo" => $filau['vehiculo']
        );

    }
        return $refacciones;

    }

    public function gastosVehiculo($vehiculoid, $fechainicial, $fechafinal, $userid, $tipo){
      
    $refacciones = array();
    $conexion = new Conexion();
    $db = $conexion->getConexion();

    if($tipo == "2"){
      if($vehiculoid == "0"){
        if($fechainicial != "" && $fechafinal != ""){
          $sqld = "SELECT t1.modelo, t1.numvehiculo, t1.descripcion as vehiculo,   t1.vehiculoid, t2.fecha, t2.precio, t2.descripcion 
          FROM vehiculos t1  
          inner join refacciones t2 on t1.vehiculoid = t2.vehiculoid  
          inner join usuariosvehiculos t6 on t1.vehiculoid = t6.vehiculoid 
          where 
          DATE(t2.fecha) >= '".$fechainicial."' and DATE(t2.fecha) <= '".$fechafinal."' and t6.userid = '".$userid."'
          "; 
        }else{
          $sqld = "SELECT t1.modelo, t1.numvehiculo, t1.descripcion as vehiculo,   t1.vehiculoid, t2.fecha, t2.precio, t2.descripcion 
          FROM vehiculos t1  
          inner join refacciones t2 on t1.vehiculoid = t2.vehiculoid  
          inner join usuariosvehiculos t6 on t1.vehiculoid = t6.vehiculoid 
          where  t6.userid = '".$userid."'
          "; 
        }
       
      }else{
        if($fechainicial != "" && $fechafinal != ""){
          $sqld = "SELECT t1.modelo, t1.numvehiculo, t1.descripcion as vehiculo,   t1.vehiculoid, t2.fecha, t2.precio, t2.descripcion 
          FROM vehiculos t1  
          inner join refacciones t2 on t1.vehiculoid = t2.vehiculoid  
          inner join usuariosvehiculos t6 on t1.vehiculoid = t6.vehiculoid 
          where t1.vehiculoid = '".$vehiculoid."' 
          and DATE(t2.fecha) >= '".$fechainicial."' and DATE(t2.fecha) <= '".$fechafinal."' and t6.userid = '".$userid."'
          "; 
        }else{
          $sqld = "SELECT t1.modelo, t1.numvehiculo, t1.descripcion as vehiculo,   t1.vehiculoid, t2.fecha, t2.precio, t2.descripcion 
          FROM vehiculos t1  
          inner join refacciones t2 on t1.vehiculoid = t2.vehiculoid  
          inner join usuariosvehiculos t6 on t1.vehiculoid = t6.vehiculoid 
          where t1.vehiculoid = '".$vehiculoid."'  and t6.userid = '".$userid."'
          "; 
        }
      
      }
    }else{
      if($vehiculoid == "0"){
        if($fechainicial != "" && $fechafinal != ""){
          $sqld = "SELECT t1.modelo, t1.numvehiculo, t1.descripcion as vehiculo,   t1.vehiculoid, t2.fecha, t2.precio, t2.descripcion 
          FROM vehiculos t1  
          inner join refacciones t2 on t1.vehiculoid = t2.vehiculoid  
          where 
          DATE(t2.fecha) >= '".$fechainicial."' and DATE(t2.fecha) <= '".$fechafinal."'
          "; 
        }else{
          $sqld = "SELECT t1.modelo, t1.numvehiculo, t1.descripcion as vehiculo,   t1.vehiculoid, t2.fecha, t2.precio, t2.descripcion 
          FROM vehiculos t1  
          inner join refacciones t2 on t1.vehiculoid = t2.vehiculoid  
          
          "; 
        }
       
      }else{
        if($fechainicial != "" && $fechafinal != ""){
          $sqld = "SELECT t1.modelo, t1.numvehiculo, t1.descripcion as vehiculo,   t1.vehiculoid, t2.fecha, t2.precio, t2.descripcion 
          FROM vehiculos t1  
          inner join refacciones t2 on t1.vehiculoid = t2.vehiculoid  
          where t1.vehiculoid = '".$vehiculoid."' 
          and DATE(t2.fecha) >= '".$fechainicial."' and DATE(t2.fecha) <= '".$fechafinal."'
          "; 
        }else{
          $sqld = "SELECT t1.modelo, t1.numvehiculo, t1.descripcion as vehiculo,   t1.vehiculoid, t2.fecha, t2.precio, t2.descripcion 
          FROM vehiculos t1  
          inner join refacciones t2 on t1.vehiculoid = t2.vehiculoid  
          where t1.vehiculoid = '".$vehiculoid."' 
          "; 
        }
      
      }
    }
    

   
    
    $consultad = $db->prepare($sqld);
    $consultad->execute();
    while($filau = $consultad->fetch()){
     
        $refacciones[] = array(
          "vehiculoid" => $filau['vehiculoid'],
          "vehiculo" => $filau['vehiculo'],
          "descripcion" => $filau['descripcion'],
          "precio" => $filau['precio'],
          "fecha" => $filau['fecha'], 
          "modelo" => $filau['modelo'], 
          "numvehiculo" => $filau['numvehiculo'] 
        );

    }
        return $refacciones;

    }

    public function accesoriosVehiculo($vehiculoid, $fechainicial, $fechafinal, $userid, $tipo){
      
      $refacciones = array();
      $conexion = new Conexion();
      $db = $conexion->getConexion();
  
      if($tipo == "2"){
        if($vehiculoid == "0"){
          if($fechainicial != "" && $fechafinal != ""){
            $sqld = "SELECT t2.proveedor, t2.accesorio, t1.modelo, t1.numvehiculo, t1.descripcion as vehiculo,   t1.vehiculoid, t2.fechacompra as fecha, t2.precio, t2.descripcion 
            FROM vehiculos t1  
            inner join accesorios t2 on t1.vehiculoid = t2.vehiculoid  
            inner join usuariosvehiculos t6 on t1.vehiculoid = t6.vehiculoid 
            where 
            DATE(t2.fecha) >= '".$fechainicial."' and DATE(t2.fecha) <= '".$fechafinal."' and t6.userid = '".$userid."'
            "; 
          }else{
            $sqld = "SELECT t2.proveedor, t2.accesorio, t1.modelo, t1.numvehiculo, t1.descripcion as vehiculo,   t1.vehiculoid, t2.fechacompra as fecha, t2.precio, t2.descripcion 
            FROM vehiculos t1  
            inner join accesorios t2 on t1.vehiculoid = t2.vehiculoid  
            inner join usuariosvehiculos t6 on t1.vehiculoid = t6.vehiculoid 
            where  t6.userid = '".$userid."'
            "; 
          }
         
        }else{
          if($fechainicial != "" && $fechafinal != ""){
            $sqld = "SELECT t2.proveedor, t2.accesorio, t1.modelo, t1.numvehiculo, t1.descripcion as vehiculo,   t1.vehiculoid, t2.fechacompra as fecha, t2.precio, t2.descripcion 
            FROM vehiculos t1  
            inner join accesorios t2 on t1.vehiculoid = t2.vehiculoid  
            inner join usuariosvehiculos t6 on t1.vehiculoid = t6.vehiculoid 
            where t1.vehiculoid = '".$vehiculoid."' 
            and DATE(t2.fecha) >= '".$fechainicial."' and DATE(t2.fecha) <= '".$fechafinal."' and t6.userid = '".$userid."'
            "; 
          }else{
            $sqld = "SELECT t2.proveedor, t2.accesorio, t1.modelo, t1.numvehiculo, t1.descripcion as vehiculo,   t1.vehiculoid, t2.fechacompra as fecha, t2.precio, t2.descripcion 
            FROM vehiculos t1  
            inner join accesorios t2 on t1.vehiculoid = t2.vehiculoid  
            inner join usuariosvehiculos t6 on t1.vehiculoid = t6.vehiculoid 
            where t1.vehiculoid = '".$vehiculoid."'  and t6.userid = '".$userid."'
            "; 
          }
        
        }
      }else{
        if($vehiculoid == "0"){
          if($fechainicial != "" && $fechafinal != "" ){
            
            $sqld = "SELECT t2.proveedor, t2.accesorio, t1.modelo, t1.numvehiculo, t1.descripcion as vehiculo,   t1.vehiculoid, t2.fechacompra as fecha, t2.precio, t2.descripcion 
            FROM vehiculos t1  
            inner join accesorios t2 on t1.vehiculoid = t2.vehiculoid  
            where 
            DATE(t2.fecha) >= '".$fechainicial."' and DATE(t2.fecha) <= '".$fechafinal."'
            "; 
            echo $fechainicial;
          }else{
            $sqld = "SELECT t2.proveedor, t2.accesorio, t1.modelo, t1.numvehiculo, t1.descripcion as vehiculo,   t1.vehiculoid, t2.fechacompra as fecha, t2.precio, t2.descripcion 
            FROM vehiculos t1  
            inner join accesorios t2 on t1.vehiculoid = t2.vehiculoid  
            
            "; 
          }
         //echo $sqld;
        }else{
          if($fechainicial != "" && $fechafinal != ""){
            $sqld = "SELECT t2.proveedor, t2.accesorio, t1.modelo, t1.numvehiculo, t1.descripcion as vehiculo,   t1.vehiculoid, t2.fechacompra as fecha, t2.precio, t2.descripcion 
            FROM vehiculos t1  
            inner join accesorios t2 on t1.vehiculoid = t2.vehiculoid  
            where t1.vehiculoid = '".$vehiculoid."' 
            and DATE(t2.fecha) >= '".$fechainicial."' and DATE(t2.fecha) <= '".$fechafinal."'
            "; 
          }else{
            $sqld = "SELECT t2.proveedor, t2.accesorio, t1.modelo, t1.numvehiculo, t1.descripcion as vehiculo,   t1.vehiculoid, t2.fechacompra as fecha, t2.precio, t2.descripcion 
            FROM vehiculos t1  
            inner join accesorios t2 on t1.vehiculoid = t2.vehiculoid  
            where t1.vehiculoid = '".$vehiculoid."' 
            "; 
          }
        
        }
      }

     
      
  
     
      
      $consultad = $db->prepare($sqld);
      $consultad->execute();
      while($filau = $consultad->fetch()){
       
          $refacciones[] = array(
            "vehiculoid" => $filau['vehiculoid'],
            "vehiculo" => $filau['vehiculo'],
            "descripcion" => $filau['descripcion'],
            "precio" => $filau['precio'],
            "fecha" => $filau['fecha'], 
            "modelo" => $filau['modelo'], 
            "numvehiculo" => $filau['numvehiculo'], 
            "proveedor" => $filau['proveedor'], 
            "accesorio" => $filau['accesorio'] 
          );
  
      }
          return $refacciones;
  
      }

    public function gastosVehiculoServicios($vehiculoid, $fechainicial, $fechafinal, $userid,$tipo){

      if($fechainicial == ""){

      }else{
        $fi = "and DATE(t2.fecha) >= '".$fechainicial."'";
      }
      if($fechafinal == ""){

      }else{
        $ff = "and DATE(t2.fecha) <= '".$fechafinal."'";
      }
      if($vehiculoid == "0"){

      }else{
        $v = "and t1.vehiculoid = '".$vehiculoid."'";
      }
  
      $refacciones = array();
      $conexion = new Conexion();
      $db = $conexion->getConexion();
      if($tipo == "2"){
        $sqld = "SELECT t1.descripcion as vehiculo,   t1.vehiculoid, t2.fecha, t2.precio, t2.descripcion 
        FROM vehiculos t1  
        inner join servicios t2 on t1.vehiculoid = t2.vehiculoid  
        inner join usuariosvehiculos t6 on t1.vehiculoid = t6.vehiculoid 
        where t1.vehiculoid is not null 
        and t6.userid = '".$userid."'
        ".$v." 
        ".$fi."  
        ".$ff."
        ";
      }else{
        $sqld = "SELECT t1.descripcion as vehiculo,   t1.vehiculoid, t2.fecha, t2.precio, t2.descripcion 
        FROM vehiculos t1  
        inner join servicios t2 on t1.vehiculoid = t2.vehiculoid  
        where t1.vehiculoid is not null 
        ".$v." 
        ".$fi."  
        ".$ff."
        ";
      }
        
      $consultad = $db->prepare($sqld);
      $consultad->execute();
      while($filau = $consultad->fetch()){
       
          $refacciones[] = array(
            "vehiculoid" => $filau['vehiculoid'],
            "vehiculo" => $filau['vehiculo'],
            "descripcion" => $filau['descripcion'],
            "precio" => $filau['precio'],
            "fecha" => $filau['fecha'] 
          );
  
      }
          return $refacciones;
  
      }


  public function getRefaccionesDia($fecha, $idflotilla, $fechafinal, $vehiculo, $userid, $tipo){



    $refacciones = array();
    $conexion = new Conexion();
    $db = $conexion->getConexion();
    $v = "";
    if($vehiculo == "0"){

    }else{
      $v = "and t2.vehiculoid = '".$vehiculo."'";
    }

    if($tipo == "2"){
      $sqld = "SELECT t1.foliooc, t1.folio, t1.fechacompra, t1.fecha, t1.refaccion, t1.descripcion, t1.precio, t2.descripcion as vehiculo 
      FROM refacciones t1 inner join vehiculos t2 on t1.vehiculoid = t2.vehiculoid 
      inner join usuariosvehiculos t6 on t1.vehiculoid = t6.vehiculoid 
      where t6.userid = '".$userid."'
      and t2.idflotilla = '".$idflotilla."'
      ".$v."
      order by fechacompra desc limit 100";
      if($fechafinal != ""){
        $sqld = "SELECT t1.foliooc, t1.folio, t1.fechacompra, t1.fecha, t1.refaccion, t1.descripcion, t1.precio, t2.descripcion as vehiculo 
        FROM refacciones t1 inner join vehiculos t2 on t1.vehiculoid = t2.vehiculoid 
        inner join usuariosvehiculos t6 on t1.vehiculoid = t6.vehiculoid 
        where date(t1.fechacompra) >= '".$fecha."' and date(t1.fechacompra) <= '".$fechafinal."'  and t6.userid = '".$userid."'
        and t2.idflotilla = '".$idflotilla."'
        ".$v."
        order by fechacompra desc limit 100";
      }else if($fecha != ""){
        $sqld = "SELECT t1.foliooc, t1.folio, t1.fechacompra, t1.fecha, t1.refaccion, t1.descripcion, t1.precio, t2.descripcion as vehiculo 
        FROM refacciones t1 inner join vehiculos t2 on t1.vehiculoid = t2.vehiculoid 
        inner join usuariosvehiculos t6 on t1.vehiculoid = t6.vehiculoid 
        where date(t1.fechacompra) = '".$fecha."' and t6.userid = '".$userid."'
        and t2.idflotilla = '".$idflotilla."'
        ".$v."
        order by fechacompra desc limit 100";
      } 
    }else{
      $sqld = "SELECT t1.foliooc, t1.folio, t1.fechacompra, t1.fecha, t1.refaccion, t1.descripcion, t1.precio, t2.descripcion as vehiculo 
      FROM refacciones t1 inner join vehiculos t2 on t1.vehiculoid = t2.vehiculoid 
      where  t2.idflotilla = '".$idflotilla."'
      ".$v."
      order by fechacompra desc limit 100";
      if($fechafinal != ""){
        $sqld = "SELECT t1.foliooc, t1.folio, t1.fechacompra, t1.fecha, t1.refaccion, t1.descripcion, t1.precio, t2.descripcion as vehiculo 
        FROM refacciones t1 inner join vehiculos t2 on t1.vehiculoid = t2.vehiculoid 
        where date(t1.fechacompra) >= '".$fecha."' and date(t1.fechacompra) <= '".$fechafinal."'
        and t2.idflotilla = '".$idflotilla."'
        ".$v."
        order by fechacompra desc limit 100";
      }else if($fecha != ""){
        $sqld = "SELECT t1.foliooc, t1.folio, t1.fechacompra, t1.fecha, t1.refaccion, t1.descripcion, t1.precio, t2.descripcion as vehiculo 
        FROM refacciones t1 inner join vehiculos t2 on t1.vehiculoid = t2.vehiculoid 
        where date(t1.fechacompra) = '".$fecha."' 
        and t2.idflotilla = '".$idflotilla."'
        ".$v."
        order by fechacompra desc limit 100";
      } 
    }
   
    $consultad = $db->prepare($sqld);
    $consultad->execute();
    while($filau = $consultad->fetch()){

        $refacciones[] = array(

            "folio" => $filau['folio'],
            "fechacompra" => $filau['fechacompra'],
            "fecha" => $filau['fecha'],
            "refaccion" => $filau['refaccion'],
            "descripcion" => $filau['descripcion'],
            "precio" => $filau['precio'],
            "vehiculo" => $filau['vehiculo'],
            "foliooc" => $filau['foliooc']
        );

    }


 


        return $refacciones;

    }
    public function getCargasDia($fecha, $idflotilla, $fechafinal, $vehiculoid){

      if($vehiculoid == "0"){
        $ve = "";
      }else{
        $ve = "and t1.vehiculoid = ".$vehiculoid."";
      }


      $refacciones = array();
      $conexion = new Conexion();
      $db = $conexion->getConexion();
      if($fecha != "" && $fechafinal != ""){ 
        $sqld = "SELECT t1.folio, t1.fechacarga, t1.kilometraje, t1.kilometrajefinal, t1.litros, t1.importe, t2.descripcion as vehiculo 
      FROM carga t1 inner join vehiculos t2 on t1.vehiculoid = t2.vehiculoid 
      where date(t1.fechacarga) >= '".$fecha."' 
      and date(t1.fechacarga) <= '".$fechafinal."' 
      ".$ve."
      and t2.idflotilla = '".$idflotilla."' and t1.baja = '0'
      order by fechacarga desc limit 100";
   
      }else{
        $sqld = "SELECT t1.folio, t1.fechacarga, t1.kilometraje, t1.kilometrajefinal, t1.litros, t1.importe, t2.descripcion as vehiculo 
        FROM carga t1 inner join vehiculos t2 on t1.vehiculoid = t2.vehiculoid 
        where date(t1.fechacarga) = '".$fecha."' 
        and t2.idflotilla = '".$idflotilla."' and t1.baja = '0'
        ".$ve."
        order by fechacarga desc limit 100";
      } 
      
      $consultad = $db->prepare($sqld);
      $consultad->execute();
      while($filau = $consultad->fetch()){
  
          $refacciones[] = array( 
            "folio" => $filau['folio'],
            "fechacarga" => $filau['fechacarga'],
            "kilometraje" => $filau['kilometraje'],
            "kilometrajefinal" => $filau['kilometrajefinal'],
            "litros" => $filau['litros'],
            "importe" => $filau['importe'],
            "vehiculo" => $filau['vehiculo']
          );
  
      } 
  
  
          return $refacciones;
  
      }

  public function getRefacciones($idflotilla, $userid, $tipo){



    $refacciones = array();
    $conexion = new Conexion();
    $db = $conexion->getConexion();
    if($tipo == "2"){
      $sqld = "SELECT t2.modelo, t2.numvehiculo, t1.vehiculoid, t1.foliooc, t1.proveedor, t1.documentorefaccion, t1.folio, t1.fechacompra, t1.fecha, t1.refaccion, t1.descripcion, t1.precio, t2.descripcion as vehiculo 
      FROM refacciones t1 inner join vehiculos t2 on t1.vehiculoid = t2.vehiculoid 
      inner join usuariosvehiculos t6 on t1.vehiculoid = t6.vehiculoid 
      where t2.idflotilla = '".$idflotilla."' and t6.userid = '".$userid."'
      order by fechacompra desc limit 100";
    }else{
      $sqld = "SELECT t2.modelo, t2.numvehiculo, t1.vehiculoid, t1.foliooc, t1.proveedor, t1.documentorefaccion, t1.folio, t1.fechacompra, t1.fecha, t1.refaccion, t1.descripcion, t1.precio, t2.descripcion as vehiculo 
      FROM refacciones t1 inner join vehiculos t2 on t1.vehiculoid = t2.vehiculoid 
      where t2.idflotilla = '".$idflotilla."'
      order by fechacompra desc limit 100";
    }
    
    $consultad = $db->prepare($sqld);
    $consultad->execute();
    while($filau = $consultad->fetch()){

        $refacciones[] = array(

            "folio" => $filau['folio'],
            "fechacompra" => $filau['fechacompra'],
            "fecha" => $filau['fecha'],
            "refaccion" => $filau['refaccion'],
            "descripcion" => $filau['descripcion'],
            "precio" => $filau['precio'],
            "vehiculo" => $filau['vehiculo'],
            "proveedor" => $filau['proveedor'],
            "documentorefaccion" => $filau['documentorefaccion'],
            "foliooc" => $filau['foliooc'],
            "vehiculoid" => $filau['vehiculoid'],
            "modelo" => $filau['modelo'],
            "numvehiculo" => $filau['numvehiculo']

        );

    }


 


        return $refacciones;

    }

    
  public function getDictamenesVehiculo($idflotilla){



    $refacciones = array();
    $conexion = new Conexion();
    $db = $conexion->getConexion();
    $sqld = "SELECT t2.modelo, t2.numvehiculo, t1.vehiculoid, t1.fechafinal, t1.id, t1.nombre, t1.descripcion, t1.fecha, t1.fechacaptura, t1.documentoverificacion, t2.descripcion as vehiculo 
    FROM verificaciones t1 
    inner join vehiculos t2 on t1.vehiculoid = t2.vehiculoid 
    where t2.idflotilla = '".$idflotilla."'
    order by fechacaptura desc limit 100";
    $consultad = $db->prepare($sqld);
    $consultad->execute();
    while($filau = $consultad->fetch()){

        $refacciones[] = array(

            "vehiculoid" => $filau['vehiculoid'],
            "fechafinal" => $filau['fechafinal'],
            "id" => $filau['id'],
            "nombre" => $filau['nombre'],
            "descripcion" => $filau['descripcion'],
            "fecha" => $filau['fecha'],
            "fechacaptura" => $filau['fechacaptura'],
            "documentoverificacion" => $filau['documentoverificacion'],
            "vehiculo" => $filau['vehiculo'],
            "modelo" => $filau['modelo'],
            "numvehiculo" => $filau['numvehiculo']
        );

    }


 


        return $refacciones;

    }

    public function getDictamenesVehiculoProximo($idflotilla, $periodo){

      $hoy = date('Y-m-d');
      if($periodo == "undefined"){
        $seismeses =  date('Y-m-d', strtotime('+2 months')); 
      }else{
        $seismeses =  date('Y-m-d', strtotime('+'.$periodo.' months')); 
      }
      
  

      $refacciones = array();
      $conexion = new Conexion();
      $db = $conexion->getConexion();
/*
      corregir cuando se haya renovado una verificacion 
      $qvehiculo = "SELECT id, vehiculoid FROM verificaciones GROUP BY vehiculoid ORDER BY fechacaptura DESC";
      $consultav = $db->prepare($qvehiculo);
      $consultav->execute();
      while($filav = $consultav->fetch()){

      }
*/
      $sqld = "SELECT t2.modelo, t2.numvehiculo, t1.vehiculoid, t1.fechafinal, t1.id, t1.nombre, t1.descripcion, t1.fecha, t1.fechacaptura, t1.documentoverificacion, t2.descripcion as vehiculo 
      FROM verificaciones t1 
      inner join vehiculos t2 on t1.vehiculoid = t2.vehiculoid 
      where t2.idflotilla = '".$idflotilla."'
      and t1.fechafinal >= '".$hoy."' and t1.fechafinal <= '".$seismeses."'
      order by fechacaptura desc limit 100";
      $consultad = $db->prepare($sqld);
      $consultad->execute();
      while($filau = $consultad->fetch()){
  
          $refacciones[] = array(
  
              "vehiculoid" => $filau['vehiculoid'],
              "fechafinal" => $filau['fechafinal'],
              "id" => $filau['id'],
              "nombre" => $filau['nombre'],
              "descripcion" => $filau['descripcion'],
              "fecha" => $filau['fecha'],
              "fechacaptura" => $filau['fechacaptura'],
              "documentoverificacion" => $filau['documentoverificacion'],
              "vehiculo" => $filau['vehiculo'],
              "modelo" => $filau['modelo'],
              "numvehiculo" => $filau['numvehiculo']
          );
  
      }
  
  
   
  
  
          return $refacciones;
  
      }

 
    
  public function getDictamenesVehiculo2($vehiculoid){



    $refacciones = array();
    $conexion = new Conexion();
    $db = $conexion->getConexion();
    $sqld = "SELECT t1.id, t1.nombre, t1.descripcion, t1.fecha, t1.fechacaptura, t1.documentoverificacion, t2.descripcion as vehiculo 
    FROM verificaciones t1 
    inner join vehiculos t2 on t1.vehiculoid = t2.vehiculoid 
    where t1.vehiculoid = '".$vehiculoid."'
    order by fechacaptura desc limit 100";
    $consultad = $db->prepare($sqld);
    $consultad->execute();
    while($filau = $consultad->fetch()){

        $refacciones[] = array(

            "id" => $filau['id'],
            "nombre" => $filau['nombre'],
            "descripcion" => $filau['descripcion'],
            "fecha" => $filau['fecha'],
            "fechacaptura" => $filau['fechacaptura'],
            "documentoverificacion" => $filau['documentoverificacion'],
            "vehiculo" => $filau['vehiculo']
        );

    }


 


        return $refacciones;

    }



    public function getCargas($idflotilla, $userid, $tipo){



      $refacciones = array();
      $conexion = new Conexion();
      $db = $conexion->getConexion();
      if($tipo == "2"){

        $sqld = "SELECT t1.ticket, t1.vehiculoid, t1.folio, t1.fechacarga, t1.kilometraje, t1.kilometrajefinal, t1.litros, t1.importe, t2.descripcion as vehiculo 
        FROM carga t1 inner join vehiculos t2 on t1.vehiculoid = t2.vehiculoid 
        inner join usuariosvehiculos t6 on t1.vehiculoid = t6.vehiculoid 
        where t2.idflotilla = '".$idflotilla."' and t6.userid = '".$userid."' and t1.baja = '0'
        order by fechacarga desc limit 100";
    
      }else{

        $sqld = "SELECT t1.ticket, t1.vehiculoid, t1.folio, t1.fechacarga, t1.kilometraje, t1.kilometrajefinal, t1.litros, t1.importe, t2.descripcion as vehiculo 
        FROM carga t1 inner join vehiculos t2 on t1.vehiculoid = t2.vehiculoid 
        where t2.idflotilla = '".$idflotilla."' and t1.baja = '0'
        order by fechacarga desc limit 100";
    
      }

      $consultad = $db->prepare($sqld);
      $consultad->execute();
      while($filau = $consultad->fetch()){
  
          $refacciones[] = array(
  
              "vehiculoid" => $filau['vehiculoid'],
              "folio" => $filau['folio'],
              "fechacarga" => $filau['fechacarga'],
              "kilometraje" => $filau['kilometraje'],
              "kilometrajefinal" => $filau['kilometrajefinal'],
              "litros" => $filau['litros'],
              "importe" => $filau['importe'],
              "vehiculo" => $filau['vehiculo'],
              "ticket" => $filau['ticket']
          );
  
      }
      return $refacciones;
    }

    
    public function getRendimientoMensual($idflotilla, $fecha, $userid, $tipo){

      $mes = date("m",strtotime($fecha));
      $ano = date("Y",strtotime($fecha));

      $fechaanterior = date('d-m-Y', strtotime('-31 days', strtotime($fecha))); 
      $mesanterior = date("m",strtotime($fechaanterior));
      $anoanterior = date("Y",strtotime($fechaanterior));
      

      $refacciones = array();
      $conexion = new Conexion();
      $db = $conexion->getConexion();

      if($tipo == "2"){
        $sqld = "SELECT t1.fecha as fecha1, DATE_FORMAT(t1.fecha, '%d/%m/%Y') as fecha,  t2.tipouso, t2.modelo, t2.numvehiculo, t1.vehiculoid, t1.folio, t1.kilometraje, t2.descripcion as vehiculo 
        FROM rendimientomensual t1 inner join vehiculos t2 on t1.vehiculoid = t2.vehiculoid 
        inner join usuariosvehiculos t6 on t1.vehiculoid = t6.vehiculoid 
        where t6.userid = '".$userid."' and t2.idflotilla = '".$idflotilla."' and MONTH(t1.fecha) = '".$mes."' and YEAR(t1.fecha) = '".$ano."' and t1.baja = '0'";
   
      }else{
        $sqld = "SELECT t1.fecha as fecha1, DATE_FORMAT(t1.fecha, '%d/%m/%Y') as fecha, t2.tipouso, t2.modelo, t2.numvehiculo, t1.vehiculoid, t1.folio, t1.kilometraje, t2.descripcion as vehiculo 
        FROM rendimientomensual t1 inner join vehiculos t2 on t1.vehiculoid = t2.vehiculoid 
        where t2.idflotilla = '".$idflotilla."' and MONTH(t1.fecha) = '".$mes."' and YEAR(t1.fecha) = '".$ano."' and t1.baja = '0'";
   
      }
      
      $consultad = $db->prepare($sqld);
      $consultad->execute();
      while($filau = $consultad->fetch()){

        $getCargasVehiculo = "SELECT ifnull(sum(litros), 0) as litros, ifnull(sum(importe), 0) as importe from carga where vehiculoid = '".$filau["vehiculoid"]."' and month(fechacarga) = '".$mes."' and year(fechacarga) = '".$ano."'";
        $consultac = $db->prepare($getCargasVehiculo);
        $consultac->execute();
        while($filac = $consultac->fetch()){
          $litros = $filac["litros"];
          $importe = $filac["importe"];
        }

        //kminicial
        $kminicial = "SELECT ifnull(kilometraje, 0) as kilometrajeinicial from rendimientomensual where vehiculoid = '".$filau["vehiculoid"]."' and MONTH(fecha) = '".$mesanterior."' and YEAR(fecha) = '".$anoanterior."'";
      //  echo $kminicial;
        $consultakmi = $db->prepare($kminicial);
        $consultakmi->execute();
        while($filakmi = $consultakmi->fetch()){
          $kilometrajeinicial = $filakmi["kilometrajeinicial"]; 
        } 
        $refacciones[] = array(
  
              "vehiculoid" => $filau['vehiculoid'], 
              "folio" => $filau['folio'], 
              "kilometrajefinal" => $filau['kilometraje'],  
              "vehiculo" => $filau['vehiculo'], 
              "modelo" => $filau['modelo'],
              "numvehiculo" => $filau['numvehiculo'],
              "litros" => $litros,  
              "importe" => $importe,
              "kilometrajeinicial" => $kilometrajeinicial,
              "tipouso" => $filau['tipouso'],
              "total" => ($filau['kilometraje'] - $kilometrajeinicial),
              "rendimiento" => number_format((($filau['kilometraje'] - $kilometrajeinicial) / $litros), 2),
              "costokm" => number_format($importe / ($filau['kilometraje'] - $kilometrajeinicial), 2),
              "fecha" => $filau['fecha'],
              "fecha1" => $filau['fecha1'],  
              "fechamesanterior" => date('Y/m/d', strtotime('-1 months', strtotime($filau["fecha1"]))) 
          );
  
      }
      return $refacciones;
    }

    
 



      public function getMultas($idflotilla, $userid, $tipo){



        $refacciones = array();
        $conexion = new Conexion();
        $db = $conexion->getConexion();
        if($tipo == "2"){
          $sqld = "SELECT t3.modelo, t3.numvehiculo, t1.id, t1.descripcion, t1.importe, t1.idchofer, t1.vehiculoid, t1.fechamulta, t3.descripcion as vehiculo 
          FROM multas t1 
          inner join vehiculos t3 on t1.vehiculoid = t3.vehiculoid
          inner join usuariosvehiculos t6 on t1.vehiculoid = t6.vehiculoid 
          where t3.idflotilla = '".$idflotilla."' and t6.userid = '".$userid."'
          "; 
        }else{
          $sqld = "SELECT t3.modelo, t3.numvehiculo, t1.id, t1.descripcion, t1.importe, t1.idchofer, t1.vehiculoid, t1.fechamulta, t3.descripcion as vehiculo 
          FROM multas t1 
          inner join vehiculos t3 on t1.vehiculoid = t3.vehiculoid
          where t3.idflotilla = '".$idflotilla."'
          "; 
        }
        
        
        $consultad = $db->prepare($sqld);
        $consultad->execute();
        while($filau = $consultad->fetch()){
    
            $refacciones[] = array(
    
                "id" => $filau['id'],
                "descripcion" => $filau['descripcion'],
                "importe" => $filau['importe'],
                "idchofer" => $filau['idchofer'],
                "vehiculoid" => $filau['vehiculoid'],
                "fechamulta" => $filau['fechamulta'],
                "nombrechofer" => $filau['idchofer'],
                "vehiculo" => $filau['vehiculo'],
                "modelo" => $filau['modelo'],
                "numvehiculo" => $filau['numvehiculo']
            );
    
        }
  
  
   
  
  
          return $refacciones;
  
      }




      
      public function getSiniestros($idflotilla, $userid, $tipo){



        $refacciones = array();
        $conexion = new Conexion();
        $db = $conexion->getConexion();
        if($tipo == "2"){
          $sqld = "SELECT t3.modelo, t3.numvehiculo, t1.deducible, t1.id, t1.descripcion,  t1.idchofer, t1.vehiculoid, t1.fecha, t3.descripcion as vehiculo 
          FROM siniestros t1 
          inner join vehiculos t3 on t1.vehiculoid = t3.vehiculoid
          inner join usuariosvehiculos t6 on t1.vehiculoid = t6.vehiculoid 
          where t3.idflotilla = '".$idflotilla."' and t6.userid = '".$userid."'
          ";
        }else{
          $sqld = "SELECT t3.modelo, t3.numvehiculo, t1.deducible, t1.id, t1.descripcion,  t1.idchofer, t1.vehiculoid, t1.fecha, t3.descripcion as vehiculo 
        FROM siniestros t1 
        inner join vehiculos t3 on t1.vehiculoid = t3.vehiculoid
        where t3.idflotilla = '".$idflotilla."'
        ";
        }
           
        $consultad = $db->prepare($sqld);
        $consultad->execute();
        while($filau = $consultad->fetch()){
    
            $refacciones[] = array(
    
                "id" => $filau['id'],
                "descripcion" => $filau['descripcion'],
                "idchofer" => $filau['idchofer'],
                "vehiculoid" => $filau['vehiculoid'],
                "fecha" => $filau['fecha'],
                "nombrechofer" => $filau['idchofer'],
                "deducible" => $filau['deducible'],
                "vehiculo" => $filau['vehiculo'],
                "modelo" => $filau['modelo'],
                "numvehiculo" => $filau['numvehiculo']
            );
    
        }
  
  
   
  
  
          return $refacciones;
  
      }


      
      public function getSiniestroDia($fecha, $idflotilla){



        $refacciones = array();
        $conexion = new Conexion();
        $db = $conexion->getConexion();
        $sqld = "SELECT t1.id, t1.descripcion,  t1.idchofer, t1.vehiculoid, t1.fecha, t3.descripcion as vehiculo 
        FROM siniestros t1 
        inner join vehiculos t3 on t1.vehiculoid = t3.vehiculoid
        where t1.fecha = '".$fecha."' and 
        t3.idflotilla = '".$idflotilla."'
        ";   
        $consultad = $db->prepare($sqld);
        $consultad->execute();
        while($filau = $consultad->fetch()){
    
            $refacciones[] = array(
    
                "id" => $filau['id'],
                "descripcion" => $filau['descripcion'],
                "idchofer" => $filau['idchofer'],
                "vehiculoid" => $filau['vehiculoid'],
                "fecha" => $filau['fecha'],
                "nombrechofer" => $filau['idchofer'],
                "vehiculo" => $filau['vehiculo']
            );
    
        }
  
  
   
  
  
          return $refacciones;
  
      }



      
      public function getMultaDia($fecha, $idflotilla){



        $refacciones = array();
        $conexion = new Conexion();
        $db = $conexion->getConexion();
        $sqld = "SELECT t1.id, t1.descripcion, t1.importe, t1.idchofer, t1.vehiculoid, t1.fechamulta, t3.descripcion as vehiculo 
        FROM multas t1 
        inner join vehiculos t3 on t1.vehiculoid = t3.vehiculoid
        where t1.fechamulta = '".$fecha."' and 
        t3.idflotilla = '".$idflotilla."'
        "; 
 
        
        $consultad = $db->prepare($sqld);
        $consultad->execute();
        while($filau = $consultad->fetch()){
    
            $refacciones[] = array(
    
                "id" => $filau['id'],
                "descripcion" => $filau['descripcion'],
                "importe" => $filau['importe'],
                "idchofer" => $filau['idchofer'],
                "vehiculoid" => $filau['vehiculoid'],
                "fechamulta" => $filau['fechamulta'],
                "nombrechofer" => $filau['idchofer'],
                "vehiculo" => $filau['vehiculo']
            );
    
        }
  
  
   
  
  
          return $refacciones;
  
      }



      
      public function getChoferes(){
        $refacciones = array();
        $conexion = new Conexion();
        $db = $conexion->getConexion();
        $sqld = "SELECT t1.id, t1.nombre FROM choferes t1 ";
        
        $consultad = $db->prepare($sqld);
        $consultad->execute();
        while($filau = $consultad->fetch()){
    
            $refacciones[] = array(
    
                "id" => $filau['id'],
                "nombre" => $filau['nombre']
            );
    
        }
  
  
   
  
  
          return $refacciones;
  
      }


      public function getInventario(){



        $refacciones = array();
        $conexion = new Conexion();
        $db = $conexion->getConexion();
        $sqld = "SELECT t1.precio, t1.folio, t1.producto, t1.descripcion, t1.proveedor, t1.fechacompra, t1.asignado FROM inventario t1  order by folio asc";
        $consultad = $db->prepare($sqld);
        $consultad->execute();
        while($filau = $consultad->fetch()){
    
            $refacciones[] = array(
    
                "folio" => $filau['folio'],
                "producto" => $filau['producto'],
                "descripcion" => $filau['descripcion'],
                "proveedor" => $filau['proveedor'],
                "fechacompra" => $filau['fechacompra'],
                "precio" => $filau['precio']
            );
    
        }
    
    
     
    
    
            return $refacciones;
    
        }
  
    public function getPlacas($idflotilla, $userid, $tipo){



      $refacciones = array();
      $conexion = new Conexion();
      $db = $conexion->getConexion();
      if($tipo == "2"){
     
        $sqld = "SELECT t2.modelo, t2.numvehiculo, t1.folio, t1.vehiculoid, t1.placas, t1.fechainicial, t1.fechafinal, t1.fechacaptura, t2.descripcion as vehiculo 
        FROM placas t1 
        inner join vehiculos t2 on t1.vehiculoid = t2.vehiculoid
        inner join usuariosvehiculos t6 on t1.vehiculoid = t6.vehiculoid 
        where t2.idflotilla = '".$idflotilla."' and t6.userid = '".$userid."' order by fechacaptura";

      }else{
        $sqld = "SELECT t2.modelo, t2.numvehiculo, t1.folio, t1.vehiculoid, t1.placas, t1.fechainicial, t1.fechafinal, t1.fechacaptura, t2.descripcion as vehiculo 
        FROM placas t1 inner join vehiculos t2 on t1.vehiculoid = t2.vehiculoid where t2.idflotilla = '".$idflotilla."' order by fechacaptura";
      }
      
      

     
      $consultad = $db->prepare($sqld);
      $consultad->execute();
      while($filau = $consultad->fetch()){
  
          $refacciones[] = array(
  
              "folio" => $filau['folio'],
              "vehiculoid" => $filau['vehiculoid'],
              "placas" => $filau['placas'],
              "fechainicial" => $filau['fechainicial'],
              "fechafinal" => $filau['fechafinal'],
              "fechacaptura" => $filau['fechacaptura'],
                "vehiculo" => $filau['vehiculo'],
                "modelo" => $filau['modelo'],
                "numvehiculo" => $filau['numvehiculo']
          );
  
      }
  
  
   
  
  
          return $refacciones;
  
      }



      
    public function getTanques($idflotilla, $userid, $tipo){



      $refacciones = array();
      $conexion = new Conexion();
      $db = $conexion->getConexion();
      if($tipo == "2"){
        $sqld = "SELECT t2.modelo, t2.numvehiculo, t1.serie, t1.fechafactura, t1.factura, t1.folio, t1.vehiculoid, t1.capacidad, t1.fechacaptura, t1.descripcion, t2.descripcion as vehiculo 
        FROM tanques t1 
        inner join vehiculos t2 on t1.vehiculoid = t2.vehiculoid 
        inner join usuariosvehiculos t6 on t1.vehiculoid = t6.vehiculoid 
        where t2.idflotilla = '".$idflotilla."'  AND t6.userid = '".$userid."' order by fechacaptura desc";

      }else{
        $sqld = "SELECT t2.modelo, t2.numvehiculo, t1.serie, t1.fechafactura, t1.factura, t1.folio, t1.vehiculoid, t1.capacidad, t1.fechacaptura, t1.descripcion, t2.descripcion as vehiculo 
      FROM tanques t1 inner join vehiculos t2 on t1.vehiculoid = t2.vehiculoid where t2.idflotilla = '".$idflotilla."' order by fechacaptura desc";
      }
      
   //  echo $sqld;
     $consultad = $db->prepare($sqld);
      $consultad->execute();
      while($filau = $consultad->fetch()){
  
          $refacciones[] = array(
  
              "folio" => $filau['folio'],
              "serie" => $filau['serie'],
              "fechafactura" => $filau['fechafactura'],
              "vehiculoid" => $filau['vehiculoid'],
              "capacidad" => $filau['capacidad'],
              "fechainicial" => $filau['fechainicial'],
              "fechacaptura" => $filau['fechacaptura'],
              "descripcion" => $filau['descripcion'],
                "vehiculo" => $filau['vehiculo'],
                "factura" => $filau['factura'],
                "modelo" => $filau['modelo'],
                "numvehiculo" => $filau['numvehiculo']
          );
  
      }
  
  
   
  
  
          return $refacciones;
  
      }


      public function getSeguros($idflotilla, $userid, $tipo){



        $refacciones = array();
        $conexion = new Conexion();
        $db = $conexion->getConexion();
        if($tipo == "2"){
          $sqld = "SELECT t2.modelo, t2.numvehiculo, t1.folio, t1.vehiculoid, t1.noseguro, t1.compania, t1.fechainicial, t1.fechafinal, t1.fechacaptura, t2.descripcion as vehiculo
          FROM seguros t1 inner join vehiculos t2 on t1.vehiculoid = t2.vehiculoid
          inner join usuariosvehiculos t6 on t1.vehiculoid = t6.vehiculoid 
          where t2.idflotilla = '".$idflotilla."' and t6.userid = '".$userid."'
           order by fechacaptura";
        }else{
          $sqld = "SELECT t2.modelo, t2.numvehiculo, t1.folio, t1.vehiculoid, t1.noseguro, t1.compania, t1.fechainicial, t1.fechafinal, t1.fechacaptura, t2.descripcion as vehiculo
          FROM seguros t1 inner join vehiculos t2 on t1.vehiculoid = t2.vehiculoid
          where t2.idflotilla = '".$idflotilla."'
           order by fechacaptura";
        }
        
        $consultad = $db->prepare($sqld);
        $consultad->execute();
        while($filau = $consultad->fetch()){
    
            $refacciones[] = array(
    
                "folio" => $filau['folio'],
                "vehiculoid" => $filau['vehiculoid'],
                "noseguro" => $filau['noseguro'],
                "compania" => $filau['compania'],
                "fechainicial" => $filau['fechainicial'],
                "fechafinal" => $filau['fechafinal'],
                "fechacaptura" => $filau['fechacaptura'],
                  "vehiculo" => $filau['vehiculo'],
                  "modelo" => $filau['modelo'],
                  "numvehiculo" => $filau['numvehiculo']
            );
    
        }
    
    
     
    
    
            return $refacciones;
    
        }
  


      public function getPlacasProximo($idflotilla, $userid, $tipo){

        $hoy = date('Y-m-d');
        
        $seismeses =  date('Y-m-d', strtotime('+2 months'));
        
        $refacciones = array();
        $conexion = new Conexion();
        $db = $conexion->getConexion();
        if($tipo == "2"){
          $qvehiculo = "SELECT t1.folio as folio, t1.vehiculoid FROM placas t1 
           inner join usuariosvehiculos t6 on t1.vehiculoid = t6.vehiculoid 
           where t6.userid = '".$userid."'
          GROUP BY t1.vehiculoid ORDER BY t1.fechacaptura DESC";
        }else{
          $qvehiculo = "SELECT folio, vehiculoid FROM placas GROUP BY vehiculoid ORDER BY fechacaptura DESC";
        }
        
        
        $consultav = $db->prepare($qvehiculo);
        $consultav->execute(); 
        while($filav = $consultav->fetch()){
          $sqld = "SELECT t2.modelo, t2.numvehiculo,  t1.folio, t1.vehiculoid, t1.placas, t1.fechainicial, t1.fechafinal, t1.fechacaptura, t2.descripcion as vehiculo 
          FROM placas t1 inner join vehiculos t2 on t1.vehiculoid = t2.vehiculoid 
          where t1.fechafinal >= '".$hoy."' and t1.fechafinal <= '".$seismeses."' 
          and t1.folio = '".$filav["folio"]."'
          and t2.idflotilla = '".$idflotilla."' order by fechacaptura";
          //echo $sqld;
          $consultad = $db->prepare($sqld);
          $consultad->execute();
          while($filau = $consultad->fetch()){
      
              $refacciones[] = array(
      
                  "folio" => $filau['folio'],
                  "vehiculoid" => $filau['vehiculoid'],
                  "placas" => $filau['placas'],
                  "fechainicial" => $filau['fechainicial'],
                  "fechafinal" => $filau['fechafinal'],
                  "fechacaptura" => $filau['fechacaptura'],
                    "vehiculo" => $filau['vehiculo'],
                    "modelo" => $filau['modelo'],
                    "numvehiculo" => $filau['numvehiculo']
              );
      
          }
      
        }

       
    
     
    
    
            return $refacciones;
    
        }

        public function getSegurosProximo($idflotilla, $userid, $tipo){

          $hoy = date('Y-m-d');
          $dosMeses =  date('Y-m-d', strtotime('+2 months'));
  
          $refacciones = array();
          $conexion = new Conexion();
          $db = $conexion->getConexion();
          if($tipo == "2"){
            $qvehiculo = "SELECT t1.folio as folio, t1.vehiculoid FROM seguros t1 
             inner join usuariosvehiculos t6 on t1.vehiculoid = t6.vehiculoid 
             where t6.userid = '".$userid."'
            GROUP BY t1.vehiculoid ORDER BY t1.fechacaptura DESC ";
          }else{
            $qvehiculo = "SELECT folio, vehiculoid FROM seguros GROUP BY vehiculoid ORDER BY fechacaptura DESC ";
          }
          
          
          $consultav = $db->prepare($qvehiculo);
          $consultav->execute();
          while($filav = $consultav->fetch()){

            $sqld = "SELECT t2.modelo, t2.numvehiculo, t1.folio, t1.vehiculoid, t1.noseguro, t1.compania, t1.fechainicial, t1.fechafinal, t1.fechacaptura, t2.descripcion as vehiculo 
            FROM seguros t1 inner join vehiculos t2 on t1.vehiculoid = t2.vehiculoid 
            where t1.fechafinal >= '".$hoy."' and t1.fechafinal <= '".$dosMeses."'
            and t2.idflotilla = '".$idflotilla."'
            and t2.vehiculoid = '".$filav["folio"]."' 
            and t1.folio = (select max(folio) from seguros where vehiculoid = '".$filav["folio"]."' ) 
            order by  fechacaptura desc limit 1";
  
            $consultad = $db->prepare($sqld);
            $consultad->execute();
            while($filau = $consultad->fetch()){
        
                $refacciones[] = array(
        
                  "folio" => $filau['folio'],
                  "vehiculoid" => $filau['vehiculoid'],
                  "noseguro" => $filau['noseguro'],
                  "compania" => $filau['compania'],
                  "fechainicial" => $filau['fechainicial'],
                  "fechafinal" => $filau['fechafinal'],
                  "fechacaptura" => $filau['fechacaptura'],
                    "vehiculo" => $filau['vehiculo'],
                    "modelo" => $filau['modelo'],
                    "numvehiculo" => $filau['numvehiculo']
                );
        
            }
        

          }

         
      
       
      
      
              return $refacciones;
      
          }
  




    public function getDetalles($id){



        $requisiciones = array();

        $conexion = new Conexion();

        $db = $conexion->getConexion();

        $sqld = "SELECT t1.userid, t1.idrequisicion as folio, t1.observaciones, t1.idrequisicion, t1.fecha, t1.fechacaptura, t1.estado, t2.name, t3.name as departamento FROM requisiciones t1 inner join usuarios t2 on t1.userid = t2.userid inner join departamento t3 on t2.dptoid = t3.dptoid where idrequisicion = '".$id."'";

        $consultad = $db->prepare($sqld);

        $consultad->execute();

        while($filau = $consultad->fetch()){

            $requisiciones[0] = array(

                "folio" => $filau['folio'],

                "departamento" => $filau['departamento'],

                "userid" => $filau['userid'],

                "name" => $filau['name'],

              "idrequisicion" => $filau['idrequisicion'],

              "fechacaptura" => $filau['fechacaptura'],

              "fecha" => $filau['fecha'],

              "solicita" => $filau['name'],

              "estado" => $filau['estado'],

              "observaciones" => $filau['observaciones']

            );

        }





        $sqld = "SELECT * from productosrequisiciones where idrequisicion = '".$id."'";

        $consultad = $db->prepare($sqld);

        $consultad->execute();

        while($filau = $consultad->fetch()){

            $requisiciones[1][] = array(

                "tipo" => "productos",

                "producto" => $filau['producto'],

                "descripcion" => $filau['descripcion'],

                "unidad" => $filau['unidad'],

                "seleccionado" => $filau['seleccionado'],

                "cantidad" => $filau['cantidad'] 

            );

        }





        $sqld = "SELECT * from cotizaciones where idrequisicion = '".$id."'";

        $consultad = $db->prepare($sqld);

        $consultad->execute();

        while($filau = $consultad->fetch()){

            $requisiciones[2][] = array(

                "tipo" => "cotizaciones",

                "proveedor" => $filau['proveedor'],

                "precio" => $filau['precio'] 

            );

        }





        $sqld = "SELECT t1.tipo, t2.name from autorizacion t1 inner join usuarios t2 on t1.userid = t2.userid  where idrequisicion = '".$id."'";

        $consultad = $db->prepare($sqld);

        $consultad->execute();

        while($filau = $consultad->fetch()){

            $requisiciones[3][] = array(

                "tipo" => $filau['tipo'],

                "name" => $filau['name'] 

            );

        }



        











            return $requisiciones;

        }







        public function getDetallesOrden($id){



          $requisiciones = array();

          $conexion = new Conexion();

          $db = $conexion->getConexion();

          $sqld = "SELECT date(t4.fechaorden) AS fechaorden, t4.proveedor, t4.estacion,

            t1.userid, t4.idorden AS folio, t1.observaciones, t1.idrequisicion, t1.fecha, t1.fechacaptura, t1.estado,

            t2.name, t3.name AS departamento 

            FROM requisiciones t1 

            INNER JOIN usuarios t2 ON t1.userid = t2.userid 

            INNER JOIN departamento t3 ON t2.dptoid = t3.dptoid 

            INNER JOIN ordencompra t4 ON t1.idrequisicion = t4.idrequisicion 

            WHERE t1.idrequisicion = '".$id."'";

          $consultad = $db->prepare($sqld); 

          $consultad->execute();

          while($filau = $consultad->fetch()){

              $requisiciones[0] = array(

                  "fechaorden" => $filau['fechaorden'],

                  "proveedor" => $filau['proveedor'],

                  "estacion" => $filau['estacion'],

                  "folio" => $filau['folio'],

                  "departamento" => $filau['departamento'],

                  "userid" => $filau['userid'],

                  "name" => $filau['name'],

                  "idrequisicion" => $filau['idrequisicion'],

                  "fechacaptura" => $filau['fechacaptura'],

                  "fecha" => $filau['fecha'],

                  "solicita" => $filau['name'],

                  "estado" => $filau['estado'],

                  "observaciones" => $filau['observaciones']

              );

          }

  

  

          $sqld = "SELECT * from productosrequisiciones where idrequisicion = '".$id."' and seleccionado = '1 '";

          $consultad = $db->prepare($sqld);

          $consultad->execute();

          while($filau = $consultad->fetch()){

              $requisiciones[1][] = array(

                  "tipo" => "productos",

                  "producto" => $filau['producto'],

                  "descripcion" => $filau['descripcion'],

                  "unidad" => $filau['unidad'],

                  "folio" => $filau['id'],

                  "cantidad" => $filau['cantidad'],

                  "costouni" => $filau['costounitario']

              );

          }

  

  

          $sqld = "SELECT * from cotizaciones where idrequisicion = '".$id."'";

          $consultad = $db->prepare($sqld);

          $consultad->execute();

          while($filau = $consultad->fetch()){

              $requisiciones[2][] = array(

                  "tipo" => "cotizaciones",

                  "proveedor" => $filau['proveedor'],

                  "precio" => $filau['precio'] 

              );

          }

  

  

          $sqld = "SELECT t1.tipo, t3.imagen, t1.autorizado, t2.name, t1.userid from autorizacion t1 inner join usuarios t2 on t1.userid = t2.userid inner join galeria t3 on t1.userid = t3.userid  where idrequisicion = '".$id."'";

          $consultad = $db->prepare($sqld);

          $consultad->execute();

          while($filau = $consultad->fetch()){

              $requisiciones[3][] = array(

                  "tipo" => $filau['tipo'],

                  "autorizado" => $filau['autorizado'],

                  "userid" => $filau['userid'],

                  "imagen" => base64_encode($filau['imagen']),

                  "name" => $filau['name'] 

              );

          }





              return $requisiciones;

          }




          public function actualizarVehiculo($vehiculoid, $responsable, $tipouso, $empresa, $gps, $numerovehiculo, $pernota, $notificar, $dictamen){



            $requisiciones = array(); 

            $conexion = new Conexion();

            $db = $conexion->getConexion();

            $sqld = "UPDATE vehiculos set notificar = '".$notificar."', responsable = '".$responsable."', tipouso = '".$tipouso."', empresa = '".$empresa."', gps = '".$gps."', numvehiculo = '".$numerovehiculo."', pernota = '".$pernota."', dictamen = '".$dictamen."' where vehiculoid = '".$vehiculoid."' ";

            $consultad = $db->prepare($sqld);

            $consultad->execute();  

         

                return "Actualizado Correctamente";

        

                

            }


            public function otrosGastos($idservicio){



              $requisiciones = array(); 
  
              $conexion = new Conexion();
  
              $db = $conexion->getConexion();
  
              $sqld = "UPDATE servicios set otrosgastos = '1' where id = '".$idservicio."' ";
  
              $consultad = $db->prepare($sqld);
  
              $consultad->execute();  
  
           
  
                  return "Actualizado Correctamente";
  
          
  
                  
  
              }

            public function actualizarServicio($vehiculoid, $odometro, $fechaproximo, $idservicio){



              $requisiciones = array(); 
  
              $conexion = new Conexion();
  
              $db = $conexion->getConexion();
  
              $sqld = "UPDATE servicios set odometro = '".$odometro."', fechaproximo = '".$fechaproximo."' where vehiculoid = '".$vehiculoid."' and id = '".$idservicio."'";
  
              $consultad = $db->prepare($sqld);
  
              $consultad->execute();  
  
           
  
                  return "Actualizado Correctamente";
  
          
  
                  
  
              }





          public function updateAutorizar($idrequisicion, $userid, $tipo){



            $requisiciones = array(); 

            $conexion = new Conexion();

            $db = $conexion->getConexion();

            $sqld = "UPDATE autorizacion set autorizado = '1' where userid = '".$userid."' and  idrequisicion = '".$idrequisicion."' and tipo = '".$tipo."'";

            $consultad = $db->prepare($sqld);

            $consultad->execute();  

         

                return "Actualizado Correctamente";

        

                

            }



            public function updateAccesos($idusuario, $uno, $dos, $tres){



              $requisiciones = array(); 

              $conexion = new Conexion();

              $db = $conexion->getConexion();

              $sqld = "UPDATE usuarios set compras = '".$uno."', competro = '".$dos."', otro = '".$tres."' where userid = '".$idusuario."'";

              $consultad = $db->prepare($sqld);

              $consultad->execute();  

           

                  return "Actualizado Correctamente";

          

                  

              }

 



            

    public function guardarCotizacion($idorden, $file){

        $conexion = new Conexion();

        $db = $conexion->getConexion(); 

        $sqld = "UPDATE ordencompra SET cotizacion = '{$file['name']}' WHERE idrequisicion = {$idorden}";

        

        $temp = $file['tmp_name'];

        $path = 'cotizaciones/'.$file['name'];   

        if(move_uploaded_file($temp, $path)){

            if($db->query($sqld)==TRUE){  

                return "Cotización guardada";   

            } else {

                return "Error al guardar cotización";   

            }

        }

    }





    public function updateOrdenGenerado($idorden, $nvoestado){

      $conexion = new Conexion();

      $db = $conexion->getConexion(); 

      $Query = "UPDATE ordencompra SET estadoorden = '{$nvoestado}' WHERE idorden = {$idorden}";

      

      if($db->query($Query)==TRUE){  

          return "Estado actualizado";   

      } else {

          return "Error al actualizar estado";   

      }

  

    }





    public function updateRequisicionGenerado($idrequisicion, $nvoestado){

      $conexion = new Conexion();

      $db = $conexion->getConexion(); 

      $Query = "UPDATE requisiciones SET estado = '{$nvoestado}' WHERE idrequisicion = {$idrequisicion}";

      

      if($db->query($Query)==TRUE){  

          return "Estado actualizado";   

      } else {

          return "Error al actualizar estado";   

      }

  

  }









    public function guardarPrecios($folio, $costouni){

        $conexion = new Conexion();

        $db = $conexion->getConexion();

        $i = 0;

        $c = 0;



        foreach ($folio as $F) {

          if($F != ""){

            $sqld = "UPDATE productosrequisiciones SET costounitario = '{$costouni[$i]}' WHERE id = {$F}";

             

            if($costouni[$i] != ""){

            if($db->query($sqld)==TRUE){ 

              $c++;

            }

          }

          }



          $i++;

        }

        

        if($c == sizeof($folio)){

          return "Precios Guardados";   

        } else {

          return "Precios Guardados";   

        }

    }





    public function guardarProveedorEstacion($idorden, $proveedor, $estacion){

        $conexion = new Conexion();

        $db = $conexion->getConexion();

        /*  GETTING ORDEN REQUISICION ID  */ 

        

        $Query = "UPDATE ordencompra SET proveedor = '{$proveedor}', estacion = {$estacion} WHERE idorden = {$idorden}";

          

        if($db->query($Query)==TRUE){ 

            echo"Estacion y Proveedor Guardados";

        }

    }







public function getOrdenes($userid, $date, $dptoid){

    $requisiciones = array();

    $autorizaciones = array();

    $conexion = new Conexion();

    $db = $conexion->getConexion(); 

    if($date != ""){

    $sqld = "	SELECT t1.idorden AS ordencompra, t1.estadoorden, t1.idrequisicion, t1.cotizacion, t2.fecha, t1.fechaorden as fechacaptura, t3.name, t2.userid 

      FROM ordencompra t1 

      INNER JOIN requisiciones t2 ON t1.idrequisicion = t2.idrequisicion 

      INNER JOIN usuarios t3 ON t2.userid = t3.userid WHERE date(fechaorden) = '".$date."' 

      and t1.dptoid = '".$dptoid."'

      GROUP BY t1.idrequisicion 

      ORDER BY t1.fechaorden 

      DESC  ";

    }else{

      $sqld = "	SELECT t1.idorden AS ordencompra, t1.estadoorden, t1.idrequisicion, t1.cotizacion, t2.fecha, t1.fechaorden as fechacaptura, t3.name, t2.userid 

      FROM ordencompra t1 

      INNER JOIN requisiciones t2 ON t1.idrequisicion = t2.idrequisicion 

      INNER JOIN usuarios t3 ON t2.userid = t3.userid  

      WHERE t1.dptoid = '".$dptoid."'

      GROUP BY t1.idrequisicion 

      ORDER BY t1.fechaorden 

      DESC LIMIT 10";

    }

    $consultad = $db->prepare($sqld);

    $consultad->execute();



    while($filau = $consultad->fetch()){

        $requisiciones[] = array(

            "userid" => $filau['userid'],

            "name" => $filau['name'],

            "idrequisicion" => $filau['idrequisicion'],

            "fechacaptura" => $filau['fechacaptura'],

            "fecha" => $filau['fecha'],

            "solicita" => $filau['name'],

            "ordencompra" => $filau['ordencompra'],

            "autorizado" => "0",

            "estadoorden" => $filau['estadoorden'],

            "cotizacion" => $filau['cotizacion']

        );



        $Q = "SELECT idrequisicion, autorizado, tipo 

          FROM autorizacion 

          WHERE userid = '{$userid}' AND idrequisicion = '{$filau["idrequisicion"]}'";

      

        $consulta = $db->prepare($Q);

        $consulta->execute();

        while($fila = $consulta->fetch()){

            $autorizaciones[] = array(

                "autorizar" => $fila['autorizado'],

                "idrequisicion" => $fila['idrequisicion'],

                "tipo" => $fila['tipo']

            );

        }

    }



    foreach($requisiciones as &$R){

        foreach($autorizaciones as $Q){

            if($R["idrequisicion"] == $Q["idrequisicion"]){

                $R["autorizado"] = "1";

                $R["autorizar"] = $Q["autorizar"];

                $R["tipo"] = $Q["tipo"];

            }   

        } 

    }

    

    return $requisiciones;  

}







    public function getRequisiciones($date, $dptoid){



        $requisiciones = array();

        $conexion = new Conexion();

        $db = $conexion->getConexion();

        if($date != ""){

        $sqld = "SELECT t1.idrequisicion, t2.userid, t2.name, t1.fechacaptura, t1.fecha, t1.estado, t3.idrequisicion as ordencompra FROM requisiciones t1 inner join usuarios t2 on t1.userid = t2.userid LEFT JOIN ordencompra t3 ON t1.idrequisicion = t3.idrequisicion where t1.dptoid = '".$dptoid."' and date(fechacaptura) = '".$date."' group by t1.idrequisicion order by fechacaptura desc";

        }else{

          $sqld = "SELECT t1.idrequisicion, t2.userid, t2.name, t1.fechacaptura, t1.fecha, t1.estado, t3.idrequisicion as ordencompra FROM requisiciones t1 inner join usuarios t2 on t1.userid = t2.userid LEFT JOIN ordencompra t3 ON t1.idrequisicion = t3.idrequisicion where t1.dptoid= '".$dptoid."' group by t1.idrequisicion order by fechacaptura desc limit 10";

        }   

        $consultad = $db->prepare($sqld);

        $consultad->execute();

        while($filau = $consultad->fetch()){

            $requisiciones[] = array(

                "userid" => $filau['userid'],

                "name" => $filau['name'],

              "idrequisicion" => $filau['idrequisicion'],

              "fechacaptura" => $filau['fechacaptura'],

              "fecha" => $filau['fecha'],

              "solicita" => $filau['name'],

              "ordencompra" => $filau['ordencompra'],

              "estado" => $filau['estado']

            );

        }

     

            return $requisiciones;

    

            

        }





        public function GenerarOrden($idrequisicion, $productos, $dptoid){

 

            $conexion = new Conexion();

            $db = $conexion->getConexion();



            $field = "";

            $fol = "";



            switch ($dptoid) {

              case 1:

                //Sistemas

                $Select = "SELECT fsistemas from ordencompra order by fsistemas desc limit 1";

                $consultad = $db->prepare($Select);

                $consultad->execute();

                while($filau = $consultad->fetch()){

                  $fol = $filau["fsistemas"]; 

                }

                $field = "fsistemas";

                  break;

              case 2:

                //Recursos Humanos

                $Select = "SELECT fcompetro from ordencompra order by fcompetro desc limit 1";

                $consultad = $db->prepare($Select);

                $consultad->execute();

                while($filau = $consultad->fetch()){

                  $fol = $filau["fcompetro"]; 

                } 

                $field = "fcompetro";

                  

                  break;

              case 3:

                //Contabilidad

                $Select = "SELECT fotro from ordencompra order by fotro desc limit 1";

                $consultad = $db->prepare($Select);

                $consultad->execute();

                while($filau = $consultad->fetch()){

                  $fol = $filau["fotro"]; 

                } 

                $field = "fotro";

                  

                  break;

              case 4:

                //Compras

                $Select = "SELECT fcompras from ordencompra order by fcompras desc limit 1";

                $consultad = $db->prepare($Select);

                $consultad->execute();

                while($filau = $consultad->fetch()){

                  $fol = $filau["fcompras"]; 

                } 

                $field = "fcompras";

                  

                  break;

          }







            $fol++;



            $sqld = "INSERT into ordencompra (idrequisicion, dptoid, ".$field.") values ('".$idrequisicion."', '".$dptoid."', '".$fol."')";

         

            if($db->query($sqld)==TRUE){ 

              echo 'Orden de compra generada correctamente';



                foreach($productos as $P){



                  $Q = "UPDATE productosrequisiciones set seleccionado = '1' where idrequisicion = '".$idrequisicion."' and producto = '".$P."'";

                  if($db->query($Q)==TRUE){ 

                  }

                }







            } else {

                echo 'Error al generar orden de compra';

            }

            

               

                

            }

    

 

  public function getDepartamentos(){



    $departamentos = array();

    $conexion = new Conexion();

    $db = $conexion->getConexion();

    $sqld = "SELECT * FROM departamento";

    $consultad = $db->prepare($sqld);

    $consultad->execute();

    while($filau = $consultad->fetch()){

        $departamentos[] = array(

          "dptoid" => $filau['dptoid'],

          "name" => $filau['name']

        );

    }

 

        return $departamentos;



        

    }



      

      public function getTipovehiculo(){



        $departamentos = array();

        $conexion = new Conexion();

        $db = $conexion->getConexion();

        $sqld = "SELECT * FROM tipos";

        $consultad = $db->prepare($sqld);

        $consultad->execute();

        while($filau = $consultad->fetch()){

            $departamentos[] = array(

              "dptoid" => $filau['idtipo'],

              "name" => $filau['tipo']

            );

        }

     

            return $departamentos;

            echo "endAPI";

    

            

        }

      



    public function Login($user, $pass, $idflotilla){

      $loginres = array();

      $conexion = new Conexion();

      $db = $conexion->getConexion();



       





      $Query = "SELECT t1.usuario, t1.userid, t1.name, t1.tipo

      FROM usuarios  t1 
      INNER JOIN acceso_usuarios t2 ON t1.userid = t2.userid 
      WHERE BINARY t1.Usuario = '{$user}'  AND BINARY  t1.Contra = '".$pass."'
      and t2.flotillaid = '{$idflotilla}'
      "; 

   //   echo $Query;

      session_start();

      $consultad = $db->prepare($Query);

      $consultad->execute();

      while($filau = $consultad->fetch()){

        $loginres[] = array(

          "usuario" => $filau['usuario'],

          "res" => '1', 

          "userid" => $filau['userid'], 

          "name" => $filau['name'], 

          "tipo" => $filau['tipo'] 

         );

          

          $usuario = $filau["usuario"]; 

        }  

    if(isset($usuario)){ 

    return $loginres;

    }else{

        echo "0";

    }

 

  

          

      }





      public function InsertAutorizacion($name, $folio, $tipo){

        $c = 0;

        $conexion = new Conexion();

        $db = $conexion->getConexion();

        

            $Q = "select userid from usuarios where name = '".$name."'";

          

            $res = $db->prepare($Q);

            $res->execute();

            while($f = $res->fetch()){

              $userid = $f['userid'];

            }

       

             

            $QueryProductos = "INSERT INTO autorizacion(userid, idrequisicion, tipo) 

                VALUES ( '".$userid."', '".$folio."', '".$tipo."')";

        

            if($db->query($QueryProductos)==TRUE){ 

               $c++; 

            }   

        

        

        echo "Actualizado Correctamente";

   

  

            

        }


        public function getEmpresas(){
          $requisiciones = array(); 
          $conexion = new Conexion(); 
          $db = $conexion->getConexion();
          $sqld = "SELECT id, nombre FROM empresas"; 
          $consultad = $db->prepare($sqld);
          $consultad->execute();
          $i = 0;
          while($filau = $consultad->fetch()){
              $requisiciones[$i] = array( 
                "id" => $filau['id'],
                "nombre" => $filau['nombre'] 
              );
              $i++;
          } 
          return $requisiciones;
      }

  







      public function InsertVehiculo($userid, $observaciones, $descripcion, $tipo, $img, $serievehiculo, $seriemotor, $tipouso, $empresa, $numvehiculo, $responsable, $modelo, $gps, $idflotilla){

          $savepath = "./Vehiculos/";

          // print_r($img);

          move_uploaded_file($img["img-vehi"]["tmp_name"], $savepath.$img["img-vehi"]['name']);



          $c = 0; //arriba borre el primer argumento '$fecha'

          $conexion = new Conexion();

          $db = $conexion->getConexion();

          $QueryRequisicion = "INSERT INTO vehiculos(userid, idtipo, observaciones, descripcion, imgpath, serievehiculo, seriemotor, tipouso, empresa, numvehiculo, responsable, modelo, gps, idflotilla)   

            VALUES ('{$userid}', '{$tipo}', '{$observaciones}', '{$descripcion}', '{$img['img-vehi']['name']}', '{$serievehiculo}', '{$seriemotor}', '{$tipouso}', '{$empresa}', '{$numvehiculo}', '{$responsable}', '{$modelo}', '{$gps}', '{$idflotilla}')

          ";

          

          if($db->query($QueryRequisicion)==TRUE){

              $res = "1";

              $c++;

          }



          if($c == 1){

              echo "Vehiculo agregado";

          } 

      }


      public function cargarServicios($vehiculoid, $servicio, $fecha, $descripcion, $odometro, $documentoservicio, $fechaproximo, $kilometraje){

        $savepath = "./DocumentoServicio/";

        // print_r($img);

        move_uploaded_file($documentoservicio["documentoservicio"]["tmp_name"], $savepath.$documentoservicio["documentoservicio"]['name']);
        move_uploaded_file($documentoservicio["cotizacionservicio"]["tmp_name"], $savepath.$documentoservicio["cotizacionservicio"]['name']);
 

        $c = 0; //arriba borre el primer argumento '$fecha'

        $conexion = new Conexion();

        $db = $conexion->getConexion();

        $QueryRequisicion = "INSERT INTO servicios (vehiculoid, servicio, fecha, descripcion, odometro, documentoservicio, cotizacion, fechaproximo, kilometraje)   

          VALUES ('{$vehiculoid}', '{$servicio}', '{$fecha}', '{$descripcion}', '{$odometro}', '{$documentoservicio['documentoservicio']['name']}', '{$documentoservicio['cotizacionservicio']['name']}', '{$fechaproximo}', '{$kilometraje}' )

        ";

        

        if($db->query($QueryRequisicion)==TRUE){

           
          echo "Servicio agregado";

        }

 

    }

    public function guardarServicioCompras($vehiculoid, $producto, $descripcion, $fecha, $odometro, $precio, $foliooc){

      

      $conexion = new Conexion();

      $db = $conexion->getConexion();

      $QueryRequisicion = "INSERT INTO servicios (vehiculoid, servicio, fecha, descripcion, odometro, precio, foliooc, otrosgastos)   

        VALUES ('{$vehiculoid}', '{$producto}', '{$fecha}', '{$descripcion}', '{$odometro}', '{$precio}', '{$foliooc}', '1' )

      ";

      

      if($db->query($QueryRequisicion)==TRUE){

         
        echo "Agregado correctamente";

      }else{
        echo "Error al guardar";
      }



  }

    










    public function cargarDictamenes($IDvehiculo, $fecha, $dictamen, $descripcion, $documentodictamen, $fechafinal){

      $savepath = "./DocumentoDictamen/";

      // print_r($img);

      move_uploaded_file($documentodictamen["documentodictamen"]["tmp_name"], $savepath.$documentodictamen["documentodictamen"]['name']);



      $c = 0; //arriba borre el primer argumento '$fecha'

      $conexion = new Conexion();

      $db = $conexion->getConexion();

      $QueryRequisicion = "INSERT INTO verificaciones(vehiculoid, nombre,  descripcion, fecha, documentoverificacion, fechafinal)   

        VALUES ('{$IDvehiculo}', '{$dictamen}', '{$descripcion}', '{$fecha}',  '{$documentodictamen['documentodictamen']['name']}', '{$fechafinal}' )

      ";

      

      if($db->query($QueryRequisicion)==TRUE){

         
        echo "Agregado correctamente";

      }



  }







    public function getUsuario(){

      session_start(); 

      $_SESSION["ss"] = "kkk";

      print_r($_SESSION);

      $departamentos = array();  

          $departamentos[] = array(

            "usuario" => $_SESSION['user'], 

          );

       

   

          return $departamentos;

  

          

      }





  public function getUsuarios(){

 

    $usuarios = array();

    $conexion = new Conexion();

    $db = $conexion->getConexion();

    $sqlu = "SELECT t1.userid, t1.usuario, t1.contra,  t1.name, t1.tipo FROM usuarios t1  where t1.baja = '0' ";

    $consultau = $db->prepare($sqlu);

    $consultau->execute();

    while($filau = $consultau->fetch()){

        $usuarios[] = array(

          "userid" => $filau['userid'],

          "name" => $filau['name'],
          "tipo" => $filau['tipo'],

          "usuario" => $filau['usuario']   

        );

    }

 

        return $usuarios;



        

    }







    public function getVehiculos($idflotilla, $userid, $tipo){

      $usuarios = array();

      $conexion = new Conexion();

      $db = $conexion->getConexion();
 
      // if tipo 2 (no administrador obtener veiculos asignador)
      if($tipo == "2"){
        $sqlu = "SELECT t1.dictamen, t1.notificar, t1.pernota, t5.placas, t4.nombre as nombreempresa, t1.numvehiculo, t1.serievehiculo, 
        t1.responsable, t1.modelo, t1.gps,  
        t1.seriemotor, t1.tipouso, t1.empresa, t1.vehiculoid, t1.fechacaptura, t1.descripcion, t1.observaciones, t1.imgpath, t2.name, t3.idtipo
  
            FROM vehiculos t1 inner join usuarios t2 on t1.userid = t2.userid 
            inner join tipos t3 on t1.idtipo = t3.idtipo
            inner join empresas t4 on t1.empresa = t4.id
            left join placas t5 on t1.vehiculoid = t5.vehiculoid
            inner join usuariosvehiculos t6 on t1.vehiculoid = t6.vehiculoid
            where t1.idflotilla = '".$idflotilla."'
            AND t6.userid = '".$userid."'
            group by t1.vehiculoid
  
        "; 
      }else{
        $sqlu = "SELECT t1.dictamen, t1.notificar, t1.pernota, t5.placas, t4.nombre as nombreempresa, t1.numvehiculo, t1.serievehiculo, 
        t1.responsable, t1.modelo, t1.gps,  
        t1.seriemotor, t1.tipouso, t1.empresa, t1.vehiculoid, t1.fechacaptura, t1.descripcion, t1.observaciones, t1.imgpath, t2.name, t3.idtipo
  
            FROM vehiculos t1 inner join usuarios t2 on t1.userid = t2.userid 
            inner join tipos t3 on t1.idtipo = t3.idtipo
            inner join empresas t4 on t1.empresa = t4.id
            left join placas t5 on t1.vehiculoid = t5.vehiculoid
            where t1.idflotilla = '".$idflotilla."'
            group by t1.vehiculoid
  
        "; 
      }
     

      $consultau = $db->prepare($sqlu);

      $consultau->execute();

      

      while($filau = $consultau->fetch()){

          $usuarios[] = array(

              "pernota" => $filau['pernota'],
              "placas" => $filau['placas'],
              "responsable" => $filau['responsable'],
              "modelo" => $filau['modelo'],
              "gps" => $filau['gps'],
              "vehiculoid" => $filau['vehiculoid'],

              "fechacaptura" => $filau['fechacaptura'],

              "descripcion" => $filau['descripcion'],   

              "observaciones" => $filau['observaciones'],   

              "name" => $filau['name'],   

              "idtipo" => $filau['idtipo'],   

              "icon" => $filau['imgpath'],
              "observaciones" => $filau['observaciones'],
              "serievehiculo" => $filau['serievehiculo'],
              "seriemotor" => $filau['seriemotor'],
              "tipouso" => $filau['tipouso'],
              "empresa" => $filau['nombreempresa'],
              "idempresa" => $filau['empresa'],
              "numvehiculo" => $filau['numvehiculo'],
              "notificar" => $filau['notificar'],
              "dictamen" => $filau['dictamen']
    

          );

      }

      

      return $usuarios;

    }

    public function getVehiculosAsignados($idflotilla, $userid){

      $usuarios = array();

      $conexion = new Conexion();

      $db = $conexion->getConexion();
 

      $sqlu = "SELECT t1.notificar, t1.pernota, t5.placas, t4.nombre as nombreempresa, t1.numvehiculo, t1.serievehiculo, 
      t1.responsable, t1.modelo, t1.gps,  
      t1.seriemotor, t1.tipouso, t1.empresa, t1.vehiculoid, t1.fechacaptura, t1.descripcion, t1.observaciones, t1.imgpath, t2.name, t3.idtipo

          FROM vehiculos t1 inner join usuarios t2 on t1.userid = t2.userid 
          inner join tipos t3 on t1.idtipo = t3.idtipo
          inner join empresas t4 on t1.empresa = t4.id
          left join placas t5 on t1.vehiculoid = t5.vehiculoid
          inner join usuariosvehiculos t6 on t1.vehiculoid = t6.vehiculoid
          where t1.idflotilla = '".$idflotilla."'
          AND t6.userid = '".$userid."'
          group by t6.vehiculoid 

      ";  

      $consultau = $db->prepare($sqlu);

      $consultau->execute();

      

      while($filau = $consultau->fetch()){

          $usuarios[] = array(

              "pernota" => $filau['pernota'],
              "placas" => $filau['placas'],
              "responsable" => $filau['responsable'],
              "modelo" => $filau['modelo'],
              "gps" => $filau['gps'],
              "vehiculoid" => $filau['vehiculoid'],

              "fechacaptura" => $filau['fechacaptura'],

              "descripcion" => $filau['descripcion'],   

              "observaciones" => $filau['observaciones'],   

              "name" => $filau['name'],   

              "idtipo" => $filau['idtipo'],   

              "icon" => $filau['imgpath'],
              "observaciones" => $filau['observaciones'],
              "serievehiculo" => $filau['serievehiculo'],
              "seriemotor" => $filau['seriemotor'],
              "tipouso" => $filau['tipouso'],
              "empresa" => $filau['nombreempresa'],
              "idempresa" => $filau['empresa'],
              "numvehiculo" => $filau['numvehiculo'],
              "notificar" => $filau['notificar']
    

          );

      }

      

      return $usuarios;

    }


    
    public function CambiarRzon($flotillaid, $userid){
             
      $conexion = new Conexion();
    $db = $conexion->getConexion(); 
    

    $Query = "SELECT t1.userid as departamento
    FROM usuarios  t1  
    INNER JOIN acceso_usuarios t2 ON t1.userid = t2.userid 
    WHERE t1.userid = '".$userid."'  and t2.flotillaid = '".$flotillaid."'"; 

 

    $consultad = $db->prepare($Query);

    $consultad->execute();

    while($filau = $consultad->fetch()){

      

      $loginres[] = array(

        "usuario" => $filau['userid'], 
        "res" => '1' 

      );

        $_SESSION["user"] = $filau["usuario"];

        $usuario = $filau["usuario"]; 

        $dpto = $filau["departamento"];

      }  
      if(isset($dpto)){ 

        return $loginres;

        }else{

            echo "0";

        }

    }


    

    public function getServicios($idflotilla, $otrosgastos, $fecha, $fechafinal, $vehiculo, $userid, $tipo){

      $usuarios = array();

      $conexion = new Conexion();

      $db = $conexion->getConexion(); 
     
      if($vehiculo == "0"){

      }else{
        $v = "and t2.vehiculoid = '".$vehiculo."'";
      }
      if($fecha == ""){
         
      }else{
        $f = "and date(t1.fecha) >= '".$fecha."'";
      }
      if($fechafinal == ""){

      }else{
        $ff = "and date(t1.fecha) <= '".$fechafinal."'";
      }
      if($tipo == "2"){
        $sqlu = "SELECT t1.*, t2.numvehiculo, t2.modelo, t2.descripcion as vehiculo from servicios t1 
        inner join vehiculos t2 on t1.vehiculoid = t2.vehiculoid
        inner join usuariosvehiculos t6 on t1.vehiculoid = t6.vehiculoid 
        where t2.idflotilla = '".$idflotilla."'
        and otrosgastos = '".$otrosgastos."'
        and t6.userid = '".$userid."'
        and baja = '0'
        ".$v."
        ".$f."
        ".$ff."
        ";  
  
      }else{
        $sqlu = "SELECT t1.*, t2.numvehiculo, t2.modelo, t2.descripcion as vehiculo from servicios t1 
        inner join vehiculos t2 on t1.vehiculoid = t2.vehiculoid
        where t2.idflotilla = '".$idflotilla."'
        and otrosgastos = '".$otrosgastos."'
        and baja = '0'
        ".$v."
        ".$f."
        ".$ff."
        ";  
  
      }
      
      

      $consultau = $db->prepare($sqlu);

      $consultau->execute();

      

      while($filau = $consultau->fetch()){

          $usuarios[] = array(

              "id" => $filau['id'],

              "vehiculoid" => $filau['vehiculoid'], 
              "fecha" => $filau['fecha'],    
              "documento" => $filau['documento'], 
              "odometro" => $filau['odometro'],
              "vehiculo" => $filau['vehiculo'],
              "documentoservicio" => $filau['documentoservicio'],
              "cotizacionservicio" => $filau['cotizacion'],
              "fechaproximo" => $filau['fechaproximo'],
              "precio" => number_format($filau['precio'], 2, '.', ''),
              "servicio" => $filau['servicio'],
              "foliooc" => $filau['foliooc'],
              "numvehiculo" => $filau['numvehiculo'], 
              "modelo" => $filau['modelo'],
              "kilometraje" => $filau['kilometraje']

          );

      }

      

      return $usuarios;

    }

    
    public function getGastos($idflotilla, $otrosgastos, $fecha, $fechafinal, $vehiculo, $userid, $tipo){

      $usuarios = array();

      $conexion = new Conexion();

      $db = $conexion->getConexion(); 
     
      if($vehiculo == "0"){

      }else{
        $v = "and t2.vehiculoid = '".$vehiculo."'";
      }
      if($fecha == ""){
         
      }else{
        $f = "and date(t1.fecha) >= '".$fecha."'";
      }
      if($fechafinal == ""){

      }else{
        $ff = "and date(t1.fecha) <= '".$fechafinal."'";
      }

      if($tipo == "2"){
        $sqlu = "SELECT t1.*, t2.numvehiculo, t2.modelo, t2.descripcion as vehiculo from servicios t1 
        inner join vehiculos t2 on t1.vehiculoid = t2.vehiculoid
        inner join usuariosvehiculos t6 on t1.vehiculoid = t6.vehiculoid 
        where t2.idflotilla = '".$idflotilla."'
        and otrosgastos = '".$otrosgastos."' and t6.userid = '".$userid."'
        and baja = '0'
        ".$v."
        ".$f."
        ".$ff."
        ";  
      }else{
        $sqlu = "SELECT t1.*, t2.numvehiculo, t2.modelo, t2.descripcion as vehiculo from servicios t1 
        inner join vehiculos t2 on t1.vehiculoid = t2.vehiculoid
        where t2.idflotilla = '".$idflotilla."'
        and otrosgastos = '".$otrosgastos."'
        and baja = '0'
        ".$v."
        ".$f."
        ".$ff."
        ";  
      }
     

      

      $consultau = $db->prepare($sqlu);

      $consultau->execute();

      

      while($filau = $consultau->fetch()){

          $usuarios[] = array(

              "id" => $filau['id'],

              "vehiculoid" => $filau['vehiculoid'], 
              "fecha" => $filau['fecha'],    
              "documento" => $filau['documento'], 
              "odometro" => $filau['odometro'],
              "vehiculo" => $filau['vehiculo'],
              "documentoservicio" => $filau['documentoservicio'],
              "cotizacionservicio" => $filau['cotizacion'],
              "fechaproximo" => $filau['fechaproximo'],
              "precio" => number_format($filau['precio'], 2, '.', ''),
              "servicio" => $filau['servicio'],
              "foliooc" => $filau['foliooc'],
              "numvehiculo" => $filau['numvehiculo'], 
              "modelo" => $filau['modelo'],
              "kilometraje" => $filau['kilometraje']

          );

      }

      

      return $usuarios;

    }


    
    public function getServiciosVehiculo($vehiculoid){

      $usuarios = array();

      $conexion = new Conexion();

      $db = $conexion->getConexion(); 

      $sqlu = "SELECT t1.*, t2.descripcion as vehiculo from servicios t1 
      inner join vehiculos t2 on t1.vehiculoid = t2.vehiculoid
      where t1.vehiculoid = '".$vehiculoid."'
      ";  
      
      $consultau = $db->prepare($sqlu);

      $consultau->execute();

      

      while($filau = $consultau->fetch()){

          $usuarios[] = array(

              "id" => $filau['id'],

              "vehiculoid" => $filau['vehiculoid'], 
              "fecha" => $filau['fecha'],    
              "documento" => $filau['documento'], 
              "odometro" => $filau['odometro'],
              "vehiculo" => $filau['vehiculo'],
              "documentoservicio" => $filau['documentoservicio'], 
              "fechaproximo" => $filau['fechaproximo']


          );

      }

      

      return $usuarios;

    }



    /*

    public function getVehiculos2(){

      // $usuarios = array();

      $conexion = new Conexion();

      $db = $conexion->getConexion();

      $sql = "SELECT * FROM vehiculos2"; 

      $consulta = $db->prepare($sql);

      $consulta->execute();

      $documentos = [];

          while($row = $consulta->fetch(PDO::FETCH_ASSOC)){

              array_push($documentos, $row);

          }

      return json_encode($documentos);

    }

    */



    public function getFirmas($idorden){

 

      $a = array();

      $vector = array();

      $conexion = new Conexion();

      $db = $conexion->getConexion();

      $sqla = "SELECT * FROM autorizacion where idrequisicion = '".$idorden."'";

      $consultaa = $db->prepare($sqla);

      $consultaa->execute();

      while($filaa = $consultaa->fetch()){

        $a[] = array(

          "userid" => $filaa["userid"],

          "tipo" => $filaa["tipo"],

          "autorizado" => $filaa["autorizado"]

        );

      } 

 

        foreach ($a as $au){

          if($au["autorizado"] == "1"){

            





            $sql = "SELECT * FROM galeria where userid = '".$au["userid"]."'";

            $consulta = $db->prepare($sql);

            $consulta->execute();

            while($fila = $consulta->fetch()){

                $vector[] = array(

                    "id" => $fila['id'],

                    "tipo" => $au["tipo"],

                    "descripcion" => $fila['descripcion'],

                    "imagen" => base64_encode($fila['imagen']));

            }





          }else{

            

          }

          

        }



/*

      $sql = "SELECT * FROM galeria t1 inner join ordencompra t2 on t1.";

      $consulta = $db->prepare($sql);

      $consulta->execute();

      while($fila = $consulta->fetch()){

          $vector[] = array(

              "id" => $fila['id'],

              "descripcion" => $fila['descripcion'],

              "imagen" => base64_encode($fila['imagen']));

      }

  */ 

          return $vector;

  

          

      }



    public function getImagenes(){

 

    $vector = array();

    $conexion = new Conexion();

    $db = $conexion->getConexion();

    $sql = "SELECT * FROM galeria";

    $consulta = $db->prepare($sql);

    $consulta->execute();

    while($fila = $consulta->fetch()){

        $vector[] = array(

            "id" => $fila['id'],

            "descripcion" => $fila['descripcion'],

            "imagen" => base64_encode($fila['imagen']));

    }

 

        return $vector;



        

    }



    public function addUsuario($name,  $user, $password, $tipo){

  

      $conexion = new Conexion();

      $db = $conexion->getConexion();

      $sql = "INSERT INTO usuarios (name, usuario, contra, tipo) VALUES (:name,:user,:password,:tipo)"; 

      $consulta = $db->prepare($sql);

      $consulta->bindParam(':name', $name); 

      $consulta->bindParam(':user', $user);

      $consulta->bindParam(':password', $password);

      $consulta->bindParam(':tipo', $tipo);

      $consulta->execute();

    

      return '{"msg":"Usuario agregado correctamente"}';

    }

    





    public function addImagen($descripcion, $imagen, $userid){

  

        $conexion = new Conexion();

        $db = $conexion->getConexion();

        $sql = "INSERT INTO galeria (descripcion, imagen, userid) VALUES (:descripcion, :imagen, :userid)";

        $consulta = $db->prepare($sql);

        $consulta->bindParam(':descripcion', $descripcion);

        $consulta->bindParam(':imagen', $imagen);

        $consulta->bindParam(':userid', $userid);

        $consulta->execute();

      

        return '{"msg":"Firma agregada correctamente"}';

      }

      

      public function deleteImagen($id){

        

        $conexion = new Conexion();

        $db = $conexion->getConexion();

        $sql = "DELETE FROM galeria WHERE id=:id"; 

        $consulta = $db->prepare($sql);

        $consulta->bindParam(':id', $id); 

        $consulta->execute();

      

        return '{"msg":"Firma eliminada"}';

      }

          

      public function deleteUsuario($id){

        

        $conexion = new Conexion();

        $db = $conexion->getConexion();

        $sql = "UPDATE usuarios set baja = '1' WHERE userid=:id";

        $consulta = $db->prepare($sql);

        $consulta->bindParam(':id', $id); 

        $consulta->execute(); 

        return '{"msg":"Usuario eliminado"}';



      }



      public function insertDocument($filename, $filedesc, $IDvehiculo, $file, $tipo){

        $savepath = "./documentos/";

        move_uploaded_file($file["file"]["tmp_name"], $savepath.$file["file"]['name']);



        $conexion = new Conexion();

        $db = $conexion->getConexion();

        $sql = "INSERT INTO documents (Filename, Filedesc, Filepath, IDvehiculo, tipo) values ('{$filename}', '{$filedesc}', '{$file['file']['name']}', '{$IDvehiculo}', '{$tipo}')";

        $consulta = $db->prepare($sql);

        $consulta->execute(); 



        return 'Documento guardado';

      }


      public function getDocumentos($folio){

        $TodosGrupos = array();
  
        $conexion = new Conexion();
  
        $db = $conexion->getConexion();
  
        $sqld = "SELECT t1.* FROM documents t1 
         where t1.IDvehiculo = '".$folio."' and t1.tipo = '2'";
  //tipo 2 para siniestros
        $consultad = $db->prepare($sqld);
  
        $consultad->execute();
  
        while($filau = $consultad->fetch()){
  
            $TodosGrupos[] = array(
  
              "folio" => $filau['ID'], 
              "descripcion" => $filau['Filename'],
              "documento" => $filau['FilePath'] 
  
  
            );
  
        }
  
          return $TodosGrupos;  
  
    }

      public function getDocuments($IDvehiculo){

        $conexion = new Conexion();

        $db = $conexion->getConexion();

        $sql = "SELECT t1.*, t2.descripcion as descvehiculo FROM documents t1 INNER JOIN vehiculos t2 ON t1.IDvehiculo = t2.vehiculoid WHERE IDvehiculo={$IDvehiculo}";
 
        $consulta = $db->prepare($sql);

        $consulta->execute(); 
 


        $documentos = [];

        while($row = $consulta->fetch(PDO::FETCH_ASSOC)){

          //print_r($row);

          array_push($documentos, $row);

        }

        //print_r($documentos);

        return json_encode($documentos);

      }

      public function getDocumentsTodos($idflotilla){

        $conexion = new Conexion();

        $db = $conexion->getConexion();

        $sql = "SELECT t1.ID, DATE_FORMAT(t1.UploadDate, '%d/%m/%Y %H:%i:%s') as UploadDate, t1.Filename, t1.FileDesc, t1.FilePath, t1.IDvehiculo
         FROM documents t1 INNER JOIN vehiculos t2 ON t1.IDvehiculo = t2.vehiculoid where t1.tipo = '1' and t2.idflotilla = '".$idflotilla."'";

        $consulta = $db->prepare($sql);

        $consulta->execute(); 

 

        $documentos = [];

        while($row = $consulta->fetch(PDO::FETCH_ASSOC)){

          //print_r($row);

          array_push($documentos, $row);

        }

        //print_r($documentos);

        return json_encode($documentos);

      }



      public function insertVehiculo2($nombre, $placas, $alta, $vencimiento, $img, $savepath){

        move_uploaded_file($img["file"]["tmp_name"], $savepath.$img["file"]['name']);



        $conexion = new Conexion();

        $db = $conexion->getConexion();

        $sql = "INSERT INTO vehiculos2 SET nombre='{$nombre}', placas='{$placas}', alta='{$alta}', vencimiento='{$vencimiento}', rutaimg='{$img['file']['name']}'";

        $consulta = $db->prepare($sql);

        $consulta->execute(); 



        return 'Vehículo agregado';

      }

      public function agregarCorreo($vehiculoid, $correo, $tipo){
 


        $conexion = new Conexion();

        $db = $conexion->getConexion();

        $sql = "INSERT INTO correosvehiculo SET vehiculoid='{$vehiculoid}', correo='{$correo}', tipo='{$tipo}'";

        $consulta = $db->prepare($sql);

        $consulta->execute(); 



        return 'Correo agregado correctamente';

      }
      public function agregarUsuarioVehiculo($userid, $vehiculoid){
 


        $conexion = new Conexion();

        $db = $conexion->getConexion();

        $sql = "INSERT INTO usuariosvehiculos SET vehiculoid='{$vehiculoid}', userid='{$userid}'";

        $consulta = $db->prepare($sql);

        $consulta->execute(); 



        return 'Usuario agregado correctamente';

      }
      

      

      public function guardarRefaccionCompras($vehiculoid, $producto, $descripcion, $proveedor, $fecha, $precio, $foliooc){

        $conexion = new Conexion();

        $db = $conexion->getConexion();
        
        $sql = "INSERT INTO refacciones (vehiculoid, fechacompra, refaccion, descripcion, precio, proveedor, foliooc) 
        values ('{$vehiculoid}','{$fecha}','{$producto}','{$descripcion}','{$precio}', '{$proveedor}', '{$foliooc}')";


        if ($db->query($sql) == TRUE) {
          return "Agregado correctamente";
        } else {
          return "Error al guardar";
        }
      }

      public function guardarAccesorioCompras($vehiculoid, $producto, $descripcion, $proveedor, $fecha, $precio, $foliooc){

        $conexion = new Conexion();

        $db = $conexion->getConexion();
        
        $sql = "INSERT INTO accesorios (vehiculoid, fechacompra, accesorio, descripcion, precio, proveedor, foliooc) 
        values ('{$vehiculoid}','{$fecha}','{$producto}','{$descripcion}','{$precio}', '{$proveedor}', '{$foliooc}')";


        if ($db->query($sql) == TRUE) {
          return "Agregado correctamente";
        } else {
          return "Error al guardar";
        }
      }

      public function addRefaccion($vehiculoid, $fechacompra, $refaccion, $descripcion, $precio, $proveedor, $documentorefaccion){

        $conexion = new Conexion();

        $db = $conexion->getConexion();

        $savepath = "./DocumentoRefaccion/";

        // print_r($img);

        move_uploaded_file($documentorefaccion["documentorefaccion"]["tmp_name"], $savepath.$documentorefaccion["documentorefaccion"]['name']);



        $sql = "INSERT INTO refacciones (vehiculoid, fechacompra, refaccion, descripcion, precio, proveedor, documentorefaccion) values ('{$vehiculoid}','{$fechacompra}','{$refaccion}','{$descripcion}','{$precio}', '{$proveedor}', '{$documentorefaccion['documentorefaccion']['name']}')";


        if ($db->query($sql) == TRUE) {
          return "Refacción agregada correctamente";
        } else {
          return "Error al guardar";
        }


      }
      public function addCarga($vehiculoid, $fechacarga, $kilometraje, $kilometrajefinal, $litros, $importe, $ticket){

        $conexion = new Conexion();

        $db = $conexion->getConexion();

        $sql = "INSERT INTO carga (vehiculoid, fechacarga, kilometraje, kilometrajefinal, litros, importe, ticket) values ('{$vehiculoid}','{$fechacarga}','{$kilometraje}','{$kilometrajefinal}','{$litros}','{$importe}','{$ticket}')";


        if ($db->query($sql) == TRUE) {
          return "Carga agregada correctamente";
        } else {
          return "Error al guardar";
        }


      }


      
      public function addCargaRendimiento($vehiculoid, $fechafinmes, $kilometrajefinmes){

        $conexion = new Conexion();

        $db = $conexion->getConexion();

        $sql = "INSERT INTO rendimientomensual (vehiculoid, fecha, kilometraje) values ('{$vehiculoid}','{$fechafinmes}','{$kilometrajefinmes}')";


        if ($db->query($sql) == TRUE) {
          return "Agregado correctamente";
        } else {
          return "Error al guardar";
        }


      }

      

      
      public function addMulta($descripcion, $idchofer, $importe, $vehiculoid, $fechamulta){

        $conexion = new Conexion();

        $db = $conexion->getConexion();

        $sql = "INSERT INTO multas (descripcion, idchofer, importe, vehiculoid, fechamulta) values ('{$descripcion}','{$idchofer}','{$importe}','{$vehiculoid}','{$fechamulta}')";


        if ($db->query($sql) == TRUE) {
          return "Multa agregada correctamente";
        } else {
          return "Error al guardar";
        }


      }

      public function guardarInventario($producto, $descripcion, $proveedor, $fecha, $precio){

        $conexion = new Conexion();

        $db = $conexion->getConexion();

        $sql = "INSERT INTO inventario (producto, descripcion, proveedor, fechacompra, precio) values ('{$producto}','{$descripcion}','{$proveedor}','{$fecha}','{$precio}')";


        if ($db->query($sql) == TRUE) {
          return "Agregado correctamente";
        } else {
          return "Error al guardar";
        }


      }

      



      
      public function addSiniestro($idchofer, $vehiculoid, $fecha, $descripcion, $deducible){

        $conexion = new Conexion();

        $db = $conexion->getConexion();

        $sql = "INSERT INTO siniestros (idchofer, vehiculoid, fecha, descripcion, deducible) values ('{$idchofer}','{$vehiculoid}','{$fecha}','{$descripcion}','{$deducible}')";


        if ($db->query($sql) == TRUE) {
          return "Siniestro agregado correctamente";
        } else {
          return "Error al guardar";
        }


      }


      public function addPlacas($vehiculoid, $placas, $fechainicial, $fechafinal, $placadocumento){

        $conexion = new Conexion();

        $db = $conexion->getConexion();

        $savepath = "./PlacasDocumentos/";
 

          move_uploaded_file($placadocumento["placadocumento"]["tmp_name"], $savepath.$placadocumento["placadocumento"]['name']);



        $sql = "INSERT INTO placas (vehiculoid, placas, fechainicial, fechafinal, placadocumento) values ('{$vehiculoid}','{$placas}','{$fechainicial}','{$fechafinal}', '{$placadocumento['placadocumento']['name']}')";
 
        if ($db->query($sql) == TRUE) {
          return "Placa agregada correctamente";
        } else {
          return "Error al guardar";
        }


      }


      

      public function addTanque($vehiculoid, $capacidad, $descripcion, $documentotanque, $serie, $fechafactura){

        $conexion = new Conexion();

        $db = $conexion->getConexion(); 

        $savepath = "./DocumentoTanque/";  

        move_uploaded_file($documentotanque["complementodocumento"]["tmp_name"], $savepath.$documentotanque["complementodocumento"]['name']);

 
        $sql = "INSERT INTO tanques (vehiculoid, capacidad, descripcion, factura, serie, fechafactura) values ('{$vehiculoid}','{$capacidad}','{$descripcion}', '{$documentotanque['complementodocumento']['name']}', '{$serie}', '{$fechafactura}')";
 
        if ($db->query($sql) == TRUE) {
          return "Información agregada correctamente";
        } else {
          return "Error al guardar";
        }


      }

      public function addSeguro($vehiculoid, $noseguro, $compania, $fechainicial, $fechafinal, $documentoseguro){

        $conexion = new Conexion();

        $db = $conexion->getConexion(); 

        $savepath = "./DocumentoSeguro/";

        move_uploaded_file($documentoseguro["documentoseguro"]["tmp_name"], $savepath.$documentoseguro["documentoseguro"]['name']);


        $sql = "INSERT INTO seguros (vehiculoid, noseguro, compania, fechainicial, fechafinal, documentoseguro) values ('{$vehiculoid}','{$noseguro}','{$compania}','{$fechainicial}','{$fechafinal}', '{$documentoseguro['documentoseguro']['name']}')";
 
        if ($db->query($sql) == TRUE) {
          return "Seguro agregado correctamente";
        } else {
          return "Error al guardar";
        }


      }

      public function eliminarRefaccion($folio){
       
        $conexion = new Conexion();

        $db = $conexion->getConexion();

        $sqld = "UPDATE refacciones set baja = '1' where folio = '".$folio."' ";

        $consultad = $db->prepare($sqld);

        $consultad->execute();  

     

            return "Actualizado Correctamente";
      } 
      public function eliminarRendimiento($folio){
       
        $conexion = new Conexion();

        $db = $conexion->getConexion();

        $sqld = "UPDATE rendimientomensual set baja = '1' where folio = '".$folio."' ";

        $consultad = $db->prepare($sqld);

        $consultad->execute();  

     

            return "Actualizado Correctamente";
      } 

      public function eliminarCarga($folio){
       
        $conexion = new Conexion();

        $db = $conexion->getConexion();

        $sqld = "UPDATE carga set baja = '1' where folio = '".$folio."' ";

        $consultad = $db->prepare($sqld);

        $consultad->execute();  

     

            return "Actualizado Correctamente";
      } 


      public function eliminarOtrosGastos($folio){
       
        $conexion = new Conexion();

        $db = $conexion->getConexion();

        $sqld = "UPDATE servicios set baja = '1' where id = '".$folio."' ";

        $consultad = $db->prepare($sqld);

        $consultad->execute();  

     

            return "Actualizado Correctamente";
      } 
}







?>