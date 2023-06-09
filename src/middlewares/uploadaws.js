import AWS from "aws-sdk";
import { v4 as uuidv4 } from 'uuid';
import fs from "fs"


const uploadaws = async (files) => {

  const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
  });

  const paths = await files.map(async (file) => {
    const fileContent = fs.readFileSync(file.path);
    const params = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: `uploads/${uuidv4()}-${file.originalname}`,
      Body: fileContent,
      ContentDisposition:"inline",
      ContentType:"application/pdf"
    };

    let rest = await s3.upload(params).promise();
    return rest.Location;
  });
  return paths

};


export default uploadaws