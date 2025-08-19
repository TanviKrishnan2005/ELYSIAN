import React from 'react';

const CartModal = ({ products, isOpen, onClose }) => {
  return (
    <>
      {/* Black overlay */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 transition-opacity duration-300 z-40 ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />

      {/* White cart panel — 1/4 width, fixed to right */}
      <div
        className={`fixed top-0 right-0 h-full bg-white shadow-lg overflow-y-auto transform transition-transform duration-300 z-50 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        } w-3/12 max-w-sm min-w-[300px]`}
      >
        {/* Header */}
        <div className="p-4 border-b flex justify-between items-center">
          <h2 className="text-lg font-semibold">Your Cart</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-red-500 text-2xl"
          >
            &times;
          </button>
        </div>

        {/* Cart Items */}
        <div>
  {
    products.length === 0 ? (
      <div>Your cart is empty</div>
    ) : (
      products.map((item, index) => (
        <div key={index}>
          <span>0{index + 1}</span>
        </div>
      ))
    )
  }
</div>

      </div>
    </>
  );
};

export default CartModal;
