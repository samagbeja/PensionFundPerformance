import { Express, Request, Response } from "express";

// import { signJwt } from "../utils/jwt";
import {
  authorize,
  establishValidateRequest,
  //   presentMessage,
} from "../utils/validate";
import { WebApplicationsService } from "../services/webApplications.service";

const webApplicationsRouter = (app: Express) => {
  const webApplicationsService = new WebApplicationsService();
  const url = "/webApplications";

  app.get(url, (req: Request, res: Response) => {
    let authorizeRequest = authorize(req, res);
    if (authorizeRequest) {
      ///service
      return webApplicationsService.fetchAll(res);
    }
    return;
  });

  app.post(url, (req: Request, res: Response) => {
    let authorizeRequest = authorize(req, res);
    if (
      authorizeRequest &&
      establishValidateRequest(req, res, [
        { name: "appName", type: "string" },
        { name: "appDescription", type: "string" },
        { name: "appVendor", type: "string" },
        { name: "status", type: "string" },
        { name: "integrationDate", type: "date" },
      ])
    ) {
      ///service

      return webApplicationsService.add(res, req.body);
    }
    return;
  });

  app.put(url, (req: Request, res: Response) => {
    let authorizeRequest = authorize(req, res);
    if (
      authorizeRequest &&
      establishValidateRequest(req, res, [
        { name: "appId", type: "number" },
        { name: "appName", type: "string" },
        { name: "appDescription", type: "string" },
        { name: "appVendor", type: "string" },
        { name: "status", type: "string" },
        { name: "integrationDate", type: "date" },
      ])
    ) {
      return webApplicationsService.update(res, req.body);
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
      return webApplicationsService.delete(res, req.body.id);
    }
    return;
  });
};

export default webApplicationsRouter;
