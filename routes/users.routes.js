import { Router } from "express";
import auth from "../middleware/auth.middleware.js";
import User from "../scheme/User.js";
import Food from "../scheme/Food.js";
import Product from "../scheme/Product.js";

const router = Router();

// /api/users/
// метод GET для получения списка с сервера:
router.get("/", auth, async (req, res) => {
  try {
    // 1. получить userID из token:
    const userID = req.user.userID;
    // 2. по userID профильтровать БД, вернуть записи:
    const data = await Food.find({ owner: userID });
    // 3. отправить на front:
    res.status(200).json(data)
  } catch (error) {
    res.status(500).json({ message: "Что-то пошло не так..." })
  }
}
)

// /api/users/date
// метод POST для получения списка с сервера по конкретной дате:
router.post("/date", auth, async (req, res) => {
  try {
    const userID = req.user.userID;
    const userDate = req.body.date;
    const data = await Food.find({ owner: userID, dateFood: userDate });
    res.status(200).json(data)
  } catch (error) {
    res.status(500).json({ message: "Что-то пошло не так..." })
  }
}
)

// /api/users/normalise
// внести норма калории к пользователю:
router.post("/normalise", auth, async (req, res) => {
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
    res.status(200).json({ message: "Норма калории успешно добалены к пользователю" });
  } catch (err) {
    res.status(500).json({ message: "Не могу добавить норма калории к учетной записи" });
  }
});

// /api/users/normalise
router.get("/normalise", auth, async (req, res) => {
  try {
    const userID = req.user.userID;
    const data = await User.findById(userID);
    res.status(200).json(data)
  } catch (error) {
    res.status(500).json({ message: "Что-то пошло не так..." })
  }
})

// /api/users/
// метод POST для отправки данных на сервер:
router.post(
  "/",
  auth,
  async (req, res) => {
    try {

      // для express-validator (валидация ошибок):
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: "Некорректные данные, указанные при входе в систему"
        })
      }

      // получить userID из tokena:
      const userID = req.user.userID;
      // 1. Принять с фронта:
      const { nameFood, weightFood, dateFood } = req.body;
      // работа с коллекцией "продуктов"
      const findProduct = await Product.findOne({ nameProduct: nameFood });
      const culcCalories = weightFood * findProduct.caloriesPer100g * 0.01; // получили конкретное число ccal и далее отправили в newFood

      const newFood = { nameFood, weightFood, caloriesFood: culcCalories, dateFood, owner: userID };
      // 2. Создать новую запись в базе данных
      const newData = new Food(newFood);
      // 3. Сохранить запись в базе данных
      await newData.save();
      // 4. Вернуть сохранённые данные:
      res.status(201).json(newData); // _id и так создается в MongoDB!!!
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Произошла ошибка при добавлении данных" })
    }
  })

// /api/users/:id (id продукта из списка пользователя!)
// метод для удаления еды у пользователя
router.delete("/:id", async (req, res) => {
  try {
    // const userID = req.user.userID;
    const foodUserId = req.params.id;
    await Food.findByIdAndDelete(foodUserId);
    res.status(200).json({ message: "Продукт удалён" })
  } catch (error) {
    res.status(500).json({ message: "Не смог удалить строчку с едой" })
  }
})

export default router;