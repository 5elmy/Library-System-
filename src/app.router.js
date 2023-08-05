import connectDB from "../DB/connection.js";
import authRouter from "./Modules/auth/auth.router.js";
import libraryRouter from "./Modules/books/books.router.js"
import userRouter from "./Modules/user/user.router.js";
import {  globalErrorHandling } from "./utils/errorHandling.js";
import path from 'path'
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
 const fullpath = path.join(__dirname,"./uploads")
const initAPP = (app, express) => {
  
  app.use(express.json({}));
  
  app.use("/uploads",express.static(fullpath));

  app.get("/", (req, res) => res.send("Hello world!"));

  app.use("/auth", authRouter);
  app.use("/book", libraryRouter);
  app.use("/user", userRouter);

  app.all("*", (req, res, next) => {
    return res.json({ message: "404 In-valid Routing" });
  });
 app.use(globalErrorHandling)
  //DB connection
  connectDB();
};
export default initAPP;
