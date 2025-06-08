import React, { useState, useEffect } from "react";
import { Users, FileText, ExternalLink, PieChart, BarChart } from "lucide-react";
import { useNavigate } from "react-router-dom";


const OwnerDashboardPage = ({ contract }) => {
  const [clients, setClients] = useState([]);
  const [statistics, setStatistics] = useState({
    totalCertificates: 0,
    certificatesByType: {},
    clientsWithMultipleCerts: 0
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const insuranceTypes = [
    "Assurance Automobile",
    "Assurance Habitation",
    "Assurance Vie",
    "Assurance Santé",
    "Assurance Professionnelle",
    "Assurance Voyage"
  ];

  useEffect(() => {
    const fetchData = async () => {
      if (contract) {
        try {
          setIsLoading(true);
          const addresses = await contract.getAllClients();
          
          // Fetch statistics
          const total = await contract.getTotalCertificates();
          const typeStats = {};
          let multipleCount = 0;

          // Get certificates count by type
          for (const type of insuranceTypes) {
            const count = await contract.getCertificateCountByType(type);
            typeStats[type] = Number(count);
          }
          
          // Fetch details for each client
          const clientsData = await Promise.all(
            addresses.map(async (address) => {
              const certificates = await contract.getClientCertificates(address);
              if (certificates.length > 1) multipleCount++;
              
              return {
                address,
                certificates: certificates.map(cert => ({
                  hash: cert.ipfsHash,
                  insuranceType: cert.insuranceType,
                  timestamp: new Date(Number(cert.timestamp) * 1000).toLocaleDateString()
                }))
              };
            })
          );
          
          setClients(clientsData);
          setStatistics({
            totalCertificates: Number(total),
            certificatesByType: typeStats,
            clientsWithMultipleCerts: multipleCount
          });
          setError("");
        } catch (err) {
          console.error("Error fetching data:", err);
          setError("Erreur lors de la récupération des données");
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchData();
  }, [contract]);

  const handleViewCertificate = (address) => {
    navigate('/search', { state: { searchAddress: address } });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="relative inline-block mb-4">
            <div className="absolute inset-0 bg-green-500 rounded-full blur-xl opacity-30 animate-pulse"></div>
            <div className="relative animate-spin rounded-full h-12 w-12 border-b-2 border-green-400"></div>
          </div>
          <p className="text-gray-300 font-medium">Chargement des données...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gray-900/80 border border-green-500/30 rounded-xl p-6 backdrop-blur-md">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold text-white">Total Certificats</h3>
              <BarChart className="h-6 w-6 text-green-400" />
            </div>
            <p className="text-3xl font-bold text-green-400 mt-2">{statistics.totalCertificates}</p>
          </div>

          <div className="bg-gray-900/80 border border-green-500/30 rounded-xl p-6 backdrop-blur-md">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold text-white">Clients Multi-Certificats</h3>
              <Users className="h-6 w-6 text-green-400" />
            </div>
            <p className="text-3xl font-bold text-green-400 mt-2">{statistics.clientsWithMultipleCerts}</p>
          </div>

          <div className="bg-gray-900/80 border border-green-500/30 rounded-xl p-6 backdrop-blur-md">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold text-white">Types d'Assurance</h3>
              <PieChart className="h-6 w-6 text-green-400" />
            </div>
            <div className="mt-4 space-y-2">
              {Object.entries(statistics.certificatesByType)
                .filter(([_, count]) => count > 0)
                .map(([type, count]) => (
                  <div key={type} className="flex justify-between items-center">
                    <span className="text-gray-300 text-sm">{type}</span>
                    <span className="text-green-400 font-semibold">{count}</span>
                  </div>
                ))}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="bg-gray-900/80 border border-green-500/30 rounded-2xl shadow-2xl shadow-green-500/20 p-8 backdrop-blur-md">
          <div className="text-center mb-8">
            <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <Users className="h-8 w-8 text-green-600" />
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">
              Tableau de Bord Administrateur
            </h1>
            <p className="text-gray-400">
              Gérez tous les certificats d'assurance émis
            </p>
          </div>

          {error ? (
            <div className="text-center p-8">
              <p className="text-red-400">{error}</p>
            </div>
          ) : clients.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-left border-b border-green-500/20">
                    <th className="px-6 py-3 text-green-400">Adresse</th>
                    <th className="px-6 py-3 text-green-400">Certificats</th>
                    <th className="px-6 py-3 text-green-400">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {clients.map((client) => (
                    <tr
                      key={client.address}
                      className="border-b border-green-500/10 hover:bg-green-500/5 transition-colors"
                    >
                      <td className="px-6 py-4">
                        <code className="text-gray-300 font-mono">
                          {client.address}
                        </code>
                      </td>
                      <td className="px-6 py-4">
                        <div className="space-y-2">
                          {client.certificates.map((cert, idx) => (
                            <div key={idx} className="text-sm">
                              <span className="text-green-400">{cert.insuranceType}</span>
                              <span className="text-gray-500 ml-2">({cert.timestamp})</span>
                            </div>
                          ))}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => handleViewCertificate(client.address)}
                          className="inline-flex items-center px-4 py-2 bg-green-500/20 text-green-400 rounded-lg hover:bg-green-500/30 transition-colors"
                        >
                          <FileText className="h-4 w-4 mr-2" />
                          Voir Certificats
                          <ExternalLink className="h-3 w-3 ml-1" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center p-8">
              <p className="text-gray-400">Aucun certificat émis</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OwnerDashboardPage; 