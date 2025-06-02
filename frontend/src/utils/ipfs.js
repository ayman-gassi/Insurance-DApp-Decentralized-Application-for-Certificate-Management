// frontend/src/utils/ipfs.js
import { create } from "ipfs-http-client";

// On se connecte au nœud local lancé avec Docker
export const ipfs = create({
  url: "http://127.0.0.1:5001/api/v0",
});

export async function uploadFile(file) {
  const added = await ipfs.add(file);
  return added.path;  // le hash IPFS
}
