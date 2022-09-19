 
import React,{useState, useEffect} from 'react';  
import  {FaCheckCircle, FaTrash, FaEdit, FaRedditAlien, FaEye} from 'react-icons/fa'
import axios from '../node_modules/axios'; 
import {NabvarRe} from './component/Navbar'; 
import Modal from 'react-modal';
import './App.css'; 
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
function Seguros(props) {
 
 
	const [couno, setCouno] =  useState([]);  
	const [codos, setCodos] =  useState([]);  
	const [cotres, setCotres] =  useState([]);  
	const [listav, setListaV] =  useState([]); 
	const [listap, setListaP] = useState([]);  
	const [listapv, setListaPV] = useState([]);
	const [listaver, setListaVer] = useState([]);
  const [lista, setLista] =  useState([]);  
  const [value, setValue] = useState([]); 
  let id = 0; 
  let tipo = 0; 
  

  useEffect(() => {
	getPlacas();
}, [])
useEffect(() => {
	getPlacasV();
}, [])

async function getPlacas() {
	var id = "getSeguros";
	const res = await axios.get('https://flotillas.grupopetromar.com/apirestflotilla/?id=' + id);
	setListaP(res.data);
	console.log(res.data);
}
async function getPlacasV() {
	var id = "getSegurosProximo";
	const res = await axios.get('https://flotillas.grupopetromar.com/apirestflotilla/?id=' + id);
	setListaPV(res.data);
	console.log(res.data);
}

  useEffect(()=> {
    getVehiculos();
  }, [])

  async function getVehiculos(){
	var id = "11";
	const res = await axios.get('https://flotillas.grupopetromar.com/apirestflotilla/?id='+id);
	setListaV(res.data);
	//console.log(res.data);

  }

  async function addSeguro() {
		
	var vehiculoid = document.getElementById("vehiculoid").value;
	var noseguro = document.getElementById("noseguro").value;
	var compania = document.getElementById("compania").value;
	var fechainicial = document.getElementById("fechainicial").value;
	var fechafinal = document.getElementById("fechafinal").value; 
	
	let fd = new FormData()
		fd.append("id", "addSeguro")
		fd.append("vehiculoid", vehiculoid)
		fd.append("noseguro", noseguro) 
		fd.append("compania", compania) 
		fd.append("fechainicial", fechainicial)
		fd.append("fechafinal", fechafinal)

	const res = await axios.post('https://flotillas.grupopetromar.com/apirestflotilla/', fd);
	 
	alert(res.data.trim());
	if(res.data.trim() == "Placa agregada correctamente"){
	 
		 // getPlacas()

	}
}
   
async function verSeguro(vehiculoid) {
	 
	var id = "verSeguro";
	const res = await axios.get('https://flotillas.grupopetromar.com/apirestflotilla/?id=' + id+'&vehiculoid='+vehiculoid);
	
	setListaVer(res.data); 
	 openModal();
}


function format(todayy){
	var today = new Date(todayy);
	var dd = String(today.getDate()).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  var yyyy = today.getFullYear();
  
  today = dd + '/' + mm + '/' + yyyy;
   return today;
	}
	function dias(fechafinal){
		var today = new Date();
		var vencimiento = new Date(fechafinal);
		var diffDays = parseInt((vencimiento - today) / (1000 * 60 * 60 * 24), 10); 
		return diffDays + " dias";
	}
	function estado(fechafinal){
		var today = new Date();
		var vencimiento = new Date(fechafinal);
		 
		if(vencimiento > today){
			return "Vigente";
		}else{
			return "Vencido";
		}
	 
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


    

  useEffect(()=> {
    getUsuarios();
  }, [])
    

  async function getUsuarios(){
    var id = "2";
    const rese = await axios.get('https://flotillas.grupopetromar.com/apirestflotilla/?id='+id); 
    // console.log(rese.data);
    setValue(rese.data);    
  }

   

 
  // Dynamically create select list
  let options = [];
 

  return (
  
    <div className="container ">
    <NabvarRe titulo="Seguros"/>    
<div className="row p-3">
	<div style={{width:'30%', height:'350px', overflowY:'scroll'}}>
<div className="card p-2 mt-2 border-secondary"   >
      <h5>Seguro</h5>    
        
 
		<select  id="vehiculoid"  className="form-control"  style={{width:'100%', marginTop:'5px'}}>
						{listav.map(item => ( 
									<option value={item.vehiculoid}>{item.descripcion + " -" + item.vehiculoid}</option>

						))}
						</select>
						<br></br>
      <input id="noseguro" placeholder="No Seguro" className="form-control"></input>
      <br></br>
	  <input id="compania" placeholder="Compañia" className="form-control" type="password "></input>
	  <br></br>
      <input id="fechainicial" placeholder="Fecha Alta" className="form-control" type="password "></input>
	  <br></br>
      <input id="fechafinal" placeholder="Fecha Vencimiento" className="form-control" type="password "></input>
      <br></br> 
      <button  className="btn btn-outline-success btn-sm" 	 onClick={() => addSeguro()} >Agregar <FaCheckCircle /></button> 
    </div> 
	</div>

	<div style={{ width: '70%' }}>
					<form className="card p-2 mt-2 border-secondary" encType="multipart/form-data"  style={{ height:'230px'}}>
						<h5>Historial de seguros</h5>
						<table id="productstable"  style={{width:'100%'}}> 
                    <tr> 
                        <th>Vehiculo</th>
                        <th>No. Seguro</th>
                        <th>Compañia</th>
                        <th>Fecha</th>
                        <th>Vencimiento</th> 
                        <th>Estado</th> 
                    </tr>
					{  
                    listap.map(item => ( 
                     <tr>
                    <td className='id-orden' >{item.vehiculo}</td>
                    <td className='id-orden' >{item.noseguro}</td>
                    <td className='id-orden' >{item.compania}</td>
                    <td>{format(item.fechainicial)}</td>
                    <td>{format(item.fechafinal)}</td>  
                    <td>{estado(item.fechafinal)}</td>  
                    
                </tr>
                
        ))}	

                    
                        <input id='input-cotizacion' type='file' style={{display:'none'}}></input>
                </table> 
					</form>

					<div style={{ width: '100%' }}>
					<div className="card p-2 mt-2 border-secondary"  style={{ height:'110px', overflow:'scroll'}}>
						<h5>Proximo a vencer (6 meses)</h5>
						<table id="productstable"  style={{width:'100%'}}> 
                    <tr>
					<th>Vehiculo</th>
                        <th>No. Seguro</th>
                        <th>Compañia</th>
                        <th>Fecha</th>
                        <th>Vencimiento</th>
                        <th>Restante</th>
                    </tr>
					{listapv.map(item => ( 
                     <tr>
                    <td className='id-orden' >{item.vehiculo}</td>
                    <td className='id-orden' >{item.noseguro}</td>
                    <td className='id-orden' >{item.compania}</td>
                    <td>{format(item.fechainicial)}</td>
                    <td>{format(item.fechafinal)}</td>  
                    <td>{dias(item.fechafinal)}</td>  
                    
                </tr>
                
        ))}	
                   
                        <input id='input-cotizacion' type='file' style={{display:'none'}}></input>
                </table> 
					</div>
				</div>
				</div>

	


	<div  style={{maxHeight:'22vmax', overflowY: 'scroll', width:'100%'}}>
  
 
    
				</div>


                <div   style={{margin:'auto'}} >  
		

		<div style={{position: 'absolute', bottom:'10px',  backgroundColor:'white', border:'2px solid black', borderRadius:'5px', width:'80%', margin:'auto', padding:'5px'}}>
		<div className="d-flex flex-row" style={{overflowX:'scroll'}} >
		{ listav.map(item => (
			
            <div className="card p-2 mt-2 border-secondary" key={item.id} style={{width:'15%', marginLeft:'15px', minWidth:'15%'}}>
               
              <div>
            <b><label ></label></b> <label className="text-primary">{item.descripcion + " -"+ item.vehiculoid}</label> &nbsp;&nbsp; 
		 
			{(item.icon == null)  ?
										<img src={'http://flotillas.grupopetromar.com/default.jpg'} style={{ height: '100px', width: '140px' }}></img>  
										:
										<img src={'http://flotillas.grupopetromar.com/apirestflotilla/Vehiculos/'+item.icon} style={{ height: '100px', width: '140px' }}></img> 
										 }
                  </div>  
                       
                       <button  className="btn btn-outline-success btn-sm" 
                           onClick={() => verSeguro(item.vehiculoid)} ><FaEye /> ver
                           </button>  
                      
              </div>        
			  
			  
            ))}  
			</div>
		 
	 
        </div>
		 
		
		</div>
  

        </div>
		<Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <label ref={(_subtitle) => (subtitle = _subtitle)} style={{color:'black', fontSize:'32px'}}>Historial de Seguros</label>
        <br></br>
        <br></br>
		<table id="productstable"  style={{width:'500px'}}> 
                    <tr> 
                        <th>Vehiculo</th>
                        <th>No. Seguro</th>
                        <th>Compañia</th>
                        <th>Fecha</th>
                        <th>Vencimiento</th>  
                        <th>Estado</th>  
                    </tr>

                    {  
                    listaver.map(item => ( 
                     <tr>
                    <td className='id-orden' >{item.vehiculo}</td>
					<td>{item.noseguro}</td>
					<td>{item.compania}</td>
                    <td>{format(item.fechainicial)}</td>
                    <td>{format(item.fechafinal)}</td>
                    <td>{estado(item.fechafinal)}</td>
                   
                    
                </tr>
                
        ))}	
		</table>
        
<br></br>
<br></br>
		<button onClick={closeModal} class="btn btn-outline-danger btn-sm ">Cancelar</button> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
     </Modal>
 
      </div>
       
              
    
  );   
}



 



export default Seguros;
