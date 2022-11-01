
import React, { useState, useEffect } from 'react';
import { FaCheckCircle, FaTrash, FaEdit } from 'react-icons/fa'
import axios from '../node_modules/axios';
import { Nabvar } from './component/Navbar';
import { Nabvar2, NabvarP } from './component/Navbar';

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

function App(props) {

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
	const [listausuario, setListausuario] = useState([]);
	const [listadepartamento, setListadepartamento] = useState([]);
	const [lista, setLista] = useState([]);
	const [listaP, setListaP] = useState([]);
	const [descripcion, setDescripcion] = useState([]);
	const [descripcionproveedor, setDescripcionProveedor] = useState([]);
	const [imagen, setImagen] = useState([]);
	const [value, setValue] = useState([]);

	useEffect(() => {
		getImagenes();
	}, [])

	useEffect(() => {
		getProveedores();
	}, [])

	useEffect(() => {
		getUsuarios();
	}, [])

	function getTipo(tipo){
		if(tipo == "1"){
			return "Administrador";
		}else{
			return "Usuario";
		}

	}

	async function getUsuarios() {
		var id = "2";
		const rese = await axios.get(process.env.REACT_APP_API_URL+'?id='+ id);
		 //console.log(rese.data);
		setValue(rese.data);
	}

	// Dynamically create select list
	let options = [];

	async function getImagenes() {
		var id = "1";
		const res = await axios.get(process.env.REACT_APP_API_URL+'?id='+ id);
		setLista(res.data);
	}

	async function getProveedores() {
		var id = "12";
		const res = await axios.get(process.env.REACT_APP_API_URL+'?id='+ id);
		// console.log(res.data);
		setListaP(res.data);
	}

	async function addUsuario(e) {
		e.preventDefault();
		let fd = new FormData()
		var newusertipo = document.getElementById("newuser-tipo");
		fd.append("id", "2")
		fd.append("name", listausuario)
		fd.append("tipo", newusertipo.options[newusertipo.selectedIndex].value)
		fd.append("user", document.getElementById("newuser-user").value)
		fd.append("password", document.getElementById("newuser-password").value)

		const res = await axios.post(process.env.REACT_APP_API_URL, fd);
		getUsuarios();
		// console.log(res.data);
		document.getElementById("newuser-user").value = "";
		document.getElementById("newuser-password").value = "";
		document.getElementById("name").value = "";
		notify(res.data.msg);
	}

	async function deleteUsuario(id) {
		if (window.confirm('¿Quieres eliminar este usuario?')) {
			let fd = new FormData()
			fd.append("id", "4")
			fd.append("idusuario", id)
			const res = await axios.post(process.env.REACT_APP_API_URL, fd);
			getUsuarios();
			// console.log(res.data);
			notify(res.data.msg);
		}
	}

	async function editUsuario(id) {
		if (window.confirm('Quieres actualizar este usuario?')) {
			let fd = new FormData()
			var uno = document.getElementById("uno" + id).checked;
			var dos = document.getElementById("dos" + id).checked;
			var tres = document.getElementById("tres" + id).checked;
			var cuatro = document.getElementById("cuatro" + id).checked;
			var cinco = document.getElementById("cinco" + id).checked;
			var seis = document.getElementById("seis" + id).checked;
			var siete = document.getElementById("siete" + id).checked;
			var ocho = document.getElementById("ocho" + id).checked;
			var nueve = document.getElementById("nueve" + id).checked;
			var diez = document.getElementById("diez" + id).checked;
			var once = document.getElementById("once" + id).checked;
			var doce = document.getElementById("doce" + id).checked;

			fd.append("id", "14")
			fd.append("idusuario", id)
			fd.append("uno", +uno)
			fd.append("dos", +dos)
			fd.append("tres", +tres)
			fd.append("cuatro", +cuatro)
			fd.append("cinco", +cinco)
			fd.append("seis", +seis)
			fd.append("siete", +siete)
			fd.append("ocho", +ocho)
			fd.append("nueve", +nueve)
			fd.append("diez", +diez)
			fd.append("once", +once)
			fd.append("doce", +doce)

			const res = await axios.post(process.env.REACT_APP_API_URL, fd);
			getUsuarios();
			// console.log(res.data);
			notify(res.data.trim());
		}
	}

	return (
		<div className="container ">
			<Nabvar2 departamento={props.departamento} dptoid={props.dptoid} />

			<div className="row p-3">
				<div className="col-md-5 p-2 " style={{ margin: 'auto' }}  >
					<form className="card p-2 mt-2 border-secondary" encType="multipart/form-data" >
						<h5>Agregar Nuevo Usuario</h5>
						
						<label>Tipo: </label>
						
						<select id="newuser-tipo">
							<option value='1'>Usuario</option>
							<option value='2'>Administrador</option>
						</select>
						<br></br>
						
						<input placeholder="Nombre" id="name" className="form-control" onChange={(e) => setListausuario(e.target.value)}></input>
						<br></br>

						<input id="newuser-user" placeholder="Usuario" className="form-control"></input>
						<br></br>

						<input id="newuser-password" placeholder="Contraseña" className="form-control" type="password "></input>
						<br></br>

						<button className="btn btn-outline-success btn-sm" onClick={(e) => addUsuario(e)} >Agregar <FaCheckCircle /></button>
					</form>
				</div>

				<div className="col-md-7 p-2" style={{ maxHeight: '39vmax', overflowY: 'scroll' }}>
					{value.map(item => (
						<div className="card p-2 mt-2 border-secondary" key={item.id}>
							<div className="card-body" style={{ padding: '0', display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
								<div>
									<b>
										<label>Nombre:</label>
									</b> 
										<label className="text-primary">&nbsp;{item.name}</label> 
										&nbsp;&nbsp; 
										<br/>
									<b>
										<label >Usuario:</label>
									</b> 
									<label className="text-primary">&nbsp;{item.usuario}</label>  
									<br/>
									<b>
										<label >Tipo:</label>
									</b> 
									<label className="text-primary">&nbsp;{getTipo(item.tipo)}</label>  
									<br></br>
								</div>
								
								<div className="d-flex flex-row"  >
									{
										/*<button className="Bttn" hiddenonClick={() => editUsuario(item.userid)} >
										<FaEdit />
									</button>*/
									}
									<label>&nbsp;&nbsp;</label>
									
									<button className="btn btn-outline-danger btn-sm "onClick={() => deleteUsuario(item.userid)} >
										<FaTrash />
									</button>
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}

export default App;