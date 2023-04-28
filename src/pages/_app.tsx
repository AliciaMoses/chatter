import { type AppType } from "next/app";
import { ClerkProvider } from "@clerk/nextjs";

import { api } from "~/utils/api";

import "~/styles/globals.css";

const ChatterApp: AppType = ({ Component, pageProps }) => {
  return  (
  <ClerkProvider {...pageProps}>
    <Component {...pageProps} />
  </ClerkProvider>
  );
};

export default api.withTRPC(ChatterApp);
