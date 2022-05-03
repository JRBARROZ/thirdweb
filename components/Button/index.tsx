import { CubeTransparentIcon } from "@heroicons/react/solid";
import { motion } from "framer-motion";
import React from "react";
import { IButtonProps } from "./types";

function Button({ children, loading, type, handleClick }: IButtonProps) {
  const AnimatedCubeLogo = motion(CubeTransparentIcon);
  return (
    <button
      onClick={handleClick}
      type="submit"
      disabled={loading}
      className=" text-white default:bg-gradient-to-r from-pink-800  to-red-500 hover:to-pink-800 hover:transition-all py-2 px-8 rounded-md disabled:bg-gradient-to-r disabled:from-slate-800 disabled:to-slate-800"
    >
      {loading ? (
        <AnimatedCubeLogo
          animate={{ rotate: 360 }}
          className="w-6 h-6"
          transition={{ duration: 1, repeat: Infinity }}
        />
      ) : (
        children
      )}
    </button>
  );
}

export default Button;
