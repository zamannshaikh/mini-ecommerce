import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { asyncUpdateUser } from "../services/userService";
import "../styles/Products.css";
import axios from "../api/axiosconfig";
import InfiniteScroll from "react-infinite-scroll-component";

const Products = () => {
  const user = useSelector((state) => state.userReducer.data);
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const [hasMore, setHasMore] = useState(true);

 const [page, setPage] = React.useState(0); // page counter

const fetchProducts = async () => {
  try {
    const { data: newProducts } = await axios.get(`/products?_start=${page * 6}&_limit=6`);

    if (newProducts.length === 0) {
      setHasMore(false);
      return;
    }

    setData((prevData) => [...prevData, ...newProducts]);
    setPage((prev) => prev + 1);
  } catch (error) {
    console.error("Error fetching products:", error);
  }
};


  const handleAddToCart = (id) => {
    if (!user) {
      alert("Please login to add products to your cart.");
      return;
    }

    const copyuser = {
      ...user,
      cart: [...(user?.cart || [])],
    };

    const existingItemIndex = copyuser.cart.findIndex(
      (item) => item.productId === id
    );

    if (existingItemIndex === -1) {
      copyuser.cart.push({ productId: id, quantity: 1 });
    } else {
      copyuser.cart[existingItemIndex] = {
        productId: id,
        quantity: copyuser.cart[existingItemIndex].quantity + 1,
      };
    }

    dispatch(asyncUpdateUser(copyuser));
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="products-page">
      <div className="products-header">
        <h1>Our Collection</h1>
        <p>Browse our latest products and find what you love.</p>
      </div>

      <InfiniteScroll
        dataLength={data.length}
        next={fetchProducts}
        hasMore={hasMore}
        loader={<h4>Loading...</h4>}
        endMessage={
          <p style={{ textAlign: "center" }}>
            <b>Yay! You have seen it all</b>
          </p>
        }
      >
        <div className="products-wrapper">
  {data.length > 0 ? (
    data.map((item, index) => (
      <NavLink
        key={`${item.id}-${index}`} // unique key
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
                  e.preventDefault();
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

      </InfiniteScroll>
    </div>
  );
};

export default Products;
