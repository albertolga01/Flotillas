import add from './resources/add.svg';
import React, { useState, useEffect } from 'react';
import { FaCheckCircle } from 'react-icons/fa'
import axios from '../node_modules/axios';
import { NabvarRe } from './component/Navbar';
import './App.css';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";  
import {ThreeDots } from  'react-loader-spinner'

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

function NvaRequisicion(props) {

	function openModalLoad() { 
		setIsOpenLoad(true); 
	}  
	   
	function closeModalLoad() { 
		setIsOpenLoad(false); 
	}


	const [dptos, setDeptos] = useState([]);
	const [listadepartamento, setListadepartamento] = useState([]);

	
	const [empresas, setEmpresas] = useState([]);
	const [listaEmpresas, setListaEmpresas] = useState([]);
	const [modalIsOpenLoad, setIsOpenLoad] = React.useState(false);

	useEffect(() => {
		getTipos();
		getEmpresas();
	}, [])

	async function getTipos() {
		var id = "10";
		const rese = await axios.get(process.env.REACT_APP_API_URL+'?id='+ id);
		setDeptos(rese.data);
		//console.log(rese.data);
		//var Data = JSON.stringify(rese.data);
		//console.log(Data[0]);
	}

	async function getEmpresas() {
		var id = "getEmpresas";
		const rese = await axios.get(process.env.REACT_APP_API_URL+'?id='+ id);
		setEmpresas(rese.data);
		//console.log(rese.data);
		//var Data = JSON.stringify(rese.data);
		//console.log(Data[0]);
	}

	async function addVehiculo(e) {
		e.preventDefault();
		var userid = props.userid;
		var observaciones = document.getElementById("observaciones").value;
		var descripcion = document.getElementById("descripcion").value;
		var tipoid = document.getElementById("tipoid").value;
		var img = document.getElementById("img-vehi");
		var serievehiculo = document.getElementById("serievehiculo").value;
		var seriemotor = document.getElementById("seriemotor").value;
		var tipouso = document.getElementById("tipouso").value;
		var empresa = document.getElementById("empresa").value;
		var numvehiculo = document.getElementById("numvehiculo").value;
		var responsable = document.getElementById("responsable").value;
		var modelo = document.getElementById("modelo").value;
		var gps = document.getElementById("gps").value;
		let fd = new FormData()
			fd.append("id", "InsertVehiculo")
			fd.append("userid", userid)
			fd.append("observaciones", observaciones)
			fd.append("descripcion", descripcion)
			fd.append("tipo", tipoid)
			fd.append("img-vehi", img.files[0])
			fd.append("serievehiculo", serievehiculo)
			fd.append("seriemotor", seriemotor)
			fd.append("tipouso", tipouso)
			fd.append("empresa", empresa)
			fd.append("numvehiculo", numvehiculo)
			fd.append("responsable", responsable)
			fd.append("modelo", modelo)
			fd.append("gps", gps)

			openModalLoad();
		const res = await axios.post(process.env.REACT_APP_API_URL, fd);
		 closeModalLoad();
		if (res.data == "1") {
			//notify("Nuevo vehiculo agregado correctamente");
			notify(res.data.trim());

			document.getElementById("observaciones").value = "";
			document.getElementById("descripcion").value = "";
		}else{
			notify(res.data.trim());

		}
		
		//notify(res.data);
	}

	const [value, setValue] = useState([]);

	useEffect(() => {
		getUsuarios();
	}, [])

	function notify(message){
		toast(message);
	}

	async function getUsuarios() {
		var id = "2";
		const rese = await axios.get(process.env.REACT_APP_API_URL+'?id='+ id);
		// console.log(rese.data);
		//notify(rese.data);
		setValue(rese.data);
	}

	return (
		<div className="container ">
			<NabvarRe titulo="Nuevo Vehiculo"/>

			<div className="row p-3">
				<div style={{ margin: 'auto' }} >
					<br></br>
					<div style={{ backgroundColor: 'white', border: '2px solid black', borderRadius: '5px', width: '600px', margin: 'auto', padding: '12px' }}>
						<table>
							<tr>
								<th colSpan="2" style={{ borderRadius: '20px 20px 0px 0px', height: '30px', fontFamily: 'Roboto, sans-serif', fontSize: '10px' }}>
									<label style={{ fontSize: '16px' }}> Agregar Nuevo Vehiculo</label>
								</th>
							</tr>

							<tr>
								<td><label>Tipo de Vehiculo:</label><br></br>
									<select id="tipoid" style={{ width: '556px', height: '25px' }} onChange={(e) => setListadepartamento(e.target.value)}>
										{dptos.map(item => (
											<option value={item.dptoid}> {item.name}</option>))
										}
									</select>
								</td>
							</tr>
							<tr>
								<td><label>Modelo (Año):</label><br /><input id="modelo" style={{ width: '556px', height: '20px' }} /></td>
								 
							</tr>
							<tr>
								<td><label>Responsable:</label><br /><input id="responsable" style={{ width: '556px', height: '20px' }} /></td>
								 
							</tr>
							<tr>
								<td>
									<label>Número de vehículo</label><br />
									<input id="numvehiculo" style={{ width: '556px', height: '20px' }}   />
								</td> 
							</tr>
							<tr>
								<td> 
									<label>Serie del vehículo:</label><br />
									<input id="serievehiculo" style={{ width: '556px', height: '20px' }}   />
								</td> 
							</tr>

							<tr>
								<td>
									<label>Serie del motor:</label><br />
									<input id="seriemotor" style={{ width: '556px', height: '20px' }}   />
								</td> 
							</tr>

							<tr>
								<td>
									<label>Uso:</label><br />
									<input id="tipouso" style={{ width: '556px', height: '20px' }}   />
								</td> 
							</tr>

							<tr>
								<td>
									<label>Empresa:</label><br />
									
									<select id="empresa"style={{ width: '556px', height: '25px' }} onChange={(e) => setListaEmpresas(e.target.value)}>
										{empresas.map(item => (
											<option value={item.id}> {item.nombre}</option>))
										}</select>
								</td> 
							</tr>

							

							<tr>
								<td><label>Descripcion:</label><br /><input id="descripcion" style={{ width: '556px', height: '20px' }} /></td>
								<td><input value={props.dptoid} hidden="hidden" /></td>
							</tr>
							
							<tr>
								<td><label>GPS:</label><br /><input id="gps" style={{ width: '556px', height: '20px' }} /></td>
								 
							</tr>
							<tr>
								<td>
									<label>Guardado por:</label><br />
									<input style={{ width: '556px', height: '20px' }} value={props.name} />
								</td>

								<td><input value={props.dptoid} hidden="hidden" /></td>
							</tr>

							<tr>
								<td>
									<label>Imagen:</label><br />
									<input id="img-vehi" type="file" style={{ width: '556px'}} />
								</td>
							</tr>
							
						</table>

						<table>
							<tr>
								<th></th><td>Observaciones</td>
							</tr>

							<tr>
								<td></td>
								<td> <textarea rows="2" id="observaciones" style={{ width: '556px', resize: 'none' }}></textarea></td>
							</tr>

							<tr>
								<td></td>
								<td>
									<button className="btn btn-outline-success btn-sm"onClick={(e) => addVehiculo(e)} >
										Guardar <FaCheckCircle />
									</button>
								</td>
							</tr>
						</table>
					</div>
				</div>
			</div>
			<ToastContainer 
				progressClassName="toastProgress"
				position="top-center"
				/>

			<Modal 
					isOpen={modalIsOpenLoad}  
					onRequestClose={closeModalLoad}   
					style={customStyles}> 
					<div style={{width:'100%'}}>  
					<ThreeDots color="#0071ce" height={80} width={80} /> 
					</div>  
			</Modal>
		</div>
	);
}

export default NvaRequisicion;