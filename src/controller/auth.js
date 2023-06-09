import userModel from "../models/user.model.js";
// import User from "../models/user.model.js";

import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import sendMail from "../utils/sendMail.js";

export const register = async (req, res, next) => {
  try {
    const { email, password, type } = req.body;
    const existing = await userModel.findOne({
      email: email,
    });
    if (existing) {
      return res.send({
        success: false,
        status: 400,
        message: "User  email already exists!",
      });
    }

    const hashedPassword = await bcryptjs.hash(password, 8);
    let obj = {
      name: req.body.name,
      password: hashedPassword,
      type: req.body.type,
      email: req.body.email,
    };
    if (req.body.type === "admin") {
      console.log("Admin", req.body.type);
      const result = await userModel.create(obj);
      res.json(result);
    } else if (req.body.type === "user") {
      console.log("user", req.body.type);
      const result = await userModel.create(obj);
      res.json(result);
    } else if (req.body.type === "custom") {
      console.log("custom", req.body.type);
      const result = await userModel.create(obj);
      res.json(result);
    } else {
      console.log("no user found");
      res.status(500).json({ error: "Invalid type" });
      return Error;
    }
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

// Login
export const login = async (req, res, next) => {
  try {
    const { email, password, type } = req.body;
    const user = await userModel.findOne({ email: email });
    if (!user) {
      return res.status(400).json({ msg: "User email does not exists!" });
    }
    // password compare
    const isMatch = await bcryptjs.compare(password, user.password);
    if (!isMatch) {
      return res.status(404).json({ msg: "Invalid password." });
    }
    // sign jwt
    const token = jwt.sign(
      { email: user.email, type: user.type },
      "passwordKey"
    );

    // expire cookies
    const cookieExpireDate = new Date(Date.now() + 1 * 3600000); // 1 housr
    const option = { expires: cookieExpireDate, httpOnly: true, secure: true };

    if (process.env.NODE_ENV === "development") {
      option.secure = false;
    }
    const response = {
      name: user._doc.name,
      email: user._doc.email,
      type: user._doc.type,
    };
    res.cookie("token", token, option).json({ token, ...response });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

export const logout = async (req, res, next) => {
  res.clearCookie("token");
  res.status(200).json({ success: true, message: "successfully logout" });
  // req.user.deleteToken(req.token,(err,user)=>{
  //   if(err) return res.status(400).send(err);
  //   res.sendStatus(200);
};

// Reset Password

export const resetPassword = async (req, res) => {
  const { id, token, newPassword, password } = req.body;

  if (password !== newPassword) {
    return res
      .status(404)
      .json({ success: false, message: "passsword not matched" });
  }
  const oldUser = await User.findOne({ _id: id });
  if (!oldUser) {
    return res.json({ status: "User Not Exists!!" });
  }
  // const secret = process.env.JWT + oldUser.password;
  try {
    // const verify = jwt.verify(token, secret);

    const verify = jwt.verify(token, process.env.JWT, async (err, decoded) => {
      if (err) {
        return res.json({ status: "invalid token!" });
      } else {
        console.log(decoded); // bar
        return true;
      }
    });

    if (verify) {
      await oldUser.update({ password });
      await oldUser.save();
      res
        .status(201)
        .json({ success: true, message: "password reset succeffull" });
    }
  } catch (error) {
    console.log(error);
    res.status(404).send("Invalid token!");
  }
};

// Forgot Password
export const forgitPassword = async (req, res) => {
  const { email } = req.body;

  const oldUser = await User.findOne({ email });
  if (!oldUser) {
    return res.json({ status: "User Not Exists!!" });
  }
  // const secret = process.env.JWT + oldUser.password;

  // const token = jwt.sign({ id: oldUser.id }, secret, {
  //   expiresIn: "15m",
  // });

  const token = jwt.sign({ id: oldUser.id }, process.env.JWT, {
    expiresIn: "1h",
  });

  const link = `<a href="http://localhost:3000/reset-password?id=${oldUser.id}?token=${token}">click here to reset password</a>`;

  await sendMail(link, email);
  res.status(200).json({
    success: true,
    id: oldUser.id,
    token: token,
    message: "please chcek your email to reset password!",
  });
};
