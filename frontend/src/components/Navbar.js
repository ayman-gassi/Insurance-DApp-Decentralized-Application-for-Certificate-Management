import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Home, FileText, Search, Users, PlusCircle } from "lucide-react";

const Navbar = ({ account, onConnect, isOwner }) => {
  const location = useLocation();
  const currentPath = location.pathname;

  const NavLink = ({ to, icon: Icon, text }) => (
    <Link
      to={to}
      className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
        currentPath === to
          ? "bg-green-500/20 text-green-400"
          : "text-gray-400 hover:bg-green-500/10 hover:text-green-400"
      }`}
    >
      <Icon className="h-5 w-5 mr-2" />
      {text}
    </Link>
  );

  return (
    <nav className="bg-gray-900/80 border-b border-green-500/30 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left side - Logo/Home */}
          <div className="flex items-center">
            <Link
              to="/"
              className="flex items-center text-green-400 font-bold text-xl"
            >
              <FileText className="h-6 w-6 mr-2" />
              InsuranceChain - {isOwner ? "Owner" : "Client"}
            </Link>
          </div>

          {/* Center - Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            <NavLink to="/" icon={Home} text="Accueil" />
            
            {isOwner ? (
              <>
                <NavLink to="/add" icon={PlusCircle} text="Ajouter" />
                <NavLink to="/search" icon={Search} text="Rechercher" />
                <NavLink to="/dashboard" icon={Users} text="Tableau de Bord" />
              </>
            ) : (
              <NavLink to="/view" icon={FileText} text="Mes Certificats" />
            )}
          </div>

          {/* Right side - Account */}
          <div className="flex items-center">
            {account ? (
              <div className="bg-green-500/10 text-green-400 px-4 py-2 rounded-lg font-mono text-sm">
                {`${account.slice(0, 6)}...${account.slice(-4)}`}
              </div>
            ) : (
              <button
                onClick={onConnect}
                className="bg-green-500 text-black px-4 py-2 rounded-lg font-semibold hover:bg-green-400 transition-colors"
              >
                Connecter
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 