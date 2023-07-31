import "dotenv/config";
import express from "express";
import cors from "cors";
import httpServer from "http";
import cookieParser from "cookie-parser";
import routes from "./routes";
import swaggerDocs from "./utils/swagger";
import migrate from "./utils/migrations";
// // To generate PEM files
// import crypto from "crypto";

// const { privateKey, publicKey } = crypto.generateKeyPairSync("rsa", {
//   modulusLength: 2048,
// });

// console.log(
//   "Private Key:",
//   privateKey.export({ type: "pkcs1", format: "pem" })
// );
// console.log("Public Key:", publicKey.export({ type: "pkcs1", format: "pem" }));

async function bootstrap() {
  // Init express
  const app = express();

  const sHttpServer = httpServer.createServer(app);

  // protecting our api from unauthorized origins
  app.use(
    cors({
      origin: process.env.CLIENT_SIDE_URL || "http://localhost:3000",
      credentials: true,
      exposedHeaders: ["Access-Control-Allow-Credentials"],
    })
  );
  app.use(express.json());
  app.use(cookieParser());

  sHttpServer.listen(process.env.PORT, async () => {
    console.log(`Server started on http://localhost:${process.env.PORT}`);
    //run migrations..
    if(process.env.MIGRATE as string === '1')await migrate();
    //later...JWT
    //routes..
    routes(app);
    swaggerDocs(app);
    console.log("Let's start!");
  });
}
bootstrap();
