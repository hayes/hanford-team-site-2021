import { NextApiHandler } from "next/types";

export default (async (req, res) => {
  console.log(req.method, req.headers);

  res.status(418);
  res.send("I'm a teapot");
}) as NextApiHandler;
