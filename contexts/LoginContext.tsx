import React from "react";
import { IContextProps, IContextProviderProps } from "./types";

const initialProps: IContextProps = {
  address: "",
  setAddress: () => {},
};

export const LoginContext = React.createContext<IContextProps>(initialProps);

export const LoginProvider = ({ children }: IContextProviderProps) => {
  const [address, setAddress] = React.useState<string>("");
  return (
    <LoginContext.Provider value={{ address, setAddress }}>
      {children}
    </LoginContext.Provider>
  );
};
