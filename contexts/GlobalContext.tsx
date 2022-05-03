import React from "react";
import { IPokemonKind } from "../models/types";
import { IGlobalContextProps, IGlobalContextProviderProps } from "./types";

const initialProps: IGlobalContextProps = {
  pokemonKind: [],
  cardDelete: false,
  pokemonEdit: "",
  setPokemonEdit: () => {},
  setCardDelete: () => {},
  setPokemonKind: () => {},
};

export const GlobalContext =
  React.createContext<IGlobalContextProps>(initialProps);

export const GlobalProvider = ({ children }: IGlobalContextProviderProps) => {
  const [pokemonKind, setPokemonKind] = React.useState<IPokemonKind[]>([]);
  const [cardDelete, setCardDelete] = React.useState<boolean>(false);
  const [pokemonEdit, setPokemonEdit] = React.useState<string | number>("");
  return (
    <GlobalContext.Provider
      value={{ pokemonKind, setPokemonKind, cardDelete, setCardDelete , pokemonEdit, setPokemonEdit}}
    >
      {children}
    </GlobalContext.Provider>
  );
};
