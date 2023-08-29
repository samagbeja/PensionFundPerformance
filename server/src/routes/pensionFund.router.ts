import { Express, Request, Response } from "express";

// import { signJwt } from "../utils/jwt";
import {
  authorize,
  establishValidateRequest,
  //   presentMessage,
} from "../utils/validate";
import { PensionFundsService } from "../services/pensionFund.service";

const pensionFundRouter = (app: Express) => {
  const pensionFundService = new PensionFundsService();

  app.get("/fund", (req: Request, res: Response) => {
    let authorizeRequest = authorize(req, res);
    if (authorizeRequest) {
      ///service
      return pensionFundService.fetchAll(res);
    }
    return;
  });

  app.get("/fundactive", (req: Request, res: Response) => {
    let authorizeRequest = authorize(req, res);
    if (authorizeRequest) {
      ///service
      return pensionFundService.fetchAllActive(res);
    }
    return;
  });

  app.get("/fund/investment", (req: Request, res: Response) => {
    let authorizeRequest = authorize(req, res);
    if (authorizeRequest) {
      return pensionFundService.fetchFundInv(res);
    }
    return;
  });

  app.post("/fund", (req: Request, res: Response) => {
    let authorizeRequest = authorize(req, res);
    if (
      authorizeRequest &&
      establishValidateRequest(req, res, [
        { name: "fundName", type: "string" },
        { name: "fundType", type: "string" },
        { name: "fundStartDate", type: "date" },
        { name: "status", type: "string" },
      ])
    ) {
      ///service

      return pensionFundService.add(res, req.body);
    }
    return;
  });

  app.put("/fund", (req: Request, res: Response) => {
    let authorizeRequest = authorize(req, res);
    if (
      authorizeRequest &&
      establishValidateRequest(req, res, [
        { name: "fundId", type: "number" },
        { name: "fundName", type: "string" },
        { name: "fundType", type: "string" },
        { name: "fundStartDate", type: "date" },
        { name: "status", type: "string" },
      ])
    ) {
      return pensionFundService.update(res, req.body);
    }
    return;
  });

  app.delete("/fund", (req: Request, res: Response) => {
    let authorizeRequest = authorize(req, res);

    req.body.id = req.query.id;
    if (
      authorizeRequest &&
      establishValidateRequest(req, res, [{ name: "id", type: "number" }])
    ) {
      return pensionFundService.delete(res, req.body.id);
    }
    return;
  });
};

export default pensionFundRouter;
