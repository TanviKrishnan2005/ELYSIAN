const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  try {
    const token = req.cookies?.token;

    if (!token) {
      return res.status(401).send({ message: "No token provided" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    // attach user info to request
    req.userId = decoded.userId;
    req.role = decoded.role;

    next();
  } catch (error) {
    console.error("❌ Error while verifying token:", error.message);
    return res.status(401).send({ message: "Invalid or expired token" });
  }
};

module.exports = verifyToken;
