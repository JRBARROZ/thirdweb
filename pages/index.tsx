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
import {
  XCircleIcon,
  PencilIcon,
  PlusIcon,
  SearchIcon,
} from "@heroicons/react/solid";
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
  const [search, setSearch] = React.useState<string>("");
  const [updatePokemon, setUpdatePokemon] = React.useState<
    IPokemon | undefined
  >(undefined);
  const [searchArray, setSearchArray] = React.useState<INfts[] | undefined>();
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
  React.useEffect(() => {
    setSearchArray(getPokemonQuery.data);
  }, [getPokemonQuery.data]);

  React.useEffect(() => {
    const searchTimeout = setTimeout(() => {
      console.log("Search Time!");
      if (search) {
        setSearchArray(
          getPokemonQuery.data?.filter((pokemon) => {
            if (
              pokemon.name.toLocaleLowerCase().includes(search.toLowerCase())
            ) {
              return pokemon;
            }
          })
        );
      } else {
        setSearchArray(getPokemonQuery.data);
      }
    }, 300);
    return () => {
      clearTimeout(searchTimeout);
    };
  }, [search]);
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
        <div className="flex max-w-sm w-full transition-all items-center">
          <input
            className="w-full outline-none rounded-l-md py-2 px-4 bg-white bg-opacity-5 focus:bg-opacity-10 transition-all"
            placeholder="Search Pokemon.."
            value={search}
            onChange={({ target }) => {
              setSearch(target.value);
            }}
          ></input>
          <div className="flex flex-grow bg-white bg-opacity-10 h-full px-5 rounded-r-lg">
            <SearchIcon className="w-6" />
          </div>
        </div>
      </div>
      <div className="grid md:grid-cols-4 sm:grid-cols-2 mt-5 mb-10 gap-4">
        <AnimatePresence>
          {searchArray?.map((pokemon, index) => (
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
