import { useIsVoter } from '@/hooks/dashboard/arcanaProfile';
import { useIsMounted } from '@/hooks/useIsMounted';
import { userInfoAtom } from '@/store/user/state';
import { useRecoilValue } from 'recoil';
import DownloadEditorDialog from '../dialog/DownloadEditorDialog';
import EditProfileDialog from '../dialog/EditProfileDialog';
import IDCard from './IDCard';
import BecomeCard from './editorium/BecomeCard';
import CreateNowCard from './editorium/CreateNowCard';
import MyCreation from './editorium/creation/MyCreation';
import MyTasks from './editorium/creation/MyTasks';

export default function Arcana() {
  const isVoter = useIsVoter();
  const profileData = useRecoilValue(userInfoAtom);
  const { editorium } = profileData ?? {};
  const isMounted = useIsMounted();
  return (
    <div className="mb-32 mt-10 px-16 md:px-4">
      <div className="grid grid-cols-2 gap-6 md:grid-cols-1">
        <BecomeCard isVoter={isVoter} />
        {editorium ? <IDCard className="ml-4" /> : <CreateNowCard />}
      </div>
      {isMounted && <MyCreation />}
      {isMounted && <MyTasks />}
      <EditProfileDialog />
      <DownloadEditorDialog />
    </div>
  );
}
