import { userInfoAtom } from '@/store/user/state';
import { useRecoilValue } from 'recoil';
import EditProfileDialog from '../dialog/EditProfileDialog';
import CreateNowCard from './editorium/CreateNowCard';
import BecomeCard from './editorium/BecomeCard';
import MyCreation from './editorium/creation/MyCreation';
import { useIsMounted } from '@/hooks/useIsMounted';
import IDCard from './IDCard';

export default function Arcana() {
  const profileData = useRecoilValue(userInfoAtom);
  const { editorium } = profileData ?? {};
  const isMounted = useIsMounted();
  return (
    <div className="mb-32 mt-10 px-16 md:px-4">
      <div className="flex flex-wrap justify-center gap-6 md:grid-cols-1">
        <BecomeCard isVoter={editorium} />
        {editorium ? <IDCard className="ml-4" /> : <CreateNowCard />}
      </div>
      {isMounted && <MyCreation />}
      <EditProfileDialog />
    </div>
  );
}
