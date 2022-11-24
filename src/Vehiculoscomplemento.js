
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
	const [listav, setListaV] = useState([]);  
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
		getVehiculos();
		getPlacas();
		getPlacasV();
	}, [])
 
	  
	async function getPlacas() {
		var id = "getTanques";
		openModalLoad();
		const res = await axios.get( process.env.REACT_APP_API_URL+'?id='+ id);
		closeModalLoad();
		setListaP(res.data);
		setListaPD(res.data);
		console.log(res.data);
	}
	async function getPlacasV() {
		var id = "getPlacasProximo";
		const res = await axios.get(process.env.REACT_APP_API_URL+'?id='+ id);
		setListaPV(res.data);
		console.log(res.data);
	}

	async function getVehiculos() {
		var id = "11";
		const res = await axios.get(process.env.REACT_APP_API_URL+'?id='+ id);
		setListaV(res.data);
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
		var complementodocumento = document.getElementById("complementodocumento"); 
		
		let fd = new FormData()
			fd.append("id", "addComplemento")
			fd.append("vehiculoid", vehiculoid)
			fd.append("capacidad", capacidad) 
			fd.append("descripcion", descripcion) 
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
		var result = listapd.filter((x) => (x.vehiculoid === tipo)); 
		setListaP(result); 
		
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
				<div style={{ width: '30%'}}>
					 
					<div className="card p-2 mt-2 border-secondary" style={{height:'430px',overflow:'scroll'}}>
						<h5>Vehículo</h5>
						<select  id="vehiculoid"  className="form-control"  style={{width:'100%', marginTop:'5px'}}>
						{listav.map(item => ( 
									<option value={item.vehiculoid}>{item.descripcion + " -" + item.vehiculoid}</option>

						))}
						</select>
						<span>Capacidad:</span>
						<input id="capacidad" placeholder="Capacidad" className="form-control"></input>
						<br></br> 
						 
						<span>Descripción:</span>
						<input id="descripcion" placeholder="descripcion"  className="form-control"  ></input>						
						<br></br> 
					 
						<span>Documento:</span> 
						<input id="complementodocumento" type="file" style={{ height: '50px'}} />
						<br></br> 
							 
						<button className="btn btn-outline-success btn-sm" onClick={() => addComplemento()}>Agregar <FaCheckCircle /></button>
					</div>
				</div>

				<div style={{ width: '70%' }}>
					<form className="card p-2 mt-2 border-secondary" encType="multipart/form-data"  style={{ height:'430px', overflow:'scroll'}}>
						<h5>Historial de complementos</h5>

						<h6>Vehiculo</h6>
						<select  id="vehiculof"  onChange={() => filterPlacaVehiculo()} className="form-control"  style={{width:'100%', marginTop:'5px'}}>
						{listav.map(item => ( 
									<option value={item.vehiculoid}>{item.descripcion + " -" + item.vehiculoid}</option>

						))}
                             
						</select>

						<table id="productstable"  style={{width:'100%'}}> 
                    <tr>
					<th>Folio</th>
                        <th>Vehiculo</th>
                        <th>Capacidad</th>
                        <th>Descripcion</th>  
                        <th>Factura</th>  
                        <th>Fecha Captura</th> 
                    </tr>

                    {  
                    listap.map(item => ( 
                     <tr>
                    <td className='id-orden' >{item.folio}</td>
                    <td className='id-orden' >{item.vehiculo}</td>
                    <td>{item.capacidad}</td>
					<td>{item.descripcion}</td>  
					<td><a target="_blank" rel="noreferrer" href={"https://flotillas.grupopetromar.com/apirestflotilla/documentos/" + item.factura}>{item.factura}</a></td> 
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
                        <th>Placas</th>
                        <th>Vehiculo</th>
                        <th>Fecha</th>
                        <th>Vencimiento</th>  
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
							{listav.map(item => (
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
                        <th>Placas</th>
                        <th>Vehiculo</th>
                        <th>Fecha</th>
                        <th>Vencimiento</th>  
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