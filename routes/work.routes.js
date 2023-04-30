import { Router } from "express";
import auth from "../middleware/auth.middleware.js";

const router = Router();

// /api/users/normalise
router.put("/normalise", auth, async (req, res) => {
  try {
    const data = req.user;
    res.status(200).json({ message: data });
  } catch (err) {
    res.status(500).json({ message: "Не могу добавить нормакалории к учетной записи" });
  }
})

export default router;