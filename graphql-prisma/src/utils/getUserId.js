import jwt from 'jsonwebtoken'

export default getUserId = () => {
  const header = request.request.headers.authorization;
  if (!header) {
    throw new Error('Authorization required')
  }

  const token = header.replace('Bearer ', '');
  const decoded = jwt.verify(token, 'mysecretphrase')

  return decoded.userId;
}