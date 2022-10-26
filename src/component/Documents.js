import {useState} from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function notify(message){
    toast(message);
}
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
    const [IDvehiculo, setIDvehiculo] = useState();
    //const [file, setFile] = useState();

    async function FormRequest(reqbody) {
        return fetch('https://flotillas.grupopetromar.com/apirestflotilla/', {
            method: 'POST',
            mode: 'cors',
            //headers: {'Content-Type': 'multipart/form-data'},
            body: reqbody
        })
        .then(response => response.json())
        .then(data => notify(data));
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
                <input id="IDvehi-input" type="text" disabled onChange={e => setIDvehiculo(e.target.value)}></input>
                
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
        </div>
    )
}