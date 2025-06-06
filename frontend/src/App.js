import React, { useState, useEffect } from "react";
import { Wallet } from "lucide-react";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import AddCertificatePage from "./pages/AddCertificatePage";
import ViewCertificatePage from "./pages/ViewCertificatePage";
import { initEthereum, connectWallet } from "./utils/ethereum";
import "./App.css";

function App() {
  const [account, setAccount] = useState(null);
  const [contract, setContract] = useState(null);
  const [currentPage, setCurrentPage] = useState("home");

  useEffect(() => {
    if (window.ethereum) {
      window.ethereum
        .request({ method: "eth_accounts" })
        .then(async (accounts) => {
          if (accounts.length) {
            setAccount(accounts[0]);
            const c = await initEthereum();
            setContract(c);
          }
        });
    }
  }, []);

  const handleConnect = async () => {
    try {
      await connectWallet();
      const [acct] = await window.ethereum.request({ method: "eth_accounts" });
      setAccount(acct);
      const c = await initEthereum();
      setContract(c);
    } catch (err) {
      alert("Connexion refusée");
    }
  };

  const renderPage = () => {
    if (!account) {
      return (
        <div className="min-h-screen bg-black relative overflow-hidden flex items-center justify-center">
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
          <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-green-500 rounded-full opacity-10 blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-green-400 rounded-full opacity-5 blur-3xl animate-pulse delay-1000"></div>

          <div className="relative z-10 bg-gray-900/80 border border-green-500/30 rounded-2xl shadow-2xl shadow-green-500/20 p-8 text-center max-w-md backdrop-blur-md">
            <div className="relative inline-block mb-4">
              <div className="absolute inset-0 bg-green-500 rounded-full blur-xl opacity-30 animate-pulse"></div>
              <div className="relative bg-black border-2 border-green-500 rounded-full p-4 shadow-lg shadow-green-500/50">
                <Wallet className="h-16 w-16 text-green-400 mx-auto" />
              </div>
            </div>

            <h2 className="text-2xl font-bold text-white mb-4">
              Connexion Requise
            </h2>
            <p className="text-gray-300 mb-6">
              Connectez votre portefeuille MetaMask pour accéder à l'application
            </p>
            <button
              onClick={handleConnect}
              className="w-full bg-gradient-to-r from-green-500 to-green-600 text-black font-bold py-3 px-6 rounded-lg hover:from-green-400 hover:to-green-500 transition-all duration-300 shadow-lg shadow-green-500/30 hover:shadow-green-500/50 hover:scale-105"
            >
              Connecter MetaMask
            </button>
          </div>
        </div>
      );
    }

    if (!contract) {
      return (
        <div className="min-h-screen bg-black relative overflow-hidden flex items-center justify-center">
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
          <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-green-500 rounded-full opacity-10 blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-green-400 rounded-full opacity-5 blur-3xl animate-pulse delay-1000"></div>

          <div className="relative z-10 text-center">
            <div className="relative inline-block mb-4">
              <div className="absolute inset-0 bg-green-500 rounded-full blur-xl opacity-30 animate-pulse"></div>
              <div className="relative animate-spin rounded-full h-12 w-12 border-b-2 border-green-400 mx-auto shadow-lg shadow-green-500/50"></div>
            </div>
            <p className="text-gray-300 font-medium">
              Initialisation du contrat…
            </p>
          </div>
        </div>
      );
    }

    switch (currentPage) {
      case "home":
        return <HomePage />;
      case "add":
        return <AddCertificatePage contract={contract} />;
      case "search":
        return <ViewCertificatePage contract={contract} />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen bg-black relative">
      {/* Electric Grid Background for entire app */}
      <div className="fixed inset-0 opacity-5 pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(rgba(34, 197, 94, 0.3) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(34, 197, 94, 0.3) 1px, transparent 1px)`,
            backgroundSize: "50px 50px",
          }}
        ></div>
      </div>

      {/* Ambient Glowing Effects */}
      <div className="fixed top-0 left-0 w-96 h-96 bg-green-500 rounded-full opacity-5 blur-3xl animate-pulse pointer-events-none"></div>
      <div className="fixed bottom-0 right-0 w-80 h-80 bg-green-400 rounded-full opacity-3 blur-3xl animate-pulse delay-1000 pointer-events-none"></div>

      <div className="relative z-10">
        <Navbar
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          account={account}
          onConnect={handleConnect}
        />
        {renderPage()}
      </div>

      {/* Electric Border Animation */}
      <div className="fixed bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-green-500 to-transparent animate-pulse pointer-events-none"></div>
    </div>
  );
}

export default App;
