import { FloatingOverlay, FloatingPortal } from '@floating-ui/react-dom-interactions';
import { motion, AnimatePresence } from 'framer-motion';

export default function Card() {
  return (
    <FloatingPortal>
      <AnimatePresence>
        <FloatingOverlay
          lockScroll
          style={{
            display: 'grid',
            placeItems: 'center',
            background: 'rgba(12, 12, 12, 0.60)',
            backdropFilter: 'blur(20px)',
            zIndex: 30,
          }}
        >
          <motion.div className="relative h-[140px]">
            <div className="absolute -top-[412px] z-10 h-[1024px] w-full overflow-hidden rounded-2xl border border-[#43BBFF]">
              <div className="h-full bg-card-0 bg-cover">card</div>
            </div>
          </motion.div>
        </FloatingOverlay>
      </AnimatePresence>
    </FloatingPortal>
  );
}
