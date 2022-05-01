import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { GlobalContext } from "../../contexts/GlobalContext";
import { IPokemonKind } from "../../models/types";
import Chip from "../Chip";
import { IInput } from "./types";
function Form() {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<IInput>();
  const onSubmit: SubmitHandler<IInput> = (data) => {
    console.log(data);
  };
  const { pokemonKind } = React.useContext(GlobalContext);
  const [choosedTypes, setChoosedTypes] = React.useState<IPokemonKind[]>([]);
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
  function handleClose(type: string) {
    setChoosedTypes((choosedTypes) =>
      choosedTypes.filter((choosed) => choosed.type !== type)
    );
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="grid grid-cols-4 gap-2">
        <div className="p-2 col-span-2 text-slate-800 gap-2 flex flex-col">
          <label htmlFor="name">Pokemon Name: </label>
          <input
            id="name"
            className="outline-none bg-slate-800 px-4 py-2 rounded-md bg-opacity-5 w-full"
            placeholder="name"
            {...register("name", { required: "Pokemon name is required" })}
          />
          <span className=" text-red-800 text-opacity-60">
            {errors.name?.message}
          </span>
        </div>
        <div className="p-2 col-span-2 text-slate-800 gap-2 flex flex-col">
          <label htmlFor="level">Pokemon Level: </label>
          <input
            id="level"
            type={"number"}
            min={0}
            {...register("level", { required: "Pokemon level is required" })}
            className="outline-none bg-slate-800 px-4 py-2 rounded-md bg-opacity-5 w-full"
            placeholder="level"
          />
          <span className=" text-red-800 text-opacity-60">
            {errors.level?.message}
          </span>
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
            {...register("kind", {
              required: true,
            })}
            required
            className="outline-none bg-slate-800 px-4 py-2 rounded-md bg-opacity-5 w-full"
          >
            <option value={""} disabled hidden>
              Choose one or more Types{" "}
            </option>
            {pokemonKind.map((item) => {
              if (!choosedTypes.find((choosed) => choosed.type === item.type)) {
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
          <button
            type="submit"
            className=" text-white bg-gradient-to-r from-pink-800  to-red-500 hover:to-pink-800 hover:transition-all py-2 px-8 rounded-md"
          >
            Send
          </button>
        </div>
      </div>
    </form>
  );
}

export default Form;
