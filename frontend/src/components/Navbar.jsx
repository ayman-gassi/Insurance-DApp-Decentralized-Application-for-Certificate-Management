import React, { useState } from "react";
import { Shield, FileText, Search, Wallet, Menu, X } from "lucide-react";

const Navbar = ({ currentPage, setCurrentPage, account, onConnect }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Accueil', icon: Shield },
    { id: 'add', label: 'Ajouter', icon: FileText },
    { id: 'search', label: 'Rechercher', icon: Search }
  ];

  return (
    <nav className="bg-gradient-to-r from-blue-600 to-purple-700 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <Shield className="h-8 w-8 text-white" />
            <span className="text-white text-xl font-bold">CertManager</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => setCurrentPage(item.id)}
                    className={`px-3 py-2 rounded-md text-sm font-medium flex items-center space-x-1 transition-colors ${
                      currentPage === item.id
                        ? 'bg-white bg-opacity-20 text-white'
                        : 'text-blue-100 hover:bg-white hover:bg-opacity-10 hover:text-white'
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Wallet Connection */}
          <div className="hidden md:block">
            {!account ? (
              <button
                onClick={onConnect}
                className="bg-white text-blue-600 px-4 py-2 rounded-lg font-medium hover:bg-blue-50 transition-colors flex items-center space-x-2"
              >
                <Wallet className="h-4 w-4" />
                <span>Connecter</span>
              </button>
            ) : (
              <div className="text-white text-sm bg-white bg-opacity-20 px-3 py-2 rounded-lg">
                {account.slice(0, 6)}...{account.slice(-4)}
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white hover:text-blue-200 transition-colors"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t border-blue-500">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setCurrentPage(item.id);
                      setIsMenuOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2 rounded-md text-base font-medium flex items-center space-x-2 transition-colors ${
                      currentPage === item.id
                        ? 'bg-white bg-opacity-20 text-white'
                        : 'text-blue-100 hover:bg-white hover:bg-opacity-10 hover:text-white'
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                    <span>{item.label}</span>
                  </button>
                );
              })}
              <div className="pt-4 border-t border-blue-500 mt-4">
                {!account ? (
                  <button
                    onClick={() => {
                      onConnect();
                      setIsMenuOpen(false);
                    }}
                    className="w-full bg-white text-blue-600 px-4 py-2 rounded-lg font-medium hover:bg-blue-50 transition-colors flex items-center justify-center space-x-2"
                  >
                    <Wallet className="h-4 w-4" />
                    <span>Connecter MetaMask</span>
                  </button>
                ) : (
                  <div className="text-white text-sm bg-white bg-opacity-20 px-3 py-2 rounded-lg text-center">
                    {account.slice(0, 6)}...{account.slice(-4)}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;