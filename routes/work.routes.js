import { Router } from "express";
import auth from "../middleware/auth.middleware.js";
import User from "../scheme/User.js";
import { v4 } from "uuid";

const router = Router();

let FOODLIST = [
  { _id: v4(), nameFood: "Хлеб", weightFood: 50, caloriesFood: 120 },
  { _id: v4(), nameFood: "Колбаса", weightFood: 60, caloriesFood: 220 },
  { _id: v4(), nameFood: "Сыр Гауда", weightFood: 40, caloriesFood: 80 }
]

// /api/users/normalise
router.put("/normalise", auth, async (req, res) => {
  try {
    // получить userID из tokena:
    const userID = req.user.userID;

    // найти пользователя в базе, добавить или заменить норму:
    const user = await User.findByIdAndUpdate(
      userID,
      { norma: req.body.norma },
      { new: true }
    );

    // сохранить:
    await user.save();

    res.status(200).json({ message: "Нормокалории успешно добалены к пользователю" });
  } catch (err) {
    res.status(500).json({ message: "Не могу добавить нормакалории к учетной записи" });
  }
})

// /api/users/
// метод GET для получения списка с сервера:
router.get("/", (req, res) => {
  res.status(200).json(FOODLIST)
}
)

export default router;