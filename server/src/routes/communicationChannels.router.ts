import { Express, Request, Response } from "express";

// import { signJwt } from "../utils/jwt";
import {
  authorize,
  establishValidateRequest,
  //   presentMessage,
} from "../utils/validate";
import { CommunicationChannelsService } from "../services/communicationChannels.service";

const CommunicationChannelsRouter = (app: Express) => {
  const communicationChannelsService = new CommunicationChannelsService();
  const url = "/communicationChannels";

  app.get(url, (req: Request, res: Response) => {
    let authorizeRequest = authorize(req, res);
    if (authorizeRequest) {
      ///service
      return communicationChannelsService.fetchAll(res);
    }
    return;
  });

  app.get(`${url}/count`, (req: Request, res: Response) => {
    let authorizeRequest = authorize(req, res);
    if (authorizeRequest) {
      ///service
      return communicationChannelsService.fetchCount(res);
    }
    return;
  });

  app.post(url, (req: Request, res: Response) => {
    let authorizeRequest = authorize(req, res);
    if (
      authorizeRequest &&
      establishValidateRequest(req, res, [
        { name: "channelName", type: "string" },
        { name: "channelType", type: "string" },
      ])
    ) {
      ///service

      return communicationChannelsService.add(res, req.body);
    }
    return;
  });

  app.put(url, (req: Request, res: Response) => {
    let authorizeRequest = authorize(req, res);
    if (
      authorizeRequest &&
      establishValidateRequest(req, res, [
        { name: "channelId", type: "number" },
        { name: "channelName", type: "string" },
        { name: "channelType", type: "string" },
      ])
    ) {
      return communicationChannelsService.update(res, req.body);
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
      return communicationChannelsService.delete(res, req.body.id);
    }
    return;
  });
};

export default CommunicationChannelsRouter;
