require("dotenv").config();
const { ethers } = require("hardhat");
const path = require('path');
const fs = require('fs');

async function main() {
  const provider = ethers.provider;
  const [owner] = await ethers.getSigners();
  console.log("Deploying with:", owner.address);

  const Certificate = await ethers.getContractFactory("Certificate");
  const certificate = await Certificate.deploy();
  await certificate.waitForDeployment();
  
  const contractAddress = await certificate.getAddress();
  console.log("Certificate deployed to:", contractAddress);

  // Update the frontend config with the new contract address
  const configPath = path.join(__dirname, '../frontend/src/config.js');
  const configContent = `// frontend/src/config.js
  export const RPC_URL = "http://127.0.0.1:8545";
  export const CONTRACT_ADDRESS = "${contractAddress}";
  `;
  fs.writeFileSync(configPath, configContent);
  console.log("✅ Frontend config updated with new contract address");

  // Copy the contract artifacts
  const artifactPath = path.join(__dirname, '../artifacts/contracts/Certificate.sol/Certificate.json');
  const frontendPath = path.join(__dirname, '../frontend/src/utils/Certificate.json');
  fs.copyFileSync(artifactPath, frontendPath);
  console.log("✅ Contract ABI copied to frontend");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
