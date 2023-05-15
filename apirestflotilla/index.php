<?php 



require_once('conexion.php'); 

require_once('api.php');

require_once('cors.php');

$method = $_SERVER['REQUEST_METHOD'];



if($method == "GET"){

    if($_GET["id"] == "verRefacciones"){

        $refacciones = array();
        $apid = new Api();
        $vehiculoid = $_GET['vehiculoid'];
        $refacciones = $apid->verRefacciones($vehiculoid);
        $jrefacciones = json_encode($refacciones);
        echo $jrefacciones;

        }
        if($_GET["id"] == "verRendimiento"){

            $refacciones = array();
            $apid = new Api();
            $vehiculoid = $_GET['vehiculoid'];
            $refacciones = $apid->verRendimiento($vehiculoid);
            $jrefacciones = json_encode($refacciones);
            echo $jrefacciones;
    
            }

    if($_GET["id"] == "verSeguro"){

        $refacciones = array();
        $apid = new Api();
        $vehiculoid = $_GET['vehiculoid'];
        $refacciones = $apid->verSeguro($vehiculoid);
        $jrefacciones = json_encode($refacciones);
        echo $jrefacciones;

        }

    if($_GET["id"] == "verVehiculo"){

        $refacciones = array();
        $apid = new Api();
        $vehiculoid = $_GET['vehiculoid'];
        $refacciones = $apid->verVehiculo($vehiculoid);
        $jrefacciones = json_encode($refacciones);
        echo $jrefacciones;

        }
    
    
    if($_GET["id"] == "getPlacas"){

        $refacciones = array();
        $apid = new Api();
        $idflotilla = $_GET["idflotilla"];
        $userid = $_GET["userid"];
            $tipo = $_GET["tipo"];
        $refacciones = $apid->getPlacas($idflotilla, $userid, $tipo);
        $jrefacciones = json_encode($refacciones);
        echo $jrefacciones;

        }


        if($_GET["id"] == "getInventario"){

            $refacciones = array();
            $apid = new Api();
            $refacciones = $apid->getInventario();
            $jrefacciones = json_encode($refacciones);
            echo $jrefacciones;
    
            }


        if($_GET["id"] == "getTanques"){

            $refacciones = array();
            $apid = new Api();
            $idflotilla = $_GET["idflotilla"];
            $userid = $_GET["userid"];
            $tipo = $_GET["tipo"];
            $refacciones = $apid->getTanques($idflotilla, $userid, $tipo);
            $jrefacciones = json_encode($refacciones);
            echo $jrefacciones;
    
            }

        if($_GET["id"] == "getPlacasProximo"){ 
            $refacciones = array();
            $apid = new Api();
            $idflotilla = $_GET["idflotilla"];
            $userid = $_GET["userid"];
            $tipo = $_GET["tipo"];
            $refacciones = $apid->getPlacasProximo($idflotilla, $userid, $tipo);
            $jrefacciones = json_encode($refacciones);
            echo $jrefacciones;
    
            }

            if($_GET["id"] == "getSeguros"){

                $refacciones = array();
                $apid = new Api();
                $idflotilla = $_GET["idflotilla"];
                $userid = $_GET["userid"];
                $tipo = $_GET["tipo"];  
                $refacciones = $apid->getSeguros($idflotilla, $userid, $tipo);
                $jrefacciones = json_encode($refacciones);
                echo $jrefacciones;
        
                }
        
                if($_GET["id"] == "getSegurosProximo"){
        
                    $refacciones = array();
                    $apid = new Api();
                    $idflotilla = $_GET["idflotilla"];
                    $userid = $_GET["userid"];
                    $tipo = $_GET["tipo"];  
                    $refacciones = $apid->getSegurosProximo($idflotilla, $userid, $tipo);
                    $jrefacciones = json_encode($refacciones);
                    echo $jrefacciones;
            
                    }
        

    if($_GET["id"] == "getRefacciones"){

        $refacciones = array();
        $apid = new Api();
        $idflotilla = $_GET["idflotilla"];
        $userid = $_GET["userid"];
        $tipo = $_GET["tipo"];  
        $refacciones = $apid->getRefacciones($idflotilla, $userid, $tipo);
        $jrefacciones = json_encode($refacciones);
        echo $jrefacciones;

        }

        if($_GET["id"] == "getDictamenesVehiculo"){

            $refacciones = array();
            $apid = new Api();
            $idflotilla = $_GET["idflotilla"];
            $refacciones = $apid->getDictamenesVehiculo($idflotilla);
            $jrefacciones = json_encode($refacciones);
            echo $jrefacciones;
    
            }

            if($_GET["id"] == "getDictamenesVehiculoProximo"){

                $refacciones = array();
                $apid = new Api();
                $idflotilla = $_GET["idflotilla"];
                $periodo = $_GET["periodo"];
                $refacciones = $apid->getDictamenesVehiculoProximo($idflotilla, $periodo);
                $jrefacciones = json_encode($refacciones);
                echo $jrefacciones;
        
                }

       


        if($_GET["id"] == "getRefaccionesDia"){

            $refacciones = array();
            $apid = new Api();
            $fecha = $_GET['fecha'];
            $fechafinal = $_GET['fechafinal'];
            $idflotilla = $_GET["idflotilla"];
            $vehiculo = $_GET["vehiculo"];
            $userid = $_GET["userid"];
            $tipo = $_GET["tipo"];  
            $refacciones = $apid->getRefaccionesDia($fecha, $idflotilla, $fechafinal, $vehiculo, $userid, $tipo);
            $jrefacciones = json_encode($refacciones);
            echo $jrefacciones;
    
            }
            if($_GET["id"] == "getCargas"){

                $refacciones = array();
                $apid = new Api();
                $idflotilla = $_GET["idflotilla"];
                $userid = $_GET["userid"];
                $tipo = $_GET["tipo"];
                $refacciones = $apid->getCargas($idflotilla, $userid, $tipo);
                $jrefacciones = json_encode($refacciones);
                echo $jrefacciones;
        
                }

    
                if($_GET["id"] == "getRendimientoMensual"){
                    
                    $refacciones = array();
                    $apid = new Api();
                    $idflotilla = $_GET["idflotilla"];
                    $fecha = $_GET["fecha"];
                    $userid = $_GET["userid"];
                    $tipo = $_GET["tipo"];
                   
                    $refacciones = $apid->getRendimientoMensual($idflotilla, $fecha, $userid, $tipo);
                    $jrefacciones = json_encode($refacciones);
                    echo $jrefacciones;
            
                    }
     



                
            if($_GET["id"] == "getMultas"){

                $refacciones = array();
                $apid = new Api();
                $idflotilla = $_GET["idflotilla"];
                $userid = $_GET["userid"];
                $tipo = $_GET["tipo"];
                $refacciones = $apid->getMultas($idflotilla, $userid, $tipo);
                $jrefacciones = json_encode($refacciones);
                echo $jrefacciones;
        
                }

                
            if($_GET["id"] == "getSiniestros"){

                $refacciones = array();
                $apid = new Api();
                $idflotilla = $_GET["idflotilla"];
                $userid = $_GET["userid"];
                $tipo = $_GET["tipo"];
                $refacciones = $apid->getSiniestros($idflotilla, $userid, $tipo);
                $jrefacciones = json_encode($refacciones);
                echo $jrefacciones;
        
                }

                if($_GET["id"] == "getMultaDia"){

                    $refacciones = array();
                    $apid = new Api();
                    $fecha = $_GET["fecha"];
                    $idflotilla = $_GET["idflotilla"];
                    $refacciones = $apid->getMultaDia($fecha, $idflotilla);
                    $jrefacciones = json_encode($refacciones);
                    echo $jrefacciones;
            
                    }

                    if($_GET["id"] == "getSiniestroDia"){

                        $refacciones = array();
                        $apid = new Api();
                        $fecha = $_GET["fecha"];
                        $idflotilla = $_GET["idflotilla"];
                        $refacciones = $apid->getSiniestroDia($fecha, $idflotilla);
                        $jrefacciones = json_encode($refacciones);
                        echo $jrefacciones;
                
                        }


                if($_GET["id"] == "getChoferes"){

                    $refacciones = array();
                    $apid = new Api();
                    $refacciones = $apid->getChoferes();
                    $jrefacciones = json_encode($refacciones);
                    echo $jrefacciones;
            
                    }
                if($_GET["id"] == "getCargasDia"){
        
                    $refacciones = array();
                    $apid = new Api();
                    $fecha = $_GET['fecha']; 
                    $fechafinal = $_GET['fechafinal']; 
                    $idflotilla = $_GET["idflotilla"];
                    $vehiculoid = $_GET["vehiculoid"];
                    
                    $refacciones = $apid->getCargasDia($fecha, $idflotilla, $fechafinal, $vehiculoid);
                    $jrefacciones = json_encode($refacciones);
                    echo $jrefacciones;
            
                    }

if($_GET["id"] == "getVehiculos"){

        $departamentos = array();

        $apid = new Api(); 

        $idflotilla = $_GET["idflotilla"];
        $userid = $_GET["userid"];
        $tipo = $_GET["tipo"];

        $departamentos = $apid->getVehiculos($idflotilla, $userid, $tipo);


        $jsondepartamentos = json_encode($departamentos);

        echo $jsondepartamentos;

        }


        
if($_GET["id"] == "getVehiculosAsignados"){

    $departamentos = array();

    $apid = new Api(); 

    $idflotilla = $_GET["idflotilla"];
    $userid = $_GET["userid"];

    $departamentos = $apid->getVehiculosAsignados($idflotilla, $userid);


    $jsondepartamentos = json_encode($departamentos);

    echo $jsondepartamentos;

    }


        if($_GET["id"] == "getServicios"){

            $departamentos = array();
    
            $apid = new Api();

            $idflotilla = $_GET["idflotilla"];
            $otrosgastos = 0;
            $userid = $_GET["userid"];
            $tipo = $_GET["tipo"];  

            $departamentos = $apid->getServicios($idflotilla, $otrosgastos, "", "", "0", $userid, $tipo);
    
            $jsondepartamentos = json_encode($departamentos);
    
            echo $jsondepartamentos;
    
            }


            if($_GET["id"] == "getGastos"){
 
                $departamentos = array();
        
                $apid = new Api();
    
                $idflotilla = $_GET["idflotilla"];
                $fecha = $_GET['fecha'];
                $fechafinal = $_GET['fechafinal']; 
                $vehiculo = $_GET["vehiculo"];
                $otrosgastos = 1;
                $userid = $_GET["userid"];
                $tipo = $_GET["tipo"];  
                $departamentos = $apid->getGastos($idflotilla, $otrosgastos, $fecha, $fechafinal, $vehiculo, $userid, $tipo);
        
                $jsondepartamentos = json_encode($departamentos);
        
                echo $jsondepartamentos;
        
                }
    


           



    if($_GET["id"] == "10"){

        $departamentos = array();

        $apid = new Api();

        $departamentos = $apid->getTipovehiculo();

        $jsondepartamentos = json_encode($departamentos);

        echo $jsondepartamentos;

        }





    if($_GET["id"] == "9"){ //GetFirmas



        $vector = array();

        $idorden = $_GET["idorden"];

        $api = new Api();

        $vector = $api->getDetallesOrden($idorden);

        $json = json_encode($vector);

        echo $json;

        }







    if($_GET["id"] == "8"){ //GetFirmas



        $vector = array();

        $idorden = $_GET["idorden"]; 

        $api = new Api();

        $vector = $api->getFirmas($idorden);

        $json = json_encode($vector);

        echo $json;

        }



    if($_GET["id"] == "7"){ //GetDetalles

        $requisiciones = array();

        $apid = new Api();

        $userid = $_GET["userid"]; 

        $date = $_GET['date']; 

        $dptoid = $_GET["dptoid"];

        $requisiciones = $apid->GetOrdenes($userid, $date, $dptoid);

        $jsonrequisiciones = json_encode($requisiciones);

        echo $jsonrequisiciones;

        }





    if($_GET["id"] == "6"){ //GetDetalles

        $requisiciones = array();

        $id = $_GET["idrequisicion"];

        $apid = new Api();

        $requisiciones = $apid->GetDetalles($id);

        $jsonrequisiciones = json_encode($requisiciones);

        echo $jsonrequisiciones;

        }





    if($_GET["id"] == "5"){ //GetRequisiciones

        $requisiciones = array();

        $apid = new Api();

        $date = $_GET['date'];  

        $dptoid = $_GET["dptoid"];

        $requisiciones = $apid->GetRequisiciones($date, $dptoid);

        $jsonrequisiciones = json_encode($requisiciones);

        echo $jsonrequisiciones;

        }



    if($_GET["id"] == "4"){

        $departamentos = array();

        $apid = new Api();

        $departamentos = $apid->getUsuario();

        $jsondepartamentos = json_encode($departamentos);

        echo $jsondepartamentos;

        }



   

 

    if($_GET["id"] == "3"){

        $departamentos = array();

        $apid = new Api();

        $departamentos = $apid->getDepartamentos();

        $jsondepartamentos = json_encode($departamentos);

        echo $jsondepartamentos;

        }





    if($_GET["id"] == "2"){

    $usuarios = array();

    $apid = new Api();

    $usuarios = $apid->getUsuarios();

    $jsonusuarios = json_encode($usuarios);

    echo $jsonusuarios;

    }


    if($_GET["id"] == "getDocumentos"){ //getTodosGrupos 

        $requisiciones = array();

        $apid = new Api(); 

        $folio = $_GET['folio'];

        $requisiciones = $apid->getDocumentos($folio); 

        echo json_encode($requisiciones); 

    }




    if($_GET["id"] == "1"){

    $vector = array();

    $api = new Api();

    $vector = $api->getImagenes();

    $json = json_encode($vector);

    echo $json;
 
    }

    if($_GET["id"] == "getEmpresas"){       

        $api = new Api();  

        $json = $api->getEmpresas($idcotizacion);   

        echo json_encode($json);

    }


    if($_GET["id"] == "obtenerTiposCorreos"){

        $refacciones = array();      
        $apid = new Api(); 
        $refacciones = $apid->obtenerTiposCorreos();
        $jrefacciones = json_encode($refacciones);
        echo $jrefacciones;

        }

        if($_GET["id"] == "obtenerFlotillas"){

            $refacciones = array();      
            $apid = new Api(); 
            $refacciones = $apid->obtenerFlotillas();
            $jrefacciones = json_encode($refacciones);
            echo $jrefacciones;
    
            }





}



if($method == "POST"){

    if($_POST["id"] == "guardarDesdeCompras"){

        $json = null;
    
         
        $tipo = $_POST['tipo']; 
         
        $api = new Api();
        if($tipo == "refaccion"){
            $producto = $_POST['producto'];   
            $descripcion = $_POST['descripcion'];   
            $proveedor = $_POST['proveedor'];   
            $fecha = $_POST['fecha'];   
            $precio = $_POST['precio'];   
            $vehiculoid = $_POST['vehiculoid'];   
            $foliooc = $_POST['foliooc'];   
              
            $json = $api->guardarRefaccionCompras($vehiculoid, $producto, $descripcion, $proveedor, $fecha, $precio, $foliooc);
            echo $json;
        }
        if($tipo == "servicio"){
            $producto = $_POST['producto'];   
            $descripcion = $_POST['descripcion'];   
            $odometro = $_POST['odometro'];   
            $fecha = $_POST['fecha'];      
            $vehiculoid = $_POST['vehiculoid'];   
            $precio = $_POST['precio'];   
            $foliooc = $_POST['foliooc'];  
            $json = $api->guardarServicioCompras($vehiculoid, $producto, $descripcion, $fecha, $odometro, $precio, $foliooc);
            echo $json;
        }
        if($tipo == "accesorio"){
            $producto = $_POST['producto'];   
            $descripcion = $_POST['descripcion'];   
            $proveedor = $_POST['proveedor'];   
            $fecha = $_POST['fecha'];   
            $precio = $_POST['precio'];   
            $vehiculoid = $_POST['vehiculoid'];   
            $foliooc = $_POST['foliooc'];   
              
            $json = $api->guardarAccesorioCompras($vehiculoid, $producto, $descripcion, $proveedor, $fecha, $precio, $foliooc);
            echo $json;
        }
        }

    if($_POST["id"] == "actualizarVehiculo"){

        $json = null;
    
         
        $vehiculoid = $_POST['vehiculoid'];   
        $responsable = $_POST['responsable'];   
        $tipouso = $_POST['tipouso'];   
        $empresa = $_POST['empresa'];   
        $gps = $_POST['gps'];   
        $numerovehiculo = $_POST['numerovehiculo'];   
        $pernota = $_POST['pernota'];   
        $notificar = $_POST['notificar'];   
        $dictamen = $_POST['dictamen'];   
    
        $api = new Api();
    
        $json = $api->actualizarVehiculo($vehiculoid, $responsable, $tipouso, $empresa, $gps, $numerovehiculo, $pernota, $notificar, $dictamen);
    
        echo $json;
    
        }
 

        if($_POST["id"] == "gastosVehiculo"){

            $json = null;
        
             
            $vehiculoid = $_POST['vehiculoid'];   
            $fechainicial = $_POST['fechainicio'];   
            $fechafinal = $_POST['fechafinal'];     
            $userid = $_POST['userid'];     
            $tipo = $_POST['tipo'];     
                //echo "dfghjk";
        
           $api = new Api();
      
            $json = $api->gastosVehiculo($vehiculoid, $fechainicial, $fechafinal, $userid, $tipo);
        
echo json_encode($json);
        
            }

            if($_POST["id"] == "accesoriosVehiculo"){

                $json = null;
            
                 
                $vehiculoid = $_POST['vehiculoid'];   
                $fechainicial = $_POST['fechainicio'];   
                $fechafinal = $_POST['fechafinal'];     
                $userid = $_POST['userid'];     
                $tipo = $_POST['tipo'];     
                    //echo "dfghjk";
            
               $api = new Api();
          
                $json = $api->accesoriosVehiculo($vehiculoid, $fechainicial, $fechafinal, $userid, $tipo);
            
    echo json_encode($json);
            
                }



            if($_POST["id"] == "gastosVehiculoServicios"){

                $json = null; 
                 
                $vehiculoid = $_POST['vehiculoid'];   
                $fechainicial = $_POST['fechainicio'];   
                $fechafinal = $_POST['fechafinal'];    
                $userid = $_POST['userid'];     
                $tipo = $_POST['tipo']; 
                $api = new Api();
          
                $json = $api->gastosVehiculoServicios($vehiculoid, $fechainicial, $fechafinal,$userid,$tipo);
            
                echo json_encode($json);
            
                }


                if($_POST["id"] == "otrosGastos"){

                    $json = null; 
                     
                    $idservicio = $_POST['idservicio'];    
                    $api = new Api();
              
                    $json = $api->otrosGastos($idservicio);
                
                    echo json_encode($json);
                
                    }

        if($_POST["id"] == "actualizarServicio"){

            $json = null;
        
             
            $vehiculoid = $_POST['vehiculoid'];   
            $fechaproximo = $_POST['fechaproximo'];   
            $odometro = $_POST['odometro'];     
            $idservicio = $_POST['idservicio'];     
        
            $api = new Api();
        
            $json = $api->actualizarServicio($vehiculoid, $odometro, $fechaproximo, $idservicio);
        
            echo $json;
        
            }

        if($_POST["id"] == "agregarCorreo"){

            $refacciones = array();
            $apid = new Api();
            $vehiculoid = $_POST['vehiculoid'];
            $correo = $_POST['correo'];
            $tipo = $_POST['tipocorreo'];
            $refacciones = $apid->agregarCorreo($vehiculoid, $correo, $tipo);
            $jrefacciones = $refacciones;
            echo $jrefacciones;
    
            }

            if($_POST["id"] == "agregarUsuarioVehiculo"){

                $refacciones = array();
                $apid = new Api();
                $userid = $_POST['userid']; 
                $vehiculoid = $_POST['vehiculoid'];
                $refacciones = $apid->agregarUsuarioVehiculo($userid, $vehiculoid);
                $jrefacciones = $refacciones;
                echo $jrefacciones;
        
                }

            if($_POST["id"] == "obtenerCorreos"){

                $refacciones = array();
                $apid = new Api();
                $vehiculoid = $_POST['vehiculoid']; 
                $refacciones = $apid->obtenerCorreos($vehiculoid);
                $jrefacciones = json_encode($refacciones);
                echo $jrefacciones;
        
                }


                if($_POST["id"] == "obtenerUsuariosVehiculo"){

                    $refacciones = array();
                    $apid = new Api();
                    $vehiculoid = $_POST['vehiculoid']; 
                    $refacciones = $apid->obtenerUsuariosVehiculo($vehiculoid);
                    $jrefacciones = json_encode($refacciones);
                    echo $jrefacciones;
            
                    }
                

    if($_POST["id"] == "getDictamenesVehiculo2"){
//no se usa
        $refacciones = array();
        $apid = new Api();
        $vehiculoid = $_POST['vehiculoid'];
        $refacciones = $apid->getDictamenesVehiculo2($vehiculoid);
        $jrefacciones = json_encode($refacciones);
        echo $jrefacciones;

        }


        if($_POST["id"] == "addMulta"){

            $json = null;
        
            $descripcion = $_POST['descripcionMulta'];
            $idchofer = $_POST['idchofer'];
            $importe = $_POST['importe'];  
            $vehiculoid = $_POST['vehiculoid'];  
            $fechamulta = $_POST['fechamulta'];  
        
            $api = new Api();
        
            $json = $api->addMulta($descripcion, $idchofer, $importe, $vehiculoid, $fechamulta);
        
            echo $json;
        
            }


            if($_POST["id"] == "eliminarRefaccion"){

                $json = null;
            
                $folio = $_POST['folio']; 
            
                $api = new Api();
            
                $json = $api->eliminarRefaccion($folio);
            
                echo $json;
            
                }

                if($_POST["id"] == "eliminarOtrosGastos"){

                    $json = null;
                
                    $folio = $_POST['folio']; 
                
                    $api = new Api();
                
                    $json = $api->eliminarOtrosGastos($folio);
                
                    echo $json;
                
                    }
    



                    if($_POST["id"] == "eliminarRendimiento"){

                        $json = null;
                    
                        $folio = $_POST['folio']; 
                    
                        $api = new Api();
                    
                        $json = $api->eliminarRendimiento($folio);
                    
                        echo $json;
                    
                        }

                        
                    if($_POST["id"] == "eliminarCarga"){

                        $json = null;
                    
                        $folio = $_POST['folio']; 
                    
                        $api = new Api();
                    
                        $json = $api->eliminarCarga($folio);
                    
                        echo $json;
                    
                        }
            
        if($_POST["id"] == "addSiniestro"){

            $json = null;
        
            
            $idchofer = $_POST['idchofer'];   
            $vehiculoid = $_POST['vehiculoid'];  
            $fecha = $_POST['fecha'];  
            $descripcion = $_POST['descripcion'];  
            $deducible = $_POST['deducible'];  
        
            $api = new Api();
        
            $json = $api->addSiniestro($idchofer, $vehiculoid, $fecha, $descripcion, $deducible);
        
            echo $json;
        
            }


    if($_POST["id"] == "addCarga"){

        $json = null;
    
        $vehiculoid = $_POST['vehiculoid'];
        $fechacarga = $_POST['fechacarga'];
        $kilometraje = $_POST['kilometraje'];
        $kilometrajefinal = $_POST['kilometrajefinal'];
        $litros = $_POST['litros'];
        $importe = $_POST['importe'];  
        $ticket = $_POST['ticket'];  
    
        $api = new Api();
    
        $json = $api->addCarga($vehiculoid, $fechacarga, $kilometraje, $kilometrajefinal, $litros, $importe, $ticket);
    
        echo $json;
    
        }

        if($_POST["id"] == "addCargaRendimiento"){

            $json = null;
        
            $vehiculoid = $_POST['vehiculoid'];
            $fechafinmes = $_POST['fechafinmes'];
            $kilometrajefinmes = $_POST['kilometrajefinmes']; 
        
            $api = new Api();
        
            $json = $api->addCargaRendimiento($vehiculoid, $fechafinmes, $kilometrajefinmes);
        
            echo $json;
        
            }

    if($_POST["id"] == "addSeguro"){

        $json = null;
    
        $vehiculoid = $_POST['vehiculoid'];
        $noseguro = $_POST['noseguro'];
        $compania = $_POST['compania'];
        $fechainicial = $_POST['fechainicial'];
        $fechafinal = $_POST['fechafinal'];  
        //
        $documentoseguro = $_FILES;
    
        $api = new Api();
    
        $json = $api->addSeguro($vehiculoid, $noseguro, $compania, $fechainicial, $fechafinal, $documentoseguro);
    
        echo $json;
    
        }


        if($_POST["id"] == "addComplemento"){

            $json = null;  
        
            $vehiculoid = $_POST['vehiculoid'];
            $capacidad = $_POST['capacidad'];
            $descripcion = $_POST['descripcion'];  
            $documentotanque = $_FILES; 
            $serie = $_POST['serie'];  
            $fechafactura = $_POST['fechafactura'];  
         
            $api = new Api();
        
            $json = $api->addTanque($vehiculoid, $capacidad, $descripcion, $documentotanque, $serie, $fechafactura);
        
            echo $json;
        
            }
    


        if($_POST["id"] == "getServiciosVehiculo"){

            $departamentos = array();
    
            $apid = new Api();
            $vehiculoid = $_POST['vehiculoid'];
    
            $departamentos = $apid->getServiciosVehiculo($vehiculoid);
    
            $jsondepartamentos = json_encode($departamentos);
    
            echo $jsondepartamentos;
    
            }
    

            if($_POST["id"] == "cargarServicios"){

                $departamentos = array();
        
                $apid = new Api();
                $vehiculoid = $_POST['IDvehiculo'];
                $servicio = $_POST['servicio'];
                $fecha = $_POST['fecha']; 
                $descripcion = $_POST['descripcion'];
                $odometro = $_POST['odometro'];
                $fechaproximo = $_POST['fechaproximo'];
                $kilometraje = $_POST['kilometraje'];
                $documentoservicio = $_FILES;
        
                $departamentos = $apid->cargarServicios($vehiculoid, $servicio, $fecha, $descripcion, $odometro, $documentoservicio, $fechaproximo, $kilometraje);
        
                $jsondepartamentos = $departamentos;
        
                echo $jsondepartamentos;
        
                }

                if($_POST["id"] == "cargarDictamenes"){

                    $departamentos = array();
            
                    $apid = new Api();
                    $IDvehiculo = $_POST['IDvehiculo'];
                    $fecha = $_POST['fecha'];
                    $fechafinal = $_POST['fechafinal'];
                    $dictamen = $_POST['dictamen']; 
                    $descripcion = $_POST['descripcion']; 
                    $documentodictamen = $_FILES;
            
                    $departamentos = $apid->cargarDictamenes($IDvehiculo, $fecha, $dictamen, $descripcion, $documentodictamen, $fechafinal);
            
                    $jsondepartamentos = $departamentos;
            
                    echo $jsondepartamentos;
            
                    }


    if($_POST["id"] == "addPlacas"){

        $json = null;
    
        $vehiculoid = $_POST['vehiculoid'];
        $placas = $_POST['placas'];
        $fechainicial = $_POST['fechainicial'];
        $fechafinal = $_POST['fechafinal'];  
        $placadocumento = $_FILES;
    
        $api = new Api();
    
        $json = $api->addPlacas($vehiculoid, $placas, $fechainicial, $fechafinal, $placadocumento);
    
        echo $json;
    
        }
    

    if($_POST["id"] == "addRefaccion"){

        $json = null;
    
        $vehiculoid = $_POST['vehiculoid'];
        $fechacompra = $_POST['fechacompra'];
        $refaccion = $_POST['refaccion'];
        $descripcion = $_POST['descripcion'];
        $precio = $_POST['precio'];
    
        $userid = $_POST['userid'];
        $proveedor = $_POST['proveedor'];
        $documentorefaccion = $_FILES;
    
        $api = new Api();
    
        $json = $api->addRefaccion($vehiculoid, $fechacompra, $refaccion, $descripcion, $precio, $proveedor, $documentorefaccion);
    
        echo $json;
    
        }
    

 

    if($_POST["id"] == "1"){

    $json = null;

    $foto = (file_get_contents($_FILES['imagen']['tmp_name']));

    $descripcion = $_POST['descripcion'];

    $userid = $_POST['userid'];

    $api = new Api();

    $json = $api->addImagen($descripcion, $foto, $userid);

    echo $json;

    }



    if($_POST["id"] == "2"){

        $json = null; 

        $name = $_POST['name']; 

        $user = $_POST['user'];

        $password = $_POST['password'];

        $tipo = $_POST['tipo'];

        

        $api = new Api();

        $json = $api->addUsuario($name, $user, $password, $tipo);

        echo $json;

        }





    if($_POST["id"] == "3"){

        $json = null;

        $id = $_POST['idimagen'];

        $api = new Api();

        $json = $api->deleteImagen($id);

        echo $json;

        

        

        }



            

        if($_POST["id"] == "4"){ 

            $json = null;

            $id = $_POST['idusuario']; 

            $api = new Api();

            $json = $api->deleteUsuario($id);

            echo $json; 

        }

    



    if($_POST["id"] == "5"){



        $json = null;

        $user = $_POST["user"];

        $pass = $_POST["pass"]; 

        $idflotilla = $_POST["idflotilla"];

        $api = new Api();

        $json = $api->Login($user, $pass, $idflotilla);

        $jsonusuarios = json_encode($json);

        echo $jsonusuarios;

        $_SESSION["user"] = "tets"; 

        

        } 



                



    if($_POST["id"] == "InsertVehiculo"){



        $json = null; 

        $userid = $_POST["userid"];

        $observaciones = $_POST["observaciones"]; 

        $descripcion = $_POST["descripcion"]; 

        $tipo = $_POST["tipo"]; 

       

        $img = $_FILES;
        
        $serievehiculo = $_POST["serievehiculo"]; 
        $seriemotor = $_POST["seriemotor"]; 
        $tipouso = $_POST["tipouso"]; 
        $empresa = $_POST["empresa"]; 
        $numvehiculo = $_POST["numvehiculo"]; 

        $responsable = $_POST["responsable"]; 
        $modelo = $_POST["modelo"]; 
        $gps = $_POST["gps"]; 
        $idflotilla = $_POST["idflotilla"]; 
        

        $api = new Api();

        $json = $api->InsertVehiculo($userid, $observaciones, $descripcion, $tipo, $img, $serievehiculo, $seriemotor, $tipouso, $empresa, $numvehiculo, $responsable, $modelo, $gps, $idflotilla);

        echo $json;

        

        

        } 


        if($_POST["id"] == "CambiarRzon"){



            $json = null;

            $flotillaid = $_POST["flotillaid"];

            $userid = $_POST["userid"];  

            $api = new Api();
 
            $json = $api->CambiarRzon($flotillaid, $userid);

            echo json_encode($json);   
            

            } 



        if($_POST["id"] == "7"){



            $json = null;

            $name = $_POST["name"];

            $folio = $_POST["folio"]; 

            $tipo = $_POST["tipo"]; 

            $api = new Api();

            $json = $api->InsertAutorizacion($name, $folio, $tipo);

            echo $json; 

            

            

            } 



            if($_POST["id"] == "8"){



                $json = null;

                $idrequisicion = $_POST["idrequisicion"]; 

                $productos = $_POST["productos"];

                $dptoid = $_POST["dptoid"];

                $api = new Api();

                $json = $api->GenerarOrden($idrequisicion, $productos, $dptoid);

                echo $json; 

                

                

                } 



                

            if($_POST["id"] == "9"){



                $json = null;

                $idrequisicion = $_POST["idrequisicion"]; 

                $userid = $_POST["userid"];

                $tipo = $_POST["tipo"];

                $api = new Api();

                $json = $api->UpdateAutorizar($idrequisicion, $userid, $tipo);

                echo $json; 

                

                

                } 

                

            

    if($_POST["id"] == "10"){

        $folio = $_POST["folio"];

        $idorden = $_POST["idorden"];

        $costouni = $_POST["preciouni"]; 

        $proveedor = $_POST["proveedor"];

        $estacion = $_POST["estacion"];

        $api = new Api();

        $json1 = $api->guardarPrecios($folio, $costouni);

        $json = $api->guardarProveedorEstacion($idorden, $proveedor, $estacion);

        echo $json.",  ".$json1; 

        } 



        /*if($_POST["id"] == "11"){

            $idorden = $_POST["idorden"];

            //$file = basename($_POST["file"]);  

            //print_r($_FILES['file']); 

            $api = new Api();

            $json = $api->guardarCotizacion($idorden, $_FILES['file']); 

            echo $json;

        } */



        if($_POST["id"] == "12"){

            $idorden = $_POST["idorden"];

            $nvoestado = $_POST["nvoestado"];

            $api = new Api();

            $json = $api->updateOrdenGenerado($idorden, $nvoestado); 

            echo $json;

        }



        if($_POST["id"] == "13"){

            $idrequisicion = $_POST["idrequisicion"];

            $nvoestado = $_POST["nvoestado"];

            $api = new Api();

            $json = $api->updateRequisicionGenerado($idrequisicion, $nvoestado); 

            echo $json;

        }

        if($_POST["id"] == "14"){ 

            $idusuario = $_POST["idusuario"];

            $uno = $_POST["uno"];

            $dos = $_POST["dos"];

            $tres = $_POST["tres"];

            $api = new Api();

            $json = $api->updateAccesos($idusuario, $uno, $dos, $tres); 

            echo $json;

        }

        if($_POST["id"] == "15"){

            $filename = $_POST["Filename"];

            $filedesc = $_POST["Filedesc"];

            $IDvehiculo = $_POST["IDvehiculo"];
            $tipo = $_POST["tipo"];

            $file = $_FILES;

            $api = new Api();

            $json = $api->insertDocument($filename, $filedesc, $IDvehiculo, $file, $tipo); 

            $json = json_encode($json);

            echo $json;

        }

        if($_POST["id"] == "getExpediente"){

            $IDvehiculo = $_POST["IDvehiculo"];

            $api = new Api();

            $json = $api->getDocuments($IDvehiculo); 

            echo($json);

        }
        if($_POST["id"] == "getExpedienteTodos"){
 

            $api = new Api();
            $idflotilla = $_POST["idflotilla"];

            $json = $api->getDocumentsTodos($idflotilla); 

            echo($json);

        }

        if($_POST["id"] == "17"){

            $nombre = $_POST["nombre"];

            $placas = $_POST["placas"];

            $alta = $_POST["alta"];

            $vencimiento = $_POST["vencimiento"];

            $img = $_FILES;

            $savepath = "C:/Programeishon/Flotilla/Vehiculos/";

            $api = new Api();

            $json = $api->insertVehiculo2($nombre, $placas, $alta, $vencimiento, $img, $savepath); 

            echo $json;

        }

}





if($method=="DELETE"){

    $json = null;

    $id = $_REQUEST['id'];

    $tipo = $_REQUEST['tipo'];



    $api = new Api();

    if($tipo == "1"){

     //   $json = $api->deleteImagen($id);

    }

    if($tipo == "2"){

       // $json = $api->deleteUsuario($id);

    }

    echo $json;

}





?>