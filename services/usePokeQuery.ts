import { useMutation, useQuery } from "react-query";
import instance from "../axios.config";
import IPokemon from "../models/types";

export const usePokeQuery = () => {
  const getPokemonQuery = useQuery<IPokemon[]>(
    "pokemons",
    () => {
      return instance.get<IPokemon[]>(`/pokemons`).then((res) => {
        return res.data;
      });
    },
    {
      enabled: false,
    }
  );
  return {
    getPokemonQuery,
  };
};
