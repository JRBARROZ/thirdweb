import React from "react";
import { IContextProps, IContextProviderProps } from "./types";
export const LoginContext = React.createContext<IContextProps>(
  {} as IContextProps
);

export const LoginProvider = ({ children }: IContextProviderProps) => {
  return <LoginContext.Provider value={{}}>{children}</LoginContext.Provider>;
};
