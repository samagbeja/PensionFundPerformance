import { Express, Request, Response } from "express";

// import { signJwt } from "../utils/jwt";
import {
  authorize,
  establishValidateRequest,
  //   presentMessage,
} from "../utils/validate";
import { MessagesService } from "../services/messages.service";

const messagesRouter = (app: Express) => {
  const messagesService = new MessagesService();
  const url = "/messages";

  app.get(url, (req: Request, res: Response) => {
    let authorizeRequest = authorize(req, res);
    if (authorizeRequest) {
      ///service
      return messagesService.fetchAll(res);
    }
    return;
  });

  app.post(url, (req: Request, res: Response) => {
    let authorizeRequest = authorize(req, res);
    if (
      authorizeRequest &&
      establishValidateRequest(req, res, [
        { name: "senderId", type: "number" },
        { name: "recieverId", type: "number" },
        { name: "subject", type: "string" },
        { name: "content", type: "string" },
        { name: "sentDate", type: "date" },
      ])
    ) {
      ///service

      return messagesService.add(res, req.body);
    }
    return;
  });

  app.put(url, (req: Request, res: Response) => {
    let authorizeRequest = authorize(req, res);
    if (
      authorizeRequest &&
      establishValidateRequest(req, res, [
        { name: "messageId", type: "number" },
        { name: "senderId", type: "number" },
        { name: "recieverId", type: "number" },
        { name: "subject", type: "string" },
        { name: "content", type: "string" },
        { name: "sentDate", type: "date" },
      ])
    ) {
      return messagesService.update(res, req.body);
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
      return messagesService.delete(res, req.body.id);
    }
    return;
  });
};

export default messagesRouter;
