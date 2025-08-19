import React, { useEffect } from 'react'
import axios from "./api/axiosconfig";
import {asyncGetUser} from "./services/userService.jsx";
import { useDispatch, useSelector } from 'react-redux';


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
    getProducts();
    dispatch(asyncGetUser());
  },[]); 


  return (
    <div>App</div>
  )
}

export default App