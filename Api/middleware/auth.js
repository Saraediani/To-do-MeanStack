import jwt from "jsonwebtoken";

const config = process.env;

export const verifyToken = (req, res, next) => {
  

  try {
    let token = req.header("authorization")
    if (token) {
      token = token.split(" ")[1];
      const decoded = jwt.verify(token, config.JWT_KEY);
      req.user = decoded;
      next();
    }
    next()
  } catch (error) {
    return res.status(401).json({
      message: "Auth failed"
    })
}

  
};

export default{ verifyToken};