import { Alchemy, Network } from "alchemy-sdk";

const config = {
  apiKey: "D12B6vndhYI2p894zMpep-q00rRp8V7w",
  network: Network.ETH_SEPOLIA,
};
const alchemy = new Alchemy(config);
export default alchemy;
