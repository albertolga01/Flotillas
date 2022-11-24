 
import React,{useState, useEffect} from 'react';  
import  {FaCheckCircle, FaTrash, FaEdit, FaRedditAlien, FaEye} from 'react-icons/fa'
import axios from '../node_modules/axios'; 
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


	async function verRefeccion(vehiculoid) {
	 
		var id = "verRefacciones";
		openModalLoad();
		const res = await axios.get(process.env.REACT_APP_API_URL+'?id='+ id+'&vehiculoid='+vehiculoid);
		closeModalLoad();
		setListaVer(res.data); 
		 openModal1();
	}

	async function getVehiculos() {
		var id = "11";
		const res = await axios.get(process.env.REACT_APP_API_URL+'?id='+ id);
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
     
<NabvarRe departamento={props.departamento} dptoid={props.dptoid} titulo="Refacciones"/>    
<div style={{display:'flex', flexDirection:'row', width:'100%'}}>


     
	 
<div style={{width:'100%'}}>
<label>Filtrar por fecha de compra: </label> 

&nbsp;&nbsp;&nbsp;<input id="input-fecha" type="date" onChange={() => getRefaccionesDia()} style={{width: '120px', height:'25px', fontSize: '16px', cursor: 'pointer'}}/>
</div>
<div style={{width:'100%'}} align="right">
<button onClick={openModal} class="btn btn-outline-success btn-sm">Nueva refacción</button>
      
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
 <div  style={{maxHeight:'22vmax', overflowY: 'scroll', width:'100%', marginTop:'10px'}}>
                <table id="productstable"  style={{width:'100%'}}> 
                    <tr>
                        <th>Folio</th>
                        <th>Fecha Compra</th>
                        <th>Fecha Captura</th>
                        <th>Vehiculo</th>
                        <th>Proveedor</th>
                        <th>Refacción</th>
                        <th>Descripcion</th> 
                        <th>Precio</th>
                        <th>Documento</th>

                    </tr>

                    {  
                    lista.map(item => ( 
                     <tr  id="tabletr" style={{border: '2px solid #ABB2B9'}}>
                    <td className='id-orden' >{item.folio}</td>
                    <td>{format(item.fechacompra)}</td>
                    <td>{format(item.fecha)}</td>
                    <td>{item.vehiculo}</td>
                    <td>{item.proveedor}</td>
                    <td>{item.refaccion}</td>
                    <td>{item.descripcion}</td>
                    <td>{formatNumber(item.precio)}</td>
                    <td><a target="_blank" rel="noreferrer" href={"https://flotillas.grupopetromar.com/apirestflotilla/documentos/" + item.documentorefaccion}>{item.documentorefaccion}</a></td>

                    
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



 



export default Refacciones;
