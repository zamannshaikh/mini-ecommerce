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


export const asyncUpdateProduct= (id,product) =>async(dispatch,getState)=>{
    try {
        await axios.patch("/products/"+id,product);
        dispatch(asyncLoadProducts());
    } catch (error) {
        console.error("Error updating product:", error);
    }
}


export const asyncDeleteProduct= (id) =>async(dispatch,getState)=>{
    try {
        await axios.delete("/products/"+id);
        dispatch(asyncLoadProducts());
    } catch (error) {
        console.error("Error deleting product:", error);
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