import jwt from 'jsonwebtoken';

export default {
  sign: (payload) => {
    let secretKey = process.env.JWT_SECRET;

    return jwt.sign(
      payload,
      secretKey,
      {
        expiresIn: '7d'
      }
    );
  }
};
