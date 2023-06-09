import jwt from "jsonwebtoken";

export const adminMiddleware = async (req, res, next) => {
  try {
    const token = req.header("x-auth-token");
    if (!token)
      return res.status(401).json({ msg: "No auth token, access denied" });
    const verified = jwt.verify(token, "passwordKey");
    if (!verified) {
      console.log('verified', verified)
      return res
        .status(401)
        .json({ msg: "Token verification failed, authorization denied" });
    } else {
      next();
    }
  } catch (error) {
    res
      .status(500)
      .json({ status: 500, error: true, message: "something went wrong" });
  }
};
