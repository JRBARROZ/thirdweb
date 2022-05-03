import { XIcon } from "@heroicons/react/solid";
import { AnimatePresence, motion } from "framer-motion";
import React from "react";
import { IDialogProps } from "./types";
const variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
  },
  exit: {
    opacity: 0,
  },
};
function Dialog({ children, open, onClose, title }: IDialogProps) {
  React.useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [open]);
  return (
    <AnimatePresence exitBeforeEnter={true} onExitComplete={() => null}>
      {!!open ? (
        <motion.div
          className="w-full h-full fixed top-0 left-0 bg-slate-800 backdrop-blur-lg bg-opacity-50 flex items-center justify-center z-50"
          initial="hidden"
          variants={variants}
          animate="visible"
          onClick={onClose}
        >
          <motion.div
            onClick={(e) => e.stopPropagation()}
            className="bg-white p-4 rounded-md w-full max-w-lg"
            initial="hidden"
            variants={variants}
            animate="visible"
          >
            <div className="flex gap-2 items-center justify justify-between">
              <h1 className="text-slate-800 p-2 font-bold">{title}</h1>
              <div
                className=" transition-all p-2 hover:rounded-full cursor-pointer hover:bg-black hover:bg-opacity-10"
                onClick={onClose}
              >
                <XIcon className="w-5 text-slate-800" />
              </div>
            </div>
            {children}
          </motion.div>
        </motion.div>
      ) : (
        <div></div>
      )}
    </AnimatePresence>
  );
}

export default Dialog;
