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
  onExitComplete?: () => void;
  showCloseButton?: boolean;
  render: (props: { close: () => void }) => React.ReactNode;
  children?: JSX.Element;
};

function Dialog({
  render,
  open: passedOpen = false,
  children,
  showCloseButton = true,
  onOpenChange,
  onExitComplete,
}: React.PropsWithChildren<DialogProps>) {
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
        <AnimatePresence onExitComplete={onExitComplete}>
          {open && (
            <FloatingOverlay lockScroll className="z-20 grid place-items-center bg-p12-dialog backdrop-blur-lg">
              <FloatingFocusManager context={context}>
                <motion.div
                  className="backdrop-box rounded-2xl"
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.85 }}
                  transition={{ type: 'spring', damping: 20, stiffness: 300 }}
                  {...getFloatingProps({ ref: floating })}
                >
                  <div className="relative p-7 md:p-2">
                    {showCloseButton && (
                      <div className="absolute right-7 top-7 flex h-4 w-4 cursor-pointer items-center justify-center md:right-3 md:top-3">
                        <Image src="/svg/close.svg" width={14} height={14} alt="close" onClick={() => onClose(false)} />
                      </div>
                    )}
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
