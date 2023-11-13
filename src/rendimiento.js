 
import React,{useState, useEffect, useRef} from 'react';  
import axios from '../node_modules/axios'; 
import {NabvarRe} from './component/Navbar'; 
import Modal from 'react-modal';
import './App.css'; 
import formatNumber from './formatNumber';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";  
import {ThreeDots } from  'react-loader-spinner'
import { BsXCircleFill, BsPencilSquare, BsArrowRepeat} from "react-icons/bs";
import {FiCheck} from "react-icons/fi";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DataTableExtensions from "react-data-table-component-extensions";
import 'react-data-table-component-extensions/dist/index.css';
//import DataTable from 'react-data-table-component';
import { useDownloadExcel } from 'react-export-table-to-excel';
import DataTable from 'react-data-table-component-footer';


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

  const customStylesEditarCarga = {
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
function Rendimiento(props) {

	const [total, setTotal] = useState(0); 
	const [totalLitros, setTotalLitros] = useState(0); 
 
	
	const columns = [
		{
			name: 'Folio',  
			selector: (row) => row.folio,
			sortable: true, 
			width: "50px"
		},
		{
			name: 'Vehiculo',  
			selector: row => row.vehiculo,
			sortable: true,
			width: "210px",
			wrap: true,
		},
		{
			name: 'Fecha Carga',  
			selector: row => row.fechacarga,
			sortable: true,
			width: "90px",
		},
		{
			name: 'Litros',   
			selector: (row) => row.litros,
			width: "65px",
			wrap: true,
		}, 
		{
			name: 'Importe',  
			selector: (row) => formatNumber(row.importe),
			width: "80px",
			wrap: true,
		}, 
		{
			name: 'KM Inicial',
			selector: (row) => formatN(row.kilometraje),
			width: "80px",
			wrap: true,
		}, 
		{
			name: 'KM Final', 
			selector: row => formatN(row.kilometrajefinal),
			sortable: true,
			width: "65px",
		},
		{
			name: 'Ticket',   
			selector: row => row.ticket,
			sortable: true,
			width: "65px",
			
		},
		{
			name: 'Rendimiento',   
			selector: row => formatN(((row.kilometrajefinal - row.kilometraje)/ row.litros)) + " Kms / Litro",
			sortable: true,
			width: "160px",
		},
		{
			name: 'Editar',   
			cell: (row) => {
				return (
					(props.tipo == "1")?
								<td>
								<button id="bttn-editar-rendimiento" style={{width:'150%'}} className='btn btn-outline-success btn-sm' onClick={() => openModalEditar(row.vehiculoid, row.folio, row.fechacarga, row.importe, row.kilometraje, row.litros, folio)}><BsArrowRepeat /></button>
								</td>                                        

									:
									<td></td>
				)
			},
			width: "65px",
		},
		{
			name: 'Eliminar',   
			cell: (row) => {
				return (
					(props.tipo == "1")?
					<td>
					<button id="bttn-eliminar-rendimiento" style={{width:'150%'}} className='btn btn-outline-danger btn-sm' onClick={() => eliminarCarga(row.folio)}><BsXCircleFill /></button>
					</td>                                        

						:
						<td></td>
				)
			},
			width: "65px",
		},
		{
			name: 'Revisado',   
			cell: (row) => {
				return (
					(props.tipo == "1")?
					<td>
					<button id="bttn-revisado-rendimiento" style={{width:'110%'}} className='btn btn-outline-success btn-sm' onClick={() => ConfirmarCarga(row.folio)}>Confirmar</button>
					</td>                                        

						:
						<td></td>
				)
			},
			width: "85px",
		},
	];

	const conditionalRowStyles = [ 
		{ 
		 when: row => row.revisado > 0, 
		 style: { 
			 backgroundColor: 'rgba(0, 160, 0, 0.8)', 
			 color: 'white', 
			 '&:hover': { 
			  cursor: 'not-allowed',
			 }, 

		 },
		} 
	   ];


	const footer = {
		 vehiculo:"",
		 fechacarga:"",
		 litros: totalLitros
	  };

	const columns1 = [
		{
			name: 'Folio',  
			selector: row => row.folio,
			sortable: true,
			maxWidth: "5px", 
			width: "60px"
		},
		{
			name: 'Vehículo',  
			selector: row => row.vehiculo + " " + row.modelo +" "+ row.numvehiculo,
			sortable: true,
			width: "210px",
			wrap: true,
		},
		{
			name: 'Modelo',  
			selector: row => row.modelo,
			sortable: true,
		}, 
		{
			name: 'Uso',  
			selector: row => row.tipouso,
			sortable: true,
		}, 
		{
			name: 'Fecha',  
			selector: row => row.fecha,
			sortable: true,
		}, 
		{
			name: 'Inicial',  
			selector: row => row.kilometrajeinicial,
			sortable: true,
		}, 
		{
			name: 'Final',  
			selector: row => row.kilometrajefinal,
			sortable: true,
		}, 
		{
			name: 'Total',  
			selector: row => formatN(row.total),
			sortable: true,
		}, 
		{
			name: 'Litros',  
			selector: row => formatN(row.litros),
			sortable: true,
		}, 
		{
			name: 'Importe',  
			selector: row => formatNumber(row.importe),
			sortable: true,
		}, 
		{
			name: 'Rendimiento',  
			selector: row => row.rendimiento,
			sortable: true,
		}, 
		{
			name: 'Costo KM',  
			selector: row => row.costokm + " Kms / Litro",
			sortable: true,
		}, 
		{ 
			name: 'Eliminar',   
			cell: (row) => {
				return (
					(props.tipo == "1")?
					<td>
					<button id="bttn-eliminar-rendimiento" style={{width:'200%'}} className='btn btn-outline-danger btn-sm' onClick={() => eliminarRendimiento(row.folio)}><BsXCircleFill /></button>
					</td>                                        

						:
						<td></td>
				)
			}
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
			
			const [modalIsOpenLoad, setIsOpenLoad] = React.useState(false);
		
			
			const [listaver, setListaVer] = useState([]);
			useEffect(() => { 
			}, [])

			function isLastDay(dt) {
				var test = new Date(dt.getTime()),
					month = test.getMonth();
			
				test.setDate(test.getDate() + 1);
				return test.getMonth() !== month;
			}


			const tableRef = useRef(null);
			const { onDownload } = useDownloadExcel({
				currentTableRef: tableRef.current,
				filename: 'Rendimiento',
				sheet: 'Rendimiento'
			})

			async function addCarga() {
				
				var vehiculoid = document.getElementById("vehiculoid").value;
				var fechacarga = document.getElementById("fechacarga").value;
				var kilometraje = document.getElementById("kilometraje").value;
				var kilometrajefinal = document.getElementById("kilometrajefinal").value;
				var litros = document.getElementById("litros").value;
				var importe = document.getElementById("importe").value;
				var ticket = document.getElementById("ticket").value;
				
				let fd = new FormData()
					fd.append("id", "addCarga")
					fd.append("vehiculoid", vehiculoid)
					fd.append("fechacarga", fechacarga) 
					fd.append("kilometraje", kilometraje)
					fd.append("kilometrajefinal", kilometrajefinal)
					fd.append("litros", litros)
					fd.append("importe", importe)
					fd.append("ticket", ticket)

				const res = await axios.post(process.env.REACT_APP_API_URL, fd);
				
				notify(res.data.trim());
				if(res.data.trim() == "Carga agregada correctamente"){
					closeModal();
		getCargas()
		getRendimientoMensual()

				}
			}


			async function addCargaRendimiento() {

				var fechafinmes = document.getElementById("fechafinmes").value;
					var test = new Date(fechafinmes);
					test.setDate(test.getDate() + 1);
					//console.log(test);
					let ultimoDia = test.getDate() == new Date(test.getFullYear(),test.getMonth()+1,0).getDate();
					if(ultimoDia == false){
						notify("Ingrese el último día del mes para continuar");
						return;
					}
				
				
				var vehiculoidfinmes = document.getElementById("vehiculoidfinmes").value;
				
				var kilometrajefinmes = document.getElementById("kilometrajefinmes").value; 
				
				let fd = new FormData()
					fd.append("id", "addCargaRendimiento")
					fd.append("vehiculoid", vehiculoidfinmes)
					fd.append("fechafinmes", fechafinmes) 
					fd.append("kilometrajefinmes", kilometrajefinmes) 

				const res = await axios.post(process.env.REACT_APP_API_URL, fd);
				
				notify(res.data.trim());
				if(res.data.trim() == "Carga agregada correctamente"){
					closeModal();
					getCargas();
					getRendimientoMensual();
				}
				
			}

			async function editarCarga(){
				if(!props.userid == "1"){
					notify("No tiene permiso para editar registros");
				}else{
						let fd = new FormData() 
						fd.append("id", "editarCarga")
						fd.append("idcarga", folio) 
						fd.append("vehiculoid", vehiculo) 
						fd.append("importe", (document.getElementById("importeE").value)) 
						fd.append("kilometraje", document.getElementById("kilometrajeE").value) 
						fd.append("litros", document.getElementById("litrosE").value) 
						const res = await axios.post(process.env.REACT_APP_API_URL, fd); 
						//console.log("editarCarga: " +res.data);
						notify(res.data.trim());
						getCargas(); 
						closeModalEditar();
						setfolio([]);
						setVehiculo([]);
				}
			}

			let subtitle;
			const [modalIsOpen, setIsOpen] = React.useState(false);
			const [modalIsOpenEditar, setIsOpenEditar] = React.useState(false);
			const [vehiculo, setVehiculo] = React.useState(false);
			const [folio, setfolio] = React.useState([]);
			const [fechacarga, setfechacarga] = React.useState([]);
			const [litros, setlitros] = React.useState([]);
			const [kilometraje, setkilometraje] = React.useState([]);
			const [importe, setimporte] = React.useState([]);


			function openModalEditar(vehiculo,folio, fechacarga,importe,kilometraje,litros) { 
				setVehiculo(vehiculo);
				setfolio(folio);
				setfechacarga(fechacarga);
				setimporte(importe);
				setkilometraje(kilometraje);
				setlitros(litros);
				setIsOpenEditar(true); 
			}  
			
			function closeModalEditar() { 
				setIsOpenEditar(false); 
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


			const [modalIsOpenNv, setIsOpenNv] = React.useState(false);
		
			function openModalNv() {
			setIsOpenNv(true);
			}
		
			function afterOpenModalNv() { 
			}
		
			function closeModalNv() {
			setIsOpenNv(false);
			}


				function format(todayy){
				var today = new Date(todayy);
				var dd = String(today.getDate()).padStart(2, '0');
				var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
				var yyyy = today.getFullYear();
			
				today = dd + '/' + mm + '/' + yyyy;
				return today;
				}

		
				function formatDate(date){
					//var index = date.search(" ");
					date = date.substring(0, 10);
					date = date.split("-");
					var formatedDate = date[2] +"/"+ date[1] +"/"+ date[0];
					return(formatedDate);
				}
			
				async function verRendimiento(vehiculoid) {
			
					var id = "verRendimiento";
					const res = await axios.get(process.env.REACT_APP_API_URL+'?id='+ id+'&vehiculoid='+vehiculoid);
					
					setListaVer(res.data); 
					openModal1();
				}
				let subtitle1;
				const [modalIsOpen1, setIsOpen1] = React.useState(false);
			
				function openModal1() {
				setIsOpen1(true);
				}
			
				function afterOpenModal() {
				// references are now sync'd and can be accessed.
				//subtitle.style.color = '#f00';
				}
			
				function closeModal1() {
				setIsOpen1(false);
				}
				
		

				function formatN(importe){
				
					return ((Number(importe)).toLocaleString('en-US'));
					}
			
		

		const [lista, setLista] =  useState([]);  
		const [listaRendimientoM, setListaRendimientoM] =  useState([]);  
			const [listapd, setListaPD] = useState([]);  
		
		

		useEffect(()=> {
			getCargas(); 
		}, [])

		async function getCargas(){
			setTotal(0);
			setTotalLitros(0);
			setLista([]);
				setListaPD([]);
				var id = "getCargas";
			openModalLoad();

				const res = await axios.get(process.env.REACT_APP_API_URL+'?id='+id+'&idflotilla='+props.flotilla+'&tipo='+props.tipo+'&userid='+props.userid);
				closeModalLoad();
				setTotal(res.data.map(datum => Number(datum.litros)).reduce((a, b) => a + b, 0));
				//setTotalLitros(res.data.map(datum => Number(datum.litros)).reduce((a, b) => a + b, 0))
				for(let i =0; i < res.data.length; i++){
					console.log(res.data[i].litros);
				}
				setTotalLitros(res.data.reduce((a,v) =>  a = a + Number(v.litros) , 0 ).toFixed(2));
				setLista(res.data);
				setListaPD(res.data);
				console.log(res.data);
			

		}
		
		async function getRendimientoMensual(){ 
			setListaRendimientoM([]);
			let fechafinmes = document.getElementById("input-fecha-rendimiento-mensual").value;
			let test = new Date(fechafinmes);
			test.setDate(test.getDate() + 1);

			let ultimoDia = test.getDate() == new Date(test.getFullYear(),test.getMonth()+1,0).getDate();
					if(ultimoDia == false){
						notify("Ingrese el último día del mes para continuar");
						return;
					}
				document.getElementById("fechai").innerHTML = "Inicial";
				document.getElementById("fechaf").innerHTML = "Final";
				var id = "getRendimientoMensual";
				let fecha = document.getElementById("input-fecha-rendimiento-mensual").value;
				const res = await axios.get(process.env.REACT_APP_API_URL+'?id='+id+'&idflotilla='+props.flotilla+'&fecha='+fecha+'&tipo='+props.tipo+'&userid='+props.userid);
			
				setListaRendimientoM(res.data); 
				document.getElementById("fechai").innerHTML = document.getElementById("fechai").innerHTML + " " + res.data[0].fechamesanterior;
				document.getElementById("fechaf").innerHTML = document.getElementById("fechaf").innerHTML + " " + res.data[0].fecha;

				
				console.log(res.data);
			


		}
		

		async function getCargasDia(){
			setLista([]);
			setListaPD([]);
			setTotal(0);
			var id = "getCargasDia";
			var fecha = document.getElementById("input-fecha").value;
			var fechafinal = document.getElementById("input-fecha-final").value;
			var vehiculoid = document.getElementById("vehiculof").value;
			openModalLoad();
			const res = await axios.get(process.env.REACT_APP_API_URL+'?id='+id+'&fecha='+fecha+'&fechafinal='+fechafinal+'&idflotilla='+props.flotilla+'&vehiculoid='+vehiculoid+'&userid='+props.userid+'&tipo='+props.tipo);
			closeModalLoad();
			setTotalLitros(res.data.reduce((a,v) =>  a = a + Number(v.litros) , 0 ).toFixed(2));
			setLista(res.data);
			setListaPD(res.data);
			console.log(res.data);

		}
		
		function filterPlacaVehiculo() {
			var tipo = document.getElementById('vehiculof').value;  
			if(tipo == "0"){ 
				setLista(listapd);
			}else{
				var result = listapd.filter((x) => (x.vehiculoid == tipo)); 
				setLista(result);
			}
		}

			async function eliminarRendimiento(folio){
					
					if(window.confirm('Desea eliminar el registro del rendimiento ' + folio)){ 
						let fd = new FormData() 
						fd.append("id", "eliminarRendimiento")
						fd.append("folio", folio) 
						const res = await axios.post(process.env.REACT_APP_API_URL, fd);  
						notify(res.data.trim());
						getRendimientoMensual();
					getCargas();
					}
			}
			async function eliminarCarga(folio){
					
				if(window.confirm('Desea eliminar el registro de carga ' + folio)){ 
					let fd = new FormData() 
					fd.append("id", "eliminarCarga")
					fd.append("folio", folio) 
					const res = await axios.post(process.env.REACT_APP_API_URL, fd);  
					notify(res.data.trim());
					getCargas();
					getRendimientoMensual();
				}
		}

		async function ConfirmarCarga(folio){
					
			if(window.confirm('Desea confirmar el registro de carga ' + folio)){ 
				let fd = new FormData() 
				fd.append("id", "confirmarCarga")
				fd.append("folio", folio) 
				const res = await axios.post(process.env.REACT_APP_API_URL, fd);  
				notify(res.data.trim());
				getCargas();
				getRendimientoMensual();
			}
	}
		
		
		// Dynamically create select list
		let options = [];
		

		return (
		
			<div className="container ">
				<div className='titulos'>
					<NabvarRe departamento={props.departamento} dptoid={props.dptoid} titulo="Rendimiento"/> 
				</div>
		
			<div className='apartado-modal'>
				<button onClick={openModal} class="btn btn-outline-success btn-sm" id='botonMulta'>Nueva carga</button>
			</div>

			<div className='apartado-filtro'>
				<div style={{display:'flex',alignItems:'center'}}>
					<h6 className='h6Multas' >Filtrar por fecha:</h6>
					<input id="input-fecha" type="date" onChange={() => getCargasDia()} style={{width: '32%', height:'25px', fontSize: '16px', cursor: 'pointer',marginLeft:'10px'}}/>
					<input id="input-fecha-final" type="date"  onChange={() => getCargasDia()} style={{width: '32%', height:'25px', fontSize: '16px', cursor: 'pointer',marginLeft:'10px'}}/>
				</div>
				<div style={{display:'flex',alignItems:'center'}}>
					<h6 className='h6Multas' >Vehículo:</h6>
					{/* onChange={() => filterPlacaVehiculo()} */}
					<select  id="vehiculof"   className="form-control" style={{width:'65%', marginTop:'5px', cursor: 'pointer',marginLeft:'10px'}}>						
						<option value="0">Todos</option>
						{props.vehiculos.map(item => ( 
							<option value={item.vehiculoid}>{item.descripcion + " " + item.modelo + " " + item.numvehiculo }</option>
						))}                             
					</select>&nbsp;&nbsp;&nbsp;&nbsp;
					<button  style={{height:'38px', margintop:'5px'}} onClick={() => getCargasDia()} class="btn btn-outline-success btn-sm">Filtrar</button>

				</div>

			</div>
			
			<div  style={{overflowY: 'scroll', width:'100%', marginTop:'10px'}}>	 
			
			<DataTableExtensions
							columns={columns}
							data={lista}
							print={true}
							export={true}
							filterPlaceholder="Filtrar" 
							>
									<DataTable
												columns={columns}
												data={lista}
												fixedHeader={true}
												fixedHeaderScrollHeight={'100%'}
												pagination
												dense	
												customStyles={tableCustomStyles}
												highlightOnHover={true}
												noHeader
												footer={footer}
												noDataComponent={"No se encontró información"} 
												conditionalRowStyles={conditionalRowStyles}

											
											/>
						</DataTableExtensions>				<table id="productstable"  style={{width:'100%'}} hidden> 
					<tr>
						<th class="header">Folio</th>
						<th class="header">Vehículo</th>
						<th class="header">Fecha Carga</th>
						<th class="header">Litros</th>
						<th class="header">Importe</th>
						<th class="header">Kilometraje Inicial</th>
						<th class="header">Kilometraje Final</th>
						<th class="header">Ticket</th>
						<th class="header">Rendimiento</th> 
						<th class="header">Editar</th> 
						<th class="header">Eliminar</th> 
					</tr>
					{  
						lista.map(item => ( 
							<tr  id="tabletr" style={{border: '2px solid #ABB2B9',fontSize:'12px'}}>
								<td style={{border: '2px solid rgb(171,178,185)',textAlign:'center'}} className='id-orden' >{item.folio}</td>
								<td style={{border: '2px solid rgb(171,178,185)'}}>{item.vehiculo + " " + item.modelo + " " + item.numvehiculo}</td>
								<td style={{border: '2px solid rgb(171,178,185)',textAlign:'center'}}>{formatDate(item.fechacarga)}</td>
								<td style={{border: '2px solid rgb(171,178,185)',textAlign:'center'}}><input defaultValue={formatN(item.litros)} id={"litros"+item.folio}></input></td>
								<td style={{border: '2px solid rgb(171,178,185)',textAlign:'center'}}><input defaultValue={formatNumber(item.importe)} id={"importe"+item.folio}></input></td>
								<td style={{border: '2px solid rgb(171,178,185)',textAlign:'center'}}><input defaultValue={formatN(item.kilometraje)} id={"kilometraje"+item.folio}></input></td>
								<td style={{border: '2px solid rgb(171,178,185)',textAlign:'center'}}>{formatN(item.kilometrajefinal)}</td>
								<td style={{border: '2px solid rgb(171,178,185)',textAlign:'center'}}>{item.ticket}</td>
								<td style={{border: '2px solid rgb(171,178,185)',textAlign:'center'}}>{formatN(((item.kilometrajefinal - item.kilometraje)/ item.litros)) + " Kms / Litro"}</td>                    	    
								{(props.tipo == "1")?
								<td>
								<button id="bttn-editar-rendimiento" style={{width:'100%'}} className='btn btn-outline-success btn-sm' onClick={() => editarCarga(item.vehiculoid, item.folio)}><BsArrowRepeat /></button>
								</td>                                        

									:
									<td></td>
								}{(props.tipo == "1")?
								<td>
								<button id="bttn-eliminar-rendimiento" style={{width:'100%'}} className='btn btn-outline-danger btn-sm' onClick={() => eliminarCarga(item.folio)}><BsXCircleFill /></button>
								</td>                                        

									:
									<td></td>
								}
							</tr>                
					))}	
					<input id='input-cotizacion' type='file' style={{display:'none'}}></input>
				</table> 
				<br></br>
				<div className='apartado-modal'>
					<button onClick={openModalNv} class="btn btn-outline-success btn-sm" id='botonMulta'>Nuevo Registro</button>
					<button onClick={onDownload} class="btn btn-outline-success btn-sm" style={{ marginLeft: '10px', width:'150px',marginTop:'10px'}}> Exportar excel </button>   

				</div>	
				<div className='apartado-filtro'>
					<div style={{display:'flex',alignItems:'center'}}>
						<h6 className='h6Multas' >Fecha:</h6>
						<input id="input-fecha-rendimiento-mensual" type="date" onChange={() => getRendimientoMensual()}  style={{width: '32%', height:'25px', fontSize: '16px', cursor: 'pointer',marginLeft:'10px'}}/>
								

					</div>	
				</div>
				<DataTableExtensions
							columns={columns1}
							data={listaRendimientoM}
							print={true}
							export={true}
							filterPlaceholder="Filtrar" 
							>
									<DataTable
												columns={columns1}
												data={listaRendimientoM}
												fixedHeader={true}
												fixedHeaderScrollHeight={'100%'}
												noHeader
												pagination
												customStyles={tableCustomStyles}
												highlightOnHover={true}
												noDataComponent={"No se encontró información"}

											
											/>
						</DataTableExtensions>				
				<table id="productstable"  style={{width:'100%'}} ref={tableRef} hidden> 
					<tr>
						<th class="header">Folio</th>
						<th class="header">Vehículo</th>
						<th class="header">Modelo</th>
						<th class="header">Uso</th>
						<th class="header">Fecha</th>
						<th class="header" id="fechai">Inicial</th>
						<th class="header" id="fechaf">Final</th>
						<th class="header">Total</th>
						<th class="header">Litros</th>
						<th class="header">Importe</th>
						<th class="header">Rendimiento</th>
						<th class="header">Costo KM</th>
						<th class="header">Eliminar</th>
					</tr>
					{  
						listaRendimientoM.map(item => ( 
							<tr  id="tabletr" style={{border: '2px solid #ABB2B9',fontSize:'12px'}}>
								<td style={{border: '2px solid rgb(171,178,185)',textAlign:'center'}}>{item.folio}</td>
								<td style={{border: '2px solid rgb(171,178,185)'}}>{item.vehiculo + " " + item.modelo + " " + item.numvehiculo}</td>
								<td style={{border: '2px solid rgb(171,178,185)',textAlign:'center'}}>{item.modelo}</td>
								<td style={{border: '2px solid rgb(171,178,185)',textAlign:'center'}}>{item.tipouso}</td>
								<td style={{border: '2px solid rgb(171,178,185)',textAlign:'center', width:'70px'}}>{item.fecha}</td>
								<td style={{border: '2px solid rgb(171,178,185)',textAlign:'center'}}>{item.kilometrajeinicial}</td>
								<td style={{border: '2px solid rgb(171,178,185)',textAlign:'center'}}>{item.kilometrajefinal}</td>
								<td style={{border: '2px solid rgb(171,178,185)',textAlign:'center'}}>{formatN(item.total)}</td>
								<td style={{border: '2px solid rgb(171,178,185)',textAlign:'center'}}>{formatN(item.litros)}</td>
								<td style={{border: '2px solid rgb(171,178,185)',textAlign:'center'}}>{formatNumber(item.importe)}</td>
								<td style={{border: '2px solid rgb(171,178,185)',textAlign:'center'}}>{item.rendimiento}</td>
								<td style={{border: '2px solid rgb(171,178,185)',textAlign:'center'}}>{item.costokm + " Kms / Litro"}</td>                                        
								{(props.tipo == "1")?
								<td>
								<button id="bttn-eliminar-rendimiento" style={{width:'100%'}} className='btn btn-outline-danger btn-sm' onClick={() => eliminarRendimiento(item.folio)}><BsXCircleFill /></button>
								</td>                                        

									:
									<td></td>
								}
								
							</tr>
					))}	
					<input id='input-cotizacion' type='file' style={{display:'none'}}></input>
				</table> 
				<br></br>
			</div>
		
		

			
		
		{/* 
			<div style={{ margin: 'auto', display:'none'}} >
							<div style={{ position: 'absolute', bottom: '10px', backgroundColor: 'white', border: '2px solid black', borderRadius: '5px', width: '80%', margin: 'auto', padding: '5px' }}>
								<div className="d-flex flex-row" style={{ overflowX: 'scroll' }} >
									{props.vehiculos.map(item => (
										<div className="card p-2 mt-2 border-secondary" key={item.id} style={{ width: '15%', marginLeft: '15px', minWidth: '15%' }}>
											<div>
											<b><label ></label></b> <label className="text-primary">{item.descripcion + " -"+ item.vehiculoid}</label> &nbsp;&nbsp; 
												{(item.icon == null)  ?
												<img src={'http://flotillas.grupopetromar.com/default.jpg'} style={{ height: '100px', width: '140px' }}></img>  
												:
												<img src={'http://flotillas.grupopetromar.com/apirestflotilla/Vehiculos/'+item.icon} style={{ height: '100px', width: '140px' }}></img> 
												}
												
											
											</div>

											<button className="btn btn-outline-success btn-sm" 
											onClick={() => verRendimiento(item.vehiculoid)} >
												<FaEye /> ver
											</button>
										</div>
									))}
								</div>
							</div>
						</div>
					*/}
						<Modal
				isOpen={modalIsOpen1}
				onAfterOpen={afterOpenModal}
				onRequestClose={closeModal1}
				style={customStyles}
				contentLabel="Example Modal"
			>
				<label   style={{color:'black', fontSize:'32px'}}>Historial de Redimiento</label>
				<br></br>
				<br></br>
				<table id="productstable"  style={{width:'900px'}}> 
				<tr>
								<th class="header">Folio</th>
								<th class="header">Vehículo</th>
								<th class="header">Fecha Carga</th>
								<th class="header">Litros</th>
								<th class="header">Importe</th>
								<th class="header">Kilometraje Inicial</th>
								<th class="header">Kilometraje Final</th>
								<th class="header">Rendimiento</th> 
							</tr>

							{ 
							listaver.map(item => ( 
								<tr>
								<td className='id-orden' >{item.folio}</td>
								<td>{item.vehiculo}</td>
								<td>{format(item.fechacarga)}</td>
								<td>{formatN(item.litros)}</td>
								<td>{formatNumber(item.importe)}</td>
								<td>{formatN(item.kilometraje)}</td>
								<td>{formatN(item.kilometrajefinal)}</td>
								<td>{formatN(((item.kilometrajefinal - item.kilometraje)/ item.litros)) + " Kms / Litro"}</td>
								<td></td>
								
							</tr>
						
							))}	
				</table>
				
		<br></br>
		<br></br>
				<button onClick={closeModal1} class="btn btn-outline-danger btn-sm ">Cancelar</button> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
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
					

					<Modal
				isOpen={modalIsOpen}
				onAfterOpen={afterOpenModal}
				onRequestClose={closeModal}
				style={customStyles}
				contentLabel="Example Modal"
			>
				<h2  style={{color:'black'}}>Nueva carga</h2>
				
				<div>Vehículo</div>
				<select id="vehiculoid" style={{width:'100%', marginTop:'5px'}}>
					
				{props.vehiculos.map(item => ( 
							<option value={item.vehiculoid}>{item.descripcion + " " + item.modelo + " " + item.numvehiculo }</option>

				))}
				</select>
				<div>Fecha de carga</div>
				<input id="fechacarga" type="date" style={{width:'100%', marginTop:'5px'}}/>
				<div>Kilometraje </div>
				<input  id="kilometraje" type="number" style={{width:'100%', marginTop:'5px'}}/>
				<div hidden>Kilometraje final</div>
				<input hidden id="kilometrajefinal" type="number" style={{width:'100%', marginTop:'5px'}}/>
				<div>Litros</div>
				<input id="litros" type="number" style={{width:'100%', marginTop:'5px'}}/>
				<div>Importe</div>
				<input id="importe" type="number" style={{width:'100%', marginTop:'5px'}} />
				<h6>Ticket</h6>
				<input id="ticket" type="text" style={{width:'100%', marginTop:'5px'}}></input>
					
				
		<br></br>
		<br></br>
				<button style={{width:'45%', marginLeft:'20px'}} onClick={closeModal} class="btn btn-outline-danger btn-sm ">Cancelar</button>  
				<button style={{width:'45%', marginLeft:'25px'}} onClick={() => addCarga()} class="btn btn-outline-success btn-sm" >Guardar</button>
			</Modal>

			<Modal
				isOpen={modalIsOpenEditar}
				onAfterOpen={afterOpenModal}
				onRequestClose={closeModalEditar}
				style={customStylesEditarCarga}
				contentLabel="Example Modal"
			>
				<h2  style={{color:'black'}}>Editar carga: {folio} </h2> 
				<div>Vehículo</div> 
				<label id="vehiculoidE" style={{width:'100%', marginTop:'5px'}}></label>
				<div>Fecha de carga</div> 
				<label style={{width:'100%', marginTop:'5px'}}>{fechacarga}</label>
				<div>Kilometraje </div> 
				<input defaultValue={kilometraje} id={"kilometrajeE"} type="number" style={{width:'100%', marginTop:'5px'}}/> 
				<div>Litros</div>
				<input defaultValue={litros} id={"litrosE"} type="number" style={{width:'100%', marginTop:'5px'}}/>
				<div>Importe</div>
				<input defaultValue={importe} id={"importeE"} type="number" style={{width:'100%', marginTop:'5px'}} /> 
					
				
		<br></br>
		<br></br>
				<button style={{width:'45%', marginLeft:'5px'}} onClick={closeModalEditar} class="btn btn-outline-danger btn-sm ">Cancelar</button>  
				<button style={{width:'45%' , marginLeft:'10px'}} onClick={() => editarCarga()} class="btn btn-outline-success btn-sm" >Guardar</button>
			</Modal>

			<Modal
				isOpen={modalIsOpenNv}
				onAfterOpen={afterOpenModalNv}
				onRequestClose={closeModalNv}
				style={customStyles}
				contentLabel="Example Modal"
			>
				<h2  style={{color:'black'}}>Nuevo registro</h2>
				
				<div>Vehículo</div>
				<select id="vehiculoidfinmes" style={{width:'100%', marginTop:'5px'}}>
					
				{props.vehiculos.map(item => ( 
							<option value={item.vehiculoid}>{item.descripcion + " " + item.modelo + " " + item.numvehiculo }</option>

				))}
				</select>
				<div>Fecha</div>
				<input id="fechafinmes" type="date" style={{width:'100%', marginTop:'5px'}}/>
				<div>Kilometraje Final</div>
				<input  id="kilometrajefinmes" type="number" style={{width:'100%', marginTop:'5px'}}/> 
				<br></br>
				<br></br>
						<button style={{width:'45%', marginLeft:'20px'}} onClick={closeModalNv} class="btn btn-outline-danger btn-sm ">Cancelar</button>  
						<button style={{width:'45%', marginLeft:'25px'}} onClick={() => addCargaRendimiento()} class="btn btn-outline-success btn-sm" >Guardar</button>
					</Modal>
				</div>
		
		);   
}

export default Rendimiento;
