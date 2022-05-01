import { XIcon } from "@heroicons/react/solid";
import { AnimatePresence, motion } from "framer-motion";
import React from "react";
import { IChipProps } from "./types";
const variants = {
  hidden: {
    opacity: 0,
    x: -20,
  },
  visible: {
    opacity: 1,
    x: 0,
  },
  exit: {
    opacity: 0,
    x: -20,
  },
};
function Chip({ text, handleClose }: IChipProps) {
  return (
    <AnimatePresence>
      <motion.div
        variants={variants}
        initial={"hidden"}
        animate={"visible"}
        exit="exit"
        className="flex justify-between gap-2 items-center max-w-max bg-slate-800 text-white py-1 px-2 rounded-xl"
      >
        <p className=" text-xs text-white text-opacity-80">{text}</p>
        <div
          className="bg-white rounded-full bg-opacity-20 p-1 hover:bg-opacity-30 cursor-pointer"
          onClick={handleClose}
        >
          <XIcon className="w-3 " />
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

export default Chip;
