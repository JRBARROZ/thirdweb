// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { doc, setDoc } from "firebase/firestore";
import { colRef, db } from "../../../firebase.config";
import INfts from "./types";

interface ExtendedNextApiRequest extends NextApiRequest {
  body: INfts;
}
export default function handler(
  req: ExtendedNextApiRequest,
  res: NextApiResponse
) {
  async function handleGet() {
    return res.send({ name: "amazing!" });
  }
  async function handlePost() {
    await setDoc(doc(colRef), {
      name: req.body.name,
      image: req.body.image,
      userAddress: req.body.userAddress,
    });
  }
  async function handleDelete() {}
  const controllers: any = {
    get: handleGet(),
    post: handlePost(),
    delete: handleDelete(),
  };
  if (req.method) {
    return controllers[req.method];
  }
}
