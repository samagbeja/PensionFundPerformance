import { Express, Request, Response } from "express";

// import { signJwt } from "../utils/jwt";
import {
  authorize,
  establishValidateRequest,
  //   presentMessage,
} from "../utils/validate";
import { FeedbackService } from "../services/feedback.service";

const FeedbackRouter = (app: Express) => {
  const feedbackService = new FeedbackService();
  const url = "/Feedback";

  app.get(url, (req: Request, res: Response) => {
    let authorizeRequest = authorize(req, res);
    if (authorizeRequest) {
      ///service
      return feedbackService.fetchAll(res);
    }
    return;
  });

  app.post(url, (req: Request, res: Response) => {
    let authorizeRequest = authorize(req, res);
    if (
      authorizeRequest &&
      establishValidateRequest(req, res, [
        { name: "userId", type: "number" },
        { name: "feedbackText", type: "string" },
        { name: "feedbackDate", type: "date" },
      ])
    ) {
      ///service

      return feedbackService.add(res, req.body);
    }
    return;
  });

  app.put(url, (req: Request, res: Response) => {
    let authorizeRequest = authorize(req, res);
    if (
      authorizeRequest &&
      establishValidateRequest(req, res, [
        { name: "feedbackId", type: "number" },
        { name: "userId", type: "number" },
        { name: "feedbackText", type: "string" },
        { name: "feedbackDate", type: "date" },
      ])
    ) {
      return feedbackService.update(res, req.body);
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
      return feedbackService.delete(res, req.body.id);
    }
    return;
  });
};

export default FeedbackRouter;
