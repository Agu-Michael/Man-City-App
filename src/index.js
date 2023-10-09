import React from 'react';
import ReactDOM from 'react-dom/client';
import Routes from './routes'
import { BrowserRouter } from 'react-router-dom';
import { firebaseApp } from './firebase';
import {getAuth } from 'firebase/auth'

import './Resources/css/app.css';
 const App =(props)=>{
  return(
    <BrowserRouter>
      <Routes {...props}/>
    </BrowserRouter>
  )
 }
// function to check if the user that is trying to enter is authenticated
 const auth = getAuth(firebaseApp);
 auth.onAuthStateChanged((user)=>{
  
  const root = ReactDOM.createRoot(document.getElementById('root'));
  root.render(<App user ={user}/>)
 })

