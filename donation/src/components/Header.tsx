import React, { useState, useEffect } from 'react';
import { Menu, X, ChevronDown, Fuel as Mosque } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isMaster, setIsMaster] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const userToken = localStorage.getItem("userToken");
    const masterToken = localStorage.getItem("masterToken");
    if (userToken || masterToken) {
      setIsAuthenticated(true);
      if (masterToken) {
        setIsMaster(true);
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("userToken");
    localStorage.removeItem("masterToken");
    setIsAuthenticated(false);
    setIsMaster(false);
    navigate("/");
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex items-center">
            <a href="/" className="flex items-center">
              <Mosque className="h-8 w-8 text-emerald-600" />
              <span className="ml-2 text-xl font-bold text-emerald-800">IslamicHub</span>
            </a>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {/* Services Dropdown */}
            <div className="relative group">
              <button 
                className="flex items-center text-gray-700 hover:text-emerald-600 transition duration-300"
                onClick={() => setIsServicesOpen(!isServicesOpen)}
              >
                Services
                <ChevronDown className="ml-1 h-4 w-4" />
              </button>
              
              {/* Dropdown Menu */}
              <div className={`absolute left-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 transition-all duration-300 ${isServicesOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
                <div className="py-1" role="menu" aria-orientation="vertical">
                  <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-emerald-50 hover:text-emerald-600" role="menuitem">Donation & Charity</a>
                  <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-emerald-50 hover:text-emerald-600" role="menuitem">Halal Investment</a>
                  <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-emerald-50 hover:text-emerald-600" role="menuitem">Halal Properties</a>
                  <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-emerald-50 hover:text-emerald-600" role="menuitem">Marriage & Family</a>
                  <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-emerald-50 hover:text-emerald-600" role="menuitem">Food & Dining</a>
                  <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-emerald-50 hover:text-emerald-600" role="menuitem">Islamic Education</a>
                </div>
              </div>
            </div>
            
            <a href="#" className="text-gray-700 hover:text-emerald-600 transition duration-300">How It Works</a>
            <a href="#" className="text-gray-700 hover:text-emerald-600 transition duration-300">About Us</a>
            <a href="#" className="text-gray-700 hover:text-emerald-600 transition duration-300">Blog</a>
            <a href="#" className="text-gray-700 hover:text-emerald-600 transition duration-300">Contact</a>
            {isMaster && <a href="/platform-control" className="text-gray-700 hover:text-emerald-600 transition duration-300">Platform Control</a>}
          </nav>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              <button onClick={handleLogout} className="text-emerald-600 hover:text-emerald-700 font-medium transition duration-300">Logout</button>
            ) : (
              <>
                <a href="/login" className="text-emerald-600 hover:text-emerald-700 font-medium transition duration-300">Login</a>
                <a href="/signup" className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-md font-medium transition duration-300">Sign Up</a>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              type="button"
              className="text-gray-700 hover:text-emerald-600 focus:outline-none"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden ${isMenuOpen ? 'block' : 'hidden'}`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white shadow-md">
          <a href="#" className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-emerald-600 hover:bg-emerald-50 rounded-md">Services</a>
          <a href="#" className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-emerald-600 hover:bg-emerald-50 rounded-md">How It Works</a>
          <a href="#" className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-emerald-600 hover:bg-emerald-50 rounded-md">About Us</a>
          <a href="#" className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-emerald-600 hover:bg-emerald-50 rounded-md">Blog</a>
          <a href="#" className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-emerald-600 hover:bg-emerald-50 rounded-md">Contact</a>
          {isMaster && <a href="/platform-control" className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-emerald-600 hover:bg-emerald-50 rounded-md">Platform Control</a>}
          <div className="pt-4 pb-3 border-t border-gray-200">
            {isAuthenticated ? (
              <button onClick={handleLogout} className="block px-3 py-2 text-base font-medium text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50 rounded-md">Logout</button>
            ) : (
              <>
                <a href="/login" className="block px-3 py-2 text-base font-medium text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50 rounded-md">Login</a>
                <a href="/signup" className="block px-3 py-2 mt-1 text-base font-medium bg-emerald-600 text-white hover:bg-emerald-700 rounded-md">Sign Up</a>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;