/* eslint-disable react/no-unescaped-entities */
import type { NextPage } from 'next';
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

import { Header } from '../components/Header';

const Email: NextPage = () => (
  <div className="mx-auto max-w-[700px] p-4">
    <Head>
      <title>The ARPANET</title>
      <meta name="description" content="Spooky scary internet themed frisbee memes" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <Header page="email" />

    <div>
      <meta content="text/html; charset=UTF-8" httpEquiv="content-type" />
      <style
        type="text/css"
        dangerouslySetInnerHTML={{
          __html:
            'ol{margin:0;padding:0}table td,table th{padding:0}.c0{padding-top:0pt;padding-bottom:0pt;line-height:1.15;orphans:2;widows:2;text-align:left;height:11pt}.c1{color:#000000;font-weight:400;text-decoration:none;vertical-align:baseline;font-size:11pt;font-family:"Courier New";font-style:normal}.c2{padding-top:0pt;padding-bottom:0pt;line-height:1.15;orphans:2;widows:2;text-align:left}.c4{-webkit-text-decoration-skip:none;color:#1155cc;font-weight:400;text-decoration:underline;text-decoration-skip-ink:none;font-family:"Courier New"}.c6{background-color:#ffffff;max-width:468pt;padding:72pt 72pt 72pt 72pt}.c5{font-weight:400;font-family:"Courier New"}.c3{color:inherit;text-decoration:inherit}.title{padding-top:0pt;color:#000000;font-size:26pt;padding-bottom:3pt;font-family:"Arial";line-height:1.15;page-break-after:avoid;orphans:2;widows:2;text-align:left}.subtitle{padding-top:0pt;color:#666666;font-size:15pt;padding-bottom:16pt;font-family:"Arial";line-height:1.15;page-break-after:avoid;orphans:2;widows:2;text-align:left}li{color:#000000;font-size:11pt;font-family:"Arial"}p{margin:0;color:#000000;font-size:11pt;font-family:"Arial"}h1{padding-top:20pt;color:#000000;font-size:20pt;padding-bottom:6pt;font-family:"Arial";line-height:1.15;page-break-after:avoid;orphans:2;widows:2;text-align:left}h2{padding-top:18pt;color:#000000;font-size:16pt;padding-bottom:6pt;font-family:"Arial";line-height:1.15;page-break-after:avoid;orphans:2;widows:2;text-align:left}h3{padding-top:16pt;color:#434343;font-size:14pt;padding-bottom:4pt;font-family:"Arial";line-height:1.15;page-break-after:avoid;orphans:2;widows:2;text-align:left}h4{padding-top:14pt;color:#666666;font-size:12pt;padding-bottom:4pt;font-family:"Arial";line-height:1.15;page-break-after:avoid;orphans:2;widows:2;text-align:left}h5{padding-top:12pt;color:#666666;font-size:11pt;padding-bottom:4pt;font-family:"Arial";line-height:1.15;page-break-after:avoid;orphans:2;widows:2;text-align:left}h6{padding-top:12pt;color:#666666;font-size:11pt;padding-bottom:4pt;font-family:"Arial";line-height:1.15;page-break-after:avoid;font-style:italic;orphans:2;widows:2;text-align:left}',
        }}
      />
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
  </div>
);

export default Email;
