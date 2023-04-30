import { Router } from "express";
import User from "../scheme/User.js";
import config from "config";
// для шифрования пароля
import bcrypt from "bcrypt";
// для валидации на стороне сервера https://www.npmjs.com/package/express-validator
import { body, validationResult } from "express-validator";
// JSON WEB TOKEN:
import jwt from "jsonwebtoken";

const router = Router();

// post запросы для регистрации и логирования:
// api/auth/register
router.post(
  "/register",
  body("email", "Некорректный email").isEmail(),
  body("password", "Минимальная длина пароля 6 символов").isLength({ min: 6 }),
  async (req, res) => {
    try {

      // для express-validator (валидация ошибок):
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: "Некорректные данные, указанные при регистрации"
        })
      }

      // получить email и пароль из body:
      const { email, password } = req.body

      // поиск в базе данных, есть такой email?
      const applicant = await User.findOne({ email });
      // .. и если он есть, то
      if (applicant) {
        return res.status(400).json({ message: "Такой пользователь существует" })
      }

      // создать пароль
      const hashPassword = await bcrypt.hash(password, 7);

      // создать пользователя
      const user = new User({ email, password: hashPassword });

      // сохранить пользователя
      await user.save();

      // отправить ответ, пользователь создан:
      res.status(201).json({ message: "Пользователь создан", email, password })
    } catch (error) {
      res.status(500).json({ message: "Что-то пошло не так" })
    }
  })

// api/auth/login
router.post(
  "/login",
  body("email", "Некорректный email").normalizeEmail().isEmail(),
  body("password", "Минимальная длина пароля 6 символов").exists(),
  async (req, res) => {

    // для express-validator (валидация ошибок):
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
        message: "Некорректные данные, указанные при входе в систему"
      })
    }

    try {
      // получить email и пароль из body:
      const { email, password } = req.body

      // !!! ВНИМАНИЕ! Понять, почему он читает ya.ru как yandex.ru (видно, если консолировать данные:
      // console.log(email, password)
      // соответственно, можно зарегистрировать два аккаунта ya.ru и yandex.ru, а req присылает только yandex.ru

      // проверка логина:
      const isUser = await User.findOne({ email });
      if (!isUser) {
        return res.status(400).json({ message: "Пользователь не найден" })
      }

      // проверка пароля:
      const isPassword = await bcrypt.compare(password, isUser.password);
      if (!isPassword) {
        return res.status(400).json({ message: "Неверный пользователь или пароль" })
      }

      // для повышения надежности при общении между пользователем и сервером используется JSON WEB TOKEN:
      // https://www.npmjs.com/package/jsonwebtoken 
      const webToken = jwt.sign(
        { userID: isUser._id },
        config.get("privateKey"),
        { expiresIn: "1h" }
      )

      // успех
      res.status(200).json({ token: webToken, userID: isUser._id })
    } catch (error) {
      res.status(500).json({ message: "Что-то пошло не так" })
    }
  })

export default router;