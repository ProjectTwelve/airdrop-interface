import Image from 'next/image';
import Dialog from '../../dialog';
import { PredictionOption } from '../../../lib/types';
import { toast } from 'react-toastify';
import Message from '../../message';
import React from 'react';
import { useSetRecoilState } from 'recoil';
import { arcanaPredictionOMGAnswerAtom } from '../../../store/arcana/state';

type OMGPredictionDialogProps = {
  open: boolean;
  code?: string;
  title?: string;
  subTitle?: string;
  options?: PredictionOption[];
  onOpenChange?: (open: boolean) => void;
};

export default function OMGPredictionDialog({ open, code, onOpenChange, title, subTitle, options }: OMGPredictionDialogProps) {
  const setPredictionAnswer = useSetRecoilState(arcanaPredictionOMGAnswerAtom);
  const onSelect = (item: PredictionOption) => {
    if (!code) return;
    if (item.id !== 1) {
      toast.error(<Message message="Go wash your face and choose again" title="Ah shit, here we go again" />);
      return;
    }
    setPredictionAnswer((answers) => {
      return answers.map((answer) => {
        if (answer.predictionCode === code) return { predictionCode: code, answer: [item] };
        return answer;
      });
    });
    onOpenChange?.(false);
  };

  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
      render={() => (
        <div className="w-[540px]">
          <p className="text-center text-xl font-medium">{title}</p>
          <p className="mt-2 text-center text-sm text-orange">{subTitle}</p>
          <div className="mt-8 grid grid-cols-2 gap-[30px]">
            {options &&
              options.map((item) => (
                <div
                  key={item.id}
                  onClick={() => onSelect(item)}
                  className="h-[180px] w-full cursor-pointer overflow-hidden rounded-lg"
                >
                  <div className="relative h-full w-full">
                    <div className="absolute inset-0 left-0 top-0 z-20 hover:bg-[#FFFFFF]/10"></div>
                    <div className="absolute bottom-0 z-10 flex h-[94px] w-full items-end bg-gradient-to-b from-black/0 to-black">
                      <p className="mb-4 w-full text-center text-lg font-medium">{item.name}</p>
                    </div>
                    <Image src={item.img1} layout="fill" objectFit="cover" alt="omg" />
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}
    />
  );
}
