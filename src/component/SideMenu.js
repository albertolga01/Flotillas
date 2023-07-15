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
import Gastosvehiculo from '../Gastosvehiculo';
import OtrosGastos from '../OtrosGastos';
import axios from '../../node_modules/axios'; 
import { ToastContainer, toast } from 'react-toastify';
import Accesorios from '../accesorios';
import Bajavehiculos from '../Bajavehiculos';



import OpcionesMenu from './OpcionesMenu'; 
export default function SideMenu(props) {

    const [selected, setSelect] = useState(props.selected);
    const [flotilla1, setFlotilla] = useState(props.flotilla1);
    const [listav, setListaV] = useState([]);
     console.log(props.selected);

   async function cambiarRazon(value){ 
        /*  */    
       

            var select = document.getElementById("select").value; 
            var id = "CambiarRzon";   
            let fd = new FormData()   
            fd.append("id", id);  
            fd.append("flotillaid", select);   
            fd.append("userid", props.userid);   
            const res = await axios.post(process.env.REACT_APP_API_URL, fd); 
                    console.log(res.data[0]);  
                
            if(res.data[0].res == "1"){   
         
                setFlotilla(value);   
                getVehiculos1(select);
            //props.unmountMe(res.data[0].rzonsocial, res.data[0].dptoid);    
            }else{ 
                        notify("No tiene acceso a esta flotilla"); 
            }
     }

     function notify(message){
		toast(message);
	}
     useEffect(() => {
        getDepartamentos();
        getVehiculos();
    }, [])
    const Element = () => {

        if (selected == '1') {
            return <App tipo={props.tipo} departamento={props.departamento} dptoid={props.dptoid} />;
        } else if (selected == '2') {
            return <Placas  vehiculos={listav} flotilla={flotilla1} tipo={props.tipo} departamento={props.departamento} dptoid={props.dptoid} userid={props.userid} usuario={props.usuario} name={props.name} />;
        }
        else if (selected == '3') {
            return <Nuevovehiculo vehiculos={listav} flotilla={flotilla1} tipo={props.tipo} departamento={props.departamento} dptoid={props.dptoid} userid={props.userid} usuario={props.usuario} name={props.name} />;
        } else if (selected == '4') {
            return <Seguros vehiculos={listav} flotilla={flotilla1} tipo={props.tipo} departamento={props.departamento} dptoid={props.dptoid} userid={props.userid} usuario={props.usuario} name={props.name} />;
        } else if (selected == '5') {
            return <Refacciones vehiculos={listav} flotilla={flotilla1} tipo={props.tipo} departamento={props.departamento} dptoid={props.dptoid} userid={props.userid} usuario={props.usuario} name={props.name} />;
        } else if (selected == '6') {
            return <Rendimiento vehiculos={listav} flotilla={flotilla1} tipo={props.tipo} departamento={props.departamento} dptoid={props.dptoid} userid={props.userid} usuario={props.usuario} name={props.name} />;
        } else if (selected == '7') {
            return <Expediente vehiculos={listav} flotilla={flotilla1} tipo={props.tipo} departamento={props.departamento} dptoid={props.dptoid} userid={props.userid} usuario={props.usuario} name={props.name} />;
        } else if (selected == 'Vehiculos') {
            return <Listavehiculos vehiculos={listav} flotilla={flotilla1} tipo={props.tipo} departamento={props.departamento} dptoid={props.dptoid} userid={props.userid} usuario={props.usuario} name={props.name} />;
        }else if (selected == 'Servicios') {
            return <Servicios vehiculos={listav} flotilla={flotilla1} tipo={props.tipo} departamento={props.departamento} dptoid={props.dptoid} userid={props.userid} usuario={props.usuario} name={props.name} />;
        }else if (selected == 'Dictamenes') {
            return <Dictamenes vehiculos={listav} flotilla={flotilla1} tipo={props.tipo} departamento={props.departamento} dptoid={props.dptoid} userid={props.userid} usuario={props.usuario} name={props.name} />;
        }else if (selected == 'Siniestros') {
            return <Siniestros vehiculos={listav} flotilla={flotilla1} tipo={props.tipo} departamento={props.departamento} dptoid={props.dptoid} userid={props.userid} usuario={props.usuario} name={props.name} />;
        }else if (selected == 'Multas') {
            return <Multas vehiculos={listav} flotilla={flotilla1} tipo={props.tipo} departamento={props.departamento} dptoid={props.dptoid} userid={props.userid} usuario={props.usuario} name={props.name} />;
        }else if (selected == 'Vehiculoscomplemento') {
            return <VehiculoCto vehiculos={listav} flotilla={flotilla1} tipo={props.tipo} departamento={props.departamento} dptoid={props.dptoid} userid={props.userid} usuario={props.usuario} name={props.name} />;
        }else if (selected == 'Gastosvehiculo') {
            return <Gastosvehiculo vehiculos={listav} flotilla={flotilla1} tipo={props.tipo} departamento={props.departamento} dptoid={props.dptoid} userid={props.userid} usuario={props.usuario} name={props.name} />;
        }else if (selected == 'OtrosGastos') {
            return <OtrosGastos vehiculos={listav} flotilla={flotilla1} tipo={props.tipo} departamento={props.departamento} dptoid={props.dptoid} userid={props.userid} usuario={props.usuario} name={props.name} />;
        }else if (selected == 'Accesorios') {
            return <Accesorios vehiculos={listav} flotilla={flotilla1} tipo={props.tipo} departamento={props.departamento} dptoid={props.dptoid} userid={props.userid} usuario={props.usuario} name={props.name} />;
        }else if (selected == 'Bajavehiculos') {
            return <Bajavehiculos vehiculos={listav} flotilla={flotilla1} tipo={props.tipo} departamento={props.departamento} dptoid={props.dptoid} userid={props.userid} usuario={props.usuario} name={props.name} />;
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

    async function getVehiculos() {
		var id = "getVehiculos";
		const res = await axios.get(process.env.REACT_APP_API_URL+'?id='+ id+'&idflotilla='+flotilla1+'&tipo='+props.tipo+'&userid='+props.userid);
		setListaV(res.data);
		//console.log(res.data);  process.env.REACT_APP_API_URL

	}
    async function getVehiculos1(idflotilla2) {
		var id = "getVehiculos";
		const res = await axios.get(process.env.REACT_APP_API_URL+'?id='+ id+'&idflotilla='+idflotilla2+'&tipo='+props.tipo+'&userid='+props.userid);
		setListaV(res.data);
		//console.log(res.data);  process.env.REACT_APP_API_URL

	}

    return (

        <div style={{ height: '100vh', width: '100vw', position: 'sticky', top: '0', display: 'flex', overflowX: 'auto' }}>
       
<OpcionesMenu tipo={props.tipo} dptos={props.dptos} dptoid={props.dptoid} unmountMe={cambiarRazon} unmount={cambiarSelected} admin={props.admin} name={props.name} isMenuOpen1={isMenuOpen1}></OpcionesMenu>

            <Element selected={selected} />

            <ToastContainer 
				progressClassName="toastProgress"
				position="top-center"
				/>
        </div>
    )
}
