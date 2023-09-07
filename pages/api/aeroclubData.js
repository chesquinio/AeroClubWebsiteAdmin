import { mongooseConnect } from "@/lib/mongoose";
import { AeroClubData } from "@/model/AeroClubData";

export default async function handle(req, res) {
  const { method } = req;
  await mongooseConnect();

  if (method === "GET") {
    res.json(await AeroClubData.find());
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
    const aeroclubDoc = await AeroClubData.updateOne(
      { _id },
      {
        primaryTitle,
        primaryInfo,
        primaryImage,
        activeBotton: isToggleBotton,
        textBotton,
      }
    );
    res.json(aeroclubDoc);
  }
}
