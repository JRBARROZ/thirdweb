import { HeartIcon } from "@heroicons/react/solid";
import { useDisconnect } from "@thirdweb-dev/react";
import { useRouter } from "next/router";
import React from "react";
import { LoginContext } from "../../contexts/LoginContext";
function Intro() {
  const { address, setAddress } = React.useContext(LoginContext);
  const disconnect = useDisconnect();
  const router = useRouter();
  React.useEffect(() => {
    if (!address) {
      router.push("/login");
    }
  }, []);
  return (
    <div className="w-full text-center justify-center item-center bg-gradient-to-r from-pink-800  to-red-500 text-white p-8">
      <button
        className="mb-6 bg-black bg-opacity-20 rounded-md py-1 px-4 transition-all hover:bg-opacity-40"
        onClick={() => {
          disconnect();
          setAddress("");
          router.push("/login");
        }}
      >
        Logout
      </button>
      <h1 className="text-xl mb-6">
        Welcome,{" "}
        <span className="bg-black bg-opacity-20 rounded-md py-2 px-4 ">
          {address.slice(0, 6) + "..." + address.slice(-6)}
        </span>
      </h1>
      <div className=" flex gap-2 items-center flex-wrap text-center justify-center text-whiteƒ">
        <p className=" opacity-70">
          Hey Trainer, this entire app is built with NextJs, Tailwindcss,
          ReactQuery , React Hook Form and Framer Motion by Jrbarroz
        </p>
        <HeartIcon className="w-4 opacity-50" />
      </div>
    </div>
  );
}

export default Intro;
