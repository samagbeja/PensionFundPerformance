import { Express, Request, Response } from "express";

const testRouter = (app: Express) => {
  /**
   * @openapi
   * /test:
   *  get:
   *     tags:
   *     - PeP
   *     description: Responds if the app is up and running
   *     responses:
   *       200:
   *         description: App is up and running
   */
  app.get("/test", (_: Request, res: Response) => {
    return res.status(200).json({ test: true });
  });
};

export default testRouter;
