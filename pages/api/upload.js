import multiparty from "multiparty";
import {
  DeleteObjectCommand,
  PutObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";
import fs from "fs";
import mime from "mime-types";
import { mongooseConnect } from "@/lib/mongoose";

const bucketName = "aeroclub-website";

export default async function handle(req, res) {
  await mongooseConnect();

  let oldImageLink;
  if (req.query["oldImageLink[]"] !== undefined) {
    oldImageLink = req.query["oldImageLink[]"];
  } else {
    oldImageLink = req.query.oldImageLink;
  }

  const form = new multiparty.Form();
  const { fields, files } = await new Promise((resolve, reject) => {
    form.parse(req, (err, fields, files) => {
      if (err) reject(err);
      resolve({ fields, files });
    });
  });

  const client = new S3Client({
    region: "sa-east-1",
    credentials: {
      accessKeyId: process.env.S3_ACCESS_KEY,
      secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
    },
  });

  if (oldImageLink) {
    const oldFilename = oldImageLink.split("/").pop();
    await client.send(
      new DeleteObjectCommand({
        Bucket: bucketName,
        Key: oldFilename,
      })
    );
  }

  const links = [];
  for (const file of files.file) {
    const ext = file.originalFilename.split(".").pop();
    const newFilename = Date.now() + "." + ext;
    await client.send(
      new PutObjectCommand({
        Bucket: bucketName,
        Key: newFilename,
        Body: fs.readFileSync(file.path),
        ACL: "public-read",
        ContentType: mime.lookup(file.path),
      })
    );
    const link = `https://${bucketName}.s3.amazonaws.com/${newFilename}`;
    links.push(link);
  }

  return res.json({ links });
}

export const config = {
  api: { bodyParser: false },
};
