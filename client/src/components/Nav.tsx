// src/SearchBar.js

import { InitialStateType } from '@/redux/reducer/addtoCart';
import { UserReducerSate } from '@/types/redux';
import { FaCog, FaHome, FaSearch, FaShoppingCart, FaUserCircle } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Navbar = () => {
    const isAdmin=false
  const {isLogin}= useSelector((state:{userReducer:UserReducerSate})=>state.userReducer)
  const {count}= useSelector((state:{cartReducer:InitialStateType})=>state.cartReducer)

  return (
    isLogin && (
      <div className="bg-gray-100 py-6 px-4 shadow-md">
      <div className="container mx-auto flex items-center justify-between">
        {/* Search Input */}
        <div className="flex-1 flex items-center">
        </div>

        {/* Navigation Buttons */}

        <div className="flex items-center space-x-4 ml-4">
            <Link to={"/shopping"}>
            <div className="flex items-center text-gray-700 hover:text-blue-500">
                <FaHome className="mr-1" />
                <span className="hidden md:inline">Home</span>
            </div>
            </Link>

            <Link to={"/search"}>
            <div className="flex items-center text-gray-700 hover:text-blue-500">
                <FaSearch className="mr-1" />
                <span className="hidden md:inline">Search</span>
            </div>
            </Link>

          {
            isAdmin && (
                <Link to={"/admin"}>
                <div className="flex items-center text-gray-700 hover:text-blue-500">
                    <FaCog className="mr-1" />
                    <span className="hidden md:inline">Admin</span>
                </div>
                </Link>
            )
          }

            <Link to={"/profile"}>
            <div className="flex items-center text-gray-700 hover:text-blue-500">
                <FaUserCircle className="mr-1" />
                <span className="hidden md:inline">Profile</span>
            </div>
            </Link>

            <Link to={"/orders"}>
            <div className="flex items-center text-gray-700 hover:text-blue-500">
                <FaShoppingCart className="mr-1" />
                <span className="hidden md:inline">Cart {count<=0?null:count}</span>
            </div>
            </Link>

        </div>
      </div>
    </div>
    )
  );
};

export default Navbar;
