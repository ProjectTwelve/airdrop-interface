import { userInfoAtom } from '@/store/user/state';
import IDCard from './IDCard';
import { useRecoilValue } from 'recoil';
import EditProfileDialog from '../dialog/EditProfileDialog';

export default function Arcana() {
  const profileData = useRecoilValue(userInfoAtom);
  const { editorium } = profileData ?? {};
  return (
    <div className="mb-40">
      <div className="flex-center">{editorium && <IDCard className="mt-10" />}</div>
      <EditProfileDialog />
    </div>
  );
}
