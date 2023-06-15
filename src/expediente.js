
import React, { useState, useEffect } from 'react';
import { FaCheckCircle, FaTrash, FaEdit, FaRedditAlien, FaEye } from 'react-icons/fa'
import axios from '../node_modules/axios';
import { NabvarRe } from './component/Navbar';
import Documents from './component/Documents';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";  
import {ThreeDots } from  'react-loader-spinner'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import DataTableExtensions from "react-data-table-component-extensions";
import 'react-data-table-component-extensions/dist/index.css';
import DataTable from 'react-data-table-component';


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

function Expediente(props) {

	
	const columns = [
		{
			name: 'Nombre',  
			selector: row => row.Filename,
			sortable: true,
		},
		{
			name: 'Descripción',  
			selector: row => row.FileDesc,
			sortable: true,
		},
		{
			name: 'Fecha',  
			selector: row => row.UploadDate,
			sortable: true,
		}, 
		{
			name: 'Archivo',   
			cell: (row) => {
				return (
					<a target="_blank" rel="noreferrer" href={"http://flotillas.grupopetromar.com/apirestflotilla/documentos/" + row.FilePath}>{row.FilePath}</a>
				)
			}
		},
	];

	 
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
    
    const [modalIsOpenLoad, setIsOpenLoad] = React.useState(false);
	const [modalIsOpen, setIsOpen] = React.useState(false);

	const [couno, setCouno] = useState([]);
	const [codos, setCodos] = useState([]);
	const [cotres, setCotres] = useState([]); 
	const [docsVehi, setDocsVehi] = useState([]);
	const [listaver, setListaVer] = useState([]);
	const [listapd, setListaPD] = useState([]);  


	const [lista, setLista] = useState([]);
	const [value, setValue] = useState([]);
	let id = 0;
	let tipo = 0;
	 let subtitle;
 
	 
	 
 
	function filterPlacaVehiculo() {
		var tipo = document.getElementById('vehiculof').value;  
		if(tipo == "0"){ 
			setDocsVehi(listapd);
		}else{ 
		var result = listapd.filter((x) => (x.vehiculoid === tipo)); 
		setDocsVehi(result); 
		}
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
            formData.append("id", "getExpediente");
			formData.append("IDvehiculo", vehiculoid)
		openModalLoad();
        return fetch(process.env.REACT_APP_API_URL, {
            method: 'POST',
            mode: 'cors',
            body: formData
        })
		.then(response => response.json())
        .then(data => {
			setListaVer(data);
			closeModalLoad();
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
			formData.append("idflotilla", props.flotilla)
		openModalLoad();
        return fetch(process.env.REACT_APP_API_URL, {
            method: 'POST',
            mode: 'cors',
            body: formData
        })
		.then(response => response.json())
        .then(data => {
			setDocsVehi(data);
			setListaPD(data);
			closeModalLoad();
			console.log(data);
		}
			
		)
    }


	// Dynamically create select list
	let options = [];


	return (

		<div className="container ">
			<div className='titulos'>
				<NabvarRe titulo="Expediente" />
			</div>
		 	
			<div className="row p-3">
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
							
							<Documents vehiculos={props.vehiculos} flotilla={props.flotilla} getDocumentosTodos={getDocumentosTodos} />
						</div> 
				</div>

				<div className='Divtablas'>
					<form className="card p-2 mt-2 border-secondary" encType="multipart/form-data" style={{height:'100%'}} >
						<h5 style={{textAlign:'center'}}>Expediente</h5>
						
						<div id="display-expediente" style={{display:'flex', gap:"2vmax"}}>
							<span style={{marginTop: '10px'}}>Vehículo: {lista}</span>
							
							<select  id="vehiculof"  onChange={() => filterPlacaVehiculo()} className="form-control"  style={{width:'100%' }}>
							<option value="0">Todos</option>
						
						{props.vehiculos.map(item => ( 
									<option value={item.vehiculoid}>{item.descripcion + " " + item.modelo + " " + item.numvehiculo }</option>

						))}
                             
						</select>
									<h6 id="id-displayexp" style={{fontWeight:"400"}}>{docsVehi.descripcion}</h6>
								 
						
						 
						 
						</div>

						<div style={{height: "300px", overflow: "scroll"}}>
						<button  style={{height:'38px', margintop:'5px'}} onClick={() => getDocumentosTodos()} class="btn btn-outline-success btn-sm">Filtrar</button>
						<DataTableExtensions
							columns={columns}
							data={docsVehi}
							print={true}
							export={true} 
							>
									<DataTable
												columns={columns}
												data={docsVehi}
												fixedHeader={true}
												fixedHeaderScrollHeight={'100%'}
												pagination
												customStyles={tableCustomStyles}
												highlightOnHover={true}
											
											/>
						</DataTableExtensions>
							<table id="tbl-documentos" style={{width: "100%"}} hidden>
								<tr>
									<th class="header">Nombre</th>
									<th class="header">Descripción</th>
									<th class="header">Fecha</th>
									<th class="header">Archivo</th>
								</tr>
								{docsVehi.map(item => (
								<tr>
									<td>{item.Filename}</td>
									<td>{item.FileDesc}</td>
									<td>{item.UploadDate}</td>
									<td><a target="_blank" rel="noreferrer" href={"http://flotillas.grupopetromar.com/apirestflotilla/documentos/" + item.FilePath}>{item.FilePath}</a></td>
								</tr>
								))}
							</table>
						</div>

					</form>
				</div>

				<div style={{ margin: 'auto' , display:'none'}} >
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

									<button className="Bttn" onClick={() => verVehiculo(item.vehiculoid, item.descripcion)}
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
							<label ref={(_subtitle) => (subtitle = _subtitle)} style={{color:'black', fontSize:'32px'}}>Expediente del vehículo</label>
							<br></br>
							<br></br>
							<table id="productstable"  style={{width:'500px'}}> 
										<tr>
											<th class="header">Vehículo</th>
											<th class="header">Nombre Archivo</th>
											<th class="header">Fecha</th>
											<th class="header">Vencimiento</th>  
										</tr>

										{  
										listaver.map(item => ( 
										<tr>
										<td>{item.descvehiculo}</td>
										<td className='id-orden' >{item.Filename}</td>
										<td>{format(item.UploadDate)}</td> 
										<td><a target="_blank" rel="noreferrer" href={"https://flotillas.grupopetromar.com/apirestflotilla/documentos/" + item.FilePath}>{item.FilePath}</a></td>
							
									
										
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







export default Expediente;
