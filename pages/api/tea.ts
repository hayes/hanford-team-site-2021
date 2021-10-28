import { NextApiHandler } from 'next/types';

export default (async (req, res) => {
  res.status(418);
  res.send("I'm a Teapot");
}) as NextApiHandler;
