import { type NextPage } from "next";
import Head from "next/head";
import { RouterProvider } from "@tanstack/react-router";
import React, { StrictMode, useLayoutEffect, useRef } from "react";
import ReactDOM from "react-dom/client";

const Home: NextPage = () => {
  const ref = useRef(null);

  useLayoutEffect(() => {
    if (!ref.current) return;

    const root = ReactDOM.createRoot(ref.current);

    void import("@/spa/index").then(({ router }) => {
      root.render(
        <StrictMode>
          <RouterProvider router={router} />
        </StrictMode>
      );
    });

    return () => {
      root.unmount();
    };
  }, []);

  return (
    <>
      <Head>
        <title>Remindly</title>
        <meta name="description" content="Remember as a Service" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div id="app" ref={ref} />
    </>
  );
};

export default Home;
