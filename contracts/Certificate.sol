// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Certificate {
    address public owner;
    struct CertificateData {
        string ipfsHash;
        string insuranceType;
        uint256 timestamp;
    }
    mapping(address => CertificateData[]) private clientCertificates;
    mapping(address => bool) private isClient;
    mapping(string => uint256) private certificatesByType;
    address[] public clients;
    uint256 public totalCertificates;
    event CertificateIssued(
        address indexed client,
        string ipfsHash,
        string insuranceType,
        uint256 timestamp
    );

    constructor() {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, unicode"Accès réservé à l'agence");
        _;
    }

    function addCertificate(address client, string calldata ipfsHash, string calldata insuranceType) external onlyOwner {
        if (!isClient[client]) {
            isClient[client] = true;
            clients.push(client);
        }

        clientCertificates[client].push(CertificateData({
            ipfsHash: ipfsHash,
            insuranceType: insuranceType,
            timestamp: block.timestamp
        }));

        certificatesByType[insuranceType]++;
        totalCertificates++;

        emit CertificateIssued(client, ipfsHash, insuranceType, block.timestamp);
    }

    function getClientCertificates(address client) external view returns (CertificateData[] memory) {
        return clientCertificates[client];
    }

    function getLatestCertificate(address client) external view returns (string memory, string memory, uint256) {
        require(clientCertificates[client].length > 0, "No certificates found");
        CertificateData memory latest = clientCertificates[client][clientCertificates[client].length - 1];
        return (latest.ipfsHash, latest.insuranceType, latest.timestamp);
    }

    function getTotalCertificates() external view returns (uint256) {
        return totalCertificates;
    }

    function getAllClients() external view returns (address[] memory) {
        return clients;
    }

    function getClientCertificateCount(address client) external view returns (uint256) {
        return clientCertificates[client].length;
    }

    function getCertificateCountByType(string calldata insuranceType) external view returns (uint256) {
        return certificatesByType[insuranceType];
    }

    function getClientInsuranceTypes(address client) external view returns (string[] memory) {
        CertificateData[] memory certs = clientCertificates[client];
        string[] memory types = new string[](certs.length);
        for (uint i = 0; i < certs.length; i++) {
            types[i] = certs[i].insuranceType;
        }
        return types;
    }
}
