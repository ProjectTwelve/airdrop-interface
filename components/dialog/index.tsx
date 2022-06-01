import React, { cloneElement, useEffect, useState } from 'react';
import {
  useClick,
  useFloating,
  useInteractions,
  useRole,
  FloatingPortal,
  FloatingOverlay,
  FloatingFocusManager,
} from '@floating-ui/react-dom-interactions';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

type DialogProps = {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  render: (props: { close: () => void }) => React.ReactNode;
  children?: JSX.Element;
};

function Dialog({ render, open: passedOpen = false, children, onOpenChange }: React.PropsWithChildren<DialogProps>) {
  const [open, setOpen] = useState(false);

  const onClose = (value: boolean) => {
    setOpen(value);
    onOpenChange?.(value);
  };

  const { reference, floating, context } = useFloating({
    open,
    onOpenChange: onClose,
  });

  const { getReferenceProps, getFloatingProps } = useInteractions([useClick(context), useRole(context)]);

  useEffect(() => {
    if (passedOpen === undefined) return;
    setOpen(passedOpen);
  }, [passedOpen]);

  return (
    <>
      {children && cloneElement(children, getReferenceProps({ ref: reference, ...children.props }))}
      <FloatingPortal>
        <AnimatePresence>
          {open && (
            <FloatingOverlay
              lockScroll
              style={{
                display: 'grid',
                placeItems: 'center',
                background: 'rgba(12, 12, 12, 0.60)',
                backdropFilter: 'blur(20px)',
                zIndex: 20,
              }}
            >
              <FloatingFocusManager context={context}>
                <motion.div
                  className="backdrop-box rounded-2xl"
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.45 }}
                  transition={{ type: 'spring', damping: 20, stiffness: 300 }}
                  {...getFloatingProps({ ref: floating })}
                >
                  <div className="relative p-7">
                    <div className="absolute right-7 top-7 flex h-4 w-4 cursor-pointer items-center justify-center">
                      <Image src="/svg/close.svg" width={14} height={14} alt="close" onClick={() => onClose(false)} />
                    </div>
                    {render({
                      close: () => onClose(false),
                    })}
                  </div>
                </motion.div>
              </FloatingFocusManager>
            </FloatingOverlay>
          )}
        </AnimatePresence>
      </FloatingPortal>
    </>
  );
}

export default React.memo(Dialog);
