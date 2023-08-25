/* eslint-disable react/jsx-key */
import { dispatchConnect, useWallet } from "@/context/walletContext";
import { ethers, verifyMessage } from "ethers";
import Link from "next/link";
import { useRouter } from "next/router";
import { memo, useEffect, useRef, useState } from "react";
import { Input } from "reactstrap";
import WalletSelect from "../walletSelect";
import LoginIcon from '@mui/icons-material/Login';
import StoreIcon from '@mui/icons-material/Store';
import CollectionsBookmarkIcon from '@mui/icons-material/CollectionsBookmark';
import { Button, ClickAwayListener, Grow, MenuItem, MenuList, Paper, Popper } from "@mui/material";
import { Menu } from "@mui/icons-material";
import MenuIcon from '@mui/icons-material/Menu';

const Header = () => {
  const [controller, dispatch] = useWallet();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const anchorRef = useRef<HTMLButtonElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const routerName = router.pathname;
  console.log(routerName, '====routerName===');


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
    return status;
  }

  useEffect(() => {
    window.ethereum.on('accountsChanged', async function (accounts) {
      createConnection(accounts[0]);
    })
    if (sessionStorage.getItem("Wallet_Connect") == 'true') {
      createConnection(undefined, true);
    }

    // resize screen
    window.addEventListener('resize', handleResize);
    handleResize(); // Check on initial render
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [])


  const handleResize = () => {
    setIsMobile(window.innerWidth <= 768);
  };

  const handleClose = (event: Event | React.SyntheticEvent) => {
    if (
      anchorRef.current &&
      anchorRef.current.contains(event.target as HTMLElement)
    ) {
      return;
    }

    setOpen(false);
  };

  function handleListKeyDown(event: React.KeyboardEvent) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    } else if (event.key === 'Escape') {
      setOpen(false);
    }
  }

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const menu = [
    { path: '/', name: "Market place", icon: <StoreIcon /> },
    { path: '/collections', name: "Collections", icon: <CollectionsBookmarkIcon /> },
  ]

  return (
    <div className="header">
      {isMobile ? (
        <>
          <Button
            ref={anchorRef}
            id="composition-button"
            aria-controls={open ? 'composition-menu' : undefined}
            aria-expanded={open ? 'true' : undefined}
            aria-haspopup="true"
            onClick={handleToggle}
          >
            <MenuIcon />
          </Button>
          <Input
            className="item-link"
            placeholder="Search NFT..."
            style={{ maxWidth: 200 }}
          />
        </>
      ) : (
        <>
          <Link className="logo-link" href="/">ART-CHAIN.MARKET</Link>
          <Input
            className="item-link"
            placeholder="Search NFT..."
            style={{ maxWidth: 200 }}
          />
          {menu.map((e) =>
            <Link key={e.path}
              className="logo-link" href={e.path} style={{ color: routerName == e.path ? "yellow" : 'white' }}>
              {e.icon}{e.name}
            </Link>)}
        </>
      )}

      {controller.status == 'CONNECTED' ?
        <div className="item-link">
          <WalletSelect />
        </div>
        :
        <div className="item-link logo-link"><button onClick={() => createConnection().then((res) => {
          if (res === "CONNECTED") router.push('/');
        })}>
          <LoginIcon style={{ marginRight: 10 }} />
          Connect to wallet
        </button></div>
      }
      <Popper
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        placement="bottom-start"
        transition
        disablePortal
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === 'bottom-start' ? 'left top' : 'left bottom',
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList
                  autoFocusItem={open}
                  id="composition-menu"
                  aria-labelledby="composition-button"
                  onKeyDown={handleListKeyDown}
                >
                  <MenuItem onClick={handleClose}> <Link className="logo-link" href="/">ART-CHAIN.MARKET</Link></MenuItem>
                  {menu.map((e) =>
                    <Link key={e.path} className="logo-link" href={e.path} style={{ color: routerName == e.path ? "yellow" : 'white' }}>
                      <MenuItem onClick={handleClose}>
                        <Link className="logo-link" href={e.path}>{e.icon}{e.name}</Link>
                      </MenuItem>
                    </Link>)}
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </div>
  )
};

export default memo(Header);
