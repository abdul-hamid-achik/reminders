import { type NextPage } from "next";
import Head from "next/head";
import { RouterProvider } from "@tanstack/react-router";
import React, { StrictMode } from "react";
import { router } from "@/spa";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Remindly</title>
        <meta name="description" content="Remember as a Service" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <StrictMode>
        <RouterProvider router={router} />
      </StrictMode>
    </>
  );
};

export default Home;
