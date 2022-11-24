 
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

function Listavehiculos(props) {

	function openModalLoad() { 
		setIsOpenLoad(true); 
	}  
	   
	function closeModalLoad() { 
		setIsOpenLoad(false); 
	}

    function notify(message){
		toast(message);
	}
    
    const [modalIsOpenLoad, setIsOpenLoad] = useState(false);

	const [listav, setListaV] = useState([]);
	
	const [listaver, setListaVer] = useState([]);
	useEffect(() => {
		getVehiculos();
	}, [])

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
		 
		/*if(res.data.trim() == "Refacción agregada correctamente"){
			closeModal();
  getRefacciones()

		}*/
		getRefacciones();
	}

 

	async function getVehiculos() {
		var id = "11";
		openModalLoad();
		const res = await axios.get(process.env.REACT_APP_API_URL+'?id=' + id);
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
  
 

  useEffect(()=> {
    getRefacciones();
  }, [])

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

 
 
  // Dynamically create select list
  let options = [];
 

  return (
  
    <div className="container ">
     
<NabvarRe departamento={props.departamento} dptoid={props.dptoid} titulo="Vehículos"/>    
<div style={{display:'flex', flexDirection:'row', width:'100%'}}>


     
	 
<div style={{width:'100%'}} align="right"> 
		  <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <h2 ref={(_subtitle) => (subtitle = _subtitle)} style={{color:'black'}}>Nueva Refacción</h2>
        
        <div>Vehiculo</div>
		  <select id="vehiculoid" style={{width:'100%', marginTop:'5px'}}>
		  {listav.map(item => ( 
                     <option value={item.vehiculoid}>{item.descripcion + " -" + item.vehiculoid}</option>

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
 <div  style={{  overflowY: 'scroll', width:'100%', marginTop:'10px'}}>
                <table id="productstable"  style={{width:'100%'}}> 
                    <tr>
                        <th>Folio</th>
                        <th>Vehículo</th>
                        <th>Modelo</th> 
                        <th>Responsable</th> 
                        <th>Serie Vehículo</th>
                        <th>Serie Motor</th>
                        <th>Tipo Uso</th> 
                        <th>Empresa</th>
                        <th>Placa</th>
                        <th>Gps</th>
                        <th>Número Vehículo</th>
                        <th>Foto</th>
                        <th>PerNota</th>

                    </tr>

                    {  
                    listav.map(item => ( 
                     <tr id="tabletr" style={{border: '2px solid #ABB2B9'}}>
                    <td className='id-orden' >{item.vehiculoid}</td>
                    <td>{item.descripcion}</td>
                    <td>{item.modelo}</td>
                    <td>{item.responsable}</td>
                    <td>{item.serievehiculo}</td>
                    <td>{item.seriemotor}</td>
                    <td>{item.tipouso}</td>
                    <td>{item.empresa}</td>
                    <td>{item.placas}</td>
                    <td>{item.gps}</td>
                    <td>{item.numvehiculo}</td>
                    <td><a target="_blank" rel="noreferrer" href={"https://flotillas.grupopetromar.com/apirestflotilla/Vehiculos/" + item.icon}>{item.icon}</a></td>
					<td>-----</td>

                    
                </tr>
                
        ))}	
                        <input id='input-cotizacion' type='file' style={{display:'none'}}></input>
                </table> 
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
                        <th>Folio</th>
                        <th>Fecha Compra</th>
                        <th>Fecha Captura</th>
                        <th>Vehiculo</th>
                        <th>Refacción</th>  
                        <th>Descripción</th>  
                        <th>Precio</th>  
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



 



export default Listavehiculos;
