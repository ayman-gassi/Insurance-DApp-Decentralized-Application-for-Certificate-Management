import React, { useState } from "react";
import { FileText } from "lucide-react";
import { uploadFile } from "../utils/ipfs";
import StatusMessage from "../components/StatusMessage";

const AddCertificatePage = ({ contract }) => {
  const [client, setClient] = useState("");
  const [file, setFile] = useState(null);
  const [insuranceType, setInsuranceType] = useState("");
  const [status, setStatus] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const insuranceTypes = [
    "Assurance Automobile",
    "Assurance Habitation",
    "Assurance Vie",
    "Assurance Santé",
    "Assurance Professionnelle",
    "Assurance Voyage"
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!client || !file || !insuranceType) {
      return alert("Tous les champs sont requis");
    }

    setIsLoading(true);
    try {
      setStatus("📤 Upload du certificat sur IPFS…");
      const hash = await uploadFile(file);
      console.log(`📄 Certificat uploadé avec succès ! Hash: ${hash}`);

      setStatus("⛓️ Envoi de la transaction sur la blockchain…");
      const tx = await contract.addCertificate(client, hash, insuranceType);
      await tx.wait();

      setStatus(
        `✅ Certificat ajouté avec succès !\n\n👤 Client : ${client}\n\n📄 Transaction : ${tx.hash}\n🏷️ Type d'assurance : ${insuranceType}\n\n<div style="display:flex; justify-content:center; align-items:center;"><img src="http://127.0.0.1:8080/ipfs/${hash}" alt="Certificat" style="max-width:100%; margin-top:1em;" /></div>`
      );
      setClient("");
      setFile(null);
      setInsuranceType("");
    } catch (err) {
      console.error("Erreur transaction :", err);
      setStatus("❌ Échec de la transaction");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black py-12">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gray-900/80 border border-green-500/30 rounded-2xl shadow-2xl shadow-green-500/20 p-8 backdrop-blur-md">
          <div className="text-center mb-8">
            <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <FileText className="h-8 w-8 text-green-600" />
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">
              Ajouter un Certificat
            </h1>
            <p className="text-gray-400">
              Émettez un nouveau certificat d'assurance sur la blockchain
            </p>
          </div>

          <div className="space-y-6">
            <div>
              <label htmlFor="client" className="block text-sm font-medium text-gray-300 mb-2">
                Adresse Ethereum du Client
              </label>
              <input
                id="client"
                type="text"
                placeholder="0x..."
                value={client}
                onChange={e => setClient(e.target.value)}
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-white placeholder-gray-500 transition-colors"
                disabled={isLoading}
              />
            </div>

            <div>
              <label htmlFor="insuranceType" className="block text-sm font-medium text-gray-300 mb-2">
                Type d'Assurance
              </label>
              <select
                id="insuranceType"
                value={insuranceType}
                onChange={e => setInsuranceType(e.target.value)}
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-white transition-colors"
                disabled={isLoading}
              >
                <option value="">Sélectionnez un type d'assurance</option>
                {insuranceTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="file" className="block text-sm font-medium text-gray-300 mb-2">
                Fichier du Certificat
              </label>
              <div className="border-2 border-dashed border-gray-700 rounded-lg p-6 text-center hover:border-green-500 transition-colors">
                <input
                  id="file"
                  type="file"
                  onChange={e => setFile(e.target.files[0])}
                  className="hidden"
                  disabled={isLoading}
                />
                <label htmlFor="file" className="cursor-pointer">
                  <FileText className="h-12 w-12 text-gray-500 mx-auto mb-2" />
                  <p className="text-gray-400">
                    {file ? file.name : "Cliquez pour sélectionner un fichier"}
                  </p>
                </label>
              </div>
            </div>

            <button
              type="button"
              onClick={handleSubmit}
              disabled={isLoading || !client || !file || !insuranceType}
              className="w-full bg-gradient-to-r from-green-600 to-green-400 text-white py-3 px-6 rounded-lg font-medium hover:from-green-700 hover:to-green-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              {isLoading ? "Traitement en cours..." : "Ajouter le Certificat"}
            </button>
          </div>

          {status && (
            <StatusMessage status={status} />
          )}
        </div>
      </div>
    </div>
  );
};

export default AddCertificatePage;