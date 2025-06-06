import React, { useState } from "react";
import { Search, FileText } from "lucide-react";

const ViewCertificatePage = ({ contract }) => {
  const [policyHolder, setPolicyHolder] = useState("");
  const [ipfsHash, setIpfsHash] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLookup = async () => {
    if (!policyHolder) return alert("Adresse requise");

    setIsLoading(true);
    try {
      const hash = await contract.getCertificate(policyHolder);
      setIpfsHash(hash);
    } catch (err) {
      console.error("Erreur lors de la recherche:", err);
      alert("Erreur lors de la recherche du certificat");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen  flex  py-12">
      <div className="max-w-2xl w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gray-900 border border-green-400 rounded-2xl shadow-xl p-8">
          <div className="text-center mb-8">
            <div className="bg-green-400 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <Search className="h-8 w-8 text-black" />
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">
              Rechercher un Certificat
            </h1>
            <p className="text-gray-300">
              Vérifiez l'authenticité d'un certificat d'assurance
            </p>
          </div>

          <div className="space-y-6">
            <div>
              <label
                htmlFor="address"
                className="block text-sm font-medium text-green-400 mb-2"
              >
                Adresse Ethereum du Titulaire
              </label>
              <input
                id="address"
                type="text"
                placeholder="0x..."
                value={policyHolder}
                onChange={(e) => setPolicyHolder(e.target.value)}
                className="w-full px-4 py-3 bg-black border border-green-400 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-green-400 focus:border-green-400 transition-colors"
                disabled={isLoading}
              />
            </div>

            <button
              onClick={handleLookup}
              disabled={isLoading || !policyHolder}
              className="w-full bg-gradient-to-r from-green-400 to-green-500 text-black py-3 px-6 rounded-lg font-medium hover:from-green-300 hover:to-green-400 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              {isLoading ? "Recherche en cours..." : "Rechercher le Certificat"}
            </button>
          </div>

          {ipfsHash && (
            <div className="mt-8 p-6 bg-green-400 rounded-lg border border-green-300">
              <h3 className="text-lg font-medium text-black mb-3">
                Certificat trouvé !
              </h3>
              <p className="text-sm text-black mb-4">
                Hash IPFS:{" "}
                <code className="bg-black text-green-400 px-2 py-1 rounded text-xs">
                  {ipfsHash}
                </code>
              </p>
              <a
                href={`http://127.0.0.1:8080/ipfs/${ipfsHash}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-4 py-2 bg-black text-green-400 border border-green-400 rounded-lg hover:bg-gray-900 transition-colors"
              >
                <FileText className="h-4 w-4 mr-2" />
                Voir le Certificat
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ViewCertificatePage;
