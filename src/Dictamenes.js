
import React, { useState, useEffect } from 'react';
import { FaCheckCircle, FaTrash, FaEdit, FaRedditAlien, FaEye } from 'react-icons/fa'
import axios from 'axios';
import { NabvarRe } from './component/Navbar';
import DocumentsDictamenes from './component/DocumentsDictamenes';

import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";  
import {ThreeDots } from  'react-loader-spinner'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './App.css';

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

function Dictamenes(props) {

	function openModalLoad() { 
		setIsOpenLoad(true); 
	}  
	   
	function closeModalLoad() { 
		setIsOpenLoad(false); 
	}

    function notify(message){
		toast(message);
	}

	
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
    
    const [modalIsOpenLoad, setIsOpenLoad] = React.useState(false);
	const [modalIsOpen, setIsOpen] = React.useState(false);

	const [couno, setCouno] = useState([]);
	const [codos, setCodos] = useState([]);
	const [cotres, setCotres] = useState([]);
	const [listav, setListaV] = useState([]);
	const [docsVehi, setDocsVehi] = useState([]);
	const [listaver, setListaVer] = useState([]);


	const [lista, setLista] = useState([]);
	const [value, setValue] = useState([]);

    const [listas, setListaS] = useState([]);  
    const [listasd, setListaSD] = useState([]);  
    const [listasvd, setListaVd] = useState([]);  
    const [listaVencimiento, setListaVencimiento] = useState([]);  

	let id = 0;
	let tipo = 0;
	 let subtitle;

	useEffect(() => {
		getVehiculos();
		getDictamenes();
		getDictamenesVehiculoProximo();
		 
	}, [])

	async function getDictamenes() {
		var id = "getDictamenesVehiculo";
		const res = await axios.get(process.env.REACT_APP_API_URL+'?id='+ id+'&idflotilla='+props.flotilla);
		setListaS(res.data);
		 
	}

	async function getDictamenesVehiculoProximo(periodo) {
	 
		var id = "getDictamenesVehiculoProximo";
		const res = await axios.get(process.env.REACT_APP_API_URL+'?id='+ id+'&idflotilla='+props.flotilla+'&periodo='+periodo); 
		setListaVd(res.data);  
	}

	async function getVencimietosD(){

	}



	function filterDictamenTipo() {
		var tipo = document.getElementById('dictamenf').value;  
		var result = listasd.filter((x) => (x.nombre === tipo)); 
		setListaS(result); 
		
	}

	function filterDictamenVehiculo() {
		var tipo = document.getElementById('vehiculof').value;  
		var result = listasd.filter((x) => (x.vehiculoid === tipo)); 
		setListaS(result); 
		
	}



	function filterDictamenVencimiento() {  	
			var meses = document.getElementById('vigenciaf').value;   
			var dt = new Date();
			 dt.setMonth( dt.getMonth() + parseInt(meses) ); 
		 
			var result = listasd.filter((x) => (new Date(x.fechafinal).getTime() < dt.getTime())); 
			//setListaVd(result);
		 
	
	}

	async function getVehiculos() {
		var id = "getVehiculos";
		const res = await axios.get(process.env.REACT_APP_API_URL+'?id='+ id+'&idflotilla='+props.flotilla);
		setListaV(res.data);
		//console.log(res.data);  process.env.REACT_APP_API_URL

	}
 


	async function verVehiculo(vehiculoid) {
		//document.getElementById("IDvehi-input").value = descripcion;
		 //setLista(descripcion);
//abrir el modal 
	/*	var id = "getExpediente";
		const res = await axios.get('https://flotillas.grupopetromar.com/apirestflotilla/?id=' + id+'&vehiculoid='+vehiculoid);
		
		setListaVer(res.data); 
 		openModal();
*/
		//getDocumentos(id);
		 
		setListaVer([]);
		openModal();
		let formData = new FormData();
            formData.append("id", "getDictamenesVehiculo2");
			formData.append("vehiculoid", vehiculoid)
		
        return fetch(process.env.REACT_APP_API_URL, {
            method: 'POST',
            mode: 'cors',
            body: formData
        })
		.then(response => response.json())
        .then(data => {
			setListaVer(data);
			 
		})
			
	}


	 


	function format(todayy){
		var today = new Date(todayy);
		var dd = String(today.getDate()).padStart(2, '0');
	  var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
	  var yyyy = today.getFullYear();
	  
	  today = dd + '/' + mm + '/' + yyyy;
	   return today;
	}
  
	function formatDate(date){
		var index = date.search(" ");
		date = date.substring(0, 10);
		date = date.split("-");
		var formatedDate = date[2] +"/"+ date[1] +"/"+ date[0];
		return(formatedDate);
	}

	useEffect(() => {
		getUsuarios();
		getDocumentosTodos();
		//getServicios();
	}, [])


	async function getUsuarios() {
		var id = "2";
		const rese = await axios.get(process.env.REACT_APP_API_URL+'?id='+ id);
		// console.log(rese.data);
		setValue(rese.data);
	}

	async function getDocumentosTodos(){
		let formData = new FormData();
            formData.append("id", "getExpedienteTodos");
			//formData.append("IDvehiculo", IDvehiculo)
		openModalLoad();
        return fetch(process.env.REACT_APP_API_URL, {
            method: 'POST',
            mode: 'cors',
            body: formData
        })
		.then(response => response.json())
        .then(data => {
			setDocsVehi(data);
			closeModalLoad();
		}
			
		)
    }


	// Dynamically create select list
	let options = [];


	return (

		<div className="container ">
		 	<NabvarRe titulo="Dictámenes" />
			<div className="row p-3">
				<div style={{ width: '30%' }}>
						<div className="card p-2 mt-2 border-secondary">
						{/* 
							<h5>Expediente</h5>

							<input placeholder="Vehiculo" id="name" className="form-control" >
							</input>
							<br></br>

							<input id="newuser-user" placeholder="Placas" className="form-control"></input>
							<br></br>

							<input id="newuser-password" placeholder="Fecha Alta" className="form-control" type="password "></input>
							<br></br>
							<input id="newuser-password" placeholder="Fecha Vencimiento" className="form-control" type="password "></input>
							<br></br>
							<button className="btn btn-outline-success btn-sm" 	 >Agregar <FaCheckCircle /></button>
						*/}
							
							<DocumentsDictamenes flotilla={props.flotilla} vehiculos={listav} getDictamenes={getDictamenes}/>
						</div> 
				</div>

				<div style={{ width: '70%' }}>
					<form className="card p-2 mt-2 border-secondary" encType="multipart/form-data" style={{height:'450px'}} >
						<h5>Dictámenes</h5>

						<div style={{width:'100%', height:'100px', justifyContent: 'space-between', columnGap:'0.875rem', display:'flex', flexDirection:'row'}} align="center"> 
                     		<div style={{width:'100%', display: 'flex', flexDirection:'column'}}>
							 <h6>Tipo Dictamen</h6>
								<select  id="dictamenf"  onChange={() => filterDictamenTipo()} className="form-control"  style={{width:'100%', marginTop:'5px'}}>
									<option value="Dictamen Humo">Dictamen Humo</option>
									<option value="Dictamen Físico mecánico">Físico Mecánico</option>
									<option value="Dictamen NOM 007 Tanques">Dictamen NOM 007 Tanques</option>
									<option value="Dictamen Ultrasonido de tanque">Dictamen Ultrasonido de tanque</option>
									<option value="Dictamen de calibración Pemex">Dictamen de calibración Pemex</option>
								</select>
						
                     		</div>
							 <div style={{width:'100%', display: 'flex', flexDirection:'column'}}>
							 <h6>Vehículo</h6>
									<select  id="vehiculof"  onChange={() => filterDictamenVehiculo()} className="form-control"  style={{width:'100%', marginTop:'5px'}}>
										{listav.map(item => ( 
													<option value={item.vehiculoid}>{item.descripcion + " " + item.modelo + " " + item.numvehiculo  }</option>
										))}
									</select>
                     		</div>
                    	</div>
						 
						 
						
						<div id="display-expediente" style={{display:'flex', gap:"2vmax"}}>
							<h6>Vehículo: {lista}</h6>
 
									<h6 id="id-displayexp" style={{fontWeight:"400"}}>{docsVehi.descripcion}</h6>
								  
						</div>

						<div style={{height: "300px", overflow: "scroll"}}>
							<table id="tbl-documentos" style={{width: "100%"}}>
								<tr> 
									<th style={{textAlign:'center'}}>Vehículo</th>
									<th style={{textAlign:'center'}}>Tipo Dictamen</th>
									<th style={{textAlign:'center'}}>Descripción</th>
									<th style={{textAlign:'center'}}>Fecha</th>
									<th style={{textAlign:'center'}}>Vencimiento</th>
									<th style={{textAlign:'center'}}>Archivo</th>
								</tr>
								{listas.map(item => (
								<tr id="tabletr" style={{border: '2px solid #ABB2B9', fontSize:'14px'}}> 
									<td style={{minWidth:'280px'}}>{item.vehiculo}</td>
									<td style={{textAlign:'center', minWidth:'180px'}}>{item.nombre}</td>
									<td style={{textAlign:'center', minWidth:'280px'}}>{item.descripcion}</td>
									<td style={{textAlign:'center'}}>{formatDate(item.fecha)}</td>
									<td style={{textAlign:'center'}}>{formatDate(item.fechafinal)}</td>
									<td style={{ minWidth:'280px'}}><a target="_blank" rel="noreferrer" href={"http://flotillas.grupopetromar.com/apirestflotilla/documentos/" + item.documentoverificacion}>{item.documentoverificacion}</a></td>
								</tr>
								))}
							</table>
						</div>
						 
					</form>
					<div style={{ width: '100%' }}> 
	 <div className="card p-2 mt-2 border-secondary"  style={{ height:'450px', overflow:'scroll'}}>
	 
		<h6>Proximo a vencer (6 meses, 1 año, 3 años, 5 años, 10 años)</h6>
						<h6>Vigencia</h6>
						<select  id="vigenciaf"  onChange={(e) => getDictamenesVehiculoProximo(e.target.value)} className="form-control"  style={{width:'100%', marginTop:'5px'}}>
                            <option value="6">6 Meses</option>
                            <option value="12">1 año</option>
                            <option value="36">3 años</option>
                            <option value="60">5 años</option>
                            <option value="120">10 años</option>
                             
						</select>
						<div style={{height: "300px", overflow: "scroll"}}>
							<table id="tbl-documentos" style={{width: "100%"}}>
								<tr > 
									<th style={{textAlign:'center'}}>Vehículo</th>
									<th style={{textAlign:'center'}}>Tipo Dictamen</th>
									<th style={{textAlign:'center'}}>Descripción</th> 
									<th style={{textAlign:'center'}}>Fecha</th>
									<th style={{textAlign:'center'}}>Vencimiento</th>
									<th style={{textAlign:'center'}}>Archivo</th>
								</tr>
								{listasvd.map(item => (
								<tr id="tabletr" style={{border: '2px solid #ABB2B9', fontSize:'14px'}}> 
									<td style={{minWidth:'280px'}}>{item.vehiculo}</td>
									<td style={{textAlign:'center', minWidth:'180px'}}>{item.nombre}</td>
									<td style={{minWidth:'280px'}}>{item.descripcion}</td> 
									<td style={{textAlign:'center'}}>{format(item.fecha)}</td>
									<td style={{textAlign:'center'}}>{format(item.fechafinal)}</td>
									<td style={{ minWidth:'280px'}}><a target="_blank" rel="noreferrer" href={"http://flotillas.grupopetromar.com/apirestflotilla/documentos/" + item.documentoverificacion}>{item.documentoverificacion}</a></td>
								</tr>
								))}
							</table>
						 
							</div>
				</div>
</div>
				</div>
				<div style={{ margin: 'auto', display:'none' }} >
					<div style={{ position: 'absolute', bottom: '10px', backgroundColor: 'white', border: '2px solid black', borderRadius: '5px', width: '80%', margin: 'auto', padding: '5px' }}>
						<div className="d-flex flex-row" style={{ overflowX: 'scroll' }} >
							{listav.map(item => (

								<div className="card p-2 mt-2 border-secondary" key={item.id} style={{ width: '15%', marginLeft: '15px', minWidth: '15%' }}>

									<div>
										<b><label ></label></b> <label className="text-primary">{item.descripcion + " -"+ item.vehiculoid}</label> &nbsp;&nbsp;

										{(item.icon == null)  ?
										<img src={'http://flotillas.grupopetromar.com/default.jpg'} style={{ height: '100px', width: '140px' }}></img>  
										:
										<img src={'http://flotillas.grupopetromar.com/apirestflotilla/Vehiculos/'+item.icon} style={{ height: '100px', width: '140px' }}></img> 
										 }
									</div>

									<button className="Bttn" onClick={() => verVehiculo(item.vehiculoid, item.id)}
									><FaEye /> ver 
									</button>
								</div>
							))}
						</div>
					</div>
				</div>
				 
			</div>
			<Modal 
					isOpen={modalIsOpenLoad}  
					onRequestClose={closeModalLoad}   
					style={customStyles}> 
					<div style={{width:'100%'}}>  
					<ThreeDots color="#0071ce" height={80} width={80} /> 
					</div>  
			</Modal>

								<Modal
							isOpen={modalIsOpen}
							onAfterOpen={afterOpenModal}
							onRequestClose={closeModal}
							style={customStyles}
							contentLabel="Example Modal"
						>
							<label ref={(_subtitle) => (subtitle = _subtitle)} style={{color:'black', fontSize:'32px'}}>Dictámenes del vehículo</label>
							<br></br>
							<br></br>
							<table id="productstable"  style={{width:'500px'}}> 
										<tr>
											<th class="header">Vehículo</th>
											<th class="header">Descripción</th>
											<th class="header">Fecha</th>
											<th class="header">Nombre Dictamen</th>
											<th class="header">Documento</th>  
										</tr>

										{  
										listaver.map(item => ( 
										<tr>
										<td style={{textAlign:'center'}}>{item.vehiculo}</td>
										<td style={{textAlign:'center'}} >{item.descripcion}</td> 
										<td style={{textAlign:'center'}}>{format(item.fecha)}</td> 
										<td style={{textAlign:'center'}}>{item.nombre}</td> 
										<td style={{textAlign:'center'}}><a target="_blank" rel="noreferrer" href={"https://flotillas.grupopetromar.com/apirestflotilla/documentos/" + item.documentoverificacion}>{item.documentoverificacion}</a></td>
							
									
										
									</tr>
									
							))}	
							</table>
							
					<br></br>
					<br></br>
							<button onClick={closeModal} class="btn btn-outline-danger btn-sm ">Cancelar</button> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
						</Modal>
		</div>
	);
}







export default Dictamenes;
