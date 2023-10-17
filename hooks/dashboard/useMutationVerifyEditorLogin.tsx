import Message from '@/components/message';
import { EventCategory, EventName } from '@/constants/event';
import { verifyEditorLogin } from '@/lib/api-nest';
import { arcanaEditorDownloadDialogOpen } from '@/store/arcana/state';
import { arcanaIsVerifySelector } from '@/store/user/state';
import { useMutation } from '@tanstack/react-query';
import ReactGA from 'react-ga4';
import { toast } from 'react-toastify';
import { useSetRecoilState } from 'recoil';

export const useMutationVerifyEditorLogin = ({ position }: { position?: string } = {}) => {
  const setVerifyEditorLogin = useSetRecoilState(arcanaIsVerifySelector);
  const setIsOpen = useSetRecoilState(arcanaEditorDownloadDialogOpen);
  return useMutation({
    mutationFn: () => verifyEditorLogin(),
    onSuccess: () => {
      toast.success(<Message title="Verify Editor login succeeded." />);
      setVerifyEditorLogin(true);
      setIsOpen(false);
      ReactGA.event({ category: EventCategory.Global, action: EventName.EditorLoginVerify, label: 'success' });
    },
    onError: () => {
      if (position !== 'start') {
        toast.error(<Message title="Verify Editor login failed." />);
      }
      setIsOpen(true);
      setVerifyEditorLogin(false);
      ReactGA.event({ category: EventCategory.Global, action: EventName.EditorLoginVerify, label: 'failed' });
    },
  });
};
