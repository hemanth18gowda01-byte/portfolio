import { ResumeProject, BlogPost, Certification, AreaOfInterest } from '../types';

export const RESUME_PERSONAL_INFO = {
  name: 'HEMANTH GOWDA A',
  subtitle: 'Blockchain Developer | Solidity Smart Contract Developer | Cryptography Enthusiast | Python Developer',
  location: 'Bengaluru, India',
  email: 'hemanth18gowda01@gmail.com',
  phone: '+91 9187546857',
  linkedin: 'https://www.linkedin.com/in/hemanth-gowda-a-a7146a372?utm_source=share_via&utm_content=profile&utm_medium=member_android',
  github: 'https://github.com/hemanth18gowda01-byte',
  githubUsername: 'hemanth18gowda01-byte',
  professionalSummary: `Passionate Blockchain , ZKP and Cryptography enthusiast . Strong foundation in Blockchain Architecture, Smart Contract Development, Cryptography, and Python programming with hands-on experience implementing cryptographic algorithms and secure communication systems.

Developed multiple projects involving RSA cryptography, DES encryption, pseudorandom number generators, cryptographic randomness testing, and blockchain fundamentals. Currently expanding expertise in Solidity Smart Contract Development, Smart Contract Security, and Zero-Knowledge Proofs while building practical decentralized applications.

Interested in developing secure blockchain systems that combine mathematics, cryptography, ZKP and decentralized technologies.`,
  education: {
    degree: 'B.Tech in Mathematics & Computing (Pursuing)',
    institution: 'M. S. Ramaiah University of Applied Sciences, Bengaluru',
    expectedGraduation: '2029',
  },
  keyAchievements: [
    'Developed four cryptography-focused projects demonstrating secure system design.',
    'Earned NPTEL certification in Cryptography and Network Security from IIT Kharagpur.',
    'Completed multiple course work related to Blockchain in Cyfrin Updraft.',
  ],
};

export const RESUME_CORE_COMPETENCIES = [
  {
    category: 'Core Disciplines',
    skills: [
      'Blockchain Development',
      'Solidity Smart Contracts',
      'Ethereum Fundamentals',
      'Python Development',
      'Cryptography',
      'Zero-Knowledge Proofs',
    ],
  },
  {
    category: 'Public Key Cryptography & Mathematics',
    skills: [
      'Public Key Cryptography',
      'RSA Cryptosystem',
      'Hash Functions',
      'SHA-256',
      'Digital Signatures',
      'Random Number Generation',
    ],
  },
  {
    category: 'Encryption & Communication Security',
    skills: [
      'DES Encryption',
      'Linear Feedback Shift Registers (LFSRs)',
      'Geffe Generator',
      'Number Theory',
      'Secure Communication',
    ],
  },
  {
    category: 'Software Engineering & Computing',
    skills: [
      'Git',
      'GitHub',
      'Object-Oriented Programming',
      'Socket Programming',
      'Computational Mathematics',
    ],
  },
];

export const RESUME_PROJECTS: ResumeProject[] = [
  {
    id: 'blockchain-identity-access-control',
    title: 'Blockchain – Based Identity , Access Control & Digital Asset Management using NFTs',
    techLine: 'Solidity(Foundry) | Web3.py & Ethereum.js | Openzeppelin(lib)',
    category: 'Blockchain',
    bullets: [
      'Create and Store the Decentralized Identity , Maintaining the Access Control using modifiers and Digital Assets are store using ERC 721 (using existing library).',
      'Used ERC 7730 for clear sign in MetaMask .',
      'Used the ERC 4337 for Account Abstraction – now user can pay not only just cryptocurrency but also stable coins.',
      'Using Ethereum blockchain using Sepolia Faucets and Alchemy has Node operator .',
    ],
    technologies: [
      'Solidity (Foundry)',
      'Web3.py and Ethereum.js',
      'Openzeppelian Library',
      'Alchemy (node operator)',
      'Sepolia Faucets (gas)',
      'MetaMask (wallet)',
    ],
    githubUrl: 'https://github.com/hemanth18gowda01-byte',
    codeSnippet: {
      language: 'solidity',
      filename: 'IdentityRegistry.sol',
      code: `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {IERC721} from "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";

contract IdentityRegistry is Ownable {
    struct IdentityRecord {
        bytes32 identityHash;
        uint256 createdAt;
        bool isRevoked;
    }

    mapping(address => IdentityRecord) private _identities;
    mapping(address => uint256) public accessTiers;

    event IdentityRegistered(address indexed user, bytes32 indexed identityHash);

    modifier onlyTier(uint256 requiredTier) {
        require(accessTiers[msg.sender] >= requiredTier, "AccessControl: Insufficient tier");
        _;
    }

    constructor() Ownable(msg.sender) {}

    function registerIdentity(bytes32 idHash) external {
        require(_identities[msg.sender].identityHash == bytes32(0), "Identity already exists");
        _identities[msg.sender] = IdentityRecord({
            identityHash: idHash,
            createdAt: block.timestamp,
            isRevoked: false
        });
        emit IdentityRegistered(msg.sender, idHash);
    }
}`,
    },
  },
  {
    id: 'cryptographic-randomness-analyzer',
    title: 'Cryptographic Randomness Analyzer',
    techLine: 'Python | Cryptography | Mathematics',
    category: 'Cryptography',
    bullets: [
      'Developed a statistical Randomness Analyzer implementing Frequency Test, Runs Test, Chi-Square Test, Entropy Analysis, and Autocorrelation.',
      'Compared weak pseudorandom generators such as LFSRs with secure generators including Python\'s secrets module and HMAC-DRBG.',
      'Explored cryptographic randomness, key generation quality, and hash function security.',
    ],
    technologies: [
      'Python',
      'Mathematics',
      'Cryptography',
      'HMAC',
      'SHA',
      'Randomness Testing',
    ],
    githubUrl: 'https://github.com/hemanth18gowda01-byte',
    codeSnippet: {
      language: 'python',
      filename: 'randomness_analyzer.py',
      code: `import math
from collections import Counter

def calculate_shannon_entropy(data: bytes) -> float:
    """Calculates Shannon entropy in bits per byte (max 8.0)."""
    if not data:
        return 0.0
    entropy = 0.0
    length = len(data)
    counts = Counter(data)
    for count in counts.values():
        probability = count / length
        entropy -= probability * math.log2(probability)
    return entropy

def monobit_frequency_test(bitstring: str) -> tuple[float, bool]:
    """Frequency (Monobit) Test for randomness evaluation."""
    n = len(bitstring)
    s_n = sum(1 if bit == '1' else -1 for bit in bitstring)
    s_obs = abs(s_n) / math.sqrt(n)
    p_value = math.erfc(s_obs / math.sqrt(2))
    return p_value, (p_value >= 0.01)`,
    },
  },
  {
    id: 'secure-authenticated-communication-system-rsa',
    title: 'Secure Authenticated Communication System using RSA',
    techLine: 'Python | Network Security | Cryptography',
    category: 'Network Security',
    bullets: [
      'Developed a secure CLI-based communication system using RSA public-key cryptography.',
      'Implemented digital signatures for sender authentication.',
      'Used SHA-256 hashing to verify data integrity.',
      'Built encrypted communication over TCP sockets.',
    ],
    technologies: [
      'Python',
      'RSA',
      'Digital Signatures',
      'Socket Programming',
      'SHA-256',
    ],
    githubUrl: 'https://github.com/hemanth18gowda01-byte',
    codeSnippet: {
      language: 'python',
      filename: 'rsa_secure_socket.py',
      code: `import socket
import hashlib

def verify_signature(payload: bytes, signature: int, pub_key: tuple[int, int]) -> bool:
    """Verifies RSA signature using sender's public key (e, n)."""
    e, n = pub_key
    # Hash payload with SHA-256
    digest = hashlib.sha256(payload).digest()
    expected_hash = int.from_bytes(digest, byteorder='big')
    # Modular exponentiation: s^e mod n
    recovered_hash = pow(signature, e, n)
    return expected_hash == recovered_hash`,
    },
  },
  {
    id: 'data-encryption-system-des',
    title: 'Data Encryption System (DES)',
    techLine: 'Python | Cryptography',
    category: 'Cryptography',
    bullets: [
      'Implemented the Data Encryption Standard (DES) algorithm using Python.',
      'Studied DES architecture including Feistel Networks, permutation tables, key scheduling, and S-box substitutions.',
      'Analyzed why DES is considered insecure in modern cryptography.',
    ],
    technologies: [
      'Python',
      'Mathematics',
      'Cryptography',
    ],
    githubUrl: 'https://github.com/hemanth18gowda01-byte',
    codeSnippet: {
      language: 'python',
      filename: 'des_feistel.py',
      code: `def feistel_round(left: int, right: int, round_subkey: int) -> tuple[int, int]:
    """Single round of symmetric Feistel network."""
    expanded = expand_32_to_48(right)
    xored = expanded ^ round_subkey
    substituted = sbox_substitution(xored)
    permuted = p_box_permutation(substituted)
    new_left = right
    new_right = left ^ permuted
    return new_left, new_right`,
    },
  },
  {
    id: 'geffe-generator',
    title: 'Geffe Generator',
    techLine: 'Python | Stream Ciphers',
    category: 'Stream Ciphers',
    bullets: [
      'Implemented a Geffe Generator using three Linear Feedback Shift Registers.',
      'Studied nonlinear stream cipher generation techniques.',
      'Compared randomness quality with standalone LFSRs.',
    ],
    technologies: [
      'Python',
      'Mathematics',
      'Cryptography',
    ],
    githubUrl: 'https://github.com/hemanth18gowda01-byte',
    codeSnippet: {
      language: 'python',
      filename: 'geffe_generator.py',
      code: `def geffe_multiplexer(x1: int, x2: int, x3: int) -> int:
    """
    Combines three LFSR output bits:
    F(x1, x2, x3) = (x1 AND x2) XOR ((NOT x1) AND x3)
    Output correlates with x2 and x3 with 75% probability (Siegenthaler correlation).
    """
    return (x1 & x2) ^ ((1 - x1) & x3)`,
    },
  },
];

export const RESUME_TECHNICAL_SKILLS = [
  {
    category: 'Programming Languages',
    content: 'Python, C, Javascript, Solidity',
    items: ['Python', 'C', 'Javascript', 'Solidity'],
  },
  {
    category: 'Blockchain',
    content: 'Blockchain fundamentals, Blockchain Architecture, Ethereum, EVM, Solidity Smart Contracts, Foundry(intermediate), Gas Optimization(intermediate), ERC-20(learning), ERC-721(learning), Full-stack(learning).',
    items: [
      'Blockchain fundamentals',
      'Blockchain Architecture',
      'Ethereum',
      'EVM',
      'Solidity Smart Contracts',
      'Foundry (intermediate)',
      'Gas Optimization (intermediate)',
      'ERC-20 (learning)',
      'ERC-721 (learning)',
      'Full-stack (learning)',
    ],
  },
  {
    category: 'Cryptography',
    content: 'Applied Cryptography, Cryptographic Engineering, PKI(RSA & ECC), Digital Signatures(RSASSA &ECDSA), Hash function(SHA family), Authentication, Key management, Symmetric Encryption, Asymmetric Encryption, Secure Key Exchange, HMAC, Number Theory, Fundamentals of Zero-Knowledge Proofs.',
    items: [
      'Applied Cryptography',
      'Cryptographic Engineering',
      'PKI (RSA & ECC)',
      'Digital Signatures (RSASSA & ECDSA)',
      'Hash function (SHA family)',
      'Authentication',
      'Key management',
      'Symmetric Encryption',
      'Asymmetric Encryption',
      'Secure Key Exchange',
      'HMAC',
      'Number Theory',
      'Fundamentals of Zero-Knowledge Proofs',
    ],
  },
  {
    category: 'Tools',
    content: 'Git & GitHub, MetaMask, VS Code, Remix IDE, CLI(Linux & Windows Powershell)',
    items: [
      'Git & GitHub',
      'MetaMask',
      'VS Code',
      'Remix IDE',
      'CLI (Linux & Windows Powershell)',
    ],
  },
  {
    category: 'Languages',
    content: 'English (Fluent), Hindi (Conversational), Kannada (Native), Telugu (Conversational)',
    items: [
      'English (Fluent)',
      'Hindi (Conversational)',
      'Kannada (Native)',
      'Telugu (Conversational)',
    ],
  },
];

export const RESUME_CERTIFICATIONS: Certification[] = [
  {
    id: 'nptel-crypto',
    title: 'Cryptography And Network Security',
    issuer: 'NPTEL, IIT Kharagpur',
    issueDate: 'Issued: May 2026',
    credentialTitle: 'NPTEL_Certificate.pdf - Google Drive',
    credentialUrl: 'https://drive.google.com/file/d/11qBOerVzysUpv78qthSyLjGx8cCzkSYF/view?pli=1',
  },
  {
    id: 'cyfrin-solidity',
    title: 'Solidity Smart Contract Development',
    issuer: 'CYFRIN UPDRAFT',
    issueDate: 'Issued: August 2026',
    credentialTitle: "Cyfrin Profiles - Hemanth Gowda A's Updraft course completion achievement",
    credentialUrl: 'https://profiles.cyfrin.io/u/hemanth18gowda10/achievements/solidity',
  },
  {
    id: 'cyfrin-blockchain-basics',
    title: 'Blockchain Basics',
    issuer: 'CYFRIN UPDRAFT',
    issueDate: 'Issued: August 2026',
    credentialTitle: "Cyfrin Profiles - Hemanth Gowda A's Updraft course completion achievement",
    credentialUrl: 'https://profiles.cyfrin.io/u/hemanth18gowda10/achievements/blockchain-basics',
  },
  {
    id: 'cyfrin-zkp',
    title: 'Fundamentals of Zero-Knowledge Proofs (ZKP)',
    issuer: 'CYFRIN UPDRAFT',
    issueDate: 'Issued: August 2026',
    credentialTitle: "Cyfrin Profiles - Hemanth Gowda A's Updraft course completion achievement",
    credentialUrl: 'https://profiles.cyfrin.io/u/hemanth18gowda10/achievements/fundamentals-of-zero-knowledge-proofs',
  },
  {
    id: 'htb-python',
    title: 'Introduction to Python 3',
    issuer: 'HACK THE BOX',
    issueDate: 'Issued: June 2026',
    credentialTitle: 'Achievement',
    credentialUrl: 'https://academy.hackthebox.com/achievement/2647439/88',
  },
];

export const RESUME_AREAS_OF_INTEREST: AreaOfInterest[] = [
  {
    title: 'Blockchain Development',
    description: 'Developing decentralized applications and smart contracts using Solidity while exploring Ethereum ecosystem tools and best practices.',
  },
  {
    title: 'Smart Contract Security',
    description: 'Learning secure smart contract development, vulnerability analysis, access control, reentrancy prevention, and blockchain security auditing.',
  },
  {
    title: 'Cryptography',
    description: 'Designing secure communication systems using public-key cryptography, digital signatures, secure hashing, random number generation, and modern encryption techniques.',
  },
  {
    title: 'Zero-Knowledge Proofs',
    description: 'Studying zk-SNARKs, zk-STARKs, privacy-preserving protocols, and scalable cryptographic systems for blockchain applications.',
  },
  {
    title: 'Computational Mathematics',
    description: 'Applying mathematical concepts such as number theory, modular arithmetic, probability, and algebra to solve cryptographic and blockchain-related problems.',
  },
  {
    title: 'Programming & Software Development',
    description: 'Enjoy solving real-world computational problems through programming and mathematics. Passionate about implementing efficient algorithms, designing secure software systems, and continuously improving coding skills across Python, Solidity, JavaScript, and C.',
  },
];

export const RESUME_CONTACT_DETAILS = {
  phone: '+91 9187546857',
  email: 'hemanth18gowda01@gmail.com',
  linkedinUrl: 'https://www.linkedin.com/in/hemanth-gowda-a-a7146a372?utm_source=share_via&utm_content=profile&utm_medium=member_android',
  githubUrl: 'https://github.com/hemanth18gowda01-byte',
  githubHandle: 'hemanth18gowda01-byte',
  location: 'Bengaluru, India',
};

// Initial blog articles authored around the exact 5 projects and areas of interest from the resume
export const INITIAL_BLOG_POSTS: BlogPost[] = [
  {
    id: 'blockchain-identity-nft-erc4337',
    title: 'Blockchain-Based Identity, Access Control & Asset Management using NFTs (ERC-721, ERC-7730 & ERC-4337)',
    slug: 'blockchain-identity-nft-erc4337',
    category: 'Blockchain Development',
    author: 'Hemanth Gowda A',
    publishedAt: '2026-09-15',
    readTime: '6 min read',
    tags: ['Solidity', 'Foundry', 'ERC-721', 'ERC-7730', 'ERC-4337', 'MetaMask'],
    published: true,
    excerpt: 'Detailed architecture of our decentralized identity registry: Solidity modifiers for access control, ERC-7730 clear signing in MetaMask, and ERC-4337 Account Abstraction paymaster gas sponsorship.',
    content: `## Project Overview
In my project **Blockchain – Based Identity , Access Control & Digital Asset Management using NFTs**, built with Solidity (Foundry), Web3.py & Ethereum.js, and OpenZeppelin:

- **Decentralized Identity**: Stored and verified on-chain, controlling access permissions using custom Solidity modifiers.
- **Digital Asset Management**: Digital assets are represented and governed using the standard **ERC-721** non-fungible token standard from OpenZeppelin.
- **ERC-7730 Clear Signing**: Integrated to display human-readable transaction parameters in MetaMask, eliminating blind signing risks.
- **ERC-4337 Account Abstraction**: Implemented so users can pay transaction gas with stablecoins rather than just native cryptocurrency, or interact via sponsored paymasters.
- **Ethereum Network Deployment**: Deployed on the Ethereum blockchain testnet using Sepolia faucets for gas and Alchemy as the reliable node operator.

\`\`\`solidity
// Sample access modifier enforcement
modifier onlyTier(uint256 requiredTier) {
    require(accessTiers[msg.sender] >= requiredTier, "AccessControl: Insufficient tier");
    _;
}
\`\`\`
`,
  },
  {
    id: 'cryptographic-randomness-analyzer-deep-dive',
    title: 'Cryptographic Randomness Analyzer: Statistical Tests (Frequency, Runs, Chi-Square, Entropy & Autocorrelation)',
    slug: 'cryptographic-randomness-analyzer-deep-dive',
    category: 'Cryptography',
    author: 'Hemanth Gowda A',
    publishedAt: '2026-08-20',
    readTime: '7 min read',
    tags: ['Python', 'Cryptography', 'Mathematics', 'HMAC', 'SHA', 'Randomness Testing'],
    published: true,
    excerpt: 'A comprehensive study of statistical randomness testing in Python: evaluating weak pseudorandom generators like LFSRs against secure cryptographic generators including Python secrets and HMAC-DRBG.',
    content: `## Project Overview
In the **Cryptographic Randomness Analyzer** project (Python | Cryptography | Mathematics):

- Developed a statistical Randomness Analyzer implementing **Frequency Test**, **Runs Test**, **Chi-Square Test**, **Entropy Analysis**, and **Autocorrelation**.
- Evaluated and compared weak pseudorandom generators such as Linear Feedback Shift Registers (LFSRs) with secure generators including Python's \`secrets\` module and HMAC-DRBG.
- Explored cryptographic randomness, key generation quality, and hash function security.

### Evaluated Tests
1. **Frequency (Monobit) Test**: Checks whether the proportion of ones and zeros is balanced.
2. **Runs Test**: Assesses whether oscillations between consecutive 0s and 1s occur with expected frequency.
3. **Chi-Square Test**: Measures goodness-of-fit against a theoretical uniform distribution across byte values.
4. **Entropy Analysis**: Calculates Shannon entropy $H(X)$ to quantify bits of information per byte.
5. **Autocorrelation**: Identifies correlation between bit shifts in the output stream.
`,
  },
  {
    id: 'rsa-secure-authenticated-communication',
    title: 'Secure Authenticated Communication System using RSA and SHA-256 over TCP Sockets',
    slug: 'rsa-secure-authenticated-communication',
    category: 'Network Security',
    author: 'Hemanth Gowda A',
    publishedAt: '2026-07-28',
    readTime: '5 min read',
    tags: ['Python', 'RSA', 'Digital Signatures', 'Socket Programming', 'SHA-256'],
    published: true,
    excerpt: 'Building a CLI-based secure communication system: generating RSA public-private keypairs, signing with RSASSA, hashing with SHA-256, and encrypting transmission over TCP sockets.',
    content: `## Project Overview
In the **Secure Authenticated Communication System using RSA** (Python | Network Security | Cryptography):

- Developed a secure CLI-based communication system using RSA public-key cryptography.
- Implemented digital signatures for sender authentication.
- Used SHA-256 hashing to verify data integrity.
- Built encrypted communication over TCP sockets.

\`\`\`python
# Payload verification with digital signatures
def verify_signature(payload: bytes, signature: int, pub_key: tuple[int, int]) -> bool:
    e, n = pub_key
    digest = hashlib.sha256(payload).digest()
    expected_hash = int.from_bytes(digest, byteorder='big')
    recovered_hash = pow(signature, e, n)
    return expected_hash == recovered_hash
\`\`\`
`,
  },
  {
    id: 'des-feistel-network-analysis',
    title: 'Data Encryption System (DES): Studying Feistel Networks, S-Boxes and Key Scheduling',
    slug: 'des-feistel-network-analysis',
    category: 'Cryptography',
    author: 'Hemanth Gowda A',
    publishedAt: '2026-06-30',
    readTime: '6 min read',
    tags: ['Python', 'Mathematics', 'Cryptography', 'DES', 'Feistel Networks'],
    published: true,
    excerpt: 'Implementing the Data Encryption Standard (DES) from scratch in Python to understand 16-round Feistel networks, permutation tables, S-box substitutions, and reasons for modern insecurity.',
    content: `## Project Overview
In the **Data Encryption System (DES)** project (Python | Cryptography):

- Implemented the Data Encryption Standard (DES) algorithm using Python.
- Studied DES architecture including Feistel Networks, permutation tables, key scheduling, and S-box substitutions.
- Analyzed why DES is considered insecure in modern cryptography (56-bit effective key length vulnerable to brute force).
`,
  },
  {
    id: 'geffe-generator-stream-ciphers',
    title: 'Geffe Generator: Nonlinear Stream Ciphers and Standalone LFSR Comparisons',
    slug: 'geffe-generator-stream-ciphers',
    category: 'Stream Ciphers',
    author: 'Hemanth Gowda A',
    publishedAt: '2026-05-18',
    readTime: '5 min read',
    tags: ['Python', 'Stream Ciphers', 'LFSR', 'Geffe Generator', 'Mathematics'],
    published: true,
    excerpt: 'Implementation of a Geffe Generator combining three Linear Feedback Shift Registers (LFSRs) to study nonlinear stream cipher generation and evaluate correlation vulnerability.',
    content: `## Project Overview
In the **Geffe Generator** project (Python | Stream Ciphers):

- Implemented a Geffe Generator using three Linear Feedback Shift Registers.
- Studied nonlinear stream cipher generation techniques.
- Compared randomness quality with standalone LFSRs.

The Boolean combining function:
$$F(x_1, x_2, x_3) = (x_1 \\land x_2) \\oplus (\\neg x_1 \\land x_3)$$
`,
  },
];
