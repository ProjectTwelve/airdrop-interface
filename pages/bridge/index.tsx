import { motion } from 'framer-motion';
import ReactGA from 'react-ga4';
import BridgeSwitch from '../../components/bridge/BridgeSwitch';

export default function Bridge() {
  return (
    <div className="mt-6">
      <div className="h-9 rounded-lg bg-[#4383FF4D] px-4 text-sm/9 font-medium backdrop-blur-lg">
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
