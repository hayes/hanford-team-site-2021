import type { NextPage } from 'next';
import Head from 'next/head';
import { CoffeeOrderForm } from '../../components/CoffeeOrderForm';
import { CursorBlink } from '../../components/CursorBlink';
import { DrinkOrderQueue } from '../../components/DrinkOrderQueue';
import { Header } from '../../components/Header';
import { TypingSimulation } from '../../components/TypingSimulation';
import { ViewCount } from '../../components/ViewCount';

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

      <Header page="coffee" />

      <h1 className="text-2xl mb-8">
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

      <CoffeeOrderForm />
      <DrinkOrderQueue />
    </div>
  );
};

export default Home;
