import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ThirdwebProvider, ChainId } from "@thirdweb-dev/react";
import { ReactQueryDevtools } from "react-query/devtools";
import { QueryClientProvider, QueryClient } from "react-query";
import Layout from "../components/Layout/Layout";
import { useRouter } from "next/router";
import { LoginProvider } from "../contexts/LoginContext";
import { GlobalProvider } from "../contexts/GlobalContext";
const queryClient = new QueryClient();
function MyApp({ Component, pageProps }: AppProps) {
  const { pathname } = useRouter();
  return (
    <ThirdwebProvider desiredChainId={ChainId.Rinkeby}>
      <QueryClientProvider client={queryClient}>
        <LoginProvider>
          <GlobalProvider>
            {pathname !== "/login" ? (
              <Layout>
                <Component {...pageProps} />
              </Layout>
            ) : (
              <Component {...pageProps} />
            )}
          </GlobalProvider>
        </LoginProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </ThirdwebProvider>
  );
}

export default MyApp;
