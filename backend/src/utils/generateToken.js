import jwt from "jsonwebtoken";

export const generateToken = (userId, res) => {
  const payload = { id: userId };
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

  res.cookie("jwt", token, {
    httpOnly: true, // protects against XSS attacks by preventing client-side JavaScript from accessing the cookie
    secure: process.env.NODE_ENV === "production", // ensures the cookie is only sent over HTTPS in production
    sameSite: "strict", // protects agianst CSRF attacks by ensuring the cookie is only sent with requests from the same site
    maxAge: 7 * 24 * 60 * 60 * 1000, // Convert days to milliseconds
  });
  return token;
};
