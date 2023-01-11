import React, { useState, useEffect } from 'react'
import App from '../App';
import Placas from '../placas';
import Expediente from '../expediente';
import Seguros from '../seguros';
import Refacciones from '../refacciones';
import Rendimiento from '../rendimiento';
import Nuevovehiculo from '../Nuevovehiculo';
import Listavehiculos from '../Listavehiculos';
import Servicios from '../Servicios';
import Dictamenes from '../Dictamenes'; 
import Siniestros from '../siniestros';
import Multas from '../multas';
import VehiculoCto from '../Vehiculoscomplemento';




import OpcionesMenu from './OpcionesMenu'; 
export default function SideMenu(props) {

    const [selected, setSelect] = useState(props.selected);
    const [flotilla1, setFlotilla] = useState(props.flotilla1);
    // console.log(props.selected);

    function cambiarRazon(value){ 
        /*  */    
        setFlotilla(value);   
     }
     useEffect(() => {
        getDepartamentos();
        setFlotilla(props.flotilla1);
    }, [])
    const Element = () => {

        if (selected == '1') {
            return <App tipo={props.tipo} departamento={props.departamento} dptoid={props.dptoid} />;
        } else if (selected == '2') {
            return <Placas flotilla={flotilla1} tipo={props.tipo} departamento={props.departamento} dptoid={props.dptoid} userid={props.userid} usuario={props.usuario} name={props.name} />;
        }
        else if (selected == '3') {
            return <Nuevovehiculo flotilla={flotilla1} tipo={props.tipo} departamento={props.departamento} dptoid={props.dptoid} userid={props.userid} usuario={props.usuario} name={props.name} />;
        } else if (selected == '4') {
            return <Seguros flotilla={flotilla1} tipo={props.tipo} departamento={props.departamento} dptoid={props.dptoid} userid={props.userid} usuario={props.usuario} name={props.name} />;
        } else if (selected == '5') {
            return <Refacciones flotilla={flotilla1} tipo={props.tipo} departamento={props.departamento} dptoid={props.dptoid} userid={props.userid} usuario={props.usuario} name={props.name} />;
        } else if (selected == '6') {
            return <Rendimiento flotilla={flotilla1} tipo={props.tipo} departamento={props.departamento} dptoid={props.dptoid} userid={props.userid} usuario={props.usuario} name={props.name} />;
        } else if (selected == '7') {
            return <Expediente flotilla={flotilla1} tipo={props.tipo} departamento={props.departamento} dptoid={props.dptoid} userid={props.userid} usuario={props.usuario} name={props.name} />;
        } else if (selected == 'Vehiculos') {
            return <Listavehiculos flotilla={flotilla1} tipo={props.tipo} departamento={props.departamento} dptoid={props.dptoid} userid={props.userid} usuario={props.usuario} name={props.name} />;
        }else if (selected == 'Servicios') {
            return <Servicios flotilla={flotilla1} tipo={props.tipo} departamento={props.departamento} dptoid={props.dptoid} userid={props.userid} usuario={props.usuario} name={props.name} />;
        }else if (selected == 'Dictamenes') {
            return <Dictamenes flotilla={flotilla1} tipo={props.tipo} departamento={props.departamento} dptoid={props.dptoid} userid={props.userid} usuario={props.usuario} name={props.name} />;
        }else if (selected == 'Siniestros') {
            return <Siniestros flotilla={flotilla1} tipo={props.tipo} departamento={props.departamento} dptoid={props.dptoid} userid={props.userid} usuario={props.usuario} name={props.name} />;
        }else if (selected == 'Multas') {
            return <Multas flotilla={flotilla1} tipo={props.tipo} departamento={props.departamento} dptoid={props.dptoid} userid={props.userid} usuario={props.usuario} name={props.name} />;
        }else if (selected == 'Vehiculoscomplemento') {
            return <VehiculoCto flotilla={flotilla1} tipo={props.tipo} departamento={props.departamento} dptoid={props.dptoid} userid={props.userid} usuario={props.usuario} name={props.name} />;
        }
        else {
            return (<div style={{ width: '100%', textAlign: 'center', backgroundColor: '', margin: 'auto' }}><h1>Error al Cargar</h1></div>);
        }
    }



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
            
<OpcionesMenu dptos={props.dptos} dptoid={props.dptoid} unmountMe={cambiarRazon} unmount={cambiarSelected} admin={props.admin} name={props.name} isMenuOpen1={isMenuOpen1}></OpcionesMenu>

            <Element selected={selected} />


        </div>
    )
}
