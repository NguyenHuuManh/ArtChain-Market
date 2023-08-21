import { dispatchConnect, useWallet } from "@/context/walletContext";
import { ethers, verifyMessage } from "ethers";
import Link from "next/link";
import { useRouter } from "next/router";
import { memo, useEffect } from "react";
import { Input } from "reactstrap";
import WalletSelect from "../walletSelect";
import LoginIcon from '@mui/icons-material/Login';
import StoreIcon from '@mui/icons-material/Store';
import CollectionsBookmarkIcon from '@mui/icons-material/CollectionsBookmark';

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
      <Input
        className="item-link"
        placeholder="Search NFT..."
        style={{ maxWidth: 200 }}
      />
      <Link className="logo-link" href="/"><StoreIcon style={{ marginRight: 10 }} />Market place</Link>
      <Link className="logo-link" href="/collections"><CollectionsBookmarkIcon style={{ marginRight: 10 }} /> Collections</Link>
      {controller.status == 'CONNECTED' ?
        <div className="item-link">
          <WalletSelect />
        </div>
        :
        <div className="item-link logo-link"><button onClick={() => createConnection()}>
          <LoginIcon style={{ marginRight: 10 }} />
          Connect to wallet
        </button></div>
      }
    </div>
  )
};

export default memo(Header);
