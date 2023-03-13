const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const cookieParser = require('cookie-parser');

const jwtSecret = 'your_jwt_secret'; // Change this!
const jwtExpiry = '1m'; // JWT expiry time
const refreshTokenExpiry = 3000000; // Refresh token expiry time (5 minutes)

// Generate JWT token
function generateToken(user) {
  const payload = {
    userId: user.id,
    username: user.username,
    email: user.email
  };
  const options = {
    expiresIn: jwtExpiry,
    issuer: 'your_issuer_name' // Change this!
  };
  return jwt.sign(payload, jwtSecret, options);
}

// Generate refresh token
function generateRefreshToken(user) {
  const payload = {
    userId: user.id,
    username: user.username,
    email: user.email
  };
  const options = {
    expiresIn: refreshTokenExpiry,
    issuer: 'your_issuer_name' // Change this!
  };
  return jwt.sign(payload, jwtSecret, options);
}

// Verify JWT token
function verifyToken(req, res, next) {
  const token = req.cookies.jwt;
  if (!token) {
    return res.status(401).send('Unauthorized: No token provided');
  }
  try {
    const decoded = jwt.verify(token, jwtSecret);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).send('Unauthorized: Invalid token');
  }
}

// Verify refresh token
function verifyRefreshToken(req, res, next) {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) {
    return res.status(401).send('Unauthorized: No refresh token provided');
  }
  try {
    const decoded = jwt.verify(refreshToken, jwtSecret);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).send('Unauthorized: Invalid refresh token');
  }
}

module.exports = {
  generateToken,
  generateRefreshToken,
  verifyToken,
  verifyRefreshToken,
  cookieParser
};
