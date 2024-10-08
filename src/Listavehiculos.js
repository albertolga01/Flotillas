 
import React,{useState, useEffect} from 'react';  
import  {FaCheckCircle, FaTrash, FaEdit, FaRedditAlien, FaEye} from 'react-icons/fa'
import axios from 'axios'; 
import {NabvarRe} from './component/Navbar'; 
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
import './App.css'; 
import formatNumber from './formatNumber';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";  
import {ThreeDots } from  'react-loader-spinner'
import { BsArrowRepeat, BsEnvelopeFill, BsFillPersonPlusFill, BsXCircleFill} from "react-icons/bs";
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

function Listavehiculos(props) {

	const columns = [
		{
			name: 'Folio',  
			cell: row => row.vehiculoid,
			sortable: true,
			maxWidth: "5px", 
			width: "60px",
		},
		{
			name: '',  
			cell: (row) => {
					return (
						<td hidden>
						{row.descripcion} 
						</td>
					)
				},
				width: "10px",
		},
		{
			name: 'Vehículo',  
			cell: (row) => {
				return (
					/* <input
					defaultValue={row.descripcion}
					onChange={(e)=> {
					document.getElementById("descripcionVehiculo"+row.vehiculoid).value(e.target.value)}}
					 id={"descripcionVehiculo"+row.vehiculoid} ></input>*/
					<><input 
					defaultValue={row.descripcion}
					id={"descripcionVehiculo"+row.vehiculoid}></input>&nbsp;&nbsp;{row.numvehiculo}
					 </>

				)
			},
			width: "250px",
			wrap: true,
		},
		{
			name: 'Modelo',  
			cell: row => row.modelo,
			sortable: true,
			width: "80px",
			wrap: true,
			
		}, 
		{  
			name: 'Responsable',  
			cell: (row) => {
				return (
					/*<><input 
					value={row.responsable}
					onChange={(e)=> {
					document.getElementById("responsable"+row.vehiculoid).value(e.target.value)}}
					id={"responsable"+row.vehiculoid} ></input></>*/
					
					<><input 
					style={{width:'100%'}}
					defaultValue={row.responsable}
					id={"responsable"+row.vehiculoid}></input>
					 </>
				)
			},
			width: "120px",
			wrap: true,
		},
		{  
			name: '',  
			cell: (row) => {
				return (
					<td hidden>
                    {row.responsable} 
                	</td>
				)
			},
			width: "10px",
		},
		{  
			name: 'Serie Vehículo',  
			cell: row => row.serievehiculo,
			sortable: true,
			width: "160px",
			wrap: true,
		},
		{  
			name: 'Serie Motor',  
			cell: row => row.seriemotor,
			sortable: true,
			width: "140px",
			wrap: true,
		},
		{
			name: '',  
			cell: (row) => {
					return (
						<td hidden>
						{row.tipouso} 
						</td>
					)
				},
				width: "10px",
		},
		{  
			name: 'Tipo Uso',  
			cell: (row) => {
				return (
					<><input 
					value={row.tipouso}
					onChange={(e)=> {
					document.getElementById("tipouso"+row.vehiculoid).value(e.target.value)}}
					  id={"tipouso"+row.vehiculoid}></input></>
					 /*
					   <><input 
					   style={{width:'85%'}}
					defaultValue={row.tipouso}
					id={"tipouso"+row.vehiculoid}></input>
					 </>*/
				)
			},
			width: "185px",
			wrap: true,
		},
		{  
			name: 'Empresa',  
			cell: (row) => {
				return (
					<><select id={"empresa"+row.vehiculoid} style={{ width: '200px', height: '25px' }} onChange={(e) => setListaEmpresas(e.target.value)}>
					<option value={row.idempresa}> {row.empresa}</option>
					{empresas.map(row => (
						<option value={row.id}> {row.nombre}</option>))
					}</select></>
				)
			},
			width: "210px",
			wrap: true,
		},
		{  
			name: 'Placa',  
			cell: row => row.placas,
			sortable: true,
			width: "70px",
			wrap: true,
		},
		{
			name: '',  
			cell: (row) => {
					return (
						<td hidden>
						{row.gps} 
						</td>
					)
				},
				width: "10px",
		},
		{
			name: '',  
			cell: (row) => {
					return (
						<td hidden>
						{row.pernota} 
						</td>
					)
				},
				width: "10px",
		},
		{  
			name: 'GPS',  
			cell: (row) => {
				return (
				/*	<><input 
					value={row.gps}
					onChange={(e)=> {
					document.getElementById("gps"+row.vehiculoid).value(e.target.value)}}
					 id={"gps"+row.vehiculoid}  style={{ width: '60px'}}></input></>
					 */
					 <><input 
					defaultValue={row.gps} style={{ width: '60px'}}
					id={"gps"+row.vehiculoid}></input>
					 </>
				)
			},
			width: "70px",
			wrap: true,
		},
		{  
			name: 'Número',  
			cell: (row) => {
				return (
					/*<><input 
					value={row.numvehiculo}
					onChange={(e)=> {
					document.getElementById("numerovehiculo"+row.vehiculoid).value(e.target.value)}
					}
					 id={"numerovehiculo"+row.vehiculoid} style={{ width: '60px' }}></input></>
					 */
					 
					 <><input 
					 
					 defaultValue={row.numvehiculo} style={{ width: '70%'}}
					 id={"numerovehiculo"+row.vehiculoid}></input>
					  </>
				)
			},
			width: "145px",
			wrap: true,
		},
		{  
			name: 'Pernota',  
			cell: (row) => {
				return (
				/*	<><input  
					value={row.pernota}
					onChange={(e)=> {
					document.getElementById("pernota"+row.vehiculoid).value(e.target.value)}}
					id={"pernota"+row.vehiculoid} style={{minWidth:'100%', height:'31px' }}></input></>
					*/
					<><input 
					defaultValue={row.pernota} style={{ width: '100%'}}
					id={"pernota"+row.vehiculoid}></input>
					 </>
				) 
			},
			width: "145px",
		},
		{  
			name: 'Actualizar',
			cell: (row) => {
				return (
					<button  className='btn btn-outline-success btn-sm' onClick={() => actualizarVehiculo(row.vehiculoid)} style={{minWidth:'100%' }}><BsArrowRepeat /></button>
				)
			},
			width: "80px",
			wrap: true,
		},
		{  
			name: 'Correo',  
			cell: (row) => {
				return (
					<button  className='btn btn-outline-success btn-sm' onClick={() => envioCorreo(row.vehiculoid)}  style={{minWidth:'100%' }}><BsEnvelopeFill /></button>
				)
			},
			width: "70px",
			wrap: true,
		},
		{  
			name: 'Usuario',  
			cell: (row) => {
				return (
					<button  className='btn btn-outline-success btn-sm' onClick={() => envioUsuario(row.vehiculoid)}  style={{minWidth:'100%' }}><BsFillPersonPlusFill /></button>
				)
			},
			width: "70px",
			wrap: true,
		},
		{  
			name: 'Notificar',  
			cell: (row) => {
				return (
					(row.notificar == "1")?
					< input defaultChecked type="checkbox" id={"notificar"+row.vehiculoid} style={{minWidth:'50px'}}></input>
					:
					< input  type="checkbox" id={"notificar"+row.vehiculoid} style={{minWidth:'50px'}}></input>
					
					)
			},
			width: "80px",
			wrap: true,
		},
		{  
			name: 'Dictamenes',  
			cell: (row) => {
				return (
					(row.dictamen == "1")?
						< input defaultChecked type="checkbox" id={"dictamen"+row.vehiculoid} style={{minWidth:'50px'}}></input>
						:
						< input  type="checkbox" id={"dictamen"+row.vehiculoid} style={{minWidth:'50px'}}></input>
					
					)
			},
			width: "70px",
			wrap: true,
		},
		{
			name: 'Borrar',   
			cell: (row) => {
				return (
					(props.tipo == "1") ? 
							<td><button className='btn btn-outline-danger btn-sm' onClick={() => bajaVehiculo(row.vehiculoid)} style={{minWidth:'100%' }}><BsXCircleFill /></button></td>
							:<></>
								
				)
			},
			width: "70px",
			wrap: true,
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


	function openModalLoad() { 
		setIsOpenLoad(true); 
	}  
	   
	function closeModalLoad() { 
		setIsOpenLoad(false); 
	}

    function notify(message){
		toast(message);
	}
	const [empresas, setEmpresas] = useState([]);
	const [listaEmpresas, setListaEmpresas] = useState([]);

    const [modalIsOpenLoad, setIsOpenLoad] = useState(false);

	const [listav, setListaV] = useState([]);
	const [value, setValue] = useState([]);
	const [loading, setLoading] = useState(true);
	
	const [listaver, setListaVer] = useState([]);
	const [listaUsuario, setListaUsuario] = useState([]);
	useEffect(() => {
		getVehiculos();
		getEmpresas();
		getTiposCorreo();
		getUsuarios();
		
	}, [])

	

	async function getEmpresas() {
		var id = "getEmpresas";
		const rese = await axios.get(process.env.REACT_APP_API_URL+'?id='+ id);
		setEmpresas(rese.data);
		//console.log(rese.data);
		//var Data = JSON.stringify(rese.data);
		//console.log(Data[0]);
	}


	async function bajaVehiculo(vehiculoid){
		if(window.confirm('¿Desea dar de bajar el vehículo?')){ 
			let fd = new FormData() 
			fd.append("id", "bajaVehiculo") 
			fd.append("vehiculoid", vehiculoid)  
			const res = await axios.post(process.env.REACT_APP_API_URL, fd);  
			notify(res.data.trim());
			setLista(res.data);
			getVehiculos();
		}
	
		
	}
	 

/*
	async function addRefaccion() {
		
		var vehiculoid = document.getElementById("vehiculoid").value;
		var fechacompra = document.getElementById("fechacompra").value;
		var refaccion = document.getElementById("refaccion").value;
		var descripcion = document.getElementById("descripcion").value;
		var precio = document.getElementById("precio").value;
		var proveedor = document.getElementById("proveedor").value;
		var documentorefaccion = document.getElementById("documentorefaccion"); 

		
		let fd = new FormData()
			fd.append("id", "addRefaccion")
			fd.append("vehiculoid", vehiculoid)
			fd.append("fechacompra", fechacompra) 
			fd.append("refaccion", refaccion)
			fd.append("descripcion", descripcion)
			fd.append("precio", precio)
			fd.append("proveedor", proveedor)
			fd.append("documentorefaccion", documentorefaccion.files[0])

			openModalLoad();
		const res = await axios.post(process.env.REACT_APP_API_URL, fd);
		closeModalLoad();
		notify(res.data.trim());
		 
		if(res.data.trim() == "Refacción agregada correctamente"){
			closeModal();
  getRefacciones()

		}
		getRefacciones();
	}

 */

	async function getVehiculos() {
		var id = "getVehiculos";
		openModalLoad();
		const res = await axios.get(process.env.REACT_APP_API_URL+'?id='+id+'&idflotilla='+props.flotilla+'&tipo='+props.tipo+'&userid='+props.userid);
		setListaV(res.data);
		closeModalLoad();
		console.log(res.data);
		
	} 


	let subtitle;
	const [modalIsOpen, setIsOpen] = React.useState(false);
  
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

	async function getUsuarios() {
		var id = "2";
		const rese = await axios.get(process.env.REACT_APP_API_URL+'?id='+ id);
		 //console.log(rese.data);
		setValue(rese.data);
	}


	function format(todayy){
		var today = new Date(todayy);
		var dd = String(today.getDate()).padStart(2, '0');
	  var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
	  var yyyy = today.getFullYear();
	  
	  today = dd + '/' + mm + '/' + yyyy;
	   return today;
		}
	
  const [lista, setLista] =  useState([]);  
  
 
  async function getRefacciones(){
	var id = "getRefacciones";
	openModalLoad();
	const res = await axios.get(process.env.REACT_APP_API_URL+'?id='+id);
 	closeModalLoad();
	setLista(res.data);
	
	console.log(res.data);

  }
  
  async function getRefaccionesDia(){
	   
	var id = "getRefaccionesDia";
	var fecha = document.getElementById("input-fecha").value;
	openModalLoad();
	const res = await axios.get(process.env.REACT_APP_API_URL+'?id='+id+'&fecha='+fecha);
	closeModalLoad();
    setLista(res.data);
	
	console.log(res.data);

  }

  let subtitle1;
  const [modalIsOpen1, setIsOpen1] = React.useState(false);
  const [modalIsOpenUsuario, setIsOpenUsuario] = React.useState(false);
  const [folioVehiculo1, setFolioVehiculo1] = useState([]); 
  const [listac, setListaC] = useState([]); 


  function openModal1() {
	setIsOpen1(true);
  }
  function openModalUsuario() {
	setIsOpenUsuario(true);
  }

  function afterOpenModal() {
	// references are now sync'd and can be accessed.
	//subtitle.style.color = '#f00';
  }

  function closeModal1() {
	setIsOpen1(false);
  }
  function closeModalUsuario() {
	setIsOpenUsuario(false);
  }

  function envioCorreo(folio){
	openModal1();

	setFolioVehiculo1(folio);
	 obtenerCorreos(folio);
}

function envioUsuario(folio){
	openModalUsuario();

	setFolioVehiculo1(folio);
	 obtenerUsuariosVehiculo(folio);
}
 
  // Dynamically create select list
  let options = [];

  async function actualizarVehiculo(folio){
	let notificar = 0;
	if(document.getElementById("notificar"+folio).checked){
		 notificar = 1;
	} 
	let dictamen = 0;
	if(document.getElementById("dictamen"+folio).checked){
		dictamen = 1;
	} 
	if(window.confirm('Actualizar los campos del vehiculo con folio: ' + folio)){ 
		let fd = new FormData() 
		fd.append("id", "actualizarVehiculo")
		fd.append("vehiculoid", folio) 
		fd.append("responsable", document.getElementById("responsable"+folio).value)
		fd.append("tipouso", document.getElementById("tipouso"+folio).value)
		fd.append("empresa", document.getElementById("empresa"+folio).value)
		fd.append("pernota", document.getElementById("pernota"+folio).value)
		fd.append("numerovehiculo", document.getElementById("numerovehiculo"+folio).value)
		fd.append("gps", document.getElementById("gps"+folio).value)
		fd.append("notificar", notificar)
		fd.append("dictamen", dictamen)
		fd.append("descripcion", document.getElementById("descripcionVehiculo"+folio).value)
		const res = await axios.post(process.env.REACT_APP_API_URL, fd); 
		console.log("actualizarVehiculo: " +res.data);
		notify(res.data.trim());
		getVehiculos();
	}

}

async function EnviarCorreo(folio){
	var correo = document.getElementById("correo").value;
	 
	openModalLoad();
		let fd = new FormData() 
		fd.append("id", "agregarCorreo")
		fd.append("vehiculoid", folioVehiculo1) 
		fd.append("correo", correo)
		fd.append("tipocorreo", document.getElementById("tipocorreo").value)
		 
		const res = await axios.post(process.env.REACT_APP_API_URL, fd); 
		console.log("EnviarCorreo: " +res.data);
		closeModalLoad();
		notify(res.data.trim()); 
		obtenerCorreos(folioVehiculo1);

}

async function obtenerCorreos(folio){ 
 setListaVer([]);
		let fd = new FormData() 
		fd.append("id", "obtenerCorreos")
		fd.append("vehiculoid", folio)   
		const res = await axios.post(process.env.REACT_APP_API_URL, fd); 
		console.log("EnviarCorreo: " +res.data);
		setListaVer(res.data);
		//notify(res.data.trim()); 

}

async function eliminarUsuarioVehiculo(folio, vehiculoid){

	var userid = document.getElementById("useridusuario").value;

	if(window.confirm('Desea eliminar el usuario del vehiculo ' + folio)){ 
		openModalLoad();
		let fd = new FormData() 
		fd.append("id", "eliminarUsuarioVehiculo")
		fd.append("vehiculoid", vehiculoid)
		fd.append("folio", folio)
		fd.append("userid", userid) 
		const res = await axios.post(process.env.REACT_APP_API_URL, fd);  
		closeModalLoad();
		notify(res.data.trim());
		obtenerUsuariosVehiculo(vehiculoid);
	}
}


async function EnviarUsuarioVehiculo(folio){
	var userid = document.getElementById("useridusuario").value;
	 
	openModalLoad();
		let fd = new FormData() 
		fd.append("id", "agregarUsuarioVehiculo")
		fd.append("vehiculoid", folioVehiculo1) 
		fd.append("userid", userid) 
		 
		const res = await axios.post(process.env.REACT_APP_API_URL, fd); 
		console.log("EnviarCorreo: " +res.data);
		closeModalLoad();
		notify(res.data.trim()); 
		obtenerUsuariosVehiculo(folioVehiculo1);

}

async function obtenerUsuariosVehiculo(folio){ 
 setListaUsuario([]);
		let fd = new FormData() 
		fd.append("id", "obtenerUsuariosVehiculo")
		fd.append("vehiculoid", folio)   
		const res = await axios.post(process.env.REACT_APP_API_URL, fd); 
		console.log("EnviarCorreo: " +res.data);
		setListaUsuario(res.data);
		//notify(res.data.trim()); 

}

async function getTiposCorreo() {
	var id = "obtenerTiposCorreos";
	const rese = await axios.get(process.env.REACT_APP_API_URL+'?id='+ id);
	setListaC(rese.data);
	//console.log(rese.data);
	//var Data = JSON.stringify(rese.data);
	//console.log(Data[0]);
}
 

  return (
  
    <div className="container ">
		<div className='titulos'>
			<NabvarRe departamento={props.departamento} dptoid={props.dptoid} titulo="Vehículos"/>  
		</div>
     
  
<div style={{display:'flex', flexDirection:'row', width:'100%'}}>
 
	 
<div style={{width:'100%'}} align="right"> 
		  
	  </div>
	  </div>
 <div  style={{maxHeight:'43vmax', overflowY: 'scroll', width:'100%', marginTop:'10px'}}>
 		<DataTableExtensions
			columns={columns}
			data={listav}
			print={true}
			export={true}
			filterPlaceholder="Filtrar" 
			>
				<DataTable
					columns={columns}
					data={listav}
					fixedHeader={true}
					fixedHeaderScrollHeight={'100%'}
					pagination
					customStyles={tableCustomStyles}
					highlightOnHover={true}
					noDataComponent={"No se encontró información"}
					loading={loading}
					/>
		</DataTableExtensions>
                <table id="productstable"  style={{width:'100%'}} hidden > 
                    <tr style={{borderWidth:'1px'}}>
                        <th class="header">Folio</th>
                        <th class="header">Vehículo</th>
                        <th class="header">Modelo</th> 
                        <th class="header">Responsable</th> 
                        <th class="header">Serie Vehículo</th>
                        <th class="header">Serie Motor</th>
                        <th class="header">Tipo Uso</th> 
                        <th class="header">Empresa</th>
                        <th class="header">Placa</th>
                        <th class="header">Gps</th>
                        <th class="header">Número</th> 
                        <th class="header">PerNota</th>
						<th class="header">Actualizar</th>
						<th class="header">Correo</th>
						<th class="header">Usuario</th>
						<th class="header">Notificar</th>
						<th class="header">Dictamenes</th>
						<th class="header">Baja</th>

                    </tr>

                    {  
                    listav.map(item => ( 
                     <tr id="tabletr" style={{border: '2px solid #ABB2B9 !important', fontSize:'12px'}}>
                    <td style={{border: '2px solid rgb(171,178,185)'}} className='id-orden' align='center'>{item.vehiculoid }</td>
                    {/*<td style={{minWidth:'180px',border: '2px solid rgb(171,178,185) '}}>{item.descripcion + " " + item.numvehiculo }</td>*/}
                    <td style={{minWidth:'180px',border: '2px solid rgb(171,178,185) '}}><textarea type="text"  rows="2" cols="50" defaultValue={item.descripcion} id={"descripcionVehiculo"+item.vehiculoid} ></textarea>{item.numvehiculo}</td>
                    <td  style={{textAlign:'center',border: '2px solid rgb(171,178,185)'}}>{item.modelo}</td>
                    <td style={{border: '2px solid rgb(171,178,185)'}}><input defaultValue={item.responsable} id={"responsable"+item.vehiculoid} ></input></td>
                    <td style={{border: '2px solid rgb(171,178,185)'}}  align='center'>{item.serievehiculo}</td>
                    <td style={{border: '2px solid rgb(171,178,185)'}} align='center'>{item.seriemotor}</td>
                    <td style={{border: '2px solid rgb(171,178,185)'}}><input defaultValue={item.tipouso} id={"tipouso"+item.vehiculoid}  ></input></td>
                    <td style={{border: '2px solid rgb(171,178,185)'}}><select id={"empresa"+item.vehiculoid} style={{ width: '200px', height: '25px' }} onChange={(e) => setListaEmpresas(e.target.value)}>
										<option value={item.idempresa}> {item.empresa}</option>
										{empresas.map(item => (
											<option value={item.id}> {item.nombre}</option>))
										}</select></td>
                    <td style={{border: '2px solid rgb(171,178,185)'}}>{item.placas}</td>
                    <td style={{border: '2px solid rgb(171,178,185)'}}><input defaultValue={item.gps} id={"gps"+item.vehiculoid}  style={{ width: '60px'}}></input></td>
                    <td style={{border: '2px solid rgb(171,178,185)'}}><input defaultValue={item.numvehiculo} id={"numerovehiculo"+item.vehiculoid} style={{ width: '60px' }}></input></td>
                    {/*<td><a target="_blank" rel="noreferrer" href={"https://flotillas.grupopetromar.com/apirestflotilla/Vehiculos/" + item.icon}>{item.icon}</a></td>
					*/}<td style={{border: '2px solid rgb(171,178,185)'}}><input defaultValue={item.pernota} id={"pernota"+item.vehiculoid} style={{minWidth:'100%', height:'31px' }}></input></td>
					<td><button  className='btn btn-outline-success btn-sm' onClick={() => actualizarVehiculo(item.vehiculoid)} style={{minWidth:'100%' }}><BsArrowRepeat /></button></td>
					<td><button  className='btn btn-outline-success btn-sm' onClick={() => envioCorreo(item.vehiculoid)}  style={{minWidth:'100%' }}><BsEnvelopeFill /></button></td>
					<td><button  className='btn btn-outline-success btn-sm' onClick={() => envioUsuario(item.vehiculoid)}  style={{minWidth:'100%' }}><BsFillPersonPlusFill /></button></td>
					<td>
						{(item.notificar == "1")?
						< input defaultChecked type="checkbox" id={"notificar"+item.vehiculoid} style={{minWidth:'50px'}}></input>
						:
						< input  type="checkbox" id={"notificar"+item.vehiculoid} style={{minWidth:'50px'}}></input>
						}
						
					</td>
					<td>
					{(item.dictamen == "1")?
						< input defaultChecked type="checkbox" id={"dictamen"+item.vehiculoid} style={{minWidth:'50px'}}></input>
						:
						< input  type="checkbox" id={"dictamen"+item.vehiculoid} style={{minWidth:'50px'}}></input>
						}
						</td>

                    
                </tr>
                
        ))}	
                        <input id='input-cotizacion' type='file' style={{display:'none'}}></input>
                </table> 


	 </div>
 
  
<br></br>
<br></br>

				<Modal
        isOpen={modalIsOpen1}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal1}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <h2  style={{color:'black', fontSize:'32px'}}>Agregar Correo</h2>
		<tr >  
							<th class="header">Correo</th>  
							<th class="header">Tipo</th>  
			
							  
						</tr>
			{ listaver.map(item => ( 
							 
							 <tr id="tabletr" style={{  fontSize:'14px', border: '2px solid #ABB2B9'}}>
								  
								 
								 <td style={{paddingRight:'15px'}}  >{item.correo}</td>
								 <td >{item.tipo}</td>
								 
							 </tr> 
							 ))}	
		<div>Correo</div>
        <input id="correo" type="text" style={{width:'100%', marginTop:'5px'}}/>
	 
				<select  id="tipocorreo"  className="form-control"  style={{width:'100%', marginTop:'5px', cursor: 'pointer'}}>
							{listac.map(item => ( 
								<option value={item.folio}>{item.tipo}</option>
					))} 
				</select> 
        
<br></br>
<br></br>
		<button onClick={closeModal1} class="btn btn-outline-danger btn-sm ">Cancelar</button> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 
		&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
		&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<button onClick={() => EnviarCorreo()} class="btn btn-outline-success btn-sm" >Agregar</button>
     </Modal>
 

	 <Modal
        isOpen={modalIsOpenUsuario}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModalUsuario}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <h2  style={{color:'black', fontSize:'32px'}}>Agregar Usuario</h2>
		<tr>
			<th class="header">Folio</th>   
			<th class="header">Usuario</th>   
			<th class="header">Eliminar</th>   
		</tr>
			{ listaUsuario.map(item => ( 
							 
							 <tr id="tabletr" style={{  fontSize:'14px', border: '2px solid #ABB2B9'}}>
								  
								  
								 <td >{item.folio}</td>
								 <td >{item.name + " (" + item.usuario+")"}</td>
								 <td><button id="bttn-eliminar-usuario" style={{width:'100%'}} className='btn btn-outline-danger btn-sm' onClick={() => eliminarUsuarioVehiculo(item.folio, item.vehiculoid)}><BsXCircleFill /></button> </td>
							 </tr> 
							 ))}
			    
		<div>Usuario</div> 
	 
				<select  id="useridusuario"  className="form-control"  style={{width:'100%', marginTop:'5px', cursor: 'pointer'}}>
							{value.map(item => ( 
								<option value={item.userid}>{item.name + " (" + item.usuario+")"}</option>
					))} 
				</select> 
				
		<br></br>
		<br></br>
				<button onClick={closeModalUsuario} class="btn btn-outline-danger btn-sm ">Cancelar</button> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 
				&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
				&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<button onClick={() => EnviarUsuarioVehiculo()} class="btn btn-outline-success btn-sm" >Agregar</button>
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



 



export default Listavehiculos;
