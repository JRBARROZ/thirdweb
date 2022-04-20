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
      <div className="flex relative mt-10">
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full bg-gradient-to-tr from-tertiary to-secondary z-0 blur-3xl opacity-20"></div>
        <div className="m-auto z-10 items-center flex gap-6 max-w-screen-xl w-full justify-around">
          <div className="flex flex-col gap-5">
            <motion.div
              className=""
              variants={variants}
              animate={address ? "open" : "closed"}
            >
              {
                <p className=" text-tertiary text-center font-medium text-xl mb-5">
                  You're In XD
                </p>
              }
              {
                <p className=" text-secondary text-center bg-white bg-opacity-10 p-6 rounded-xl ">
                  {address || "Logout ..."}
                </p>
              }
            </motion.div>
            <button
              className=" border px-8 py-4 rounded-md bg-primary bg-opacity-25 border-tertiary hover:scale-110 transition-all"
              onClick={() => (address ? disconnect() : connectWithMetamask())}
            >
              {address ? "Sign Out :(" : "Sign In With Metamask"}
            </button>
            <motion.div
              className="flex flex-col gap-5"
              variants={variants}
              animate={address ? "open" : "closed"}
            >
              <p>Kind :</p>
              <select
                name="cars"
                id="cars"
                multiple
                className=" text-secondary p-2 rounded-md bg-rgba outline-none"
                value={kind}
                onChange={handleChange}
              >
                {kinds.map((kind) => {
                  return (
                    <option key={kind.id} value={kind.id}>
                      {kind.type}
                    </option>
                  );
                })}
              </select>
              <p>Name :</p>
              <input
                type={"text"}
                className=" text-secondary p-2 rounded-md  bg-rgba outline-none"
                value={name}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setName(e.target.value)
                }
              ></input>
              <p>Level :</p>
              <input
                type={"number"}
                className=" text-secondary p-2 rounded-md  bg-rgba outline-none"
                value={level}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setLevel(e.target.value)
                }
              ></input>
              <motion.div>
                <button
                  className={`border px-8 py-4 rounded-md w-full bg-primary bg-opacity-25 border-tertiary hover:scale-110 transition-all ${
                    nftMutation.isLoading &&
                    " disabled:bg-rgba disabled:border-none"
                  }`}
                  onClick={handleSubmit}
                  disabled={nftMutation.isLoading}
                >
                  {nftMutation.isLoading
                    ? "Adding..."
                    : !update
                    ? "Add new pokemon"
                    : "Update pokemon"}
                </button>
              </motion.div>
              <p className=" text-tertiary text-center font-medium text-xl mb-5">
                My Pokemons
              </p>
              <div className="h-72 overflow-auto p-2 flex flex-col gap-2 spac">
                {!!data.length &&
                  data.map((nft) => {
                    return (
                      <div
                        key={nft.id}
                        className="text-secondary bg-white bg-opacity-10 p-6 rounded-xl flex justify-between items-center"
                      >
                        <div className="flex gap-8 items-center">
                          <p>{nft.name}</p>
                        </div>
                        <div className="flex space-x-1">
                          <PencilIcon
                            className="h-5 w-5 text-secondary hover:scale-125 cursor-pointer transition-all"
                            onClick={() => {
                              setName(nft.name);
                              setLevel(nft.level);
                              setUpdate(nft.id);
                            }}
                          />
                          <XCircleIcon
                            className="h-5 w-5 text-error hover:scale-125 cursor-pointer transition-all"
                            onClick={() =>
                              nftMutationDelete.mutate(nft.id || "", {
                                onSuccess: () => {
                                  nftsQueries.refetch();
                                },
                              })
                            }
                          />
                        </div>
                      </div>
                    );
                  })}
              </div>
            </motion.div>
          </div>
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
