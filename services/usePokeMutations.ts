import { useContext } from "react";
import { useMutation, useQueryClient } from "react-query";
import instance from "../axios.config";
import { GlobalContext } from "../contexts/GlobalContext";
import IPokemon from "../models/types";
import { IUpdateMutation } from "./types";
export const usePokeMutation = () => {
  const query = useQueryClient();
  const globalContext = useContext(GlobalContext);
  const postPokemonMutation = useMutation<IPokemon, Error, any>((data) => {
    return instance.post("/", data);
  });
  const deletePokemonMutation = useMutation(
    (id: string) => {
      return instance.delete(`/${id}`);
    },
    {
      onSuccess: () => {
        query.refetchQueries("pokemons");
        globalContext.setCardDelete(true)
      },
    }
  );
  const updatePokemonMutation = useMutation(({ id, data }: IUpdateMutation) => {
    return instance.put<string, IPokemon>(`/${id}`, data);
  });
  return {
    postPokemonMutation,
    deletePokemonMutation,
    updatePokemonMutation,
  };
};
