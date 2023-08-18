import { dispatchConnect, dispatchDisconnect, useWallet } from "@/context/walletContext";
import { ethers, verifyMessage } from "ethers";
import Link from "next/link";
import { memo, useEffect } from "react";
import WalletSelect from "../walletSelect";
import Image from "next/image";
import { images } from "@/assets";
import { useRouter } from "next/router";

const Header = () => {
  const [controller, dispatch] = useWallet();
  const router = useRouter()


  const createConnection = async (address?: string, reConnect?: boolean) => {
    const provider = await new ethers.BrowserProvider(window?.ethereum);
    const signer = await provider.getSigner(address);
    if (!reConnect) {
      const message = "Request connect from ART-Chain MARKET"
      const sign = await signer.signMessage(message)
      const addressVerify = await verifyMessage(message, sign)
      if (addressVerify !== signer.address) return
    }
    const status = signer ? 'CONNECTED' : 'NOT_CONNECTED';
    dispatchConnect(dispatch, { provider, signer, status });
    if (status === 'CONNECTED') router.push('/')
  }

  const onClickDisconect = async () => {
    dispatchDisconnect(dispatch);
    router.push('/login');
  }


  useEffect(() => {
    window.ethereum.on('accountsChanged', async function (accounts) {
      createConnection(accounts[0]);
    })
    if (sessionStorage.getItem("Wallet_Connect") == 'true') {
      createConnection(undefined, true);
    }
  }, [])


  return (
    <div className="header">
      <Link className="logo-link" href="/">ART-CHAIN.MARKET</Link>
      {controller.status == 'CONNECTED' ?
        <div className="item-link">
          <WalletSelect />
          <div><button onClick={onClickDisconect}>Logout</button></div>
        </div>
        :
        <div className="item-link"><button onClick={() => createConnection()}>Connect to wallet</button></div>
      }
    </div>
  )
};

export default memo(Header);
