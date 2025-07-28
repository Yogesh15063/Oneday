import jwt from "jsonwebtoken";

// Middleware to check if token is valid
export const authenticateUser = (req, res, next) => {
  try {
    // Get the token from the "Authorization" header
    const authHeader = req.headers.authorization;

    // If no token is provided
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ error: "Unauthorized. No token provided." });
    }

    // Extract token from "Bearer <token>"
    const token = authHeader.split(" ")[1];

    // Verify token using JWT_SECRET
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach the decoded user info to request object so other routes can use it
    req.user = decoded;

    // Continue to the next middleware or route handler
    next();
  } catch (err) {
    // If token is invalid or expired
    console.error("JWT verification failed:", err);
    res.status(401).json({ error: "Invalid or expired token" });
  }
};
