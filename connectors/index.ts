import { Chain, configureChains, defaultChains } from 'wagmi';
import { MetaMaskConnector } from 'wagmi/connectors/metaMask';
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect';
import { publicProvider } from 'wagmi/providers/public';

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

export const BNBSmartChainTestnet: Chain = {
  id: 97,
  name: 'BNB Smart Chain Testnet',
  network: 'tbsc',
  nativeCurrency: {
    name: 'tBNB',
    symbol: 'tBNB',
    decimals: 18,
  },
  rpcUrls: {
    default: 'https://data-seed-prebsc-1-s1.binance.org:8545/',
  },
  blockExplorers: {
    default: { name: 'tBscScan', url: 'https://testnet.bscscan.com/' },
  },
  testnet: true,
};

export const { chains, provider } = configureChains(
  [...defaultChains, BNBSmartChain, BNBSmartChainTestnet],
  [publicProvider()],
);

export const metamaskConnector = new MetaMaskConnector({
  chains: chains,
  options: {
    shimChainChangedDisconnect: false,
  },
});

export const walletConnect = new WalletConnectConnector({
  chains,
  options: {
    qrcode: true,
  },
});
