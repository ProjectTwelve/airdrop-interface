import React, { cloneElement, useState } from 'react';
import {
  autoUpdate,
  flip,
  offset,
  Placement,
  shift,
  useDismiss,
  useFloating,
  useFocus,
  useHover,
  useInteractions,
  useRole,
} from '@floating-ui/react';
import { AnimatePresence, motion } from 'framer-motion';

type TooltipProps = {
  placement?: Placement;
  data?: string;
  children: JSX.Element;
};

const ORIGIN: any = {
  top: 'bottom',
  bottom: 'top',
  right: 'left',
  left: 'right',
};
export default function PremiumPlusTooltip({ children, data, placement = 'top' }: TooltipProps) {
  const [open, setOpen] = useState(false);

  const {
    x,
    y,
    refs: { setReference, setFloating },
    strategy,
    context,
    placement: _placement,
  } = useFloating({
    placement,
    open,
    onOpenChange: setOpen,
    middleware: [offset(8), flip(), shift({ padding: 8 })],
    whileElementsMounted: autoUpdate,
  });

  const { getReferenceProps, getFloatingProps } = useInteractions([
    useHover(context, { restMs: 20, delay: { close: 60 } }),
    useFocus(context),
    useRole(context, { role: 'tooltip' }),
    useDismiss(context),
  ]);

  return (
    <>
      {cloneElement(children, getReferenceProps({ ref: setReference, ...children.props }))}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.85 }}
            transition={{ type: 'spring', damping: 20, stiffness: 300 }}
            {...getFloatingProps({
              ref: setFloating,
              className: 'bg-[url(/svg/pl/premium_plus_card.svg)] z-10 bg-cover w-[600px] h-[160px] text-orange-700',
              style: {
                position: strategy,
                top: y ?? 0,
                left: x ?? 0,
                transformOrigin: ORIGIN[_placement],
              },
            })}
          >
            <div className="pt-7.5 text-center text-xl/5 font-bold text-orange-700">Premium Holder</div>
            <div className="mt-5 flex">
              <div className="flex-1 text-center text-orange-700">
                <p className="font-medium leading-6.5 text-inherit">Mint Cost</p>
                <p className="text-[34px]/11 font-bold text-inherit">0.3 BNB</p>
              </div>
              <div className="h-14 w-px bg-orange-700" />
              <div className="flex-1 text-center text-orange-700">
                <p className="font-medium leading-6.5 text-inherit">Birth Date</p>
                <p className="text-[34px]/11 font-bold text-inherit">{data}</p>
              </div>
              <div className="h-14 w-px bg-orange-700" />
              <div className="flex-1 text-center text-orange-700">
                <p className="font-medium leading-6.5 text-inherit">PPL Reward</p>
                <p className="text-[34px]/11 font-bold text-inherit">???</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
