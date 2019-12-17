import jwt from 'jsonwebtoken';

const generateJWTToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_TOKEN_SECRET, { expiresIn: '7 days' })
}

export { generateJWTToken as generateJWTToken }