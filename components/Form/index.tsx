import { AnimatePresence, motion } from "framer-motion";
import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useQueryClient } from "react-query";
import { GlobalContext } from "../../contexts/GlobalContext";
import IPokemon, { IPokemonKind } from "../../models/types";
import { usePokeMutation } from "../../services/usePokeMutations";
import Button from "../Button";
import Chip from "../Chip";
import Notifier from "../Notifier";
import { IInput } from "./types";

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

interface IFormProps {
  data?: IPokemon;
}

function Form({ data }: IFormProps) {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
    reset,
  } = useForm<IInput>();
  const { pokemonKind, setPokemonEdit } = React.useContext(GlobalContext);
  const [choosedTypes, setChoosedTypes] = React.useState<any[]>([]);
  const { postPokemonMutation, updatePokemonMutation } = usePokeMutation();
  const [update, setUpdate] = React.useState(false);
  const query = useQueryClient();
  React.useEffect(() => {
    const subscription = watch((data) => {
      if (data.kind) {
        setChoosedTypes((choosedTypes) => [
          ...choosedTypes,
          {
            type: data.kind || "",
          },
        ]);
        setValue("kind", "");
      }
    });
    return () => {
      subscription.unsubscribe();
    };
  }, [watch]);
  React.useEffect(() => {
    if (data && Object.keys(data).length) {
      setValue("name", data.name);
      setValue("level", Number(data.level));
      setChoosedTypes(
        data.kinds.map((item) => {
          return {
            type: item,
          };
        })
      );
      setUpdate(true);
    }
  }, []);
  const handleClose = (type: string) => {
    setChoosedTypes((choosedTypes) =>
      choosedTypes.filter((choosed) => choosed.type !== type)
    );
  };
  const onSubmit: SubmitHandler<IInput> = (formData) => {
    const pokemon = {
      ...formData,
      kinds: choosedTypes.map((item) => item.type),
    };
    if (update) {
      updatePokemonMutation.mutate(
        { id: data?.id, data: pokemon },
        {
          onSuccess: () => {
            query.refetchQueries("pokemons");
            setPokemonEdit("");
          },
        }
      );
    } else {
      postPokemonMutation.mutate(pokemon, {
        onSuccess: () => {
          query.refetchQueries("pokemons");
          setChoosedTypes([]);
          reset();
        },
      });
    }
  };
  return (
    <>
      <Notifier
        open={postPokemonMutation.isSuccess}
        text="Pokemon Successfully Captured !!"
        severity="success"
      />
      <Notifier
        open={updatePokemonMutation.isSuccess}
        text="Pokemon Successfully Updated !!"
        severity="success"
      />
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-4 gap-2">
          <div className="p-2 col-span-2 text-slate-800 gap-2 flex flex-col">
            <label htmlFor="name">Pokemon Name: </label>
            <input
              id="name"
              autoComplete="off"
              className="outline-none bg-slate-800 px-4 py-2 rounded-md bg-opacity-5 w-full"
              placeholder="name"
              {...register("name", { required: "Pokemon name is required" })}
            />
            <AnimatePresence>
              {errors.name?.type && (
                <motion.span
                  className=" text-red-800 text-opacity-60"
                  initial={"hidden"}
                  animate={"visible"}
                  exit={"exit"}
                  variants={variants}
                >
                  {errors.name?.message}
                </motion.span>
              )}
            </AnimatePresence>
          </div>
          <div className="p-2 col-span-2 text-slate-800 gap-2 flex flex-col">
            <label htmlFor="level">Pokemon Level: </label>
            <input
              id="level"
              type={"number"}
              {...register("level", {
                required: "Pokemon level is required",
                min: { value: 0, message: "The Minimum Value is 0" },
              })}
              className="outline-none bg-slate-800 px-4 py-2 rounded-md bg-opacity-5 w-full"
              placeholder="level"
            />
            <AnimatePresence>
              {errors.level?.type && (
                <motion.span
                  className=" text-red-800 text-opacity-60"
                  initial={"hidden"}
                  animate={"visible"}
                  exit={"exit"}
                  variants={variants}
                >
                  {errors.level?.message}
                </motion.span>
              )}
            </AnimatePresence>
          </div>
          <div className="p-2 col-span-4 text-slate-800 gap-2 flex flex-col transition-all">
            <label htmlFor="name">Pokemon Types: </label>
            <div className="flex gap-2 flex-wrap">
              {choosedTypes.map((choosed) => (
                <Chip
                  key={choosed.type}
                  text={choosed.type}
                  handleClose={() => handleClose(choosed.type)}
                />
              ))}
            </div>
            <select
              id="name"
              defaultValue={""}
              {...register("kind")}
              className="outline-none bg-slate-800 px-4 py-2 rounded-md bg-opacity-5 w-full"
            >
              <option value={""} disabled hidden>
                Choose one or more Types{" "}
              </option>
              {pokemonKind.map((item) => {
                if (
                  !choosedTypes.find((choosed) => choosed.type === item.type)
                ) {
                  return (
                    <option value={item.type} key={item.id}>
                      {item.type}
                    </option>
                  );
                }
              })}
            </select>
          </div>
          <div className="px-2">
            <Button
              type="submit"
              loading={
                postPokemonMutation.isLoading || updatePokemonMutation.isLoading
              }
            >
              Send
            </Button>
          </div>
        </div>
      </form>
    </>
  );
}

export default Form;
