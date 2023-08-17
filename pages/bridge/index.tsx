import React from 'react';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import Back from '../../components/back';
import BridgeSwitch from '../../components/bridge/BridgeSwitch';

export default function Bridge() {
  const router = useRouter();
  return (
    <div className="mt-8">
      <Back
        onClick={() => {
          router.back();
        }}
      />
      <div>TODO: copy</div>
      <div className="h-9 rounded-lg bg-[#4383FF4D] px-4 text-sm font-medium leading-9">
        Bridge community badge to P12 Chain and obtain the corresponding Power Level.{' '}
        <span className="cursor-pointer text-blue">Details {'>'}</span>
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
