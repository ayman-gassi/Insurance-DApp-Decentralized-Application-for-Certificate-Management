import React, { useState, useEffect } from "react";
import { FileText, ExternalLink, Clock, Tag } from "lucide-react";
import { QRCodeSVG } from 'qrcode.react';

const ViewMyCertificatePage = ({ contract, account }) => {
  const [certificates, setCertificates] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCertificates = async () => {
      if (contract && account) {
        try {
          setIsLoading(true);
          setError("");
          const certs = await contract.getClientCertificates(account);
          
          if (certs.length === 0) {
            setError("Vous n'avez pas encore de certificats");
            setCertificates([]);
            return;
          }

          const formattedCerts = certs.map(cert => ({
            hash: cert.ipfsHash,
            insuranceType: cert.insuranceType,
            timestamp: new Date(Number(cert.timestamp) * 1000).toLocaleDateString('fr-FR', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            }),
          })).reverse();

          setCertificates(formattedCerts);
        } catch (err) {
          console.error("Error fetching certificates:", err);
          setError("Erreur lors de la récupération de vos certificats");
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchCertificates();
  }, [contract, account]);

  const getIpfsUrl = (hash) => `http://127.0.0.1:8080/ipfs/${hash}`;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="relative inline-block mb-4">
            <div className="absolute inset-0 bg-green-500 rounded-full blur-xl opacity-30 animate-pulse"></div>
            <div className="relative animate-spin rounded-full h-12 w-12 border-b-2 border-green-400"></div>
          </div>
          <p className="text-gray-300 font-medium">Chargement de vos certificats...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gray-900/80 border border-green-500/30 rounded-2xl shadow-2xl shadow-green-500/20 p-8 backdrop-blur-md">
          <div className="text-center mb-8">
            <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <FileText className="h-8 w-8 text-green-600" />
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">
              Mes Certificats
            </h1>
            <p className="text-gray-400">
              Consultez vos certificats d'assurance
            </p>
          </div>

          {error ? (
            <div className="text-center p-8">
              <p className="text-red-400">{error}</p>
            </div>
          ) : certificates.length > 0 ? (
            <div className="space-y-6">
              {certificates.map((cert, index) => (
                <div
                  key={index}
                  className="bg-gray-800/50 border border-green-500/20 rounded-lg p-6 backdrop-blur-sm hover:bg-gray-800/70 transition-colors"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-4">
                      <div className="bg-green-500/10 p-3 rounded-lg">
                        <Tag className="h-6 w-6 text-green-400" />
                      </div>
                      <div>
                        <h3 className="text-lg font-medium text-green-400">
                          {cert.insuranceType}
                        </h3>
                        <div className="flex items-center mt-1 text-gray-400 text-sm">
                          <Clock className="h-4 w-4 mr-1" />
                          <span>{cert.timestamp}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                    <a
                        href={getIpfsUrl(cert.hash)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center px-4 py-2 bg-green-500/20 text-green-400 rounded-lg hover:bg-green-500/30 transition-colors"
                      >
                        <FileText className="h-4 w-4 mr-2" />
                        Voir Document
                        <ExternalLink className="h-3 w-3 ml-1" />
                      </a>
                      <div className="bg-white p-2 rounded-lg">
                        <QRCodeSVG 
                          value={getIpfsUrl(cert.hash)}
                          size={100}
                          level="H"
                          includeMargin={true}
                          imageSettings={{
                            src: "/logo.png",
                            x: undefined,
                            y: undefined,
                            height: 24,
                            width: 24,
                            excavate: true,
                          }}
                        />
                      </div>
                     
                    </div>
                  </div>
                  <div className="mt-4 pt-4 border-t border-green-500/10">
                    <p className="text-gray-500 text-sm font-mono break-all">
                      IPFS Hash: {cert.hash}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center p-8">
              <p className="text-gray-400">Aucun certificat trouvé</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ViewMyCertificatePage; 