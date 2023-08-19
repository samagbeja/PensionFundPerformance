import { Express, Request, Response } from "express";

import {
  authorize,
  establishValidateRequest,
  //   presentMessage,
} from "../utils/validate";

import { InvestmentsService } from "../services/investment.service";

const investmentRouter = (app: Express) => {
  const investmentService = new InvestmentsService();
  const url = "/investment";
  app.get(url, (req: Request, res: Response) => {
    let authorizeRequest = authorize(req, res);
    if (authorizeRequest) {
      ///service
      return investmentService.fetchAll(res);
    }
    return;
  });

  app.post(url, (req: Request, res: Response) => {
    let authorizeRequest = authorize(req, res);
    if (
      authorizeRequest &&
      establishValidateRequest(req, res, [
        { name: "fundId", type: "number" },
        { name: "investmentName", type: "string" },
        { name: "investmentType", type: "string" },
        { name: "investmentSector", type: "string" },
        { name: "investmentAmount", type: "number" },
        { name: "investmentStartDate", type: "date" },
        { name: "investmentEndDate", type: "date" },
      ])
    ) {
      ///service
      return investmentService.add(res, req.body);
    }
    return;
  });

  app.put(url, (req: Request, res: Response) => {
    let authorizeRequest = authorize(req, res);
    if (
      authorizeRequest &&
      establishValidateRequest(req, res, [
        { name: "fundId", type: "number" },
        { name: "investmentId", type: "number" },
        { name: "investmentName", type: "string" },
        { name: "investmentType", type: "string" },
        { name: "investmentSector", type: "string" },
        { name: "investmentAmount", type: "number" },
        { name: "investmentStartDate", type: "date" },
        { name: "investmentEndDate", type: "date" },
      ])
    ) {
      return investmentService.update(res, req.body);
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
      return investmentService.delete(res, req.body.id);
    }
    return;
  });
};

export default investmentRouter;
