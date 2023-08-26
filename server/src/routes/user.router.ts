import { Express, Request, Response } from "express";

// import { signJwt } from "../utils/jwt";
import {
  authorize,
  //   authorize,
  establishValidateRequest,
  //   presentMessage,
} from "../utils/validate";
import { UserService } from "../services/user.service";

const userRouter = (app: Express) => {
  /**
   * @openapi
   *
   * /signup:
   *  post:
   *    description: sign up Users
   *    responses:
   *      200:
   *      description: App is up and running
   */
  //   app.get("/", (_: Request, res: Response) => {
  //     const newUser = { id: 23, secret: 10 };
  //     const token = signJwt(newUser);

  //     res.cookie("accessToken", token, {
  //       httpOnly: true,
  //       secure: true,
  //     });
  //     // res.status(400);
  //     // throw new TypeError("Access token");
  //     // return newUser;
  //     return presentMessage(res, 200, newUser, "User successfully fetched");
  //   });

  const userService = new UserService();

  app.get("/users", (req: Request, res: Response) => {
    let authorizeRequest = authorize(req, res);
    if (authorizeRequest) {
      ///service
      return userService.fetchAll(res);
    }
    return;
  });
  app.post("/signup", (req: Request, res: Response) => {
    if (
      establishValidateRequest(req, res, [
        { name: "username", type: "string" },
        { name: "email", type: "string" },
        { name: "password", type: "string" },
        { name: "userType", type: "string" },
      ])
    ) {
      ///service

      return userService.signup(res, req.body);
    }
    return;
  });

  app.post("/signin", (req: Request, res: Response) => {
    if (
      establishValidateRequest(req, res, [
        { name: "username", type: "string" },
        { name: "password", type: "string" },
      ])
    ) {
      ///service

      return userService.signin(res, req.body);
    }
    return;
  });
};

export default userRouter;
