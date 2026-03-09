import jwt from 'jsonwebtoken';

/**
 * Generate JWT token
 * @param {String} id - User/Admin ID
 * @returns {String} - JWT token
 */
export const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d'
  });
};
