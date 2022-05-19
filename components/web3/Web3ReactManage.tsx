import React, { useEffect, useState } from 'react';
import { useWeb3React } from '@web3-react/core';
import { injected } from '../../connectors';

export default function Web3ReactManage({ children }: React.PropsWithChildren<{}>) {
  const { activate, active, error, setError } = useWeb3React();
  const [tried, setTried] = useState(false);

  useEffect(() => {
    injected.isAuthorized().then((isAuthorized) => {
      if (isAuthorized) {
        activate(injected, undefined, true).catch((error) => {
          setError(error);
          setTried(true);
        });
      } else {
        setTried(true);
      }
    });
  }, [activate, setError]);

  useEffect(() => {
    if (active) {
      setTried(true);
    }
  }, [active]);

  useEffect(() => {
    const { ethereum } = window;

    if (ethereum?.on && !tried) {
      const handleChainChanged = () => {
        activate(injected, undefined, true).catch((error) => {
          console.error('Failed to activate after chain changed', error);
        });
      };
      const handleAccountsChanged = (accounts: string[]) => {
        if (accounts.length > 0) {
          activate(injected, undefined, true).catch((error) => {
            console.error('Failed to activate after accounts changed', error);
          });
        }
      };

      ethereum.on('chainChanged', handleChainChanged);
      ethereum.on('accountsChanged', handleAccountsChanged);

      return () => {
        if (ethereum.removeListener) {
          ethereum.removeListener('chainChanged', handleChainChanged);
          ethereum.removeListener('accountsChanged', handleAccountsChanged);
        }
      };
    }
    return undefined;
  }, [active, error, tried, activate]);

  return <>{children}</>;
}
