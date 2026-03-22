import jwt from "jsonwebtoken";
import { prisma } from "../config/db.js";

// read the toekn from the request
export const authMiddleware = async (req, res, next) => {
  let token;

  // Check for token in Authorization header (Bearer token) or in cookies
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  } else if (req.cookies.jwt) {
    token = req.cookies.jwt;
  }

  if (!token) {
    return res.status(401).json({ error: "Unauthorized: No token provided" });
  }

  try {
    // verify token and extract user ID

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await prisma.user.findUnique({ where: { id: decoded.id } });

    if (!user) {
      return res.status(401).json({ error: "User no longer exists" });
    }

    req.user = user; // Attach user info to the request object for downstream use
  } catch (error) {
    console.error("Authentication error:", error);
    return res.status(401).json({ error: "Unauthorized: Invalid token" });
  }

  next();
};
