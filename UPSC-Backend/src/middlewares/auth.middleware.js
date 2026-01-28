const jwt = require("jsonwebtoken");

const generateToken = (id, role) => {
  return jwt.sign({ userId: id, usertype: role }, process.env.JWT_SECRET, {
    expiresIn: "24h",
  });
};

const auth = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer")) {
    return res
      .status(401)
      .send({ message: "Invalid credentials, no token provided" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { id: payload.userId, usertype: payload.usertype };
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(401).send({ message: "Token has expired" });
    }
    return res
      .status(401)
      .send({ message: "Not authorized to access this route" });
  }
};

const verifyTokenAndSuperAdmin = (req, res, next) => {
  auth(req, res, (authError) => {
    if (authError) return next(authError);

    if (req.user.usertype === "super_admin") {
      next();
    } else {
      return res
        .status(403)
        .send({ message: "You are not allowed to do that" });
    }
  });
};

const verifyTokenAndAdmin = (req, res, next) => {
  auth(req, res, (authError) => {
    if (authError) return next(authError);

    if (req.user.usertype === "admin" || req.user.usertype === "super_admin") {
      next();
    } else {
      return res
        .status(403)
        .send({ message: "You are not allowed to do that" });
    }
  });
};

// Optional auth - doesn't fail if no token, just sets req.user if token exists
const optionalAuth = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer")) {
    req.user = null;
    return next();
  }

  const token = authHeader.split(" ")[1];

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { id: payload.userId, usertype: payload.usertype };
    next();
  } catch (error) {
    req.user = null;
    next();
  }
};

module.exports = {
  auth,
  optionalAuth,
  verifyTokenAndSuperAdmin,
  verifyTokenAndAdmin,
  generateToken,
};
