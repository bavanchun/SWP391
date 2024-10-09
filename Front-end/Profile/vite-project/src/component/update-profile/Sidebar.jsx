 import React ,{ useContext, useRef, useState } from "react";
 // ICONS
import { IoMdClose } from "react-icons/io";
import {
  FaUser,
  FaBell,
  FaSignOutAlt,
  FaEdit,
  FaCrown,
  FaCamera,
  FaChevronDown,
  FaChevronUp,
} from "react-icons/fa";
import { MdEmail, MdPassword } from "react-icons/md";

/// 
import { Link , Outlet} from "react-router-dom"; 
import "./Sidebar.css"
function sideBar({handleOpenMenu , isMenuOpen , handleLinkPage , handleLogout})  {  
     const [isEditOpen, setIsEditOpen] = useState(false);
     const [isOpenMenu , setIsOpenMenu] = useState(false);
     const [isBurger, setIsBurger] = useState(true);
     const [showLogoutModal, setShowLogoutModal] = useState(false);
     const [isMembershipOpen, setIsMembershipOpen] = useState(false);
    const [linkPage , setLinkPage] = useState("");

    

     const toggleMenu = () => {
       setIsOpenMenu(!isOpenMenu );
       handleOpenMenu(isBurger)
     };

  

     const confirmLogout = () => {
       // Perform logout logic here
       console.log("User logged out");
       setShowLogoutModal(false);
     };

     const toggleMembership = () => {
       setIsMembershipOpen(!isMembershipOpen);
     };
     

     
    return (
      <div
        className={`${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        } fixed inset-y-0 left-0 z-30 w-64 bg-white shadow-lg transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0`}
      >
        <div className="  flex items-center justify-between p-4 border-b">
          <h2 className="text-xl font-semibold text-gray-800">
             <a href=".">Profile</a>
          </h2>
          <button
            onClick={toggleMenu}
            className="  p-2 rounded-md lg:hidden focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <IoMdClose className="w-6 h-6" />
          </button>
          <img src=" " alt="" className="" />
        </div>

        <nav className="mt-5">
          <div className="relative">
            <button
              onClick={() => {
                setIsEditOpen(!isEditOpen);
              }}
             
              className="flex items-center w-full px-4 py-2 mt-2 text-gray-700 hover:bg-gray-200 focus:outline-none"
            >
              <FaEdit className="mr-3" />
              Edit profile
            
            </button>
              
          
          </div>
          <li
            className="flex items-center px-4 py-2 mt-2 text-gray-700 hover:bg-gray-200"
            onClick={() => handleLinkPage("notification")}
          >
            <FaBell className="mr-3" />
            Notifications
            <span className="ml-auto bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
              3
            </span>
          </li>
          {/* memberShip Sidebar */}
          <div className="relative">
            <button
              onClick={toggleMembership}
              className="flex items-center w-full px-4 py-2 mt-2 text-gray-700 hover:bg-gray-200 focus:outline-none"
            >
              <FaCrown className="mr-3 text-yellow-500" />
              Membership
              {isMembershipOpen ? (
                <FaChevronUp className="ml-auto" />
              ) : (
                <FaChevronDown className="ml-auto" />
              )}
            </button>
            {isMembershipOpen && (
              <div className="pl-8 mt-2 space-y-2">
                <a
                  href="#"
                  className="block py-2 text-sm text-gray-700 hover:bg-gray-200"
                >
                  Premium Member
                </a>
                <a
                  href="#"
                  className="block py-2 text-sm text-gray-700 hover:bg-gray-200"
                >
                  Gold Member
                </a>
                <a
                  href="#"
                  className="block py-2 text-sm text-gray-700 hover:bg-gray-200"
                >
                  Father Member
                </a>
              </div>
            )}
          </div>
        </nav>

        <button
          onClick={() => handleLogout(!showLogoutModal)}
          className="absolute bottom-4 left-4 flex items-center px-4 py-2 text-gray-700 hover:bg-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <FaSignOutAlt className="mr-3" />
          Logout
        </button>
      </div>
    );
}

export default sideBar