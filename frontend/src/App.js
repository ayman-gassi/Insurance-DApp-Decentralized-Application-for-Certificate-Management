// frontend/src/App.js
import React, { useState, useEffect } from "react";
import { initEthereum, connectWallet } from "./utils/ethereum";
import AddCertificate from "./components/AddCertificate";
import ViewCertificate from "./components/ViewCertificate";

function App() {
  const [account, setAccount]   = useState(null);
  const [contract, setContract] = useState(null);

  // Au montage, on vérifie si un compte est déjà autorisé
  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.request({ method: "eth_accounts" })
        .then(async (accounts) => {
          if (accounts.length) {
            setAccount(accounts[0]);
            const c = await initEthereum();    // <-- await ici
            setContract(c);
          }
        });
    }
  }, []);

  // Bouton de connexion
  const handleConnect = async () => {
    try {
      await connectWallet();
      const [acct] = await window.ethereum.request({ method: "eth_accounts" });
      setAccount(acct);

      const c = await initEthereum();        // <-- await ici aussi
      setContract(c);
    } catch (err) {
      alert("Connexion refusée");
    }
  };

  return (
    <div style={{ padding: 20 }}>
      {!account ? (
        <button onClick={handleConnect}>
          Se connecter avec MetaMask
        </button>
      ) : contract ? (
        <>
          <p>Connecté : {account}</p>
          <hr />
          <AddCertificate contract={contract} />
          <hr />
          <ViewCertificate contract={contract} />
        </>
      ) : (
        <p>Initialisation du contrat…</p>
      )}
    </div>
  );
}

export default App;
