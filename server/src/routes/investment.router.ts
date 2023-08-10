import { Express, Request, Response } from "express";

import {
  authorize,
  establishValidateRequest,
  //   presentMessage,
} from "../utils/validate";

import { InvestmentsService } from "../services/investmentRouter.service";

const investmentRouter = (app: Express) => {
  const investmentService = new InvestmentsService();

  app.post("/investment", (req: Request, res: Response) => {
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
};

export default investmentRouter;
