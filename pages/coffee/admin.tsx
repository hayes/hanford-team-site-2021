import type { NextPage } from 'next';
import Head from 'next/head';
import { CoffeeAdmin } from '../../components/CoffeeAdmin';

const Home: NextPage = () => {
  return (
    <div className="mx-auto w-[750px] mt-8">
      <Head>
        <title>Coffee admin control</title>
        <meta name="description" content="Configure the coffee machine" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <CoffeeAdmin />
    </div>
  );
};

export default Home;
