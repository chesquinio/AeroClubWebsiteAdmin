import { mongooseConnect } from "@/lib/mongoose";
import { TennisData } from "@/model/TennisData";

export default async function handle(req, res) {
  const { method } = req;
  await mongooseConnect();

  if (method === "GET") {
    res.json(await TennisData.find());
  }

  if (method === "PUT") {
    const {
      _id,
      primaryTitle,
      primaryInfo,
      primaryImage,
      isToggleBotton,
      textBotton,
    } = req.body;
    const tennisDoc = await TennisData.updateOne(
      { _id },
      {
        primaryTitle,
        primaryInfo,
        primaryImage,
        activeBotton: isToggleBotton,
        textBotton,
      }
    );
    res.json(tennisDoc);
  }
}
