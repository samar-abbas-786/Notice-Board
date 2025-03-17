import React, { useState } from "react";
import { Link } from "react-router-dom";
import { LuClipboardPenLine } from "react-icons/lu";
import { CgProfile } from "react-icons/cg";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";

const Navbar = () => {
  const [isTeacherOpen, setIsTeacherOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-navy-900 bg-opacity-90 backdrop-blur-lg shadow-md">
      <div className="container mx-auto flex justify-between items-center h-[80px] px-6">
        {/* Logo */}
        <Link
          to="/home"
          className="text-3xl font-bold text-white tracking-wide flex items-center gap-2"
        >
          <LuClipboardPenLine className="text-white" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
            NoticeBoard
          </span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-8">
          <NavItem to="/home" label="Home" />
          <NavItem to="/notices" label="Notices" />
          <NavItem to="/contact" label="Contact" />

          {/* Teacher/Admin Dropdown */}
          {(user?.role === "teacher" || user?.role === "admin") && (
            <div
              className="relative text-gray-300 text-lg font-medium cursor-pointer"
              onMouseEnter={() => setIsTeacherOpen(true)}
              onMouseLeave={() => setIsTeacherOpen(false)}
            >
              <span className="hover:text-white transition-all">
                {user?.role === "teacher" ? "Teacher" : "Admin"}
              </span>
              {isTeacherOpen && <DropdownMenu userRole={user.role} />}
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          <button
            className="text-white text-3xl"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <AiOutlineClose /> : <AiOutlineMenu />}
          </button>
        </div>

        {/* Profile / Login & Signup */}
        <div className="hidden md:flex items-center space-x-4">
          {!user ? <AuthButtons /> : <ProfileIcon />}
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-20 left-0 w-full bg-[#0a1120] border-t border-cyan-500 shadow-lg p-6">
          <MobileNavItem to="/home" label="Home" />
          <MobileNavItem to="/notices" label="Notices" />
          <MobileNavItem to="/contact" label="Contact" />

          {(user?.role === "teacher" || user?.role === "admin") && (
            <>
              <hr className="border-cyan-500 my-3" />
              <span className="text-cyan-300 font-semibold block mb-2">
                {user?.role === "teacher" ? "Teacher" : "Admin"}
              </span>
              <MobileNavItem to="/uploadNotice" label="Add Notice" />
              <MobileNavItem to="/myNotices" label="My Notices" />
              {user?.role === "admin" && (
                <MobileNavItem to="/profile" label="Admin Panel" />
              )}
            </>
          )}

          <hr className="border-cyan-500 my-3" />
          {!user ? <AuthButtons /> : <ProfileIcon />}
        </div>
      )}
    </nav>
  );
};

/* --------- Helper Components --------- */

const NavItem = ({ to, label }) => (
  <Link
    to={to}
    className="text-gray-300 text-lg font-medium relative transition-all duration-300 
    after:block after:w-0 after:h-[2px] after:bg-cyan-300 after:transition-all 
    after:duration-300 hover:after:w-full hover:text-white"
  >
    {label}
  </Link>
);

const MobileNavItem = ({ to, label }) => (
  <Link
    to={to}
    className="block py-2 text-white text-lg hover:text-cyan-300 transition-all"
  >
    {label}
  </Link>
);

const DropdownMenu = ({ userRole }) => (
  <div className="absolute left-0 mt-2 w-40 bg-[#0a1120] border border-cyan-500 rounded-lg shadow-lg">
    <Link
      to="/uploadNotice"
      className="block px-4 py-2 text-white hover:bg-cyan-900 transition"
    >
      Add Notice
    </Link>
    <Link
      to="/myNotices"
      className="block px-4 py-2 text-white hover:bg-cyan-600 transition"
    >
      My Notice
    </Link>
    {userRole === "admin" && (
      <Link
        to="/profile"
        className="block px-4 py-2 text-white hover:bg-cyan-600 transition"
      >
        Admin Panel
      </Link>
    )}
  </div>
);

const AuthButtons = () => (
  <div className="flex flex-col space-y-3 md:space-y-0 md:flex-row md:space-x-4">
    <Link to="/login">
      <button
        className="w-full md:w-auto px-5 py-2 font-semibold text-white border border-cyan-500 
      rounded-lg transition-all duration-300 hover:bg-cyan-500 hover:text-black 
      hover:shadow-lg hover:shadow-cyan-500/50"
      >
        Login
      </button>
    </Link>
    <Link to="/signup">
      <button
        className="w-full md:w-auto px-6 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold 
      rounded-lg transition-all duration-300 transform hover:scale-105 
      hover:shadow-lg hover:shadow-blue-400/50"
      >
        Sign Up
      </button>
    </Link>
  </div>
);

const ProfileIcon = () => (
  <Link to="/profile" className="text-cyan-600 text-4xl">
    <CgProfile />
  </Link>
);

export default Navbar;
