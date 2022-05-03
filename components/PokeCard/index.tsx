import {
  ChevronDoubleUpIcon,
  PencilIcon,
  PuzzleIcon,
  XCircleIcon,
} from "@heroicons/react/solid";
import { StarIcon } from "@heroicons/react/outline";
import { motion } from "framer-motion";
import React, { useContext } from "react";
import { IPokeCardProps } from "./types";
import { usePokeMutation } from "../../services/usePokeMutations";
import { GlobalContext } from "../../contexts/GlobalContext";
import Image from "next/image";

function PokeCard({ name = "", level = 0, id, types = [] }: IPokeCardProps) {
  const { deletePokemonMutation } = usePokeMutation();
  const globalContext = useContext(GlobalContext);
  return (
    <motion.div
      key={id}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="p-8 bg-white overflow-hidden relative rounded-md bg-opacity-5 transition-all hover:bg-opacity-10 hover:cursor-pointer gap-2 flex flex-1 flex-col card w-full"
    >
      <img
        src={"/pokball.png"}
        width={80}
        height={80}
        className="absolute -bottom-5 -left-5 -z-10 opacity-5  -rotate-12"
      />
      <div className="flex flex-wrap justify-between items-center ">
        <p className=" font-bold">{name}</p>
        <div className="flex gap-2">
          <StarIcon className="w-4 opacity-50 hover:scale-150  transition-all hover:text-yellow-400 hover:opacity-100" />
          <PencilIcon
            className="w-4 opacity-50 hover:scale-150 transition-all hover:text-blue-400 hover:opacity-100"
            onClick={() => globalContext.setPokemonEdit(id)}
          />
          <XCircleIcon
            className="w-4 opacity-50 hover:scale-150 transition-all hover:text-red-400 hover:opacity-100"
            onClick={() => deletePokemonMutation.mutate(id)}
          />
        </div>
      </div>
      <div className=" flex gap-2">
        <ChevronDoubleUpIcon className="w-4 opacity-50 items-center" />
        <p className=" opacity-50">{level}</p>
      </div>
      <hr className="opacity-50 mt-2 mb-2 border-dashed" />
      <div className="flex gap-2">
        <div className="flex flex-wrap gap-4">
          {types.map((type) => {
            return (
              <div
                key={type.type}
                className="rounded-lg bg-red-400 bg-opacity-5 text-xs flex-1 p-4"
              >
                <p className=" text-center">{type}</p>
              </div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}

export default PokeCard;
