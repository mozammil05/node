import userModel from "../models/user.model.js";

export const updatedUser = async (req, res) => {
  console.log(req.params);
  try {
    const updatedUser = await userModel.findOneAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );

    res.status(200).json(updatedUser);
  } catch (err) {
    next(err);
  }
};

// ---------------
// export const deletedUser = async (req, res) => {
//   try {
//     const user = await userModel.findOne({ email: req.body.email });
//     if (user) {
//       // (user && user.type === "admin")
//       await userModel.deleteOne({ email: req.body.email }); //delete the user
//       res.send({ success: true, status: 200, message: "User deleted" });
//     } else {
//       res.send({ success: false, status: 400, message: "Bad request" });
//     }
//   } catch (err) {
//     res.send({
//       success: false,
//       status: 500,
//       message: "Internal Server Error",
//       error: err,
//     });
//   }
// };
export const deletedUser = async (req, res) => {
  try {
    const user = await userModel.findOne({ email: req.body.email });

    if (user) {
      if (user.type === "admin") {
        return res.status(403).json({
          success: false,
          status: 403,
          message: "Cannot delete admin accounts",
        });
      }

      await userModel.deleteOne({ email: req.body.email }); // Delete the user account
      res.send({ success: true, status: 200, message: "User account deleted" });
    } else {
      res.send({ success: false, status: 400, message: "Bad request" });
    }
  } catch (err) {
    res.send({
      success: false,
      status: 500,
      message: "Internal Server Error",
      error: err,
    });
  }
};
