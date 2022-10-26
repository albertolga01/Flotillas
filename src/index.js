import React,{useState, useEffect}  from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Login from './component/login';   
import 'bootstrap/dist/css/bootstrap.min.css';
import reportWebVitals from './reportWebVitals';
import HttpsRedirect from 'react-https-redirect';
 

ReactDOM.render(

  <HttpsRedirect>
    <Login isLoggedIn={false} />
  </HttpsRedirect>,
  document.getElementById('root')

  );

 
  
reportWebVitals();
