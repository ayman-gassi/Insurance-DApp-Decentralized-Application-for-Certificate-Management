import React, { useState, useEffect } from "react";
import { Search, FileText, ExternalLink } from "lucide-react";
import { useLocation } from "react-router-dom";

const ViewCertificatePage = ({ contract }) => {
  const [searchAddress, setSearchAddress] = useState("");
  const [certificates, setCertificates] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const location = useLocation();

  useEffect(() => {
    // If address is passed through navigation state, search for it automatically
    if (location.state?.searchAddress) {
      setSearchAddress(location.state.searchAddress);
      handleSearch(location.state.searchAddress);
    }
  }, [location.state]);

  const handleSearch = async (address = searchAddress) => {
    if (!address) {
      setError("Veuillez entrer une adresse");
      return;
    }

    try {
      setIsLoading(true);
      setError("");
      const certs = await contract.getClientCertificates(address);
      
      if (certs.length === 0) {
        setError("Aucun certificat trouvé pour cette adresse");
        setCertificates([]);
        return;
      }

      const formattedCerts = certs.map(cert => ({
        hash: cert.ipfsHash,
        insuranceType: cert.insuranceType,
        timestamp: new Date(Number(cert.timestamp) * 1000).toLocaleDateString(),
      })).reverse();

      setCertificates(formattedCerts);
    } catch (err) {
      console.error("Error fetching certificate:", err);
      setError("Erreur lors de la récupération du certificat");
      setCertificates([]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gray-900/80 border border-green-500/30 rounded-2xl shadow-2xl shadow-green-500/20 p-8 backdrop-blur-md">
          <div className="text-center mb-8">
            <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <Search className="h-8 w-8 text-green-600" />
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">
              Rechercher un Certificat
            </h1>
            <p className="text-gray-400">
              Entrez l'adresse du client pour voir ses certificats
            </p>
          </div>

          <div className="flex gap-4 mb-8">
            <input
              type="text"
              value={searchAddress}
              onChange={(e) => setSearchAddress(e.target.value)}
              placeholder="Adresse du client (0x...)"
              className="flex-1 bg-black/50 border border-green-500/30 rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500/50"
            />
            <button
              onClick={() => handleSearch()}
              disabled={isLoading}
              className="px-6 py-2 bg-green-500 text-black font-semibold rounded-lg hover:bg-green-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "Recherche..." : "Rechercher"}
            </button>
          </div>

          {error ? (
            <div className="text-center p-8">
              <p className="text-red-400">{error}</p>
            </div>
          ) : certificates.length > 0 ? (
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-white mb-4">
                Certificats Trouvés
              </h2>
              {certificates.map((cert, index) => (
                <div
                  key={index}
                  className="bg-gray-800/50 border border-green-500/20 rounded-lg p-6 backdrop-blur-sm"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-medium text-green-400">
                        {cert.insuranceType}
                      </h3>
                      <p className="text-gray-400 text-sm mt-1">
                        Émis le {cert.timestamp}
                      </p>
                    </div>
                    <a
                      href={`http://127.0.0.1:8080/ipfs/${cert.hash}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-4 py-2 bg-green-500/20 text-green-400 rounded-lg hover:bg-green-500/30 transition-colors"
                    >
                      <FileText className="h-4 w-4 mr-2" />
                      Voir Document
                      <ExternalLink className="h-3 w-3 ml-1" />
                    </a>
                  </div>
                  <div className="mt-2">
                    <p className="text-gray-500 text-sm font-mono break-all">
                      IPFS Hash: {cert.hash}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default ViewCertificatePage;