import { Express, Request, Response } from "express";

// import { signJwt } from "../utils/jwt";
import {
  authorize,
  establishValidateRequest,
  //   presentMessage,
} from "../utils/validate";
import { ReportAccessService } from "../services/reportAccess.service";

const ReportsAccessRouter = (app: Express) => {
  const reportAccessService = new ReportAccessService();
  const url = "/reportAccess";

  app.get(url, (req: Request, res: Response) => {
    let authorizeRequest = authorize(req, res);
    if (authorizeRequest) {
      ///service
      return reportAccessService.fetchAll(res);
    }
    return;
  });

  app.post(url, (req: Request, res: Response) => {
    let authorizeRequest = authorize(req, res);
    if (
      authorizeRequest &&
      establishValidateRequest(req, res, [
        { name: "reportId", type: "number" },
        { name: "userId", type: "number" },
        { name: "accessLevel", type: "string" },
      ])
    ) {
      ///service

      return reportAccessService.add(res, req.body);
    }
    return;
  });

  app.put(url, (req: Request, res: Response) => {
    let authorizeRequest = authorize(req, res);
    if (
      authorizeRequest &&
      establishValidateRequest(req, res, [
        { name: "accessId", type: "number" },
        { name: "reportId", type: "number" },
        { name: "userId", type: "number" },
        { name: "accessLevel", type: "string" },
      ])
    ) {
      return reportAccessService.update(res, req.body);
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
      return reportAccessService.delete(res, req.body.id);
    }
    return;
  });
};

export default ReportsAccessRouter;
