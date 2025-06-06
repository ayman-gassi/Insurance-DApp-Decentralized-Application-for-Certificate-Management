import React, { useState } from "react";
import { FileText } from "lucide-react";
import { uploadFile } from "../utils/ipfs";

const AddCertificatePage = ({ contract }) => {
  const [client, setClient] = useState("");
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!client || !file) return alert("Adresse et fichier requis");

    setIsLoading(true);
    try {
      setStatus("📤 Upload du certificat sur IPFS…");
      const hash = await uploadFile(file);

      setStatus("⛓️ Envoi de la transaction sur la blockchain…");
      const tx = await contract.addCertificate(client, hash);
      await tx.wait();

      setStatus("✅ Certificat d'assurance ajouté avec succès !");
      setClient("");
      setFile(null);
    } catch (err) {
      console.error("Erreur transaction :", err);
      setStatus("❌ Échec de la transaction");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gray-900 border border-green-400 rounded-2xl shadow-xl p-8">
          <div className="text-center mb-8">
            <div className="bg-green-400 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <FileText className="h-8 w-8 text-black" />
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">
              Ajouter un Certificat
            </h1>
            <p className="text-gray-300">
              Émettez un nouveau certificat d'assurance sur la blockchain
            </p>
          </div>

          <div className="space-y-6">
            <div>
              <label
                htmlFor="client"
                className="block text-sm font-medium text-green-400 mb-2"
              >
                Adresse Ethereum du Client
              </label>
              <input
                id="client"
                type="text"
                placeholder="0x..."
                value={client}
                onChange={(e) => setClient(e.target.value)}
                className="w-full px-4 py-3 bg-black border border-green-400 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-green-400 focus:border-green-400 transition-colors"
                disabled={isLoading}
              />
            </div>

            <div>
              <label
                htmlFor="file"
                className="block text-sm font-medium text-green-400 mb-2"
              >
                Fichier du Certificat
              </label>
              <div className="border-2 border-dashed border-green-400 rounded-lg p-6 text-center hover:border-green-300 transition-colors">
                <input
                  id="file"
                  type="file"
                  onChange={(e) => setFile(e.target.files[0])}
                  className="hidden"
                  disabled={isLoading}
                />
                <label htmlFor="file" className="cursor-pointer">
                  <FileText className="h-12 w-12 text-green-400 mx-auto mb-2" />
                  <p className="text-gray-300">
                    {file ? file.name : "Cliquez pour sélectionner un fichier"}
                  </p>
                </label>
              </div>
            </div>

            <button
              type="button"
              onClick={handleSubmit}
              disabled={isLoading || !client || !file}
              className="w-full bg-gradient-to-r from-green-400 to-green-500 text-black py-3 px-6 rounded-lg font-medium hover:from-green-300 hover:to-green-400 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              {isLoading ? "Traitement en cours..." : "Ajouter le Certificat"}
            </button>
          </div>

          {status && (
            <div
              className={`mt-6 p-4 rounded-lg text-center font-medium ${
                status.includes("✅")
                  ? "bg-green-400 text-black"
                  : status.includes("❌")
                  ? "bg-red-500 text-white"
                  : "bg-green-400 text-black"
              }`}
            >
              {status}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddCertificatePage;
