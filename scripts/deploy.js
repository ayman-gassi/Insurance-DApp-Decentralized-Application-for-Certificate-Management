// scripts/deploy.js
require("dotenv").config();
const { ethers } = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying with:", deployer.address);

  const Cert = await ethers.getContractFactory("Certificate");
  const cert = await Cert.deploy();
  await cert.waitForDeployment();

  console.log("Certificate deployed to:", cert.target); // ethers v6 : .target est l'adresse
}

main().catch(err => {
  console.error(err);
  process.exitCode = 1;
});
