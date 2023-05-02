import jwt from "jsonwebtoken";
import config from "config";

const auth = (req, res, next) => {
  // метод REST API
  if (req.method === "OPTIONS") {
    return next();
  }

  try {
    // Получить токен доступа:
    const token = req.headers.authorization.split(' ')[1];

    if (!token) {
      return res.status(401).json({ message: "Нет авторизации" });
    }

    req.user = jwt.verify(token, config.get("privateKey"));
    next();

  } catch (error) {
    res.status(401).json({ message: error.message });
  }
}

export default auth;