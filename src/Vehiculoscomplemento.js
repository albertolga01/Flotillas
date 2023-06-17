
import React, { useState, useEffect } from 'react';
import { FaCheckCircle, FaTrash, FaEdit, FaRedditAlien, FaEye } from 'react-icons/fa'
import axios from 'axios';
import { NabvarRe } from './component/Navbar';
import './App.css';
import Modal from 'react-modal';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";  
import {ThreeDots } from  'react-loader-spinner'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DataTableExtensions from "react-data-table-component-extensions";
import 'react-data-table-component-extensions/dist/index.css';
import DataTable from 'react-data-table-component';

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

function Vehiculoscomplemento(props) { 

	const columns = [
		{
			name: 'Folio',  
			selector: row => row.folio,
			sortable: true,
			maxWidth: "5px", 
			width: "60px" 
		},
		{
			name: 'Vehículo',  
			selector: row => row.vehiculo + " " + row.modelo +" "+ row.numvehiculo,
			sortable: true,
			width: "210px",
			wrap: true,
		},
		{
			name: 'Capacidad',  
			selector: row => row.capacidad,
			sortable: true,
			maxWidth: "5px", 
			width: "100px" 
		},
		{
			name: 'Serie',  
			selector: row => row.serie,
			sortable: true, 
			maxWidth: "5px", 
			width: "110px",
		},
		{
			name: 'Descripción',  
			selector: row => row.descripcion,
			sortable: true,		 
			maxWidth: "5px", 
			width: "180px",
		},
		{
			name: 'Factura',  
			cell: (row) =>{
                return(
					<a target="_blank" rel="noreferrer" href={"https://flotillas.grupopetromar.com/apirestflotilla/DocumentoTanque/" + row.factura}>{row.factura}</a>
                )
            },
			//sortable: true,//celda con a tag
		},
		{
			name: 'Fecha Factura',  
			selector: row => format(row.fechafactura),
			//sortable: true, 
			maxWidth: "5px", 
			width: "110px",
		},
		{
			name: 'Fecha Captura',  
			selector: row => format(row.fechacaptura),
			//sortable: true, 
			maxWidth: "5px", 
			width: "110px",
		},
	];

	
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

    const [modalIsOpenLoad, setIsOpenLoad] = React.useState(false); 
	const [listap, setListaP] = useState([]);  
	const [listapd, setListaPD] = useState([]);  
	const [listapv, setListaPV] = useState([]);
	const [listaver, setListaVer] = useState([]);
	
	
	
	let subtitle;


	const [modalIsOpen, setIsOpen] = React.useState(false);

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

	 
	 
	useEffect(() => { 
		getPlacas();
		getPlacasV();
	}, [])
 
	  
	async function getPlacas() {
		var id = "getTanques";
		openModalLoad();
		const res = await axios.get( process.env.REACT_APP_API_URL+'?id='+ id+'&idflotilla='+props.flotilla+'&tipo='+props.tipo+'&userid='+props.userid);
		closeModalLoad();
		setListaP(res.data);
		setListaPD(res.data);
		console.log(res.data);
	}
	async function getPlacasV() {
		var id = "getPlacasProximo";
		const res = await axios.get(process.env.REACT_APP_API_URL+'?id='+ id+'&idflotilla='+props.flotilla);
		setListaPV(res.data);
		console.log(res.data);
	} 
 


	async function verVehiculo(vehiculoid) {
	 
		var id = "verVehiculo";
		const res = await axios.get(process.env.REACT_APP_API_URL+'?id='+ id+'&vehiculoid='+vehiculoid);
		
		setListaVer(res.data); 
 		openModal();
	}
	
	async function addComplemento() {
		
		var vehiculoid = document.getElementById("vehiculoid").value;
		var capacidad = document.getElementById("capacidad").value;
		var descripcion = document.getElementById("descripcion").value; 
		var serie = document.getElementById("serie").value; 
		var complementodocumento = document.getElementById("complementodocumento"); 
		var fechafactura = document.getElementById("fechafactura").value;
		
		let fd = new FormData()
			fd.append("id", "addComplemento")
			fd.append("vehiculoid", vehiculoid)
			fd.append("capacidad", capacidad) 
			fd.append("descripcion", descripcion) 
			fd.append("serie", serie) 
			fd.append("fechafactura", fechafactura) 
			fd.append("complementodocumento", complementodocumento.files[0])
		openModalLoad();
		const res = await axios.post(process.env.REACT_APP_API_URL, fd);
		closeModalLoad();
		notify(res.data.trim());
		 
		getPlacas();

	}
	
	function format(todayy){
		var today = new Date(todayy);
		var dd = String(today.getDate()).padStart(2, '0');
	  var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
	  var yyyy = today.getFullYear();
	  
	  today = dd + '/' + mm + '/' + yyyy;
	   return today;
	}
 

	function filterPlacaVehiculo() {
		var tipo = document.getElementById('vehiculof').value; 
		if(tipo == "0"){ 
			setListaP(listapd);
		}else{ 
		var result = listapd.filter((x) => (x.vehiculoid === tipo)); 
		setListaP(result); 
		}
	}

 
	const style = `
		.form-control{
			margin-bottom: .5vmax;
		}
	`;

	return (
		<div className="container ">
			<input id='input-cotizacion' type='file' style={{ display: 'none' }} ></input>
			<div className='titulos'>
				<NabvarRe titulo="Complementos del Vehículo" />
			</div>
			
			<div className="row p-3">
				{(props.tipo == "1") ? 
				<div className='formularios'>
					 
				<div className="card p-2 mt-2 border-secondary" style={{height:'530px',overflow:'scroll'}}>
					<h5>Vehículo</h5>
					<select  id="vehiculoid"  className="form-control"  style={{width:'100%', marginTop:'5px'}}>
					{props.vehiculos.map(item => ( 
								<option value={item.vehiculoid}>{item.descripcion + " " + item.modelo + " " + item.numvehiculo }</option>

					))}
					</select>
					<span>Capacidad:</span>
					<input id="capacidad" placeholder="Capacidad" className="form-control"></input>
					<br></br> 
					 
					<span>Descripción:</span>
					<input id="descripcion" placeholder="descripcion"  className="form-control"  ></input>						
					<br></br> 

					<span>Serie:</span>
					<input id="serie" placeholder="serie"  className="form-control"  ></input>						
					<br></br>

					<span>Fecha Factura</span>
					<input id="fechafactura" placeholder="Fecha Factura" className="form-control" type="date" ></input>

					<span>Documento:</span> 
					<input id="complementodocumento" type="file" style={{ height: '50px'}} />
					<br></br> 
						 
					<button className="btn btn-outline-success btn-sm" onClick={() => addComplemento()}>Agregar <FaCheckCircle /></button>
				</div>
			</div>
				: <></>
				}
				

				<div className='Divtablas'>
					<form className="card p-2 mt-2 border-secondary" encType="multipart/form-data"  style={{  overflow:'scroll'}}>
						<h5 style={{textAlign:'center'}}>Historial de complementos</h5>

						<div style={{display:'flex',alignItems:'center',marginBottom: '20px'}}>
							<h6 style={{marginTop: '10px'}}>Vehiculos:</h6>
							<select  id="vehiculof"  onChange={() => filterPlacaVehiculo()} className="form-control"  style={{width:'100%', marginTop:'5px',marginLeft:'5px'}}>
								<option value="0">Todos</option>
									{props.vehiculos.map(item => ( 
									<option value={item.vehiculoid}>{item.descripcion + " " + item.modelo + " " + item.numvehiculo }</option>

									))}                             
							</select>
						</div>
						
						
			<DataTableExtensions
					columns={columns}
					data={listap}
					print={true}
					export={true}
					filterPlaceholder="Filtrar" 

					>
							<DataTable
										columns={columns}
										data={listap}
										fixedHeader={true}
										fixedHeaderScrollHeight={'100%'}
										pagination
										customStyles={tableCustomStyles}
										highlightOnHover={true}
										noDataComponent={"No se encontró información"}

									
									/>
				</DataTableExtensions>


						<table id="productstable" className='tabla-complementos' hidden> 
                    <tr>
					<th class="header">Folio</th>
                        <th class="header" style={{textAlign:'center'}}>Vehiculo</th>
                        <th class="header" style={{textAlign:'center'}}>Capacidad</th>
                        <th class="header" style={{textAlign:'center'}}>Serie</th>
                        <th class="header" style={{textAlign:'center'}}>Descripcion</th>  
                        <th class="header" style={{textAlign:'center'}}>Factura</th>  
                        <th class="header" style={{textAlign:'center'}}>Fecha Factura</th>  
                        <th class="header" style={{textAlign:'center'}}>Fecha Captura</th> 
                    </tr>

                    {  
                    listap.map(item => ( 
                     <tr id="tabletr" style={{border: '.5px solid #ABB2B9', fontSize:'11px'}}>
                    <td className='id-orden' style={{border: '2px solid rgb(171,178,185)'}}  align='center' >{item.folio}</td>
                    <td className='id-orden' style={{minWidth:'150px',border: '2px solid rgb(171,178,185)'}}>{item.vehiculo + item.modelo + " " + item.numvehiculo}</td>
                    <td style={{minWidth:'30px',border: '2px solid rgb(171,178,185)'}} align='center'>{item.capacidad}</td>
                    <td style={{border: '2px solid rgb(171,178,185)'}} align='center'>{item.serie}</td>
					<td  align='center' style={{minWidth:'110px',border: '2px solid rgb(171,178,185)'}}>{item.descripcion}</td>  
					<td style={{minWidth:'150px',border: '2px solid rgb(171,178,185)'}}><a target="_blank" rel="noreferrer" href={"https://flotillas.grupopetromar.com/apirestflotilla/DocumentoTanque/" + item.factura}>{item.factura}</a></td> 
                    <td style={{border: '2px solid rgb(171,178,185)'}}>{format(item.fechafactura)}</td>
                    <td style={{border: '2px solid rgb(171,178,185)'}}>{format(item.fechacaptura)}</td>
                    
                    
                    
                </tr>
                
        ))}	
                        <input id='input-cotizacion' type='file' style={{display:'none'}}></input>
                </table> 
					</form>

					<div style={{ width: '100%',display: 'none' }}>
					<div className="card p-2 mt-2 border-secondary"  style={{ height:'210px', overflow:'scroll'}}>
						<h5>Proximo a vencer  </h5>
						<table id="productstable"  style={{width:'100%'}}> 
                    <tr>
                        <th class="header">Placas</th>
                        <th class="header">Vehiculo</th>
                        <th class="header">Fecha</th>
                        <th class="header">Vencimiento</th>  
                    </tr>

                    {  
                    listapv.map(item => ( 
                     <tr>
                    <td className='id-orden' >{item.placas}</td>
					<td>{item.vehiculo}</td>
                    <td>{format(item.fechainicial)}</td>
                    <td>{format(item.fechafinal)}</td>
                   
                    
                </tr>
                
        ))}	
                        <input id='input-cotizacion' type='file' style={{display:'none'}}></input>
                </table> 
					</div>
				</div>
				</div>

				

				<div style={{ maxHeight: '22vmax', overflowY: 'scroll', width: '10%' }}>
				</div>

				<div style={{ top: '150px', display: 'none'}} >
					
					<div style={{ position: 'sticky', bottom: '10px', backgroundColor: 'white', border: '2px solid black', borderRadius: '5px', width: '80%', margin: '15px', padding: '15px', height:'410px' }}>
						<div className="d-flex flex-row" style={{ overflowX: 'scroll' }} >
							{props.vehiculos.map(item => (
								<div className="card p-2 mt-2 border-secondary" key={item.id} style={{ width: '15px', marginLeft: '10px', minWidth: '15%' }}>
									<div>
									<b><label ></label></b> <label className="text-primary">{item.descripcion + " -"+ item.vehiculoid}</label> &nbsp;&nbsp; 
										{(item.icon == null)  ?
										<img src={'http://flotillas.grupopetromar.com/default.jpg'} style={{ height: '100px', width: '140px' }}></img>  
										:
										<img src={'http://flotillas.grupopetromar.com/apirestflotilla/Vehiculos/'+item.icon} style={{ height: '100px', width: '140px' }}></img> 
										 }
										
									
									</div>

									<button className="btn btn-outline-success btn-sm" onClick={() => verVehiculo(item.vehiculoid)}>
										<FaEye /> ver
									</button>
								</div>
							))}
						</div>
					</div>
				</div>
			</div>

			<Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <label ref={(_subtitle) => (subtitle = _subtitle)} style={{color:'black', fontSize:'32px'}}>Historial de Placas</label>
        <br></br>
        <br></br>
		<table id="productstable"  style={{width:'500px'}}> 
                    <tr>
                        <th class="header">Placas</th>
                        <th class="header">Vehiculo</th>
                        <th class="header">Fecha</th>
                        <th class="header">Vencimiento</th>  
                    </tr>

                    {  
                    listaver.map(item => ( 
                     <tr>
                    <td className='id-orden' >{item.placas}</td>
					<td>{item.vehiculo}</td>
                    <td>{format(item.fechainicial)}</td>
                    <td>{format(item.fechafinal)}</td>
                   
                    
                </tr>
                
        ))}	
		</table>
        
<br></br>
<br></br>
		<button onClick={closeModal} class="btn btn-outline-danger btn-sm ">Cancelar</button> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
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

export default Vehiculoscomplemento;