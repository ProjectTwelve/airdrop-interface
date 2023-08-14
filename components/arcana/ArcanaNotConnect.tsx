import { useSetRecoilState } from 'recoil';
import { isConnectPopoverOpen } from '../../store/web3/state';

export default function ArcanaNotConnect() {
  const setConnectOpen = useSetRecoilState(isConnectPopoverOpen);

  return (
    <div>
      <button className="dota__button dota__yellow h-[44px] w-[250px]" onClick={() => setConnectOpen(true)}>
        Please connect wallet
      </button>
    </div>
  );
}
