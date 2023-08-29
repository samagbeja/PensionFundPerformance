import { Express, Request, Response } from "express";

// import { signJwt } from "../utils/jwt";
import {
  authorize,
  establishValidateRequest,
  //   presentMessage,
} from "../utils/validate";
import { PerformanceMetricsService } from "../services/performanceMetrics.service";

const performanceMetricsRouter = (app: Express) => {
  const performanceMetricsService = new PerformanceMetricsService();
  const url = "/performanceMetrics";

  app.get(url, (req: Request, res: Response) => {
    let authorizeRequest = authorize(req, res);
    if (authorizeRequest) {
      ///service
      return performanceMetricsService.fetchAll(res);
    }
    return;
  });

  app.get(`${url}/investment`, (req: Request, res: Response) => {
    let authorizeRequest = authorize(req, res);
    if (authorizeRequest) {
      ///service
      return performanceMetricsService.fetchPerfInv(res);
    }
    return;
  });

  app.get(`${url}/fund`, (req: Request, res: Response) => {
    let authorizeRequest = authorize(req, res);
    if (authorizeRequest) {
      ///service
      return performanceMetricsService.fetchPerfFund(res);
    }
    return;
  });

  app.post(url, (req: Request, res: Response) => {
    let authorizeRequest = authorize(req, res);
    if (
      authorizeRequest &&
      establishValidateRequest(req, res, [
        { name: "investmentId", type: "number" },
        { name: "metricName", type: "string" },
        { name: "metricValue", type: "number" },
        { name: "metricDate", type: "date" },
      ])
    ) {
      ///service

      return performanceMetricsService.add(res, req.body);
    }
    return;
  });

  app.put(url, (req: Request, res: Response) => {
    let authorizeRequest = authorize(req, res);
    if (
      authorizeRequest &&
      establishValidateRequest(req, res, [
        { name: "metricId", type: "number" },
        { name: "investmentId", type: "number" },
        { name: "metricName", type: "string" },
        { name: "metricValue", type: "number" },
        { name: "metricDate", type: "date" },
      ])
    ) {
      return performanceMetricsService.update(res, req.body);
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
      return performanceMetricsService.delete(res, req.body.id);
    }
    return;
  });
};

export default performanceMetricsRouter;
