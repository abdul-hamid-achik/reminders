import { type AppType } from "next/dist/shared/lib/utils";
import { ClerkProvider } from "@clerk/nextjs";
import type { AppProps } from "next/app";
import "@/styles/globals.css";

export { reportWebVitals } from "next-axiom";

const MyApp: AppType = ({ Component, pageProps }: AppProps) => (
  <div suppressHydrationWarning>
    {typeof window === "undefined" ? null : (
      <ClerkProvider {...pageProps}>
        <Component {...pageProps} />
      </ClerkProvider>
    )}
  </div>
);

export default MyApp;
