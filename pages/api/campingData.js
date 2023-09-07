import { mongooseConnect } from "@/lib/mongoose";
import { CampingData } from "@/model/CampingData";

export default async function handle(req, res) {
  const { method } = req;
  await mongooseConnect();

  if (method === "GET") {
    res.json(await CampingData.find());
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
    const campingDoc = await CampingData.updateOne(
      { _id },
      {
        primaryTitle,
        primaryInfo,
        primaryImage,
        activeBotton: isToggleBotton,
        textBotton,
      }
    );
    res.json(campingDoc);
  }
}
