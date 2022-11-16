import {useState, useEffect} from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";  
import {ThreeDots } from  'react-loader-spinner'


import Modal from 'react-modal';
import { defaultProps } from "react-select/dist/Select-fd7cb895.cjs.prod";
 
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
            props.getDictamenes();
           // getDictamenesVehiculo();
           
        });
    }
 
     

   

    const handleSubmit = async e => {
        e.preventDefault();
        var IDvehiInput = document.getElementById("IDvehiculo");
        var filedoc = document.getElementById("documentodictamen");
        let formData = new FormData();
            formData.append("id", "cargarDictamenes");
            formData.append("fecha", document.getElementById("fechainicial").value);
            formData.append("fechafinal", document.getElementById("fechafinal").value);
            formData.append("dictamen", document.getElementById("dictamen").value); 
            formData.append("descripcion", document.getElementById("descripcion").value);
            formData.append("IDvehiculo", IDvehiInput.value);
            formData.append("documentodictamen", filedoc.files[0]);

            await FormRequest(formData); 
        //    getDictamenesVehiculo();
    }
        /**  PARA AÑADIR CAMPO CREAR "const[]=useState()" PARA EL DATO, PONER ATTRIB "onChange" EN HTML COMO LOS OTROS INPUTS, Y AÑADIRLO AL "formData"   **/
    return(
        <div id="add-div">
            <style>
                {styles}
            </style>

            <form id="add-form" onSubmit={handleSubmit}>
                <h6>Vehiculo</h6>
                <select  id="IDvehiculo"  className="form-control"  style={{width:'100%', marginTop:'5px'}}>
						{props.vehiculos.map(item => ( 
									<option value={item.vehiculoid}>{item.descripcion + " -" + item.vehiculoid}</option>

						))}
						</select>
                
                <h6>Fecha</h6>
                <input id="fechainicial" placeholder="Fecha Dictamen" className="form-control" type="date"></input>
                
                <h6>Fecha Vencimiento</h6>
                <input id="fechafinal" placeholder="Fecha Vencimiento" className="form-control" type="date"></input>
                 
                <h6>Dictamen</h6>
                 
                <select  id="dictamen"  className="form-control"  style={{width:'100%', marginTop:'5px'}}>
                            <option value="Dictamen Humo">Dictamen Humo</option>
                            <option value="Dictamen Físico mecánico NOM 007">Físico mecánico NOM 007</option>
                            <option value="Dictamen NOM 001 Tanques">Dictamen NOM 001 Tanques</option>
                            <option value="Dictamen Ultrasonido de tanque">Dictamen Ultrasonido de tanque</option>
                            <option value="Dictamen de calibración Pemex">Dictamen de calibración Pemex</option>
                             
						</select>
                  
                <h6>Descripción</h6>
                <input type="text" id="descripcion"  ></input>
                
                <h6>Archivo</h6>
                <input id="documentodictamen" type="file" style={{display: "none"}}></input>
                <input type="button" id="documentodictamen" class="btn btn-outline-success btn-sm" value="Elegir archivo" onClick={() => {document.getElementById('documentodictamen').click()}}></input>
                
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