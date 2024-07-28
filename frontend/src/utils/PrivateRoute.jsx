import React,{useContext} from 'react'
import { Navigate } from 'react-router-dom'
import {UserContext} from '../context/UserContext';
import Loader from './Loader';

function PrivateRoute({children}) {
  const { user, token, isInitialized } = useContext(UserContext);

  // Render a loading indicator or placeholder while initializing
  if (!isInitialized) {
    return <Loader/>
  }
  
  if(!token || !user) {  
    return <Navigate to="/login" replace/>
  }

  return children;
}

export {PrivateRoute}