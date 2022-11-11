
import React, { useState, useEffect } from 'react';
import { FaCheckCircle, FaTrash, FaEdit, FaRedditAlien, FaEye } from 'react-icons/fa'
import axios from 'axios';
import { NabvarRe } from './component/Navbar';
import DocumentsServicio from './component/DocumentsServicio';

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

function Servicios(props) {

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
    
    const [modalIsOpenLoad, setIsOpenLoad] =  useState(false);
	const [modalIsOpen, setIsOpen] =  useState(false);

	const [couno, setCouno] = useState([]);
	const [codos, setCodos] = useState([]);
	const [cotres, setCotres] = useState([]);
	const [listav, setListaV] = useState([]);
	const [docsVehi, setDocsVehi] = useState([]);
	const [listaver, setListaVer] = useState([]);


	const [lista, setLista] = useState([]);
	const [value, setValue] = useState([]);

    const [listas, setListaS] = useState([]);  

	let id = 0;
	let tipo = 0;
	 let subtitle;

	useEffect(() => {
		getVehiculos();
		getServicios();
		 
	}, [])

	async function getServicios() {
		var id = "getServicios";
		const res = await axios.get(process.env.REACT_APP_API_URL+'?id='+ id);
		setListaS(res.data);
		//console.log(res.data);  process.env.REACT_APP_API_URL

	}
	async function getVehiculos() {
		var id = "11";
		const res = await axios.get(process.env.REACT_APP_API_URL+'?id='+ id);
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
            formData.append("id", "getServiciosVehiculo");
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
  
 

	useEffect(() => {
		getUsuarios();
		getDocumentosTodos();
		getServicios();
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
		 	<NabvarRe titulo="Servicios" />
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
							
							<DocumentsServicio getServicios={getServicios}/>
						</div> 
				</div>

				<div style={{ width: '70%' }}>
					<form className="card p-2 mt-2 border-secondary" encType="multipart/form-data" style={{height:'340px'}} >
						<h5>Servicios</h5>
						
						<div id="display-expediente" style={{display:'flex', gap:"2vmax"}}>
							<h6>Vehiculo: {lista}</h6>
 
									<h6 id="id-displayexp" style={{fontWeight:"400"}}>{docsVehi.descripcion}</h6>
								 
						
						 
						 
						</div>

						<div style={{height: "300px", overflow: "scroll"}}>
							<table id="tbl-documentos" style={{width: "100%"}}>
								<tr>
									<th style={{textAlign:'center'}}>Servicio</th>
									<th style={{textAlign:'center'}}>Odomentro</th>
									<th style={{textAlign:'center'}}>Vehículo</th>
									<th style={{textAlign:'center'}}>Fecha Servicio</th>
									<th style={{textAlign:'center'}}>Archivo</th>
								</tr>
								{listas.map(item => (
								<tr>
									<td style={{textAlign:'center'}}>{item.id}</td>
									<td style={{textAlign:'center'}}>{item.odometro}</td>
									<td style={{textAlign:'center'}}>{item.vehiculo}</td>
									<td style={{textAlign:'center'}}>{item.fecha}</td>
									<td style={{textAlign:'center'}}><a target="_blank" rel="noreferrer" href={"http://flotillas.grupopetromar.com/apirestflotilla/documentos/" + item.documentoservicio}>{item.documentoservicio}</a></td>
								</tr>
								))}
							</table>
						</div>

					</form>
				</div>

				<div style={{ margin: 'auto' }} >
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
							style={{customStyles, overflowY: 'scroll'}}
							contentLabel="Example Modal"
						>
							<label ref={(_subtitle) => (subtitle = _subtitle)} style={{color:'black', fontSize:'32px'}}>Servicios del vehículo</label>
							<br></br>
							<br></br>
							<table id="productstable"  style={{width:'500px'}}> 
										<tr>
											<th style={{textAlign:'center'}}>Vehículo</th>
											<th style={{textAlign:'center'}}>Odomentro</th>
											<th style={{textAlign:'center'}}>Fecha</th>
											<th style={{textAlign:'center'}}>Documento</th>  
										</tr>

										{  
										listaver.map(item => ( 
										<tr>
										<td style={{textAlign:'center'}}>{item.vehiculo}</td>
										<td style={{textAlign:'center'}} >{item.odometro}</td>
										<td style={{textAlign:'center'}}>{format(item.fecha)}</td> 
										<td style={{textAlign:'center'}}><a target="_blank" rel="noreferrer" href={"https://flotillas.grupopetromar.com/apirestflotilla/documentos/" + item.documentoservicio}>{item.documentoservicio}</a></td>
							
									
										
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







export default Servicios;
