import { useWallet } from "@/context/walletContext";
import { Alchemy, Network, OwnedNft } from "alchemy-sdk";
import { Contract } from "ethers";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Button } from "reactstrap";
import RandomIPFS from '../../RandomIpfsNft.json';
import Container from "@/components/Container";
import WithAuthor from "@/hocs/WithAuthor";
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
      // setup listener for our event
      randomIpfsNft.once("NftMinted", async () => {
        console.log(`Random IPFS NFT index 0 tokenURI: ${await randomIpfsNft.tokenURI(0)}`)
        resolve("Success")
      })
    })
  }

  return (
    <Container>
      <div>
        <Button onClick={mintNFT}>
          Tạo NFT
        </Button>
      </div>
      <div>Danh sách NFT:</div>
      <div className="nft_list_container">
        {nfts.map((e) => (
          <div className="nft_card_container" key={e.tokenId}>
            <Image
              src={e.media[0].gateway}
              key={e.tokenId}
              alt={e.title}
              width={200}
              height={200}
              className="img_card"
              loading="lazy"
            />
            <span className="text_card title_card">{e.title}</span>
            <span className="text_card">{e.description}</span>
          </div>
        ))}
      </div>
    </Container>
  );
};

export default WithAuthor(Dashboard);
