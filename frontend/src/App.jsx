import React, { useEffect } from 'react'
import axios from "./api/axiosconfig";
// import {asyncGetUser} from "./services/userService.jsx";
import { useDispatch, useSelector } from 'react-redux';
import MainRoute from './routes/MainRoute.jsx';
import Nav from './components/Nav.jsx';
import { asyncCurrentUser } from './services/userService.jsx';
import { asyncLoadProducts } from './services/productService.jsx';


const App = () => {
  const dispatch = useDispatch();

  

  useEffect(()=>{
  
    // dispatch(asyncGetUser());
    dispatch(asyncCurrentUser());
    dispatch(asyncLoadProducts());
  },[]); 


  return (
    <div>
      <Nav/>
      <MainRoute />
    </div>
  )
}

export default App