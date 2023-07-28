import { Express, Request, Response } from "express";

import { signJwt } from "../utils/jwt";
import {
  authorize,
  establishValidateRequest,
  presentMessage,
} from "../utils/validate";

const profileRouter = (app: Express) => {
  /**
   * @openapi
   * /:
   *  get:
   *     tags:
   *     - PeP
   *     description: Responds if the app is up and running
   *     responses:
   *       200:
   *         description: App is up and running
   *
   * /addUser:
   *  post:
   *    description: Add Users
   *    responses:
   *      200:
   *      description: App is up and running
   */
  app.get("/", (req: Request, res: Response) => {
    const newUser = { id: 23, secret: 10 };
    const token = signJwt(newUser);

    res.cookie("accessToken", token, {
      httpOnly: true,
      secure: true,
    });
    // res.status(400);
    // throw new TypeError("Access token");
    // return newUser;
    return presentMessage(res, 200, newUser, "User successfully fetched");
  });

  app.post("/addUser", (req: Request, res: Response) => {
    let authorizeRequest = authorize(req, res);
    if (
      authorizeRequest &&
      establishValidateRequest(req, res, [
        { name: "lastName", type: "string" },
        { name: "firstName", type: "string" },
      ])
    ) {
      ///service
      return presentMessage(res, 201, req.body, "User successfully created");
    }
    return;
  });
};

export default profileRouter;
