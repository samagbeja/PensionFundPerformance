import { Express } from "express";
import profileRouter from "./profile.router";
import testRouter from "./test.router";

const myRoutes = (app: Express) => ({
  // can add middleware here
  profileRouter: profileRouter(app),
  testRouter: testRouter(app),
});

// app.get("/healthcheck", async function (req, res) {
//   res.json({ pep: 1 });
// });

export default myRoutes;
