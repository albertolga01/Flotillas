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

	useEffect(() => {
		getDepartamentos();
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

	async function getDepartamentos() {
		var id = "3";
		const rese = await axios.get('https://flotillas.grupopetromar.com/apirestflotilla/?id=' + id);
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
		var id = "5";
		let fd = new FormData()
		fd.append("user", user)
		fd.append("pass", pass)
		fd.append("id", id);
		const res = await axios.post('https://flotillas.grupopetromar.com/apirestflotilla/', fd);
		//console.log(res.data);
		if (res.data[0].res == "1") {
			setisLoggedIn(false);
			setUsuario(res.data[0].usuario);
			setUserid(res.data[0].userid);
			setName(res.data[0].name);
			setDepartamento(res.data[0].departamento);
			setTipo(res.data[0].tipo);
		} else {
			notify("Datos de acceso incorrectos");
		}
		// console.log(res.data);
	}

	if (isLoggedIn) {
		return (
			<div>
				<div id="body-content">
					<div>
						<img alt="logo" class="responsive" style={{backgroundColor:'white'}} src={logocamion}></img>
					</div>
					
					<div id="div-form">
						<h1>Sistema Flotilla</h1>
						<span>Usuario</span>
						<input id="form-usuario" onKeyPress={handleKeyPress} type="text" style={{ height: '30px' }} placeholder="Usuario" />
						<span>Contraseña</span>
						<input id="form-password" onKeyPress={handleKeyPress} type="password" style={{ height: '30px' }} placeholder="Contraseña" />
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
				<SideMenu dptoid={listadepartamento} departamento={nombredepartamento} usuario={usuario} userid={userid} name={name} selected='3' tipo={tipo} />
			</div>
		);
	}
}

export default Login;