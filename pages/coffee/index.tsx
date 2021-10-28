import type { NextPage } from 'next';
import Head from 'next/head';
import { CursorBlink } from '../../components/CursorBlink';
import { TypingSimulation } from '../../components/TypingSimulation';

const Home: NextPage = () => {
  const command = `
curl BREW http://localhost:3000/api/htcpcp
  --header "Content-Type:application/coffee-pot-command"
  --header "Accept-Additions:Skim;1,Vanilla;1" -v
`.trimLeft();

  return (
    <div className="mx-auto max-w-[750px] p-4">
      <Head>
        <title>HTCPCP</title>
        <meta name="description" content="Configure the coffee machine" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <h1 className="text-xl mb-8">
        Hyper Text Coffee Pot Control Protocol (
        <a
          className="text-blue-800 hover:text-blue-500 underline"
          href="https://datatracker.ietf.org/doc/html/rfc2324"
        >
          RFC-2324
        </a>
        )
      </h1>

      <p>
        1998 was scary time. The internet was young and controlling coffee pots over the internet
        had just become a whole lot easer.
      </p>
      <p>
        This halloween lets dive into what requesting a coffee from your internet connected coffee
        machine might have looked like back then:
      </p>

      <pre className="bg-black text-green-400 p-4 my-8 border-gray-500 border-4 whitespace-pre-wrap">
        <TypingSimulation text={command} />
      </pre>
    </div>
  );
};

export default Home;
