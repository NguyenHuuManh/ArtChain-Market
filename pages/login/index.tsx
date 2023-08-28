import { images } from "@/assets";
import Container from "@/components/Container";
import { dispatchConnect, useWallet } from "@/context/walletContext";
import { Button } from "@mui/material";
import { ethers, verifyMessage } from "ethers";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";
import { Spinner } from "reactstrap";
import InstallDesktopIcon from '@mui/icons-material/InstallDesktop';
const Login = () => {
  const [controller, dispatch] = useWallet();
  const route = useRouter();
  const [loading, setLoading] = useState(false);
  const [isInstalled, setIsInStalled] = useState(false);

  useEffect(() => {
    if (window.ethereum) setIsInStalled(true);
  }, [])

  const createConnection = async (address?: string, reConnect?: boolean) => {
    try {
      setLoading(true)
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
      setLoading(false);
      if (status === 'CONNECTED') {
        route.push('/');
      }
      return status;
    } catch (error) {
      setLoading(false)
      return error
    }
  }

  const buttonAction = useMemo(() => {
    if (loading) return <Spinner color="warning" />
    if (isInstalled) return <Button onClick={() => createConnection()}>Connect</Button>
    return <Button
      onClick={() => { window.open('https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=vi') }}>
      Install
    </Button>
  }, [isInstalled, loading])

  return (
    <Container>
      <div style={{ margin: 'auto', fontSize: 20, fontWeight: '700', color: "#FFFF" }}>Wellcome to ART-Chain Market. Connect to wallet to continute</div>
      <div className="display_flex">
        <div className="display_flex center flex_between" style={{ background: '#FFFF', borderRadius: 10, marginRight: 10, width: 150, padding: 10 }}>
          <Image src={images.metamask_icon} width={30} height={30} alt="" />
          {buttonAction}
        </div>

      </div>
    </Container>
  );
};

export default Login;
