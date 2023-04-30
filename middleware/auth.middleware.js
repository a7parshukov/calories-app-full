import jwt from "jsonwebtoken";
import config from "config";

export default (req, res, next) => {
  // метод REST API
  if (req.method === "OPTION") {
    return next();
  }

  try {
    // Получить токен доступа:
    const token = req.headers.authorization;
    console.log(token)

    if (!token) {
      return res.status(401).json({ message: "Нет авторизации" });
    }

    const decoded = jwt.verify(token, config.get("privateKey"));
    req.user = decoded;
    next();

  } catch (error) {
    res.status(401).json({ message: error.message });
  }
}