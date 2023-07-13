import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import http from "http";
import { router } from "./Router";
import { errorHandlerMiddleware } from "./Middleware/Error";
require("dotenv").config({ path: `${__dirname}/../.env` });
const initializeKnex = require("./initialize/knex");

const app = express();
app.use(express.json());
app.use(cors({ origin: true }));

initializeKnex();
app.use(errorHandlerMiddleware);
try{
  app.use("/api", router);
}catch(err){
  console.log('hello');
  
}

const server = http.createServer(app);
server.listen(process.env.SERVER_PORT || 3000, () => {
  console.log(`Server listening on port ${process.env.SERVER_PORT || 3000}`);
});
