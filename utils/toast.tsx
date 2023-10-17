import Message from '@/components/message';
import ToastIcon from '@/components/svg/ToastIcon';
import { toast } from 'react-toastify';

export const toastStatus = (type: 'loading' | 'success' | 'error' | 'close', title: string | null, toastId: string) => {
  switch (type) {
    case 'loading': {
      toast(<Message title={title ?? ''} />, {
        icon: () => <ToastIcon type="loading" />,
        autoClose: false,
        toastId,
      });
      return;
    }
    case 'close': {
      toast.update(toastId, {
        type: 'error',
        autoClose: 0,
      });
      return;
    }
    case 'success': {
      toast.update(toastId, {
        type: 'success',
        icon: undefined,
        autoClose: 2000,
        render: <Message title={title ?? ''} />,
      });
      return;
    }
    case 'error':
    default:
      toast.update(toastId, {
        type: 'error',
        icon: undefined,
        autoClose: 2000,
        render: <Message title={title ?? ''} />,
      });
  }
};
