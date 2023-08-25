import { Express } from "express";
import profileRouter from "./profile.router";
import testRouter from "./test.router";
import userRouter from "./user.router";
import pensionFundRouter from "./pensionFund.router";
import investmentRouter from "./investment.router";
import performanceMetricsRouter from "./performanceMetrics.router";
import riskMetricsRouter from "./riskMetrics.router";
import communicationChannelsRouter from "./communicationChannels.router";
import stakeholdersRouter from "./stakeholders.router";
import webApplicationsRouter from "./webApplications.router";
import messagesRouter from "./messages.router";
import reportsRouter from "./reports.router";
import reportAccessRouter from "./reportAccess.router";
import feedbackRouter from "./feedback.router";

const myRoutes = (app: Express) => ({
  // can add middleware here
  profileRouter: profileRouter(app),
  userRouter: userRouter(app),
  testRouter: testRouter(app),
  pensionFundRouter: pensionFundRouter(app),
  investmentRouter: investmentRouter(app),
  performanceMetricsRouter: performanceMetricsRouter(app),
  riskMetricsRouter: riskMetricsRouter(app),
  communicationChannelsRouter: communicationChannelsRouter(app),
  stakeholdersRouter: stakeholdersRouter(app),
  webApplicationsRouter: webApplicationsRouter(app),
  messagesRouter: messagesRouter(app),
  reportsRouter: reportsRouter(app),
  reportAccessRouter: reportAccessRouter(app),
  feedbackRouter: feedbackRouter(app),
});
//

// app.get("/healthcheck", async function (req, res) {
//   res.json({ pep: 1 });
// });

export default myRoutes;
