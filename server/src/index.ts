import express from "express";
import cors from "cors";
import * as dotenv from "dotenv";
import router from "./router";
import { connectToDb } from "./services/db.service";

dotenv.config();

const app = express();
connectToDb().then(() => {
  app.use(cors());
  // app.use((req, res, next) => {
  //   res.header("Access-Control-Allow-Origin", "*");
  //   next();
  // });
  app.use(express.json());
  // app.use(cors);
  app.use(router);

  app.listen(process.env.PORT, () => {
    return console.log(`Server is running`);
  });
});
