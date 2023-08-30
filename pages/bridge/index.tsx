import React from 'react';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import Back from '../../components/back';
import BridgeSwitch from '../../components/bridge/BridgeSwitch';
import { useAccount } from 'wagmi';
import { usePowerLevel } from '@/hooks/bridge';
import ReactGA from 'react-ga4';

export default function Bridge() {
  const router = useRouter();
  const { address } = useAccount();
  const { data: plData } = usePowerLevel<any>(address);
  return (
    <div className="mt-8">
      <Back
        onClick={() => {
          router.back();
        }}
      />
      <div className="flex-center relative mt-5 gap-6 rounded-2xl bg-gradient-to-b from-gray-550/50 py-8 backdrop-blur-lg">
        <div className="absolute left-0 top-0 h-[138px] w-full rounded-t-2xl bg-card-mask" />
        <img width={104} src="/img/pl/power_level.png" alt="power_level" />
        <div>
          <p className="text-xl/5.5">Arcana - Linea Editorium </p>
          <div className="text-gradient-yellow mt-3.5 text-[68px]/[68px] font-bold">{plData?.user?.badgePL ?? 0}</div>
        </div>
      </div>
      <div className="mt-7 h-9 rounded-lg bg-[#4383FF4D] px-4 text-sm font-medium leading-9">
        Bridge community badge to P12 Chain and obtain the corresponding Power Level.{' '}
        <span
          className="cursor-pointer text-blue"
          onClick={() => {
            ReactGA.event({ action: 'rule_detail', label: '', category: 'bridge' });
          }}
        >
          Details {'>'}
        </span>
      </div>
      <motion.div
        className="my-5"
        transition={{ type: 'spring', stiffness: 300, damping: 35 }}
        onClick={(event) => event.stopPropagation()}
      >
        <div className="backdrop-box rounded-2xl">
          <BridgeSwitch />
        </div>
      </motion.div>
    </div>
  );
}
