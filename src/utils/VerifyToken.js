import  jwt  from "jsonwebtoken";

import { createError } from "./error.js";


// This verifies that is the token correct i.e. weather person is admin or not
export const verifyToken = (req) => {
  const token = req.cookies.access_token;
  if (!token) {
    return { status: 401, message: "You are not authenticated!" };
  }

  try {
    const user = jwt.verify(token, process.env.JWT);
    return { status: 200, user };
  } catch (e) {
    return { status: 403, message: "Token is not valid!" };
  }
};

// To verify the user
export const verifyUser = (req, res, next) => {
  // If the user have the token i.e. user needs to be authenticated.
  const tokenStatus = verifyToken(req);
  if (tokenStatus.status !== 200)
    return next(createError(tokenStatus.status, tokenStatus.message));
  if (tokenStatus.user.id === req.params.id || req.user.isAdmin) return next();
  return next(createError(403, "You are not authorized!"));
};

export const verifyAdmin = (req, res, next) => {
  const tokenStatus = verifyToken(req);
  if (tokenStatus.status !== 200)
    return next(createError(tokenStatus.status, tokenStatus.message));
  if (!tokenStatus.user.isAdmin) return next();
  return next(createError(403, "You are not authorized!"));
};
