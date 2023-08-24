import { Chain, configureChains } from 'wagmi';
import { bsc, bscTestnet, mainnet } from 'wagmi/chains';
import { publicProvider } from 'wagmi/providers/public';
import { MetaMaskConnector } from 'wagmi/connectors/metaMask';
import { InjectedConnector } from 'wagmi/connectors/injected';
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect';

const polygon: Chain = {
  id: 137,
  name: 'Polygon',
  network: 'matic',
  nativeCurrency: {
    name: 'MATIC',
    symbol: 'MATIC',
    decimals: 18,
  },
  rpcUrls: {
    default: {
      http: ['https://rpc.tenderly.co/fork/10575d78-56a4-476c-8669-33b74397cc8f'],
    },
    public: {
      http: [' https://rpc.tenderly.co/fork/10575d78-56a4-476c-8669-33b74397cc8f'],
    },
  },
};

export const { chains, publicClient } = configureChains([mainnet, bsc, bscTestnet, polygon], [publicProvider()]);

export const metaMaskConnector = new MetaMaskConnector({ chains });

export const walletConnectConnector = new WalletConnectConnector({
  chains,
  options: { projectId: 'af716327386d5071687fc3727a00e321' },
});

export const bitKeepConnector = new InjectedConnector({
  chains,
  options: {
    name: 'BitKeep',
    getProvider: () => {
      if (typeof window !== 'undefined') {
        return window.bitkeep?.ethereum;
      }
    },
    shimDisconnect: true,
  },
});
