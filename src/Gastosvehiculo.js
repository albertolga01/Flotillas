 
import React,{useState, useEffect} from 'react';  
import  {FaCheckCircle, FaTrash, FaEdit, FaRedditAlien, FaEye} from 'react-icons/fa'
import axios from 'axios'; 
import {NabvarRe} from './component/Navbar'; 
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
import './App.css'; 

import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";  
import {ThreeDots } from  'react-loader-spinner'

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

function Gastosvehiculo(props) {

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
		gastosVehiculo();
	}, [])

	async function addCarga() {
		
		var vehiculoid = document.getElementById("vehiculoid").value;
		var fechacarga = document.getElementById("fechacarga").value;
		var kilometraje = document.getElementById("kilometraje").value;
		var kilometrajefinal = document.getElementById("kilometrajefinal").value;
		var litros = document.getElementById("litros").value;
		var importe = document.getElementById("importe").value;
		
		let fd = new FormData()
			fd.append("id", "addCarga")
			fd.append("vehiculoid", vehiculoid)
			fd.append("fechacarga", fechacarga) 
			fd.append("kilometraje", kilometraje)
			fd.append("kilometrajefinal", kilometrajefinal)
			fd.append("litros", litros)
			fd.append("importe", importe)

		const res = await axios.post(process.env.REACT_APP_API_URL, fd);
		 
		notify(res.data.trim());
		if(res.data.trim() == "Carga agregada correctamente"){
			closeModal(); 

		}
	}

	async function gastosVehiculo(){
		var vehiculoid = document.getElementById("vehiculof").value;
		var fechainicio = document.getElementById("input-fecha").value;
		var fechafinal = document.getElementById("input-fecha-final").value;

		let fd = new FormData()
			fd.append("id", "gastosVehiculo")
			fd.append("vehiculoid", vehiculoid)
			fd.append("fechainicio", fechainicio)
			fd.append("fechafinal", fechafinal) 
			fd.append("userid", props.userid) 
			fd.append("tipo", props.tipo) 
			 

		const res = await axios.post(process.env.REACT_APP_API_URL, fd);
		console.log(res.data);
		setLista(res.data);

		let fd1 = new FormData()
		fd1.append("id", "gastosVehiculoServicios")
		fd1.append("vehiculoid", vehiculoid)
		fd1.append("fechainicio", fechainicio)
		fd1.append("fechafinal", fechafinal) 
			 

		const res1 = await axios.post(process.env.REACT_APP_API_URL, fd1);
		console.log(res1.data);
		setListaServicios(res1.data);
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
		const [modalIsOpen1, setIsOpen1] = React.useState(false);
	  
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
		
	  function formatNumber(importe){
		   
		return ((Number(importe)).toLocaleString('en-US', {
		  style: 'currency',
		  currency: 'USD',}));
		}

		function formatN(importe){
		   
			return ((Number(importe)).toLocaleString('en-US'));
			}
	  
  

  	const [lista, setLista] =  useState([]);  
	const [listapd, setListaPD] = useState([]);  
	const [listaservicios, setListaServicios] = useState([]);  

  
 

  useEffect(()=> {
   
  }, [])

 
  
  async function getCargasDia(){
	   
	var id = "getCargasDia";
	var fecha = document.getElementById("input-fecha").value;
	const res = await axios.get(process.env.REACT_APP_API_URL+'?id='+id+'&fecha='+fecha+'&idflotilla='+props.flotilla);
    setLista(res.data);
	setListaPD(res.data);
	console.log(res.data);

  }
 
  function filterPlacaVehiculo() {
	var tipo = document.getElementById('vehiculof').value;  
	var result = listapd.filter((x) => (x.vehiculoid === tipo)); 
	setLista(result); 
	
}

  // Dynamically create select list
  let options = [];
 

  return (
  
    <div className="container ">
    	<div className='titulos'>
			<NabvarRe departamento={props.departamento} dptoid={props.dptoid} titulo="Gastos por vehículo" className="titulos"/>   
		</div>
	

	<div style={{display:'flex',alignItems:'center',flexWrap:'wrap'}}>
		<label style={{fontSize:'14px',fontWeight:'500'}} className="label-filtro">Filtrar por fecha: </label> 
		<input id="input-fecha" type="date"  style={{width: '120px', height:'25px', fontSize: '16px', cursor: 'pointer',marginLeft:'5px'}}/>
		<input id="input-fecha-final" type="date"   style={{width: '120px', height:'25px', fontSize: '16px', cursor: 'pointer',marginLeft:'5px'}}/>
		<h6 style={{marginLeft:'15px'}} className="h6-titulo">Vehículo:</h6>	
		<select  id="vehiculof"   className="form-control"  style={{width:'45%',marginLeft:'5px'}}>
			<option value="0">Todos</option>
			{props.vehiculos.map(item => (  
				<option value={item.vehiculoid}>{item.descripcion + " " + item.modelo + " " + item.numvehiculo }</option>
			))}                             
		</select>
		<button className="btn btn-outline-success btn-sm" onClick={() => gastosVehiculo()} style={{marginLeft:'5px'}} id='boton-Buscar'>Buscar</button>
	</div>


 	<div  style={{Height:'100%', overflowY: 'scroll', width:'100%', marginTop:'10px'}}>	 
        <table id="productstable"  style={{width:'100%'}}> 
            <tr> 
                <th class="header">Vehículo</th>
				<th class="header">Fecha</th>  
                <th class="header" style={{textAlign:'center'}}>Descripción</th>
				<th class="header" style={{textAlign:'center'}}>Precio</th>   
            </tr>
            {  
            	lista.map(item => ( 
                	<tr  id="tabletr" style={{border: '2px solid #ABB2B9',fontSize:'12px'}}>
                    	<td className='id-orden' style={{border: '2px solid rgb(171,178,185)',minWidth:'80px'}} >{item.vehiculo + " " + item.modelo + " " + item.numvehiculo}</td>
						<td style={{textAlign:'center',border: '2px solid rgb(171,178,185)',minWidth:'80px'}}>{format(item.fecha)}</td>
						<td style={{border: '2px solid rgb(171,178,185)',minWidth:'150px'}}>{item.descripcion}</td>
						<td style={{textAlign:'center',border: '2px solid rgb(171,178,185)',minWidth:'80px'}}>${item.precio}</td>                                           
                	</tr>
            ))}	 
        </table>
		
		<h3>Servicios</h3>
		<table id="productstable"  style={{width:'100%'}}> 
            <tr> 
                <th class="header">Vehículo</th>
				<th class="header">Fecha</th>  
                <th class="header" style={{textAlign:'center'}}>Descripción</th>
				<th class="header" style={{textAlign:'center'}}>Precio</th>   
            </tr>
            {  
                listaservicios.map(item => ( 
                	<tr  id="tabletr" style={{border: '2px solid #ABB2B9',fontSize:'12px'}}>
                    	<td className='id-orden' style={{border: '2px solid rgb(171,178,185)',minWidth:'80px'}}>{item.vehiculo}</td>
						<td  style={{textAlign:'center',border: '2px solid rgb(171,178,185)',minWidth:'80px'}}>{format(item.fecha)}</td>
						<td style={{border: '2px solid rgb(171,178,185)',minWidth:'150px'}}>{item.descripcion}</td>
						<td style={{textAlign:'center',border: '2px solid rgb(171,178,185)',minWidth:'80px'}}>${item.precio}</td>                                           
            		</tr>
            ))}	 
        </table> 
	</div>
 
 
<br></br>
<br></br>
<br></br>
<br></br>

	
 

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

        </div>
 
 


		
       
              
    
  );   
}



 



export default Gastosvehiculo;
