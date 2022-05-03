// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { doc, getDocs, setDoc } from "firebase/firestore";
import { colRef, db, colKindRef } from "../../../firebase.config";
import INfts from "../../../models/types";

interface ExtendedNextApiRequest extends NextApiRequest {
  body: INfts;
}
export default function handler(
  req: ExtendedNextApiRequest,
  res: NextApiResponse
) {
  async function handleGet() {
    const data: any = [];
    const querySnapshot = await getDocs(colKindRef);
    querySnapshot.forEach((doc) => {
      data.push({ id: doc.id, type: doc.data().type });
    });
    return res.status(200).json(data);
  }
  async function handlePost() {
    await setDoc(doc(colRef), {
      name: req.body.name,
      level: req.body.level,
      kinds: req.body.kinds,
      userAddress: req.headers.authorization,
    });
    return res.status(200).json("Criado com sucesso!");
  }
  switch (req.method) {
    case "GET":
      return handleGet();
    case "POST":
      return handlePost();
    default:
      return res.status(404).json("Not Found");
  }
}
