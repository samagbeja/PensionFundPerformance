import { Request, Response } from "express";
import Profile from "../schema/profile.schema";

interface Context {
  currentUser: Profile | any;
  req: Request;
  res: Response;
  user: Profile | any;
}

export default Context;
