import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useAddress, useDisconnect, useMetamask } from "@thirdweb-dev/react";
import React from "react";
import { motion } from "framer-motion";
import { useMutation, useQuery, QueryClient } from "react-query";
import instance from "../axios.config";
import INfts, { IKinds } from "../models/types";
import { XCircleIcon, PencilIcon } from "@heroicons/react/solid";
interface IUpdateNFTS {
  id: string | undefined;
  data: INfts;
}
interface IServerSideProps {
  kinds: IKinds[];
}
const Home = ({ kinds }: IServerSideProps) => {
  const [name, setName] = React.useState<string>("");
  const [img, setImg] = React.useState<string>("");
  const [level, setLevel] = React.useState<string>("");
  const [data, setData] = React.useState<INfts[]>([]);
  const [update, setUpdate] = React.useState<string | undefined>(undefined);
  const [kind, setKind] = React.useState<any>([]);
  const connectWithMetamask = useMetamask();
  const address = useAddress();
  const disconnect = useDisconnect();
  const variants = {
    open: { opacity: 1 },
    closed: { x: -100, opacity: 0 },
  };
  //Update Service
  const updateService = async ({ id, data }: IUpdateNFTS) => {
    return instance.put<string, INfts>(`/${id}`, data);
  };
  //Mutations
  const nftMutation = useMutation<INfts, Error, INfts>((data) => {
    return instance.post("/", data);
  });
  const nftMutationDelete = useMutation((id: string) => {
    return instance.delete(`/${id}`);
  });
  const nftMutationUpdate = useMutation(updateService);
  function handleSubmit() {
    if (!update) {
      nftMutation.mutate(
        {
          name: name,
          userAddress: address,
          kinds: kind,
          level: level,
        },
        {
          onSuccess: () => {
            nftsQueries.refetch();
          },
        }
      );
    } else {
      nftMutationUpdate.mutate(
        {
          id: update,
          data: {
            name: name,
            userAddress: address,
            kinds: kind,
            level: level,
          },
        },
        {
          onSettled: () => {
            setName("");
            setImg("");
            setUpdate(undefined);
          },
          onSuccess: () => {
            nftsQueries.refetch();
          },
        }
      );
    }
  }
  //Queries
  const nftsQueries = useQuery<INfts[]>(
    "nfts",
    () => {
      return instance.get<INfts[]>(`/${address}`).then((res) => {
        setData(res.data);
        return res.data;
      });
    },
    { enabled: false }
  );
  //Effects
  React.useEffect(() => {
    if (address) {
      nftsQueries.refetch();
    }
  }, [address]);
  const handleChange = ({ target }: React.ChangeEvent<HTMLSelectElement>) => {
    let value = Array.from(target.selectedOptions, (option) => option.value);
    setKind(value);
  };
  return (
    <>
      <div className="flex">
        <div className="w-full h-10 text-center justify-center item-center bg-gradient-to-r from-blue-500  to-pink-400">

        </div>
      </div>
    </>
  );
};
export async function getServerSideProps() {
  const { data } = await instance.get<IKinds>("/");
  return {
    props: {
      kinds: data,
    }, // will be passed to the page component as props
  };
}

export default Home;
