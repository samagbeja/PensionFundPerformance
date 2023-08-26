import { Express, Request, Response } from "express";

// import { signJwt } from "../utils/jwt";
import {
  authorize,
  establishValidateRequest,
  //   presentMessage,
} from "../utils/validate";
import { ReportsService } from "../services/reports.service";

const ReportsRouter = (app: Express) => {
  const reportsService = new ReportsService();
  const url = "/reports";

  app.get(url, (req: Request, res: Response) => {
    let authorizeRequest = authorize(req, res);
    if (authorizeRequest) {
      ///service
      return reportsService.fetchAll(res);
    }
    return;
  });

  app.post(url, (req: Request, res: Response) => {
    let authorizeRequest = authorize(req, res);
    if (
      authorizeRequest &&
      establishValidateRequest(req, res, [
        { name: "reportType", type: "string" },
        { name: "reportDate", type: "date" },
        { name: "reportFilePath", type: "string" },
      ])
    ) {
      ///service

      return reportsService.add(res, req.body);
    }
    return;
  });

  app.put(url, (req: Request, res: Response) => {
    let authorizeRequest = authorize(req, res);
    if (
      authorizeRequest &&
      establishValidateRequest(req, res, [
        { name: "reportId", type: "number" },
        { name: "reportType", type: "string" },
        { name: "reportDate", type: "date" },
        { name: "reportFilePath", type: "string" },
      ])
    ) {
      return reportsService.update(res, req.body);
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
      return reportsService.delete(res, req.body.id);
    }
    return;
  });
};

export default ReportsRouter;
