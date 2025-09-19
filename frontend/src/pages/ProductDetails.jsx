import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import "../styles/ProductDetails.css";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate(); // ✅ useNavigate hook
  const product = useSelector((state) =>
    state.productReducer.products.find((p) => String(p.id) === id)
  );
  const user = useSelector((state) => state.userReducer.data);

  if (!product) {
    return <div className="product-not-found">Product not found</div>;
  }

  return (
    <div className="product-details-page">
      <div className="product-details-container">
        {/* Left: Image */}
        <div className="product-details-image">
          <img src={product.image} alt={product.title} />
        </div>

        {/* Right: Info */}
        <div className="product-details-info">
          <h1 className="product-details-title">{product.title}</h1>
          <p className="product-details-category">{product.category}</p>
          <p className="product-details-price">${product.price}</p>
          <p className="product-details-description">{product.description}</p>

          <div className="product-details-actions">
            <button className="btn-add-cart">Add to Cart</button>

            {/* ✅ Correct navigation on button click */}
            
           {user && user.isAdmin ?<>
             <button
              onClick={() => navigate(`/admin/update-product/${product.id}`)}
              className="btn-add-cart"
            >
              Update Product
            </button></>
            :<></>}

            <button className="btn-buy-now">Buy Now</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
