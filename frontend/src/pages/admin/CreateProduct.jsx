import React from "react";
import { useForm } from "react-hook-form";
import "../../styles/CreateProduct.css";
import { nanoid } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { asyncCreateProduct } from "../../services/productService";

const CreateProduct = () => {
  const { register, handleSubmit, reset } = useForm();
  const dispatch=useDispatch();
  const onSubmit = (product) => {
    product.id=nanoid();
    console.log("New Product:", product);
    dispatch(asyncCreateProduct(product));

    reset(); // Clears form after submit
  };

  return (
    <div className="product-container">
      <div className="product-card">
        <h2 className="product-title">Create New Product 🛒</h2>
        <p className="product-subtitle">Fill the details below</p>

        <form onSubmit={handleSubmit(onSubmit)} className="product-form">
          <input
            {...register("title", { required: true })}
            type="text"
            placeholder="Product Title"
            className="product-input"
          />

          <input
            {...register("price", { required: true })}
            type="number"
            step="0.01"
            placeholder="Price"
            className="product-input"
          />

          <textarea
            {...register("description", { required: true })}
            placeholder="Product Description"
            className="product-input textarea"
          />

          <input
            {...register("category", { required: true })}
            type="text"
            placeholder="Category (e.g. men's clothing)"
            className="product-input"
          />

          <input
            {...register("image", { required: true })}
            type="url"
            placeholder="Image URL"
            className="product-input"
          />

          <button type="submit" className="product-btn">
            Add Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateProduct;
