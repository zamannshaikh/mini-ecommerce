import React from "react";
import { useForm } from "react-hook-form";
import "../../styles/CreateProduct.css";
import { nanoid } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import { asyncCreateProduct, asyncUpdateProduct } from "../../services/productService";
import { useParams } from "react-router-dom";

const UpdateProduct = () => {
    const { id } = useParams();
    const product = useSelector((state) =>
    state.productReducer.products.find((p) => String(p.id) === id)
  );
  const { register, handleSubmit, reset } = useForm({defaultValues:{
    title :product.title,
    price:product.price,
    description:product.description,
    category:product.category,
    image:product.image
  }});
  const dispatch=useDispatch();
  const onSubmit = (product) => {
 
   
    dispatch(asyncUpdateProduct(id,product));

    reset(); // Clears form after submit
  };

  return (
    <div className="product-container">
      <div className="product-card">
        <h2 className="product-title">Create New Product 🛒</h2>
        <p className="product-subtitle">Fill the details below</p>

        <form onSubmit={handleSubmit(onSubmit)} className="product-form">
          <input
            {...register("title")}
            type="text"
            placeholder="Product Title"
            className="product-input"
          />

          <input
            {...register("price")}
            type="number"
            step="0.01"
            placeholder="Price"
            className="product-input"
          />

          <textarea
            {...register("description")}
            placeholder="Product Description"
            className="product-input textarea"
          />

          <input
            {...register("category")}
            type="text"
            placeholder="Category (e.g. men's clothing)"
            className="product-input"
          />

          <input
            {...register("image")}
            type="url"
            placeholder="Image URL"
            className="product-input"
          />

          <button type="submit" className="product-btn">
            Update Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateProduct;
