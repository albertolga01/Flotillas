 
import React,{useState, useEffect} from 'react';  
import  {FaCheckCircle, FaTrash, FaEdit, FaRedditAlien, FaEye} from 'react-icons/fa'
import axios from 'axios'; 
import {NabvarRe} from './component/Navbar'; 
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
import './App.css'; 
import { BsUpload } from "react-icons/bs";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";  
import {ThreeDots } from  'react-loader-spinner'
import formatNumber from './formatNumber';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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

function Siniestros(props) {

	const [modalIsOpenArchivo, setIsOpenArchivo] = React.useState(false);
	const [listadocumentos, setListaDocumentos] =  useState([]);
	const [folioVehiculo, setFolioVehiculo] = useState([]); 

	const [modalIsOpenLoad, setIsOpenLoad] = useState(false);  
	const [listaver, setListaVer] = useState([]);
	const [modalIsOpen, setIsOpen] = useState(false);
	const [modalIsOpen1, setIsOpen1] = useState(false);
	const [lista, setLista] =  useState([]);  
	const [listapd, setListaPD] = useState([]);  

	const [listac, setListaC] = useState([]);

	function openModalLoad() { 
		setIsOpenLoad(true); 
	}  
	   
	function closeModalLoad() { 
		setIsOpenLoad(false); 
	}

	
	function openModalA() {
		setIsOpenArchivo(true);
	  }
	  function closeModalA() {
		setIsOpenArchivo(false);
	  }
	  function afterOpenModalA() {
		// references are now sync'd and can be accessed.
		subtitle.style.color = 'black';
	  }

    function notify(message){
		toast(message);
	}
    
	useEffect(()=> {
		// getCargas(); 
		 getSiniestros();
		 getChoferes();
	   }, [])
	
	   async function getDocumentos(folio){
		var id = "getDocumentos";
		setListaDocumentos([]);
		const rese = await axios.get(process.env.REACT_APP_API_URL+'?id='+id+'&folio='+folio); 
		//console.log(rese.data);
		setListaDocumentos(rese.data);    
	}

	async function addDocumento(){
		openModalLoad();
		var documento = document.getElementById("documento");
		var descripcion = document.getElementById("descripcionArhivo").value;
		let fd = new FormData() 
		fd.append("id","15")
		fd.append("Filename", descripcion);
		fd.append("tipo", "2");
		fd.append("Filedesc", descripcion);
		fd.append("IDvehiculo", folioVehiculo) 
		fd.append("file", documento.files[0]);
		
		setListaDocumentos([]);
		const res = await axios.post(process.env.REACT_APP_API_URL, fd);
		closeModalLoad();
		closeModalA();
		notify(res.data.trim());
		
	}
	async function addSiniestro() {
		
		var choferNombre = document.getElementById("choferNombre").value;
		var vehiculoid = document.getElementById("vehiculoid").value;
		var fecha = document.getElementById("fechasiniestro").value;
		var descripcion = document.getElementById("descripcion").value;
		var deducible = document.getElementById("deducible").value;
		 
		
		let fd = new FormData()
			fd.append("id", "addSiniestro")
			fd.append("idchofer",choferNombre)
			fd.append("vehiculoid", vehiculoid)
			fd.append("fecha", fecha) 
			fd.append("descripcion", descripcion) 
			fd.append("deducible", deducible) 

		const res = await axios.post(process.env.REACT_APP_API_URL, fd);
		 
		notify(res.data.trim());
		if(res.data.trim() == "Siniestro agregado correctamente"){
			closeModal();
	getSiniestros();

		}
	}
 

	let subtitle;
	
  
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

	function formatDate(date){
		var index = date.search(" ");
		date = date.substring(0, 10);
		date = date.split("-");
		var formatedDate = date[2] +"/"+ date[1] +"/"+ date[0];
		return(formatedDate);
	}

	function format(todayy){
		var today = new Date(todayy);
		var dd = String(today.getDate()).padStart(2, '0');
	  var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
	  var yyyy = today.getFullYear();
	  
	  today = dd + '/' + mm + '/' + yyyy;
	   return today;
		}


	
		async function verRendimiento(vehiculoid) {
	 
			var id = "verRendimiento";
			const res = await axios.get(process.env.REACT_APP_API_URL+'?id='+ id+'&vehiculoid='+vehiculoid);
			
			setListaVer(res.data); 
			 openModal1();
		}
		let subtitle1;
		
	  
		function openModal1() {
		  setIsOpen1(true);
		}
	  
		function afterOpenModal() {
		  // references are now sync'd and can be accessed.
		  subtitle.style.color = '#f00';
		}
	  
		function closeModal1() {
		  setIsOpen1(false);
		}
		
	 
		function formatN(importe){
		   
			return ((Number(importe)).toLocaleString('en-US'));
			}
	  

		async function getChoferes() {
			var id = "getChoferes";
			const res = await axios.get(process.env.REACT_APP_API_URL+'?id='+ id);
			setListaC(res.data);
			console.log(res.data);
		} 

		async function getSiniestros(){
			var id = "getSiniestros";
			const res = await axios.get(process.env.REACT_APP_API_URL+'?id='+id+'&idflotilla='+props.flotilla+'&tipo='+props.tipo+'&userid='+props.userid);
		
			setLista(res.data);
			setListaPD(res.data);
			console.log(res.data);

		}
		
		async function getCargasDia(){
			
			var id = "getSiniestroDia";
			var fecha = document.getElementById("input-fecha").value;
			const res = await axios.get(process.env.REACT_APP_API_URL+'?id='+id+'&fecha='+fecha+'&idflotilla='+props.flotilla);
			setLista(res.data);
			setListaPD(res.data);
			console.log(res.data);

		}
		
		function filterPlacaVehiculo() {
			var tipo = document.getElementById('vehiculof').value;  
			if(tipo == "0"){ 
				setLista(listapd);
			}else{ 
			var result = listapd.filter((x) => (x.vehiculoid === tipo)); 
			setLista(result); 
			}
		}

		function agregarDoc(folio){
			openModalA();
			setFolioVehiculo(folio);
			getDocumentos(folio);
		
		}


  // Dynamically create select list
  let options = [];
 

  return (
  
    <div className="container ">
      <div className='titulos'>
	  	<NabvarRe departamento={props.departamento} dptoid={props.dptoid} titulo="Siniestros"/>    
	  </div>

	<div className='apartado-modal'>
		{(props.tipo == "1") ? 
			<button onClick={openModal} class="btn btn-outline-success btn-sm" id='botonMulta'>Agregar Siniestro</button>
			:<></>
		}
		<Modal
        	isOpen={modalIsOpen}
        	onAfterOpen={afterOpenModal}
        	onRequestClose={closeModal}
        	style={customStyles}
        	contentLabel="Example Modal"
      	>
        	<h2 ref={(_subtitle) => (subtitle = _subtitle)} style={{color:'black'}}>Nuevo Siniestro</h2>    
			<div>Chofer</div>		  
			<input id="choferNombre" type="text" style={{width:'100%', marginTop:'5px'}}/>	 

        	<div>Vehiculo</div>
		  	<select id="vehiculoid" style={{width:'100%', marginTop:'5px'}}>
		  		{props.vehiculos.map(item => ( 
                	<option value={item.vehiculoid}>{item.descripcion + " " + item.modelo + " " + item.numvehiculo }</option>
  		  		))}
		  	</select>
		  	<div>Fecha del siniestro</div>
		  	<input id="fechasiniestro" type="date" style={{width:'100%', marginTop:'5px'}}/>
		  	<div>Descripción</div>
		  	<input  id="descripcion" type="text" style={{width:'100%', marginTop:'5px'}}/> 
		  	<div>Deducible</div>
		  	<input id="deducible" type="text" style={{width:'100%', marginTop:'5px'}}/>		      
			<br></br>
			<br></br>
			<button onClick={closeModal} class="btn btn-outline-danger btn-sm ">Cancelar</button> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
			<button onClick={() => addSiniestro()} class="btn btn-outline-success btn-sm" >Guardar</button>
      	</Modal>
	</div>

	<div className='apartado-filtro'>
		<div style={{display:'flex',alignItems:'center'}}>
			<h6 className='h6Multas' >Filtrar por fecha de siniestro:</h6>	
			<input id="input-fecha" type="date" onChange={() => getCargasDia()} style={{width: '65%', height:'25px', fontSize: '16px', cursor: 'pointer',marginLeft:'10px'}}/>
		</div>

		<div style={{display:'flex',alignItems:'center'}}>		
			<h6 className='h6Multas'>Vehículos:</h6>	
			<select  id="vehiculof"  onChange={() => filterPlacaVehiculo()} className="form-control"  style={{width:'65%', marginTop:'5px', cursor: 'pointer',marginLeft:'10px'}}>
				<option value="0">Todos</option>						
					{props.vehiculos.map(item => ( 
						<option value={item.vehiculoid}>{item.descripcion + " " + item.modelo + " " + item.numvehiculo }</option>
					))}                             
			</select>
		</div>
	</div>

 	<div  style={{ Height:'100%', overflowY: 'scroll', width:'100%', marginTop:'10px'}}> 
        <table id="productstable"  style={{width:'100%'}}> 
            <tr>
				<th class="header">Folio</th>
				<th class="header">Fecha</th>
				<th class="header">Vehículo</th>
				<th class="header">Chofer</th>
				<th class="header">Descripción</th>
				<th class="header">Deducible</th>
				<th class="header">Archivo</th>                         
            </tr>
                {  
                	lista.map(item => ( 
                    	<tr  id="tabletr" style={{border: '2px solid #ABB2B9',fontSize:'11px'}}>
                    		<td style={{border: '2px solid rgb(171,178,185)'}} className='id-orden' >{item.id}</td>
							<td style={{border: '2px solid rgb(171,178,185)'}}>{formatDate(item.fecha)}</td>
							<td style={{border: '2px solid rgb(171,178,185)'}}>{item.vehiculo  + " " + item.modelo + " " + item.numvehiculo}</td>
							<td style={{border: '2px solid rgb(171,178,185)'}}>{item.nombrechofer}</td>
                    		<td style={{border: '2px solid rgb(171,178,185)'}}>{item.descripcion}</td>
                    		<td style={{border: '2px solid rgb(171,178,185)'}}>{formatNumber(item.deducible)}</td>
							<td ><button style={{width:'100%'}} className='btn btn-outline-primary btn-sm' onClick={() => agregarDoc(item.vehiculoid)}><BsUpload /></button></td>                     
                    		<td></td>                    
                		</tr>                
        		))}	
                <input id='input-cotizacion' type='file' style={{display:'none'}}></input>
        </table> 
	</div>
 
 

	
 

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
            
				<Modal
        isOpen={modalIsOpen1}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal1}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <label ref={(_subtitle) => (subtitle = _subtitle)} style={{color:'black', fontSize:'32px'}}>Historial de Redimiento</label>
        <br></br>
        <br></br>
		<table id="productstable"  style={{width:'900px'}}> 
		<tr>
                        <th class="header">Folio</th>
                        <th class="header">Vehiculo</th>
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
			isOpen={modalIsOpenArchivo}
			onAfterOpen={afterOpenModalA}
			onRequestClose={closeModalA}
			style={customStyles}
			contentLabel="Example Modal"
		>
			<h2 ref={(_subtitle) => (subtitle = _subtitle)} style={{color:'black'}}>Agregar Archivo</h2> 

			<div>Archivo:</div>
			<input id="documento" type="file" style={{display: "none"}}></input>
			<input type="button"  style={{width:'100%' }} id="documento" class="btn btn-outline-success btn-sm" value="Elegir archivo" onClick={() => {document.getElementById('documento').click()}}></input>

			<div>Descripción:</div>
			<input id="descripcionArhivo" type="text"  style={{width:'100%', marginTop:'5px'}}/>
			<tr > 
							<th class="header">Folio</th>
							<th class="header">Descripción</th> 
							<th class="header">Documento</th> 
							  
						</tr>
			{ listadocumentos.map(item => ( 
							 
							 <tr id="tabletr" style={{  fontSize:'13.5px', border: '2px solid #ABB2B9'}}>
								  
								 <td  align='center' className='id-orden'>{item.folio}</td>
								 <td  align='center' className='id-orden'>{item.descripcion}</td>
								 <td  align='center' className='id-orden'><a target="_blank" rel="noreferrer" href={"https://flotillas.grupopetromar.com/apirestflotilla/documentos/" + item.documento}>{item.documento}</a></td>
							   
								 
							 </tr> 
							 ))}	
			
			
		<br></br>
		<br></br>
			<button onClick={closeModalA} class="btn btn-outline-danger btn-sm " style={{ height:'45px'}}>Cancelar</button> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
			<button onClick={() => addDocumento()} class="btn btn-outline-success btn-sm"  style={{ height:'45px'}}>Guardar</button>
		</Modal>

        </div>
 
 


		
       
              
    
  );   
}



 



export default Siniestros;
