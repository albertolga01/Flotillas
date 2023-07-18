
import React, { useState, useEffect } from 'react';
import { FaCheckCircle, FaTrash, FaEdit, FaRedditAlien, FaEye } from 'react-icons/fa'
import axios from 'axios';
import { NabvarRe } from './component/Navbar';
import DocumentsServicio from './component/DocumentsServicio';

import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";  
import {ThreeDots } from  'react-loader-spinner'
import { BsArrowRepeat, BsEnvelopeFill, BsFillXCircleFill } from "react-icons/bs";
import { FaExternalLinkAlt } from "react-icons/fa";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DataTableExtensions from "react-data-table-component-extensions";
import 'react-data-table-component-extensions/dist/index.css';
import DataTable from 'react-data-table-component-footer';

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

function OtrosGastos(props) {
	const [total, setTotal] = useState(0); 

	const columns = [
		{
			name: 'Folio',  
			selector: row => row.id,
			sortable: true,
			maxWidth: "5px", 
			width: "60px",
		},
		{
			name: 'Vehículo',  
			selector: row => (row.vehiculo + " " + row.modelo +" "+ row.numvehiculo),
			sortable: true,
			width: "210px",
			wrap: true,
		},
		{
			name: 'Servicio',  
			selector: row => row.servicio,
			sortable: true,
		},
		{
			name: 'Odometro',  
			cell: (row) => {
				return (
					<><input defaultValue={row.odometro} id={"odometro"+row.id} style={{width:'60px'}} ></input>  KM </>
				)
			}
		}, 
		{
			name: 'Precio',
			selector:  (row) => row.precio,  
			//selector: row => "$"+row.precio,
			sortable: true,
		}, 
		{
			name: 'Fecha',   
			selector: row => row.fecha,
			sortable: true,
		}, 
		{
			name: 'Próximo',   
			cell: (row) => {
				return (
					(row.fechaproximo != null)?
									<td style={{textAlign:'center' }}>
									<input  type="date" defaultValue={row.fechaproximo} id={"fechaproximo"+row.id} ></input>
									</td> 
									:
									<td style={{textAlign:'center' }}>
										 
									</td>
				)
			}
		},
		{
			name: 'Factura',   
			cell: (row) => {
				return (
					<td style={{textAlign:'center', minWidth:'100px'}}><a target="_blank" rel="noreferrer" href={"http://flotillas.grupopetromar.com/apirestflotilla/documentos/" + row.documentoservicio}>{row.documentoservicio}</a></td>
				)
			}
		},
		{
			name: 'Cotización',   
			cell: (row) => {
				return (
					<td style={{textAlign:'center', minWidth:'100px'}}><a target="_blank" rel="noreferrer" href={"http://flotillas.grupopetromar.com/apirestflotilla/documentos/" + row.cotizacionservicio}>{row.cotizacionservicio}</a></td>
				)
			}
		},
		{
			name: 'Actualizar',   
			cell: (row) => {
				return (
					<button  className='btn btn-outline-success btn-sm' onClick={() => actualizarServicio(row.vehiculoid, row.id)} style={{width:'100%' }}><BsArrowRepeat /></button>
				)
			}
		},
		{
			name: 'Eliminar',   
			cell: (row) => {
				return (
					<button  className='btn btn-outline-danger btn-sm' onClick={() => eliminarOtrosGastos(row.vehiculoid, row.id)} style={{width:'100%' }}><BsFillXCircleFill /></button>
				)
			}
		},
	];

	const footer = {
		
		Folio: "",
		Vehiculo: "-",
		fecha: "",
		descripcion: "",
		precio: formatNumber(total)
		
	  };

	const tableCustomStyles = {
		headCells: {
		  style: {
			fontSize: '15px',
			fontWeight: 'bold', 
			backgroundColor: '#e5e5e5',
			paddingLeft: '8px',
			paddingRight: '0px',
		  },
		},
		cells: {
			style: {
				paddingLeft: '8px', // override the cell padding for data cells
				paddingRight: '0px',
			},
		},
	  }
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
	
	const [docsVehi, setDocsVehi] = useState([]);
	const [listaver, setListaVer] = useState([]);


	const [lista, setLista] = useState([]);
	const [value, setValue] = useState([]);

    const [listas, setListaS] = useState([]);  
	const [listasd, setListaSD] = useState([]);  

	const [registros, setRegistros] = useState([]);

	

	let id = 0;
	let tipo = 0;
	 let subtitle;

	useEffect(() => { 
		getServicios();
		 
	}, [])

	function formatDate(date){
		var index = date.search(" ");
		date = date.substring(0, 10);
		date = date.split("-");
		var formatedDate = date[2] +"/"+ date[1] +"/"+ date[0];
		return(formatedDate);
	}

	async function getServicios() {
		setTotal(0);
		setListaS([]);
		setListaSD([]);
		var id = "getGastos";
		var fecha = document.getElementById("input-fecha").value;
		var fechafinal = document.getElementById("input-fecha-final").value;
		var vehiculo = document.getElementById("vehiculof").value;
		openModalLoad();
		const res = await axios.get(process.env.REACT_APP_API_URL+'?id='+ id+'&idflotilla='+props.flotilla+'&fecha='+fecha+'&fechafinal='+fechafinal+'&vehiculo='+vehiculo+'&tipo='+props.tipo+'&userid='+props.userid);
		closeModalLoad();
		setTotal(res.data.map(datum => Number(datum.precio)).reduce((a, b) => a + b, 0));
		setListaS(res.data);
		setListaSD(res.data);
		console.log(res.data); 
		
		try{setRegistros( formatNumber(res.data.map(datum => Number(datum.precio)).reduce((a, b) => a + b, 0).toFixed(2)));}catch (e){}
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
  
	function formatNumber(importe){
		   
		return ((Number(importe)).toLocaleString('en-US', {
		  style: 'currency',
		  currency: 'USD',}));
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
	async function actualizarServicio(folio, id){
		if(window.confirm('Actualizar los campos del servicio con folio: ' + id)){ 
			let fd = new FormData() 
			fd.append("id", "actualizarServicio")
			fd.append("idservicio", id) 
			fd.append("vehiculoid", folio) 
			fd.append("odometro", document.getElementById("odometro"+id).value)
			fd.append("fechaproximo", document.getElementById("fechaproximo"+id).value) 
			const res = await axios.post(process.env.REACT_APP_API_URL, fd); 
			console.log("actualizarServicio: " +res.data);
			notify(res.data.trim());
			getServicios();
		}
	
	}

	async function eliminarOtrosGastos(folio, id){
		if(window.confirm('Desea eliminar el registro con folio: ' + id)){ 
			let fd = new FormData() 
			fd.append("id", "eliminarOtrosGastos") 
			fd.append("folio", id)  
			const res = await axios.post(process.env.REACT_APP_API_URL, fd);   
			notify(res.data.trim());
			actualizarBajaCompras(id, "servicios");
			getServicios();
		}
	
	}

	async function actualizarBajaCompras(folio, tipo){ 
		
		let fd1 = new FormData()  
		fd1.append("id", "obtenerFolioProducto")  
		fd1.append("folio", folio)  
		fd1.append("tipo", tipo) 
		const res1 = await axios.post(process.env.REACT_APP_API_URL, fd1);  
		console.log((res1.data)); 
		let response = (res1.data);
		if(response != "0"){
			let fd = new FormData()   	
			fd.append("id", "actualizarBajaCompras") 
			fd.append("folio", response) 
			const res = await axios.post('https://compras.grupopetromar.com/apirest/index1.php/', fd);  
			console.log((res.data).trim()); 
		}

	}			

	async function actualizarGastos(id, vehiculo, servicio){
		if(window.confirm('Marcar registro como otros gastos: ' + vehiculo + ' ' + servicio)){ 
			let fd = new FormData() 
			fd.append("id", "otrosGastos")
			fd.append("idservicio", id)   
			const res = await axios.post(process.env.REACT_APP_API_URL, fd); 
			console.log("actualizarServicio: " +res.data);
			notify(res.data.trim());
			getServicios();
		}
	
	}
	
	function filterDictamenVehiculo() {
		var tipo = document.getElementById('vehiculof').value;  
		if(tipo == "0"){ 
			setListaS(listasd);
			try{setRegistros( formatNumber(result.map(datum => Number(datum.precio)).reduce((a, b) => a + b, 0).toFixed(2)));}catch (e){}
		}else{ 
		var result = listasd.filter((x) => (x.vehiculoid == tipo));
		setListaS(result);  
		try{setRegistros( formatNumber(result.map(datum => Number(datum.precio)).reduce((a, b) => a + b, 0).toFixed(2)));}catch (e){}
		}
	}

	// Dynamically create select list
	let options = [];


	return (

		<div className="container ">
			<div className='titulos'>
				<NabvarRe titulo="Gastos por Servicios" />
			</div>
		 	
			<div className="row p-3">
				 

				<div style={{ width: '100%' }}>
					<div className="card p-2 mt-2 border-secondary" encType="multipart/form-data" style={{height:'650px'}} >
						<h5>Gastos por Servicios</h5>
						{/**
						 * <div id="display-expediente" style={{display:'flex', gap:"2vmax"}}>
							<h6>Vehiculo: {lista}</h6>
 
									<h6 id="id-displayexp" style={{fontWeight:"400"}}>{docsVehi.descripcion}</h6>
								 
						
						 
						 
						</div>

						 */}
						 
						 <div style={{display:'flex',alignItems:'center',flexWrap:'wrap'}}>
						 	<label style={{fontSize:'14px',fontWeight:'500'}} className="label-filtro">Filtrar por fecha de compra: </label> 
							<input id="input-fecha" type="date" onChange={() => getServicios()} style={{width: '120px', height:'25px', fontSize: '16px', cursor: 'pointer',marginLeft:'5px'}}/>
							<input id="input-fecha-final" type="date" onChange={() => getServicios()} style={{width: '120px', height:'25px', fontSize: '16px', cursor: 'pointer',marginLeft:'5px'}}/>
							<h6 style={{marginLeft:'15px'}} className="h6-titulo">Vehículo:</h6>
							<select  id="vehiculof"  className="form-control"  style={{width:'45%',marginLeft:'5px'}}>
								<option value="0">Todos</option> 											
									{props.vehiculos.map(item => ( 
										<option value={item.vehiculoid}>{item.descripcion + " " + item.modelo + " " + item.numvehiculo  }</option>
									))}
							</select>
							<button style={{marginLeft:'5px'}} onClick={() => getServicios()} class="btn btn-outline-success btn-sm" id='boton-Buscar'>Buscar</button>
						 </div>
			
						 
						
						<div style={{height: "100%", overflow: "scroll",marginTop:'30px'}}>
						<DataTableExtensions
							columns={columns}
							data={listas}
							print={true}
							export={true}
							filterPlaceholder="Filtrar" 

							>
									<DataTable
												columns={columns}
												data={listas}
												fixedHeader={true}
												footer={footer}
												fixedHeaderScrollHeight={'100%'}
												pagination
												customStyles={tableCustomStyles}
												highlightOnHover={true}
												noHeader
												noDataComponent={"No se encontró información"}

											
											/>
						</DataTableExtensions>	
							<table id="tbl-documentos" style={{width: "100%"}} hidden>
								<tr>
									<th class="header" style={{textAlign:'center'}}>Folio</th>
									<th class="header" style={{textAlign:'center'}}>Vehículo</th>
									<th class="header" style={{textAlign:'center'}}>Servicio</th>
									<th class="header" style={{textAlign:'center'}}>Odomentro</th>
									<th class="header" style={{textAlign:'center'}}>Precio</th>
									<th class="header" style={{textAlign:'center'}}>Fecha</th>
									<th class="header" style={{textAlign:'center'}}>Próximo</th>
									<th class="header" style={{textAlign:'center'}}>Factura</th>
									<th class="header" style={{textAlign:'center'}}>Cotización</th>
									<th class="header" style={{textAlign:'center'}}>Actualizar</th> 
									<th class="header" style={{textAlign:'center'}}>Borrar</th> 
								</tr>
								{listas.map(item => (
								<tr id="tabletr" style={{border: '2px solid #ABB2B9', fontSize:'12px'}}>
									<td  style={{ width:'10px',border: '2px solid rgb(171,178,185)'}} align="center">{item.id}</td>
									<td  style={{ minWidth:'200px',border: '2px solid rgb(171,178,185)'}}>{item.vehiculo + " " + item.modelo + " " + item.numvehiculo}</td>
									<td style={{textAlign:'left', padding:'5px', minWidth:'220px',border: '2px solid rgb(171,178,185)'}}>{item.servicio}</td>
									<td style={{border: '2px solid rgb(171,178,185)'}} ><input defaultValue={item.odometro} id={"odometro"+item.id} style={{width:'60px'}} ></input>KM</td>
									<td style={{border: '2px solid rgb(171,178,185)'}}>${item.precio}</td>
									<td style={{textAlign:'center',border: '2px solid rgb(171,178,185)'}}>{formatDate(item.fecha)}</td>
									{(item.fechaproximo != null)?
									<td style={{textAlign:'center',border: '2px solid rgb(171,178,185)'}}>
									<input  type="date" defaultValue={item.fechaproximo} id={"fechaproximo"+item.id} ></input>
									</td> 
									:
									<td style={{textAlign:'center',border: '2px solid rgb(171,178,185)'}}>
										 
									</td>
									}
									
									<td style={{textAlign:'center', minWidth:'100px',border: '2px solid rgb(171,178,185)'}}><a target="_blank" rel="noreferrer" href={"http://flotillas.grupopetromar.com/apirestflotilla/documentos/" + item.documentoservicio}>{item.documentoservicio}</a></td>
									<td style={{textAlign:'center', minWidth:'100px',border: '2px solid rgb(171,178,185)'}}><a target="_blank" rel="noreferrer" href={"http://flotillas.grupopetromar.com/apirestflotilla/documentos/" + item.cotizacionservicio}>{item.cotizacionservicio}</a></td>
									<td><button  className='btn btn-outline-success btn-sm' onClick={() => actualizarServicio(item.vehiculoid, item.id)} style={{width:'100%' }}><BsArrowRepeat /></button></td>
									<td><button  className='btn btn-outline-danger btn-sm' onClick={() => eliminarOtrosGastos(item.vehiculoid, item.id)} style={{width:'100%' }}><BsFillXCircleFill /></button></td>
							 	</tr>
								))}
								<tr>
									<td colSpan={2}>Total: {registros}</td>
								</tr>
							</table>
						</div>


					</div>
				</div>

				<div style={{ margin: 'auto', display: 'none' }} >
					<div style={{ position: 'absolute', bottom: '10px', backgroundColor: 'white', border: '2px solid black', borderRadius: '5px', width: '80%', margin: 'auto', padding: '5px' }}>
						<div className="d-flex flex-row" style={{ overflowX: 'scroll' }} >
							{props.vehiculos.map(item => (

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







export default OtrosGastos;
