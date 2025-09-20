import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { asyncUpdateUser } from "../services/userService";
import "../styles/Products.css";

const Products = () => {
  const data = useSelector((state) => state.productReducer.products);
  const user = useSelector((state) => state.userReducer.data);
  const dispatch = useDispatch();

  const handleAddToCart = (id) => {
    if (!user) {
      alert("Please login to add products to your cart.");
      return;
    }


    const copyuser = {
      ...user,
      cart: user?.cart ? [...user.cart] : []
    };

    const existingItem = copyuser.cart.findIndex(item => item.productId === id);

    if (existingItem == -1) {
      copyuser.cart.push({ productId: id, quantity: 1 });
    }
    else {
      copyuser.cart[existingItem] = {
        productId: id,
        quantity: copyuser.cart[existingItem].quantity + 1
      }
    }
    console.log(copyuser);
    dispatch(asyncUpdateUser(copyuser));

  }
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
              to={`/products/${item.id}`}
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
                      onClick={(e) => {
                        e.preventDefault(); // prevent navigation
                        handleAddToCart(item.id);
                      }}
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
