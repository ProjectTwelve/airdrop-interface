import { Chain, defaultChains } from 'wagmi';
import { MetaMaskConnector } from 'wagmi/connectors/metaMask';
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect';

export const BNBSmartChain: Chain = {
  id: 56,
  name: 'BNB Smart Chain',
  network: 'bsc',
  nativeCurrency: {
    name: 'BNB',
    symbol: 'BNB',
    decimals: 18,
  },
  rpcUrls: {
    default: 'https://bsc-dataseed1.binance.org/',
  },
  blockExplorers: {
    default: { name: 'BscScan', url: 'https://bscscan.com/' },
  },
  testnet: false,
};

export const metamaskConnector = new MetaMaskConnector({
  chains: [...defaultChains, BNBSmartChain],
  options: {
    shimChainChangedDisconnect: false,
  },
});

export const walletConnect = new WalletConnectConnector({
  chains: [...defaultChains, BNBSmartChain],
  options: {
    qrcode: true,
  },
});
