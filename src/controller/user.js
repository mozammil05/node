import User from "../models/user.model.js";

export const updatedUser = async (req, res, next) => {
  console.log(req.params);
  try {
    const updatedUser = await User.findOneAndUpdate(req.params.id, req.body, {
      new: true,
    });

    res.status(200).json(updatedUser);
  } catch (err) {
    next(err);
  }
};


export const deletedUser = async (req, res, next) => {
  try {
    await User.findByIdAndDelete(req.params.email);
    res.status(200).json("User has been deleted!.");
  } catch (err) {
    next(err);
  }
};


