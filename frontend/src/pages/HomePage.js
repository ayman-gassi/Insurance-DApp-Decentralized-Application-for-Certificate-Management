import React from "react";
import { Shield, FileText, Search } from "lucide-react";

const HomePage = () => {
  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Electric Grid Background */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(rgba(34, 197, 94, 0.3) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(34, 197, 94, 0.3) 1px, transparent 1px)`,
            backgroundSize: "50px 50px",
          }}
        ></div>
      </div>

      {/* Glowing Orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-green-500 rounded-full opacity-10 blur-3xl animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-green-400 rounded-full opacity-5 blur-3xl animate-pulse delay-1000"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="mb-8">
            <div className="relative inline-block">
              <div className="absolute inset-0 bg-green-500 rounded-full blur-xl opacity-30 animate-pulse"></div>
              <div className="relative bg-black border-2 border-green-500 rounded-full p-6 shadow-2xl shadow-green-500/50">
                <Shield className="h-20 w-20 text-green-400 mx-auto" />
              </div>
            </div>

            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 mt-8">
              Gestion des Certificats
              <span className="block bg-gradient-to-r from-green-400 via-green-300 to-green-500 bg-clip-text text-transparent animate-pulse">
                Blockchain
              </span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Une solution sécurisée et décentralisée pour émettre, stocker et
              vérifier vos certificats d'assurance sur la blockchain Ethereum.
            </p>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="bg-gray-900 border border-green-500/30 rounded-xl shadow-2xl shadow-green-500/20 p-8 hover:shadow-green-500/40 hover:border-green-500/60 transition-all duration-300 hover:-translate-y-2 backdrop-blur-sm">
            <div className="bg-gradient-to-br from-green-500/20 to-green-600/20 border border-green-500/50 rounded-full w-16 h-16 flex items-center justify-center mb-6 mx-auto shadow-lg shadow-green-500/30">
              <Shield className="h-8 w-8 text-green-400" />
            </div>
            <h3 className="text-xl font-bold text-white mb-4 text-center">
              Sécurité Blockchain
            </h3>
            <p className="text-gray-300 text-center">
              Vos certificats sont stockés de manière immuable sur la blockchain
              Ethereum, garantissant leur authenticité et leur intégrité.
            </p>
          </div>

          <div className="bg-gray-900 border border-green-500/30 rounded-xl shadow-2xl shadow-green-500/20 p-8 hover:shadow-green-500/40 hover:border-green-500/60 transition-all duration-300 hover:-translate-y-2 backdrop-blur-sm">
            <div className="bg-gradient-to-br from-green-500/20 to-green-600/20 border border-green-500/50 rounded-full w-16 h-16 flex items-center justify-center mb-6 mx-auto shadow-lg shadow-green-500/30">
              <FileText className="h-8 w-8 text-green-400" />
            </div>
            <h3 className="text-xl font-bold text-white mb-4 text-center">
              Stockage IPFS
            </h3>
            <p className="text-gray-300 text-center">
              Les documents sont stockés de manière décentralisée sur IPFS,
              assurant leur disponibilité et leur résistance à la censure.
            </p>
          </div>

          <div className="bg-gray-900 border border-green-500/30 rounded-xl shadow-2xl shadow-green-500/20 p-8 hover:shadow-green-500/40 hover:border-green-500/60 transition-all duration-300 hover:-translate-y-2 backdrop-blur-sm">
            <div className="bg-gradient-to-br from-green-500/20 to-green-600/20 border border-green-500/50 rounded-full w-16 h-16 flex items-center justify-center mb-6 mx-auto shadow-lg shadow-green-500/30">
              <Search className="h-8 w-8 text-green-400" />
            </div>
            <h3 className="text-xl font-bold text-white mb-4 text-center">
              Vérification Rapide
            </h3>
            <p className="text-gray-300 text-center">
              Vérifiez instantanément l'authenticité de n'importe quel
              certificat grâce à notre système de recherche par adresse
              Ethereum.
            </p>
          </div>
        </div>

        {/* Stats Section */}
        <div className="bg-gray-900/80 border border-green-500/30 rounded-2xl shadow-2xl shadow-green-500/20 p-8 mb-16 backdrop-blur-md">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="group">
              <div className="text-5xl font-bold bg-gradient-to-br from-green-400 to-green-500 bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform duration-300">
                100%
              </div>
              <div className="text-gray-300 font-medium">Sécurisé</div>
            </div>
            <div className="group">
              <div className="text-5xl font-bold bg-gradient-to-br from-green-400 to-green-500 bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform duration-300">
                24/7
              </div>
              <div className="text-gray-300 font-medium">Disponible</div>
            </div>
            <div className="group">
              <div className="text-5xl font-bold bg-gradient-to-br from-green-400 to-green-500 bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform duration-300">
                ∞
              </div>
              <div className="text-gray-300 font-medium">Durabilité</div>
            </div>
          </div>
        </div>

        {/* Electric Border Animation */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-green-500 to-transparent animate-pulse"></div>
      </div>
    </div>
  );
};

export default HomePage;
