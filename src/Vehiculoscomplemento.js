
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
			<NabvarRe titulo="Complementos del Vehículo" />
			<div className="row p-3">
				{(props.tipo == "1") ? 
				<div style={{ width: '30%'}}>
					 
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
				

				<div style={{ width: '70%' }}>
					<form className="card p-2 mt-2 border-secondary" encType="multipart/form-data"  style={{ height:'85vh', overflow:'scroll'}}>
						<h5>Historial de complementos</h5>

						<h6>Vehiculo</h6>
						
						<select  id="vehiculof"  onChange={() => filterPlacaVehiculo()} className="form-control"  style={{width:'100%', marginTop:'5px'}}>
						<option value="0">Todos</option>
						{props.vehiculos.map(item => ( 
									<option value={item.vehiculoid}>{item.descripcion + " " + item.modelo + " " + item.numvehiculo }</option>

						))}
                             
						</select>

						<table id="productstable"  style={{width:'100%'}}> 
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
                     <tr id="tabletr" style={{border: '2px solid #ABB2B9', fontSize:'14px'}}>
                    <td className='id-orden'  align='center' >{item.folio}</td>
                    <td className='id-orden' style={{minWidth:'220px'}}>{item.vehiculo + item.modelo + " " + item.numvehiculo}</td>
                    <td  align='center'>{item.capacidad}</td>
                    <td>{item.serie}</td>
					<td  align='center' style={{minWidth:'220px'}}>{item.descripcion}</td>  
					<td style={{minWidth:'220px'}}><a target="_blank" rel="noreferrer" href={"https://flotillas.grupopetromar.com/apirestflotilla/DocumentoTanque/" + item.factura}>{item.factura}</a></td> 
                    <td>{format(item.fechafactura)}</td>
                    <td>{format(item.fechacaptura)}</td>
                    
                    
                    
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