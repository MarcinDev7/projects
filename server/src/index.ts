import express from "express";
import * as dotenv from "dotenv";
import router from "./router";
import { connectToDb } from "./services/db.service";

dotenv.config();
const app = express();
connectToDb().then(() => {
  app.use(express.json());
  app.use(router);

  app.listen(process.env.PORT, () => {
    return console.log(`Server is running`);
  });
});
