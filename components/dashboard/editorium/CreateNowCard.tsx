import Button from '@/components/button';
import { EventCategory, EventName } from '@/constants/event';
import { arcanaEditorDownloadDialogOpen } from '@/store/arcana/state';
import ReactGA from 'react-ga4';
import { useSetRecoilState } from 'recoil';

export default function CreateNowCard() {
  const setEditorDownloadDialogOpen = useSetRecoilState(arcanaEditorDownloadDialogOpen);

  return (
    <div className="arcana__p12-card relative w-full flex-grow px-6 pt-4.5">
      <div className="text-xl/6 font-bold">Registered as P12 developer</div>
      <div className="mt-2 flex items-start gap-5">
        <div className="mt-2 h-[5.5rem] w-[22.25rem] self-end"></div>
        <Button
          type="bordered"
          onClick={() => {
            ReactGA.event({
              action: EventName.CreateNow,
              category: EventCategory.Assets,
            });
            setEditorDownloadDialogOpen(true);
          }}
          className="h-12 w-[10.5rem] text-base/5 backdrop-blur-lg"
        >
          CREATE NOW!
        </Button>
      </div>
      <img src="/img/editorium/editor_shortcut.webp" className="absolute bottom-0 left-0 h-[5.5rem]" alt="editor_shortcut" />
    </div>
  );
}
