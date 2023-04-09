import { type AppType } from "next/dist/shared/lib/utils";
import { ClerkProvider } from "@clerk/nextjs";
import type { AppProps } from "next/app";
import { env } from "@/env.mjs";
import "@/styles/globals.css";

export { reportWebVitals } from "next-axiom";

const MyApp: AppType = ({ Component, pageProps }: AppProps) => (
  <div suppressHydrationWarning>
    {typeof window === "undefined" ? null : (
      <ClerkProvider
        {...pageProps}
        publishableKey={env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY as string}
      >
        <Component {...pageProps} />
      </ClerkProvider>
    )}
  </div>
);

export default MyApp;
