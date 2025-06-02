import React, { useState, useEffect } from "react";
import { Wallet } from "lucide-react";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import AddCertificatePage from "./pages/AddCertificatePage";
import ViewCertificatePage from "./pages/ViewCertificatePage";
import { initEthereum, connectWallet } from "./utils/ethereum";

function App() {
  const [account, setAccount] = useState(null);
  const [contract, setContract] = useState(null);
  const [currentPage, setCurrentPage] = useState('home');

  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.request({ method: "eth_accounts" })
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
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
          <div className="bg-white rounded-2xl shadow-xl p-8 text-center max-w-md">
            <Wallet className="h-16 w-16 text-blue-600 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Connexion Requise
            </h2>
            <p className="text-gray-600 mb-6">
              Connectez votre portefeuille MetaMask pour accéder à l'application
            </p>
            <button
              onClick={handleConnect}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-6 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-all"
            >
              Connecter MetaMask
            </button>
          </div>
        </div>
      );
    }

    if (!contract) {
      return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Initialisation du contrat…</p>
          </div>
        </div>
      );
    }

    switch (currentPage) {
      case 'home':
        return <HomePage />;
      case 'add':
        return <AddCertificatePage contract={contract} />;
      case 'search':
        return <ViewCertificatePage contract={contract} />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar 
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        account={account}
        onConnect={handleConnect}
      />
      {renderPage()}
    </div>
  );
}

export default App;