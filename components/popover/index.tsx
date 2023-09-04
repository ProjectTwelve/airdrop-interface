import React, { cloneElement, useEffect, useState } from 'react';
import {
  Placement,
  offset,
  flip,
  shift,
  autoUpdate,
  useFloating,
  useInteractions,
  useRole,
  useDismiss,
  useClick,
  FloatingFocusManager,
} from '@floating-ui/react';
import { motion, AnimatePresence } from 'framer-motion';

type PopoverProps = {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  render: (data: { close: () => void }) => React.ReactNode;
  placement?: Placement;
  children: JSX.Element;
};

function Popover({ children, render, placement, open: passedOpen, onOpenChange }: React.PropsWithChildren<PopoverProps>) {
  const [open, setOpen] = useState(false);

  const {
    x,
    y,
    refs: { setFloating, setReference },
    strategy,
    context,
  } = useFloating({
    open,
    onOpenChange: (op) => {
      setOpen(op);
      onOpenChange?.(op);
    },
    middleware: [offset(10), flip(), shift()],
    placement,
    whileElementsMounted: autoUpdate,
  });

  const { getReferenceProps, getFloatingProps } = useInteractions([useClick(context), useRole(context), useDismiss(context)]);

  useEffect(() => {
    if (passedOpen === undefined) return;
    setOpen(passedOpen);
  }, [passedOpen]);

  return (
    <>
      {cloneElement(children, getReferenceProps({ ref: setReference, ...children.props }))}
      <AnimatePresence>
        {open && (
          <FloatingFocusManager context={context}>
            <motion.div
              className="backdrop-box rounded-2xl"
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1, originY: 0 }}
              exit={{ opacity: 0, scale: 0.85 }}
              transition={{ type: 'spring', damping: 20, stiffness: 300 }}
              {...getFloatingProps({
                ref: setFloating,
                style: {
                  position: strategy,
                  top: y ?? '',
                  left: x ?? '',
                },
              })}
            >
              {render({
                close: () => {
                  setOpen(false);
                  onOpenChange?.(false);
                },
              })}
            </motion.div>
          </FloatingFocusManager>
        )}
      </AnimatePresence>
    </>
  );
}

export default React.memo(Popover);
