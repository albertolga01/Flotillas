import {useState, useEffect} from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from '../../node_modules/axios';
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


export default function Documents() {
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
   
    const [listav, setListaV] = useState([]);  
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
		getVehiculos();
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
        .then(response => response.json())
        .then(data => {
            notify(data)
            closeModalLoad()
        });
    }

    async function getVehiculos() {
		var id = "11";
		const res = await axios.get(process.env.REACT_APP_API_URL+'?id='+ id);
		setListaV(res.data);
	}


    const handleSubmit = async e => {
        e.preventDefault();
        var IDvehiInput = document.getElementById("IDvehi-input");
        var filedoc = document.getElementById("fileinput");
        let formData = new FormData();
            formData.append("id", 15);
            formData.append("Filename", Filename);
            formData.append("Filedesc", Filedesc);
            formData.append("IDvehiculo", IDvehiInput.value);
            formData.append("file", filedoc.files[0]);

            await FormRequest(formData); 
    }
        /**  PARA AÑADIR CAMPO CREAR "const[]=useState()" PARA EL DATO, PONER ATTRIB "onChange" EN HTML COMO LOS OTROS INPUTS, Y AÑADIRLO AL "formData"   **/
    return(
        <div id="add-div">
            <style>
                {styles}
            </style>

            <form id="add-form" onSubmit={handleSubmit}>
                <h6>Vehiculo</h6>
                <select  id="IDvehi-input"  className="form-control"  style={{width:'100%', marginTop:'5px'}}>
						{listav.map(item => ( 
									<option value={item.vehiculoid}>{item.descripcion + " -" + item.vehiculoid}</option>

						))}
						</select>
                 
                <h6>Nombre</h6>
                <input type="text" onChange={e => setFilename(e.target.value)}></input>
                
                <h6>Descripción</h6>
                <input type="text" onChange={e => setFiledesc(e.target.value)}></input>
                
                <h6>Archivo</h6>
                <input id="fileinput" type="file" style={{display: "none"}}></input>
                <input type="button" class="btn btn-outline-success btn-sm" value="Elegir archivo" onClick={() => {document.getElementById('fileinput').click()}}></input>
                
                <button type="submit" class="btn btn-outline-success btn-sm">ACEPTAR</button>
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