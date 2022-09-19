import React from 'react';

export  const Nabvar = (props) =>(
<div className="m-2">
  <nav style={{borderRadius:'5px', border:'2px solid #0071ce',backgroundColor:'white', position: 'relative', display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
  justifyContent: 'space-between',
  paddingTop: '.3rem',
  paddingBottom: '.3rem'}}>
  <label style={{marginLeft:'15px', color:'#0071ce', fontFamily: "'Roboto', Sans-Serif", fontSize:'16px', fontWeight:'bold'}}> Firmas</label>
  <label style={{marginRight:'15px', color:'#0071ce', fontFamily: "'Roboto', Sans-Serif", fontSize:'16px', fontWeight:'bold'}}>{props.departamento}</label>
  </nav>
</div>

)



export  const NabvarP = (props) =>(
  <div className="m-2">
    <nav style={{borderRadius:'5px', border:'2px solid #0071ce',backgroundColor:'white', position: 'relative', display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: '.3rem',
    paddingBottom: '.3rem'}}>
    <label style={{marginLeft:'15px', color:'#0071ce', fontFamily: "'Roboto', Sans-Serif", fontSize:'16px', fontWeight:'bold'}}> Proveedores</label>
    <label style={{marginRight:'15px', color:'#0071ce', fontFamily: "'Roboto', Sans-Serif", fontSize:'16px', fontWeight:'bold'}}>{props.departamento}</label>
    </nav>
  </div>
  
  ) 

export  const Nabvar2 = (props) =>(
  <div  className="m-2">
    <nav style={{borderRadius:'5px', border:'2px solid #0071ce',backgroundColor:'white', position: 'relative', display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
  justifyContent: 'space-between',
  paddingTop: '.3rem',
  paddingBottom: '.3rem'}}>
    <label style={{marginLeft:'15px', color:'#0071ce', fontFamily: "'Roboto', Sans-Serif", fontSize:'16px', fontWeight:'bold'}}> Usuarios {props.departamento}</label>
    <label style={{marginRight:'15px', color:'#0071ce', fontFamily: "'Roboto', Sans-Serif", fontSize:'16px', fontWeight:'bold'}}>{props.departamento}</label>
    </nav>
  </div>
  
  ) 

  export  const NabvarRe = (props) =>(
    <div className="m-2">
      <nav  style={{borderRadius:'5px', border:'2px solid #0071ce',backgroundColor:'white', position: 'relative', display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: '.3rem',
    paddingBottom: '.3rem'}}>
        <label style={{marginLeft:'15px', color:'#0071ce', fontFamily: "'Roboto', Sans-Serif", fontSize:'16px', fontWeight:'bold'}}> {props.titulo} </label>
        <label style={{marginRight:'15px', color:'#0071ce', fontFamily: "'Roboto', Sans-Serif", fontSize:'16px', fontWeight:'bold'}}>{props.departamento}</label>
      </nav>
    </div>
    
    ) 

    export  const Vehiculos = (props) =>(
      <div className="m-2">
        <nav  style={{borderRadius:'5px', border:'2px solid #0071ce',backgroundColor:'white', position: 'relative', display: 'flex',
      flexWrap: 'wrap',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingTop: '.3rem',
      paddingBottom: '.3rem'}}>
          <label style={{marginLeft:'15px', color:'#0071ce', fontFamily: "'Roboto', Sans-Serif", fontSize:'16px', fontWeight:'bold'}}> Vehiculos </label>
          <label style={{marginRight:'15px', color:'#0071ce', fontFamily: "'Roboto', Sans-Serif", fontSize:'16px', fontWeight:'bold'}}>{props.departamento}</label>
        </nav>
      </div>
      
      ) 

    export  const NabvarOr = (props) =>(
      <div className="m-2">
        <nav  style={{borderRadius:'5px', border:'2px solid #0071ce',backgroundColor:'white', position: 'relative', display: 'flex',
      flexWrap: 'wrap',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingTop: '.3rem',
      paddingBottom: '.3rem'}}>
          <label style={{marginLeft:'15px', color:'#0071ce', fontFamily: "'Roboto', Sans-Serif", fontSize:'16px', fontWeight:'bold'}}> Ordenes de Compra</label>
          <label style={{marginRight:'15px', color:'#0071ce', fontFamily: "'Roboto', Sans-Serif", fontSize:'16px', fontWeight:'bold'}}>{props.departamento}</label>
        </nav>
      </div>
      
      ) 