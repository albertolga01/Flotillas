 
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

function Rendimiento(props) {

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
  getCargas()

		}
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
  
 

  useEffect(()=> {
    getCargas();
  }, [])

  async function getCargas(){
	var id = "getCargas";
	const res = await axios.get(process.env.REACT_APP_API_URL+'?id='+id);
 
	setLista(res.data);
	
	console.log(res.data);

  }
  
  async function getCargasDia(){
	   
	var id = "getCargasDia";
	var fecha = document.getElementById("input-fecha").value;
	const res = await axios.get(process.env.REACT_APP_API_URL+'?id='+id+'&fecha='+fecha);
    setLista(res.data);
	
	console.log(res.data);

  }
 
 
  // Dynamically create select list
  let options = [];
 

  return (
  
    <div className="container ">
     
<NabvarRe departamento={props.departamento} dptoid={props.dptoid} titulo="Rendimiento"/>    
<div style={{display:'flex', flexDirection:'row', width:'100%'}}>


     
	 
<div style={{width:'100%'}}>
<label>Filtrar por fecha de compra: </label> 

&nbsp;&nbsp;&nbsp;<input id="input-fecha" type="date" onChange={() => getCargasDia()} style={{width: '12vw', fontSize: '12px', cursor: 'pointer'}}/>
</div>
<div style={{width:'100%'}} align="right">
<button onClick={openModal} class="btn btn-outline-success btn-sm">Nueva carga</button>
      
		  <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <h2 ref={(_subtitle) => (subtitle = _subtitle)} style={{color:'black'}}>Nueva carga</h2>
        
        <div>Vehiculo</div>
		  <select id="vehiculoid" style={{width:'100%', marginTop:'5px'}}>
		  {listav.map(item => ( 
                     <option value={item.vehiculoid}>{item.descripcion + " -" + item.vehiculoid}</option>

  		  ))}
		  </select>
		  <div>Fecha de carga</div>
		  <input id="fechacarga" type="date" style={{width:'100%', marginTop:'5px'}}/>
		  <div>Kilometraje inicial</div>
		  <input  id="kilometraje" type="number" style={{width:'100%', marginTop:'5px'}}/>
		  <div>Kilometraje final</div>
		  <input  id="kilometrajefinal" type="number" style={{width:'100%', marginTop:'5px'}}/>
		  <div>Litros</div>
		  <input id="litros" type="number" style={{width:'100%', marginTop:'5px'}}/>
		  <div>Importe</div>
		  <input id="importe" type="number" style={{width:'100%', marginTop:'5px'}} />
		  
        
<br></br>
<br></br>
		<button onClick={closeModal} class="btn btn-outline-danger btn-sm ">Cancelar</button> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
		<button onClick={() => addCarga()} class="btn btn-outline-success btn-sm" >Guardar</button>
      </Modal>
	  </div>
	  </div>
 <div  style={{maxHeight:'22vmax', overflowY: 'scroll', width:'100%', marginTop:'10px'}}>
                <table id="productstable"  style={{width:'100%'}}> 
                    <tr>
                        <th>Folio</th>
                        <th>Vehiculo</th>
                        <th>Fecha Carga</th>
                        <th>Litros</th>
                        <th>Importe</th>
                        <th>Kilometraje Inicial</th>
                        <th>Kilometraje Final</th>
                        <th>Rendimiento</th> 
                    </tr>

                    {  
                    lista.map(item => ( 
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
                        <input id='input-cotizacion' type='file' style={{display:'none'}}></input>
                </table> 
	 </div>
 
 

	
 

	 <div style={{ margin: 'auto' }} >
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
                        <th>Folio</th>
                        <th>Vehiculo</th>
                        <th>Fecha Carga</th>
                        <th>Litros</th>
                        <th>Importe</th>
                        <th>Kilometraje Inicial</th>
                        <th>Kilometraje Final</th>
                        <th>Rendimiento</th> 
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



 



export default Rendimiento;
