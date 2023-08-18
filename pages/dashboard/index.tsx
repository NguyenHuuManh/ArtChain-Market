import { useWallet } from "@/context/walletContext";
import axios from "axios";
import { Contract } from "ethers";
import { useEffect, useState } from "react";
import { Button } from "reactstrap";
import RandomIPFS from '../../contractABI/RandomIpfsNft.json';
import { Alchemy, Network, OwnedNft } from "alchemy-sdk";
import Image from "next/image";
const Dashboard = () => {
  const [controller, dispatch] = useWallet();
  const [nfts, setNfts] = useState<OwnedNft[]>([]);
  let account: string, nftRandomContract: Contract;


  console.log(controller, '==controller===');
  const getBalance = async () => {
    return await nftRandomContract.balanceOf(account)
  }

  const config = {
    apiKey: "D12B6vndhYI2p894zMpep-q00rRp8V7w",
    network: Network.ETH_SEPOLIA,
  };
  const alchemy = new Alchemy(config);

  const getNFT = async () => {
    const nfts = await alchemy.nft.getNftsForOwner(controller.signer.address);
    // Print NFTs
    console.log(nfts);
    setNfts(nfts.ownedNfts);

  }

  useEffect(() => {
    if (controller.status == 'CONNECTED') {
      getNFT();
    }
  }, [controller])

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

  return (
    <div>
      <div>
        <Button onClick={mintNFT}>
          Tạo NFT
        </Button>
      </div>
      <div>Danh sách NFT:</div>
      <div>
        {nfts.map((e) => (
          <Image src={e.media[0].gateway} key={e.tokenId} alt={e.title} width={100} height={100}/>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
