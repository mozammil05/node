import AWS from "aws-sdk";
import { v4 as uuidv4 } from 'uuid';


const uploadawsSingle = async (files) => {

  const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
  });

  const paths = await files.map(async (file) => {
    const params = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: `uploads/${uuidv4()}-${file.originalname}`,
      Body: file.buffer,
      ContentDisposition:"inline",
      ContentType:"image/png/jpg/jpeg"
    };

    let rest = await s3.upload(params).promise();
    return rest.Location;
  });
  return paths

};


export default uploadawsSingle 