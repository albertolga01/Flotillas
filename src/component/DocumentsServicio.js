import {useState, useEffect} from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";  
import {ThreeDots } from  'react-loader-spinner'


import Modal from 'react-modal';
 
const customStyles = {
	content: {
	  top: '50%',
	  left: '50%',
	  right: 'auto',
	  bottom: 'auto',
	  marginRight: '-50%',
	  transform: 'translate(-50%, -50%)',
	},
  };


export default function Documents(props) {
    const styles = `
        #add-form{
            display: flex;
            flex-direction: column;
        }
        #add-form input{
            margin-bottom: 16px;
        }
        #add-form span{
            margin-bottom: 8px;
        }
    `

    const [Filename, setFilename] = useState();
    const [Filedesc, setFiledesc] = useState();

    const [servicio, setservicio] = useState();
    const [odometro, setodometro] = useState();
    const [descripcion, setdescripcion] = useState(); 
    const [fechainicial, setfechainicial] = useState(); 

    
    const [listas, setListaS] = useState([]);  
    const [modalIsOpenLoad, setIsOpenLoad] = useState(false);

    function openModalLoad() { 
        setIsOpenLoad(true); 
    }  
    
    function closeModalLoad() { 
        setIsOpenLoad(false); 
    }
    function notify(message){
        toast(message);
    }


    useEffect(() => {  
	}, [])

    
    //const [file, setFile] = useState();

    async function FormRequest(reqbody) {
       openModalLoad();
        return fetch(process.env.REACT_APP_API_URL, {
            method: 'POST',
            mode: 'cors',
            //headers: {'Content-Type': 'multipart/form-data'},
            body: reqbody
        })
        .then(response => response.text())
        .then(data => {
            
            notify(data)
            closeModalLoad() 
            props.getServicios();
        });
    }

    
   

    const handleSubmit = async e => {
        e.preventDefault();
        var IDvehiInput = document.getElementById("IDvehiculo");
        var filedoc = document.getElementById("documentoservicio");
        var filedocdos = document.getElementById("cotizacionservicio");
        let formData = new FormData();
            formData.append("id", "cargarServicios");
            formData.append("fecha", document.getElementById("fechainicial").value);
            formData.append("fechaproximo", document.getElementById("fechaproximo").value);
            formData.append("servicio", document.getElementById("servicio").value);
            formData.append("odometro", document.getElementById("odometro").value);
            formData.append("descripcion", document.getElementById("descripcion").value);
            formData.append("kilometraje", document.getElementById("kilometraje").value);
            formData.append("IDvehiculo", IDvehiInput.value);
            formData.append("documentoservicio", filedoc.files[0]);
            formData.append("cotizacionservicio", filedocdos.files[0]);


            await FormRequest(formData); 
           
    }
        /**  PARA AÑADIR CAMPO CREAR "const[]=useState()" PARA EL DATO, PONER ATTRIB "onChange" EN HTML COMO LOS OTROS INPUTS, Y AÑADIRLO AL "formData"   **/
    return(
        <div id="add-div">
            <style>
                {styles}
            </style>

            <form id="add-form" onSubmit={handleSubmit}>
                <h6>Vehículo</h6>
                <select  id="IDvehiculo"  className="form-control"  style={{width:'100%', marginTop:'5px'}}>
						{props.vehiculos.map(item => ( 
									<option value={item.vehiculoid}>{item.descripcion + " " + item.modelo + " " + item.numvehiculo }</option>

						))}
						</select>
                
                <h6>Fecha Servicio</h6>
                <input id="fechainicial" placeholder="Fecha Servicio" className="form-control" type="date"></input> 

                <h6>Fecha Próximo Servicio</h6>
                <input id="fechaproximo" placeholder="Fecha Próximo Servicio" className="form-control" type="date"></input>
                 
                <h6>Servicio</h6>
                <input type="text" id="servicio" ></input>
                
                <h6>Odometro Actual</h6>
                <input type="text" id="odometro" ></input>

                <h6>Descripción</h6>
                <input type="text" id="descripcion"  ></input>

                <h6>Kilometraje Próx. Servicio</h6>
                <input type="text" id="kilometraje"  ></input>

                <h6>Factura</h6>
                <input id="documentoservicio" type="file" style={{display: "none"}}></input>
                <input id="cotizacionservicio" type="file" style={{display: "none"}}></input>
                <input type="button" id="documentoservicio" class="btn btn-outline-success btn-sm" value="Elegir archivo" onClick={() => {document.getElementById('documentoservicio').click()}}></input>
                <h6>Cotización</h6>
                <input type="button" id="cotizacionservicio" class="btn btn-outline-success btn-sm" value="Elegir archivo" onClick={() => {document.getElementById('cotizacionservicio').click()}}></input>
                
                <button type="submit" class="btn btn-outline-success btn-sm">Cargar</button>
            </form>
            <ToastContainer 
				progressClassName="toastProgress"
				position="top-center"
				/>
                <Modal 
					isOpen={modalIsOpenLoad}  
					onRequestClose={closeModalLoad}   
					style={customStyles}> 
					<div style={{width:'100%'}}>  
					<ThreeDots color="#0071ce" height={80} width={80} /> 
					</div>  
			</Modal>
        </div>
    )
}