import React, { useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import { ethers } from 'ethers';
import nftContractABI from '../../contractABI/RandomIpfsNft.json';
import marketContractABI from '../../contractABI/NftMarketplace.json';
import { useWallet } from '@/context/walletContext';
import { Spinner } from 'reactstrap';

interface Props {
    onSuccess: () => void;
}
const AddNFT = (props: Props) => {
    const { onSuccess } = props;
    const [controller] = useWallet();
    const [loading, setLoading] = useState(false);
    const mint = async () => {
        try {
            const marketNft = new ethers.Contract(marketContractABI.address, marketContractABI.abi, controller.signer);
            const randomNft = new ethers.Contract(nftContractABI.address, nftContractABI.abi, controller.signer);
            setLoading(true);
            const mintFee = await randomNft.getMintFee()
            const randomIpfsNftMintTx = await randomNft.requestNft({ value: mintFee.toString() })
            const randomIpfsNftMintTxReceipt = await randomIpfsNftMintTx.wait(1)
            const tokenCounter = await randomNft.getTokenCounter()
            // Need to listen for response
            await new Promise(async (resolve, reject) => {
                setTimeout(() => reject("Timeout: 'NFTMinted' event did not fire"), 300000) // 5 minute timeout time
                // setup listener for our event
                randomNft.once("NftMinted", async () => {
                    console.log(`Random IPFS NFT index ${tokenCounter.toString()} tokenURI: ${await randomNft.tokenURI(tokenCounter.toString())}`)
                    resolve('success')
                })
            })
            const tokenId = tokenCounter
            console.log("Approving Nft...")
            const approvalTx = await randomNft.approve(marketNft.getAddress(), tokenId)
            await approvalTx.wait(1)
            console.log("Approving success...");
            onSuccess();
            setLoading(false);
        } catch (error) {
            setLoading(false);
        }
    }

    if (loading) {
        return <div className='display_flex center' style={{ position: 'fixed', top: '10%', right: '5%', color: '#FFFF', zIndex: 100 }}><Spinner color="warning" /> minting ....</div>
    }

    return (
        <div
            style={{ position: 'fixed', top: '10%', right: '5%', background: '#FFFF', borderRadius: 15, width: 30, height: 30, display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100 }}
            onClick={mint}>
            <AddIcon />
        </div>
    )
}
export default AddNFT;