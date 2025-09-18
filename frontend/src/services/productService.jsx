import axios from "../api/axiosconfig";
import { loadProducts } from "../reducers/productSlice";
export const asyncCreateProduct= (product) =>async(dispatch,getState)=>{
    try {
        await axios.post("/products",product);
        dispatch(asyncLoadProducts());
    } catch (error) {
        console.error("Error creating product:", error);
    }
}


export const asyncLoadProducts=()=> async(dispatch,getState)=>{
    try {
        const {data}= await axios.get("/products");
        console.log( " from load product",data);
        dispatch(loadProducts(data));
    } catch (error) {
        console.error("Error fetching products:", error);
    }
}