import { Request, Response } from "express";
import { verifyJwt } from "./jwt";

interface Fields {
  name: string;
  type: string;
  maxLength?: number;
}

export const validateReq = (req: Request, RequiredFields: Fields[]) => {
  let reqBody = req.body;
  let results: string[] = [];
  if (!reqBody || typeof reqBody !== "object") return ["Invalid Request Body"];
  for (let field of RequiredFields) {
    if (!reqBody[field.name]) {
      results.push(`${field.name} is required`);
    }
    if (reqBody[field.name] && typeof reqBody[field.name] !== field.type) {
      results.push(`${field.name} is not of the required type`);
    }

    if (
      reqBody[field.name] &&
      field.maxLength &&
      reqBody[field.name].length > field.maxLength
    ) {
      results.push(`${field.name} is too long`);
    }
  }

  return results;
};

export const establishValidateRequest = (
  req: Request,
  res: Response,
  RequiredFields: Fields[]
) => {
  let results: string[] = validateReq(req, RequiredFields);
  if (results.length > 0) {
    presentMessage(res, 400, results, "Bad Request");

    return false;
  }
  return true;
};

export const authorize = (req: Request, res: Response) => {
  let result = verifyJwt(req.cookies?.accessToken);
  if (!result) {
    presentMessage(res, 401, null, "You are not authorized");
  }
  return result;
};

//Continue from here
export const presentMessage = (
  res: Response,
  statusCode: number,
  payload?: any,
  message?: string | []
) => {
  res.status(statusCode).json({
    payload: payload ?? null,
    message: message ?? null,
    status: String(statusCode).indexOf("2") === 0,
  });

  return;
};
