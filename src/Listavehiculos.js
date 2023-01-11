 
import React,{useState, useEffect} from 'react';  
import  {FaCheckCircle, FaTrash, FaEdit, FaRedditAlien, FaEye} from 'react-icons/fa'
import axios from 'axios'; 
import {NabvarRe} from './component/Navbar'; 
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
import './App.css'; 

import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";  
import {ThreeDots } from  'react-loader-spinner'
import { BsArrowRepeat, BsEnvelopeFill } from "react-icons/bs";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const customStylesD = {
	content: {
	  top: '50%',
	  left: '50%',
	  right: 'auto',
	  bottom: 'auto',
	  marginRight: '-50%',
	  transform: 'translate(-50%, -50%)',
	},
  };

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

function Listavehiculos(props) {

	function openModalLoad() { 
		setIsOpenLoad(true); 
	}  
	   
	function closeModalLoad() { 
		setIsOpenLoad(false); 
	}

    function notify(message){
		toast(message);
	}
	const [empresas, setEmpresas] = useState([]);
	const [listaEmpresas, setListaEmpresas] = useState([]);

    const [modalIsOpenLoad, setIsOpenLoad] = useState(false);

	const [listav, setListaV] = useState([]);

	
	
	const [listaver, setListaVer] = useState([]);
	useEffect(() => {
		getVehiculos();
		getEmpresas();
		getTiposCorreo();
	}, [])


	async function getEmpresas() {
		var id = "getEmpresas";
		const rese = await axios.get(process.env.REACT_APP_API_URL+'?id='+ id);
		setEmpresas(rese.data);
		//console.log(rese.data);
		//var Data = JSON.stringify(rese.data);
		//console.log(Data[0]);
	}
/*
	async function addRefaccion() {
		
		var vehiculoid = document.getElementById("vehiculoid").value;
		var fechacompra = document.getElementById("fechacompra").value;
		var refaccion = document.getElementById("refaccion").value;
		var descripcion = document.getElementById("descripcion").value;
		var precio = document.getElementById("precio").value;
		var proveedor = document.getElementById("proveedor").value;
		var documentorefaccion = document.getElementById("documentorefaccion"); 

		
		let fd = new FormData()
			fd.append("id", "addRefaccion")
			fd.append("vehiculoid", vehiculoid)
			fd.append("fechacompra", fechacompra) 
			fd.append("refaccion", refaccion)
			fd.append("descripcion", descripcion)
			fd.append("precio", precio)
			fd.append("proveedor", proveedor)
			fd.append("documentorefaccion", documentorefaccion.files[0])

			openModalLoad();
		const res = await axios.post(process.env.REACT_APP_API_URL, fd);
		closeModalLoad();
		notify(res.data.trim());
		 
		if(res.data.trim() == "Refacción agregada correctamente"){
			closeModal();
  getRefacciones()

		}
		getRefacciones();
	}

 */

	async function getVehiculos() {
		var id = "getVehiculos";
		openModalLoad();
		const res = await axios.get(process.env.REACT_APP_API_URL+'?id='+id+'&idflotilla='+props.flotilla);
		setListaV(res.data);
		closeModalLoad();
		console.log(res.data);
	} 


	let subtitle;
	const [modalIsOpen, setIsOpen] = React.useState(false);
  
	function openModal() {
	  setIsOpen(true);
	}
  
	function afterOpenModal() {
	  // references are now sync'd and can be accessed.
	  subtitle.style.color = '#f00';
	}
  
	function closeModal() {
	  setIsOpen(false);
	}


	function format(todayy){
		var today = new Date(todayy);
		var dd = String(today.getDate()).padStart(2, '0');
	  var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
	  var yyyy = today.getFullYear();
	  
	  today = dd + '/' + mm + '/' + yyyy;
	   return today;
		}
	
	
	
		
	  function formatNumber(importe){
		   
		return ((Number(importe)).toLocaleString('en-US', {
		  style: 'currency',
		  currency: 'USD',}));
		}
  

  const [lista, setLista] =  useState([]);  
  
 

 

  async function getRefacciones(){
	var id = "getRefacciones";
	openModalLoad();
	const res = await axios.get(process.env.REACT_APP_API_URL+'?id='+id);
 	closeModalLoad();
	setLista(res.data);
	
	console.log(res.data);

  }
  
  async function getRefaccionesDia(){
	   
	var id = "getRefaccionesDia";
	var fecha = document.getElementById("input-fecha").value;
	openModalLoad();
	const res = await axios.get(process.env.REACT_APP_API_URL+'?id='+id+'&fecha='+fecha);
	closeModalLoad();
    setLista(res.data);
	
	console.log(res.data);

  }

  let subtitle1;
  const [modalIsOpen1, setIsOpen1] = React.useState(false);
  const [folioVehiculo1, setFolioVehiculo1] = useState([]); 
  const [listac, setListaC] = useState([]); 


  function openModal1() {
	setIsOpen1(true);
  }

  function afterOpenModal() {
	// references are now sync'd and can be accessed.
	//subtitle.style.color = '#f00';
  }

  function closeModal1() {
	setIsOpen1(false);
  }

  function envioCorreo(folio){
	openModal1();

	setFolioVehiculo1(folio);
	 obtenerCorreos(folio);
}
 
  // Dynamically create select list
  let options = [];

  async function actualizarVehiculo(folio){
	let notificar = 0;
	if(document.getElementById("notificar"+folio).checked){
		 notificar = 1;
	} 
	if(window.confirm('Actualizar los campos del vehiculo con folio: ' + folio)){ 
		let fd = new FormData() 
		fd.append("id", "actualizarVehiculo")
		fd.append("vehiculoid", folio) 
		fd.append("responsable", document.getElementById("responsable"+folio).value)
		fd.append("tipouso", document.getElementById("tipouso"+folio).value)
		fd.append("empresa", document.getElementById("empresa"+folio).value)
		fd.append("pernota", document.getElementById("pernota"+folio).value)
		fd.append("numerovehiculo", document.getElementById("numerovehiculo"+folio).value)
		fd.append("gps", document.getElementById("gps"+folio).value)
		fd.append("notificar", notificar)
		const res = await axios.post(process.env.REACT_APP_API_URL, fd); 
		console.log("actualizarVehiculo: " +res.data);
		notify(res.data.trim());
		getVehiculos();
	}

}

async function EnviarCorreo(folio){
	var correo = document.getElementById("correo").value;
	 
	openModalLoad();
		let fd = new FormData() 
		fd.append("id", "agregarCorreo")
		fd.append("vehiculoid", folioVehiculo1) 
		fd.append("correo", correo)
		fd.append("tipocorreo", document.getElementById("tipocorreo").value)
		 
		const res = await axios.post(process.env.REACT_APP_API_URL, fd); 
		console.log("EnviarCorreo: " +res.data);
		closeModalLoad();
		notify(res.data.trim());
		//getVehiculos(); 

}

async function obtenerCorreos(folio){ 
 setListaVer([]);
		let fd = new FormData() 
		fd.append("id", "obtenerCorreos")
		fd.append("vehiculoid", folio)   
		const res = await axios.post(process.env.REACT_APP_API_URL, fd); 
		console.log("EnviarCorreo: " +res.data);
		setListaVer(res.data);
		//notify(res.data.trim());
		//getVehiculos(); 

}

async function getTiposCorreo() {
	var id = "obtenerTiposCorreos";
	const rese = await axios.get(process.env.REACT_APP_API_URL+'?id='+ id);
	setListaC(rese.data);
	//console.log(rese.data);
	//var Data = JSON.stringify(rese.data);
	//console.log(Data[0]);
}
 

  return (
  
    <div className="container ">
     
<NabvarRe departamento={props.departamento} dptoid={props.dptoid} titulo="Vehículos"/>    
<div style={{display:'flex', flexDirection:'row', width:'100%'}}>
 
	 
<div style={{width:'100%'}} align="right"> 
		  
	  </div>
	  </div>
 <div  style={{maxHeight:'43vmax', overflowY: 'scroll', width:'100%', marginTop:'10px'}}>
                <table id="productstable"  style={{width:'100%'}} > 
                    <tr>
                        <th>Folio</th>
                        <th>Vehículo</th>
                        <th>Modelo</th> 
                        <th>Responsable</th> 
                        <th>Serie Vehículo</th>
                        <th>Serie Motor</th>
                        <th>Tipo Uso</th> 
                        <th>Empresa</th>
                        <th>Placa</th>
                        <th >Gps</th>
                        <th>Número Vehículo</th> 
                        <th>PerNota</th>
						<th>Actualizar</th>
						<th>Correo</th>
						<th>Notificar</th>

                    </tr>

                    {  
                    listav.map(item => ( 
                     <tr id="tabletr" style={{border: '2px solid #ABB2B9', fontSize:'14px'}}>
                    <td className='id-orden' align='center'>{item.vehiculoid}</td>
                    <td style={{minWidth:'250px'}}>{item.descripcion}</td>
                    <td>{item.modelo}</td>
                    <td><input defaultValue={item.responsable} id={"responsable"+item.vehiculoid} ></input></td>
                    <td  align='center'>{item.serievehiculo}</td>
                    <td  align='center'>{item.seriemotor}</td>
                    <td><input defaultValue={item.tipouso} id={"tipouso"+item.vehiculoid}  ></input></td>
                    <td><select id={"empresa"+item.vehiculoid} style={{ width: '210px', height: '25px' }} onChange={(e) => setListaEmpresas(e.target.value)}>
										<option value={item.idempresa}> {item.empresa}</option>
										{empresas.map(item => (
											<option value={item.id}> {item.nombre}</option>))
										}</select></td>
                    <td>{item.placas}</td>
                    <td><input defaultValue={item.gps} id={"gps"+item.vehiculoid}  style={{ width: '60px'}}></input></td>
                    <td><input defaultValue={item.numvehiculo} id={"numerovehiculo"+item.vehiculoid} style={{ width: '60px' }}></input></td>
                    {/*<td><a target="_blank" rel="noreferrer" href={"https://flotillas.grupopetromar.com/apirestflotilla/Vehiculos/" + item.icon}>{item.icon}</a></td>
					*/}<td><input defaultValue={item.pernota} id={"pernota"+item.vehiculoid} style={{minWidth:'100%', height:'31px' }}></input></td>
					<td><button  className='btn btn-outline-success btn-sm' onClick={() => actualizarVehiculo(item.vehiculoid)} style={{minWidth:'100%' }}><BsArrowRepeat /></button></td>
					<td><button  className='btn btn-outline-success btn-sm' onClick={() => envioCorreo(item.vehiculoid)}  style={{minWidth:'100%' }}><BsEnvelopeFill /></button></td>
					<td>< input checked={item.notificar} type="checkbox" id={"notificar"+item.vehiculoid} style={{minWidth:'50px'}}></input></td>

                    
                </tr>
                
        ))}	
                        <input id='input-cotizacion' type='file' style={{display:'none'}}></input>
                </table> 
	 </div>
 
 
 

				<Modal
        isOpen={modalIsOpen1}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal1}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <h2  style={{color:'black', fontSize:'32px'}}>Agregar Correo</h2>
		<tr >  
							<th>Correo</th>  
							<th>Tipo</th>  
			
							  
						</tr>
			{ listaver.map(item => ( 
							 
							 <tr id="tabletr" style={{  fontSize:'14px', border: '2px solid #ABB2B9'}}>
								  
								 
								 <td style={{paddingRight:'15px'}}  >{item.correo}</td>
								 <td >{item.tipo}</td>
								 
							 </tr> 
							 ))}	
		<div>Correo</div>
        <input id="correo" type="text" style={{width:'100%', marginTop:'5px'}}/>
	 
				<select  id="tipocorreo"  className="form-control"  style={{width:'100%', marginTop:'5px', cursor: 'pointer'}}>
							{listac.map(item => ( 
								<option value={item.folio}>{item.tipo}</option>
					))} 
				</select> 
        
<br></br>
<br></br>
		<button onClick={closeModal1} class="btn btn-outline-danger btn-sm ">Cancelar</button> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 
		&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
		&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<button onClick={() => EnviarCorreo()} class="btn btn-outline-success btn-sm" >Agregar</button>
     </Modal>
 
  
	 <ToastContainer 
				progressClassName="toastProgress"
				position="top-center"
				/>

			<Modal 
					isOpen={modalIsOpenLoad}  
					onRequestClose={closeModalLoad}   
					style={customStylesD}> 
					<div style={{width:'100%'}}>  
					<ThreeDots color="#0071ce" height={80} width={80} /> 
					</div>  
			</Modal>

        </div>
 
 


		
       
              
    
  );   
}



 



export default Listavehiculos;
