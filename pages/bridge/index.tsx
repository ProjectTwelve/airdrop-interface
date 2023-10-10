import React from 'react';
import { motion } from 'framer-motion';
import BridgeSwitch from '../../components/bridge/BridgeSwitch';
import { useAccount } from 'wagmi';
import ReactGA from 'react-ga4';
import { useFetchPowerLevel } from '@/hooks/bridge';

export default function Bridge() {
  const { address } = useAccount();
  const { data: powerLevel } = useFetchPowerLevel(address);

  return (
    <div className="mt-8">
      <div className="flex-center relative mt-5 gap-6 rounded-2xl bg-gradient-to-b from-gray-550/50 py-8 backdrop-blur-lg">
        <div className="absolute left-0 top-0 h-[138px] w-full rounded-t-2xl bg-card-mask" />
        <img width={104} src="/img/pl/power_level.png" alt="power_level" />
        <div>
          <p className="text-xl/5.5">P12 Arcana</p>
          <div className="text-gradient-yellow mt-3.5 text-[68px]/[68px] font-bold">{powerLevel?.power ?? 0}</div>
        </div>
      </div>
      <div className="mt-7 h-9 rounded-lg bg-[#4383FF4D] px-4 text-sm font-medium leading-9 backdrop-blur-lg">
        Bridge community badge to P12 Chain and obtain the corresponding Power Level.{' '}
        <span
          className="cursor-pointer text-blue"
          onClick={() => {
            window.open('https://project-twelve.notion.site/P12-Power-Level-PL-c69b5d578c2743a394a9110144b869c2', '__blank');
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
