import express from "express";
import bodyParser from "body-parser";
import path from "path";

// документация mongoose
// https://mongoosejs.com/docs/guide.html 
import mongoose from "mongoose";

// для работы с конфигурационными переменными
// https://www.npmjs.com/package/config
import config from "config";

// для работы с роутерами (express)
import authRoutes from "./routes/auth.routes.js";
import usersRoutes from "./routes/users.routes.js";
import productsRoutes from "./routes/products.routes.js";

const app = express();
const PORT = config.get("PORT") || 3000;
const mongoURL = config.get("mongoURL");

// middleware для парсинга body в json (response):
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// middleware для авторизации:
app.use("/api/auth", authRoutes);
app.use("/api/users", usersRoutes);
app.use("/api/products", productsRoutes);

if (process.env.NODE_ENV === 'production') {
  app.use('/', express.static(path.join(__dirname, 'client', 'build')))

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  })
}

async function main() {
  try {
    await mongoose.connect(mongoURL);
    app.listen(PORT, () => {
      console.log(`Server started on port ${PORT}`)
    })
    console.log(`${mongoURL} starts...`);
  } catch (err) {
    console.log(`Error: ${err.message}`)
  } finally {
    //await mongoose.disconnect();
  }
}

main();