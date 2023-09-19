import React, { cloneElement, useState } from 'react';
import {
  offset,
  flip,
  shift,
  autoUpdate,
  useFloating,
  useInteractions,
  useHover,
  useFocus,
  useRole,
  useDismiss,
  Placement,
} from '@floating-ui/react';
import { motion, AnimatePresence } from 'framer-motion';

type TooltipProps = {
  label: React.ReactNode;
  placement?: Placement;
  children: JSX.Element;
};

const ORIGIN: any = {
  top: 'bottom',
  bottom: 'top',
  right: 'left',
  left: 'right',
};

/**
 * Tooltip
 * @constructor
 */
export const Tooltip = ({ children, label, placement = 'top' }: TooltipProps) => {
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
              className: 'tooltip__container absolute z-40 text-xs/3.5 max-w-[380px] rounded-lg',
              style: {
                position: strategy,
                top: y ?? 0,
                left: x ?? 0,
                transformOrigin: ORIGIN[_placement],
              },
            })}
          >
            <div className="p-3">{label}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
