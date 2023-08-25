import { Express, Request, Response } from "express";

// import { signJwt } from "../utils/jwt";
import {
  authorize,
  establishValidateRequest,
  //   presentMessage,
} from "../utils/validate";
import { StakeholdersService } from "../services/stakeholders.service";

const webApplicationsRouter = (app: Express) => {
  const stakeholdersService = new StakeholdersService();
  const url = "/stakeholders";

  app.get(url, (req: Request, res: Response) => {
    let authorizeRequest = authorize(req, res);
    if (authorizeRequest) {
      ///service
      return stakeholdersService.fetchAll(res);
    }
    return;
  });

  app.post(url, (req: Request, res: Response) => {
    let authorizeRequest = authorize(req, res);
    if (
      authorizeRequest &&
      establishValidateRequest(req, res, [
        { name: "stakeholderType", type: "string" },
        { name: "stakeholderName", type: "string" },
        { name: "stakeholderEmail", type: "string" },

        { name: "registrationDate", type: "date" },
      ])
    ) {
      ///service

      return stakeholdersService.add(res, req.body);
    }
    return;
  });

  app.put(url, (req: Request, res: Response) => {
    let authorizeRequest = authorize(req, res);
    if (
      authorizeRequest &&
      establishValidateRequest(req, res, [
        { name: "stakeholderId", type: "number" },
        { name: "stakeholderType", type: "string" },
        { name: "stakeholderName", type: "string" },
        { name: "stakeholderEmail", type: "string" },

        { name: "registrationDate", type: "date" },
      ])
    ) {
      return stakeholdersService.update(res, req.body);
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
      return stakeholdersService.delete(res, req.body.id);
    }
    return;
  });
};

export default webApplicationsRouter;
