import { useEffect, useState } from 'react';
import { useSetRecoilState } from 'recoil';
import Image from 'next/image';
import Dialog from '../dialog';
import { PREDICTION_TYPE } from './PredictionItem';
import { HERO_ATTRIBUTE, PredictionOption } from '../../lib/types';
import { arcanaPredictionAnswerAtom, arcanaUnSubmitAtom } from '../../store/arcana/state';

type PredictionItemDialogProps = {
  open: boolean;
  code?: string;
  onOpenChange?: (open: boolean) => void;
  type?: PREDICTION_TYPE;
  title?: string;
  subTitle?: string;
  options?: PredictionOption[];
};

type OptionListProps = {
  options?: PredictionOption[];
  onSelect: (item: PredictionOption) => void;
};

function HeroOptionList({ options, onSelect }: OptionListProps) {
  const [strengthList, setStrengthList] = useState<PredictionOption[]>([]);
  const [agilityList, setAgilityList] = useState<PredictionOption[]>([]);
  const [intelligenceList, setIntelligenceList] = useState<PredictionOption[]>([]);

  useEffect(() => {
    if (!options) return;
    const strength: PredictionOption[] = [];
    const agility: PredictionOption[] = [];
    const intelligence: PredictionOption[] = [];
    options.forEach((item) => {
      if (item.attr === HERO_ATTRIBUTE.STRENGTH) strength.push(item);
      if (item.attr === HERO_ATTRIBUTE.AGILITY) agility.push(item);
      if (item.attr === HERO_ATTRIBUTE.INTELLIGENCE) intelligence.push(item);
    });
    setStrengthList(strength);
    setAgilityList(agility);
    setIntelligenceList(intelligence);
  }, [options]);

  return (
    <div className="grid grid-cols-3 gap-[30px]">
      <div>
        <div className="flex items-center justify-center">
          <img width={36} src="/img/arcana/hero_strength.png" alt="hero_strength" />
        </div>
        <div className="mt-[30px] grid grid-cols-2 gap-x-[10px] gap-y-4">
          {strengthList.map((item) => (
            <div
              key={item.id}
              onClick={() => onSelect(item)}
              className="cursor-pointer overflow-hidden rounded-lg bg-[#1F2028]/60 hover:bg-[#FFFFFF]/10"
            >
              <div className="relative h-[60px] w-full">
                <Image src={item.img2} layout="fill" alt="hero" />
              </div>
              <div className="py-1.5 text-center text-sm font-medium leading-6">{item.name}</div>
            </div>
          ))}
        </div>
      </div>
      <div>
        <div className="flex items-center justify-center">
          <img width={36} src="/img/arcana/hero_agility.png" alt="hero_agility" />
        </div>
        <div className="mt-[30px] grid grid-cols-2 gap-x-[10px] gap-y-4">
          {agilityList.map((item) => (
            <div
              key={item.id}
              onClick={() => onSelect(item)}
              className="cursor-pointer overflow-hidden rounded-lg bg-[#1F2028]/60 hover:bg-[#FFFFFF]/10"
            >
              <div className="relative h-[60px] w-full">
                <Image src={item.img2} layout="fill" alt="hero" />
              </div>
              <div className="py-1.5 text-center text-sm font-medium leading-6">{item.name}</div>
            </div>
          ))}
        </div>
      </div>
      <div>
        <div className="flex items-center justify-center">
          <img width={36} src="/img/arcana/hero_intelligence.png" alt="hero_intelligence" />
        </div>
        <div className="mt-[30px] grid grid-cols-2 gap-x-[10px] gap-y-4">
          {intelligenceList.map((item) => (
            <div
              key={item.id}
              onClick={() => onSelect(item)}
              className="cursor-pointer overflow-hidden rounded-lg bg-[#1F2028]/60 hover:bg-[#FFFFFF]/10"
            >
              <div className="relative h-[60px] w-full">
                <Image src={item.img2} layout="fill" alt="hero" />
              </div>
              <div className="py-1.5 text-center text-sm font-medium leading-6">{item.name}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function CardOptionList({ options, onSelect }: OptionListProps) {
  return (
    <div className="grid grid-cols-5 gap-5">
      {options &&
        options.map((item) => (
          <div
            key={item.id}
            onClick={() => onSelect(item)}
            className="flex cursor-pointer flex-col items-center justify-center rounded-lg bg-[#1F2028]/60 pt-4 hover:bg-[#FFFFFF]/10"
          >
            <Image loading="lazy" width={96} height={96} src={item.img1} alt="option" />
            <p className="my-2 text-center text-sm font-medium">{item.team}</p>
            {item.name && <p className="mb-2 text-center text-sm font-medium">{item.name}</p>}
          </div>
        ))}
    </div>
  );
}

export default function PredictionItemDialog({
  code,
  open,
  onOpenChange,
  type,
  title,
  subTitle,
  options,
}: PredictionItemDialogProps) {
  const setPredictionAnswer = useSetRecoilState(arcanaPredictionAnswerAtom);
  const setUnSubmit = useSetRecoilState(arcanaUnSubmitAtom);

  const onSelect = (item: PredictionOption) => {
    if (!code) return;
    setPredictionAnswer((answers) => {
      return answers.map((answer) => {
        if (answer.predictionCode === code) return { predictionCode: code, answer: [item] };
        return answer;
      });
    });
    onOpenChange?.(false);
    setUnSubmit(true);
  };

  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
      render={() => (
        <div className="vertical-scroll w-[720px]">
          <p className="text-center text-xl font-medium">{title}</p>
          <p className="text-center text-sm">{subTitle}</p>
          <div className="vertical-scroll mt-8 max-h-[510px] overflow-y-auto overflow-x-hidden">
            {type === PREDICTION_TYPE.HERO ? (
              <HeroOptionList onSelect={onSelect} options={options} />
            ) : (
              <CardOptionList onSelect={onSelect} options={options} />
            )}
          </div>
          <p className="mt-5 text-xs">
            * Your pick shall subject to the&nbsp;<span className="font-medium text-p12-success">Main Event (10/20-10/30)</span>
            &nbsp; results.
          </p>
        </div>
      )}
    />
  );
}
