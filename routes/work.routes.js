import { Router } from "express";
import auth from "../middleware/auth.middleware.js";
import User from "../scheme/User.js";

const router = Router();

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

export default router;