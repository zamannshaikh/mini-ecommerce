import React, { useEffect } from 'react'
import axios from "./api/axiosconfig";


const App = () => {
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
  },[]); 


  return (
    <div>App</div>
  )
}

export default App