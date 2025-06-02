import React, { useState } from "react";

export default function ViewCertificate({ contract }) {
  const [policyHolder, setPolicyHolder] = useState("");
  const [ipfsHash, setIpfsHash] = useState("");

  const handleLookup = async () => {
    if (!policyHolder) return alert("Adresse requise");
    const hash = await contract.getCertificate(policyHolder);
    setIpfsHash(hash);
  };

  return (
    <div style={{
      backgroundColor: "#f9f9f9",
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
        Consulter un certificat d'assurance
      </h2>
      <input
        type="text"
        placeholder="Adresse Ethereum du titulaire de la police"
        value={policyHolder}
        onChange={e => setPolicyHolder(e.target.value)}
        style={{
          width: "100%",
          padding: "10px",
          marginBottom: "12px",
          border: "1px solid #ccc",
          borderRadius: "6px",
          fontSize: "14px"
        }}
      />
      <button onClick={handleLookup} style={{
        width: "100%",
        padding: "10px",
        backgroundColor: "#28a745",
        color: "white",
        border: "none",
        borderRadius: "6px",
        fontSize: "16px",
        cursor: "pointer"
      }}>
        Rechercher
      </button>
      {ipfsHash && (
        <p style={{
          marginTop: "16px",
          textAlign: "center"
        }}>
          Voir le certificat d'assurance :{" "}
          <a
            href={`http://127.0.0.1:8080/ipfs/${ipfsHash}`}
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "#007bff", textDecoration: "underline" }}
          >
            Voir sur gateway IPFS locale
          </a>
        </p>
      )}
    </div>
  );
}
