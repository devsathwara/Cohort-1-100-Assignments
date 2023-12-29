// Middleware for handling auth
const jwt=require('jsonwebtoken');
const config = require('../config/jwt');
function adminMiddleware(req, res, next) {
   const token=req.header('Authorization');
   if (!token) {
    return res.status(401).json({ auth: false, message: 'No token provided.' });
  }
  try {
    const decoded = jwt.verify(token, config.secret);
    // req.user = decoded;
    next();
  } catch (ex) {
    console.error(ex);

    if (ex.name === 'TokenExpiredError') {
      return res.status(401).json({ auth: false, message: 'Token expired.' });
    }

    res.status(500).json({ success: false, message: 'Authentication failed' });
  }
}

module.exports = adminMiddleware;