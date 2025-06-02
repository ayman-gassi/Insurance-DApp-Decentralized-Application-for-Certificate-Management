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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center mb-8">
            <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <Search className="h-8 w-8 text-green-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Rechercher un Certificat
            </h1>
            <p className="text-gray-600">
              Vérifiez l'authenticité d'un certificat d'assurance
            </p>
          </div>

          <div className="space-y-6">
            <div>
              <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-2">
                Adresse Ethereum du Titulaire
              </label>
              <input
                id="address"
                type="text"
                placeholder="0x..."
                value={policyHolder}
                onChange={e => setPolicyHolder(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                disabled={isLoading}
              />
            </div>

            <button
              onClick={handleLookup}
              disabled={isLoading || !policyHolder}
              className="w-full bg-gradient-to-r from-green-600 to-teal-600 text-white py-3 px-6 rounded-lg font-medium hover:from-green-700 hover:to-teal-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              {isLoading ? "Recherche en cours..." : "Rechercher le Certificat"}
            </button>
          </div>

          {ipfsHash && (
            <div className="mt-8 p-6 bg-green-50 rounded-lg border border-green-200">
              <h3 className="text-lg font-medium text-green-800 mb-3">
                Certificat trouvé !
              </h3>
              <p className="text-sm text-green-700 mb-4">
                Hash IPFS: <code className="bg-green-100 px-2 py-1 rounded text-xs">{ipfsHash}</code>
              </p>
              <a
                href={`http://127.0.0.1:8080/ipfs/${ipfsHash}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
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