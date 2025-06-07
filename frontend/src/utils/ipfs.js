// Configuration IPFS
const IPFS_API_URL = "http://127.0.0.1:5001/api/v0";
const IPFS_GATEWAY_URL = "http://127.0.0.1:8080/ipfs";

/**
 * Upload un fichier vers IPFS
 * @param {File} file - Le fichier à uploader
 * @returns {Promise<string>} - Le hash IPFS du fichier
 */
export const uploadFile = async (file) => {
  try {
    if (!file) throw new Error("Aucun fichier fourni");

    const formData = new FormData();
    formData.append("file", file);

    const response = await fetch(`${IPFS_API_URL}/add?pin=true`, {
      method: "POST",
      body: formData,
    });

    const text = await response.text();
    const lines = text.trim().split("\n");
    const result = JSON.parse(lines[lines.length - 1]); // IPFS peut retourner plusieurs lignes JSON
    return result.Hash;
  } catch (error) {
    console.error("Erreur IPFS:", error);
    throw error;
  }
};


/**
 * Récupère un fichier depuis IPFS
 * @param {string} hash - Le hash IPFS du fichier
 * @returns {Promise<Blob>} - Le contenu du fichier
 */
export const getFile = async (hash) => {
  try {
    if (!hash) {
      throw new Error("Hash IPFS requis");
    }

    const response = await fetch(`${IPFS_GATEWAY_URL}/${hash}`);
    
    if (!response.ok) {
      throw new Error(`Erreur lors de la récupération: ${response.status}`);
    }

    return await response.blob();

  } catch (error) {
    console.error("Erreur lors de la récupération IPFS:", error);
    throw error;
  }
};

/**
 * Génère l'URL complète pour accéder à un fichier IPFS
 * @param {string} hash - Le hash IPFS
 * @returns {string} - L'URL complète
 */
export const getFileURL = (hash) => {
  return `${IPFS_GATEWAY_URL}/${hash}`;
};

/**
 * Vérifie si IPFS est accessible
 * @returns {Promise<boolean>} - True si IPFS est accessible
 */
export const checkIPFSConnection = async () => {
  try {
    const response = await fetch(`${IPFS_API_URL}/version`, {
      method: "POST"
    });
    return response.ok;
  } catch (error) {
    console.error("IPFS non accessible:", error);
    return false;
  }
};

/**
 * Upload du contenu JSON vers IPFS
 * @param {Object} jsonData - Les données JSON à uploader
 * @returns {Promise<string>} - Le hash IPFS
 */
export const uploadJSON = async (jsonData) => {
  try {
    const jsonString = JSON.stringify(jsonData);
    const blob = new Blob([jsonString], { type: "application/json" });
    const file = new File([blob], "data.json", { type: "application/json" });
    
    return await uploadFile(file);

  } catch (error) {
    console.error("Erreur lors de l'upload JSON:", error);
    throw error;
  }
};

/**
 * Récupère et parse du contenu JSON depuis IPFS
 * @param {string} hash - Le hash IPFS
 * @returns {Promise<Object>} - Les données JSON parsées
 */
export const getJSON = async (hash) => {
  try {
    const blob = await getFile(hash);
    const text = await blob.text();
    return JSON.parse(text);

  } catch (error) {
    console.error("Erreur lors de la récupération JSON:", error);
    throw error;
  }
};