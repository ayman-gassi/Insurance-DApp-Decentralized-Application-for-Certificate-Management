import {
  BrowserProvider,
  JsonRpcProvider,
  Contract,
  getAddress
} from "ethers";
import CertificateJSON from "./Certificate.json";
import { RPC_URL, CONTRACT_ADDRESS } from "../config";

// Initialise le contrat avec un signer (MetaMask ou Hardhat)
export async function initEthereum() {
  let provider, signer;

  if (
    window.ethereum &&
    parseInt(window.ethereum.chainId, 16) !== 31337
  ) {
    // Utilisateur connecté avec MetaMask (hors Hardhat local)
    provider = new BrowserProvider(window.ethereum);

    // ⚠️ getSigner() retourne une promesse
    signer = await provider.getSigner();

    if (!signer.sendTransaction) {
      throw new Error("Signer does not support sending transactions.");
    }
  } else {
    // Mode développement local (Hardhat)
    provider = new JsonRpcProvider(RPC_URL, {
      name: "hardhat",
      chainId: 31337
    });

    // ⚠️ getSigner nécessite un await en ethers v6
    signer = await provider.getSigner(0);
  }

  // Retourne une instance de contrat connectée avec signer
  return new Contract(CONTRACT_ADDRESS, CertificateJSON.abi, signer);
}

// Connecte MetaMask et demande l'autorisation de l'utilisateur
export async function connectWallet() {
  if (!window.ethereum) {
    throw new Error("MetaMask non détecté");
  }

  await window.ethereum.request({ method: "eth_requestAccounts" });
}

// Normalise et valide une adresse Ethereum
export function normalizeAddress(raw) {
  try {
    return getAddress(raw);
  } catch {
    throw new Error("Adresse Ethereum invalide");
  }
}
