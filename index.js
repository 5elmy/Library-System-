import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
import initAPP from "./src/app.router.js";
import moment from "moment";
console.log(moment().format())
const app = express();
const port = process.env.PORT;

initAPP(app, express);

app.listen(port, () => {
  console.log(`Server is running on port.......${port}`);
});
