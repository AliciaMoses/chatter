
import type { NextPage } from "next";
import Head from "next/head";
import LandingPage from "~/components/landingPage/LandingPage";
import Navbar from "~/components/navbar/Navbar";


const Home: NextPage = () => {

  return (
    <>
      <Head>
        <title>Chatter</title>
        <meta name="description" content="Welcome to the Chattersphere!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <LandingPage />
    </>
  );
};

export default Home;
