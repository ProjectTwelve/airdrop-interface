import Dialog from '@/components/dialog';
import { ARCANA_SOCIAL_LINKS } from '@/constants';
import { arcanaEditorDownloadDialogOpen } from '@/store/arcana/state';
import { useEffect } from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import ReactGA from 'react-ga4';
import { EventCategory, EventName } from '@/constants/event';
import Button from '../button';
import { userInfoAtom } from '@/store/user/state';
import { useMutationVerifyEditorLogin } from '@/hooks/dashboard/useMutationVerifyEditorLogin';
import { useAccount } from 'wagmi';
import { isConnectPopoverOpen } from '@/store/web3/state';

export default function DownloadEditorDialog() {
  const [isOpen, setIsOpen] = useRecoilState(arcanaEditorDownloadDialogOpen);
  const profileData = useRecoilValue(userInfoAtom);
  const { editorium: isVerify } = profileData ?? {};
  const { address } = useAccount();
  const { mutate: verifyEditorLogin, isLoading } = useMutationVerifyEditorLogin();
  const setConnectOpen = useSetRecoilState(isConnectPopoverOpen);

  useEffect(() => {
    if (isOpen) {
      ReactGA.event({ category: EventCategory.Assets, action: EventName.DownloadPopup });
    }
  }, [isOpen]);

  return (
    <Dialog
      open={isOpen}
      className="w-[732px]"
      onOpenChange={setIsOpen}
      render={({ close }) => (
        <div className="w-full">
          <h2 className="text-center text-xl font-semibold">Download Editor and P12 App to Create</h2>
          <div className="px-1.5">
            <div className="flex-center mt-8">
              <div className="mr-24 max-w-[186px]">
                <h2 className="text-xl font-semibold">Step 1</h2>
                <p className="mt-3 text-xs/4">Download the editor: Your tool for building worlds.</p>
                <a
                  onClick={() =>
                    ReactGA.event({ category: EventCategory.Assets, action: EventName.DownloadLink, label: 'editor' })
                  }
                  href="https://cdn1.p12.games/arcana/editor_download/Editor_1.0.3.exe"
                  className="text-xs/4 text-blue hover:underline"
                  target="_blank"
                >
                  Editor (windows)
                </a>
              </div>
              <div className="mr-8 max-w-[186px]">
                <h2 className="relative text-xl font-semibold">
                  Step 2 Choice 1
                  <img className="absolute -left-15 top-8" width={30} src="/svg/download_right.svg" alt="right" />
                </h2>
                <p className="mt-3 text-xs/4">Login Editor by connect your wallet via web page wallet extension.</p>
                <h2 className="relative mt-12 text-xl font-semibold">
                  Step 2 Choice 2
                  <img className="absolute -left-15 top-20" width={30} src="/svg/download_right.svg" alt="right" />
                </h2>
                <p className="mt-3 text-xs/4">Download P12 App to connect your wallet with Editor.</p>
                <div className="mt-5 grid gap-2 text-xs/4">
                  <a
                    onClick={() =>
                      ReactGA.event({
                        category: EventCategory.Assets,
                        action: EventName.DownloadLink,
                        label: 'app_google_play',
                      })
                    }
                    href="https://play.google.com/store/apps/details?id=network.p12.app"
                    target="_blank"
                    className="text-blue hover:underline"
                  >
                    P12 App (Google Play)
                  </a>
                  <a
                    onClick={() =>
                      ReactGA.event({
                        category: EventCategory.Assets,
                        action: EventName.DownloadLink,
                        label: 'app_android_apk',
                      })
                    }
                    href="https://cdn1.p12.games/arcana/editor_download/P12_0.3.31.apk"
                    target="_blank"
                    className="text-blue hover:underline"
                  >
                    P12 App (apk)
                  </a>
                  <a className="cursor-not-allowed text-gray-100 hover:no-underline">P12 App (IOS)</a>
                </div>
              </div>
              <div className="h-full">
                <img
                  src="https://cdn1.p12.games/arcana/editorium/editor-download-pc.webp"
                  className="mb-12"
                  width={223}
                  alt="choice_1"
                />
                <img
                  src="https://cdn1.p12.games/arcana/editorium/editor-download-app.webp"
                  className="mb-6"
                  width={220}
                  alt="choice_2"
                />
              </div>
            </div>
            <p className="mt-6 text-center text-xs/4 font-semibold text-red-400">
              Ensure your security: Please download Editor & App exclusively from our official site to avoid any potential
              risks.
            </p>
            <p className="my-4 h-px bg-[#4e4e50]" />
            <p className="mb-7.5 text-center text-xs">
              If you encounter any issues during the process, please join our Discord for assistance.&nbsp;
              <a href={ARCANA_SOCIAL_LINKS.discord} target="_blank" className="text-blue hover:underline">
                Discord
              </a>
              &nbsp; for assistance.
            </p>
            {isVerify && <p className="text-center text-xs text-green">I’ve succeeded login editor.</p>}
            <div className="flex-center mt-3">
              <Button
                disabled={isVerify || isLoading}
                loading={isLoading}
                className="w-[258px]"
                type="gradient"
                onClick={() => {
                  if (!address) {
                    close();
                    setTimeout(() => {
                      setConnectOpen(true);
                    }, 800);
                    return;
                  }
                  verifyEditorLogin();
                }}
              >
                {address ? (isVerify ? 'Verified' : 'Verify') : 'Connect to wallet'}
              </Button>
            </div>
          </div>
        </div>
      )}
    />
  );
}
