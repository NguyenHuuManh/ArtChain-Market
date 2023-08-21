import Container from "@/components/Container";
import contractABI from '@/contractABI/RandomIpfsNft.json';
import WithAuthor from "@/hocs/WithAuthor";
import alchemy from "@/services/AlchemyService";
import { Box } from "@mui/material";
import { Nft } from "alchemy-sdk";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const CardDetail = () => {
    // const params = useSearchParams().getAll();
    const router = useRouter();
    const query = router.query;
    const tokenId = query?.tokenId;
    const [metaData, setMetaData] = useState<Nft>();
    console.log(query, '====query===');

    const getMetaData = async () => {
        const tokenIdDec = parseInt(`${tokenId}`, 16);
        console.log(tokenIdDec, '===tokenIdDec===');
        const data = await alchemy.nft.getNftMetadata(contractABI.address, tokenIdDec);
        setMetaData(data)
    }

    useEffect(() => {
        if (tokenId) { getMetaData() }
    }, [tokenId])

    return (
        <Container>
            <div className="display_flex" style={{ maxWidth: '60%', margin: 'auto', marginTop: 100 }}>
                <Box sx={{ flex: 1}}>
                    <Image
                        src={metaData?.media[0].gateway}
                        key={metaData?.tokenId}
                        alt={metaData?.title}
                        height={100}
                        width={100}
                        loading="lazy"
                        style={{ width: '100%', height: 'auto' }}
                    />
                </Box>
                <Box sx={{ flex: 1, paddingLeft: 10, color: '#FFFF' }}>
                    <span className="display_block">{metaData?.title}</span>
                    <span className="display_block">{metaData?.description}</span>
                    <span className="display_block">on sale</span>
                    <div className="display_flex">
                        <span>price: 200$</span>
                    </div>
                    <span>creator</span>

                </Box>
            </div>
        </Container>
    )
}

export default CardDetail;