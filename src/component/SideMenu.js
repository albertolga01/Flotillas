import React, { useState, useEffect } from 'react'
import App from '../App';
import Placas from '../placas';
import Expediente from '../expediente';
import Seguros from '../seguros';
import Refacciones from '../refacciones';
import Rendimiento from '../rendimiento';
import NvaRequisicion from '../Nvarequisicion';
import Ordenes from '../Ordenes';

import OpcionesMenu from './OpcionesMenu'; 
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

    const [isMenuOpen1, SetIsMenuOpen1] = useState(true);

    function logOut() {
        window.location.reload();
    }

    function cambiarSelected(selected){ 
        setSelect(selected);
        if(isMenuOpen1 == true){
            SetIsMenuOpen1(false);
        }
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

       
<OpcionesMenu dptoid={props.dptoid} unmount={cambiarSelected} admin={props.admin} name={props.name} isMenuOpen1={isMenuOpen1}></OpcionesMenu>

            <Element selected={selected} />


        </div>
    )
}
