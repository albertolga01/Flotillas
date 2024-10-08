 
import React,{useState, useEffect, useRef, useCallback} from 'react';  
import  {FaCheckCircle, FaTrash, FaEdit, FaRedditAlien, FaEye} from 'react-icons/fa'
import { useDownloadExcel } from 'react-export-table-to-excel';
import axios from '../node_modules/axios'; 
import {NabvarRe} from './component/Navbar'; 
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
import './App.css'; 
import formatNumber from './formatNumber';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";  
import {ThreeDots } from  'react-loader-spinner'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 
import {  BsXCircleFill, BsFillPlusCircleFill } from "react-icons/bs";
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

function Refacciones(props) {
	const [selectedRows, setSelectedRows] = useState([]);	

	const handleChange = useCallback(state => {
		setSelectedRows(state.selectedRows);
}, []);

useEffect(() => {
		
			console.log('state', selectedRows);
		}, [selectedRows]);

	const columns = [
		
		{
			name: 'Folio',  
			cell: row => row.folio,
			sortable: true,
			maxWidth: "5px", 
			width: "60px"
		},
		{
			name: 'Vehículo',  
			cell: row => row.vehiculo + " " + row.modelo +" "+ row.numvehiculo,
			sortable: true,
			width: "210px",
			wrap: true,
		},
		{
			name: 'Fecha Compra',  
			cell: row => format(row.fechacompra),
			sortable: true,
		},
		{
			name: 'Proveedor',  
			cell: row => row.proveedor,
			sortable: true,
		}, 
		{
			name: 'Refacción',  
			cell: row => row.refaccion,
			sortable: true,
		}, 
		{
			name: 'Descripcion',   
			cell: row => row.descripcion,
			sortable: true,
		}, 
		{
			name: 'Precio',   
			cell: row => formatNumber(row.precio),
			sortable: true,
		}, 
		{
			name: 'Documento',   
			cell: (row) => {
				return (
					<td style={{minWidth:'100px', padding:'5px'}}><a target="_blank" rel="noreferrer" href={"https://flotillas.grupopetromar.com/apirestflotilla/documentos/" + row.documentorefaccion}>{row.documentorefaccion}</a></td>		
				)
			}
		}, 
		{
			name: 'Orden de Compra',   
			cell: row => row.foliooc,
			sortable: true,
		}, 
		{
			name: 'Captura',   
			cell: row => format(row.fecha),
			sortable: true,
		}, 
		{
			name: 'Borrar',   
			cell: (row) => {
				return (
					(props.tipo == "1") ? 
							<td><button className='btn btn-outline-danger btn-sm' onClick={() => eliminarRefaccion(row.folio)} style={{width:'100%' }}><BsXCircleFill /></button></td>
							:<></>
								
				)
			}
		}, 
	];const columns1 = [
		{
			name: 'Folio',  
			cell: row => row.folio,
			sortable: true,
			maxWidth: "5px", 
			width: "60px",
		},
		{
			name: 'Vehículo',
			width: "15%",  
			cell: (row) => {
				return (
					<select  id={"vehiculoid"+row.folio}   className="form-control"  style={{width:'85%', marginTop:'5px', cursor: 'pointer',marginLeft:'10px'}}>
						<option  value="0" >Seleccione</option> 					
						{props.vehiculos.map(row => ( 
							<option value={row.vehiculoid}>{row.descripcion + " " + row.modelo + " " + row.numvehiculo  }</option>
						))}
						</select>
				)
			}
		},
		{
			name: 'Fecha Compra',  
			cell: row => format(row.fechacompra),
			sortable: true,
		},
		{
			name: 'Proveedor',  
			cell: row => row.proveedor,
			sortable: true,
		}, 
		{
			name: 'Refacción',  
			cell: row => row.refaccion,
			sortable: true,
		}, 
		{
			name: 'Descripcion',   
			cell: row => row.descripcion,
			sortable: true,
		}, 
		{
			name: 'Precio',   
			cell: row => formatNumber(row.precio),
			sortable: true,
		}, 
		{
			name: 'Documento',    
			cell: (row) => {
				return (
					<td style={{minWidth:'100px', padding:'5px' }}><a target="_blank" rel="noreferrer" href={"https://flotillas.grupopetromar.com/apirestflotilla/documentos/" + row.documentorefaccion}>{row.documentorefaccion}</a></td>		
				)
			}
		}, 
		{
			name: 'Orden de Compra',   
			cell: row => row.foliooc,
			sortable: true,
		}, 
		{
			name: 'Captura',   
			cell: row => format(row.fecha),
			sortable: true,
		}, 
		{
			name: 'Asignar',   
			cell: (row) => {
				return (
					(props.tipo == "1") ? 
							<td style={{padding:'5px',border: '2px solid rgb(171,178,185)',textAlign:'center'}}><button className='btn btn-outline-success btn-sm' onClick={() => asignarRefaccion(row.folio, row.vehiculoid)} style={{width:'100%' }}><BsFillPlusCircleFill /></button></td>
							:<></>
				)
			}
		}, 
		{
			name: 'Borrar',   
			cell: (row) => {
				return (
					(props.tipo == "1") ? 
							<td style={{padding:'5px',border: '2px solid rgb(171,178,185)',textAlign:'center'}}><button className='btn btn-outline-danger btn-sm' onClick={() => eliminarRefaccionStock(row.folio)} style={{width:'100%' }}><BsXCircleFill /></button></td>
							:<></>
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
 

	const [listainv, setListaInv] = useState([]);
	
	const [listaver, setListaVer] = useState([]);

	const [listasd, setListaSD] = useState([]);  
	useEffect(() => { 
		getInventarios();
	}, [])

	async function addRefaccion() {
		
		var vehiculoid = document.getElementById("vehiculoid").value;
		var fechacompra = document.getElementById("fechacompra").value;
		var refaccion = document.getElementById("refaccion").value;
		var descripcion = document.getElementById("descripcion").value;
		var precio = document.getElementById("precio").value;
		var proveedor = document.getElementById("proveedor").value;
		var documentorefaccion = document.getElementById("documentorefaccion"); 
		var refaccionid = document.getElementById("refaccionid").value;

		
		let fd = new FormData()
			fd.append("id", "addRefaccion")
			fd.append("vehiculoid", vehiculoid)
			fd.append("fechacompra", fechacompra) 
			fd.append("refaccion", refaccion)
			fd.append("descripcion", descripcion)
			fd.append("precio", precio)
			fd.append("proveedor", proveedor)
			fd.append("documentorefaccion", documentorefaccion.files[0])
			fd.append("refaccionid", refaccionid)

			openModalLoad();
		const res = await axios.post(process.env.REACT_APP_API_URL, fd);
		closeModalLoad();
		notify(res.data.trim());
		 
		/*if(res.data.trim() == "Refacción agregada correctamente"){
			closeModal();
  getRefacciones()

		}*/
		getRefacciones();
		getInventarios();
	}

	async function eliminarRefaccion(folio){
		if(window.confirm('Eliminar refacción con folio: ' + folio)){ 
			let fd = new FormData() 
			fd.append("id", "eliminarRefaccion") 
			fd.append("folio", folio)  
			const res = await axios.post(process.env.REACT_APP_API_URL, fd);  
			notify(res.data.trim()); 
			actualizarBajaCompras(folio, "refaccion");
			getRefacciones();
		}
	
		
	}
		async function actualizarBajaCompras(folio, tipo){ 
		
			let fd1 = new FormData()  
			fd1.append("id", "obtenerFolioProducto")  
			fd1.append("folio", folio)  
			fd1.append("tipo", tipo) 
			const res1 = await axios.post(process.env.REACT_APP_API_URL, fd1);  
			console.log((res1.data)); 
			let response = (res1.data);
			if(response != "0"){
				let fd = new FormData()   	
				fd.append("id", "actualizarBajaCompras") 
				fd.append("folio", response) 
				const res = await axios.post('https://compras.grupopetromar.com/apirest/index1.php/', fd);  
				console.log((res.data).trim()); 
			}
  
		}							

	async function eliminarRefaccionStock(folio){
		if(window.confirm('Eliminar refacción de stock con folio: ' + folio)){ 
			let fd = new FormData() 
			fd.append("id", "eliminarRefaccionStock") 
			fd.append("folio", folio)  
			const res = await axios.post(process.env.REACT_APP_API_URL, fd);  
			notify(res.data.trim()); 
			actualizarBajaCompras(folio, "stockRefaccion");
			getRefaccionesStock();
		} 

	}
	async function asignarRefaccion(folio){
		var vehiculoid = document.getElementById("vehiculoid"+folio).value;
		if(vehiculoid == "0"){
			alert("Seleccione un vehiculo");
			return;
		}
		
		if(window.confirm('Asignar refacción con folio: ' + folio )){ 
			let fd = new FormData() 
			fd.append("id", "asignarRefaccion") 
			fd.append("folio", folio)  
			fd.append("vehiculoid", vehiculoid)
			const res = await axios.post(process.env.REACT_APP_API_URL, fd);  
			notify(res.data.trim()); 
			getRefaccionesStock();
			getRefacciones();
		}
	
	}

	async function verRefeccion(vehiculoid) {
	 
		var id = "verRefacciones";
		openModalLoad();
		const res = await axios.get(process.env.REACT_APP_API_URL+'?id='+ id+'&vehiculoid='+vehiculoid);
		closeModalLoad();
		setListaVer(res.data); 
		 openModal1();
	}
 
	let subtitle;
	const [modalIsOpen, setIsOpen] = React.useState(false);
  
	function openModal() {
	  setIsOpen(true);
	}
  
	function afterOpenModal() {
	  // references are now sync'd and can be accessed.
	 // subtitle.style.color = 'black';
	}
  
	function closeModal() {
	  setIsOpen(false);
	}


	function format(todayy){
		var today = new Date(todayy);
		var dd = String(today.getDate()).padStart(2, '0');
	  var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
	  var yyyy = today.getFullYear();
	  
	  today = dd + '/' + mm + '/' + yyyy;
	   return today;
		}


		
	
  const [listaStock, setListaStock] =  useState([]);  
  

  const [lista, setLista] =  useState([]);  
  const [listaSelecInventario, setListaSelecInventario] =  useState([]);  
  const [listapd, setListaPD] = useState([]);
  const [listap, setListaP] = useState([]);  
  

  useEffect(()=> {
    getRefacciones();
	getRefaccionesStock();
  }, [])

  async function getRefacciones(){
	var id = "getRefacciones";
	openModalLoad();
	const res = await axios.get(process.env.REACT_APP_API_URL+'?id='+id+'&idflotilla='+props.flotilla+'&tipo='+props.tipo+'&userid='+props.userid);
 	closeModalLoad();
	setLista(res.data); 
	setListaSD(res.data);
	
	console.log(res.data);

  } 

  async function getRefaccionesStock(){
	setListaStock([]);
	var id = "getRefaccionesStock";
	openModalLoad();
	const res = await axios.get(process.env.REACT_APP_API_URL+'?id='+id+'&idflotilla='+props.flotilla+'&tipo='+props.tipo+'&userid='+props.userid);
 	closeModalLoad(); 
	setListaStock(res.data); 
	
	console.log(res.data);

  }
   
  const tableRef = useRef(null);

    const { onDownload } = useDownloadExcel({
        currentTableRef: tableRef.current,
        filename: 'Refacciones',
        sheet: 'Refacciones'
    })

  async function getRefaccionesDia(){
	   
	var id = "getRefaccionesDia";
	var fecha = document.getElementById("input-fecha").value;
	var fechafinal = document.getElementById("input-fecha-final").value;
	var vehiculo = document.getElementById("vehiculof").value;
	openModalLoad();
	const res = await axios.get(process.env.REACT_APP_API_URL+'?id='+id+'&fecha='+fecha+'&idflotilla='+props.flotilla+'&fechafinal='+fechafinal+'&vehiculo='+vehiculo+'&tipo='+props.tipo+'&userid='+props.userid);
	closeModalLoad();
    setLista(res.data);
	
	console.log(res.data);

  }

  async function getInventarios(){
	   
	var id = "getInventario";
	const res = await axios.get(process.env.REACT_APP_API_URL+'?id='+id );
    setListaSelecInventario(res.data);
	console.log(res.data);

  }

  function filterRefaccion() {
	let folio = document.getElementById("refaccionid").value;
 
	if(folio != "0"){
	var result = listaSelecInventario.filter((x) => (x.folio === folio));
	console.log(result); 
	document.getElementById("fechacompra").value = result[0].fechacompra;
	document.getElementById("proveedor").value = result[0].proveedor;
	document.getElementById("refaccion").value = result[0].producto;
	document.getElementById("descripcion").value = result[0].producto;
	document.getElementById("precio").value = result[0].precio;
	}else{
		
	document.getElementById("fechacompra").value = "";
	document.getElementById("proveedor").value = "";
	document.getElementById("refaccion").value = "";
	document.getElementById("descripcion").value = "";
	document.getElementById("precio").value = "";
	}
	
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

  async function eliminarRefaccionesSeleccionadas(){ 
	
	let fd = new FormData()
	fd.append("id", "eliminarRefaccionesSeleccionadas")
	for(let i = 0; i<selectedRows.length; i++){
		fd.append("idrefacciones[]", selectedRows[i].folio) 
	}

	openModalLoad();
	const res = await axios.post(process.env.REACT_APP_API_URL, fd);
	closeModalLoad();
	getRefacciones(); 
	setSelectedRows([]);
  }

 
 
  function filterDictamenVehiculo() {
	var tipo = document.getElementById('vehiculof').value;  
	if(tipo == "0"){ 
		setLista(listasd);
	}else{ 
	var result = listasd.filter((x) => (x.vehiculoid == tipo));
	setLista(result);  
	}
}
  // Dynamically create select list
  let options = [];
 

  return (
  
    <div className="container ">
		<div className='titulos'>
			<NabvarRe departamento={props.departamento} dptoid={props.dptoid} titulo="Refacciones"/>  
		</div>
     
  

	<div className='apartado-modal'>
		{(props.tipo == "1") ? 
			<button onClick={openModal} class="btn btn-outline-success btn-sm" id='botonMulta'>Nueva refacción</button>
			: <></>
		}		
		<button onClick={onDownload} class="btn btn-outline-success btn-sm" id='botonMulta'> Exportar excel </button>   

		<Modal
			isOpen={modalIsOpen}
			onAfterOpen={afterOpenModal}
			onRequestClose={closeModal}
			style={customStyles}
			contentLabel="Example Modal"
		>
			<h2   style={{color:'black'}} >Nueva Refacción</h2>
		
			<div>Vehículo</div>
			<select id="vehiculoid" style={{width:'100%', marginTop:'5px'}}>
				{props.vehiculos.map(item => ( 
					<option value={item.vehiculoid}>{item.descripcion + " " + item.modelo + " " + item.numvehiculo }</option>
					))}
			</select>
			<div>Refacción</div>
			<select id="refaccionid" onChange={() => filterRefaccion()} style={{width:'100%', marginTop:'5px'}}>
				<option value="0">Seleccione </option>
				{listaSelecInventario.map(item => ( 			 		 
					<option value={item.folio}>{item.producto + " - " + item.descripcion}</option>
				))}
			</select>
			<div>Fecha de compra</div>
			<input id="fechacompra" type="date" style={{width:'100%', marginTop:'5px'}}/>
			<div>Proveedor</div>
			<input id="proveedor" type="text" style={{width:'100%', marginTop:'5px'}}/>
			<div>Refacción</div>
			<input id="refaccion" type="text" style={{width:'100%', marginTop:'5px'}}/>
			<div>Descripción</div>
			<input id="descripcion" type="text" style={{width:'100%', marginTop:'5px'}} />
			<div>Precio</div>
			<input  id="precio" type="number" style={{width:'100%', marginTop:'5px'}}/>
			<div>Documento</div>
			<input id="documentorefaccion" type="file" style={{ height: '50px'}} />                
			<br></br>
			<br></br>
			<button onClick={closeModal} class="btn btn-outline-danger btn-sm ">Cancelar</button> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
			<button onClick={() => addRefaccion()} class="btn btn-outline-success btn-sm" >Guardar</button>
		</Modal>
	</div>

	<div className='apartado-filtro'>
		<div style={{display:'flex',alignItems:'center'}}>
			<h6 className='h6Multas' >Filtrar por fecha de compra:</h6>
			<input id="input-fecha" type="date" onChange={() => getRefaccionesDia()} style={{width: '32%', height:'25px', fontSize: '16px', cursor: 'pointer',marginLeft:'10px'}}/>
			<input id="input-fecha-final" type="date" onChange={() => getRefaccionesDia()} style={{width: '32%', height:'25px', fontSize: '16px', cursor: 'pointer'}}/>
		</div>
		<div style={{display:'flex',alignItems:'center'}}>
			<h6 className='h6Multas'>Vehículo:</h6>
			<select  id="vehiculof"   className="form-control"  style={{width:'65%', marginTop:'5px', cursor: 'pointer',marginLeft:'10px'}}>
        		<option value="0">Todos</option> 					
            	{props.vehiculos.map(item => ( 
                	<option value={item.vehiculoid}>{item.descripcion + " " + item.modelo + " " + item.numvehiculo  }</option>
            	))}
    		</select>
		</div>
		<div style={{display:'flex',alignItems:'center'}}>
			<button onClick={() => getRefaccionesDia()} class="btn btn-outline-success btn-xl">Buscar</button>
		</div> 
	</div>
	<div className='apartado-modal' align="right">
		
	<button className="btn btn-outline-danger btn-sm" onClick={() => eliminarRefaccionesSeleccionadas()} style={{margin:'5px', height:'45px'}} id='boton-Buscar'>Eliminar</button>

	</div> 
 	<div  style={{maxHeight:'43vmax', overflowY: 'scroll', width:'100%', marginTop:'10px'}}>
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
												customStyles={tableCustomStyles}
												highlightOnHover={true}
												noDataComponent={"No se encontró información"}
												selectableRows 
												onSelectedRowsChange={handleChange}

											
											/>
						</DataTableExtensions>
	    <table id="productstable"  style={{width:'100%'}}  ref={tableRef} hidden> 
        	<tr>
            	<th class="header">Folio</th>
                <th class="header">Vehículo</th>
				<th class="header" style={{textAlign:'center', minWidth:'50px'}}>Fecha Compra</th>
				<th class="header">Proveedor</th>
				<th class="header">Refacción</th>
				<th class="header">Descripción</th> 
				<th class="header">Precio</th>
				<th class="header">Documento</th>
				<th class="header" style={{textAlign:'center', minWidth:'20px'}}>Orden de Compra</th>
				<th class="header">Captura</th> 
				<th class="header">Borrar</th>
            </tr>
            {  
                lista.map(item => ( 
                    <tr  id="tabletr" style={{border: '2px solid #ABB2B9',fontSize:'11px'}}>
                    	<td className='id-orden' >{item.folio}</td>
                    	<td style={{minWidth:'180px',border: '2px solid rgb(171,178,185)'}}>{item.vehiculo + " " + item.modelo + " " + item.numvehiculo}</td>
						<td style={{padding:'5px',border: '2px solid rgb(171,178,185)',textAlign:'center'}}>{format(item.fechacompra)}</td>
                    	<td style={{minWidth:'130px', padding:'5px',border: '2px solid rgb(171,178,185)'}}>{item.proveedor}</td>
                    	<td style={{minWidth:'150px',border: '2px solid rgb(171,178,185)'}}>{item.refaccion}</td>
                    	<td style={{minWidth:'160px',border: '2px solid rgb(171,178,185)'}}>{item.descripcion}</td>
                    	<td style={{padding:'15px',border: '2px solid rgb(171,178,185)'}}>{formatNumber(item.precio)}</td>
                    	<td style={{minWidth:'100px', padding:'5px',border: '2px solid rgb(171,178,185)'}}><a target="_blank" rel="noreferrer" href={"https://flotillas.grupopetromar.com/apirestflotilla/documentos/" + item.documentorefaccion}>{item.documentorefaccion}</a></td>
                    	<td style={{border: '2px solid rgb(171,178,185)',textAlign:'center'}}>{item.foliooc}</td>
						<td style={{border: '2px solid rgb(171,178,185)'}}>{format(item.fecha)}</td>
						
						{(props.tipo == "1") ? 
							<td><button className='btn btn-outline-danger btn-sm' onClick={() => eliminarRefaccion(item.folio)} style={{width:'100%' }}><BsXCircleFill /></button></td>
							:<></>
						}				                    
                	</tr>                
        	))}	
            <input id='input-cotizacion' type='file' style={{display:'none'}}></input>
        </table> 				
	</div>
 
         
<br></br>
<br></br>
 
<div style={{display:'flex',alignItems:'center', width:'100%'}}>
	<h6 style={{color:'black'}} >Inventario Refacciones</h6> 
		<button className="btn btn-outline-success btn-sm" onClick={() => getRefaccionesStock()} style={{marginLeft:'5px'}} id='boton-Buscar'>Buscar</button>
	</div>

	
<div  style={{maxHeight:'43vmax', overflowY: 'scroll', width:'100%', marginTop:'10px'}}>
<DataTableExtensions
							columns={columns1}
							data={listaStock}
							print={true}
							export={true}
							filterPlaceholder="Filtrar" 

							>
									<DataTable
												columns={columns1}
												data={listaStock}
												fixedHeader={true}
												fixedHeaderScrollHeight={'100%'}
												pagination
												customStyles={tableCustomStyles}
												highlightOnHover={true}
												noDataComponent={"No se encontró información"}

											
											/>
						</DataTableExtensions>
<table id="tableStock"  style={{width:'100%'}}  ref={tableRef} hidden> 
        	<tr>
            	<th class="header">Folio</th>
            	<th class="header">Vehiculo</th>
				<th class="header" style={{textAlign:'center', minWidth:'50px'}}>Fecha Compra</th>
				<th class="header">Proveedor</th>
				<th class="header">Refacción</th>
				<th class="header">Descripción</th> 
				<th class="header">Precio</th>
				<th class="header">Documento</th>
				<th class="header" style={{textAlign:'center', minWidth:'20px'}}>Orden de Compra</th>
				<th class="header">Captura</th>
				<th class="header">Asignar</th>
				<th class="header">Borrar</th>
            </tr>
            {  
                listaStock.map(item => ( 
                    <tr  id="tabletr" style={{border: '2px solid #ABB2B9',fontSize:'11px'}}>
                    	<td className='id-orden' >{item.folio}</td>
						<td style={{padding:'5px',border: '2px solid rgb(171,178,185)',textAlign:'center'}}>
						<select  id={"vehiculoid"+item.folio}   className="form-control"  style={{width:'85%', marginTop:'5px', cursor: 'pointer',marginLeft:'10px'}}>
						<option  value="0" >Seleccione</option> 					
						{props.vehiculos.map(item => ( 
							<option value={item.vehiculoid}>{item.descripcion + " " + item.modelo + " " + item.numvehiculo  }</option>
						))}
						</select>
						</td>
						<td style={{padding:'5px',border: '2px solid rgb(171,178,185)',textAlign:'center'}}>{format(item.fechacompra)}</td>
                    	<td style={{minWidth:'130px', padding:'5px',border: '2px solid rgb(171,178,185)'}}>{item.proveedor}</td>
                    	<td style={{minWidth:'150px',border: '2px solid rgb(171,178,185)'}}>{item.refaccion}</td>
                    	<td style={{minWidth:'160px',border: '2px solid rgb(171,178,185)'}}>{item.descripcion}</td>
                    	<td style={{padding:'15px',border: '2px solid rgb(171,178,185)'}}>{formatNumber(item.precio)}</td>
                    	<td style={{minWidth:'100px', padding:'5px',border: '2px solid rgb(171,178,185)'}}><a target="_blank" rel="noreferrer" href={"https://flotillas.grupopetromar.com/apirestflotilla/documentos/" + item.documentorefaccion}>{item.documentorefaccion}</a></td>
                    	<td style={{border: '2px solid rgb(171,178,185)',textAlign:'center'}}>{item.foliooc}</td>
						<td style={{border: '2px solid rgb(171,178,185)'}}>{format(item.fecha)}</td>
						{(props.tipo == "1") ? 
							<td style={{padding:'5px',border: '2px solid rgb(171,178,185)',textAlign:'center'}}><button className='btn btn-outline-success btn-sm' onClick={() => asignarRefaccion(item.folio, item.vehiculoid)} style={{width:'100%' }}><BsFillPlusCircleFill /></button></td>
							:<></>
						}
						{(props.tipo == "1") ? 
							<td style={{padding:'5px',border: '2px solid rgb(171,178,185)',textAlign:'center'}}><button className='btn btn-outline-danger btn-sm' onClick={() => eliminarRefaccionStock(item.folio)} style={{width:'100%' }}><BsXCircleFill /></button></td>
							:<></>
						}				                    
                	</tr>                
        	))}	
            <input id='input-cotizacion' type='file' style={{display:'none'}}></input>
        </table> 					
	</div>

<br></br>
<br></br>

	 <div style={{ margin: 'auto' , display:'none'}} >
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
									onClick={() => verRefeccion(item.vehiculoid)} >
										<FaEye /> ver
									</button>
								</div>
							))}
						</div>
					</div>
				</div>
 


				<Modal
        isOpen={modalIsOpen1}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal1}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <label ref={(_subtitle) => (subtitle = _subtitle)} style={{color:'black', fontSize:'32px'}}>Historial de Refacciones</label>
        <br></br>
        <br></br>
		<table id="productstable"  style={{width:'700px'}}> 
                    <tr> 
                        <th class="header">Folio</th>
                        <th class="header">Fecha Compra</th>
                        <th class="header">Fecha Captura</th>
                        <th class="header">Vehiculo</th>
                        <th class="header">Refacción</th>  
                        <th class="header">Descripción</th>  
                        <th class="header">Precio</th>  
                    </tr>

                    { 
                    listaver.map(item => ( 
                     <tr>
                    <td className='id-orden' >{item.folio}</td>
                    <td>{format(item.fechacompra)}</td>
                    <td>{format(item.fecha)}</td>
                    <td>{item.vehiculo}</td>
                    <td>{item.refaccion}</td>
                    <td>{item.descripcion}</td>
                    <td>{formatNumber(item.precio)}</td>
                    
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

        </div>
 
 


		
       
              
    
  );   
}



 



export default Refacciones;
