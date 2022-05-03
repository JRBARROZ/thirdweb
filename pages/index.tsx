import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useAddress, useDisconnect, useMetamask } from "@thirdweb-dev/react";
import React, { useContext } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  useMutation,
  useQuery,
  QueryClient,
  useQueryClient,
} from "react-query";
import instance from "../axios.config";
import INfts, { IPokemonKind } from "../models/types";
import { XCircleIcon, PencilIcon, PlusIcon } from "@heroicons/react/solid";
import { LoginContext } from "../contexts/LoginContext";
import SearchBar from "../components/SearchBar";
import Dialog from "../components/Dialog";
import Form from "../components/Form";
import { GlobalContext } from "../contexts/GlobalContext";
import PokeCard from "../components/PokeCard";
import { usePokeQuery } from "../services/usePokeQuery";
import Notifier from "../components/Notifier";
import { usePokeMutation } from "../services/usePokeMutations";
import IPokemon from "../models/types";

interface IServerSideProps {
  kinds: IPokemonKind[];
}
const Home = ({ kinds }: IServerSideProps) => {
  const [open, setOpen] = React.useState<boolean>(false);
  const { setPokemonKind, cardDelete, pokemonEdit } = useContext(GlobalContext);
  const { getPokemonQuery } = usePokeQuery();
  const [updatePokemon, setUpdatePokemon] = React.useState<
    IPokemon | undefined
  >(undefined);
  React.useEffect(() => {
    setPokemonKind(kinds);
  }, []);
  React.useEffect(() => {
    if (pokemonEdit) {
      setUpdatePokemon(
        getPokemonQuery.data?.find((pokemon) => pokemon.id === pokemonEdit)
      );
      setOpen(true);
    } else {
    }
  }, [pokemonEdit]);

  return (
    <>
      <Notifier
        text="Pokemon deleted with success!"
        severity="success"
        open={cardDelete}
      />
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        title="Add / Edit - Pokemon"
      >
        <Form data={updatePokemon} />
      </Dialog>
      <div className="flex gap-4">
        <div
          className="flex bg-white bg-opacity-5 rounded-lg hover:bg-opacity-10 px-5 cursor-pointer"
          onClick={() => {
            setUpdatePokemon(undefined);
            setOpen(true);
          }}
        >
          <PlusIcon className="w-6" />
        </div>
        <SearchBar />
      </div>
      <div className="grid md:grid-cols-4 sm:grid-cols-2 mt-5 mb-10 gap-4">
        <AnimatePresence>
          {getPokemonQuery.data?.map((pokemon, index) => (
            <PokeCard
              id={pokemon.id || ""}
              name={pokemon.name}
              level={Number(pokemon.level)}
              types={pokemon.kinds}
              key={index}
            />
          ))}
        </AnimatePresence>
      </div>
    </>
  );
};
export async function getStaticProps() {
  const { data } = await instance.get<IPokemonKind>("/");
  return {
    props: {
      kinds: data,
    },
  };
}

export default Home;
