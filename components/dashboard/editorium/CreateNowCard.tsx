import Button from '@/components/button';
import { EventCategory, EventName } from '@/constants/event';
import { arcanaEditorDownloadDialogOpen } from '@/store/arcana/state';
import ReactGA from 'react-ga4';
import { useSetRecoilState } from 'recoil';

export default function CreateNowCard() {
  const setEditorDownloadDialogOpen = useSetRecoilState(arcanaEditorDownloadDialogOpen);

  return (
    <div className="arcana__p12-card relative w-full flex-grow p-6 pb-0">
      <div className="text-2xl/6.5 font-bold">Registered as P12 developer</div>
      <div className="mt-3.5 flex items-start gap-5">
        <div className="h-[6.75rem] w-[25.1875rem] self-end"></div>
        <Button
          type="bordered"
          onClick={() => {
            ReactGA.event({
              action: EventName.CreateNow,
              category: EventCategory.Global,
            });
            setEditorDownloadDialogOpen(true);
          }}
          size="large"
          className="h-[3.375rem] w-[12.5rem] backdrop-blur-lg"
        >
          CREATE NOW!
        </Button>
      </div>
      <img src="/img/editorium/editor_shortcut.webp" className="absolute bottom-0 left-0 h-[6.75rem]" alt="editor_shortcut" />
    </div>
  );
}
