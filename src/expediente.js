
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

	function openModalLoad() { 
		setIsOpenLoad(true); 
	}  
	   
	function closeModalLoad() { 
		setIsOpenLoad(false); 
	}

    function notify(message){
		toast(message);
	}
    
    const [modalIsOpenLoad, setIsOpenLoad] = React.useState(false);

	const [couno, setCouno] = useState([]);
	const [codos, setCodos] = useState([]);
	const [cotres, setCotres] = useState([]);
	const [listav, setListaV] = useState([]);
	const [docsVehi, setDocsVehi] = useState([]);


	const [lista, setLista] = useState([]);
	const [value, setValue] = useState([]);
	let id = 0;
	let tipo = 0;
	useEffect(() => {
		getRequisiciones();
	}, [])


	useEffect(() => {
		getVehiculos();
	}, [])

	async function getVehiculos() {
		var id = "11";
		const res = await axios.get('https://flotillas.grupopetromar.com/apirestflotilla/?id=' + id);
		setListaV(res.data);
		//console.log(res.data);

	}


	async function addSolicita() {
		var folio = document.getElementById("folio").value;
		let fd = new FormData()
		fd.append("id", "7")
		fd.append("folio", folio)
		fd.append("tipo", "1")
		fd.append("name", document.getElementById("slc-solicita").value)
		// console.log(folio + document.getElementById("slc-solicita").value);
		const res = await axios.post('https://flotillas.grupopetromar.com/apirestflotilla/', fd);
		notify(res.data.trim());
		verRequisicion(folio);

	}
	async function addRevisa() {
		var folio = document.getElementById("folio").value;
		let fd = new FormData()
		fd.append("id", "7")
		fd.append("folio", folio)
		fd.append("tipo", "2")
		fd.append("name", document.getElementById("slc-revisa").value)
		// console.log(folio + document.getElementById("slc-revisa").value);
		const res = await axios.post('https://flotillas.grupopetromar.com/apirestflotilla/', fd);
		notify(res.data.trim());
		verRequisicion(folio);

	}
	async function addRealiza() {
		var folio = document.getElementById("folio").value;
		let fd = new FormData()
		fd.append("id", "7")
		fd.append("folio", folio)
		fd.append("tipo", "3")
		fd.append("name", document.getElementById("slc-realiza").value)
		// console.log(folio + document.getElementById("slc-realiza").value);
		const res = await axios.post('https://flotillas.grupopetromar.com/apirestflotilla/', fd);
		notify(res.data.trim());
		verRequisicion(folio);

	}
	async function addAutoriza() {
		var folio = document.getElementById("folio").value;
		let fd = new FormData()
		fd.append("id", "7")
		fd.append("folio", folio)
		fd.append("tipo", "4")
		fd.append("name", document.getElementById("slc-autoriza").value)
		// console.log(folio + document.getElementById("slc-autoriza").value);
		const res = await axios.post('https://flotillas.grupopetromar.com/apirestflotilla/', fd);
		notify(res.data.trim());
		verRequisicion(folio);

	}




	function verVehiculo(id, descripcion) {
		document.getElementById("IDvehi-input").value = descripcion;
		 setLista(descripcion);

		getDocumentos(id);
	}



	async function generarOrden(idrequisicion) {
		var folio = document.getElementById('folio').value;
		if (folio == idrequisicion) {
			if (folio != "") {
				var contador = 0;
				let fd = new FormData()
				fd.append("id", "8")
				fd.append("idrequisicion", idrequisicion)
				fd.append("dptoid", props.dptoid)

				for (var i = 0; i < document.getElementsByName("producto").length; i++) {
					if (document.getElementsByName("checkbox")[i].checked) {
						fd.append("productos[]", document.getElementsByName("producto")[i].value)
						contador++;
					}
				}

				if (contador >= 1) {
					const res = await axios.post('https://flotillas.grupopetromar.com/apirestflotilla/', fd);
					getRequisiciones();
					notify(res.data.trim());
				} else {
					notify("Seleccione Almenos Una Opción");
				}
			} else {
				notify("Seleccione una requisición");
			}
		} else {
			notify("Click en ver está requisición para generar orden de compra");
		}
	}

	async function addCotizacion(cell) {
		// console.log(cell);
		id = document.getElementById("folio").value;
		tipo = cell;
		if (id != "") {
			document.getElementById("input-cotizacion").click();
		}


		//id = cell; 
	}

	async function postFile() {
		let fd = new FormData()
		fd.append("id", "16")
		fd.append("idorden", id)
		fd.append("tipo", tipo)
		fd.append("file", document.getElementById("input-cotizacion").files[0])
		const res = await axios.post('https://flotillas.grupopetromar.com/apirestflotilla/', fd, {
			headers: {
				'Content-Type': 'multipart/form-data'
			}
		});
		//verRequisicion(id);
		notify(res.data);
		//getOrdenes();
	}



	async function getRequisiciones() {
		/* var id = "5";
		 var date = document.getElementById("input-fecha").value; 
	  
		 const res = await axios.get('https://compras.grupopetromar.com/apirest/?id='+id+'&date='+date+'&dptoid='+props.dptoid);
		 console.log(res.data); 
		 var table = document.getElementById('productstable');
		 if(res.data.length >= 1){
			 setLista(res.data); 
			 table.removeAttribute("hidden");
		 }else{
			 table.setAttribute("hidden", true);
		 }*/
	}

	function a() {

	}


	async function ActualizarStatus(id) {
		/*  GET ROW OF WHERE SELECT WAS CHANGED  */
		var rows = document.getElementsByClassName('id-orden');
		var rw;
		for (let element of rows) {
			if (element.innerHTML == id) {
				var tr = element.parentElement;
				var td = tr.getElementsByTagName('select')[0];
				rw = td.value;
			}
		}

		if (window.confirm('Quieres actualizar requisición con folio: ' + rw)) {
			let fd = new FormData()
			fd.append("id", "13")
			fd.append("idrequisicion", id)
			fd.append("nvoestado", rw)
			const res = await axios.post('https://flotillas.grupopetromar.com/apirestflotilla/', fd);
			// console.log(res.data);
			notify(res.data);
			getRequisiciones();
		}
	}


	async function verRequisicion(idd) {


		for (var i = 0; i < document.getElementsByName("producto").length; i++) {
			document.getElementsByName("producto")[i].value = "";
			document.getElementsByName("descripcion")[i].value = "";
			document.getElementsByName("unidad")[i].value = "";
			document.getElementsByName("cantidad")[i].value = "";
			document.getElementsByName("checkbox")[i].checked = false;
		}

		for (var i = 0; i < document.getElementsByName("proveedor").length; i++) {
			document.getElementsByName("proveedor")[i].value = "";
			document.getElementsByName("precio")[i].value = "";
		}
		try {
			document.getElementById("solicitar").style.visibility = "visible";
			document.getElementById("slc-solicita").disabled = false;
		} catch (Exception) { }
		document.getElementById("observaciones").value = "";


		var idrequisicion = idd;
		var id = "6";
		const res = await axios.get('https://flotillas.grupopetromar.com/apirestflotilla/?id=' + id + '&idrequisicion=' + idrequisicion);

		document.getElementById("departamento").value = res.data[0].departamento;
		document.getElementById("fechacaptura").value = res.data[0].fechacaptura;
		document.getElementById("solicita").value = res.data[0].solicita;
		//document.getElementById("fecha").value = res.data[0].fecha;
		document.getElementById("observaciones").value = res.data[0].observaciones;
		document.getElementById("folio").value = res.data[0].folio;
		setCouno(res.data[0].couno);
		setCodos(res.data[0].codos);
		setCotres(res.data[0].cotres);
		// console.log(res.data);
		// console.log(res.data[1].length);


		try {
			var tableHeaderRowCount = 2;
			var table = document.getElementById('requisicionprods');
			var rowCount = table.rows.length;
			for (var i = tableHeaderRowCount; i < rowCount; i++) {
				table.deleteRow(tableHeaderRowCount);
			}

			if (res.data[1].indexOf(1)) {

				for (var i = 0; i < res.data[1].length - 1; i++) {
					var newrow = table.lastChild.cloneNode(true);
					newrow.firstChild.innerHTML = parseFloat(newrow.firstChild.innerHTML) + 1;

					table.appendChild(newrow);
				}


				for (var i = 0; i < res.data[1].length; i++) {


					document.getElementsByName("producto")[i].value = res.data[1][i].producto;
					document.getElementsByName("descripcion")[i].value = res.data[1][i].descripcion;
					document.getElementsByName("unidad")[i].value = res.data[1][i].unidad;
					if (res.data[1][i].cantidad > 0) {
						document.getElementsByName("cantidad")[i].value = res.data[1][i].cantidad;
					}
					if (res.data[1][i].seleccionado == "1") {
						document.getElementsByName("checkbox")[i].checked = true;
					}



				}
			}
		} catch (Exception) { }



		try {
			if (res.data.indexOf(2)) {
				for (var i = 0; i < document.getElementsByName("proveedor").length; i++) {
					if (res.data[2][i].proveedor != "") {
						document.getElementsByName("proveedor")[i].value = res.data[2][i].proveedor;
						document.getElementsByName("precio")[i].value = res.data[2][i].precio;
					}
				}
			}
		} catch (Exception) { }

		try {
			var textArea = document.getElementById("autorizartextarea");
			if (res.data.indexOf(3)) {
				for (var i = 0; i < res.data[3].length; i++) {

					if (res.data[3][i].tipo == "1") {
						document.getElementById("slc-solicita").value = res.data[3][i].name;
						document.getElementById("slc-solicita").disabled = true;
						document.getElementById("solicitar").style.visibility = "hidden";
					}
					if (res.data[3][i].tipo == "2") {
						document.getElementById("slc-revisa").value = res.data[3][i].name;
						document.getElementById("slc-revisa").disabled = true;
						document.getElementById("revisar").style.visibility = "hidden";
					}
					if (res.data[3][i].tipo == "3") {
						document.getElementById("slc-realiza").value = res.data[3][i].name;
						document.getElementById("slc-realiza").disabled = true;
						document.getElementById("realizar").style.visibility = "hidden";
					}
					if (res.data[3][i].tipo == "4") {
						document.getElementById("slc-autoriza").value = res.data[3][i].name;
						document.getElementById("slc-autoriza").disabled = true;
						document.getElementById("autorizar").style.visibility = "hidden";
					}
					//	console.log(res.data[3][i].name);
				}
			}
		} catch (Exception) { }

		//console.log(res.data[3]); 
	}


	useEffect(() => {
		getUsuarios();
	}, [])


	async function getUsuarios() {
		var id = "2";
		const rese = await axios.get('https://flotillas.grupopetromar.com/apirestflotilla/?id=' + id);
		// console.log(rese.data);
		setValue(rese.data);
	}

	async function getDocumentos(IDvehiculo){
		let formData = new FormData();
            formData.append("id", "getExpediente");
			formData.append("IDvehiculo", IDvehiculo)

        return fetch('https://flotillas.grupopetromar.com/apirestflotilla/', {
            method: 'POST',
            mode: 'cors',
            body: formData
        })
		.then(response => response.json())
        .then(data =>
			setDocsVehi(data)
		)
    }


	// Dynamically create select list
	let options = [];


	return (

		<div className="container ">
			<input id='input-cotizacion' type='file' style={{ display: 'none' }} onChange={() => postFile()}></input>
			<NabvarRe titulo="Expediente" />
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
							
							<Documents />
						</div> 
				</div>

				<div style={{ width: '70%' }}>
					<form className="card p-2 mt-2 border-secondary" encType="multipart/form-data" style={{height:'340px'}} >
						<h5>Expediente</h5>
						
						<div id="display-expediente" style={{display:'flex', gap:"2vmax"}}>
							<h6>Vehiculo: {lista}</h6>
 
									<h6 id="id-displayexp" style={{fontWeight:"400"}}>{docsVehi.descripcion}</h6>
								 
						
						 
						 
						</div>

						<div style={{height: "300px", overflow: "scroll"}}>
							<table id="tbl-documentos" style={{width: "100%"}}>
								<tr>
									<th>Nombre</th>
									<th>Descripción</th>
									<th>Fecha</th>
									<th>Archivo</th>
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

									<button className="Bttn" onClick={() => verVehiculo(item.vehiculoid, item.descripcion)}
									><FaEye /> ver
									</button>
								</div>
							))}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}







export default Expediente;
