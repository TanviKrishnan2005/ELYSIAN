import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import CartModal from '../pages/shop/CartModal';

const Navbar = () => {
  const products = useSelector((state) => state.cart.products);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const handleCartToggle = () => setIsCartOpen(!isCartOpen);

  return (
    <header className="fixed-nav-bar w-nav z-50">
      <nav className="max-w-screen-2xl mx-auto px-4 flex justify-between items-center">
        <ul className="nav__links flex gap-4">
          <li><Link to="/">HOME</Link></li>
          <li><Link to="/shop">SHOP</Link></li>
          <li><Link to="/pages">PAGES</Link></li>
          <li><Link to="/contact">CONTACT</Link></li>
        </ul>

        <div className="nav__logo">
          <Link to="/">Eysian<span>.</span></Link>
        </div>

        <div className="nav__icons flex gap-4">
          <Link to="/search"><i className="ri-search-line"></i></Link>

          <button onClick={handleCartToggle} className="relative hover:text-primary">
            <i className="ri-shopping-bag-fill"></i>
            <span className="absolute -top-2 -right-2 text-xs bg-red-500 text-white rounded-full px-1.5">{products.length}</span>
          </button>

          <Link to="/login"><i className="ri-user-line"></i></Link>
        </div>
      </nav>

      {/* Always render CartModal */}
      <CartModal products={products} isOpen={isCartOpen} onClose={handleCartToggle} />
    </header>
  );
};

export default Navbar;
