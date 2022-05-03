import {
  CheckCircleIcon,
  ExclamationCircleIcon,
  XCircleIcon,
} from "@heroicons/react/solid";
import { AnimatePresence, motion } from "framer-motion";
import React, { useContext } from "react";
import { GlobalContext } from "../../contexts/GlobalContext";
import { Notifier } from "./types";
const variants = {
  hidden: {
    opacity: 0,
    x: -500,
  },
  visible: {
    opacity: 1,
    x: 0,
  },
  exit: {
    opacity: 0,
    x: -500,
  },
};
function Notifier({ open = false, severity = "success", text = "" }: Notifier) {
  const [openTimer, setOpenTimer] = React.useState<boolean>(open);
  const globalContext = useContext(GlobalContext);
  const severityIcons: any = {
    success: {
      icon: <CheckCircleIcon className="w-4" />,
      color: "border-green-400",
    },
    warning: {
      icon: <ExclamationCircleIcon className="w-4" />,
      color: "border-yellow-400",
    },
    error: { icon: <XCircleIcon className="w-4" />, color: "border-red-400" },
  };
  React.useEffect(() => {
    setOpenTimer(open);
    if (open) {
      setTimeout(() => {
        setOpenTimer(false);
        globalContext.setCardDelete(false);
      }, 3000);
    }
  }, [open]);
  return (
    <AnimatePresence>
      {openTimer && (
        <motion.div
          variants={variants}
          initial={"hidden"}
          animate={"visible"}
          exit={"exit"}
          transition={{ duration: 0.5 }}
          className={` fixed bg-slate-400 border-l-4 ${severityIcons[severity].color} rounded-r-lg px-4 py-2 z-20 backdrop-blur-lg bg-opacity-10 bottom-10 left-10`}
        >
          <div className="flex items-center gap-2">
            <div>{severityIcons[severity].icon}</div>
            {text}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default Notifier;
