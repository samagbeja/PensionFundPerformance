import { Express } from "express";
import profileRouter from "./profile.router";
import testRouter from "./test.router";
import userRouter from "./user.router";
import pensionFundRouter from "./pensionFund.router";
import investmentRouter from "./investment.router";
import performanceMetricsRouter from "./performanceMetrics.router";

const myRoutes = (app: Express) => ({
  // can add middleware here
  profileRouter: profileRouter(app),
  userRouter: userRouter(app),
  testRouter: testRouter(app),
  pensionFundRouter: pensionFundRouter(app),
  investmentRouter: investmentRouter(app),
  performanceMetricsRouter: performanceMetricsRouter(app),
});
//

// app.get("/healthcheck", async function (req, res) {
//   res.json({ pep: 1 });
// });

export default myRoutes;
