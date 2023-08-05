import jwt from "jsonwebtoken";

export const generateToken = ({payload,signature = process.env.SIGNATURE , expiresIn= 60*60*48 } = {}) => {
  const authentication = jwt.sign(payload, signature,{expiresIn});
  return authentication;
};

export const verifyToken = ({payload,signature = process.env.SIGNATURE,} = {}) => {
  const decoded = jwt.verify(payload, signature);
  return decoded;
};

