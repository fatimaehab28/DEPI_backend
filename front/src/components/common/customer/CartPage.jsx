import React, { useContext } from 'react';
import { CartContext } from '../../../context/CartContext';
import { useNavigate } from 'react-router-dom';
import '../../../App.css';

const CartPage = () => {
  const { cartItems, removeFromCart } = useContext(CartContext);
  const navigate = useNavigate();

  const handleCheckout = () => {
    navigate('/checkout');
  };

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="cart-container">
      <h2 className="cart-title">Shopping Cart</h2>
      {cartItems.map((item, index) => (
        <div key={index} className="cart-item">
          <div className="cart-item-details">
            <img src={item.image} alt={item.name} />
            <div className="cart-item-info">
              <span className="cart-item-name">{item.name}</span>
              <span className="cart-item-price">${item.price.toFixed(2)}</span>
            </div>
          </div>
          <div className="cart-item-actions">
            <span className="cart-item-quantity">x{item.quantity}</span>
            <button className="cart-remove-btn" onClick={() => removeFromCart(item.id)}>Remove</button>
          </div>
        </div>
      ))}

      <div className="cart-summary">
        <div className="cart-total">Total: ${total.toFixed(2)}</div>
        <button className="checkout-btn" onClick={handleCheckout}>Proceed to Checkout</button>
      </div>
    </div>
  );
};

export default CartPage;
