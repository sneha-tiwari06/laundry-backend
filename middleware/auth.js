const jwt = require("jsonwebtoken");

exports.authMiddleware = (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) {
    return res.status(401).json({ message: "Access Denied. No Token Provided." });
  }

  try {
    const decoded = jwt.verify(token, "fre32#892dhey@479d"); // Use the same secret key as in login
    req.user = decoded;
    next();
  } catch (error) {
    res.status(400).json({ message: "Invalid Token." });
  }
};
