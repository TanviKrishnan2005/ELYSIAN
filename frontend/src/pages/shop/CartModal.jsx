import React from 'react';
import OrderSummary from"../shop/productDetails/OrderSummary";
import { useDispatch } from 'react-redux';
import { updateQuantity } from "../../redux/features/cart/cartSlice";
import {removeFromCart} from "../../redux/features/cart/cartSlice" ;

const CartModal = ({ products, isOpen, onClose }) => {
  const dispatch = useDispatch();

  const handleQuantity = (type,id)=>{
    const payload ={type,id}
    dispatch(updateQuantity(payload))
  }

  const handleRemove =(e,id)=>{
    e.preventDefault()
    dispatch(removeFromCart({id}))
  };

  return (
    <>
      {/* Black overlay */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 transition-opacity duration-300 z-40 ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
          }`}
        onClick={onClose}
      />

      {/* White cart panel — 1/4 width, fixed to right */}
      <div
        className={`fixed top-0 right-0 h-full bg-white shadow-lg overflow-y-auto transform transition-transform duration-300 z-50 ${isOpen ? 'translate-x-0' : 'translate-x-full'
          } w-3/12 max-w-sm min-w-[450px]`}
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
        <div className='cart-items'>
          {
            products.length === 0 ? (
              <div>Your cart is empty</div>
            ) : (
              products.map((item, index) => (
                <div key={index} className='flex flex-col md:flex-row md:items-center md:justify-between shadow-md md:p-5 p-2 mb-4'>

                  <div className='flex items-center'>
                    <span
                      style={{
                        marginRight: "1rem",     
                        padding: "0 0.25rem",    
                        backgroundColor: '#ed3849', 
                        color: "white",          
                        borderRadius: "9999px"   
                      }}
                    >
                      0{index + 1}
                    </span>
                    <img src={item.image} alt="" className='size-12 object-cover mr-4' />
                    <div>
                      <h5 className='text-lg font-medium'> {item.name}</h5>
                      <p className='text-gray-600 text-sm'>${Number(item.price).toFixed(2)}</p>
                    </div>

                    <div className='flex flex-row md:justify-start justify-end items-center mt-2'>
                      <button
                        onClick={()=>handleQuantity("decrement",item.id)}
                        className="size-6 flex items-center justify-center px-1.5 rounded-full bg-gray-200 text-gray-700 hover:bg-[#ed3849] hover:text-white ml-8"
                      >
                        -
                      </button>

                      <span className='px-2 text-center mx-1'>{item.quantity}</span>
                      <button
                        onClick={()=>handleQuantity("increment",item.id)}
                        className="size-6 flex items-center justify-center px-1.5 rounded-full bg-gray-200 text-gray-700 hover:bg-[#ed3849] hover:text-white "
                      >
                        +
                      </button>

                      <div className='ml-5'>
                        <button
                          onClick={(e)=> handleRemove(e,item.id)}
                          className='text-red-500 hover:text-red-800 mr-4'
                        >Remove</button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )
          }
        </div>

        {/* calculation */}
        {
          products.length>0 &&(
            <OrderSummary/>
          )
        }
      </div>
    </>
  );
};  

export default CartModal;
