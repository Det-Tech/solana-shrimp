import Head from "next/head";
import { Inter } from "@next/font/google";

import Header from "@/components/Header";
import Body from "@/components/Body";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <Head>
        <title>Shrimp</title>
        <meta name="description" content="Shrimp" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="description" content="Shrimp" />
        <meta property="og:title" content="Solana Shrimp" />
        <meta property="og:description" content={`Solana Shrimp By Mr F`} />
        <meta
          property="og:image"
          content={"https://i.seadn.io/s/raw/files/56098e58bec8f25937a35adef1557ac5.png"}
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={inter.className}>
        <div className="container">
          <Header />
          <Body />
          <Footer />
        </div>
      </main>
    </>
  );
}
