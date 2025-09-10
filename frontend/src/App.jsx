import React, { useEffect } from 'react'
import axios from "./api/axiosconfig";
// import {asyncGetUser} from "./services/userService.jsx";
import { useDispatch, useSelector } from 'react-redux';
import MainRoute from './routes/MainRoute.jsx';
import Nav from './components/Nav.jsx';


const App = () => {
  const dispatch = useDispatch();
  const data= useSelector((state) => state);
  const getProducts= async()=>{
    try {
      const res= await axios.get("/products");
      console.log(res.data);
      
    } catch (error) {
      console.error("Error fetching products:", error);
      
    }
  }


  useEffect(()=>{
  
    // dispatch(asyncGetUser());
  },[]); 


  return (
    <div>
      <Nav/>
      <MainRoute />
    </div>
  )
}

export default App