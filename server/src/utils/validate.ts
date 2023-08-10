import { Request, Response } from "express";
import { verifyJwt } from "./jwt";

interface Fields {
  name: string;
  type: string;
  maxLength?: number;
}

const isValidDate = (dateString: any) => {
  // Check if the input is a non-empty string
  if (typeof dateString !== "string" || dateString.trim() === "") {
    return false;
  }

  // Use a regular expression to match common date formats
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/; // YYYY-MM-DD format

  if (!dateRegex.test(dateString)) {
    return false;
  }

  // Create a new Date object and check if it's a valid date
  const date: any = new Date(dateString);
  return !isNaN(date);
};

const isValidNumber = (numberString: any) => {
  if (typeof numberString === "number") return true;

  // Check if the input is a non-empty string
  if (typeof numberString !== "string" || numberString.trim() === "") {
    return false;
  }

  // Use a regular expression to match a valid number format
  const numberRegex = /^[-+]?(?:\d+\.?\d*|\.\d+)$/;

  return numberRegex.test(numberString);
};

export const validateReq = (req: Request, RequiredFields: Fields[]) => {
  let reqBody = req.body;
  let results: string[] = [];
  if (!reqBody || typeof reqBody !== "object") return ["Invalid Request Body"];
  for (let field of RequiredFields) {
    if (!reqBody[field.name]) {
      results.push(`${field.name} is required`);
    }

    switch (field.type) {
      case "number":
        if (!isValidNumber(reqBody[field.name])) {
          results.push(`${field.name} is not of the required type`);
        }
        break;
      case "date":
        if (!isValidDate(reqBody[field.name])) {
          results.push(`${field.name} is not of the required type`);
        }
        break;
      default:
        if (reqBody[field.name] && typeof reqBody[field.name] !== field.type) {
          results.push(`${field.name} is not of the required type`);
        }
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
  console.log("REQ", JSON.stringify(req.headers["authorization"]));
  let accessToken = String(req.headers["authorization"])
    .replace("Bearer", "")
    .trim();
  let result = verifyJwt(accessToken);
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
