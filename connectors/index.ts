import { configureChains } from 'wagmi';
import { bsc, bscTestnet, mainnet } from 'wagmi/chains';
import { publicProvider } from 'wagmi/providers/public';
import { MetaMaskConnector } from 'wagmi/connectors/metaMask';
import { InjectedConnector } from 'wagmi/connectors/injected';
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect';

export const { chains, provider } = configureChains([mainnet, bsc, bscTestnet], [publicProvider()]);

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
