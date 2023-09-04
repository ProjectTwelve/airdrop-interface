import { useSwitchNetwork } from 'wagmi';
import { ARCANA_CHAIN_ID } from '../../constants';

export default function ArcanaSwitchNetwork() {
  const { switchNetwork } = useSwitchNetwork({ chainId: ARCANA_CHAIN_ID });

  return (
    <div className="absolute z-30 flex h-full w-[750px] items-center justify-center bg-black/50 backdrop-blur md:w-full">
      <div>
        <button className="dota__button dota__yellow h-[44px] w-[250px]" onClick={() => switchNetwork?.()}>
          Please Switch Network
        </button>
      </div>
    </div>
  );
}
