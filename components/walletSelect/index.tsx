import { dispatchConnect, dispatchDisconnect, useWallet } from "@/context/walletContext";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Button from '@mui/material/Button';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import { ethers, verifyMessage } from "ethers";
import { useRouter } from "next/router";
import { ChangeEvent, useEffect, useRef, useState } from "react";

const WalletSelect = () => {
    const [open, setOpen] = useState(false);
    const anchorRef = useRef<HTMLButtonElement>(null)
    const [controller, dispatch] = useWallet();
    const [data, setData] = useState<string[]>([]);
    const router = useRouter()
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

    const handleClose = (event: Event | React.SyntheticEvent) => {
        if (
            anchorRef.current &&
            anchorRef.current.contains(event.target as HTMLElement)
        ) {
            return;
        }

        setOpen(false);
    };

    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    function handleListKeyDown(event: React.KeyboardEvent) {
        if (event.key === 'Tab') {
            event.preventDefault();
            setOpen(false);
        } else if (event.key === 'Escape') {
            setOpen(false);
        }
    }

    const onClickDisconect = async (event: Event | React.SyntheticEvent) => {
        dispatchDisconnect(dispatch);
        handleClose(event);
        router.push('/login');
    }
    return (
        <div className="display_flex">
            <div>
                <Button
                    ref={anchorRef}
                    id="composition-button"
                    aria-controls={open ? 'composition-menu' : undefined}
                    aria-expanded={open ? 'true' : undefined}
                    aria-haspopup="true"
                    onClick={handleToggle}
                >
                    <AccountCircleIcon />
                </Button>
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
                                        <MenuItem onClick={handleClose}>Profile</MenuItem>
                                        <MenuItem onClick={handleClose}>My account</MenuItem>
                                        <MenuItem onClick={onClickDisconect}>Logout</MenuItem>
                                    </MenuList>
                                </ClickAwayListener>
                            </Paper>
                        </Grow>
                    )}
                </Popper>
            </div>
            <select
                value={controller.signer.address} onChange={onChange}
                style={{ maxWidth: 100, textOverflow: "ellipsis", background: "transparent", color: "#FFFF" }}
            >
                {data.map((address) => (
                    <option key={address} value={address}><span>{address}</span></option>
                ))}
            </select>
        </div>

    )
}

export default WalletSelect