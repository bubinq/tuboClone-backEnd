import jwt from "jsonwebtoken";

export const verifyToken = async (req, res, next) => {
  const token = req.cookies.accessToken;
  if (!token) {
    res.status(401).json({message: "You are not authenticated!"});
    return
  }

  jwt.verify(token, process.env.JWT_KEY, function (err, data) {
    if (err) {
      res.status(403).json({message:"You are not authorized!"});
      return
    }
    req.user = data;
    next();
  });
};
