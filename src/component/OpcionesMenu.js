import React, { useState, useEffect } from 'react'  
import { FaCheckCircle, FaTrash, FaEdit, FaRedditAlien, FaEye, FaTruck, FaAssistiveListeningSystems, FaWhmcs, FaUser, FaGasPump, FaFileArchive, FaFileUpload } from 'react-icons/fa'

import { slide as Menu } from 'react-burger-menu'

export default function OpcionesMenu(props) {

     const [isMenuOpen1, SetIsMenuOpen1] = useState(props.isMenuOpen1);
    // console.log(props.selected);
    console.log(props.dptoid);

   

    function Seleccionar(elemento){ 
        if(isMenuOpen1 == true){ 
            SetIsMenuOpen1(false); 
        }  
        props.unmount(elemento);   
    }



    var isMenuOpen = function(state) {
 
        SetIsMenuOpen1(state.isOpen);
        return state.isOpen;
      }; 

    
   
    function logOut() {
        window.location.reload();
    }

    async function CambiarRzon(){  
        var select = document.getElementById("select").value; 
         props.unmountMe(select);    
    }
   

    return (

     
          <Menu left   isOpen={ isMenuOpen1 } onStateChange={ isMenuOpen } >
                
                <div id="sidepanel" style={{width:'100%'}}>
                <img id="sidepanel-logo" alt="Logo" />
                <br></br>   
                        
                        <select style={{width:'100%',maxWidth:'100%', fontWeight:'bold', color:'white', backgroundColor:'#0071ce', border:'none', textAlignLast:'center'}} id="select" onChange={()=> CambiarRzon()}> 
                              {  
                                  props.dptos.map(item => (  
                                      <option value={item.idflotilla}>{item.nombre}</option> 
                                  )) 
                              }   
                          </select>    
                          <br></br>
                <label style={{ width: '100%',textAlign: 'center', color: 'white', fontSize: '12px', paddingBottom: '.4rem', paddingTop: '.4rem', borderBottom: '2px solid white' }}>
                    <b>Bienvenido:</b> {props.name}
                </label>
                <br></br>
                <br></br>
              
                
                {(props.tipo != "2") ?
                <div id="sidebtn" onClick={() => { Seleccionar("3"); }}>
                    <img id="sideimg14" alt="" />
                    <span>Nuevo Vehículo</span>
                </div>
                    :
                    <label></label>
                }
                {(props.tipo != "2") ?
                <div id="sidebtn" onClick={() => { Seleccionar("Vehiculos"); }}>
                    <img id="sideimg11" alt="" />
                    <span>Vehículos</span>
                </div>
                :
                <label></label>
                }
                {(props.tipo != "2") ?
                <div id="sidebtn" onClick={() => { Seleccionar("Vehiculoscomplemento"); }}>
                    <img id="sideimg3" alt="" />
                    <span>Vehículos Complementos</span>
                </div>
                :
                <label></label>
                }

                {(props.tipo != "2") ?
                <div id="sidebtn" onClick={() => { Seleccionar("2"); }}>
                    <img id="sideimg10" alt="" />
                    <span>Placas</span>
                </div>
                    :
                    <label></label>
                }
                {(props.tipo != "2") ?
                <div id="sidebtn" onClick={() => { Seleccionar("7"); }}>
                <FaFileUpload style={{ width: '20px', height: '20px', marginLeft: '5px' }} />
                <span>Expediente</span>
            </div>
                    :
                    <label></label>
                }
                {(props.tipo != "2") ?
                  <div id="sidebtn" onClick={() => { Seleccionar("Servicios"); }}>
                    <img id="sideimg12" alt="" />
                    <span>Servicios</span>
                </div>
                :
                <label></label>
                }
                    {(props.tipo != "2") ?
                  <div id="sidebtn" onClick={() => { Seleccionar("OtrosGastos"); }}>
                    <img id="sideimg12" alt="" />
                    <span>Gastos por Servicios</span>
                </div>
                :
                <label></label>
                }

                {(props.tipo != "2") ?

                <div id="sidebtn" onClick={() => { Seleccionar("Multas"); }}>
                    <img id="sideimg13" alt="" />
                    <span>Multas</span>
                </div>
                :
                <label></label>
                }
                {(props.tipo != "2") ?

                <div id="sidebtn" onClick={() => { Seleccionar("Siniestros"); }}>
                    <img id="sideimg9" alt="" />
                    <span>Siniestros</span>
                </div>
                :
                <label></label>
                }
                 {(props.tipo != "2") ?
                <div id="sidebtn" onClick={() => { Seleccionar("Dictamenes"); }}>
                    <img id="sideimg15" alt="" />
                    <span>Dictámenes</span>
                </div>
                :
                <label></label>
                }
                {(props.tipo != "2") ?
                <div id="sidebtn" onClick={() => { Seleccionar("4"); }}>
                <img id="sideimg2" alt="" />
                <span>Seguros</span>
                 </div>

                    :
                    <label></label>
                }
                 {(props.tipo != "2") ?

                <div id="sidebtn" onClick={() => { Seleccionar("5"); }}>
                    <FaWhmcs style={{ width: '20px', height: '20px', marginLeft: '5px' }} />
                    <span>Refacciones</span>
                </div>
                :
                <label></label>
                }
                <div id="sidebtn" onClick={() => { Seleccionar("6"); }}>
                    <FaGasPump style={{ width: '20px', height: '20px', marginLeft: '5px' }} />
                    <span>Rendimiento</span>
                </div>

                {(props.tipo != "2") ?
                    <div id="sidebtn" onClick={() => { Seleccionar("1"); }}>
                    <FaUser style={{ width: '20px', height: '20px', marginLeft: '5px' }} />
                    <span>Usuarios</span>
                    </div>

                    :
                    <label></label>
                }
                {(props.tipo != "2") ?
                
                <div id="sidebtn" onClick={() => { Seleccionar("Gastosvehiculo"); }}>
                    <img id="sideimg16" alt="" />
                    <span>Gastos Vehículos</span>
                </div>
                :
                <label></label>
                }
                <div id="sidebtn" onClick={() => logOut()}>
                    <img id="sideimg5" alt="" />
                    <span>Cerrar sesión</span>
                </div>

            </div>

            </Menu>      
           

 
    )
}
