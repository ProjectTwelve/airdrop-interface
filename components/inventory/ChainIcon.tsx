import React from 'react';
import { polygon, bsc } from 'wagmi/chains';

interface ChainIconProps {
  chainId: number;
  className?: string;
}

const ChainIcon: React.FunctionComponent<ChainIconProps> = ({ chainId, className }) => {
  if (chainId === polygon.id) {
    return <img className={className} src="/img/bridge/polygon.svg" alt="chain icon" />;
  } else if (chainId === bsc.id) {
    return <img className={className} src="/img/bridge/bsc.svg" alt="chain icon" />;
  } else if (chainId === 20736) {
    return <img className={className} src="/img/bridge/p12_chain.svg" alt="chain icon" />;
  } else {
    return <img className={className} src="/img/bridge/p12_chain.svg" alt="chain icon" />;
  }
};

export default ChainIcon;
