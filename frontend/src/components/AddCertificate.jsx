import React, { useState } from "react";
import { uploadFile } from "../utils/ipfs";
import { getAddress } from "ethers";

export default function AddCertificate({ contract }) {
  const [client, setClient] = useState("");
  const [file, setFile]     = useState(null);
  const [status, setStatus] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!client || !file) return alert("Adresse et fichier requis");

    let address;
    try {
      address = getAddress(client);
    } catch (err) {
      return alert("❌ Adresse Ethereum invalide (format attendu : 0x...)");
    }

    try {
      setStatus("📤 Upload du certificat sur IPFS…");
      const hash = await uploadFile(file);

      setStatus("⛓️ Envoi de la transaction sur la blockchain…");
      const tx = await contract.addCertificate(address, hash);
      await tx.wait();

      setStatus("✅ Certificat d'assurance ajouté !");
    } catch (err) {
      console.error("Erreur transaction :", err);
      setStatus("❌ Échec de la transaction");
    }
  };

  return (
    <div style={{
      backgroundColor: "#f0f2f5",
      padding: "24px",
      borderRadius: "10px",
      maxWidth: "500px",
      margin: "20px auto",
      boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
    }}>
      <h2 style={{
        textAlign: "center",
        color: "#333",
        marginBottom: "20px"
      }}>
        Ajouter un certificat d'assurance
      </h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Adresse Ethereum du client"
          value={client}
          onChange={e => setClient(e.target.value)}
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "12px",
            border: "1px solid #ccc",
            borderRadius: "6px",
            fontSize: "14px"
          }}
        />
        <input
          type="file"
          onChange={e => setFile(e.target.files[0])}
          style={{
            marginBottom: "12px",
            fontSize: "14px"
          }}
        />
        <button type="submit" style={{
          width: "100%",
          padding: "10px",
          backgroundColor: "#007bff",
          color: "white",
          border: "none",
          borderRadius: "6px",
          fontSize: "16px",
          cursor: "pointer"
        }}>
          Ajouter
        </button>
      </form>
      <p style={{
        marginTop: "16px",
        textAlign: "center",
        fontWeight: "bold",
        color:
          status.includes("✅") ? "green" :
          status.includes("❌") ? "red" : "#555"
      }}>
        {status}
      </p>
    </div>
  );
}
