import { userInfoAtom } from '@/store/user/state';
import { useRecoilValue } from 'recoil';
import EditProfileDialog from '../dialog/EditProfileDialog';
import CreateNowCard from './editorium/CreateNowCard';
import IDCard from './editorium/IDCard';
import BecomeCard from './editorium/BecomeCard';

export default function Arcana() {
  const profileData = useRecoilValue(userInfoAtom);
  const { editorium } = profileData ?? {};
  return (
    <div className="mb-32 mt-10">
      <div className="flex flex-wrap items-center justify-center gap-6 md:grid-cols-1">
        <BecomeCard isVoter={editorium} />
        {editorium ? <IDCard className="ml-4" /> : <CreateNowCard />}
      </div>
      <EditProfileDialog />
    </div>
  );
}
