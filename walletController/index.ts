import { ethers } from "ethers";

class walletController {
  provider: ethers.BrowserProvider;
  sigMess = "request sign from ART-Chain Market";

  constructor() {
    this.provider = new ethers.BrowserProvider(window.ethereum);
  }

  async getSigner(address?: string): Promise<ethers.JsonRpcSigner> {
    return await this.provider.getSigner(address);
  }

  async signMessage(signer: ethers.JsonRpcSigner) {
    return await signer.signMessage(this.sigMess);
  }
}

export default walletController;
