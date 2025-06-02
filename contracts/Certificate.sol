// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Certificate {
    address public owner;
    mapping(address => string) private hashes;

    event CertificateIssued(address indexed student, string ipfsHash);

    constructor() {
        owner = msg.sender;
    }

    modifier onlyOwner() {
 require(msg.sender == owner, unicode"Accès réservé à l'établissement");        _;
    }

    function addCertificate(address student, string calldata ipfsHash) external onlyOwner {
        hashes[student] = ipfsHash;
        emit CertificateIssued(student, ipfsHash);
    }

    function getCertificate(address student) external view returns (string memory) {
        return hashes[student];
    }
}
