/* eslint-disable react/no-unescaped-entities */
import type { NextPage } from 'next';
import Link from 'next/link';
import Head from 'next/head';
import Image from 'next/image';
import CommentThread from '../components/CommentThread';
import kermit from '../public/kermit.png';
import aol from '../public/aol.png';
import saladFingers from '../public/salad-fingers.png';
import teapot from '../public/teapot.jpg';
import gore from '../public/gore.jpg';
import doge from '../public/doge.jpg';
import reddit from '../public/reddit.jpg';
import fry from '../public/fry.jpg';
import homestar from '../public/homestar.webp';
import honeyBadger from '../public/honey-badger.png';
import hotSingle from '../public/hot-single.gif';
import iceBucket from '../public/ice-bucket.webp';
import myImmortal from '../public/my-immortal.jpg';
import onlyFans from '../public/only-fans.webp';
import sign from '../public/sign.jpg';
import wizardHat from '../public/wizard-hat.jpg';
import jeevs from '../public/jeevs.webp';

import { Header } from '../components/Header';

const Home: NextPage = () => (
  <div className="mx-auto max-w-[700px] p-4">
    <Head>
      <title>The ARPANET</title>
      <meta name="description" content="Spooky scary internet themed frisbee memes" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <Header page="home" />
    <h1 className="text-2xl my-4">The ARPANET at Hanford Howl 2021</h1>
    <p>
      Consider this a brief guide to the history of the internet. May it help you along your journey
      to a deeper understanding of the world we grew up in and our costume choices for this weekend.
    </p>
    <h2 className="mt-16 mb-4 text-2xl">Kermit memes</h2>
    <div className="max-w-[450px] m-auto">
      <Image alt="Kermit memes" src={kermit} layout="responsive" />
    </div>
    <p className="my-8 text-md">
      Kermit the frog is famous for many things. These days, many of them are memes! There's the
      famous "none of my business meme" pictured here. There's dark kermit, scooter kermit, kermit
      in the mirror, and the list goes on. For additional kermit resources peep{' '}
      <a
        className="text-blue-800 hover:text-blue-400"
        href="https://screenrant.com/muppets-funniest-kermit-the-frog-memes/"
      >
        this link
      </a>{' '}
      How many of the kermit memes do you remember? How many can you spot this weekend at Hanford?
    </p>
    <h2 className="mt-16 mb-4 text-2xl">Series of tubes</h2>
    <div className="video-container w-full">
      <iframe
        src="https://www.youtube.com/embed/R8XSo0etBC4"
        frameBorder="0"
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>
    <p className="my-8 text-md">
      As we all know, the internet is made up of a series of tubes. This is obvious. We've invited
      some of those tubes to play with us this weekend. They've graciously cleared their schedule
      for a few games and will be sending information where it needs to go.. through the tubes of
      course.
    </p>
    <h2 className="mt-16 mb-4 text-2xl">Kid with a knife</h2>
    <div className="video-container w-full">
      <iframe
        src="https://www.youtube.com/embed/B7D2Oq7LDkc"
        frameBorder="0"
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>
    <p className="my-8 text-md">
      Vine was the pinacle of entertainment. Current famous forms of video sharing are just
      copycats. Here is one of the foremost examples of why the medium excelled. What does the kid
      have? One of our players will also be running around with a knife this weekend. Please know
      that it is fake. No one will be harmed in the recreating of this vine.
    </p>
    <h2 className="mt-16 mb-4 text-2xl">My immortal</h2>
    <Image alt="myImmortal" src={myImmortal} layout="responsive" />
    <p className="my-8 text-md">
      You remember this right? You'll know them when you see them, and I'm definitely saying this
      because it's true and not because no one gave me anything better to put here.
    </p>
    <h2 className="mt-16 mb-4 text-2xl">Sexy cow hair</h2>
    <video
      className="margin-auto"
      loop
      autoPlay
      preload="auto"
      playsInline
      width="833"
      height="833"
    >
      <source src="https://c.tenor.com/yLQAusw4bcEAAAPo/sexy-cow-hair.mp4" type="video/mp4" />
      <source src="https://c.tenor.com/yLQAusw4bcEAAAPs/sexy-cow-hair.webm" type="video/webm" />
    </video>
    <p className="my-8 text-md">
      There are normal cows, and then there are sexy cows. This is one of the latter. You'll know
      her when you see her.
    </p>
    <h2 className="mt-16 mb-4 text-2xl">Aol running guy</h2>
    <div className="max-w-[450px] m-auto">
      <Image alt="Aol running guy" src={aol} layout="responsive" />
    </div>
    <p className="my-8 text-md">
      If you're too young to remember who this person is, then you might not understand one of our
      minigames. If you are old enough to remember who this is, then you'll recall seeing them on
      countless free CDs. COUNTLESS! In fact, the company is reported to have spent more than $300
      million on CDs alone. So much money that during one point in time, the AOL logo was on 50% of
      CDs. Now that's a lot of CDs! A special gift will be given to any player who can bring us a CD
      with the AOL logo printed on it!
    </p>
    <h2 className="mt-16 mb-4 text-2xl">Jeeves</h2>
    <Image alt="jeevs" src={jeevs} layout="responsive" />
    <p className="my-8 text-md">
      You remember this right? You'll know them when you see them, and I'm definitely saying this
      because it's true and not because no one gave me anything better to put here.
    </p>
    <h2 className="mt-16 mb-4 text-2xl">Salad fingers</h2>
    <Image alt="Salad fingers memes" src={saladFingers} layout="responsive" />
    <p className="my-8 text-md">
      Hello. This is salad fingers. They like rusty spoons. They like to touch them. This phenomenal
      content from 2004 was named by the San Francisco Chronicle as one of the "Top 10" pop culteral
      phenomena the following year. To view all of salad fingers' delightfully spooky videos and
      introduce yourself to Hubert Cumberdale, Marjory Stewart-Baxter, and Jeremy Fisher follow{' '}
      <a
        className="text-blue-800 hover:text-blue-400"
        href="https://www.youtube.com/watch?v=tP6w22ToHgc"
      >
        this link
      </a>{' '}
    </p>
    <h2 className="mt-16 mb-4 text-2xl">Dude with a sign</h2>
    <Image alt="sign" src={sign} layout="responsive" />
    <p className="my-8 text-md">
      You remember this right? You'll know them when you see them, and I'm definitely saying this
      because it's true and not because no one gave me anything better to put here.
    </p>
    <h2 className="mt-16 mb-4 text-2xl">Hot single in your area</h2>
    <Image alt="hotSingle" src={hotSingle} layout="responsive" />
    <p className="my-8 text-md">
      You remember this right? You'll know them when you see them, and I'm definitely saying this
      because it's true and not because no one gave me anything better to put here.
    </p>
    <h2 className="mt-16 mb-4 text-2xl">OnlyFans girl</h2>
    <Image alt="onlyFans" src={onlyFans} layout="responsive" />
    <p className="my-8 text-md">
      You remember this right? You'll know them when you see them, and I'm definitely saying this
      because it's true and not because no one gave me anything better to put here.
    </p>
    <h2 className="mt-16 mb-4 text-2xl">Honey badger</h2>
    <Image alt="honeyBadger" src={honeyBadger} layout="responsive" />
    <p className="my-8 text-md">
      You remember this right? You'll know them when you see them, and I'm definitely saying this
      because it's true and not because no one gave me anything better to put here.
    </p>
    <h2 className="mt-16 mb-4 text-2xl">RFC 2324</h2>
    <Image alt="RFC 2324" src={teapot} layout="responsive" />
    <p className="my-8 text-md">
      In order to understand this reference, you must already be the type of nerd that is beyond my
      capabilities. It's colloquially known as the Hyper Text Coffee Pot Control Protocol. You and I
      will both require the help of a special type of nerd to help us understand this programming
      joke. Have no fear; ultimate frisbee is full of this type of intelligent and cool person who
      is willing to share about RFC 2324. If you can't find one on your team, our team has plenty.
    </p>
    <h2 className="mt-16 mb-4 text-2xl">AL Gore</h2>
    <Image alt="Al gore" src={gore} layout="responsive" />
    <p className="my-8 text-md">
      Don't pay any attention to{' '}
      <a
        className="text-blue-800 hover:text-blue-400"
        href="https://www.vox.com/2014/6/16/18076282/the-internet"
      >
        this Vox article
      </a>{' '}
      where they claim that Al Gore merely supported the importance of what the internet could be.
      He is the patron saint of this team and all other comments will be conside blasphemy! Long
      live Al Gore! Long live the internet!{' '}
    </p>
    <h2 className="mt-16 mb-4 text-2xl">I put on my robe and wizard hat.</h2>
    <Image alt="wizardHat" src={wizardHat} layout="responsive" />;
    <p className="my-8 text-md">
      You remember this right? You'll know them when you see them, and I'm definitely saying this
      because it's true and not because no one gave me anything better to put here.
    </p>
    <h2 className="mt-16 mb-4 text-2xl">Doge</h2>
    <div className="max-w-[300px] m-auto">
      <Image alt="Doge" src={doge} layout="responsive" />
    </div>
    <p className="my-8 text-md">
      Doge. Good doge. Very bark. Such fluff. Nuff said. This popular meme sponsored an entire style
      of speaking some theorize is the future of American English. It's already taking over the
      crypto world. What can't this akita do?{' '}
    </p>
    <h2 className="mt-16 mb-4 text-2xl">Snoo</h2>
    <Image alt="Reddit" src={reddit} layout="responsive" />
    <p className="my-8 text-md">
      You remember this right? You'll know them when you see them, and I'm definitely saying this
      because it's true and not because no one gave me anything better to put here.
    </p>
    <h2 className="mt-16 mb-4 text-2xl">Ice bucket challenge</h2>
    <Image alt="iceBucket" src={iceBucket} layout="responsive" />
    <p className="my-8 text-md">
      The ice bucket challenge was a viral fundraiser for research into ALS, and sometimes other
      causes. Typically those involved would dump a bucket of ice over their head, and then nominate
      another person to do the same and donate to the cause. Since it's winter in the Pacific
      Northwest, and hypothermia is a thing, I have altered the challenge. My 'costume' is a bit of
      a two-fer- in the early 2000's, what can best be attributed to a a successful guerilla
      marketing campaign by Smirnoff, dumb kids such as myself would "ice" one another by hiding a
      Smirnoff ice and chanting "Ice!" Until the beverage was consumed. I have also chosen to
      incorporate a fundraiser with my costume, so for every ultimate player who completes my
      challenge this weekend, I'll be donating $2 to Causa, an Oregon immigrant's rights
      organization.
    </p>
    <h2 className="mt-16 mb-4 text-2xl">Homestarrunner</h2>
    <Image alt="homestar" src={homestar} layout="responsive" />
    <p className="my-8 text-md">
      You remember this right? You'll know them when you see them, and I'm definitely saying this
      because it's true and not because no one gave me anything better to put here.
    </p>
    <h2 className="mt-16 mb-4 text-2xl">Fry</h2>
    <Image alt="fry" src={fry} layout="responsive" />
    <p className="my-8 text-md">
      You remember this right? You'll know them when you see them, and I'm definitely saying this
      because it's true and not because no one gave me anything better to put here.
    </p>
    <h2 className="mt-16 mb-4 text-2xl">MAILER-DAEMON</h2>
    <div className="email w-full break-words">
      <p className="c2">
        <span className="c5">From: </span>
        <span className="c4">
          <a className="c3" href="mailto:MAILER-DAEMON@hanford69.net">
            MAILER-DAEMON@hanford69.net
          </a>
        </span>
      </p>
      <p className="c2">
        <span className="c5">To: </span>
        <span className="c4">
          <a
            className="c3"
            href="https://www.google.com/url?q=http://google.com&sa=D&source=editors&ust=1635540849005000&usg=AOvVaw1voX93ikXmV03t7a2pz5zX"
          >
            FrisbeeNerd@yoohoo.milk
          </a>
        </span>
        <span className="c1">&nbsp;</span>
      </p>
      <p className="c2">
        <span className="c1">Date: October 30, 2021</span>
      </p>
      <p className="c2">
        <span className="c1">
          Time: 6:66am &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
          &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
          &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
          &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
          &nbsp; &nbsp; &nbsp; &nbsp;{' '}
        </span>
      </p>
      <p className="c2">
        <span className="c1">___________________________________________________________</span>
      </p>
      <p className="c0">
        <span className="c1" />
      </p>
      <p className="c2">
        <span className="c1">Delivery to the following recipient failed permanently:</span>
      </p>
      <p className="c0">
        <span className="c1" />
      </p>
      <p className="c2">
        <span className="c5">&nbsp; &nbsp; &nbsp; &nbsp;</span>
        <span className="c4">
          <a className="c3" href="mailto:booking@richlandredlion.com">
            reservations@richlandredlion.com
          </a>
        </span>
      </p>
      <p className="c0">
        <span className="c1" />
      </p>
      <p className="c2">
        <span className="c1">Technical details of permanent failure:</span>
      </p>
      <p className="c2">
        <span className="c1">
          hanford69.net tried to deliver your message but it was rejected by the server at
          RichlandRedLion.com due to server &nbsp;expiry.{' '}
        </span>
      </p>
      <p className="c0">
        <span className="c1" />
      </p>
      <p className="c2">
        <span className="c1">The server “RichlandRedLion.com” does not exist. </span>
      </p>
      <p className="c0">
        <span className="c1" />
      </p>
      <p className="c2">
        <span className="c1">
          Error Code: 420hUcKiTiMpOaChEdDeEp#;’$&amp;696969’shotgun4pull1312&lt;?161
        </span>
      </p>
      <p className="c0">
        <span className="c1" />
      </p>
      <p className="c0">
        <span className="c1" />
      </p>
      <p className="c0">
        <span className="c1" />
      </p>
      <p className="c2">
        <span className="c1">&lt;Original Message&gt;</span>
      </p>
      <p className="c2">
        <span className="c5">From: </span>
        <span className="c4">
          <a
            className="c3"
            href="https://www.google.com/url?q=http://google.com&sa=D&source=editors&ust=1635540849008000&usg=AOvVaw2ufzHE2bfYAD9sD_FIZLCi"
          >
            FrisbeeNerd@yoohoo.milk
          </a>
        </span>
      </p>
      <p className="c2">
        <span className="c5">To: </span>
        <span className="c4">
          <a className="c3" href="mailto:booking@richlandredlion.com">
            reservations@richlandredlion.com
          </a>
        </span>
      </p>
      <p className="c2">
        <span className="c1">Date: October 28, 2021</span>
      </p>
      <p className="c2">
        <span className="c1">Time: 4:21am</span>
      </p>
      <p className="c0">
        <span className="c1" />
      </p>
      <p className="c0">
        <span className="c1" />
      </p>
      <p className="c2">
        <span className="c1">Hi Red Lion,</span>
      </p>
      <p className="c0">
        <span className="c1" />
      </p>
      <p className="c2">
        <span className="c1">
          We missed you so much and we’re so happy to get the chance to come back to Hanford Howl.
          Everything is back to normal and there’s no more disease, right? Anyway, I’m glad that you
          were able to make it through the pandemic and stay open with absolutely no changes to your
          business, including name or ownership.{' '}
        </span>
      </p>
      <p className="c0">
        <span className="c1" />
      </p>
      <p className="c2">
        <span className="c1">
          Now to business. Although Jerry assured us he had booking the rooms for the tournament
          completely under control, well, you know Jerry. He dropped the ball. I know it’s last
          minute, but by any chance are there any cancelations or open rooms? We need somewhere to
          fit 31 “adults” who have shirked all societal responsibility for way too much of our
          lives. Please work some of that ~Red Lion Magic~ for us.{' '}
        </span>
      </p>
      <p className="c0">
        <span className="c1" />
      </p>
      <p className="c2">
        <span className="c1">
          Thank you so much and we’ll see you very soon! Especially that old guy who pushes everyone
          into their rooms at 2am!
        </span>
      </p>
      <p className="c0">
        <span className="c1" />
      </p>
      <p className="c2">
        <span className="c1">Always yours,</span>
      </p>
      <p className="c2">
        <span className="c1">Frisbee Nerd</span>
      </p>
      <p className="c0">
        <span className="c1" />
      </p>
      <p className="c2">
        <span className="c1">PS- sorry about the glitter</span>
      </p>
      <p className="c0">
        <span className="c1" />
      </p>
    </div>
    <div className="mt-16">
      <CommentThread id="example" />
    </div>
  </div>
);

export default Home;
