import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import CommentThread from '../components/CommentThread';

const Home: NextPage = () => {
  return (
    <div className="mx-auto w-[500px] mt-8">
      <Head>
        <title>Hanford Internet Stuff!</title>
        <meta name="description" content="Spooky scary internet themed frisbee memes" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <CommentThread id="example" />
    </div>
  );
};

export default Home;
