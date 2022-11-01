
import React, { useState, useEffect } from 'react';
import { FaCheckCircle, FaTrash, FaEdit, FaRedditAlien, FaEye } from 'react-icons/fa'
import axios from '../node_modules/axios';
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

function Placas(props) { 

	
    const [modalIsOpenLoad, setIsOpenLoad] = React.useState(false);
	const [listav, setListaV] = useState([]);  
	const [listap, setListaP] = useState([]);  
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
		var id = "getPlacas";
		openModalLoad();
		const res = await axios.get( process.env.REACT_APP_API_URL+'?id='+ id);
		closeModalLoad();
		setListaP(res.data);
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
	
	async function addPlacas() {
		
		var vehiculoid = document.getElementById("vehiculoid").value;
		var placas = document.getElementById("placas").value;
		var fechainicial = document.getElementById("fechainicial").value;
		var fechafinal = document.getElementById("fechafinal").value; 
		var placadocumento = document.getElementById("placadocumento"); 
		
		let fd = new FormData()
			fd.append("id", "addPlacas")
			fd.append("vehiculoid", vehiculoid)
			fd.append("placas", placas) 
			fd.append("fechainicial", fechainicial)
			fd.append("fechafinal", fechafinal)
			fd.append("placadocumento", placadocumento.files[0])
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
 

   

 
	const style = `
		.form-control{
			margin-bottom: .5vmax;
		}
	`;

	return (
		<div className="container ">
			<input id='input-cotizacion' type='file' style={{ display: 'none' }} ></input>
			<NabvarRe titulo="Placas" />
			<div className="row p-3">
				<div style={{ width: '30%'}}>
					 
					<div className="card p-2 mt-2 border-secondary" style={{ overflow:'scroll'}}>
						<h5>Placas</h5>
						<select  id="vehiculoid"  className="form-control"  style={{width:'100%', marginTop:'5px'}}>
						{listav.map(item => ( 
									<option value={item.vehiculoid}>{item.descripcion + " -" + item.vehiculoid}</option>

						))}
						</select>
						<span>Placas:</span>
						<input id="placas" placeholder="Placas" className="form-control"></input>
						<br></br> 
						
						<h5>Tarjeta de circulación</h5> 
						<span>Fecha:</span>
						<input id="fechainicial" placeholder="Fecha Alta"  className="form-control" type="date"></input>						
						<br></br> 
						
						<span>Vencimiento:</span>
						<input id="fechafinal" placeholder="Fecha Vencimiento" className="form-control" type="date"></input>
						<br></br> 
					 
						<span>Imagen:</span> 
						<input id="placadocumento" type="file" style={{ height: '50px'}} />
						<br></br> 
							 
						<button className="btn btn-outline-success btn-sm" onClick={() => addPlacas()}>Agregar <FaCheckCircle /></button>
					</div>
				</div>

				<div style={{ width: '70%' }}>
					<form className="card p-2 mt-2 border-secondary" encType="multipart/form-data"  style={{ height:'230px', overflow:'scroll'}}>
						<h5>Historial de placas</h5>
						<table id="productstable"  style={{width:'100%'}}> 
                    <tr>
                        <th>Placas</th>
                        <th>Vehiculo</th>
                        <th>Fecha</th>
                        <th>Vencimiento</th> 
                    </tr>

                    {  
                    listap.map(item => ( 
                     <tr>
                    <td className='id-orden' >{item.placas}</td>
                    <td className='id-orden' >{item.vehiculo}</td>
                    <td>{format(item.fechainicial)}</td>
                    <td>{format(item.fechafinal)}</td> 
                    
                </tr>
                
        ))}	
                        <input id='input-cotizacion' type='file' style={{display:'none'}}></input>
                </table> 
					</form>

					<div style={{ width: '100%' }}>
					<div className="card p-2 mt-2 border-secondary"  style={{ height:'110px', overflow:'scroll'}}>
						<h5>Proximo a vencer (6 meses)</h5>
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

				

				<div style={{ maxHeight: '22vmax', overflowY: 'scroll', width: '100%' }}>
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

export default Placas;