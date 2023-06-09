// import multer from "multer";
// import path from "path";


// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "./public/uploads/");
//   },
//   filename: function (req, file, cb) {
//     const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);

//     const { ext } = path.parse(file.originalname);
    
//     cb(null, file.fieldname + "-" + uniqueSuffix+ext);
//   },
// });

// const upload = multer({ storage: storage });

// export default upload;


import multer from "multer";

const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  if (file.mimetype.split("/")[0] === "image") {
    cb(null, true);
  } else {
    cb(new multer.MulterError("LIMIT_UNEXPECTED_FILE"), false);
  }
};

// ["image", "jpeg"]

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 1000000000 }
});

export default upload;

