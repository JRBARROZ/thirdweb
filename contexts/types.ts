import React from "react";
import { IPokemonKind } from "../models/types";

export interface IContextProps {
  address: string;
  setAddress: React.Dispatch<React.SetStateAction<string>>;
}
export interface IContextProviderProps {
  children: React.ReactNode;
}

export interface IGlobalContextProps {
  pokemonKind: IPokemonKind[];
  setPokemonKind: React.Dispatch<React.SetStateAction<IPokemonKind[]>>;
  cardDelete: boolean;
  setCardDelete: React.Dispatch<React.SetStateAction<boolean>>;
  pokemonEdit: string | number;
  setPokemonEdit: React.Dispatch<React.SetStateAction<string | number>>;
}

export interface IGlobalContextProviderProps {
  children: React.ReactNode;
}
