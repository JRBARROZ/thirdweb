// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import {
  doc,
  setDoc,
  where,
  getDocs,
  query,
  deleteDoc,
} from "firebase/firestore";
import { colRef, db } from "../../../firebase.config";
import INfts from "../../../models/types";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "GET":
      const nftsQuery = query(colRef, where("userAddress", "==", req.query.id));
      const nfts: INfts[] = [];
      const querySnapshot = await getDocs(nftsQuery);
      querySnapshot.forEach((doc) => {
        nfts.push({ ...(doc.data() as INfts), id: doc.id });
      });
      res.json(nfts);
      break;
    case "DELETE":
      const { id } = req.query;
      try {
        await deleteDoc(doc(colRef, id.toString()));
      } catch (err) {
        console.log(err);
      }
      res.status(200).json({ msg: "Deletado com sucesso!" });
      break;
    case "PUT":
      console.log(req.query);
      res.status(200);
      break;
  }
}
