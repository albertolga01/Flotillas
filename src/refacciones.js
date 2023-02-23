 
import React,{useState, useEffect, useRef} from 'react';  
import  {FaCheckCircle, FaTrash, FaEdit, FaRedditAlien, FaEye} from 'react-icons/fa'
import { useDownloadExcel } from 'react-export-table-to-excel';
import axios from '../node_modules/axios'; 
import {NabvarRe} from './component/Navbar'; 
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
import './App.css'; 

import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";  
import {ThreeDots } from  'react-loader-spinner'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 
import {  BsXCircleFill } from "react-icons/bs";




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
		getVehiculos();
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

	async function getVehiculos() {
		var id = "getVehiculos";
		const res = await axios.get(process.env.REACT_APP_API_URL+'?id='+ id+'&idflotilla='+props.flotilla);
		setListaV(res.data);
		console.log(res.data);
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
	
	
	
		
	  function formatNumber(importe){
		   
		return ((Number(importe)).toLocaleString('en-US', {
		  style: 'currency',
		  currency: 'USD',}));
		}
  

  const [lista, setLista] =  useState([]);  
  const [listaSelecInventario, setListaSelecInventario] =  useState([]);  
  const [listapd, setListaPD] = useState([]);
  const [listap, setListaP] = useState([]);  
 
  const [listav, setListaV] = useState([]);

  useEffect(()=> {
    getRefacciones();
  }, [])

  async function getRefacciones(){
	var id = "getRefacciones";
	openModalLoad();
	const res = await axios.get(process.env.REACT_APP_API_URL+'?id='+id+'&idflotilla='+props.flotilla);
 	closeModalLoad();
	setLista(res.data);

	setListaSD(res.data);
	
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
	openModalLoad();
	const res = await axios.get(process.env.REACT_APP_API_URL+'?id='+id+'&fecha='+fecha+'&idflotilla='+props.flotilla+'&fechafinal='+fechafinal);
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
     
<NabvarRe departamento={props.departamento} dptoid={props.dptoid} titulo="Refacciones"/>    
<div style={{display:'flex', flexDirection:'row', width:'100%'}}>


     
	 
<div style={{width:'100%'}}>
<label>Filtrar por fecha de compra: </label> 

&nbsp;&nbsp;&nbsp;<input id="input-fecha" type="date" onChange={() => getRefaccionesDia()} style={{width: '120px', height:'25px', fontSize: '16px', cursor: 'pointer'}}/>
<input id="input-fecha-final" type="date" onChange={() => getRefaccionesDia()} style={{width: '120px', height:'25px', fontSize: '16px', cursor: 'pointer'}}/>
<div style={{width:'100%'}} align="left">
		<h6>Vehículo:</h6>
			<select  id="vehiculof"  onChange={() => filterDictamenVehiculo()} className="form-control"  style={{width:'100%', marginTop:'5px'}}>
			<option value="0">Todos</option> 
					
					{listav.map(item => ( 
						<option value={item.vehiculoid}>{item.descripcion + " " + item.modelo + " " + item.numvehiculo  }</option>
						))}
			</select>
    </div>
</div>
<div style={{width:'100%'}} align="right">
<button onClick={openModal} class="btn btn-outline-success btn-sm">Nueva refacción</button>&nbsp;&nbsp;&nbsp;
<button onClick={onDownload} class="btn btn-outline-success btn-sm"> Exportar excel </button>   

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
		  {listav.map(item => ( 
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
	  </div>
 <div  style={{maxHeight:'43vmax', overflowY: 'scroll', width:'100%', marginTop:'10px'}}>
                <table id="productstable"  style={{width:'100%'}}  ref={tableRef}> 
                    <tr>
                        <th class="header">Folio</th>
                        <th class="header">Vehículo</th>
						<th class="header">Fecha Compra</th>
                        <th class="header">Proveedor</th>
                        <th class="header">Refacción</th>
                        <th class="header">Descripción</th> 
                        <th class="header">Precio</th>
                        <th class="header">Documento</th>
						<th class="header" style={{textAlign:'center'}}>Orden de Compra</th>
						<th class="header">Fecha Captura</th>
						<th class="header">Borrar</th>

                    </tr>

                    {  
                    lista.map(item => ( 
                     <tr  id="tabletr" style={{border: '2px solid #ABB2B9'}}>
                    <td className='id-orden' >{item.folio}</td>
                    <td style={{minWidth:'280px'}}>{item.vehiculo + " " + item.modelo + " " + item.numvehiculo}</td>
					<td style={{ padding:'5px'}}>{format(item.fechacompra)}</td>
                    <td style={{minWidth:'250px', padding:'5px'}}>{item.proveedor}</td>
                    <td style={{minWidth:'350px'}}>{item.refaccion}</td>
                    <td style={{minWidth:'350px'}}>{item.descripcion}</td>
                    <td style={{minWidth:'50px', padding:'15px'}}>{formatNumber(item.precio)}</td>
                    <td style={{minWidth:'150px', padding:'5px'}}><a target="_blank" rel="noreferrer" href={"https://flotillas.grupopetromar.com/apirestflotilla/documentos/" + item.documentorefaccion}>{item.documentorefaccion}</a></td>
                    <td>{item.foliooc}</td>
					<td>{format(item.fecha)}</td>
					<td><button className='btn btn-outline-danger btn-sm' onClick={() => eliminarRefaccion(item.folio)} style={{width:'100%' }}><BsXCircleFill /></button></td>

                    
                </tr>
                
        ))}	
                        <input id='input-cotizacion' type='file' style={{display:'none'}}></input>
                </table> 

				

	 </div>
 
 

	 <div style={{ margin: 'auto' , display:'none'}} >
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
