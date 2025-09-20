import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { asyncUpdateUser } from "../services/userService";
import "../styles/Cart.css";

const Cart = () => {
  const user = useSelector((state) => state.userReducer.data);
  const products = useSelector((state) => state.productReducer.products);
  const dispatch = useDispatch();

  if (!user) {
    return <div className="cart-empty">Please login to view your cart.</div>;
  }

  // ✅ Safely handle empty or undefined cart
  const cartItems =
    user.cart && Array.isArray(user.cart)
      ? user.cart
          .map((cartItem) => {
            const product = products.find((p) => p.id === cartItem.productId);
            return product
              ? { ...product, quantity: cartItem.quantity }
              : null;
          })
          .filter(Boolean)
      : [];

  const handleQuantityChange = (productId, type) => {
    const updatedUser = {
      ...user,
      cart: user.cart.map((item) =>
        item.productId === productId
          ? {
              ...item,
              quantity:
                type === "inc"
                  ? item.quantity + 1
                  : item.quantity > 1
                  ? item.quantity - 1
                  : 1,
            }
          : item
      ),
    };
    dispatch(asyncUpdateUser(updatedUser));
  };

  const handleRemove = (productId) => {
    const updatedUser = {
      ...user,
      cart: user.cart.filter((item) => item.productId !== productId),
    };
    dispatch(asyncUpdateUser(updatedUser));
  };

  // ✅ Avoid reduce error by giving default value
  const totalPrice = cartItems.length
    ? cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0)
    : 0;

  return (
    <div className="cart-page">
      <h1 className="cart-title">Your Cart</h1>

      {cartItems.length === 0 ? (
        <p className="cart-empty">Your cart is empty.</p>
      ) : (
        <div className="cart-container">
          {cartItems.map((item) => (
            <div key={item.id} className="cart-item">
              <div className="cart-item-left">
                <img src={item.image} alt={item.title} className="cart-item-img" />
                <div className="cart-item-details">
                  <h2>{item.title}</h2>
                  <p>${item.price}</p>
                  <div className="cart-quantity">
                    <button onClick={() => handleQuantityChange(item.id, "dec")}>
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button onClick={() => handleQuantityChange(item.id, "inc")}>
                      +
                    </button>
                  </div>
                </div>
              </div>

              <div className="cart-item-right">
                <p className="cart-item-total">
                  ${(item.price * item.quantity).toFixed(2)}
                </p>
                <button
                  className="remove-btn"
                  onClick={() => handleRemove(item.id)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}

          <div className="cart-summary">
            <h3>Total: ${totalPrice.toFixed(2)}</h3>
            <button className="checkout-btn">Proceed to Checkout</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
