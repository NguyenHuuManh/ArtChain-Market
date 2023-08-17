import { Contract, ethers } from "ethers";
import { useEffect, useState } from "react";
import RandomIPFS from '../../contractABI/RandomIpfsNft.json'
import { useWallet } from "@/context/walletContext";
import { Button } from "reactstrap";
import axios from "axios";
import TreeView from "@/components/tree";

const Dashboard = () => {
  const [controller, dispatch] = useWallet();
  const [nfts, setNfts] = useState([]);
  let account: string, nftRandomContract: Contract;


  console.log(controller, '==controller===');
  const getBalance = async () => {
    return await nftRandomContract.balanceOf(account)
  }

  const getNFT = async () => {
    const balance = await getBalance()
    const nftCount = Number(balance.toString().replace('n'));
    console.log(nftCount, '===nftCount===');
    const nftPromises = [];

    for (let i = 0; i < nftCount; i++) {
      nftPromises.push(nftRandomContract.tokenOfOwnerByIndex(account, i));
    }

    const nftTokens = await Promise.all(nftPromises);

    const nftInfoPromises = nftTokens.map(async (tokenId) => {
      const tokenURI = await nftRandomContract.tokenURI(tokenId);
      const response = await axios.get(tokenURI);
      return response.data.image; // Assuming the NFT metadata has an 'image' property
    });

    const nftInfo = await Promise.all(nftInfoPromises);
    console.log(nftInfo, '==nftInfo==');

  }

  // useEffect(() => {
  //   if (controller.status == 'CONNECTED') {
  //     account = controller.signer.address;
  //     nftRandomContract = new Contract(RandomIPFS.address, RandomIPFS.abi, controller.signer);
  //     getNFT();
  //   }
  // }, [controller])

  const mintNFT = async () => {
    const randomIpfsNft = new Contract(RandomIPFS.address, RandomIPFS.abi, controller.signer);
    const mintFee = await randomIpfsNft.getMintFee()
    const randomIpfsNftMintTx = await randomIpfsNft.requestNft({ value: mintFee.toString() })
    const randomIpfsNftMintTxReceipt = await randomIpfsNftMintTx.wait(1)
    // Need to listen for response
    await new Promise(async (resolve, reject) => {
      setTimeout(() => reject("Timeout: 'NFTMinted' event did not fire"), 300000) // 5 minute timeout time
      // setup listener for our event
      randomIpfsNft.once("NftMinted", async () => {
        console.log(`Random IPFS NFT index 0 tokenURI: ${await randomIpfsNft.tokenURI(0)}`)
        resolve("Success")
      })
    })
  }

  function buildTree(data, parent = null) {
    const children = data.filter(item => item.path.includes(parent));
    return children.map(child => ({
      ...child,
      children: buildTree(data, child.id)
    }));
  }

  const arr = [
    {
      id: "1a1f3ce8-1e42-4e8e-b2f9-2ea29e7ccff3",
      name: "Search",
      path: []
    },
    {
      id: "1a1f3ce8-1e42-4e8e-b2f9-2ea29e7ccff2",
      name: "Thomas",
      path: ['1a1f3ce8-1e42-4e8e-b2f9-2ea29e7ccff3']
    },
    {
      id: "1a1f3ce8-1e42-4e8e-b2f9-2ea29e7ccff1",
      name: "Robert",
      path: ['1a1f3ce8-1e42-4e8e-b2f9-2ea29e7ccff3', '1a1f3ce8-1e42-4e8e-b2f9-2ea29e7ccff2']
    }
  ];
  const transformToTree = (data) => {
    const nodeMap = new Map(data.map(node => [node.id, { ...node, children: [] }]));
  
    data.forEach(node => {
      if (node.path.length > 0) {
        const parentNode = nodeMap.get(node.path[node.path.length - 1]);
        if (parentNode) {
          parentNode?.children.push(nodeMap.get(node.id));
        }
      }
    });
  
    const rootNodes = data.filter(node => node.path.length === 0);
    return rootNodes.map(rootNode => nodeMap.get(rootNode.id));
  };
  
  const tree=transformToTree(arr);
  console.log(tree,'===tree==');
  

  return (
    <div>
      {/* <TreeView data={arr} /> */}
      <div>
        <Button onClick={mintNFT}>
          Tạo NFT
        </Button>
      </div>
      <div>Danh sách NFT:</div>
    </div>
  );
};

export default Dashboard;
