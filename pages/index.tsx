import Container from "@/components/Container";
import { useWallet } from "@/context/walletContext";
import contractABI from '@/contractABI/RandomIpfsNft.json';
import alchemy from "@/services/AlchemyService";
import { Nft } from "alchemy-sdk";
import { Contract } from "ethers";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
const Dashboard = () => {
  const [controller, dispatch] = useWallet();
  const [nfts, setNfts] = useState<Nft[]>([]);
  let account: string, nftRandomContract: Contract;
  const router = useRouter();

  const getBalance = async () => {
    return await nftRandomContract.balanceOf(account)
  }


  const getNFT = async () => {
    const nfts = await alchemy.nft.getNftsForContract(contractABI.address);
    // Print NFTs
    console.log(nfts);
    setNfts(nfts.nfts);

  }

  useEffect(() => {
    getNFT()
  }, [])

  const categories = [
    { id: 1, type: 'nomal' },
    { id: 2, type: 'special' },
    { id: 3, type: 'rare' }
  ]

  const onClickCard = ({ tokenId }) => {
    router.push({
      pathname: 'nft-card',
      query: { tokenId }
    })
  }

  return (
    <Container>
      <div className="display_flex center" style={{ marginBottom: 30, marginTop: 30 }}>{categories.map((e) => (
        <div key={e.id} className="display_flex center" style={{ width: 100, borderRadius: 10, background: "#FFFF", marginRight: 20 }}>{e.type}</div>
      ))}</div>
      <div className="nft_list_container">
        {nfts.map((e) => (
          <div className="nft_card_container" key={e.tokenId} onClick={() => onClickCard(e)}>
            <Image
              src={e.media[0].gateway}
              key={e.tokenId}
              alt={e.title}
              width={200}
              height={200}
              className="img_card"
              loading="lazy"
            />
            <div style={{ padding: 10 }}>
              <span className="text_card title_card">{e.title}</span>
              <span className="text_card">{e.description}</span>
              {/* <div className="bottom_card">
                <span className="text_card">
                  <StorefrontIcon fontSize="small" style={{ marginRight: 5 }} />
                  list for sale
                </span>
                <MoreVertIcon fontSize="small" />
              </div> */}
            </div>
          </div>
        ))}
      </div>
    </Container>
  );
};

export default Dashboard;
