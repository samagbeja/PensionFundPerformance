import { Express, Request, Response } from "express";

// import { signJwt } from "../utils/jwt";
import {
  authorize,
  establishValidateRequest,
  //   presentMessage,
} from "../utils/validate";
import { RiskMetricsService } from "../services/riskMetrics.service";

const riskMetricsRouter = (app: Express) => {
  const riskMetricsService = new RiskMetricsService();
  const url = "/riskMetrics";

  app.get(url, (req: Request, res: Response) => {
    let authorizeRequest = authorize(req, res);
    if (authorizeRequest) {
      ///service
      return riskMetricsService.fetchAll(res);
    }
    return;
  });

  app.post(url, (req: Request, res: Response) => {
    let authorizeRequest = authorize(req, res);
    if (
      authorizeRequest &&
      establishValidateRequest(req, res, [
        { name: "investmentId", type: "number" },
        { name: "riskCategory", type: "string" },
        { name: "riskIndicator", type: "string" },
        { name: "riskLevel", type: "number" },
        { name: "riskDate", type: "date" },
      ])
    ) {
      ///service

      return riskMetricsService.add(res, req.body);
    }
    return;
  });

  app.put(url, (req: Request, res: Response) => {
    let authorizeRequest = authorize(req, res);
    if (
      authorizeRequest &&
      establishValidateRequest(req, res, [
        { name: "riskId", type: "number" },
        { name: "investmentId", type: "number" },
        { name: "riskCategory", type: "string" },
        { name: "riskIndicator", type: "string" },
        { name: "riskLevel", type: "number" },
        { name: "riskDate", type: "date" },
      ])
    ) {
      return riskMetricsService.update(res, req.body);
    }
    return;
  });

  app.delete(url, (req: Request, res: Response) => {
    let authorizeRequest = authorize(req, res);

    req.body.id = req.query.id;
    if (
      authorizeRequest &&
      establishValidateRequest(req, res, [{ name: "id", type: "number" }])
    ) {
      return riskMetricsService.delete(res, req.body.id);
    }
    return;
  });
};

export default riskMetricsRouter;
