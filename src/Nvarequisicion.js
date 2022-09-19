import add from './resources/add.svg';
import React, { useState, useEffect } from 'react';
import { FaCheckCircle } from 'react-icons/fa'
import axios from '../node_modules/axios';
import { NabvarRe } from './component/Navbar';
import './App.css';

function NvaRequisicion(props) {
	const [dptos, setDeptos] = useState([]);
	const [listadepartamento, setListadepartamento] = useState([]);

	useEffect(() => {
		getTipos();
	}, [])

	async function getTipos() {
		var id = "10";
		const rese = await axios.get('https://flotillas.grupopetromar.com/apirestflotilla/?id=' + id);
		setDeptos(rese.data);
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
		let fd = new FormData()
			fd.append("id", "6")
			fd.append("userid", userid)
			fd.append("observaciones", observaciones)
			fd.append("descripcion", descripcion)
			fd.append("tipo", tipoid)
			fd.append("img-vehi", img.files[0])

		const res = await axios.post('https://flotillas.grupopetromar.com/apirestflotilla/', fd);
		if (res.data == "1") {
			alert("Nuevo vehiculo agregado correctamente");

			document.getElementById("observaciones").value = "";
			document.getElementById("descripcion").value = "";
		}
		alert(res.data);
	}

	const [value, setValue] = useState([]);

	useEffect(() => {
		getUsuarios();
	}, [])

	async function getUsuarios() {
		var id = "2";
		const rese = await axios.get('https://flotillas.grupopetromar.com/apirestflotilla/?id=' + id);
		// console.log(rese.data);
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
								<td>
									<label>Guardado por:</label><br />
									<input style={{ width: '556px', height: '20px' }} value={props.name} />
								</td>

								<td><input value={props.dptoid} hidden="hidden" /></td>
							</tr>

							<tr>
								<td><label>Descripcion:</label><br /><input id="descripcion" style={{ width: '556px', height: '20px' }} /></td>
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
		</div>
	);
}

export default NvaRequisicion;