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

  app.post("/fund", (req: Request, res: Response) => {
    let authorizeRequest = authorize(req, res);
    if (
      authorizeRequest &&
      establishValidateRequest(req, res, [
        { name: "fundName", type: "string" },
        { name: "fundType", type: "string" },
        { name: "fundAssets", type: "number" },
        { name: "fundStartDate", type: "date" },
        { name: "status", type: "string" },
      ])
    ) {
      ///service

      return pensionFundService.add(res, req.body);
    }
    return;
  });

  app.get("/fund", (req: Request, res: Response) => {
    let authorizeRequest = authorize(req, res);
    if (authorizeRequest) {
      ///service
      return pensionFundService.fetchAll(res);
    }
    return;
  });
};

export default pensionFundRouter;
