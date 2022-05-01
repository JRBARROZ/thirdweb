import React from "react";
import { IPokemonKind } from "../models/types";
import { IGlobalContextProps, IGlobalContextProviderProps } from "./types";

const initialProps: IGlobalContextProps = {
  pokemonKind: [],
  setPokemonKind: () => {},
};

export const GlobalContext =
  React.createContext<IGlobalContextProps>(initialProps);

export const GlobalProvider = ({ children }: IGlobalContextProviderProps) => {
  const [pokemonKind, setPokemonKind] = React.useState<IPokemonKind[]>([]);
  return (
    <GlobalContext.Provider value={{ pokemonKind, setPokemonKind }}>
      {children}
    </GlobalContext.Provider>
  );
};
