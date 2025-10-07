const jwt = require('jsonwebtoken');
const User = require('../models/User');

module.exports = {
  ensureAuthenticated: async (req, res, next) => {
    try {
      const token = req.headers.authorization?.split(' ')[1];

      if (!token) {
        return res.status(401).json({
          error: {
            message: 'Unauthorized. Please log in.',
            code: 'NOT_AUTHENTICATED'
          }
        });
      }

      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET || process.env.SESSION_SECRET
      );

      const user = await User.findById(decoded.userId);

      if (!user) {
        return res.status(401).json({
          error: {
            message: 'User not found',
            code: 'USER_NOT_FOUND'
          }
        });
      }

      req.user = user;
      next();
    } catch (error) {
      console.error('Auth middleware error:', error);
      res.status(401).json({
        error: {
          message: 'Invalid or expired token',
          code: 'INVALID_TOKEN'
        }
      });
    }
  }
};
