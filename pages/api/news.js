import { mongooseConnect } from "@/lib/mongoose";
import { News } from "@/model/News";
import { isAdminRequest } from "./auth/[...nextauth]";

export default async function handle(req, res) {
    const {method} = req;
    await mongooseConnect()
    await isAdminRequest(req, res)

    if ( method === 'GET') {
        if(req.query?.id) {
            res.json(await News.findOne({ _id: req.query?.id }));
        } else {
            res.json(await News.find());
        }
    }

    if ( method === 'POST') {
        const {newTitle, newDescription, newImage} = req.body;
        const newsDoc = await News.create({title: newTitle, description: newDescription, images: newImage})
        res.json(newsDoc);
    }

    if (method === 'PUT') {
        const {_id, newTitle, newDescription, newImage} = req.body;
        const newsDoc = await News.updateOne({_id}, {title: newTitle, description: newDescription, images: newImage})
        res.json(newsDoc)
    }

    if (method === 'DELETE') {
        const {_id} = req.query;
        await News.deleteOne({_id})
        res.json('ok')
    }
    
}