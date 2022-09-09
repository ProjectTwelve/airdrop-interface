import Button from '../button';
import { useSetRecoilState } from 'recoil';
import { isConnectPopoverOpen } from '../../store/web3/state';

export default function ArcanaNotConnect() {
  const setConnectOpen = useSetRecoilState(isConnectPopoverOpen);

  return (
    <div className="flex h-[255px] flex-col items-center justify-center rounded-2xl bg-p12-black/80 backdrop-blur">
      <img src="/svg/error.svg" alt="error" />
      <Button className="mt-6 w-[250px]" type="gradient" onClick={() => setConnectOpen(true)}>
        Connect Wallet
      </Button>
    </div>
  );
}
