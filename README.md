# Insurance DApp - Blockchain Certificate Management

## 🌟 Project Overview

This decentralized application (DApp) revolutionizes insurance certificate management by leveraging blockchain technology. Built on Ethereum, it provides a secure, transparent, and efficient way to issue, store, and verify insurance certificates.

### Key Features:
- 🔐 Secure certificate issuance on Ethereum blockchain
- 📂 Decentralized storage using IPFS
- 🔍 Real-time certificate verification
- 👥 Multi-user support with role-based access
- 🎨 Modern, responsive UI with real-time updates

## 🏗 Project Structure

```
Insurance-DApp/
├── contracts/               # Smart contracts
│   └── Certificate.sol     # Main certificate contract
├── frontend/               # React frontend application
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/         # Page components
│   │   ├── utils/         # Utility functions
│   │   └── config.js      # Configuration file
│   └── package.json
├── scripts/                # Deployment and test scripts
│   ├── deploy.js
├── hardhat.config.js       # Hardhat configuration
└── docker-compose.yml      # Docker compose configuration
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v14+ recommended)
- Docker and Docker Compose
- Git
- MetaMask browser extension

### Clone the Repository

```bash
git clone https://github.com/ayman-gassi/Insurance-DApp-Decentralized-Application-for-Certificate-Management
cd Insurance-DApp-Decentralized-Application-for-Certificate-Management
```

### Setup Steps

1. **Start IPFS and Database Services**
   ```bash
   docker-compose up -d
   ```

2. **Install Backend Dependencies**
   ```bash
   npm install
   ```

3. **Install Frontend Dependencies**
   ```bash
   cd frontend
   npm install
   cd ..
   ```

4. **Start Local Blockchain**
   ```bash
   npx hardhat node
   ```

5. **Deploy Smart Contracts**
   ```bash
   npx hardhat run scripts/deploy.js --network localhost
   ```
   ⚠️ Note: Save the contract address displayed after deployment

6. **Start Frontend Application**
   ```bash
   cd frontend
   npm start
   ```


## 🔧 Common Issues and Solutions

1. **MetaMask Connection Issues**
   - Ensure you're connected to the Hardhat network
   - Reset your MetaMask account if you restart the Hardhat node

2. **Contract Interaction Errors**
   - Verify the contract address in `frontend/src/config.js`
   - Make sure your MetaMask account has sufficient ETH

3. **IPFS Connection Issues**
   - Check if the IPFS container is running: `docker ps`
   - Ensure port 8080 is not being used by another service
