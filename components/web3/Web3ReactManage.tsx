import React, { useEffect } from 'react';
import { useConnect } from 'wagmi';

export default function Web3ReactManage({ children }: React.PropsWithChildren<{}>) {
  const { connect, connectors, activeConnector } = useConnect();

  useEffect(() => {
    const { ethereum } = window;

    if (ethereum?.on && !activeConnector) {
      const handleChainChanged = () => {
        connect(connectors[0]);
      };
      ethereum.on('chainChanged', handleChainChanged);

      return () => {
        if (ethereum.removeListener) {
          ethereum.removeListener('chainChanged', handleChainChanged);
        }
      };
    }
    return undefined;
  }, [activeConnector, connect, connectors]);

  return <>{children}</>;
}
