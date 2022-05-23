import React from 'react';
import { useRouter } from 'next/router';
import Button from '../button';
import Image from 'next/image';
import { useRecoilState } from 'recoil';
import { inviteModalAtom } from '../../store/invite/state';
import Dialog from '../dialog';
import RoadmapDialog from './RoadmapDialog';

function LayoutHeaderExtra() {
  const router = useRouter();
  const [, setOpen] = useRecoilState(inviteModalAtom);
  const whitepaperLink = 'https://github.com/ProjectTwelve/whitepaper/blob/main/P12-Whitepaper-v0.1.pdf';

  if (router.pathname === '/developer') {
    return (
      <div className="flex gap-3">
        <Button type="bordered" onClick={() => window.open(whitepaperLink)}>
          <div className="flex items-center justify-center gap-2 text-sm font-bold">
            <Image src="/svg/whitepaper.svg" width={24} height={24} alt="whitepaper" />
            Whitepaper
          </div>
        </Button>
        <Dialog render={({ close }) => <RoadmapDialog close={close} />}>
          <Button type="bordered">
            <div className="flex items-center justify-center gap-2 text-sm font-bold">
              <Image src="/svg/roadmap.svg" width={24} height={24} alt="roadmap" />
              Roadmap
            </div>
          </Button>
        </Dialog>
        <Button type="bordered" onClick={() => setOpen(true)}>
          <div className="flex items-center justify-center gap-2 text-sm font-bold">
            <Image src="/svg/invite.svg" width={24} height={24} alt="invite" />
            My invite address
          </div>
        </Button>
      </div>
    );
  }
  return null;
}

export default React.memo(LayoutHeaderExtra);
