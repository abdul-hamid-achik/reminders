import { type AppType } from "next/dist/shared/lib/utils";

import "@/styles/globals.css";

const MyApp: AppType = ({ Component, pageProps }) => {
  return <div suppressHydrationWarning>
    {typeof window === 'undefined' ? null : <Component {...pageProps} />}
  </div>
};

export default MyApp;
