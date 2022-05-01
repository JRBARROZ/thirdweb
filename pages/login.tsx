import { NextPage } from "next";
import React from "react";
import { CubeTransparentIcon } from "@heroicons/react/solid";
import { useAddress, useMetamask } from "@thirdweb-dev/react";
import { LoginContext } from "../contexts/LoginContext";
import { useRouter } from "next/router";

const Login: NextPage<any> = ({}) => {
  const [loading, setLoading] = React.useState<boolean>(false);
  const { setAddress } = React.useContext(LoginContext);
  const connectWithMetamask = useMetamask();
  const address = useAddress();
  const router = useRouter();
  React.useEffect(() => {
    if (address) {
      setAddress(address);
      setTimeout(() => {
        router.push("/");
      }, 2000);
    }
  }, [address]);
  return (
    <>
      <div className="text-white w-screen h-screen flex justify-center items-center relative ">
        <div className="">
          <div className="flex gap-2 items-center flex-col justify-center">
            <CubeTransparentIcon className="w-12 h-12" />
            <h1 className=" text-2xl font-bold text-red-500">PoCrypt</h1>
            <p className=" max-w-md text-center ">
              An amazing Pokemon Crypto App
            </p>
            <p className=" max-w-xl text-center ">
              Welcome to PoCrypt, Sign in with your{" "}
              <span className="text-red-500 font-bold">MetaMask Wallet</span> to Get
              Started
            </p>
            <button
              className={`mt-4 py-4 px-8 rounded-md transition-all ${
                loading && "bg-yellow-300"
              } bg-white bg-opacity-5 hover:bg-red-300 hover:bg-opacity-10 flex gap-4 items-center justify-center max-w-xs w-full ${
                !loading && address && "bg-green-500 hover:bg-green-600"
              }`}
              onClick={() => {
                if (!address) {
                  setLoading(true);
                  connectWithMetamask()
                    .then((data: any) => {
                      setAddress(data.data.account);
                    })
                    .catch((err) => {
                      setLoading(false);
                    })
                    .finally(() => {
                      setLoading(false);
                    });
                }
              }}
            >
              {!loading && address && "Baam, You're in! Redirecting.."}
              {!loading && !address && (
                <>
                  Sign in With Matamask
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/3/36/MetaMask_Fox.svg"
                    width={30}
                  ></img>
                </>
              )}
              {loading && <div>Waiting Confirmation</div>}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
export default Login;
