import { useEffect, useRef, useState } from 'react';

type PosterVideoProps = {
  play?: boolean;
  onEnded?: () => void;
};

const portalURL = 'https://cdn1.p12.games/airdrop/video/portal.webm';
const winnerURLs: Record<string, string> = {
  ['p12-theme-01']: 'https://cdn1.p12.games/airdrop/video/winner_purple.webm',
  ['p12-theme-02']: 'https://cdn1.p12.games/airdrop/video/winner_green.webm',
  ['p12-theme-03']: 'https://cdn1.p12.games/airdrop/video/winner_orange.webm',
  ['p12-theme-04']: 'https://cdn1.p12.games/airdrop/video/winner_blue.webm',
};
export default function PosterVideo({ play, onEnded }: PosterVideoProps) {
  const [portalPlay, setPortalPlay] = useState<boolean>(false);
  const [winnerPlay, setWinnerPlay] = useState<boolean>(false);
  const [winnerURL, setWinnerURL] = useState<string>('');
  const portalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const className = document.documentElement.classList[0];
    const themeURL = winnerURLs[className] || winnerURLs['p12-theme-01'];
    setWinnerURL(themeURL);
  }, []);

  useEffect(() => {
    setPortalPlay(play ?? false);
  }, [play]);

  return (
    <>
      {portalPlay && (
        <div ref={portalRef} className="fixed inset-0 z-20 animate-backdrop">
          <video
            className="h-full w-full object-cover"
            autoPlay
            muted
            src={portalURL}
            onEnded={() => {
              setWinnerPlay(true);
              setPortalPlay(false);
            }}
          />
        </div>
      )}
      {winnerPlay && (
        <div className="fixed inset-0 z-20 bg-p12-dialog backdrop-blur-lg">
          <video
            className="h-full w-full"
            autoPlay
            muted
            src={winnerURL}
            onEnded={() => {
              setWinnerPlay(false);
              onEnded?.();
            }}
          />
        </div>
      )}
    </>
  );
}
