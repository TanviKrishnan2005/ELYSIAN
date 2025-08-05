import React from 'react'
import { Link } from 'react-router-dom'  // ✅ Add this import

const Navbar = () => {
    return (
        <header className='fixed-nav-bar w-nav'>
            <nav className='max-w-screen-2xl mx-auto px-4 flex justify-between item-center'>
                <ul className='nav__links'>
                    <li className='link'><Link to='/'>HOME</Link></li>
                    <li className='link'><Link to='/shop'>SHOP</Link></li>
                    <li className='link'><Link to='/pages'>PAGES</Link></li>
                    <li className='link'><Link to='/contact'>CONTACT</Link></li>
                </ul>
                {/* logo */}
                <div className='nav__logo'>
                    <Link to='/'>
                        Eysian<span>.
                        </span>
                    </Link>
                </div>
                {/* nav icon */}
                <div className='nav__icons relative'>
                    <span>
                        <Link to='/search'>
                            <i class="ri-search-line"></i>
                        </Link>
                    </span>
                    <span>
                        <button className='hover:text-primary'>
                            <i className="ri-shopping-bag-fill"></i>
                            <sup className="text-sm inline-block px-1.5 text-white rounded-full bg-red-500 text-center">0</sup>

                        </button>
                    </span>
                    <span>
                        <Link to="login">
                        <i class="ri-user-line"></i>
                        </Link>
                    </span>

                </div>

            </nav>
        </header>
    )
}

export default Navbar
 