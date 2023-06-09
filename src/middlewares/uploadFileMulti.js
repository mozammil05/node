import multer from "multer";
import path from "path";
import { v1 as uuidv1 } from 'uuid';

const storage = multer.diskStorage({
  // destination: function (req, file, cb) {
  //   cb(null, "./public/uploads/");

  // },
  filename: function (req, file, cb) {
    
    // const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    // const { ext } = path.parse(file.originalname);
    // cb(null, "files" + "-" + uniqueSuffix + ext);

    const { originalname } = file;
    cb(null, `${uuidv1()}-${originalname}`);
  },
});

const upload = multer({ storage: storage });

export default upload;

