import React, { useState, useEffect } from 'react'
import App from '../App';
import Placas from '../placas';
import Expediente from '../expediente';
import Seguros from '../seguros';
import Refacciones from '../refacciones';
import Rendimiento from '../rendimiento';
import { FaCheckCircle, FaTrash, FaEdit, FaRedditAlien, FaEye, FaTruck, FaAssistiveListeningSystems, FaWhmcs, FaUser, FaGasPump, FaFileArchive, FaFileUpload } from 'react-icons/fa'
import NvaRequisicion from '../Nvarequisicion';
import Ordenes from '../Ordenes';

export default function SideMenu(props) {

    const [selected, setSelect] = useState(props.selected);
    // console.log(props.selected);


    const Element = () => {

        if (selected == '1') {
            return <App tipo={props.tipo} departamento={props.departamento} dptoid={props.dptoid} />;
        } else if (selected == '2') {
            return <Placas tipo={props.tipo} departamento={props.departamento} dptoid={props.dptoid} userid={props.userid} usuario={props.usuario} name={props.name} />;
        }
        else if (selected == '3') {
            return <NvaRequisicion tipo={props.tipo} departamento={props.departamento} dptoid={props.dptoid} userid={props.userid} usuario={props.usuario} name={props.name} />;
        } else if (selected == '4') {
            return <Seguros tipo={props.tipo} departamento={props.departamento} dptoid={props.dptoid} userid={props.userid} usuario={props.usuario} name={props.name} />;
        } else if (selected == '5') {
            return <Refacciones tipo={props.tipo} departamento={props.departamento} dptoid={props.dptoid} userid={props.userid} usuario={props.usuario} name={props.name} />;
        } else if (selected == '6') {
            return <Rendimiento tipo={props.tipo} departamento={props.departamento} dptoid={props.dptoid} userid={props.userid} usuario={props.usuario} name={props.name} />;
        } else if (selected == '7') {
            return <Expediente tipo={props.tipo} departamento={props.departamento} dptoid={props.dptoid} userid={props.userid} usuario={props.usuario} name={props.name} />;
        }
        else {
            return (<div style={{ width: '100%', textAlign: 'center', backgroundColor: '', margin: 'auto' }}><h1>Error al Cargar</h1></div>);
        }
    }

    useEffect(() => {
        getDepartamentos();
    }, [])

    function logOut() {
        window.location.reload();
    }

    function getDepartamentos() {

        const xhttp = new XMLHttpRequest();

        // Define a callback function
        xhttp.onload = function () {
            // Here you can use the Data
        }

        // Send a request
        var id = "4";
        xhttp.open("GET", "../apirestflotilla/?id=" + id);
        xhttp.send();

        xhttp.onload = function () {
            // console.log(xhttp.response.trim() + "sss");

        }

    }

    return (

        <div style={{ height: '100vh', width: '100vw', position: 'sticky', top: '0', display: 'flex', overflowX: 'auto' }}>

            <div id="sidepanel">
                <img id="sidepanel-logo" alt="Logo" />

                <span style={{ textAlign: 'center', color: 'white', fontSize: '12px', paddingBottom: '.4rem', paddingTop: '.4rem', borderBottom: '2px solid white' }}>
                    <b>Bienvenido:</b> {props.name}
                </span>

            
                
                {(props.tipo != "2") ?
                <div id="sidebtn" onClick={() => { setSelect("3"); }}>
                    <img id="sideimg3" alt="" />
                    <span>Nuevo Vehiculo</span>
                </div>
                    :
                    <label></label>
                }
                {(props.tipo != "2") ?
                <div id="sidebtn" onClick={() => { setSelect("2"); }}>
                    <FaTruck style={{ width: '20px', height: '20px', marginLeft: '5px' }} />
                    <span>Placas</span>
                </div>
                    :
                    <label></label>
                }
                {(props.tipo != "2") ?
                <div id="sidebtn" onClick={() => { setSelect("7"); }}>
                <FaFileUpload style={{ width: '20px', height: '20px', marginLeft: '5px' }} />
                <span>Expediente</span>
            </div>
                    :
                    <label></label>
                }
                {(props.tipo != "2") ?
                <div id="sidebtn" onClick={() => { setSelect("4"); }}>
                <img id="sideimg2" alt="" />
                <span>Seguros</span>
                 </div>

                    :
                    <label></label>
                }

<div id="sidebtn" onClick={() => { setSelect("5"); }}>
                    <FaWhmcs style={{ width: '20px', height: '20px', marginLeft: '5px' }} />
                    <span>Refacciones</span>
                </div>
                <div id="sidebtn" onClick={() => { setSelect("6"); }}>
                    <FaGasPump style={{ width: '20px', height: '20px', marginLeft: '5px' }} />
                    <span>Rendimiento</span>
                </div>

                {(props.tipo != "2") ?
                                               <div id="sidebtn" onClick={() => { setSelect("1"); }}>
                                               <FaUser style={{ width: '20px', height: '20px', marginLeft: '5px' }} />
                                               <span>Usuarios</span>
                                           </div>

                    :
                    <label></label>
                }
                
                
     
                <div id="sidebtn" onClick={() => logOut()}>
                    <img id="sideimg5" alt="" />
                    <span>Cerrar sesión</span>
                </div>

            </div>

            <Element selected={selected} />


        </div>
    )
}
