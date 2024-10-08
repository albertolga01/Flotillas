 
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
//import DataTable from 'react-data-table-component';

import DataTable from "react-data-table-component-footer";




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
	const [total, setTotal] = useState(0); 
	const [totalServicios, setTotalServicios] = useState(0); 

	const [lista, setLista] =  useState([]);  


	const columns = [
		{
			name: 'Vehiculo',  
			cell: row => row.vehiculo,
			sortable: true,
		},
		{
			name: 'Fecha',  
			cell: row => format(row.fecha),
			//sortable: true,
		},
		{
			name: 'Descripción',  
			cell: row => row.descripcion,
			sortable: true,
		},
		{
			name: 'Precio',  
			cell:  (row) => row.precio,
			//format: (row) => formatNumber(row.precio),s
			sortable: true,
			sum: true
		},

		
	];
	const totalSum = () => {
		let x = 0;  
		if(lista.length > 0){
			x = lista.map(datum => datum.precio).reduce((a, b) => a + b)
		} 
		return x;
		;
	  };
	const footer = {
		
		vehiculo: "",
		fecha: "", 
		descripcion: "",
		precio: formatNumber(total)
		
	  };

	 

	  
	
	const columns1 = [
		{
			name: 'Vehiculo',  
			cell: row => row.vehiculo,
			sortable: true,
		},
		{
			name: 'Fecha',  
			cell: row => format(row.fecha),
			//sortable: true,
		},
		{
			name: 'Descripción',  
			cell: row => row.descripcion,
			sortable: true,
		},
		{
			name: 'Precio',  
			cell:  (row) => row.precio,
			//selector: row => formatNumber(row.precio),
			sortable: true,
		},
	];

	const footer1 = {
		
		vehiculo: "",
		fecha: "",
		descripcion: "",
		precio: formatNumber(totalServicios)
		
	  };
	
	
	const tableCustomStyles = {
		headCells: {
		  style: {
			fontSize: '15px',
			fontWeight: 'bold', 
			backgroundColor: '#e5e5e5'
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
		gastosVehiculo();
	}, [])
 
	async function gastosVehiculo(){
		setTotal(0);
		setTotalServicios(0);
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
			 
			openModalLoad();
		const res = await axios.post(process.env.REACT_APP_API_URL, fd);
		console.log(res.data);
		setLista(res.data);
 
		
		setTotal(res.data.map(datum => Number(datum.precio)).reduce((a, b) => a + b, 0));



		let fd1 = new FormData()
		fd1.append("id", "gastosVehiculoServicios")
		fd1.append("vehiculoid", vehiculoid)
		fd1.append("fechainicio", fechainicio)
		fd1.append("fechafinal", fechafinal) 
		fd1.append("userid", props.userid) 
		fd1.append("tipo", props.tipo)        
			                    

		const res1 = await axios.post(process.env.REACT_APP_API_URL, fd1);
		console.log(res1.data);
		setListaServicios(res1.data);
		setTotalServicios(res1.data.map(datum => Number(datum.precio)).reduce((a, b) => a + b, 0));
		closeModalLoad();
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
		
	 

		function formatN(importe){
		   
			return ((Number(importe)).toLocaleString('en-US'));
			}
	  
  

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
								footer={footer}
                                fixedHeader={true}
                                fixedHeaderScrollHeight={'100%'}
								noHeader
                                pagination
                                customStyles={tableCustomStyles}
                                highlightOnHover={true}
								noDataComponent={"No se encontró información"}

                               
                            />
         </DataTableExtensions>


        <table id="productstable"  style={{width:'100%'}} hidden> 
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
						<td style={{textAlign:'center',border: '2px solid rgb(171,178,185)',minWidth:'80px'}}>{formatNumber(item.precio)}</td>                                           
                	</tr>
            ))}	 
        </table>
		
		<h3>Servicios</h3>
		<DataTableExtensions
                columns={columns1}
                data={listaservicios}
                print={true}
                export={true}
				filterPlaceholder="Filtrar" 

                
                >
                    <DataTable
                                columns={columns}
                                data={listaservicios}
                                fixedHeader={true}
								footer={footer1}
                                fixedHeaderScrollHeight={'100%'}
                                pagination
                                customStyles={tableCustomStyles}
                                highlightOnHover={true}
								noDataComponent={"No se encontró información"}

                               
                            />
                </DataTableExtensions>

		<table id="productstable"  style={{width:'100%'}} hidden> 
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
