import { ethers } from "ethers";
import { createContext, Dispatch, useContext, useEffect, useMemo, useReducer } from "react";


interface WalletState {
    provider: ethers.BrowserProvider | null;
    signer: ethers.JsonRpcSigner | null;
    status: 'NOT_CONNECTED' | 'CONNECTED';
}

interface WalletAction {
    type: string;
    value?: WalletState;
}

const initalState: WalletState = {
    provider: null,
    signer: null,
    status: "NOT_CONNECTED"
};

const WalletContext = createContext<[WalletState, Dispatch<WalletAction>]>([
    initalState,
    () => { },
]);

const WALLET_ACTION_TYPE = {
    CONNECT: 'CONNECT',
    DISCONNECT: 'DISCONNECT'
};

const dispatchConnect = (dispatch: Dispatch<WalletAction>, value: WalletState) => {
    dispatch({ type: WALLET_ACTION_TYPE.CONNECT, value });
}

const dispatchDisconnect = (dispatch: Dispatch<WalletAction>) => {
    dispatch({ type: WALLET_ACTION_TYPE.DISCONNECT });
}

const useWallet = () => {
    const context = useContext(WalletContext);
    return context;
};


const WalletProvider = ({ children }) => {

    const reducer = (state: WalletState, action: WalletAction) => {
        switch (action.type) {
            case WALLET_ACTION_TYPE.CONNECT:
                sessionStorage.setItem('Wallet_Connect', 'true');
                return { ...state, ...action.value }
            case WALLET_ACTION_TYPE.DISCONNECT:
                sessionStorage.setItem('Wallet_Connect', 'false');
                return initalState
            default:
                break;
        }
    };

    const [controller, dispatch] = useReducer<any>(reducer, initalState);

    const value = useMemo(() => [controller, dispatch], [controller, dispatch]);

    return (
        <WalletContext.Provider value={value as any}>
            {children}
        </WalletContext.Provider>
    )
}

export default WalletProvider;

export { dispatchConnect, dispatchDisconnect, useWallet }