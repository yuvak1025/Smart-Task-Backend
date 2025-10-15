import jwt from "jsonwebtoken";

const auth = (req, res, next) => {
  // Debug: log incoming Authorization header
  const authHeader = req.headers.authorization || req.headers.Authorization;
  console.debug("[auth middleware] Authorization header:", authHeader);

  const token = authHeader?.split(" ")[1];
  if (!token) {
    console.debug("[auth middleware] No token found after parsing header");
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.debug("[auth middleware] Token decoded, user id:", decoded.id);
    req.userId = decoded.id;
    next();
  } catch (err) {
    console.debug("[auth middleware] Token verification failed:", err && err.message);
    res.status(401).json({ message: "Invalid token" });
  }
};

export default auth;
