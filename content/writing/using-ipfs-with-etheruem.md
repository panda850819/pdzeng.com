---
title: "Using ipfs with etheruem"
description: "Using ipfs with etheruem  Ipfs is a decentralized tool , it’s very suitable for ethereum.  We also use Smart Contract to store “data” in the etheru..."
slug: "using-ipfs-with-etheruem"
publishedAt: 2019-12-23
type: blog
locale: en
draft: true
tags: ["blockchain", "ethereum", "ipfs", "wallet", "tutorial", "go"]
---

---

### Using ipfs with etheruem

Ipfs is a decentralized tool , it’s very suitable for ethereum.

We also use **Smart Contract** to store “data” in the etheruem blockchain.

Today , We use Smart Contract to store “data（ipfs hash）” , for the purpose of immutability .

#### IPFS

What’s IPFS ?

![](https://cdn-images-1.medium.com/max/800/0*bpOnfaEv54jXRHNy.jpg)ipfs> IPFS introduction from [wiki](https://en.wikipedia.org/wiki/InterPlanetary_File_System)

The **InterPlanetary File System** (**IPFS**) is a protocol and peer-to-peer network for storing and sharing data in a distributed file system. IPFS uses content-addressing to uniquely identify each file in a global namespace connecting all computing devices.

IPFS allows users to not only receive but host content, in a similar manner to BitTorrent. As opposed to a centrally located server, IPFS is built around a decentralized system of user-operators who hold a portion of the overall data, creating a resilient system of file storage and sharing. Any user in the network can serve a file by its content address, and other peers in the network can find and request that content from any node who has it using a distributed hash table (DHT).

> Why we use ipfs ?

We know we can’t upload pictures on Ethereum, because uploading pictures on Ethereum has to pay a high gas fees.

![](https://cdn-images-1.medium.com/max/800/0*LSvzrTNxSFX2X110)gas feesWe can upload the **ipfs hash** to Ethereum Blockchain .

> How do we do ? Let’s go with our tutorial .

### Tutorial

We will use Ipfs to upload the file and deploy the **Hash (Ipfs generate) **on the Ethereum blockchain .

#### First : Prepare List

1. Chrome 
2. Metamask 
3. Remix 
4. IPFS Desktop / Extension- Chrome

*Google Chrome is a good browser can use many extensions on it .*

[**Google Chrome 網路瀏覽器**
*Google 內建的智慧功能可為你提供無比簡易、安全又快速的使用體驗。*www.google.com](https://www.google.com/intl/zh-TW/chrome/)[](https://www.google.com/intl/zh-TW/chrome/)2. Metamask

Metamask is not only a ethereum wallet but a chrome extension .

[**MetaMask**
*Get Chrome Extension Chrome Firefox Opera Brave iOS (beta) Android (beta) MetaMask is a bridge that allows you to visit…*metamask.io](https://metamask.io/)[o](https://metamask.io/)[](https://metamask.io/)3. Remix

*Remix is a smart contract complier and we also use it to test our smart contract .*

[**Remix - Ethereum IDE**
*Edit description*remix.ethereum.org](https://remix.ethereum.org/)[](https://remix.ethereum.org/)4. IPFS Desktop /Extension

mac : [https://github.com/ipfs-shipyard/ipfs-desktop/releases/download/v0.10.2/ipfs-desktop-0.10.2.dmg](https://github.com/ipfs-shipyard/ipfs-desktop/releases/download/v0.10.2/ipfs-desktop-0.10.2.dmg)windows : [https://github.com/ipfs-shipyard/ipfs-desktop/releases/download/v0.10.2/ipfs-desktop-setup-0.10.2.exe](https://github.com/ipfs-shipyard/ipfs-desktop/releases/download/v0.10.2/ipfs-desktop-setup-0.10.2.exe)[**ipfs-shipyard/ipfs-desktop**
*A desktop client for IPFS. You don't need the command line to run an IPFS node. Just install IPFS Desktop and have all…*github.com](https://github.com/ipfs-shipyard/ipfs-desktop)[](https://github.com/ipfs-shipyard/ipfs-desktop)#### Second : Write smart contract on Remix

if we install metamask on browser , and we change the network to Ropsten Testnet , and get the ether from faucet .

> Faucet

*You can get the ether from faucet.*

![](https://cdn-images-1.medium.com/max/800/1*nhdBw4DFFE5bah5wNETHfQ.png)[**Test Ether Faucet**
*Edit description*faucet.metamask.io](https://faucet.metamask.io/)[](https://faucet.metamask.io/)> Remix

- If you first use Remix , please click the **solidity button **in Eviroments.

![](https://cdn-images-1.medium.com/max/800/1*6LRkh-jtc-ItHJZOb86gCA.png)2. Create a new file on **FILE EXPLORERS** and we named it “ipfs_inbox.sol” .

![](https://cdn-images-1.medium.com/max/800/1*0MPsPW2RHF7DmPXENjioog.png)> Code on it .

pragma solidity ^0.4.23;
contract ipfs_store {
 string ipfsHash;
 
function sendHash(string x) public {
   ipfsHash = x;
}function getHash() public view returns (string x) {
   return ipfsHash;
 }
}3. Click the icon “**SOLIDITY COMPILER**” , and click compile **ipfs_inbox.sol** .

And you can see your contract **ABI** and **Bytecode** on it .

![](https://cdn-images-1.medium.com/max/800/1*Y2ZGqeS5Ude_DZtoGJkf1g.png)4. Change to **DEPLOY & RUN TRANSACTIONS**

- First : Switch Eviroments from **Javascript VM** to **Injected Web3**
- Second : Click the **deploy button**

![](https://cdn-images-1.medium.com/max/800/1*DgM2KWjhn_VJjJNPlG-59w.png)- Third : If the contract success deploy , and we can see **our contracts**.

![](https://cdn-images-1.medium.com/max/800/1*TBJ4cPGcm6AOaqEvG994tQ.png)- Fourth : Write your IPFS Hash down .

But we didn’t upload our file on IPFS , so we must upload the file first .

> Click Add Button to upload the file on IPFS .

![](https://cdn-images-1.medium.com/max/800/1*uPrJ3kg9RezNTwrIqrUcVA.png)We can see the mining.png and it’s hash .![](https://cdn-images-1.medium.com/max/800/1*AgIlJmQ45T0-MQjTFExtEA.png)We can copy the hash on the Remix .We get the hash and paste it to the remix’s contract .

> QmZRDUo9vTfMpZ3SHKDrtw1vm9X3dRiNVkkiXs5uCRriep

---

> SendHash

![](https://cdn-images-1.medium.com/max/800/1*rN2_wtCnziK6M9LxsbDiyA.png)Paste the hash .> getHash

![](https://cdn-images-1.medium.com/max/800/1*tf_Dx5vJtu5Fs3PpkZJdeQ.png)We can see our file on ipfs , ipfs.io/ipfs/”your hash”

[https://ipfs.io/ipfs/QmZRDUo9vTfMpZ3SHKDrtw1vm9X3dRiNVkkiXs5uCRriep](https://ipfs.io/ipfs/QmZRDUo9vTfMpZ3SHKDrtw1vm9X3dRiNVkkiXs5uCRriep)

And you can see my photo — miner on IPFS .

### Conclusion

IPFS is a good peer-to-peer applications , but it also have a problem about **Speeds and peers too less .**

If we want to see the anything on IPFS , we may wait too much time searching for files.

But IPFS solves a fundamental problem on the blockchain .

> Too much content and pictures should not be on the blockchain .

---

If you like my articles , please give me claps and likes on it.

> If you want to see more chinese articles , you can see our official .

[**FromZeroToHero-Blockchain**
*面對於一項不專業的項目，從零開始都是十分的不容易的。 From Zero To Hero 將會帶各位「從零開始直到成為英雄」。*fzth-blockchain.github.io](https://fzth-blockchain.github.io/fzth/)[](https://fzth-blockchain.github.io/fzth/)> Hello , I am Panda , A blockchain Researcher . If you want to contact with me :

- [Twiiter](https://twitter.com/PandaZeng1)
- [Facebook](https://www.facebook.com/pdzeng)
- Email : pandap.d819@gmail.com
