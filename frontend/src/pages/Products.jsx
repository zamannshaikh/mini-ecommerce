import React from "react";
import { useSelector } from "react-redux";
import "../styles/Products.css";
import { NavLink } from "react-router-dom";

const Products = () => {
  const data = useSelector((state) => state.productReducer.products);

  return (
    <div className="products-page">
      <div className="products-header">
        <h1>Our Collection</h1>
        <p>Browse our latest products and find what you love.</p>
      </div>

      <div className="products-wrapper">
        {data.length > 0 ? (
          data.map((item) => (
            <NavLink 
              key={item.id} 
              to={`/products/${item.id}`}  // 👈 navigate to product details
              className="product-link"
            >
              <div className="product-card-pro">
                <div className="product-img-container">
                  <img src={item.image} alt={item.title} />
                </div>

                <div className="product-details">
                  <h2 className="product-title">{item.title}</h2>
                  <p className="product-category">{item.category}</p>
                  <div className="product-bottom">
                    <span className="product-price">${item.price}</span>
                    <button 
                      className="add-to-cart-btn"
                      onClick={(e) => e.preventDefault()} // 👈 prevent navigation if clicked
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            </NavLink>
          ))
        ) : (
          <p className="no-products">No products available</p>
        )}
      </div>
    </div>
  );
};

export default Products;
