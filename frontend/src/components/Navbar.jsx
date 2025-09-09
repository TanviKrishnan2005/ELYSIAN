import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import CartModal from '../pages/shop/CartModal';
import avatarImg from '../assets/avatar.png'; 
import { useLogoutUserMutation } from '../redux/features/auth/authApi'
import { logout } from '../redux/features/auth/authSlice'; // adjust path if needed


const Navbar = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.cart.products);
  const { user } = useSelector((state) => state.auth);
const [logoutUser] = useLogoutUserMutation();
  const nagivate = useNavigate();

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);

  const handleCartToggle = () => setIsCartOpen(!isCartOpen);
  const handleDropDownToggle = () => setIsDropDownOpen(!isDropDownOpen);

  // Admin dropdown menus
  const adminDropDownMenus = [
    { label: "Dashboard", path: "/dashboard/admin" },
    { label: "Manage Items", path: "/dashboard/manage-products" },
    { label: "All Orders", path: "/dashboard/manage-orders" },
    { label: "Add New Product", path: "/dashboard/add-new-product" },
  ];

  // User dropdown menus
  const userDropDownMenus = [
    { label: "Dashboard", path: "/dashboard" },
    { label: "Profile", path: "/dashboard/profile" },
    { label: "Payment", path: "/dashboard/payment" },
    { label: "Orders", path: "/dashboard/orders" },
  ];

  const dropDownMenus = user?.role === 'admin' ? adminDropDownMenus : userDropDownMenus;

  const handleLogout =async ()=>{
    try {
      await logoutUser().unwrap();
      dispatch(logout())
      navigate('/')
    } catch (error) {
      console.error("Failed to log out",error)  
    }
  }

  return (
    <header className="fixed-nav-bar w-nav z-50 bg-white shadow-sm">
      <nav className="max-w-screen-2xl mx-auto px-4 flex justify-between items-center py-3">

        {/* Left Nav Links */}
        <ul className="nav__links flex gap-6 font-medium text-sm">
          <li><Link to="/">HOME</Link></li>
          <li><Link to="/shop">SHOP</Link></li>
          <li><Link to="/pages">PAGES</Link></li>
          <li><Link to="/contact">CONTACT</Link></li>
        </ul>

        {/* Logo Center */}
        <div className="nav__logo font-bold text-2xl">
          <Link to="/">Eysian<span className="text-primary">.</span></Link>
        </div>

        {/* Right Icons */}
        <div className="nav__icons flex gap-4 items-center">

          {/* Search Icon */}
          <Link to="/search">
            <i className="ri-search-line text-xl"></i>
          </Link>

          {/* Cart Icon */}
          <button onClick={handleCartToggle} className="relative hover:text-primary text-xl">
            <i className="ri-shopping-bag-fill"></i>
            <span className="absolute -top-2 -right-2 text-xs bg-red-500 text-white rounded-full px-1.5">
              {products.length}
            </span>
          </button>

          {/* User Profile or Login */}
          {
            user ? (
              <div className="relative">
                <img
                  onClick={handleDropDownToggle}
                  src={user?.profileImage || avatarImg}
                  alt="profile"
                  className="h-8 w-8 rounded-full object-cover border border-gray-300 cursor-pointer"
                />

                {isDropDownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-50">
                    <ul className="py-2 text-sm text-gray-700">
                      {dropDownMenus.map((menu, index) => (
                        <li key={index}>
                          <Link
                            to={menu.path}
                            onClick={() => setIsDropDownOpen(false)}
                            className="block px-4 py-2 hover:bg-gray-100 hover:text-red-500 transition-colors duration-150"
                          >
                            {menu.label}
                          </Link>
                        </li>
                      ))}

                      <li><Link onClick={handleLogout}
                   className='block px-4 py-2 hover:bg-gray-100 hover:text-red-500 transition-colors duration-150'>Logout</Link></li>
                    </ul>
                  </div>
                )}
              </div>
            ) : (
              <Link to="/login">
                <i className="ri-user-line text-xl"></i>
              </Link>
            )
          }

        </div>
      </nav>

      {/* Cart Modal */}
      <CartModal products={products} isOpen={isCartOpen} onClose={handleCartToggle} />
    </header>
  );
};

export default Navbar;
