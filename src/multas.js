 
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

function Multas(props) {


	const columns = [
		{
			name: 'Folio',  
			selector: row => row.id,
			sortable: true,
		},
		{
			name: 'Fecha Multa',  
			selector: row => formatDate(row.fechamulta),
			sortable: true,
		},
		{
			name: 'Chofer',  
			selector: row => row.nombrechofer,
			sortable: true,
		},
		{
			name: 'Vehículo',  
			selector: row => row.vehiculo + " " + row.modelo +" "+ row.numvehiculo,
			sortable: true,
		},
		{
			name: 'Descripción',  
			selector: row => row.descripcion,
			sortable: true,
		},
		{
			name: 'Importe',  
			selector: row => formatNumber(row.importe),
			sortable: true,
		}, 
	];

	
	const tableCustomStyles = {
		headCells: {
		  style: {
			fontSize: '15px',
			fontWeight: 'bold', 
			backgroundColor: '#e5e5e5'
		  },
		},
	  }


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

    function notify(message){
		toast(message);
	}
    
    
	useEffect(() => { 
		getChoferes();
		getMultas();

	}, [])

	async function addMulta() {
		
		var choferNombre = document.getElementById("choferNombre").value;
		var vehiculoid = document.getElementById("vehiculoid").value;
		var fechamulta = document.getElementById("fechamulta").value; 
		var descripcionMulta = document.getElementById("descripcionMulta").value;
		var importe = document.getElementById("importe").value;
		
		let fd = new FormData()
			fd.append("id", "addMulta")
			fd.append("idchofer",choferNombre)
			fd.append("vehiculoid", vehiculoid)
			fd.append("fechamulta", fechamulta)  
			fd.append("descripcionMulta", descripcionMulta)
			fd.append("importe", importe)

		const res = await axios.post(process.env.REACT_APP_API_URL, fd);
		 
		notify(res.data.trim());
		if(res.data.trim() == "Multa agregada correctamente"){
			closeModal();
  getMultas()

		}
	}

 
 
	async function getChoferes() {
		var id = "getChoferes";
		const res = await axios.get(process.env.REACT_APP_API_URL+'?id='+ id);
		setListaC(res.data);
		console.log(res.data);
	} 
    
	let subtitle;
	
  
	function openModal() {
	  setIsOpen(true);
	}
  
	function afterOpenModal() {
	  // references are now sync'd and can be accessed.
	  //subtitle.style.color = '#f00';
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

	function formatDate(date){
			var index = date.search(" ");
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
		
	  
		function openModal1() {
		  setIsOpen1(true);
		}
	  
		function afterOpenModal() {
		  // references are now sync'd and can be accessed.
		 // subtitle.style.color = '#f00';
		}
	  
		function closeModal1() {
		  setIsOpen1(false);
		}
		
	   

		function formatN(importe){
		   
			return ((Number(importe)).toLocaleString('en-US'));
			}
	  
  
 
 

  async function getMultas(){
	var id = "getMultas";
	const res = await axios.get(process.env.REACT_APP_API_URL+'?id='+id+'&idflotilla='+props.flotilla+'&tipo='+props.tipo+'&userid='+props.userid);
 
	setLista(res.data);
	setListaPD(res.data);
	console.log(res.data);

  }
  
  async function getCargasDia(){
	   
	var id = "getMultaDia";
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

function filterPlacaChofer() {
	var tipo = document.getElementById('choferf').value;  
	if(tipo == "0"){ 
		setLista(listapd);
	}else{ 
	var result = listapd.filter((x) => (x.idchofer === tipo)); 
	setLista(result); 
	}
}

  // Dynamically create select list
  let options = []; 
 

  return (
  
    <div className="container ">
     <div className='titulos'>
	 	<NabvarRe departamento={props.departamento} dptoid={props.dptoid} titulo="Multas"/>    
	 </div>

	<div className='apartado-modal'>
		{(props.tipo == "1") ? 
			<button onClick={openModal} class="btn btn-outline-success btn-sm" id='botonMulta'>Agregar Multa</button>
			:<></>
		}	
		<Modal
        	isOpen={modalIsOpen}
        	onAfterOpen={afterOpenModal}
        	onRequestClose={closeModal}
        	style={customStyles}
        	contentLabel="Example Modal"
    	>
        	<h2 ref={(_subtitle) => (subtitle = _subtitle)} style={{color:'black'}}>Multa</h2>
        	<div>Chofer</div>
			<input id="choferNombre" type="text" style={{width:'100%', marginTop:'5px'}}/>
		   
        	<div>Vehículo</div>
		  	<select id="vehiculoid" style={{width:'100%', marginTop:'5px'}}>
		  		{props.vehiculos.map(item => ( 
                     <option value={item.vehiculoid}>{item.descripcion + " " + item.modelo + " " + item.numvehiculo }</option>
  		  		))}
		  	</select>

		  	<div>Fecha de multa</div>
		  	<input id="fechamulta" type="date" style={{width:'100%', marginTop:'5px'}}/>
		  	<div>Descripción</div>
		  	<input  id="descripcionMulta" type="text" style={{width:'100%', marginTop:'5px'}}/> 
		  	<div>Importe</div>
		  	<input id="importe" type="number" style={{width:'100%', marginTop:'5px'}} />		  
			<br></br>
			<br></br>
			<button style={{width:'45%', marginLeft:'20px'}} onClick={closeModal} class="btn btn-outline-danger btn-sm ">Cancelar</button>  
			<button style={{width:'45%', marginLeft:'25px'}} onClick={() => addMulta()} class="btn btn-outline-success btn-sm" >Guardar</button>
      	</Modal>
	</div>

	<div className='apartado-filtro'>
		<div style={{display:'flex',alignItems:'center'}}>
			<h6 className='h6Multas' >Filtrar por fecha de multa:</h6>	
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

		<div style={{display:'flex',alignItems:'center'}}>
			<h6 className='h6Multas'>Chofer:  </h6>
			<select  id="choferf"  onChange={() => filterPlacaChofer()} className="form-control"  style={{width:'65%', marginTop:'5px', cursor: 'pointer',marginLeft:'10px'}}>
		 		<option value="0">Todos</option>			
			 		{listac.map(item => ( 
				 		<option value={item.id}>{item.nombre}</option>
 					))} 
			</select>
		</div>
		
	</div>
 	<div  style={{maxHeight:'22vmax', overflowY: 'scroll', width:'100%', marginTop:'10px'}}> 
	 <DataTableExtensions
					columns={columns}
					data={lista}
					print={true}
					export={true} 
					>
							<DataTable
										columns={columns}
										data={lista}
										fixedHeader={true}
										fixedHeaderScrollHeight={'100%'}
										pagination
										customStyles={tableCustomStyles}
										highlightOnHover={true}
									
									/>
				</DataTableExtensions>

		<table id="productstable"  style={{width:'100%'}} hidden> 
        	<tr >
            	<th class="header">Folio</th>
                <th class="header">Fecha Multa</th>
                <th class="header">Chofer</th> 
                <th class="header">Vehículo</th> 
                <th class="header">Descripcion</th>
                <th class="header">Importe</th> 
            </tr>

            	{  
                	lista.map(item => ( 
						<tr id="tabletr" style={{border: '2px solid #ABB2B9',fontSize:'11px'}}>
							<td style={{border: '2px solid rgb(171,178,185)'}} className='id-orden' >{item.id}</td>
							<td style={{border: '2px solid rgb(171,178,185)'}}>{formatDate(item.fechamulta)}</td>
							<td style={{border: '2px solid rgb(171,178,185)'}}>{item.nombrechofer}</td>
							<td style={{border: '2px solid rgb(171,178,185)'}}>{item.vehiculo  + " " + item.modelo + " " + item.numvehiculo}</td>   
							<td style={{border: '2px solid rgb(171,178,185)'}}>{item.descripcion}</td> 
							<td style={{border: '2px solid rgb(171,178,185)'}}>{formatNumber(item.importe)}</td>                      
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
        <label ref={(_subtitle) => (subtitle = _subtitle)} style={{color:'black', fontSize:'32px'}}>Historial de Multas</label>
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
						<td>{formatDate(item.fechacarga)}</td>
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

        </div>
 
 


		
       
              
    
  );   
}



 



export default Multas;
