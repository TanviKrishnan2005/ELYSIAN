import React from "react";
import { useDispatch } from "react-redux";
import {
  updateQuantity,
  removeFromCart,
} from "../../redux/features/cart/cartSlice";
import OrderSummary from "../shop/productDetails/OrderSummary";

const CartModal = ({ products, isOpen, onClose }) => {
  const dispatch = useDispatch();

  const handleQuantity = (type, id) => {
    dispatch(updateQuantity({ type, _id: id }));
  };

  const handleRemove = (e, id) => {
    e.preventDefault();
    dispatch(removeFromCart({ _id: id }));
  };

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black/50 z-40 ${
          isOpen ? "block" : "hidden"
        }`}
        onClick={onClose}
      />

      {/* Cart Panel */}
      <div
        className={`fixed top-0 right-0 h-full bg-white z-50 w-[450px] shadow-lg transform transition-transform ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-4 border-b flex justify-between items-center">
          <h2 className="text-lg font-semibold">Your Cart</h2>
          <button onClick={onClose} className="text-2xl">&times;</button>
        </div>

        <div className="p-4">
          {products.length === 0 ? (
            <p>Your cart is empty</p>
          ) : (
            products.map((item) => (
              <div key={item._id} className="mb-4 border p-3 rounded">
                <div className="flex items-center">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-12 h-12 mr-3 object-cover"
                  />
                  <div>
                    <h5 className="font-medium">{item.name}</h5>
                    <p>${item.price}</p>
                  </div>
                </div>

                <div className="flex items-center mt-2 gap-2">
                  <button onClick={() => handleQuantity("decrement", item._id)}>-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => handleQuantity("increment", item._id)}>+</button>

                  <button
                    onClick={(e) => handleRemove(e, item._id)}
                    className="ml-auto text-red-500"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))
          )}

          {/* ✅ ONLY summary + checkout lives here */}
          {products.length > 0 && <OrderSummary />}
        </div>
      </div>
    </>
  );
};

export default CartModal;
