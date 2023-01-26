import React, { useState, useEffect } from 'react';
import './styles-login.css';
import axios from '../../node_modules/axios';
import logocamion from './Camion.svg';
import SideMenu from './SideMenu';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

 

	const Login = (isLoggedIna) => {
	const [usuario, setUsuario] = useState("null");
	const [userid, setUserid] = useState("null");
	const [name, setName] = useState("null");
	const [listadepartamento, setListadepartamento] = useState([]);
	const [nombredepartamento, setNombreDepartamento] = useState([]);
	const [dptos, setDeptos] = useState([]);
	const [departamento, setDepartamento] = useState("null");
	const [tipo, setTipo] = useState("null");
	const [isLoggedIn, setisLoggedIn] = useState(isLoggedIna);
	const [flotilla, setFlotilla] = useState([]);
	const [defSelected, setDefSelected] = useState([]);

	useEffect(() => {
		getDepartamentos();
		getTiposCorreo();
	}, [])

	function handleKeyPress(event) {
		if (event.key === 'Enter') {
			getImagenes(event);
		}
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
    
    const [modalIsOpenLoad, setIsOpenLoad] = React.useState(false);
	const [listac, setListaC] = useState([]); 

	async function getDepartamentos() {
		var id = "3";
		const rese = await axios.get(process.env.REACT_APP_API_URL+'?id='+ id);
		setDeptos(rese.data);
		// console.log(rese.data);
		var Data = JSON.stringify(rese.data);
		// console.log(Data[0]);
	}

	async function getImagenes(e) {
		e.preventDefault();
		var select = document.getElementById("select");
		//setListadepartamento(select.value);
		// setNombreDepartamento(select.options[select.selectedIndex].text); 
		var user = document.getElementById("form-usuario").value;
		var pass = document.getElementById("form-password").value;
		var flo = document.getElementById("flotilla").value;
		var id = "5";
		let fd = new FormData()
		fd.append("user", user)
		fd.append("pass", pass)
		fd.append("id", id);
		const res = await axios.post(process.env.REACT_APP_API_URL, fd);
		//console.log(res.data);
		if (res.data[0].res == "1") {
			setFlotilla(flo);
			
			setUsuario(res.data[0].usuario);
			setUserid(res.data[0].userid);
			setName(res.data[0].name);
			setDepartamento(res.data[0].departamento);
			setTipo(res.data[0].tipo);
			if(res.data[0].tipo == "1"){
				setDefSelected('3');
			}else{ 
				setDefSelected('6');
			}
			setisLoggedIn(false);	
		} else {
			notify("Datos de acceso incorrectos");
		}
		// console.log(res.data);
	}

	async function getTiposCorreo() {
		var id = "obtenerFlotillas";
		const rese = await axios.get(process.env.REACT_APP_API_URL+'?id='+ id);
		setListaC(rese.data);
		//console.log(rese.data);
		//var Data = JSON.stringify(rese.data);
		//console.log(Data[0]);
	}

	if (isLoggedIn) {
		return (
			<div>
				<div id="body-content">
					<div id="div-img">
						<img alt="logo" class="responsive"   src={logocamion}></img>
					</div>
					
					<div id="div-form">
						<h1>Sistema Flotilla</h1>
						<span>Usuario</span>
						<input id="form-usuario" onKeyPress={handleKeyPress} type="text" style={{ height: '30px' }} placeholder="Usuario" />
						<span>Contraseña</span>
						<input id="form-password" onKeyPress={handleKeyPress} type="password" style={{ height: '30px' }} placeholder="Contraseña" />

						<span>Seleccione</span>
						
						<select  id="flotilla"  className="form-control"  style={{width:'100%', marginTop:'5px', cursor: 'pointer'}}>
							{listac.map(item => ( 
								<option value={item.idflotilla}>{item.nombre}</option>
								))} 
						</select> 
						<button id="form-btn" style={{ backgroundColor: '#0071ce', color: 'white' }} onClick={(e) => getImagenes(e)}>INICIAR SESIÓN</button>
						{ }
					</div>
				</div>
				<ToastContainer 
				progressClassName="toastProgress"
				position="top-center"
				/>

		 
			</div>
		);
	} else {
		return (
			<div >
				<SideMenu dptos={listac} flotilla1={flotilla} dptoid={listadepartamento} departamento={nombredepartamento} usuario={usuario} userid={userid} name={name} selected={defSelected} tipo={tipo} />
			</div>
		);
	}
}

export default Login;