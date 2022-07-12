import { cloneElement, useState } from 'react';
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
} from '@floating-ui/react-dom-interactions';
import { motion, AnimatePresence } from 'framer-motion';
import type { Placement } from '@floating-ui/react-dom-interactions';

type TooltipProps = {
  label: string;
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
    reference,
    floating,
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
      {cloneElement(children, getReferenceProps({ ref: reference, ...children.props }))}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.85 }}
            transition={{ type: 'spring', damping: 20, stiffness: 300 }}
            {...getFloatingProps({
              ref: floating,
              className: 'tooltip__container max-w-[300px] rounded-lg',
              style: {
                position: strategy,
                top: y ?? 0,
                left: x ?? 0,
                transformOrigin: ORIGIN[_placement],
              },
            })}
          >
            <div className="p-4">{label}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
