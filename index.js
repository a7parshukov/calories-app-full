import express from "express";
import bodyParser from "body-parser";

// документация mongoose
// https://mongoosejs.com/docs/guide.html 
import mongoose from "mongoose";

// для работы с конфигурационными переменными
// https://www.npmjs.com/package/config
import config from "config";

// для работы с роутерами (express)
import authRoutes from "./routes/auth.routes.js";
import workRoutes from "./routes/work.routes.js";

const app = express();
const PORT = config.get("PORT") || 3000;
const mongoURL = config.get("mongoURL");

// middleware для парсинга body в json (response):
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

// middleware для авторизации:
app.use("/api/auth", authRoutes);
app.use("/api/users", workRoutes)

async function main() {
  try {
    await mongoose.connect(mongoURL);
    app.listen(PORT, () => {
      console.log(`Server started on port ${PORT}`)
    })
    console.log(`${mongoURL} starts...`);
  } catch(err) {
    console.log(`Error: ${err.message}`)
  } finally {
    //await mongoose.disconnect();
  }
}

main();