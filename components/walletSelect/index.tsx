import { images } from "@/assets";
import { dispatchConnect, dispatchDisconnect, useWallet } from "@/context/walletContext";
import { ethers, verifyMessage } from "ethers";
import Image from "next/image";
import { ChangeEvent, useEffect, useState } from "react";

const WalletSelect = () => {
    const [controller, dispatch] = useWallet();
    const [data, setData] = useState<string[]>([])
    const getData = async () => {
        const accounts = await controller.provider.listAccounts();
        const address = accounts.map((acc) => acc.address)
        setData(address);
    }

    useEffect(() => {
        getData();
    }, [])

    const onChange = async (context: ChangeEvent<HTMLSelectElement>) => {
        try {
            const provider = new ethers.BrowserProvider(window?.ethereum);
            const signer = await provider.getSigner(context.target.value);
            const resSignMessage = await signer.signMessage('request sign from ART-Chain Market');
            const addressVerify = await verifyMessage('request sign from ART-Chain Market', resSignMessage);
            console.log(resSignMessage, '===resSignMessage===');

            if (context.target.value == addressVerify) {
                const status = signer ? 'CONNECTED' : 'NOT_CONNECTED'
                dispatchConnect(dispatch, { provider, signer, status })
            } else {
                dispatchDisconnect(dispatch);
            }
        } catch (error) {
            console.log(error, '==error===');

        }
    }
    return (
        <div className="display_flex">
            <Image src={images.user_circle} width={20} height={20} alt="user" style={{}} />
            <select value={controller.signer.address} onChange={onChange} style={{ maxWidth: 100, textOverflow: "ellipsis",background:"transparent" }}>
                {data.map((address) => (
                    <option key={address} value={address}><span>{address}</span></option>
                ))}
            </select>
        </div>

    )
}

export default WalletSelect