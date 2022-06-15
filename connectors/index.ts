import { WalletConnectConnector } from 'wagmi/connectors/walletConnect';
import { MetaMaskConnector } from 'wagmi/connectors/metaMask';
import { Chain, defaultChains } from 'wagmi';

export const BNBSmartChain: Chain = {
  id: 56,
  name: 'BNB Smart Chain',
  network: 'bsc',
  nativeCurrency: {
    decimals: 18,
    name: 'BNB',
    symbol: 'BNB',
  },
  rpcUrls: {
    default: 'https://bsc-dataseed1.binance.org/',
  },
  blockExplorers: {
    default: { name: 'Bscscan', url: 'https://bscscan.com/' },
  },
  testnet: false,
};

export const metamaskConnector = new MetaMaskConnector({
  chains: [...defaultChains, BNBSmartChain],
});

export const walletConnect = new WalletConnectConnector({
  chains: [...defaultChains, BNBSmartChain],
  options: {
    qrcode: true,
  },
});
