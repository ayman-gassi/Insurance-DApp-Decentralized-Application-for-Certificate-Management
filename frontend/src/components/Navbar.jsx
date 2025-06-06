import React, { useState } from "react";
import { Shield, FileText, Search, Wallet, Menu, X } from "lucide-react";

const Navbar = ({ currentPage, setCurrentPage, account, onConnect }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { id: "home", label: "Accueil", icon: Shield },
    { id: "add", label: "Ajouter", icon: FileText },
    { id: "search", label: "Rechercher", icon: Search },
  ];

  return (
    <nav className="bg-gray-900/98 border-b border-green-500/20 shadow-lg backdrop-blur-md relative">
      {/* Subtle accent line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-green-500/30 to-transparent"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="bg-gray-800 border border-green-500/40 rounded-lg p-2 shadow-sm">
              <Shield className="h-7 w-7 text-green-400" />
            </div>
            <span className="text-white text-xl font-semibold tracking-tight">
              CertManager
            </span>
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
                    className={`px-4 py-2 rounded-md text-sm font-medium flex items-center space-x-2 transition-all duration-200 ${
                      currentPage === item.id
                        ? "bg-green-500/15 text-green-400 border-l-2 border-green-500"
                        : "text-gray-300 hover:bg-gray-800/50 hover:text-white"
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
                className="bg-green-600 hover:bg-green-700 text-white font-medium px-4 py-2 rounded-md transition-colors duration-200 flex items-center space-x-2 shadow-sm"
              >
                <Wallet className="h-4 w-4" />
                <span>Connecter</span>
              </button>
            ) : (
              <div className="text-green-400 text-sm bg-gray-800/80 border border-gray-700 px-3 py-2 rounded-md font-mono">
                {account.slice(0, 6)}...{account.slice(-4)}
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-400 hover:text-white transition-colors p-2 rounded-md hover:bg-gray-800/50"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t border-gray-700 bg-gray-900/95 backdrop-blur-sm">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setCurrentPage(item.id);
                      setIsMenuOpen(false);
                    }}
                    className={`w-full text-left px-3 py-3 rounded-md text-base font-medium flex items-center space-x-3 transition-all duration-200 ${
                      currentPage === item.id
                        ? "bg-green-500/15 text-green-400 border-l-2 border-green-500"
                        : "text-gray-300 hover:bg-gray-800/50 hover:text-white"
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                    <span>{item.label}</span>
                  </button>
                );
              })}
              <div className="pt-4 border-t border-gray-700 mt-4">
                {!account ? (
                  <button
                    onClick={() => {
                      onConnect();
                      setIsMenuOpen(false);
                    }}
                    className="w-full bg-green-600 hover:bg-green-700 text-white font-medium px-4 py-3 rounded-md transition-colors duration-200 flex items-center justify-center space-x-2"
                  >
                    <Wallet className="h-4 w-4" />
                    <span>Connecter MetaMask</span>
                  </button>
                ) : (
                  <div className="text-green-400 text-sm bg-gray-800/80 border border-gray-700 px-3 py-2 rounded-md text-center font-mono">
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
