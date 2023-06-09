import Profile from "../models/user.model.js";
import uploadawsSingle from "../middlewares/awsSingle.js";

export const createProfile = async (req, res, next) => {
  /// this for additional information not for sigup
  if (!req.file) {
    return res
      .status(403)
      .json({ success: false, message: "please slect image" });
  }

  req.body.profilePic = `/uploads/${req.file.filename}`;
  try {
    const savedProfile = await Profile.findOneAndUpdate(
      { id: req.user },
      { $set: req.body }
    );
    res.status(200).json(savedProfile);
  } catch (err) {
    next(err);
  }
};

// update profile
// export const updateProfile = async (req, res, next) => {
//   try {
//     const updatedProfile = await Profile.findByIdAndUpdate(
//       req.user,
//       { $set: req.body },
//       { new: true }
//     );
//     res.status(200).json(updatedProfile);
//   } catch (err) {
//     next(err);
//   }
// };
export const updateProfile = async (req, res, next) => {

  // if (req.file) {
  //   req.body.profilePic = `${process.env.FRONT_END_HOST_URL}/uploads/${req.file.filename}`;
  // }
  // try {
  //   const savedProfile = await Profile.findByIdAndUpdate(req.user, req.body,{new:true}
  //   );
  //   res.status(200).json(savedProfile);
  // } catch (err) {
  //   next(err);
  // }

  try {
    let filepaths = await uploadawsSingle (req.files, req, res)

    Promise.all(filepaths).then( async function (data) {
      if (req.files) {
        {data.length != 0 ?  req.body.profilePic = data:null}
        }
      const savedProfile = await Profile.findByIdAndUpdate(req.user, req.body,{new:true});
      res.status(200).json(savedProfile);
    }).catch(function (err) {
      res.send(err.stack);
    }) 
  } catch (err) {
    res.status(402).json({ error: err.message || err });
  }



};
