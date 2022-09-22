import Dialog from '../dialog';
import { PREDICTION_TYPE } from './PredictionItem';
import { PredictionOption } from '../../lib/types';

type PredictionItemDialogProps = {
  open: boolean;
  onOpenChange?: (open: boolean) => void;
  type?: PREDICTION_TYPE;
  title?: string;
  subTitle?: string;
  options?: PredictionOption[];
};

export default function PredictionItemDialog({ open, onOpenChange, type, title, subTitle }: PredictionItemDialogProps) {
  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
      render={({ close }) => (
        <div onClick={close} className="w-[720px]">
          <p className="text-center text-xl font-medium">{title}</p>
          <p className="text-center text-sm">{subTitle}</p>
          <div className="mt-8">{type}</div>
          <p className="mt-5 text-xs">
            * Your pick shall subject to the&nbsp;<span className="font-medium text-p12-success">Main Event (10/20-10/30)</span>
            &nbsp; results.
          </p>
        </div>
      )}
    />
  );
}
