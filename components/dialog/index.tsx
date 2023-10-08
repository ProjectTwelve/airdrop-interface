import React, { cloneElement, useEffect, useState } from 'react';
import {
  useClick,
  useFloating,
  useInteractions,
  useRole,
  FloatingPortal,
  FloatingOverlay,
  FloatingFocusManager,
  useDismiss,
} from '@floating-ui/react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { twMerge } from 'tailwind-merge';
import { fontVariants } from '@/constants/font';
import classNames from 'classnames';

type DialogProps = {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  onExitComplete?: () => void;
  showCloseButton?: boolean;
  isDismiss?: boolean;
  render: (props: { close: () => void }) => React.ReactNode;
  children?: JSX.Element;
  className?: string;
  overlayClass?: string;
  containerClass?: string;
};

function Dialog({
  render,
  open: passedOpen = false,
  children,
  showCloseButton = true,
  isDismiss,
  onOpenChange,
  onExitComplete,
  className,
  overlayClass,
  containerClass,
}: React.PropsWithChildren<DialogProps>) {
  const [open, setOpen] = useState(false);

  const onClose = (value: boolean) => {
    setOpen(value);
    onOpenChange?.(value);
  };

  const {
    refs: { setReference, setFloating },
    context,
  } = useFloating({
    open,
    onOpenChange: onClose,
  });
  const dismiss = useDismiss(context, { enabled: isDismiss, outsidePressEvent: 'mousedown' });

  const { getReferenceProps, getFloatingProps } = useInteractions([useClick(context), useRole(context), dismiss]);

  useEffect(() => {
    if (passedOpen === undefined) return;
    setOpen(passedOpen);
  }, [passedOpen]);

  return (
    <>
      {children && cloneElement(children, getReferenceProps({ ref: setReference, ...children.props }))}
      <FloatingPortal>
        <AnimatePresence onExitComplete={onExitComplete}>
          {open && (
            <FloatingOverlay
              lockScroll
              className={twMerge('z-[100] grid place-items-center bg-gray-900/60 backdrop-blur-lg', overlayClass)}
            >
              <FloatingFocusManager context={context}>
                <motion.div
                  className={twMerge(classNames('backdrop-box rounded-2xl bg-[#23262c]/50', ...fontVariants), className)}
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.85 }}
                  transition={{ type: 'spring', damping: 20, stiffness: 300 }}
                  {...getFloatingProps({ ref: setFloating })}
                >
                  <div className={twMerge('relative p-7 md:p-2', containerClass)}>
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
