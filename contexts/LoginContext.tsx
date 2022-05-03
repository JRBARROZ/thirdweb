import React from "react";
import { useQueryClient } from "react-query";
import instance from "../axios.config";
import { IContextProps, IContextProviderProps } from "./types";

const initialProps: IContextProps = {
  address: "",
  setAddress: () => {},
};

export const LoginContext = React.createContext<IContextProps>(initialProps);

export const LoginProvider = ({ children }: IContextProviderProps) => {
  const [address, setAddress] = React.useState<string>("");
  const query = useQueryClient();
  React.useEffect(() => {
    if (address) {
      instance.interceptors.request.use((config) => {
        if (config.headers) {
          config.headers.Authorization = address;
        }
        return config;
      });
      query.refetchQueries("pokemons");
    }
  }, [address]);
  return (
    <LoginContext.Provider value={{ address, setAddress }}>
      {children}
    </LoginContext.Provider>
  );
};
