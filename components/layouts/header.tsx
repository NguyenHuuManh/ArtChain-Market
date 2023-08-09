import { dispatchConnect, useWallet, dispatchDisconnect } from "@/context/walletContext";
import { ethers } from "ethers";
import Link from "next/link";
import { memo, useEffect } from "react";
import WalletSelect from "../walletSelect";

const Header = () => {
  const [controller, dispatch] = useWallet();

  const initWallet = async () => {
    const provider = await new ethers.BrowserProvider(window?.ethereum);
    const signer = await provider.getSigner();
    const status = signer ? 'CONNECTED' : 'NOT_CONNECTED'
    dispatchConnect(dispatch, { provider, signer, status })
  }

  const onClickDisconect = async () => {
    dispatchDisconnect(dispatch)
  }

  console.log(controller.signer, '====signer===');

  useEffect(() => {
    window.ethereum.on('accountsChanged', async function (accounts) {
      const provider = new ethers.BrowserProvider(window?.ethereum);
      const signer = await provider.getSigner(accounts[0]);
      const status = signer ? 'CONNECTED' : 'NOT_CONNECTED'
      dispatchConnect(dispatch, { provider, signer, status })
    })
  }, [])

  return (
    <div className="header">
      <Link className="logo-link" href="/">ART-CHAIN.MARKET</Link>
      {controller.status == 'CONNECTED' ?
        <div className="item-link">
          <WalletSelect />
          <div><button onClick={onClickDisconect}>Logout</button></div>
        </div> :
        <div className="item-link"><button onClick={initWallet}>Connect to wallet</button></div>
      }
    </div>
  )
};

export default memo(Header);
