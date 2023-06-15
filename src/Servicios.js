
import React, { useState, useEffect, useRef} from 'react';
import { FaCheckCircle, FaTrash, FaEdit, FaRedditAlien, FaEye } from 'react-icons/fa'
import axios from 'axios';
import { NabvarRe } from './component/Navbar';
import DocumentsServicio from './component/DocumentsServicio';

import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";  
import {ThreeDots } from  'react-loader-spinner'
import { BsArrowRepeat, BsEnvelopeFill, BsXCircleFill } from "react-icons/bs";
import { FaExternalLinkAlt } from "react-icons/fa";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './App.css';

import Modal from 'react-modal';

import { useDownloadExcel } from 'react-export-table-to-excel';
import DataTableExtensions from "react-data-table-component-extensions";
import 'react-data-table-component-extensions/dist/index.css';
import DataTable from 'react-data-table-component';


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


	const columns = [
		{
			name: 'Vehículo',  
			selector: row => row.vehiculo + " " + row.modelo +" "+ row.numvehiculo,
			sortable: true,
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
					<><input defaultValue={row.odometro} id={"odometro"+row.id} style={{width:'60px'}} ></input>KM</>
					)
			}
		},
		{
			name: 'KM Próx. Servicio',  
			selector: row => formatNull(row.kilometraje) + "KM",
			sortable: true,
		},
		{
			name: 'Precio',  
			selector: row => "$"+row.precio,
			sortable: true,
		}, 
		{
			name: 'Fecha',  
			selector: row => formatDate(row.fecha),
			sortable: true,
		}, 
		{
			name: 'Próximo',   
			cell: (row) => {
				return (
					(row.fechaproximo != null)?
									<td style={{textAlign:'center',border: '2px solid rgb(171,178,185)'}}>
									<input type="date" defaultValue={row.fechaproximo} id={"fechaproximo"+row.id} ></input>
									</td> 
									:
									<td style={{textAlign:'center',border: '2px solid rgb(171,178,185)'}}>
										 
									</td>
				)
			}
		}, 
		{
			name: 'Factura',   
			cell: (row) => {
				return (
					<a target="_blank" rel="noreferrer" href={"http://flotillas.grupopetromar.com/apirestflotilla/documentos/" + row.documentoservicio}>{row.documentoservicio}</a>
				)
			}
		},
		{
			name: 'Cotización',   
			cell: (row) => {
				return (
					<a target="_blank" rel="noreferrer" href={"http://flotillas.grupopetromar.com/apirestflotilla/documentos/" + row.cotizacionservicio}>{row.cotizacionservicio}</a>
				)
			}
		},
		{
			name: 'Orden de Compra',   
			selector: row => row.foliooc,
			sortable: true,
		},
		{
			name: 'Actualizar',   
			cell: (row) => {
				return (
					<td><button  className='btn btn-outline-success btn-sm' onClick={() => actualizarServicio(row.vehiculoid, row.id)} style={{width:'100%' }}><BsArrowRepeat /></button></td>
				)
			}
		},
		{
			name: 'Eliminar',   
			cell: (row) => {
				return (
					<td><button  className='btn btn-outline-danger btn-sm' onClick={() => eliminarServicio(row.vehiculoid, row.id)} style={{width:'100%' }}><BsXCircleFill /></button></td>
				)
			}
		}, 
		{
			name: 'Gastos',   
			cell: (row) => {
				return (
					<td><button  className='btn btn-outline-success btn-sm' onClick={() => actualizarGastos(row.id, row.vehiculo, row.servicio)} style={{width:'100%' }}><FaExternalLinkAlt /></button></td>
				)
			}
		},
	];

	function formatNull(value){
		if(value == null){
			value = "0";
		}
		return value;
	}
	const tableCustomStyles = {
		headCells: {
		  style: {
			fontSize: '15px',
			fontWeight: 'bold', 
			backgroundColor: '#e5e5e5'
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
		var id = "getServicios";
		const res = await axios.get(process.env.REACT_APP_API_URL+'?id='+ id+'&idflotilla='+props.flotilla+'&tipo='+props.tipo+'&userid='+props.userid);
		setListaS(res.data);
		//console.log(res.data);  process.env.REACT_APP_API_URL
		setListaSD(res.data);
	}
	 
	const tableRef = useRef(null);
    const { onDownload } = useDownloadExcel({
        currentTableRef: tableRef.current,
        filename: 'Servicios',
        sheet: 'Servicios'
    })

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


	async function eliminarServicio(folio, id){
		if(window.confirm('Desea eliminar el registro con folio: ' + id)){ 
			let fd = new FormData() 
			fd.append("id", "eliminarServicio") 
			fd.append("folio", id)  
			const res = await axios.post(process.env.REACT_APP_API_URL, fd);   
			notify(res.data.trim());
			getServicios();
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
	


	// Dynamically create select list
	let options = [];

	const [listaSv, setListavs] = useState([]);
	const [listasd, setListaSD] = useState([]);  

	 
	function filterDictamenVehiculo() {
		var tipo = document.getElementById('vehiculof').value;  
		if(tipo == "0"){ 
			setListaS(listasd);
		}else{ 
		var result = listasd.filter((x) => (x.vehiculoid == tipo)); 
		//console.log(result);
		setListaS(result);  
		}
	}

	return (

		<div className="container ">
			<div className='titulos'>
				<NabvarRe titulo="Servicios" />
			</div>
		 	
			<div className="row p-3">
			{(props.tipo == "1") ? 
				<div className='formularios'>
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
					
					<DocumentsServicio getServicios={getServicios} flotilla={props.flotilla} vehiculos={props.vehiculos} getServicios={getServicios}/>
				</div> 
		</div>
			:<></>
			}
			

				<div className='Divtablas'>
					<div className="card p-2 mt-2 border-secondary" encType="multipart/form-data" style={{height:'100%',width:'110%'}} >
						<h5 style={{textAlign:'center'}}>Servicios</h5>
						<div style={{display:'flex',alignItems:'center',marginBottom:'5px',marginBottom:'10px',flexWrap:'wrap'}}>
							<h6 style={{marginTop: '10px'}}>Vehículos:</h6>
							<select  id="vehiculof"  onChange={() => filterDictamenVehiculo()} className="form-control"  style={{width:'70%', marginTop:'5px',marginLeft:'5px'}}>
								<option value="0">Todos</option>
										
										{props.vehiculos.map(item => ( 
											<option value={item.vehiculoid}>{item.descripcion + " " + item.modelo + " " + item.numvehiculo  }</option>
											))}
								</select>
								<button onClick={onDownload} class="btn btn-outline-success btn-sm" style={{ marginLeft: '10px', width:'150px',marginTop:'10px'}}> Exportar excel </button>   
						</div>
										
						
						<div style={{height: "100%", overflow: "scroll"}}>
						<DataTableExtensions
							columns={columns}
							data={listas}
							print={true}
							export={true} 
							>
									<DataTable
												columns={columns}
												data={listas}
												fixedHeader={true}
												fixedHeaderScrollHeight={'100%'}
												pagination
												customStyles={tableCustomStyles}
												highlightOnHover={true}
											
											/>
						</DataTableExtensions>	
							<table id="tbl-documentos" style={{width: "100%"}}  ref={tableRef} hidden>
								<tr>
									<th class="header" style={{textAlign:'center',fontSize:'12px'}}>Vehículo</th>
									<th class="header" style={{textAlign:'center',fontSize:'12px'}}>Servicio</th>
									<th class="header" style={{textAlign:'center',fontSize:'12px'}}>Odomentro</th>
									<th class="header" style={{textAlign:'center',fontSize:'12px'}}>Kilometraje Próx. Servicio</th>
									<th class="header" style={{textAlign:'center',fontSize:'12px'}}>Precio</th>
									<th class="header" style={{textAlign:'center',fontSize:'12px'}}>Fecha</th>
									<th class="header" style={{textAlign:'center',fontSize:'12px'}}>Próximo</th>
									<th class="header" style={{textAlign:'center',fontSize:'12px'}}>Factura</th>
									<th class="header" style={{textAlign:'center',fontSize:'12px'}}>Cotización</th>
									<th class="header" style={{textAlign:'center',fontSize:'12px'}}>Orden de Compra</th>
									<th class="header" style={{textAlign:'center',fontSize:'12px'}}>Actualizar</th>
									<th class="header" style={{textAlign:'center',fontSize:'12px'}}>Eliminar</th>
									<th class="header" style={{textAlign:'center',fontSize:'12px'}}>Gastos</th>
								</tr>
								{listas.map(item => (
								<tr id="tabletr" style={{border: '2px solid #ABB2B9', fontSize:'11px'}}>
									<td  style={{ minWidth:'180px',border: '2px solid rgb(171,178,185)'}}>{item.vehiculo + " " + item.modelo +" "+ item.numvehiculo}</td>
									<td style={{textAlign:'left', padding:'5px', minWidth:'180px',border: '2px solid rgb(171,178,185)'}}>{item.servicio}</td>
									<td style={{border: '2px solid rgb(171,178,185)'}} ><input defaultValue={item.odometro} id={"odometro"+item.id} style={{width:'60px'}} ></input>KM</td>
									<td style={{border: '2px solid rgb(171,178,185)'}}  align='center'>{item.kilometraje} KM</td>
									<td style={{border: '2px solid rgb(171,178,185)'}}>${item.precio}</td>
									<td style={{textAlign:'center',border: '2px solid rgb(171,178,185)'}}>{formatDate(item.fecha)}</td>
									{(item.fechaproximo != null)?
									<td style={{textAlign:'center',border: '2px solid rgb(171,178,185)'}}>
									<input type="date" defaultValue={item.fechaproximo} id={"fechaproximo"+item.id} ></input>
									</td> 
									:
									<td style={{textAlign:'center',border: '2px solid rgb(171,178,185)'}}>
										 
									</td>
									}
									
									<td style={{textAlign:'center', minWidth:'130px',border: '2px solid rgb(171,178,185)'}}><a target="_blank" rel="noreferrer" href={"http://flotillas.grupopetromar.com/apirestflotilla/documentos/" + item.documentoservicio}>{item.documentoservicio}</a></td>
									<td style={{textAlign:'center', minWidth:'130px',border: '2px solid rgb(171,178,185)'}}><a target="_blank" rel="noreferrer" href={"http://flotillas.grupopetromar.com/apirestflotilla/documentos/" + item.cotizacionservicio}>{item.cotizacionservicio}</a></td>
									<td style={{border: '2px solid rgb(171,178,185)'}}>{item.foliooc}</td>
									<td><button  className='btn btn-outline-success btn-sm' onClick={() => actualizarServicio(item.vehiculoid, item.id)} style={{width:'100%' }}><BsArrowRepeat /></button></td>
									<td><button  className='btn btn-outline-danger btn-sm' onClick={() => eliminarServicio(item.vehiculoid, item.id)} style={{width:'100%' }}><BsXCircleFill /></button></td>
									<td><button  className='btn btn-outline-success btn-sm' onClick={() => actualizarGastos(item.id, item.vehiculo, item.servicio)} style={{width:'100%' }}><FaExternalLinkAlt /></button></td>
								</tr>
								))}
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







export default Servicios;
