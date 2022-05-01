import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useAddress, useDisconnect, useMetamask } from "@thirdweb-dev/react";
import React, { useContext } from "react";
import { motion } from "framer-motion";
import { useMutation, useQuery, QueryClient } from "react-query";
import instance from "../axios.config";
import INfts, { IPokemonKind } from "../models/types";
import { XCircleIcon, PencilIcon, PlusIcon } from "@heroicons/react/solid";
import { LoginContext } from "../contexts/LoginContext";
import SearchBar from "../components/SearchBar";
import Dialog from "../components/Dialog";
import Form from "../components/Form";
import { GlobalContext } from "../contexts/GlobalContext";
interface IUpdateNFTS {
  id: string | undefined;
  data: INfts;
}
interface IServerSideProps {
  kinds: IPokemonKind[];
}
const Home = ({ kinds }: IServerSideProps) => {
  const [open, setOpen] = React.useState<boolean>(false);
  const { setPokemonKind } = useContext(GlobalContext);
  React.useEffect(() => {
    setPokemonKind(kinds);
  }, []);

  //Update Service
  // const updateService = async ({ id, data }: IUpdateNFTS) => {
  //   return instance.put<string, INfts>(`/${id}`, data);
  // };
  // //Mutations
  // const nftMutation = useMutation<INfts, Error, INfts>((data) => {
  //   return instance.post("/", data);
  // });
  // const nftMutationDelete = useMutation((id: string) => {
  //   return instance.delete(`/${id}`);
  // });
  // const nftMutationUpdate = useMutation(updateService);
  // function handleSubmit() {
  //   if (!update) {
  //     nftMutation.mutate(
  //       {
  //         name: name,
  //         userAddress: address,
  //         kinds: kind,
  //         level: level,
  //       },
  //       {
  //         onSuccess: () => {
  //           nftsQueries.refetch();
  //         },
  //       }
  //     );
  //   } else {
  //     nftMutationUpdate.mutate(
  //       {
  //         id: update,
  //         data: {
  //           name: name,
  //           userAddress: address,
  //           kinds: kind,
  //           level: level,
  //         },
  //       },
  //       {
  //         onSettled: () => {
  //           setName("");
  //           setImg("");
  //           setUpdate(undefined);
  //         },
  //         onSuccess: () => {
  //           nftsQueries.refetch();
  //         },
  //       }
  //     );
  //   }
  // }
  // //Queries
  // const nftsQueries = useQuery<INfts[]>(
  //   "nfts",
  //   () => {
  //     return instance.get<INfts[]>(`/${address}`).then((res) => {
  //       setData(res.data);
  //       return res.data;
  //     });
  //   },
  //   { enabled: false }
  // );
  // //Effects
  // React.useEffect(() => {
  //   if (address) {
  //     nftsQueries.refetch();
  //   }
  // }, [address]);
  // const handleChange = ({ target }: React.ChangeEvent<HTMLSelectElement>) => {
  //   let value = Array.from(target.selectedOptions, (option) => option.value);
  //   setKind(value);
  // };
  return (
    <>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        title="Add / Edit - Pokemon"
      >
        <Form />
      </Dialog>
      <div className="flex gap-2 w-">
        <div
          className="flex bg-white bg-opacity-5 rounded-lg hover:bg-opacity-10 px-5 cursor-pointer"
          onClick={() => {
            setOpen(true);
          }}
        >
          <PlusIcon className=" w-6 " />
        </div>
        <SearchBar />
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
