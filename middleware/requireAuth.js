// protect private routes  [Dashboard]

const jwt = require('jsonwebtoken');

const requireAuth = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized: No token found' });
  }

  try {
    const decoded = jwt.verify(token, process.env.TOKEN_KEY);
    req.userId = decoded.id;
    next(); // proceed to the next middleware or controller
  } catch (err) {
    return res.status(401).json({ message: 'Unauthorized: Invalid token' });
  }
};

module.exports = requireAuth;
