import React from "react";
import { Shield, FileText, Search } from "lucide-react";

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="mb-8">
            <Shield className="h-20 w-20 text-blue-600 mx-auto mb-4" />
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4">
              Gestion des Certificats
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> Blockchain</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Une solution sécurisée et décentralisée pour émettre, stocker et vérifier 
              vos certificats d'assurance sur la blockchain Ethereum.
            </p>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow">
            <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mb-6 mx-auto">
              <Shield className="h-8 w-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">Sécurité Blockchain</h3>
            <p className="text-gray-600 text-center">
              Vos certificats sont stockés de manière immuable sur la blockchain Ethereum, 
              garantissant leur authenticité et leur intégrité.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow">
            <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mb-6 mx-auto">
              <FileText className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">Stockage IPFS</h3>
            <p className="text-gray-600 text-center">
              Les documents sont stockés de manière décentralisée sur IPFS, 
              assurant leur disponibilité et leur résistance à la censure.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow">
            <div className="bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center mb-6 mx-auto">
              <Search className="h-8 w-8 text-purple-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">Vérification Rapide</h3>
            <p className="text-gray-600 text-center">
              Vérifiez instantanément l'authenticité de n'importe quel certificat 
              grâce à notre système de recherche par adresse Ethereum.
            </p>
          </div>
        </div>

        {/* Stats Section */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-blue-600 mb-2">100%</div>
              <div className="text-gray-600">Sécurisé</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-green-600 mb-2">24/7</div>
              <div className="text-gray-600">Disponible</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-purple-600 mb-2">∞</div>
              <div className="text-gray-600">Durabilité</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;